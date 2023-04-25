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

const userAttributes = [
  { id: 'ph', name: 'Phone' },
  { id: 'ge', name: 'Gender' },
  { id: 'db', name: 'Date of Birth' },
  { id: 'ln', name: 'Last Name' },
  { id: 'fn', name: 'First Name' },
  { id: 'ct', name: 'City' },
  { id: 'st', name: 'State' },
  { id: 'zp', name: 'Zip Code' },
  { id: 'country', name: 'Country' },
  { id: 'external_id', name: 'External ID' },
  { id: 'click_id', name: 'Click ID' }
];

const userDataIdsMap = userAttributes.reduce((previousValue, currentValue) => {
  previousValue[currentValue.id] = currentValue.name;
  return previousValue;
}, {});

const userDataNamesMap = userAttributes.reduce(
  (previousValue, currentValue) => {
    previousValue[currentValue.name] = currentValue.id;
    return previousValue;
  },
  {}
);
export default {
  getUserDataId: (name) => userDataNamesMap[name] || name,
  getUserDataName: (id) => userDataIdsMap[id] || id,
  getUserDataNames: () =>
    userAttributes.map((userAttribute) => userAttribute.name)
};
