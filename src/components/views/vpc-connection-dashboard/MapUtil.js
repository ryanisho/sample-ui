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

import { Loader } from '@googlemaps/js-api-loader';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

let map;
let markers = [];

function convertGeoLocationToGeoData(geoLocation) {
    return {
        location: {
            latitude: geoLocation.latitude,
            longitude: geoLocation.longitude,
        },
        city: {
            names: {
                en: geoLocation.city_name,
            }
        }
    };
}

// Load the Google Maps script
async function loadGoogleMapsScript() {
    const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: "weekly",
    });

    await loader.load();
}

// Initialize the map
/* global google */
function initMap() {
    clearMarkers()
    const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["places"]
    });
    const mapOptions = {
        center: {
            lat: 37.7749,
            lng: -122.4194
        },
        zoom: 4
    };
    loader
        .importLibrary('maps')
        .then(({ Map }) => {
            map = new Map(document.getElementById("map"), mapOptions);
        })
        .catch((e) => {
            // do something
        });
}

// Set a marker on the map
function setMarker(geoData, colorBlue) {
    if (geoData && geoData.location.latitude && geoData.location.longitude) {
        let label = geoData.city?.names?.en;
        let color = 'red'
        if (colorBlue) {
            map.setCenter({ lat: geoData.location.latitude, lng: geoData.location.longitude });
            color = "blue"
        } else {
            label = geoData.city?.names?.en // TBD : Add number of connections to label
        }
        const marker = new google.maps.Marker({
            position: { lat: geoData.location.latitude, lng: geoData.location.longitude },
            map: map,
            //label: label,
            icon: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`
        });
        console.log("Marker =", marker)
        markers.push(marker);
    }
}

// Clear all markers
function clearMarkers() {
    for (let marker of markers) {
        marker.setMap(null);
    }
    markers = [];
}

// Show a location on the map
function plotLocationOnMap(geoData, changeColor) {
    if (geoData && geoData.location.latitude && geoData.location.longitude) {

        // Clear previous markers
        //clearMarkers();

        // Center the map to the location
        map.setCenter({ lat: geoData.location.latitude, lng: geoData.location.longitude });
        // Set a marker
        console.log("GeoData =", geoData)
        setMarker(geoData, changeColor);
    }
}

// Hide the map
function hideMap() {
    if (map) {
        map.setOptions({ disableDefaultUI: true, draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true });
    }
}

export {
    setMarker,
    convertGeoLocationToGeoData,
    loadGoogleMapsScript,
    initMap,
    plotLocationOnMap,
    hideMap
};
