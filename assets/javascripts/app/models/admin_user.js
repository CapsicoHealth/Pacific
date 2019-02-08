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

define(function(require, exports, module) {

  var Backbone = require('backbone');
  var User = Backbone.Model.extend({})

  User.fromJSON = function(jsonObjectArr) {
    var db = DatabaseHelper.getSecureDB();
    var promises = []
    for(let i=0; i<jsonObjectArr.length; i++) {
      let json = jsonObjectArr[i];
      let dbP = dbPromiseQuery("SELECT * from users where personRefnum = ? LIMIT 1", [json.personRefnum], true);
      dbP.then(function(res) {
        // Prepare Data
        let obj = { personRefnum: json.personRefnum, data: JSON.stringify(json) }
        let condition = { personRefnum: obj.personRefnum }
        let values = _.values(obj);
        // Check if INSERT OR UPDATE
        if(res.rows.length > 0) {
          return dbPromiseQuery(toUpdateSql("users", obj, condition), values, true)
        } else {
          return dbPromiseQuery(toInsertSql("users", obj), values, true)
        }
      })
      .then(function(res) {
        return res;
      })
      .catch(function(error) {
        errorLog(error);
      })
      promises.push(dbP);
    }
    return Promise.all(promises);
  }

  return User;
});