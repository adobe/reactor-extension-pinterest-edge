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
  Content,
  Flex,
  Link,
  TextField,
  ContextualHelp,
  Heading
} from '@adobe/react-spectrum';
import WrappedTextField from '../../components/wrappedTextField';

export default function ConfigurationFields() {
  return (
    <Flex direction="column" gap="size-65">
      <WrappedTextField
        name="adAccountId"
        component={TextField}
        width="size-4600"
        label="Ad Account ID"
        isRequired
        necessityIndicator="label"
        supportDataElement
        contextualHelp={
          <ContextualHelp>
            <Heading>Need help?</Heading>
            <Content>
              <p>
                For finding your ad account id you can log in to Pinterest on a
                business account and click on Ads/overview or
                Analytics/overview. Click on the tab that says &quot;Viewing:
                &lt;your account name&gt;&quot; and you will see a list of the
                accounts you can access. Under each account name is the
                <strong>ad_account_id</strong>. All{' '}
                <strong>ad_account_id</strong> numbers are twelve-digit codes
                that begin with &quot;549&quot;
              </p>
              <p>
                Read more about how to{' '}
                <Link>
                  <a
                    href="https://developers.pinterest.com/docs/conversions/conversions/#Find%20your%20ad_account_id"
                    rel="noreferrer"
                    target="_blank"
                  >
                    find your ad_account_id
                  </a>
                </Link>{' '}
                .
              </p>
            </Content>
          </ContextualHelp>
        }
      />

      <WrappedTextField
        name="conversionAccessToken"
        component={TextField}
        width="size-4600"
        label="Conversion Access Token"
        isRequired
        necessityIndicator="label"
        supportDataElement
        contextualHelp={
          <ContextualHelp>
            <Heading>Need help?</Heading>
            <Content>
              <p>
                To use the conversion endpoint, you need to generate an
                authentication token in Ads Manager. This is a
                conversion-specific token (&quot;conversion token&quot;) and
                cannot be used to call any other endpoint in the Pinterest API.
              </p>
              <p>
                Read more about how to{' '}
                <Link>
                  <a
                    href="https://developers.pinterest.com/docs/conversions/conversions/#Get%20the%20conversion%20token"
                    rel="noreferrer"
                    target="_blank"
                  >
                    get a conversion token
                  </a>
                </Link>{' '}
                .
              </p>
            </Content>
          </ContextualHelp>
        }
      />
    </Flex>
  );
}
