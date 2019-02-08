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
  var app_db_migration = require('text!../database/migrations/app_db.json')
  var config = require('config')
  var app_db_migration = JSON.parse(app_db_migration);
  _.each(app_db_migration.migrations, function(migration){
    persistence_sqlite.defineMigration(migration.version, {
      up: function() {
        var that = this;
        _.each(migration.up, function(sql_stmnt){
          console.log("Executing "+sql_stmnt);
          that.executeSql(sql_stmnt);
        })
      }
    });
  })
  var AppData = require('app_db_models/app_db');

  persistence_sqlite.defineMigration(3, {
    up: function() {
      var app_data = new AppData();
      app_data.first_time_user = 0;
      console.log("inserting new row");
      persistence_sqlite.add(app_data);
      persistence_sqlite.flush();
    }
  });

  return app_db_migration
});