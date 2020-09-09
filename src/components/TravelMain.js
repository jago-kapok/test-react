import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './HeaderMain';
import Footer from './Footer';

export default class TravelMain extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header titleName={ 'Travel Detail' } goBack={() => this.props.navigation.goBack()} />
        <Footer
          travelId={ JSON.stringify(this.props.navigation.getParam('travelId', '0')) }
		  cashId={ this.props.navigation.getParam('cashId', '0') }
        />
      </View>
    );
  }
}