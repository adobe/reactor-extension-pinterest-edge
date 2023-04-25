/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/* eslint-disable camelcase */

const sendEvent = require('../sendEvent');
const arc = {};

describe('Send Event library module', () => {
  test('makes a fetch call to the provided url', () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const extensionSettings = {
      adAccountId: 'ID123',
      conversionAccessToken: 'token'
    };

    const settings = {
      user_identification: {
        em: 'email@email.com',
        client_ip_address: '192.168.0.1',
        client_user_agent: 'Chrome',
        hashed_maids: ['a', 'b']
      },
      user_data: {
        ph: '111-111-1111',
        ge: 'o',
        db: '1999-01-02',
        ln: 'name',
        fn: 'first',
        ct: 'San Francisco',
        st: 'CA',
        country: 'US',
        external_id: '123',
        click_id: '234'
      },
      event: {
        event_name: 'custom',
        action_source: 'web',
        event_time: 123,
        event_id: 'abc',
        properties: {
          event_source_url: 'http://url.com',
          app_id: 'i',
          app_name: 'n',
          app_version: '1.0',
          device_brand: 'Apple',
          device_carrier: 'Verizon',
          device_model: '11',
          device_type: 'XL',
          os_version: '15',
          language: 'en'
        }
      },
      custom_data: {
        currency: 'USD',
        value: '100',
        search_string: 'books',
        order_id: '123',
        num_items: 5,
        content_ids: ['a', 'b'],
        contents: [
          {
            price: 100,
            quantity: 2
          },
          {
            price: 100,
            quantity: 2
          }
        ]
      },
      isTestEvent: true
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };

    return sendEvent({ arc, utils }).then(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://api.pinterest.com/v5/ad_accounts/ID123/events?test=true',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'text/plain',
            Authorization: 'Bearer token'
          },
          body:
            '{' +
            '"data":[' +
            '{' +
            '"event_name":"custom",' +
            '"action_source":"web",' +
            '"event_time":123,' +
            '"event_id":"abc",' +
            '"event_source_url":"http://url.com",' +
            '"app_id":"i",' +
            '"app_name":"n",' +
            '"app_version":"1.0",' +
            '"device_brand":"Apple",' +
            '"device_carrier":"Verizon",' +
            '"device_model":"11",' +
            '"device_type":"XL",' +
            '"os_version":"15",' +
            '"language":"en",' +
            '"partner_name":"ss-adobe",' +
            '"user_data":{' +
            '"ph":["d2d02ea74de2c9fab1d802db969c18d409a8663a9697977bb1c98ccdd9de4372"],' +
            '"ge":["65c74c15a686187bb6bbf9958f494fc6b80068034a659a9ad44991b08c58f2d2"],' +
            '"db":["321f184c12de148c8cf04720220d703fe7905aa1ee9b1f8087bd38403753fca6"],' +
            '"ln":["82a3537ff0dbce7eec35d69edc3a189ee6f17d82f353a553f9aa96cb0be3ce89"],' +
            '"fn":["a7937b64b8caa58f03721bb6bacf5c78cb235febe0e70b1b84cd99541461a08e"],' +
            '"ct":["1a6bd4d9d79dc0a79b53795c70d3349fa9e38968a3fbefbfe8783efb1d2b6aac"],' +
            '"st":["6959097001d10501ac7d54c0bdb8db61420f658f2922cc26e46d536119a31126"],' +
            '"country":["79adb2a2fce5c6ba215fe5f27f532d4e7edbac4b6a5e09e1ef3a08084a904621"],' +
            '"external_id":["a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3"],' +
            '"click_id":"234",' +
            '"em":["f3273dd18d95bc19d51d3e6356e4a679e6f13824497272a270e7bb540b0abb9d"],' +
            '"client_ip_address":"192.168.0.1",' +
            '"client_user_agent":"Chrome",' +
            '"hashed_maids":["a","b"]' +
            '},' +
            '"custom_data":{' +
            '"currency":"USD",' +
            '"value":"100",' +
            '"search_string":"books",' +
            '"order_id":"123",' +
            '"num_items":5,' +
            '"content_ids":["a","b"],' +
            '"contents":[{"price":100,"quantity":2},{"price":100,"quantity":2}]' +
            '}' +
            '}' +
            ']' +
            '}'
        }
      );
    });
  });

  test('throws an error when a hashable value is not string or a number', async () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const extensionSettings = {
      adAccountId: 'ID123',
      conversionAccessToken: 'token'
    };

    const settings = {
      user_identification: {
        em: 'email@email.com'
      },
      user_data: {
        ph: { a: '111-111-1111' }
      },
      event: {
        event_name: 'custom',
        action_source: 'web',
        event_time: 123,
        event_id: 'abc'
      }
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };
    try {
      await sendEvent({ arc, utils });
    } catch (e) {
      expect(e.message).toBe(
        'The value of the "Phone (user_data.ph)" field is not a string or a number. ' +
          'Cannot generate a SHA-256 string.'
      );
    }
  });
});
