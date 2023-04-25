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
import { View, Flex, Button, Text } from '@adobe/react-spectrum';
import { useFieldArray } from 'react-hook-form';
import Add from '@spectrum-icons/workflow/Add';
import Asterisk from '@spectrum-icons/workflow/Asterisk';

export default function MultipleValueEditor({
  name,
  isRequired,
  necessityIndicator,
  getEmptyValueFn,
  row,
  label,
  contextualHelp
}) {
  const { fields, append, remove } = useFieldArray({
    name
  });

  return (
    <Flex direction="column">
      {label ? (
        <Text
          UNSAFE_style={{
            fontSize:
              'var(--spectrum-fieldlabel-text-size,var(--spectrum-global-dimension-font-size-75))',
            color:
              'var(--spectrum-fieldlabel-text-color,var(--spectrum-alias-label-text-color))'
          }}
        >
          {label}
          {isRequired && necessityIndicator === 'label' ? ' (required)' : null}
          {isRequired && necessityIndicator !== 'label' ? (
            <Asterisk
              marginStart="size-50"
              UNSAFE_style={{
                color:
                  'var(--spectrum-fieldlabel-asterisk-color,var(--spectrum-global-color-gray-600))',
                height:
                  'var(--spectrum-fieldlabel-asterisk-size,' +
                  'var(--spectrum-global-dimension-size-100))',
                width:
                  'var(--spectrum-fieldlabel-asterisk-size,' +
                  'var(--spectrum-global-dimension-size-100))'
              }}
            />
          ) : null}
          {contextualHelp}
        </Text>
      ) : (
        ''
      )}
      <Flex direction="column" gap="size-100" marginTop="size-100">
        {fields.map(row.bind(null, remove))}
      </Flex>

      <View marginBottom="size-100">
        <Button variant="primary" onPress={() => append(getEmptyValueFn())}>
          <Add />
          <Text>Add Another</Text>
        </Button>
      </View>
    </Flex>
  );
}
