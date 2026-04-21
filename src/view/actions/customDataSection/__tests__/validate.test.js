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

import validate from '../validate';

describe('validate - custom_data data element', () => {
  test('returns no errors for a data element token', () => {
    const errors = validate({
      customDataType: 'raw',
      customDataRaw: '{{myDataElement}}',
      customDataJsonPairs: []
    });

    expect(errors).toEqual({});
  });

  test('does not require token to be valid JSON', () => {
    const errors = validate({
      customDataType: 'raw',
      customDataRaw: '{{not_valid_json}}',
      customDataJsonPairs: []
    });

    expect(errors).toEqual({});
  });

  test('returns error for non-token non-JSON raw value', () => {
    const errors = validate({
      customDataType: 'raw',
      customDataRaw: 'not json and not a token',
      customDataJsonPairs: []
    });

    expect(errors.customDataRaw).toBeTruthy();
  });
});
