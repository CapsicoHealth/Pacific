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

  var CapsicoApp = function() {

    require('app_view_helpers')
    require('capsico_helpers')
    const React = require('react');
    const ReactDOM = require('react-dom')
    const ReactRouter = require('react-router-dom')
    const MainComponent = require('components/main_component')


    var App = {
      initVault: function() {
        var _initVault = function() {
          var ssHelper = window.SecureStorageHelper
          ssHelper.init("CapsicoSpoonful", function(isSuccess, successValue, errorMessage) {
            if(!isSuccess) {
              navigator.notification.alert(
                "Please enable the screen lock on your device. This app cannot operate securely without it.",
                function() {
                  ssHelper.secureDevice(_initVault)
                },
                "Screen lock is disabled"
              );
            }
          })
        }
        _initVault()
      },
      checkForFTU: function() {
        var _capsico_app = this
        dbPromiseQuery("select * from app_data LIMIT 1", [], false)
          .then(function(res) {
            if(res.rows.length == 0) {
              cl("~~> RES rows length is ZERO")
              cl("~~> App opened first time")
              dbPromiseQuery("INSERT INTO app_data(first_time_user) VALUES(0)", [], false)
                .then(function(data) {
                  window.serverName = "https://172.16.0.30:8443"
                  var first_time_user = 0
                  _capsico_app.setupView()
                  if(first_time_user != 2) {
                    dbPromiseQuery("UPDATE app_data SET first_time_user = 1")
                  }                  
                })
                .catch(function(cause1) {
                  alert("Fatal !!! "+cause1.message)
                  errorLog(cause1)
                })
            }
            else {
              var row = res.rows.item(0)
              window.serverName = row.serverName
              var first_time_user = row.first_time_user
              _capsico_app.setupView()
              if(first_time_user != 2){
                dbPromiseQuery("UPDATE app_data SET first_time_user = 1")
              }
            }
          })
          .catch(function(cause) {
            alert("Fatal !!! "+cause.message)
            errorLog(cause)
          })
      },
      setupView: function() {
        ReactDOM.render(
            React.createElement(ReactRouter.HashRouter, null, 
                React.createElement(MainComponent, null)
              ),
            document.getElementById("root")
          );
      }
    }

    /*
     * MAIN
     * APP
     */
    window.DatabaseHelper = require('database_helper')
    window.SecureStorageHelper = require("secure_storage_helper")
    window._ = require("underscore")

    App.initVault()

    var db = DatabaseHelper.getInstance()
      .then(function(data){
        App.checkForFTU()
      })
      .catch(function(cause){
        errorLog(cause)
        alert(cause.message)
      })

  }

  return CapsicoApp
  
});