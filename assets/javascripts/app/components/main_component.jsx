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

  const React = require('react')
  const ReactRouter = require('react-router-dom')

  const LoginComponent          = require('components/login_component')
  const FirstTimeUserComponent  = require('components/first_time_user_component')
  const UserListComponent       = require('components/user_list_component')

  var Component = class MainComponent extends React.Component {
    constructor(props) {
      super(props)
    }

    isAuthenticated() {
      return (sessionStorage.getItem("isAuthenticated") == "true")
    }

    render() {
      return (
        <div>
          <div>
            <ReactRouter.Route exact path="/"                   component={LoginComponent}          />
            <ReactRouter.Route exact path="/first_time_user"    render={(props) => { return (!this.isAuthenticated() ? <ReactRouter.Redirect to="/"/> : <FirstTimeUserComponent/>) }} />
            <ReactRouter.Route exact path="/users"              render={(props) => { return (!this.isAuthenticated() ? <ReactRouter.Redirect to="/"/> : <UserListComponent/>) }}      />
          </div>
        </div>
      )
    }
  }
  
  return Component
})