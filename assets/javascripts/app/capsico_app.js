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

  // Makes touch events in Backbone easy, see: https://github.com/wookiehangover/backbone.hammer
  // Deps
  require('jquery-hammerjs');
  require('backbone-hammer');

  var _            = require('underscore');
  var $            = require('jquery');
  var Backbone     = require('backbone');
  var Bootstrap    = require('bootstrap');

  // Routes
  var CapsicoRouter = require('routers/capsico_router');
  var Session = require('models/session_model')

  var CapsicoApp = Backbone.View.extend({
    initialize: function() {
      var _capsico_app = this;
      window.DatabaseHelper = require('database_helper');
      window.SecureStorageHelper = require("secure_storage_helper");
      _capsico_app.initVault();
      var db = DatabaseHelper.getInstance()
        .then(function(data){
          _capsico_app.checkForFTU();
        })
        .catch(function(cause){
          errorLog(cause);
          alert(cause.message);
        });      
    },
    setupRouter: function(){
      if(!Backbone.History.started){
        Backbone.history.start();
      }
      this.router = new CapsicoRouter({
        app: this
      });
      window.location.hash = "login";
    },
    initVault: function() {
      var _initVault = function() {
        var ssHelper = window.SecureStorageHelper;
        ssHelper.init("Pacific", function(isSuccess, successValue, errorMessage) {
          if(!isSuccess) {
            navigator.notification.alert(
              "Please enable the screen lock on your device. This app cannot operate securely without it.",
              function() {
                ssHelper.secureDevice(_initVault);
              },
              "Screen lock is disabled"
            );
          }
        })
      }
      _initVault();
    },
    checkForFTU: function() {
      var _capsico_app = this;
      dbPromiseQuery("select * from app_data LIMIT 1", [], false)
        .then(function(res) {
          if(res.rows.length == 0) {
            cl("~~> RES rows length is ZERO");
            cl("~~> App opened first time")
            dbPromiseQuery("INSERT INTO app_data(first_time_user) VALUES(0)", [], false)
              .then(function(data) {
                window.serverName = "https://demo.capsicohealth.com";
                var first_time_user = 0;
                _capsico_app.setupRouter();
                if(first_time_user != 2) {
                  Session.set("ftu", true);
                  dbPromiseQuery("UPDATE app_data SET first_time_user = 1");
                }                  
              })
              .catch(function(cause1) {
                alert("Fatal !!! "+cause1.message);
                errorLog(cause1);
              })
          }
          else {
            var row = res.rows.item(0);
            window.serverName = row.serverName;
            var first_time_user = row.first_time_user;
            _capsico_app.setupRouter();
            if(first_time_user != 2){
              Session.set("ftu", true);
              dbPromiseQuery("UPDATE app_data SET first_time_user = 1");
            }
          }
        })
        .catch(function(cause) {
          alert("Fatal !!! "+cause.message);
          errorLog(cause);
        })
    }
  });
  return CapsicoApp;
});