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

export const isObject = (value) =>
  typeof value === 'object' && !Array.isArray(value) && value !== null;

export const isRequired = (value) => value != null;

export const isArray = (value) => Array.isArray(value);

export const isValidJson = (value) => {
  try {
    JSON.parse(value);
  } catch {
    return false;
  }

  return true;
};

export const isDataElementToken = (value) => /^{{([^}]+)}}$/.test(value);

export const isString = (value) =>
  typeof value === 'string' || value instanceof String;
