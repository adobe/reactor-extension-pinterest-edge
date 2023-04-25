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

import userDataComboboxFields from './userDataComboboxFields';

const { getUserDataId } = userDataComboboxFields;

export default ({ settings }) => {
  const user_identification = settings?.user_identification || {};
  let hashed_maids = (user_identification?.hashed_maids || []).map((x) => ({
    value: x
  }));

  if (hashed_maids.length === 0) {
    hashed_maids = [{ value: '' }];
  }

  let userDataRaw = settings?.user_data || '';

  if (typeof userDataRaw === 'object') {
    userDataRaw = JSON.stringify(
      Object.entries(userDataRaw).reduce((acc, [key, value]) => {
        acc[getUserDataId(key)] = value;
        return acc;
      }, {}),
      null,
      2
    );
  }

  return {
    user_identification: {
      ...user_identification,
      hashed_maids
    },
    userDataType: 'raw',
    userDataRaw,
    userDataJsonPairs: []
  };
};
