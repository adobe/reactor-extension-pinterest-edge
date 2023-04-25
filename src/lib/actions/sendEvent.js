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

const {
  emailNormalizer,
  phoneNumberNormalizer,
  genderNormalizer,
  nameNormalizer,
  cityNormalizer,
  stateNormalizer,
  zipNormalizer,
  countryNormalizer
} = require('./helpers/normalizers');
const shaHashingHelper = require('./helpers/shaHashingHelper');
const { isObject } = require('./helpers/validators');

/* eslint-disable camelcase */

const buildFetchObject = async ({
  conversionAccessToken,
  settings: { user_identification, user_data, event, custom_data }
}) => {
  if (event.properties && isObject(event.properties)) {
    const properties = event.properties;
    delete event.properties;

    event = { ...event, ...properties };
  }

  event.partner_name = 'ss-adobe';

  user_data = { ...user_data, ...user_identification };

  const normalizers = [
    ['em', emailNormalizer],
    ['ph', phoneNumberNormalizer],
    ['ge', genderNormalizer],
    ['db', shaHashingHelper.bind(null, 'Date of Birth (user_data.db)')],
    ['ln', nameNormalizer.bind(null, 'Last Name (user_data.ln)')],
    ['fn', nameNormalizer.bind(null, 'First Name (user_data.fn)')],
    ['ct', cityNormalizer],
    ['st', stateNormalizer],
    ['zp', zipNormalizer],
    ['country', countryNormalizer],
    [
      'external_id',
      shaHashingHelper.bind(null, 'External ID (user_data.external_id)')
    ]
  ];

  for await (const [field, normalizer] of normalizers) {
    if (user_data[field]) {
      user_data[field] = [await normalizer(user_data[field])];
    }
  }

  const body = event;
  body.user_data = user_data;

  if (custom_data) {
    body.custom_data = custom_data;
  }

  return {
    method: 'POST',
    headers: {
      Accept: 'text/plain',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${conversionAccessToken}`
    },
    body: JSON.stringify({ data: [body] })
  };
};

const buildUrl = (adAccountId, isTestEvent) =>
  `https://api.pinterest.com/v5/ad_accounts/${adAccountId}/events${
    isTestEvent ? '?test=true' : ''
  }`;

module.exports = async ({ utils }) => {
  const { getExtensionSettings, getSettings, fetch } = utils;
  const { adAccountId, conversionAccessToken } = getExtensionSettings();
  const { isTestEvent, ...settings } = getSettings();

  return fetch(
    buildUrl(adAccountId, isTestEvent),
    await buildFetchObject({
      conversionAccessToken,
      settings
    })
  );
};
