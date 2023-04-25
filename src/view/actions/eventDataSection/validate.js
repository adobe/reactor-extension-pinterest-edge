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
import { isDataElementToken, isObject } from '../../utils/validators';
import checkRequired from '../../utils/checkRequired';

export default ({
  eventPropertiesJsonPairs = [],
  eventPropertiesType,
  eventPropertiesRaw,
  event_name,
  action_source,
  event_time,
  event_id
}) => {
  const errors = {};

  if (eventPropertiesType === 'raw') {
    if (eventPropertiesRaw) {
      if (isDataElementToken(eventPropertiesRaw)) {
        return errors;
      }

      const { message = '', parsedJson } = parseJson(eventPropertiesRaw);
      if (message || !isObject(parsedJson)) {
        return {
          eventPropertiesRaw: `Please provide a valid JSON object or a data element.${
            message ? ` ${message}.` : ''
          }`
        };
      }
    }
  } else {
    eventPropertiesJsonPairs.forEach((q, index) => {
      if (!q.key && q.value) {
        errors[`eventPropertiesJsonPairs.${index}.key`] =
          'Please provide a key name.';
      }

      if (q.key && !q.value) {
        errors[`eventPropertiesJsonPairs.${index}.value`] =
          'Please provide a value.';
      }
    });
  }

  [
    ['event_name', event_name, 'an event name'],
    ['event_time', event_time, 'an event time'],
    ['action_source', action_source, 'an action source'],
    ['event_id', event_id, 'an event ID']
  ].forEach(([key, value, errorVariableDescription]) => {
    checkRequired(key, value, errorVariableDescription || `a ${key}`, errors);
  });

  if (isDataElementToken(event_time)) {
    return errors;
  }

  if (event_time) {
    const numberValue = Number(event_time);
    if (Number.isNaN(numberValue)) {
      errors.event_time = 'The event time must be a number or a data element.';
    }
  }

  return errors;
};
