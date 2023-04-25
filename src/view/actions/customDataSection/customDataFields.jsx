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

import { Link } from '@adobe/react-spectrum';
import React from 'react';

export default {
  num_items: {
    description: 'Total number of products of the event. '
  },
  order_id: {
    description:
      'The order ID. Pinterest recommends sending the Order ID to ' +
      'deduplicate events when necessary.'
  },
  search_string: {
    description: 'The search string related to the user conversion event.'
  },
  value: {
    description:
      'Total value of the event. Accepted as a string in the request; ' +
      'it will be parsed into a double.'
  },
  currency: {
    description: (
      <span>
        Currency as a string in{' '}
        <Link>
          <a
            href="https://en.wikipedia.org/wiki/ISO_4217"
            rel="noreferrer"
            target="_blank"
          >
            ISO-4217
          </a>
        </Link>{' '}
        format. If not provided, we will default to the advertiser&rsquo;s
        currency set during account creation.
      </span>
    )
  }
};
