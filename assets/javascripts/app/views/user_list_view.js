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

  var BaseView = require('core/base_view');
  var UsersView = BaseView.extend({
    user_list_template: _.template(require('text!templates/user_list.html')),
    render: function() {
      var that = this;
      $('head').append($('<link href="css/capsicoForms.css" rel="stylesheet" type="text/css" />'));
      $('body').removeClass('home-bg');
      $('body').removeClass('login-bg');

      this.$el.html("<div> Please wait <span class='glyphicon glyphicon-refresh glyphicon-refresh-animate' style='font-size: 30px; text-align: center;'></span>..</div>");
      this.fetchCollection(function(status, data, error) {

        header  = "<div class='header text-center'"
        header += "  <span><h2>Users</h2></span>"
        header += "</div>"

        container  = "<div class='container users_list_container'>"
        container += "  <div id='table_container'></div>"
        container += "</div>"

        that.$el.html(header + container);
        $('#table_container').html(that.user_list_template({users: (data || [])}));
      })
      return this;
    },
    fetchCollection: function(callback) {
      if(typeof(callback) !== "function")
        return;

      let db = DatabaseHelper.getSecureDB();
      db.executeSql("SELECT * from users", [], 
        function(res) {
          result = []
          for(let i=0; i<res.rows.length; i++) {
            json = JSON.parse(res.rows.item(i).data)
            result.push(json);
          }
          callback(true, result, null)
        },
        function(error) {
          callback(false, null, error.message);
        });
    }
  })


  return UsersView;
});