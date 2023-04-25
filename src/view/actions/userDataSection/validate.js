/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/* eslint-disable camelcase */

import parseJson from '../../utils/parseJson';
import { isObject, isDataElementToken } from '../../utils/validators';

export default ({
  user_identification = {},
  userDataRaw,
  userDataType,
  userDataJsonPairs
}) => {
  const errors = {};
  const { em, hashed_maids, client_ip_address, client_user_agent } =
    user_identification;

  const hashedMaidsDefined = hashed_maids.some(({ value }) => value);

  if (!em && !client_ip_address && !client_user_agent && !hashedMaidsDefined) {
    errors['user_identification.em'] =
      'Please provide either the ’Email’, or the ’Mobile advertising ID’ ' +
      'or the ’Client IP Address’ and ’Client User Agent’.';
  } else if (!em && !hashedMaidsDefined) {
    if (client_ip_address && !client_user_agent) {
      errors['user_identification.client_user_agent'] =
        'Please provide the user agent.';
    } else if (!client_ip_address && client_user_agent) {
      errors['user_identification.client_ip_address'] =
        'Please provide the IP address.';
    }
  }

  if (userDataType === 'raw') {
    if (userDataRaw) {
      if (isDataElementToken(userDataRaw)) {
        return errors;
      }

      const { message = '', parsedJson } = parseJson(userDataRaw);
      if (message || !isObject(parsedJson)) {
        return {
          userDataRaw: `Please provide a valid JSON object or a data element.${
            message ? ` ${message}.` : ''
          }`
        };
      }
    }
  } else {
    userDataJsonPairs.forEach((q, index) => {
      if (!q.key && q.value) {
        errors[`userDataJsonPairs.${index}.key`] = 'Please provide a key name.';
      }

      if (q.key && !q.value) {
        errors[`userDataJsonPairs.${index}.value`] = 'Please provide a value.';
      }
    });
  }

  return errors;
};
