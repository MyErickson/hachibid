import React, { Component } from 'react';
import { View, Text } from 'native-base';
import { Input } from 'react-native-elements';

class Filtrate extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Input placeholder='Recherche' />
      </View>
    );
  }
}

export default Filtrate;
