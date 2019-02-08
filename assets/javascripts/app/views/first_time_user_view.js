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

define(function(require, exports, module){

  var BaseView    = require('core/base_view');
  var UserFetcher = require('fetchers/user_fetcher')

  var FirstTimeUserView = BaseView.extend({
    template: _.template(require("text!templates/first_time_user.html")),
    render: function() {
      var __first_time_user = this;
      this.$el.html(this.template());

      var x = new UserFetcher();
      x.then(function(done) {
        dbPromiseQuery("UPDATE app_data SET first_time_user = 2", [], false);
      })
      .then(function(res) {
        Backbone.history.navigate('users', { trigger : true, replace: true });
      })
      x.catch(function(cause){
        alert("FATAL !! <--> "+cause.message);
        lockApp();
        errorLog(cause);
      })
     
      return this;
    }
  });

  return FirstTimeUserView;
});