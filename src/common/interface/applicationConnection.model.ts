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

import { AppConnection } from "@/_proto/grpc-service/ts/app_connection";

/**
 * recursively requires each field to be required (not optional) and not nullable
 */
export type FullyDefined<T> = { [P in keyof T]-?: FullyDefined<NonNullable<T[P]>> };

/**
 * requires the `K` fields in `T` to be required and `FullyDefined`
 */
type WithDeepRequired<T, K extends keyof T> = T & { [P in K]-?: FullyDefined<NonNullable<T[P]>> }

/**
 * modified generated `AppConnection` type that requires certain fields are `FullyDefined` according to data models
 */
export type ApplicationConnection = WithDeepRequired<AppConnection, "controller" | "metadata" | "accessPolicy" | "networkDomainConnection" | "networkPolicy">