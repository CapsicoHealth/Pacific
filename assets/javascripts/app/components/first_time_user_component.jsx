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

  var UserFetcher = require('fetchers/user_fetcher')

  var Component = class FirstTimeUserComponent extends React.Component {
    constructor(props) {
      super(props)
    }

    componentDidMount() {
      var that = this

      // Run Admin Fetcher
      var fetcher = new UserFetcher()
      fetcher.then(function(done) {
        return dbPromiseQuery("UPDATE app_data SET first_time_user = 2", [], false)
      })
      .then(function(res) {
        window.location.hash = "users"
      })
      .catch(function(cause){
        alert("Something went wrong while syncing data from server. \n"+cause.message)
        lockApp()
        errorLog(cause)
      })
    }

    render() {
      return (
        <div className="container ftu_screen">  
          <div className="row">
            <div className="col-md-12">
              <h3> Please wait while we setup application for you ...</h3>
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 messages">
            </div>
          </div>
        </div>
      )
    }
  }
  
  return Component
})
