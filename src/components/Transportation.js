import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Divider, List } from 'react-native-paper';
import axios from 'axios';

export default class Transportation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transportationState: []
    };
  }

  componentDidMount() {
    axios.get('http://rungkut.bambangdjaja.com:7777/travelers/api/transportation/data', {
      params: {
        traveler_xx: this.props.travelId
      }
    })
    .then(res => {
      const transportationState = res.data;
      this.setState({ transportationState });
    })
  }

  keyExtractor = (item, index) => index.toString()
  renderItem = ({ item }) => (
    <View style={ styles.card }>
      <View style={ styles.listItem }>
		<View style={{ width: 70, justifyContent: 'center' }}>
		  <Avatar.Icon size={ 50 } icon='train-car' style={{ backgroundColor: 'seagreen' }} />
		</View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold' }}>
            { item.transportation_type } 
          </Text>
          <Text style={{ width: 265, color: 'grey' }} numberOfLines={ 2 }>
            { item.transportation_from } - { item.transportation_destination }
          </Text>
          <Text style={{ width: 265, color: 'grey' }}>
            { item.traveler_detail_name }
          </Text>
        </View>
        <View style={{ width: 85 }}>
          <Text style={{ textAlign: 'right', fontStyle: 'italic', color: 'grey' }}>{ item.transportation_date }</Text>
          <Text style={{ textAlign: 'right', fontStyle: 'italic', color: 'grey' }}>{ item.transportation_time }</Text>
        </View>
      </View >
    </View>
  )
  
  render() {
    const { transportationState } = this.state;
    
    return (
      <View>
        <FlatList
          ItemSeparatorComponent={ Divider }
          keyExtractor={ this.keyExtractor }
          data={ this.state.transportationState }
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