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

  var BaseView  = require('core/base_view');

  var HomeView = BaseView.extend({
    render: function() {
      var _this = this;
      $('head').append($('<link href="css/capsicoForms.css" rel="stylesheet" type="text/css" />'));
      $('body').removeClass('home-bg');
      $('body').removeClass('login-bg');

      _this.$el.html("<h4><center>Hello</center></h4>");
      return this;
    }
  });

  return HomeView;
})