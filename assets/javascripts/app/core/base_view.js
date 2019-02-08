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

define([
  'underscore',
  'backbone'
], function(_, Backbone){

  var BaseView = Backbone.View.extend({
    close : function(){
      if(this.childViews){
        this.childViews.close();
      }
      $('link[rel="stylesheet"]').remove();
      $('head').append($('<link href="css/main.css" rel="stylesheet" type="text/css" />'));
      $('.modal-backdrop').remove();
      $('body').removeClass('modal-open');
      this.remove();
    }
  });

  return BaseView;

});