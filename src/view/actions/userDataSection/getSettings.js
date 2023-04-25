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

import { addToEntityFromVariables } from '../../utils/entityVariablesConverter';
import userDataComboboxFields from './userDataComboboxFields';
import { isString } from '../../utils/validators';

const { getUserDataId } = userDataComboboxFields;

export default ({
  user_identification,
  userDataType,
  userDataRaw,
  userDataJsonPairs
}) => {
  let data;

  const settings = {};

  ['em', 'client_ip_address', 'client_user_agent'].forEach((key) => {
    if (user_identification[key]) {
      if (!settings.user_identification) {
        settings.user_identification = {};
      }

      settings.user_identification[key] = user_identification[key];
    }
  });

  ['hashed_maids'].forEach((key) => {
    if (user_identification[key] && user_identification[key][0].value) {
      if (!settings.user_identification) {
        settings.user_identification = {};
      }

      const v = user_identification[key]
        .map(({ value }) => value)
        .filter((x) => x);

      if (v.length) {
        settings.user_identification[key] = v;
      }
    }
  });

  if (userDataType === 'json') {
    data = addToEntityFromVariables(
      {},
      userDataJsonPairs
        .filter((p) => p.key || p.value)
        .map(({ key, value }) => ({ key: getUserDataId(key), value }))
    );

    if (Object.keys(data).length === 0) {
      data = null;
    }
  } else {
    try {
      data = JSON.parse(userDataRaw);
    } catch {
      data = userDataRaw;
    }
  }

  if (data) {
    if (isString(data)) {
      settings.user_data = data;
    } else {
      settings.user_data = Object.entries(data).reduce((acc, [k, v]) => {
        acc[getUserDataId(k)] = v;
        return acc;
      }, {});
    }
  }

  return settings;
};
