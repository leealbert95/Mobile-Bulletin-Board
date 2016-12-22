import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Alert,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';


import Home from './Home.android.js';
import Signup from './Signup.android.js';
import pwReset from './PasswordReset.android.js';
import Profile from './Profile.android.js';
import logo from './logo-draft1-copy3-constrained.png';
import background from './background-gradient-final.png';

import * as firebase from 'firebase';
const firebaseconfig = {
  apiKey: "AIzaSyCukG4JK4ejGue0oPlomMXNXIMn96mvbIo",
  authDomain: "mobile-bulletin-board.firebaseapp.com",
  databaseURL: "https://mobile-bulletin-board.firebaseio.com",
  storageBucket: "mobile-bulletin-board.appspot.com",
  messagingSenderId: "1002875644736"
};


export default class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
          email: '',
          password: '',
      };
  }
  render() {
    return (
      <Image 
        style={styles.backgroundImage}
        source = {background}>
        <View style = {styles.layout}>
          <View style = {{flexDirection: 'row'}}>
            <Image 
              style={styles.imageContainer}
              resizeMode='contain'
              source = {logo}
            />
          </View>
          <Text style={styles.title}>
            Login
          </Text>
          <Text style={styles.label}>
            Email
          </Text>
          <View style = {{flexDirection: 'row'}}>
              <View style={{flex:0.15}}></View>
              <TextInput
                style={styles.input}
                selectTextOnFocus={true}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
              <View style={{flex:0.15}}></View>
          </View>
          <Text style={styles.label}>
            Password
          </Text>
          <View style = {{flexDirection: 'row'}}>
              <View style={{flex:0.15}}></View>
              <TextInput 
                style={styles.input}
                selectTextOnFocus={true}
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />
              <View style={{flex:0.15}}></View>
          </View>
          <TouchableHighlight style={styles.loginButton}
          onPress={this.onLogin.bind(this)}>
            <Text style={styles.loginText}>
              Enter
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.helpButton}
          onPress={this.pwReset.bind(this)}>
            <Text style={styles.helpText}>
              Forgot your password?
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.helpButton}
          onPress={this.onSignup.bind(this)}>
            <Text style={styles.helpText}>
              New to Hub? Sign up here!
            </Text>
          </TouchableHighlight>
        </View>  
      </Image>
    );
  }
  
  onLogin(){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      //Handle errors and stuff here
      switch (errorCode) {
        case 'auth/user-disabled':
          Alert.alert('Account Disabled','The account corresponding to the email you entered has been disabled.');
          break;
        case 'auth/invalid-email':
          Alert.alert('Invalid Email','The email address you entered is not a valid email.');
          break;
        case 'auth/user-not-found':
          Alert.alert('User Not Found','There is no account with the email you entered.');
          break;
        case 'auth/wrong-password':
          Alert.alert('Wrong Password','The email and password you entered do not match.');
          break;
      }
    });
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.props.navigator.push({
          component: Profile
        });
      }
    }.bind(this));
  }
  
  onSignup(){
    this.props.navigator.push({
      component: Signup
    });
  }
  pwReset(){
    this.props.navigator.push({
      component: pwReset
    });
  }
}


const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'sans-serif',
    fontSize: 28,
    fontWeight: 'bold',
    color: 'firebrick',
    textAlign: 'center',
    marginBottom: 5,
  },
  label: {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    marginBottom: 5,
    color: 'firebrick',
  },
  input: {
    flex:0.7,
    height: 35,
    marginBottom: 5,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'whitesmoke',
    borderStyle: 'solid',
    borderColor: '#87cefa',
    borderWidth: 1,
  },
  loginButton: {
    height: 40,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontFamily: 'sans-serif',
    color: 'firebrick',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  helpButton: {
    height: 30,
    width: 200,
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',

  },
  helpText: {
    fontFamily: 'sans-serif',
    color: 'midnightblue',
    fontSize: 15,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  imageContainer: {
    flexShrink: 1,
    height: 180,
    //alignSelf: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    alignItems:'center',
    justifyContent:'center',
  }
});