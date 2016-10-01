'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

import Login from './Login';
import AuthService from './AuthService';
import AppContainer from './AppContainer';

class GithubBrowser extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    }
  }
  componentDidMount(){
    AuthService.getAuthInfo((err, authInfo)=> {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    });
  }

  render() {
    if(this.state.checkingAuth){
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size="large"
            style={styles.loader} />
        </View>
      );
    }

    if(this.state.isLoggedIn){
      return (
        <AppContainer />
      );      
      /*
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Logged in!</Text>
        </View>
      );*/
    }else{
      return (
        <Login onLogin={this.onLogin.bind(this)} />
      );
    }
  }
  onLogin(){
    this.setState({isLoggedIn: true});
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GitHubBrowser', () => GithubBrowser);
