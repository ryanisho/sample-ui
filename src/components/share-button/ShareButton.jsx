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

import React from 'react';
import Select from 'react-select';
import { FaSlack, FaGithub, Fa500Px } from 'react-icons/fa';

const shareOptions = [
  { value: 'slack', label: <><FaSlack /> Slack</>, icon: <FaSlack /> },
  { value: 'gist', label: <><FaGithub /> Github</>, icon: <FaGithub /> },
  { value: 'webex', label:  "Webex Teams" },
  { value: 'microsoft', label:  "Microsoft Teams" },

];

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: 150,
    minHeight: '30px',
    borderRadius: '5px',
    backgroundColor: '#f8f9fa',
    borderColor: '#ced4da',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#ced4da'
    }
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '30px'
  }),
  clearIndicator: (provided) => ({
    ...provided,
    padding: '5px'
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: '5px'
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '5px',
    marginTop: '0px'
  }),
  option: (provided, state) => ({
    ...provided,
    padding: '10px',
    color: state.isSelected ? '#fff' : '#495057',
    backgroundColor: state.isSelected ? '#007bff' : 'transparent',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#007bff'
    }
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#495057'
  })
};

export const ShareButton = () => {

  const handleShare = (selectedOption) => {
    switch (selectedOption.value) {
      case 'slack':
        // Add your logic to share with Slack here
        console.log("Sharing with Slack");
        break;
      case 'gist':
        // Add your logic to share with Github Gist here
        console.log("Sharing with Github Gist");
        break;
        case 'webex':
          // Add your logic to share with Github Gist here
          console.log("Sharing with Webext Teams");
          break;
        case 'microsoft':
            // Add your logic to share with Github Gist here
            console.log("Sharing with Microsoft Teams");
            break;
      default:
        console.log("Select a valid option to share.");
    }
  };

  return (
    <Select
      onChange={handleShare}
      options={shareOptions}
      isSearchable={false}
      placeholder="Share..."
      styles={customStyles}
    />
  );
};
