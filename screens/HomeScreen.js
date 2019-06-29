import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';

import { Card } from 'native-base';
import { Entypo } from '@expo/vector-icons'

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  static navigationOptions = {
    title: "Contact App"
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          onPress={() => {
            this.props.navigation.navigate("Add")
          }}
          style={styles.floatButton}
        >
          <Entypo 
            name="plus"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  listItem: {
    flexDirection: "row",
    padding: 20
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0a3d62",
    borderRadius: 100
  },
  contactIcon: {
    fontSize: 28,
    color: "#fff"
  },
  infoContainer: {
    flexDirection: "column"
  },
  infoText: {
    fontSize: 16,
    fontWeight: "400",
    paddingLeft: 10,
    paddingTop: 2
  },
  floatButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 20,
    right: 20,
    height: 60,
    backgroundColor: "#0a3d62",
    borderRadius: 100
  }
});