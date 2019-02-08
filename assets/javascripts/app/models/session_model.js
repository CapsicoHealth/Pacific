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

  var AppConfig = require('config');
  var Backbone  = require('backbone')
  var LoginHelper = require('login_helper')
    
  var SessionModel = Backbone.Model.extend({
      
      path: AppConfig.login.path,
      isAuthenticated: false,
      db_details: null,
      host: AppConfig.serverName,
      url: AppConfig.serverName + AppConfig.login.path,
      initialize : function() {
        if(Storage && sessionStorage){
          this.supportStorage = true;
        }
      },
      login : function(credentials, tenantsCallback){
        var that = this;
        var tenantUserRefnum = credentials.tenantUserRefnum;
        var url = window.serverName + AppConfig.login.path;

        var loginCallback = function(type, tenantsList, eulaToken, eulaUrl) {
          // Close Loading Dialog
          window.plugins.spinnerDialog.hide();
          window.plugins.spinnerDialog.hide();

          that.set('authenticated', true);
          if(that.get('redirectFrom') != null){
            var path = that.get('redirectFrom');
            that.unset('redirectFrom');
          }

          if(type == "SELECT_TENANT") {
            tenantsCallback.apply(null, [tenantsList]);
          }
          else if (type == "EULA") {
            tenantsCallback.apply(null, [null, eulaToken, eulaUrl, credentials.tenantUserRefnum]);
          }
          else if (type == "LOGIN") {
            after(0, function(){
              var UserFetcher = require('fetchers/user_fetcher');
              var x = new UserFetcher();
            });
            Backbone.history.navigate((path || "#users"), { trigger : true, replace: true });

          }
          else {
            Backbone.history.navigate("#first_time_user", { trigger : true, replace: true });
          }

        }
        var errorCallback = function(errorMessage) {
          // Close Loading Dialog
          window.plugins.spinnerDialog.hide();
          window.plugins.spinnerDialog.hide();
          alert(errorMessage);
        }

        window.plugins.spinnerDialog.show("Signing in", "Please wait..", true);
        LoginHelper.login(url, credentials, loginCallback, errorCallback);
      }
  });

  return new SessionModel();
});



