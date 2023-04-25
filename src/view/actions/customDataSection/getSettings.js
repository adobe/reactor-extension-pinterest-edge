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

import { addToEntityFromVariables } from '../../utils/entityVariablesConverter';
import customDataComboboxFields from './customDataComboboxFields';
import { isDataElementToken } from '../../utils/validators';

const { getCustomDataId } = customDataComboboxFields;

export default ({ customDataType, customDataRaw, customDataJsonPairs }) => {
  let data;
  const settings = {};

  if (customDataType === 'json') {
    data = addToEntityFromVariables(
      {},
      customDataJsonPairs
        .filter((p) => p.key || p.value)
        .map(({ key, value }) => ({ key: getCustomDataId(key), value }))
    );

    if (Object.keys(data).length === 0) {
      data = null;
    }
  } else {
    try {
      data = JSON.parse(customDataRaw);
    } catch {
      data = customDataRaw;
    }
  }

  if (data) {
    settings.custom_data = Object.entries(data).reduce((acc, [k, v]) => {
      acc[getCustomDataId(k)] = v;
      return acc;
    }, {});
  }

  if (settings?.custom_data?.num_items) {
    let v = settings.custom_data.num_items;
    v = isDataElementToken(v) ? v : Number(v);
    settings.custom_data.num_items = v;
  }

  return settings;
};
