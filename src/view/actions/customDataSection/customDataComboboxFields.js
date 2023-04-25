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

const customDataAttributes = [
  { id: 'currency', name: 'Currency' },
  { id: 'value', name: 'Value' },
  { id: 'search_string', name: 'Search String' },
  { id: 'order_id', name: 'Order ID' },
  { id: 'num_items', name: 'Number of Products' }
];

const customDataIdsMap = customDataAttributes.reduce(
  (previousValue, currentValue) => {
    previousValue[currentValue.id] = currentValue.name;
    return previousValue;
  },
  {}
);

const customDataNamesMap = customDataAttributes.reduce(
  (previousValue, currentValue) => {
    previousValue[currentValue.name] = currentValue.id;
    return previousValue;
  },
  {}
);
export default {
  getCustomDataId: (name) => customDataNamesMap[name] || name,
  getCustomDataName: (id) => customDataIdsMap[id] || id,
  getCustomDataNames: () =>
    customDataAttributes.map((userAttribute) => userAttribute.name)
};
