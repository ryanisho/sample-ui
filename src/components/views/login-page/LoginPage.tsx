/**
 * Copyright (c) 2024 Cisco Systems, Inc. and its affiliates
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http:www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FC, FormEvent, useState } from "react";
import backgroundImage from "@/assets/images/home-background.jpg";
import styles from "./login-page.module.scss"; // Import the CSS file for the component
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "@/common/enum";

export const LoginPage: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loggedUser, setLoggedUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate()

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    // Perform login logic here
    console.log("Username: ", username);
    console.log("Password: ", password);

    // Simulating successful login
    setIsLoggedIn(true);

    setLoggedUser(username);

    // Clear the input fields
    setUsername("");
    setPassword("");

    navigate(RoutePaths.INFRA_RESOURCE_DASHBOARD)
  };

  // Render the login form for non-authenticated users
  return (
    <div className={styles.loginPage}>
      <img className={styles.backgroundImage} src={backgroundImage} alt="" />
      {!isLoggedIn ? (
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div>
            <label htmlFor="username">Username </label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password </label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      ) : (
        <div className={styles.loginPage}>
          <h2 style={{ zIndex: "10" }}>Welcome, {loggedUser} - You're now logged in !! </h2>
        </div>
      )}
    </div>
  );
};
