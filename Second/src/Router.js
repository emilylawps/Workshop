import React, { Component } from 'react';
import {
  View
} from 'react-native';

import { Scene, Router } from 'react-native-router-flux';

import LoginPage from './page/LoginPage';
import Register from './page/Register';
import Expenses from './page/Expenses';
import Planning from './page/Planning';
import Statistic from './page/Statistic';
import Menu from './page/Menu';

class RouterComponent extends Component {
  render() {
    // const {container} = styles;
    return(
        <Router>
          <Scene key="root">
            <Scene key="login"  hideNavBar component={LoginPage}  initial={true} />
            <Scene key="register" component={Register} />
            <Scene key="menu" component={Menu} />
            <Scene key="expenses" component={Expenses} />
            <Scene key="planning" component={Planning} />
            <Scene key="statistic" component={Statistic} />
          </Scene>
        </Router>
    );
  }
}
export default RouterComponent;
