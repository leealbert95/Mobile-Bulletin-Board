import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import confirmReset from './ConfirmReset.android.js';

import * as firebase from 'firebase';
const firebaseconfig = {
  apiKey: "AIzaSyCukG4JK4ejGue0oPlomMXNXIMn96mvbIo",
  authDomain: "mobile-bulletin-board.firebaseapp.com",
  databaseURL: "https://mobile-bulletin-board.firebaseio.com",
  storageBucket: "mobile-bulletin-board.appspot.com",
  messagingSenderId: "1002875644736"
};

export default class passwordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }
  render() {
    return (
      <View style={styles.layout}>
        <Text style={styles.title}>
          Password Reset
        </Text>
        <Text style={styles.label}>
          Email
        </Text>
        <TextInput
          style={styles.input}
          selectTextOnFocus={true}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />  
        <TouchableHighlight style={styles.button} onPress={this.sendResetEmail.bind(this)}>
          <Text style={styles.buttonText}>Send Reset Email</Text>
        </TouchableHighlight>
      </View>
    )
  }
  sendResetEmail(){
    //send reset email and take them back to login
    //Not sure what features firebase offers but they probably have something
    firebase.auth().sendPasswordResetEmail(this.state.email).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // Handle errors here
    });
    //Shouldn't need to log the user out
    //Unless we allow them to reset password from the profile page
    this.props.navigator.popToTop();
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkblue',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
  },
  label: {
    textAlign: 'center',
    marginBottom: 5,
    color: 'white',
  },
  input: {
    borderStyle: 'solid',
    backgroundColor: 'whitesmoke',
    height: 25,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10,
    alignItems: 'center',
    textAlign: 'center',
  },
  button: {
    borderStyle: 'solid',
    borderColor: 'darkblue',
    backgroundColor: 'red',
    height: 50,
    width: 250,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});