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

  // Callbacks signature
  // function(isSuccess, successValue, errorMessage);

  SecureStorageHelper = {
    _secureStorage: null,
    _namespace: "Capsico",
    _error_uninitialized: "SecureStorage must be initialized first.",
    init: function(namespace, callback) {
      let that = this;
      this._namespace = namespace;
      this._secureStorage = 
        new cordova.plugins.SecureStorage(
          function() {
            console.log("secureStorage: Init: Success");
            if (callback && typeof(callback) === "function")
              callback(true);
          },
          function(error) {
            console.log("secureStorage: Init: Error");
            console.log(error.stack);
            if (callback && typeof(callback) === "function")
              callback(false, null, error.message);
          },
          this._namespace
        );
    },
    set: function(key, value, callback) {
      if(this._secureStorage == null) {
        if(callback && typeof(callback) === "function")
          callback(false, null, this._error_uninitialized);
        return;
      } 

      var that = this;
      this._secureStorage.set(
          function(_new_key) {
            console.log("secureStorage: Set: Success: Key = ", _new_key);
            if (callback && typeof(callback) === "function")
              callback(true)
          },
          function(error) {
            console.error("secureStorage: set: Error: "+error.message);
            console.log(error.stack);
            if (callback && typeof(callback) === "function")
              callback(false, null, error.message)
          },
          key, value
        );
    },
    get: function(key, callback) {
      if(this._secureStorage == null) {
        if(callback && typeof(callback) === "function")
          callback(false, null, this._error_uninitialized);
        return;
      }

      var that = this;
      this._secureStorage.get(
          function(_value) {
            console.log("secureStorage: Get: Success");
            if (callback && typeof(callback) === "function")
              callback(true, _value)
          },
          function(error) {
            console.error("secureStorage: get: Error: "+error.message);
            console.log(error.stack);
            if (callback && typeof(callback) === "function")
              callback(false, null, error.message)
          },
          key
        );
    },
    remove: function(key, callback) {
      if(this._secureStorage == null) {
        if(callback && typeof(callback) === "function")
          callback(false, null, this._error_uninitialized);
        return;
      }

      this._secureStorage.remove(
          function(_removed_key) {
            console.log("secureStorage: remove: Success: Key = ", _removed_key);
            if (callback && typeof(callback) === "function")
              callback(true)            
          },
          function(error) {
            console.error("secureStorage: remove: Error: "+error.message);
            console.log(error.stack);
            if (callback && typeof(callback) === "function")
              callback(false, null, error.message)
          },
          key
        );
    },
    removeAll: function(callback) {
      if(this._secureStorage == null) {
        if(callback && typeof(callback) === "function")
          callback(false, null, this._error_uninitialized);
        return;
      }

      this._secureStorage.clear(
          function() {
            if (callback && typeof(callback) === "function")
              callback(true)            
          },
          function(error) {
            console.error("secureStorage: removeAll: Error: "+error.message);
            console.log(error.stack);
            if (callback && typeof(callback) === "function")
              callback(false, null, error.message)
          }
        );
    },
    secureDevice: function(callback) {
      this._secureStorage.secureDevice(
          function() {
            if(callback && typeof(callback) === "function")
              callback();
          },
          function() {
            if(callback && typeof(callback) === "function")
              callback();
          }
        );
    }
  };

  return SecureStorageHelper;
});