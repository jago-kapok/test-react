import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Divider, List } from 'react-native-paper';
import axios from 'axios';

export default class TravelDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      travelState: []
    };
  }
  
  componentDidMount() {
    axios.get('http://rungkut.bambangdjaja.com:7777/travelers/api/travel/data', {
      params: {
        traveler_xx: this.props.travelId
      }
    })
    .then(res => {
      const travelState = res.data;
      this.setState({ travelState });
    })
  }

  buttonView() {
    return (
      <View>
        <Divider />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, marginHorizontal: 15, marginTop: 15 }}>
            <Button icon="check-circle" mode="contained" color={ 'royalblue' } onPress={() => console.log('Pressed')}>
              Approve
            </Button>
          </View>
          <View style={{ flex: 1, marginHorizontal: 15, marginTop: 15 }}>
            <Button icon="close-circle" mode="outlined" color={ 'indianred' } onPress={() => console.log('Pressed')}>
              Reject
            </Button>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const travelDetail = this.state.travelState.map((value) => {
      return (
        <View key={ value.toString() }>
          <List.Item
            style={{ marginBottom: -10 }}
            titleStyle={{ fontSize: 14, color: 'grey' }}
            title="Request Number"
            description={ value.traveler_number }
			descriptionStyle={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}
          />
          <List.Item
            style={{ marginBottom: -10 }}
            titleStyle={{ fontSize: 14, color: 'grey' }}
            title="Department"
            description={ value.traveler_department }
			descriptionStyle={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}
          />
          <List.Item
            titleStyle={{ fontSize: 14, color: 'grey' }}
            title="Purpose / Objective"
            description={ value.traveler_purpose }
			descriptionStyle={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}
            descriptionNumberOfLines={ 4 }
          />
          <List.Item
            style={{ marginTop: -10 }}
            titleStyle={{ fontSize: 14, color: 'grey' }}
            title="Created by / Date"
            description={ value.created_by + ' / ' + value.created_date }
			descriptionStyle={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}
          />
          <List.Item
            style={{ marginTop: -10 }}
            titleStyle={{ fontSize: 14, color: 'grey' }}
            title="Approved by / Date"
            description={ value.approved_by + ' / ' + value.approved_date }
			descriptionStyle={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}
          />
          <List.Item
            style={{ marginTop: -10 }}
            titleStyle={{ fontSize: 14, color: 'grey' }}
            title="Status"
            description={ value.traveler_status_name }
			descriptionStyle={[ { fontWeight: 'bold' }, value.traveler_status == 3 ? styles.approved : styles.newRequest ]}
          />
		  <View>
			{ value.cashbon_status != 5 ? this.buttonView() : false }
		  </View>
        </View>
      )
    });

    return (
      <ScrollView>
        { travelDetail }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  newRequest: {
    color: 'orange'
  },
  approved: {
    color: 'seagreen'
  }
});