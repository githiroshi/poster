/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import RNImagePicker from "react-native-image-picker";
import  Firebase from "react-native-firebase";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    uri: ""
  };

  openPicker = () => {
    RNImagePicker.showImagePicker( {} , res => {
      if(res.didCancel) {
        console.log("User cancel");
      } else if (res.error) {
        console.log("ImagePicker Error: ", res.error)
      } else {
        let decode = decodeURI(res.uri);
        let source = { uri:  decode };
        this.setState(source);
        console.log(this.state.uri);
      }
    });
  };

  upload = () => {
    Firebase.storage()
    .ref("images/" + new Date().getTime())
    .putFile(this.state.uri, {contentType: "image/jpeg"})
    .then(() => alert("uploaded"))
    .catch(e => {
      console.log(e);
      alert("Error");
    });
  };

  render() {
    return (
      <View style={styles.container}>
      <Image source={{ uri: this.state.uri }} style={styles.image} />
        <TouchableOpacity style={styles.button} onPress={this.openPicker}>
          <Text>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.upload}>
          <Text>Send</Text>
        </TouchableOpacity>       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#EEE"
  },
  button: {
    padding: 20
  }
});
