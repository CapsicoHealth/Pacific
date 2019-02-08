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
  var _            = require('underscore');
  user_db_migration = require('text!../database/migrations/user_db.json')
  user_db_migration = JSON.parse(user_db_migration);
  _.each(user_db_migration.migrations, function(migration){
    persistence_sqlcipher.defineMigration(migration.version, {
      up: function() {
        var that = this;
        _.each(migration.up, function(sql_stmnt){
          cl(sql_stmnt);
          that.executeSql(sql_stmnt)
        })
      }
    });
  })

  return user_db_migration;
});