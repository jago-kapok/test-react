import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Divider, List } from 'react-native-paper';
import axios from 'axios';

export default class Hotel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotelState: []
    };
  }

  componentDidMount() {
    axios.get('http://rungkut.bambangdjaja.com:7777/travelers/api/hotel/data', {
      params: {
        traveler_xx: this.props.travelId
      }
    })
    .then(res => {
      const hotelState = res.data;
      this.setState({ hotelState });
    })
  }
  
  keyExtractor = (item, index) => index.toString()
  renderItem = ({ item }) => (
    <View style={ styles.card }>
      <View style={ styles.listItem }>
		<View style={{ width: 70, justifyContent: 'center' }}>
		  <Avatar.Icon size={ 50 } icon='domain' style={{ backgroundColor: 'seagreen' }} />
		</View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold' }}>
            { item.hotel_checkin } - { item.hotel_checkout }
          </Text>
          <Text style={{ width: 265, color: 'grey' }}>
            { item.hotel_location }
          </Text>
          <Text style={{ width: 265, color: 'grey' }}>
            { item.traveler_detail_name }
          </Text>
        </View>
        <View style={{ width: 85 }}>
          <Text style={{ textAlign: 'right', fontStyle: 'italic', color: 'grey' }}>{ item.hotel_room }</Text>
          <Text style={{ textAlign: 'right', fontStyle: 'italic', color: 'grey' }}>{ item.hotel_class }</Text>
        </View>
      </View >
    </View>
  )
  
  render() {
    const { hotelState } = this.state;
    
    return (
      <View>
        <FlatList
          ItemSeparatorComponent={ Divider }
          keyExtractor={ this.keyExtractor }
          data={ this.state.hotelState }
          renderItem={ this.renderItem }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    flexDirection: 'row'
  },
  card: {
    height: 80
  }
});