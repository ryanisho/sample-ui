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

const IP2LOCATION_API_KEY = process.env.REACT_APP_IP2LOCATION_API_KEY;
const IP2LOCATION_ENDPOINT = process.env.REACT_APP_IP2LOCATION_ENDPOINT;

async function getGeoLocationForIP(ipAddress) {
    try {
        //const ipString = ipAddresses.join(',');
        //https://api.ip2location.io/?key=&ip=113.199.28.235
        const url = `${IP2LOCATION_ENDPOINT}?key=${IP2LOCATION_API_KEY}&ip=${ipAddress}`
        console.log(url)
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data)
        return data
    } catch (error) {
        console.error("Error fetching geolocation data:", error);
        return ;
    }
}

export { getGeoLocationForIP };
