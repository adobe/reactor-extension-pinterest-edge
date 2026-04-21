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

import getInitValues from '../getInitValues';

describe('getInitValues - custom_data data element', () => {
  test('preserves the token string in customDataRaw', () => {
    const result = getInitValues({
      settings: { custom_data: '{{myDataElement}}' }
    });

    expect(result).toEqual({
      customDataType: 'raw',
      customDataRaw: '{{myDataElement}}',
      customDataJsonPairs: []
    });
  });

  test('does not JSON-stringify the token', () => {
    const result = getInitValues({
      settings: { custom_data: '{{custom_data_element}}' }
    });

    expect(result.customDataRaw).toBe('{{custom_data_element}}');
  });
});
