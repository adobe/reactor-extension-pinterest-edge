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
import React from 'react';

import { Content, Link, Text } from '@adobe/react-spectrum';
import ExtensionView from '../components/extensionView';

import UserDataFields from './userDataSection/fields';
import getUserDataInitValues from './userDataSection/getInitValues';
import getUserDataSettings from './userDataSection/getSettings';
import validateUserDataFields from './userDataSection/validate';

import EventDataFields from './eventDataSection/fields';
import getEventDataInitValues from './eventDataSection/getInitValues';
import getEventDataSettings from './eventDataSection/getSettings';
import validateEventDataFields from './eventDataSection/validate';

import CustomDataFields from './customDataSection/fields';
import getCustomDataInitValues from './customDataSection/getInitValues';
import getCustomDataSettings from './customDataSection/getSettings';
import validateCustomDataFields from './customDataSection/validate';

import TestEventFields from './testEventSection/fields';
import getTestEventInitValues from './testEventSection/getInitValues';
import getTestEventSettings from './testEventSection/getSettings';
import validateTestEventFields from './testEventSection/validate';

export default function SendCapiData() {
  return (
    <ExtensionView
      getInitialValues={({ initInfo }) => ({
        ...getUserDataInitValues(initInfo),
        ...getEventDataInitValues(initInfo),
        ...getCustomDataInitValues(initInfo),
        ...getTestEventInitValues(initInfo)
      })}
      getSettings={({ values }) => ({
        ...getUserDataSettings(values),
        ...getEventDataSettings(values),
        ...getCustomDataSettings(values),
        ...getTestEventSettings(values)
      })}
      validate={(values) => ({
        ...validateUserDataFields(values),
        ...validateEventDataFields(values),
        ...validateCustomDataFields(values),
        ...validateTestEventFields(values)
      })}
      render={() => (
        <>
          <Content>
            <Text>These events will be sent to Pinterest using the</Text>{' '}
            <Link>
              <a
                href="https://developers.pinterest.com/docs/conversions/conversions/"
                target="_blank"
                rel="noreferrer"
              >
                Conversion Events
              </a>
            </Link>{' '}
            endpoint.
          </Content>
          <EventDataFields />
          <UserDataFields />
          <CustomDataFields />
          <TestEventFields />
        </>
      )}
    />
  );
}
