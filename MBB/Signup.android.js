import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Alert,
  View
} from 'react-native';

import Home from './Home.android.js';
import Profile from './Profile.android.js';
import background from './background-gradient-final.png';


import * as firebase from 'firebase';
const firebaseconfig = {
  apiKey: "AIzaSyCukG4JK4ejGue0oPlomMXNXIMn96mvbIo",
  authDomain: "mobile-bulletin-board.firebaseapp.com",
  databaseURL: "https://mobile-bulletin-board.firebaseio.com",
  storageBucket: "mobile-bulletin-board.appspot.com",
  messagingSenderId: "1002875644736"
};

//firebase.initializeApp(firebaseconfig);


export default class Signup extends Component {
  constructor(props) {
      super(props);
      this.state = {
          name: '',
          email: '',
          password: '',

      };
      this.onSignup = this.onSignup.bind(this);     
  }

  render() {
    let pic = {
      uri: 'https://image.freepik.com/free-icon/thumbs-up_318-31579.jpg'
    };
    return (
      <Image 
        style={styles.backgroundImage}
        source = {background}>
        <View style={styles.layout}>
          <Text style={styles.title}>
            Sign up below!
          </Text>
          <Text style={styles.instructions}>
            Required fields are marked with an asterisk*
          </Text>
          <Text style={styles.label}>
            Name*
          </Text>
          <View style = {{flexDirection: 'row'}}>
              <View style={{flex:0.15}}></View>
              <TextInput
                style={styles.input}
                selectTextOnFocus={true}
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
              />
              <View style={{flex:0.15}}></View>
          </View>
          <Text style={styles.label}>
            Email*
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
            Password*
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
          <TouchableHighlight style={styles.button} onPress={this.onSignup.bind(this)}>
            <Text style={styles.buttonText}> Submit </Text>
          </TouchableHighlight>
            {/*<Image source={pic} style={{width: 200, height: 200}}/> */}
        </View>
      </Image>
    );
  }
  
  onSignup(){
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      switch (errorCode) {
        case 'auth/email-already-in-use':
          Alert.alert('Email In Use','There is already an account with that email.');
          break;
        case 'auth/invalid-email':
          Alert.alert('Invalid Email','The email address you entered is not a valid email.');
          break;
        case 'auth/weak-password':
          Alert.alert('Weak Password','Your password is too weak. Try a stronger password.');
          break;
        case 'auth/operation-not-allowed':
          Alert.alert('Operation Not Allowed','Email/password accounts are not enabled.');
          break;
      }
    });
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
          name: this.state.name,
          email: this.state.email,
          bio:'',
        });
        this.props.navigator.push({
          component: Profile
        });
      }
    }.bind(this));
  }
  onBack(){
    this.props.navigator.pop()
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
  instructions: {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    marginBottom: 5,
    color: 'firebrick',
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
  button: {
    marginTop: 5,
    height: 50,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'sans-serif',
    color: 'firebrick',
    fontSize: 28,
    fontWeight: 'bold',
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
  },
});

// const styles = StyleSheet.create({
//   layout: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontFamily: 'sans-serif',
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: 'firebrick',
//     textAlign: 'center',
//     marginBottom: 5,
//   },
//   label: {
//     fontFamily: 'sans-serif',
//     textAlign: 'center',
//     marginBottom: 5,
//     color: 'firebrick',
//   },
//   input: {
//     flex:0.7,
//     height: 35,
//     marginBottom: 5,
//     alignItems: 'center',
//     textAlign: 'center',
//     backgroundColor: 'whitesmoke',
//     borderStyle: 'solid',
//     borderColor: '#87cefa',
//     borderWidth: 1,
//   },
//   loginButton: {
//     height: 40,
//     width: 250,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   loginText: {
//     fontFamily: 'sans-serif',
//     color: 'firebrick',
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   helpButton: {
//     height: 30,
//     width: 200,
//     alignItems: 'center',
//     marginBottom: 5,
//     marginTop: 5,
//     alignItems: 'center',
//     justifyContent: 'center',

//   },
//   helpText: {
//     fontFamily: 'sans-serif',
//     color: 'midnightblue',
//     fontSize: 15,
//     textDecorationLine: 'underline',
//     textAlign: 'center',
//   },
//   imageContainer: {
//     flexShrink: 1,
//     height: 180,
//     //alignSelf: 'center',
//     justifyContent: 'center',
//   },
//   backgroundImage: {
//     flex: 1,
//     width: null,
//     height: null,
//     alignItems:'center',
//     justifyContent:'center',
//   }
// });
