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

const eventProperties = [
  { id: 'event_source_url', name: 'Event Source URL' },
  { id: 'app_id', name: 'Application Store ID' },
  { id: 'app_name', name: 'Application Name' },
  { id: 'app_version', name: 'Application Version' },
  { id: 'device_brand', name: 'Device Brand' },
  { id: 'device_carrier', name: 'Device Carrier' },
  { id: 'device_model', name: 'Device Model' },
  { id: 'device_type', name: 'Device Type' },
  { id: 'os_version', name: 'OS Version' },
  { id: 'language', name: 'User Language' }
];

const eventPropertiesIdsMap = eventProperties.reduce(
  (previousValue, currentValue) => {
    previousValue[currentValue.id] = currentValue.name;
    return previousValue;
  },
  {}
);

const eventPropertiesNamesMap = eventProperties.reduce(
  (previousValue, currentValue) => {
    previousValue[currentValue.name] = currentValue.id;
    return previousValue;
  },
  {}
);
export default {
  getEventPropertyId: (name) => eventPropertiesNamesMap[name] || name,
  getEventPropertyName: (id) => eventPropertiesIdsMap[id] || id,
  getEventPropertyNames: () =>
    eventProperties.map((userAttribute) => userAttribute.name)
};
