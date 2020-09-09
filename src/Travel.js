import React from 'react';
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider, FAB, IconButton } from 'react-native-paper';
import axios from 'axios';
import Header from './components/HeaderMain';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      refreshing: false
    };
  }
  
  componentDidMount() {
    axios.get('http://rungkut.bambangdjaja.com:7777/travelers/api/travel/data')
      .then(res => {
        const categories = res.data;
        this.setState({ categories });
      })
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.componentDidMount;
    this.setState({ refreshing: false });
  }

  keyExtractor = (item, index) => index.toString()
  renderItem = ({ item }) => (
    <TouchableOpacity style={ styles.listItem }
      onPress={() => {
        this.props.navigation.navigate('TravelMain', {
          travelId: item.traveler_xx,
		  cashId: item.cashbon_id
        });
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold' }}>{ item.traveler_number }</Text>
        <Text style={ styles.text } numberOfLines={ 2 }>{ item.created_by }</Text>
        <Text style={ styles.text } numberOfLines={ 2 }>{ item.traveler_purpose }</Text>
      </View>
      <View style={{ width: 75 }}>
        <Text style={[ styles.text, { textAlign: 'right', fontStyle: 'italic' }]}>{ item.created_date_view }</Text>
		<View style={{ alignItems: 'flex-end', marginTop: 25, marginRight: -12 }}>
		  <IconButton
		    icon='check-decagram'
		    size={20}
		    color={[ item.traveler_status == '3' ? 'seagreen' : 'orange' ]}
		  />
		</View>
      </View>
    </TouchableOpacity >
  )

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          titleName={ 'Travel Request List'}
          goBack={ () => this.props.navigation.goBack() }
        />
        <FlatList
          ItemSeparatorComponent={ Divider }
		  keyExtractor={ this.keyExtractor }
          data = { this.state.categories }
          renderItem = { this.renderItem }
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        />
        <FAB
          style={ styles.fab }
          icon='plus'
          color='white'
          onPress={() => {
			this.props.navigation.navigate('TravelCreate');
		  }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    flexDirection: 'row',
	height: 95
  },
  text: {
	color: 'grey'
  },
  fab: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 20,
    backgroundColor: 'royalblue'
  },
  newRequest: {
    backgroundColor: 'orange'
  },
  approved: {
    backgroundColor: 'seagreen'
  }
});