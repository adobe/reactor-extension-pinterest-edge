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
import {
  View,
  Heading,
  Flex,
  TextArea,
  RadioGroup,
  Radio,
  Divider,
  Button,
  Text
} from '@adobe/react-spectrum';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import Add from '@spectrum-icons/workflow/Add';
import WrappedTextField from './wrappedTextField';
import camelToTitle from '../utils/camelToTitle';

export default function RawJsonEditor({
  label,
  radioLabel,
  description,
  isRequired,
  typeVariable,
  rawVariable,
  jsonVariable,
  getEmptyJsonValueFn,
  onTypeSwitch,
  contextualHelp,
  row
}) {
  const { control, watch } = useFormContext();
  const [propertiesType, jsonPairs] = watch([typeVariable, jsonVariable]);

  const jsonKeys = Object.keys(getEmptyJsonValueFn());

  const { fields, append, remove } = useFieldArray({
    name: jsonVariable
  });

  return (
    <Flex direction="column" gap={propertiesType === 'raw' ? 'size-150' : ''}>
      <Controller
        control={control}
        name={typeVariable}
        defaultValue=""
        render={({ field: { onChange: reactHookFormOnChange, value } }) => (
          <RadioGroup
            label={label}
            isRequired={isRequired}
            necessityIndicator={isRequired ? 'label' : ''}
            value={value}
            onChange={(v) => {
              reactHookFormOnChange(v);
              onTypeSwitch(v);
            }}
            contextualHelp={contextualHelp}
          >
            <Flex alignItems="center">
              <Text marginEnd="size-150">{radioLabel}</Text>
              <Radio
                value="raw"
                aria-label={`${camelToTitle(typeVariable)} Raw`}
              >
                Raw
              </Radio>
              <Radio
                value="json"
                aria-label={`${camelToTitle(typeVariable)} JSON`}
              >
                JSON Key-Value Pairs Editor
              </Radio>
            </Flex>
          </RadioGroup>
        )}
      />

      {propertiesType === 'json' ? (
        <>
          <Flex direction="column" gap="size-100">
            <Flex direction="row" gap="size-200">
              <View flex>
                <Heading
                  level="5"
                  marginStart="size-100"
                  marginTop="size-100"
                  marginBottom="size-50"
                >
                  {jsonKeys[0].toUpperCase()}
                </Heading>
              </View>
              <View flex>
                <Heading
                  level="5"
                  marginStart="size-100"
                  marginTop="size-100"
                  marginBottom="size-50"
                >
                  {jsonKeys[1].toUpperCase()}
                </Heading>
              </View>
              <View width="size-450" />
            </Flex>
            <Divider size="S" />
            {fields.map(row.bind(null, remove, jsonPairs))}
          </Flex>

          <View>
            <Button
              variant="primary"
              onPress={() => append(getEmptyJsonValueFn())}
            >
              <Add />
              <Text>Add Another</Text>
            </Button>
          </View>
        </>
      ) : (
        <WrappedTextField
          minWidth="size-4600"
          width="100%"
          component={TextArea}
          name={rawVariable}
          aria-label={camelToTitle(rawVariable)}
          supportDataElement
          description={description}
        />
      )}
    </Flex>
  );
}
