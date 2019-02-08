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

  var Component = class UserListComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {items: null}

      this.compareBy.bind(this)
      this.sortBy.bind(this)
    }

    componentDidMount() {
      var that = this
      dbPromiseQuery("SELECT * from users", [], true)
        .then(function(res) {
          let results = []
          for(let i=0; i<res.rows.length; i++) {
            let json = JSON.parse(res.rows.item(i).data)
            results.push(json)
          }
          return results
        })
        .then(function(items) {
          that.setState({items: items})
        })
        .catch(function(error) {
          that.setState({items: []})
        })
    }

    compareBy(key) {
      return function (a, b) {
        if (a[key] < b[key]) return -1
        if (a[key] > b[key]) return 1
        return 0
      }
    }

    sortBy(key) {
      let arrayCopy = [...this.state.items]
      arrayCopy.sort(this.compareBy(key))
      this.setState({items: arrayCopy})
    }

    renderLoading() {
      return (
        <div>
          Loading Users, Please wait...
        </div>
      )              
    }

    renderItems() {
      var items = this.state.items

      return (
        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th onClick={() => this.sortBy('personId')}   >Email</th>
                <th onClick={() => this.sortBy('nameFirst')}  >First Name</th>
                <th onClick={() => this.sortBy('nameLast')}   >Last Name</th>
                <th>Roles</th>
                <th onClick={() => this.sortBy('loginCount')} >Login Count</th>
                <th>Last Login</th>
              </tr>
            </thead>
            <tbody>
              { 
                items.map(function(item) {
                  return (
                      <tr key={item.personId}>
                        <td>{item.personId}</td>
                        <td>{item.nameFirst}</td>
                        <td>{item.nameLast}</td>
                        <td>{item.roles}</td>
                        <td>{item.loginCount}</td>
                        <td>{item.lastLogin}</td>
                      </tr>
                    )
                })
              }
            </tbody>
          </table>
        </div>
      )
    }

    render() {
      if (this.state.items == null)
        return this.renderLoading()
      else
        return this.renderItems()
    }
  }
  
  return Component
})




