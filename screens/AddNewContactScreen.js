import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Alert, 
  Keyboard, 
  AsyncStorage, 
  TouchableWithoutFeedback, 
  ScrollView 
} from 'react-native';

import { 
  Form, 
  Item, 
  Input, 
  Label, 
  Button 
} from 'native-base';

export default class AddNewContactScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fname: "",
      lname: "",
      phone: "",
      email: "",
      address: ""
    }
  }

  static navigationOptions = {
    title: "Contact App"
  } 

  saveContact = async () => {
    if(
      this.state.fname !== "" &&
      this.state.lname !== "" &&
      this.state.phone !== "" &&
      this.state.email !== "" &&
      this.state.address !== ""
    ){
      // Create a contact object
      let contact = {
        fname: this.state.fname,
        lname: this.state.lname,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address
      } 
      await AsyncStorage.setItem(Date.now().toString(),
        JSON.stringify(contact)
      ).then(() => {
        this.props.navigation.goBack();
      })
       .catch( error => {
         console.log(error)
       })
    }else {
      Alert.alert("All fields are required !")
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Add new contact!</Text>
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
