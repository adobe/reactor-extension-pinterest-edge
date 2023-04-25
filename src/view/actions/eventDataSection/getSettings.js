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
import eventPropertiesComboboxFields from './eventPropertiesComboboxFields';
import { isDataElementToken } from '../../utils/validators';

const { getEventPropertyId } = eventPropertiesComboboxFields;

export default ({
  eventPropertiesType,
  eventPropertiesRaw,
  eventPropertiesJsonPairs,
  ...rest
}) => {
  let data;
  const settings = {};

  ['event_name', 'action_source', 'event_time', 'event_id'].forEach((k) => {
    if (rest[k]) {
      if (!settings.event) {
        settings.event = {};
      }

      settings.event[k] = rest[k];

      if (k === 'event_time') {
        let v = settings.event[k];
        v = isDataElementToken(v) ? v : Number(v);
        settings.event[k] = v;
      }
    }
  });

  if (eventPropertiesType === 'json') {
    data = addToEntityFromVariables(
      {},
      eventPropertiesJsonPairs
        .filter((p) => p.key || p.value)
        .map(({ key, value }) => ({ key: getEventPropertyId(key), value }))
    );

    if (Object.keys(data).length === 0) {
      data = null;
    }
  } else {
    try {
      data = JSON.parse(eventPropertiesRaw);
    } catch {
      data = eventPropertiesRaw;
    }
  }
  if (data) {
    if (!settings.event) {
      settings.event = {};
    }
    settings.event.properties = data;
  }

  return settings;
};
