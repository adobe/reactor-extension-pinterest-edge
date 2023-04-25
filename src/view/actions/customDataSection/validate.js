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

import parseJson from '../../utils/parseJson';
import { isDataElementToken, isObject } from '../../utils/validators';

export default ({
  customDataJsonPairs = [],
  customDataType,
  customDataRaw
}) => {
  const errors = {};

  if (customDataType === 'raw') {
    if (customDataRaw) {
      if (isDataElementToken(customDataRaw)) {
        return errors;
      }

      const { message = '', parsedJson } = parseJson(customDataRaw);
      if (message || !isObject(parsedJson)) {
        return {
          customDataRaw: `Please provide a valid JSON object or a data element.${
            message ? ` ${message}.` : ''
          }`
        };
      }

      if (Object.keys(parsedJson).includes('num_items')) {
        const numberValue = Number(parsedJson.num_items);
        if (Number.isNaN(numberValue)) {
          errors.customDataRaw =
            'The number of items must be a number or a data element.';
        }
      }
    }
  } else {
    customDataJsonPairs.forEach((q, index) => {
      if (!q.key && q.value) {
        errors[`customDataJsonPairs.${index}.key`] =
          'Please provide a key name.';
      }

      if (q.key && !q.value) {
        errors[`customDataJsonPairs.${index}.value`] =
          'Please provide a value.';
      }

      if (q.key === 'Number of Products') {
        const numberValue = Number(q.value);
        if (Number.isNaN(numberValue)) {
          errors[`customDataJsonPairs.${index}.value`] =
            'The number of products value must be a number or a data element.';
        }
      }
    });
  }

  return errors;
};
