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

import WrappedTextField from '../../components/wrappedTextField';
import EventPropertiesEditor from '../../components/rawJsonEditor';
import EventPropertiesRow from './row';

import {
  addToVariablesFromEntity,
  addToEntityFromVariables
} from '../../utils/entityVariablesConverter';
import WrappedComboBoxField from '../../components/wrappedComboBox';
import eventPropertiesComboboxFields from './eventPropertiesComboboxFields';

const { getEventPropertyName, getEventPropertyId } =
  eventPropertiesComboboxFields;

export default function EventDataSectionFields() {
  const { setValue, watch } = useFormContext();
  const [eventPropertiesRaw, eventPropertiesJsonPairs] = watch([
    'eventPropertiesRaw',
    'eventPropertiesJsonPairs'
  ]);

  return (
    <View>
      <Heading level="3">Event Data</Heading>

      <WrappedComboBoxField
        name="event_name"
        width="size-4600"
        minWidth="size-4600"
        label="Event Name"
        supportDataElement
        allowsCustomValue
        necessityIndicator="label"
        isRequired
        defaultItems={[
          { id: 'add_to_cart', name: 'add_to_cart' },
          { id: 'checkout', name: 'checkout' },
          { id: 'custom', name: 'custom' },
          { id: 'lead', name: 'lead' },
          { id: 'page_visit', name: 'page_visit' },
          { id: 'search', name: 'search' },
          { id: 'signup', name: 'signup' },
          { id: 'view_category', name: 'view_category' },
          { id: 'watch_video', name: 'watch_video' }
        ]}
      />

      <WrappedComboBoxField
        name="action_source"
        width="size-4600"
        minWidth="size-4600"
        label="Action Source"
        description="The source indicating where the conversion event occurred."
        supportDataElement
        allowsCustomValue
        necessityIndicator="label"
        isRequired
        defaultItems={[
          { id: 'web', name: 'web' },
          { id: 'offline', name: 'offline' },
          { id: 'app_android', name: 'app_android' },
          { id: 'app_ios', name: 'app_ios' }
        ]}
      />

      <WrappedTextField
        name="event_time"
        width="size-4600"
        label="Event Time"
        necessityIndicator="label"
        isRequired
        description="The time when the event happened. Unix timestamp in seconds."
        supportDataElement
      />

      <WrappedTextField
        name="event_id"
        width="size-4600"
        label="Event ID"
        necessityIndicator="label"
        isRequired
        description={
          'A unique id string that identifies this event and can be used for deduping between ' +
          'events ingested via both the conversion API and Pinterest tracking.'
        }
        supportDataElement
      />

      <EventPropertiesEditor
        label="Event Properties"
        radioLabel="Select the way you want to provide the event data"
        description="A valid JSON object or a data element."
        typeVariable="eventPropertiesType"
        rawVariable="eventPropertiesRaw"
        jsonVariable="eventPropertiesJsonPairs"
        getEmptyJsonValueFn={getEmptyDataJson}
        row={EventPropertiesRow}
        onTypeSwitch={(v) => {
          // Auto Update Data Content
          if (v === 'json') {
            let variables = [];
            try {
              variables = addToVariablesFromEntity(
                [],
                JSON.parse(eventPropertiesRaw)
              ).map(({ key, value }) => ({
                key: getEventPropertyName(key),
                value
              }));
            } catch (e) {
              // Don't do anything
            }

            if (variables.length === 0) {
              variables.push(getEmptyDataJson());
            }

            setValue('eventPropertiesJsonPairs', variables, {
              shouldValidate: true,
              shouldDirty: true
            });
          } else if (
            eventPropertiesJsonPairs.length > 1 ||
            eventPropertiesJsonPairs[0].key
          ) {
            let entity = JSON.stringify(
              addToEntityFromVariables(
                {},
                eventPropertiesJsonPairs.map(({ key, value }) => ({
                  key: getEventPropertyId(key),
                  value
                }))
              ),
              null,
              2
            );

            if (entity === '{}') {
              entity = '';
            }

            setValue('eventPropertiesRaw', entity, {
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
