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

import { FC, useState } from "react";
import { BottomDrawer } from "@/components/bottom-drawer/BottomDrawer";
import { DrawerProps } from "antd";

interface BottomDrawerButtonProps extends DrawerProps {
  drawerButtonText: string;
  handleOpenDrawer?: any;
  disabled?: boolean
}

export const BottomDrawerButton: FC<BottomDrawerButtonProps> = ({
                                                                  children,
                                                                  drawerButtonText,
                                                                  handleOpenDrawer,
                                                                  disabled,
                                                                  ...props
                                                                }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showDrawer = () => {
    setIsDrawerVisible(true);
    if (typeof handleOpenDrawer == 'function') handleOpenDrawer();
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "DarkGray",
    color: "white",
    borderRadius: "5px",
  };

  return (
    <>
      <button style={buttonStyle} onClick={showDrawer} disabled={disabled}>
        {drawerButtonText}
      </button>
      <BottomDrawer isDrawerVisible={isDrawerVisible} setIsDrawerVisible={setIsDrawerVisible} {...props}>
        {children}
      </BottomDrawer>
    </>
  );
};
