import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Header from './HeaderMain';
import Footer from './Footer';

export default class TravelCreate extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header titleName={ 'New Travel Request' } goBack={() => this.props.navigation.goBack()} />
		<View style={{ flex: 1, padding: 15 }}>
		  <TextInput
			label='Purpose / Objective'
			mode='outlined'
			style={{ height: 45 }}
			lselectionColor='teal'
			underlineColor='teal'
		  />
		</View>
      </View>
    );
  }
}