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

import { screen } from '@testing-library/react';
import renderView from '../../__tests_helpers__/renderView';

import Configuration from '../configuration';
import createExtensionBridge from '../../__tests_helpers__/createExtensionBridge';

import { changeInputValue } from '../../__tests_helpers__/jsDomHelpers';

let extensionBridge;

beforeEach(() => {
  extensionBridge = createExtensionBridge();
  window.extensionBridge = extensionBridge;
});

afterEach(() => {
  delete window.extensionBridge;
});

const getFromFields = () => ({
  adAccountIdInput: screen.getByLabelText(/ad account id/i, {
    selector: '[name="adAccountId"]'
  }),
  conversionAccessTokenInput: screen.queryByLabelText(
    /conversion access token/i,
    {
      selector: '[name="conversionAccessToken"]'
    }
  )
});

describe('Configuration view', () => {
  test('sets form values from settings', async () => {
    renderView(Configuration);

    extensionBridge.init({
      settings: {
        adAccountId: '123',
        conversionAccessToken: '54321'
      }
    });

    const { adAccountIdInput, conversionAccessTokenInput } = getFromFields();

    expect(adAccountIdInput.value).toBe('123');
    expect(conversionAccessTokenInput.value).toBe('54321');
  });

  test('sets settings from form values', async () => {
    renderView(Configuration);

    extensionBridge.init({
      settings: {
        adAccountId: '123',
        conversionAccessToken: '54321'
      }
    });

    const { adAccountIdInput, conversionAccessTokenInput } = getFromFields();

    await changeInputValue(adAccountIdInput, '333');
    await changeInputValue(conversionAccessTokenInput, '111111');

    expect(extensionBridge.getSettings()).toEqual({
      adAccountId: '333',
      conversionAccessToken: '111111'
    });
  });

  test('handles form validation correctly', async () => {
    renderView(Configuration);

    extensionBridge.init({
      settings: {
        adAccountId: '123',
        conversionAccessToken: '5555'
      }
    });

    const { adAccountIdInput, conversionAccessTokenInput } = getFromFields();

    expect(adAccountIdInput).not.toHaveAttribute('aria-invalid');
    expect(conversionAccessTokenInput).not.toHaveAttribute('aria-invalid');

    await changeInputValue(adAccountIdInput, '');
    await changeInputValue(conversionAccessTokenInput, '');
    await extensionBridge.validate();

    expect(adAccountIdInput).toHaveAttribute('aria-invalid', 'true');
    expect(conversionAccessTokenInput).toHaveAttribute('aria-invalid');
  });
});
