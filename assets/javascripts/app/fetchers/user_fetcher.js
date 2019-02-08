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

define(function(require) {
  var CapsicoConfig = require('config');
  var User = require('models/admin_user')

  var returnMethod = function() {

    var promise = new Promise(function(resolve, reject) {

      var users_list_url = window.serverName + CapsicoConfig.users.list.path;
      $http(users_list_url).get({Size: 10000})
        .then(function(response) {
          return User.fromJSON(response.data);
        })
        .then(function(res) {
          resolve({})
        })
        .catch(function(error) {
          console.error("~~> Error while syncing Users List")
          console.error("Message: ", error.message)
          reject(error)
        })
    })
    return promise;
  }
  
  return returnMethod;
});