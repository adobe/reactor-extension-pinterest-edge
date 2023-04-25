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

const generateSha256 = async function sha256(str) {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder('utf-8').encode(String(str))
  );
  return Array.prototype.map
    .call(new Uint8Array(buf), (x) => ('00' + x.toString(16)).slice(-2))
    .join('');
};

const isSha256String = require('./isSha256String');
const { isString, isNumber } = require('./validators');

module.exports = async (fieldName, data) => {
  if (!isString(data) && !isNumber(data)) {
    throw new Error(
      `The value of the "${fieldName}" field is not a string or a number. ` +
        'Cannot generate a SHA-256 string.'
    );
  }
  return isSha256String(data) ? data : await generateSha256(data);
};
