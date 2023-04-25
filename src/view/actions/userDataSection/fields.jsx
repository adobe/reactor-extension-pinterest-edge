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

/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { Content, Heading, Text, View, Badge } from '@adobe/react-spectrum';
import Alert from '@spectrum-icons/workflow/Alert';
import { useFormContext } from 'react-hook-form';
import WrappedTextField from '../../components/wrappedTextField';
import MultipleValueEditor from '../../components/multipleValueEditor';
import MaidRow from './maidRow';
import UserDataEditor from '../../components/rawJsonEditor';
import UserDataRow from './userDataRow';
import userDataComboboxFields from './userDataComboboxFields';
import getEmptyDataJson from './getEmptyValue';
import {
  addToVariablesFromEntity,
  addToEntityFromVariables
} from '../../utils/entityVariablesConverter';

const { getUserDataName, getUserDataId } = userDataComboboxFields;

export default function ServerEventParametersFields() {
  const { setValue, watch } = useFormContext();
  const [userDataRaw, userDataJsonPairs] = watch([
    'userDataRaw',
    'userDataJsonPairs'
  ]);

  return (
    <View>
      <Heading level="3">User Data</Heading>

      <Content marginBottom="size-150">
        <Text>
          To link the event to a user you need to fill in either the
          &rsquo;Email&rsquo; field, or the &rsquo;Mobile advertising ID&rsquo;
          field or the &rsquo;Client IP Address&rsquo; and &rsquo;Client User
          Agent&rsquo; fields.
        </Text>
      </Content>

      <WrappedTextField
        name="user_identification.em"
        width="size-4600"
        label="Email"
        supportDataElement
      />

      <MultipleValueEditor
        label="Mobile Adverstising IDs"
        name="user_identification.hashed_maids"
        getEmptyValueFn={() => ({
          value: ''
        })}
        row={MaidRow}
      />

      <WrappedTextField
        name="user_identification.client_ip_address"
        width="size-4600"
        label="Client IP Address"
        supportDataElement
      />

      <WrappedTextField
        name="user_identification.client_user_agent"
        width="size-4600"
        label="Client User Agent"
        supportDataElement
      />

      <UserDataEditor
        label="Customer information data"
        radioLabel="Select the way you want to provide the user atrributes"
        description="A valid JSON object or a data element."
        typeVariable="userDataType"
        rawVariable="userDataRaw"
        jsonVariable="userDataJsonPairs"
        getEmptyJsonValueFn={getEmptyDataJson}
        row={UserDataRow}
        onTypeSwitch={(v) => {
          // Auto Update Data Content
          if (v === 'json') {
            let variables = [];
            try {
              variables = addToVariablesFromEntity(
                [],
                JSON.parse(userDataRaw)
              ).map(({ key, value }) => ({
                key: getUserDataName(key),
                value
              }));
            } catch (e) {
              // Don't do anything
            }

            if (variables.length === 0) {
              variables.push(getEmptyDataJson());
            }

            setValue('userDataJsonPairs', variables, {
              shouldValidate: true,
              shouldDirty: true
            });
          } else if (userDataJsonPairs.length > 1 || userDataJsonPairs[0].key) {
            let entity = JSON.stringify(
              addToEntityFromVariables(
                {},
                userDataJsonPairs.map(({ key, value }) => ({
                  key: getUserDataId(key),
                  value
                }))
              ),
              null,
              2
            );

            if (entity === '{}') {
              entity = '';
            }

            setValue('userDataRaw', entity, {
              shouldValidate: true,
              shouldDirty: true
            });
          }
          // END: Auto Update Data Content
        }}
      />

      <Badge variant="info" marginTop="size-100">
        <Alert aria-label="Information about field hashing" />
        <Text>
          Before sending the data to the Pinterest API endpoint, the extension
          will hash and normalize the values of the following fields: Email,
          Phone Number, First Name, Last Name, Gender, Date of Birth, City,
          State, Zip Code, Country, and External ID. <br />
          The extension will not hash the value of these fields if a SHA256
          string is already present.
        </Text>
      </Badge>
    </View>
  );
}
