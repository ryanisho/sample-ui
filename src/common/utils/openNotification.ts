/**
 * Copyright (c) 2023 Cisco Systems, Inc. and its affiliates
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

import { notification } from "antd";

type NotificationType = "error" | "success";
type NotificationInfo = (body?: string) => void;

export const openNotification: Record<NotificationType, NotificationInfo> = {
  success: (body = "Operation has concluded with success.") => {
    notification.open({
      message: "Operation successful",
      description: body,
      duration: 4.5,
      style: {
        color: "#29CC6A",
      },
    });
  },

  error: (body = "Something went wrong. Please check console errors and try again.") => {
    notification.open({
      message: "Operation has failed",
      description: body,
      duration: 4.5,
      style: {
        color: "#EA340D",
      },
    });
  },
};
