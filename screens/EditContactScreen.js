import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Keyboard,
  TouchableWithoutFeedback,
  AsyncStorage, 
  Alert
} from 'react-native';
import { Form, Item, Label, Button, Input } from 'native-base';


export default class EditContactScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      phone: "",
      email: "",
      address: "",
      key: ""
    }
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener("willFocus", () => {
      let key = this.props.navigation.getParam("key", "")
      this.getContact(key);
    })
  }

  getContact = async key => {
    await AsyncStorage.getItem(key)
      .then(contactStringJson => {
        let contact = JSON.parse(contactStringJson)
        contact["key"] = key
        this.setState(contact)
      })
      .catch(error => console.log(error))
  }

  updateContact = async key => {
    if(
      this.state.fname !== ""&&
      this.state.lname !== ""&&
      this.state.phone !== ""&&
      this.state.email !== ""&&
      this.state.address !== ""
    ){
      let contact = {
        fname: this.state.fname,
        lname: this.state.lname,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address
      };
      await AsyncStorage.mergeItem(key, JSON.stringify(contact))
        .then(() => {
          this.props.navigation.goBack()
        })
        .catch(error => console.log(error))
    }
  }

  static navigationOptions = {
    title: "View Contact"
  }
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
        }}>
        <View style={styles.container}>
          <Form>
            <Item style={styles.inputItem}>
              <Label>First Name</Label>
              <Input 
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                onChangeText={ fname => this.setState({
                  fname
                })}
                value={
                  this.state.fname
                }
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Last Name</Label>
              <Input 
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                onChangeText={ lname => this.setState({
                  lname
                })}
                value={
                  this.state.lname
                }
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Phone</Label>
              <Input 
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                onChangeText={ phone => this.setState({
                  phone
                })}
                value={
                  this.state.phone
                }
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Email</Label>
              <Input 
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={ email => this.setState({
                  email
                })}
                value={
                  this.state.email
                }
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Address</Label>
              <Input 
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                onChangeText={ address => this.setState({
                  address
                })}
                value={
                  this.state.address
                }
              />
            </Item>    
          </Form>
          <Button
            full
            rounded
            onPress={() => {
              this.updateContact(this.state.key)
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Update</Text>
          </Button>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#0a3d62",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});