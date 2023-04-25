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
  language: {
    description: (
      <span>
        Two-character{' '}
        <Link>
          <a
            href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes"
            rel="noreferrer"
            target="_blank"
          >
            ISO-639-1
          </a>
        </Link>{' '}
        language code indicating the user&rsquo;s language.
      </span>
    )
  }
};
