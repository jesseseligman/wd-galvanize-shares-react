import { Route, Router, browserHistory, IndexRoute } from 'react-router';
import App from 'components/App';
import Posts from 'components/Posts';
import React from 'react';


const Routes = React.createClass({

  render() {
    return <Router history={browserHistory}>
      <Route component={App} path="/">
        <IndexRoute component={Posts} />
        <Route component={Posts} path="topics/:topic">

        </Route>
      </Route>
    </Router>;
  }
});

export default Routes;
