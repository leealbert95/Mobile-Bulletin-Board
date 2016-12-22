import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import Home from './Home.android.js';

import * as firebase from 'firebase';
const firebaseconfig = {
  apiKey: "AIzaSyCukG4JK4ejGue0oPlomMXNXIMn96mvbIo",
  authDomain: "mobile-bulletin-board.firebaseapp.com",
  databaseURL: "https://mobile-bulletin-board.firebaseio.com",
  storageBucket: "mobile-bulletin-board.appspot.com",
  messagingSenderId: "1002875644736"
};


export default class Profile extends Component {
  constructor(props) {
      super(props);
      this.state = {
        dbref: firebase.database().ref('users/' + firebase.auth().currentUser.uid),
        name: '',
        bio: '',
      };
  }

  componentDidMount() {
    this.state.dbref.once('value', snapshot => {
      this.setState({name: snapshot.val().name});
    });
    this.state.dbref.once('value', snapshot => {
      this.setState({bio: snapshot.val().bio});
    });
  }
  
  render() {
    return (
      <View style={styles.layout}>
        <Text style={styles.title}>
          Your Profile
        </Text>
        <Text style={styles.label}>
          Email
        </Text>
        <Text style={styles.label}>
          {firebase.auth().currentUser.email}
        </Text>
        <Text style={styles.label}>
          Name
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
          Bio
        </Text>
        <View style = {{flexDirection: 'row'}}>
          <View style={{flex:0.15}}></View>
          <TextInput 
            style={styles.multilineInput}
            multiline = {true}
            numberOfLines = {4}
            selectTextOnFocus={true}
            onChangeText={(bio) => this.setState({bio})}
            value={this.state.bio}
          />
          <View style={{flex:0.15}}></View>
        </View>
        <TouchableHighlight style={styles.button}
        onPress={this.updateProfile.bind(this)}>
          <Text style={styles.buttonText}>
            Update Profile
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}
        onPress={this.goToHub.bind(this)}>
          <Text style={styles.buttonText}>
            Go to Hub
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}
        onPress={this.onLogout.bind(this)}>
          <Text style={styles.buttonText}>
            Logout
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
  onLogout(){
    firebase.auth().signOut()
    this.props.navigator.popToTop()
  }
  goToHub(){
    this.props.navigator.push({
      component: Home
    });
  }
  updateProfile(){
    this.state.dbref.set({
      name: this.state.name,
      email: firebase.auth().currentUser.email,
      bio: this.state.bio,
    });
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
    color: 'white',
    marginBottom: 5,
  },
  input: {
    flex:0.7,
    height: 35,
    marginBottom: 5,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'whitesmoke',
    borderStyle: 'solid',
  },
  multilineInput: {
    flex: 0.7,
    borderStyle: 'solid',
    backgroundColor: 'whitesmoke',
    height: 100,
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
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});