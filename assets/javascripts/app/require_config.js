/* ===========================================================================
 * Copyright (C) 2019 CapsicoHealth, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

require.config({
  deps: ['./initialize_app'],
  paths: {
    'config'               : './config',
    'migrations/schema'    : '../database/migrations/schema',
    'app_view_helpers'     : './helpers/app_view_helpers',
    "database_helper"      : "./helpers/db_helper",
    "secure_storage_helper": './helpers/secure_storage_helper',
    "encryption_helper"    : "./helpers/encryption_helper",
    "login_helper"         : "./helpers/login_helper",
    'text'                : '../../../bower_components/text/text',
    'backbone'            : '../../../bower_components/backbone/backbone',
    'jquery-hammerjs'     : '../../../bower_components/jquery-hammerjs/jquery.hammer-full',
    'backbone-hammer'     : '../../../bower_components/backbone.hammer/backbone.hammer',
    'underscore'          : '../../../bower_components/lodash/lodash',
    'lodash'              : '../../../bower_components/lodash/dist/lodash',
    'jquery'              : '../../../bower_components/jquery/dist/jquery',
    "strftime"            : '../../../bower_components/strftime/strftime',
    'bootstrap'           : '../../../bower_components/bootstrap/dist/js/bootstrap',
    'jsSHA'               : '../../../bower_components/jsSHA/src/sha256',
    'aes-js'              : '../../../bower_components/aes-js/index',
  },
  shim: {
    backbone: {
      deps: ['jquery', 'underscore', 'strftime', 'app_view_helpers', 'config'],
      exports: 'Backbone'
    }
  }
});