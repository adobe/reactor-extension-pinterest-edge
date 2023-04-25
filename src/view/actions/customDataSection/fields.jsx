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
import { useFormContext } from 'react-hook-form';

import { Heading, View } from '@adobe/react-spectrum';
import getEmptyDataJson from './getEmptyValue';

import CustomDataEditor from '../../components/rawJsonEditor';
import CustomDataRow from './row';
import customDataComboboxFields from './customDataComboboxFields';

import {
  addToVariablesFromEntity,
  addToEntityFromVariables
} from '../../utils/entityVariablesConverter';

const { getCustomDataName, getCustomDataId } = customDataComboboxFields;

export default function CustomDataSectionFields() {
  const { setValue, watch } = useFormContext();
  const [customDataRaw, customDataJsonPairs] = watch([
    'customDataRaw',
    'customDataJsonPairs'
  ]);

  return (
    <View>
      <Heading level="3">Custom Data</Heading>

      <CustomDataEditor
        label="Custom Data"
        radioLabel="Select the way you want to provide the custom atrributes"
        description="A valid JSON object or a data element."
        typeVariable="customDataType"
        rawVariable="customDataRaw"
        jsonVariable="customDataJsonPairs"
        getEmptyJsonValueFn={getEmptyDataJson}
        row={CustomDataRow}
        onTypeSwitch={(v) => {
          // Auto Update Data Content
          if (v === 'json') {
            let variables = [];
            try {
              variables = addToVariablesFromEntity(
                [],
                JSON.parse(customDataRaw)
              ).map(({ key, value }) => ({
                key: getCustomDataName(key),
                value
              }));
            } catch (e) {
              // Don't do anything
            }

            if (variables.length === 0) {
              variables.push(getEmptyDataJson());
            }

            setValue('customDataJsonPairs', variables, {
              shouldValidate: true,
              shouldDirty: true
            });
          } else if (
            customDataJsonPairs.length > 1 ||
            customDataJsonPairs[0].key
          ) {
            let entity = JSON.stringify(
              addToEntityFromVariables(
                {},
                customDataJsonPairs.map(({ key, value }) => ({
                  key: getCustomDataId(key),
                  value
                }))
              ),
              null,
              2
            );

            if (entity === '{}') {
              entity = '';
            }

            setValue('customDataRaw', entity, {
              shouldValidate: true,
              shouldDirty: true
            });
          }
          // END: Auto Update Data Content
        }}
      />
    </View>
  );
}
