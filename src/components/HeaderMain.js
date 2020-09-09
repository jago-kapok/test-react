import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';

export default class HeaderMain extends React.Component {
  render() {
    return (
      <View>
        <Appbar.Header style={ styles.appBarHeader } >
          <Appbar.Action icon="arrow-left"
            onPress={ this.props.goBack }
          />
          <Appbar.Content
            title={ this.props.titleName }
          />
          <Appbar.Action icon="feature-search-outline"
			onPress={ () => alert('Search...!') }
		  />
        </Appbar.Header>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appBarHeader: {
    backgroundColor: 'dodgerblue'
  }
});