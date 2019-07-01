import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
  AsyncStorage
} from 'react-native';

import { Card, CardItem } from 'native-base';
import { Entypo } from '@expo/vector-icons';

export default class ViewContactScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "DUMMYTEXT",
      lname: "DUMMYTEXT",
      phone: "DUMMYTEXT",
      email: "DUMMYTEXT",
      address: "DUMMYTEXT"
    }
  }

  static navigatioOptions = {
    title: "View Contact"
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      let key = this.props.navigation.getParam("key")
      this.getContact(key);
    });
  }

  getContact = async (key) => {
    await AsyncStorage.getItem(key)
    .then(contactJsonString => {
      let contact = JSON.parse(contactJsonString)
      contact[key] = key;
      this.setState(contact)
    })
    .catch(error => {
      console.log(error)
    })
  }

  callAction = (phone) => {
    if(Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then( supported => {
        if(!supported) {
          Alert.alert("Phone number is not available");
        } else{
          return Linking.openURL(phoneNumber);
        }
      })
      .catch( error => {
        console.log(error)
      });
  }

  smsAction = phone => {
    let phoneNumber = phone;
    phoneNumber = `sms:${phone}`;
    Linking.canOpenURL(phoneNumber)
      .then( supported => {
        if(!supported) {
          Alert.alert("Phone number not available")
        }else {
          Linking.openURL(phoneNumber);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  editContact = key => {
    this.props.navigation.navigate("Edit", {key: key})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>ViewContactScreen!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
