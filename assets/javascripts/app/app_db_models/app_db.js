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
  // "CREATE TABLE IF NOT EXISTS app_data(id integer primary key AUTOINCREMENT,
  // first_time_user INTEGER DEFAULT 0, 
  // last_try DATETIME,
  // number_of_failed_attempts INTEGER DEFAULT 0,
  // created_at DATETIME,
  // signed_in_at DATETIME, updated_at DATETIME)"
  var AppData = persistence_sqlite.define('app_data', {
    last_try: "DATE",
    number_of_failed_attempts: "INT",
    created_at: "DATE",
    signed_in_at: "DATE"
  });
  AppData.first = function(){
    var p = new Promise(function(resolve, reject){
      AppData.all().one(null, function(app_data){
        resolve(app_data)
      })
    }, function(error){
      errorLog(error);
      reject(error)
    });
    return p;
  }
  AppData.prototype.save = function(){
    persistence_sqlite.add(this);
  }
  return AppData;
});