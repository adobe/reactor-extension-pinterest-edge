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

import SendEvent from '../sendEvent';
import createExtensionBridge from '../../__tests_helpers__/createExtensionBridge';

import {
  changeInputValue,
  changeComboboxValue,
  click
} from '../../__tests_helpers__/jsDomHelpers';

let extensionBridge;

beforeEach(() => {
  extensionBridge = createExtensionBridge();
  window.extensionBridge = extensionBridge;
});

afterEach(() => {
  delete window.extensionBridge;
});

const getFormFields = () => ({
  eventNameInput: screen.getByLabelText(/event name/i, {
    selector: '[name="event_name"]'
  }),
  actionSourceInput: screen.getByLabelText(/action source/i, {
    selector: '[name="action_source"]'
  }),
  eventTimeInput: screen.getByLabelText(/event time/i, {
    selector: '[name="event_time"]'
  }),
  eventIdInput: screen.getByLabelText(/event id/i, {
    selector: '[name="event_id"]'
  }),
  eventPropertiesRawTextarea: screen.getByLabelText(/event properties raw/i),
  emailInput: screen.getByLabelText(/email/i, {
    selector: '[name="user_identification.em"]'
  }),

  mobileAdvertisingIdInput: screen.getByLabelText(
    /Mobile Advertising ID Value 0/i
  ),
  clientIpAddressInput: screen.getByLabelText(/client ip address/i),
  clientUserAgentInput: screen.getByLabelText(/client user agent/i),
  userDataRawTextarea: screen.getByLabelText(/user data raw/i),
  customDataRawTextarea: screen.getByLabelText(/custom data raw/i),
  testEventCheckbox: screen.getByLabelText(/send as test event/i)
});

describe('Send Event view', () => {
  test('sets form values from settings', async () => {
    renderView(SendEvent);

    extensionBridge.init({
      settings: {
        user_identification: {
          em: 'email@email.com',
          client_ip_address: '192.168.0.1',
          client_user_agent: 'Chrome',
          hashed_maids: ['a']
        },
        user_data: {
          ph: '111111111'
        },
        event: {
          event_name: 'add_to_cart',
          action_source: 'web',
          event_time: 123,
          event_id: '123',
          properties: {
            event_source_url: 'a'
          }
        },
        custom_data: {
          currency: 'USD'
        },
        isTestEvent: true
      }
    });

    const {
      eventNameInput,
      actionSourceInput,
      eventTimeInput,
      eventIdInput,
      eventPropertiesRawTextarea,
      emailInput,
      mobileAdvertisingIdInput,
      clientIpAddressInput,
      clientUserAgentInput,
      userDataRawTextarea,
      customDataRawTextarea,
      testEventCheckbox
    } = getFormFields();

    expect(eventNameInput.value).toBe('add_to_cart');
    expect(actionSourceInput.value).toBe('web');
    expect(eventTimeInput.value).toBe('123');
    expect(eventIdInput.value).toBe('123');
    expect(emailInput.value).toBe('email@email.com');
    expect(mobileAdvertisingIdInput.value).toBe('a');
    expect(clientIpAddressInput.value).toBe('192.168.0.1');
    expect(clientUserAgentInput.value).toBe('Chrome');
    expect(eventPropertiesRawTextarea.value).toBe(
      '{\n  "event_source_url": "a"\n}'
    );
    expect(userDataRawTextarea.value).toBe('{\n  "ph": "111111111"\n}');
    expect(customDataRawTextarea.value).toBe('{\n  "currency": "USD"\n}');
    expect(testEventCheckbox).toBeChecked();
  });

  test('sets settings from form values', async () => {
    renderView(SendEvent);

    extensionBridge.init();

    const {
      eventNameInput,
      actionSourceInput,
      eventTimeInput,
      eventIdInput,
      eventPropertiesRawTextarea,
      emailInput,
      mobileAdvertisingIdInput,
      clientIpAddressInput,
      clientUserAgentInput,
      userDataRawTextarea,
      customDataRawTextarea,
      testEventCheckbox
    } = getFormFields();

    await changeComboboxValue(eventNameInput, 'checkout');
    await changeComboboxValue(actionSourceInput, 'ios');
    await changeInputValue(eventTimeInput, '123');
    await changeInputValue(eventIdInput, '123');
    await changeInputValue(
      eventPropertiesRawTextarea,
      '{{"event_source_url":"a"}'
    );
    await changeInputValue(emailInput, 'email@email.com');
    await changeInputValue(mobileAdvertisingIdInput, 'aaa');
    await changeInputValue(clientIpAddressInput, '192.168.0.1');
    await changeInputValue(clientUserAgentInput, 'Chrome');
    await changeInputValue(userDataRawTextarea, '{{"ph":"a"}');
    await changeInputValue(customDataRawTextarea, '{{"currency":"USD"}');
    await click(testEventCheckbox);

    expect(extensionBridge.getSettings()).toEqual({
      user_identification: {
        em: 'email@email.com',
        client_ip_address: '192.168.0.1',
        client_user_agent: 'Chrome',
        hashed_maids: ['aaa']
      },
      user_data: {
        ph: 'a'
      },
      event: {
        event_name: 'checkout',
        action_source: 'ios',
        event_time: 123,
        event_id: '123',
        properties: {
          event_source_url: 'a'
        }
      },
      custom_data: {
        currency: 'USD'
      },
      isTestEvent: true
    });
  });

  test('handles form validation correctly', async () => {
    renderView(SendEvent);

    extensionBridge.init();

    const { eventNameInput, actionSourceInput, eventTimeInput, eventIdInput } =
      getFormFields();

    await extensionBridge.validate();

    expect(eventNameInput).toHaveAttribute('aria-invalid', 'true');
    expect(actionSourceInput).toHaveAttribute('aria-invalid', 'true');
    expect(eventTimeInput).toHaveAttribute('aria-invalid', 'true');
    expect(eventIdInput).toHaveAttribute('aria-invalid', 'true');
  });
});
