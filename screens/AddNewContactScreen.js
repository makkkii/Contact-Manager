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
      <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss}>
        <ScrollView 
        style={styles.container}>
          <Form>
            <Item style={styles.inputItem}>
              <Label>First Name</Label>
              <Input
                autoCorrect={false}
                keyboardType="default"
                onChangeText={ fname => this.setState({ fname })}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Last Name</Label>
              <Input
                autoCorrect={false}
                keyboardType="default"
                onChangeText={ lname => this.setState({ lname })}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Phone</Label>
              <Input
                autoCorrect={false}
                keyboardType="number-pad"
                onChangeText={ phone => this.setState({ phone })}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Email</Label>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={ email => this.setState({ email })}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Address</Label>
              <Input
                autoCorrect={false}
                keyboardType="default"
                onChangeText={ address => this.setState({ address })}
              />
            </Item>
          </Form>
          <Button 
            style={styles.button}
            full
            onPress={() => {
              this.saveContact();
            }}
          ><Text style={styles.buttonText}>Save</Text></Button>
          <View style={styles.empty}></View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    height: 500
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#0a3d62",
    marginTop: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  empty: {
    height: 500,
    backgroundColor: "#FFF"
  }
});
