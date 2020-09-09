import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Divider, List } from 'react-native-paper';
import axios from 'axios';

export default class Cash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cashDetailState: []
    };
  }

  componentDidMount() {
    axios.get('http://rungkut.bambangdjaja.com:7777/travelers/api/cash/detail/data', {
      params: {
        cashbon_id: this.props.cashId
      }
    })
    .then(res => {
      const cashDetailState = res.data;
      this.setState({ cashDetailState });
    })
  }

  keyExtractor = (item, index) => index.toString()
  renderItem = ({ item }) => (
    <View>
      <View style={ styles.listItem }>
		<View style={{ width: 70, justifyContent: 'center' }}>
		  <Avatar.Icon size={ 50 } icon='cash' style={{ backgroundColor: 'seagreen' }} />
		</View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold' }}>{ item.cashbon_detail_item }</Text>
		  <Text style={{ color: 'grey' }}>{ item.cashbon_detail_day} hari</Text>
		  <Text style={{ color: 'grey' }}>@ Rp { item.cashbon_detail_nominal_day }</Text>
        </View>
        <View style={{ width: 90 }}>
          <View>
            <Text style={{ textAlign: 'right' }}>
              Rp { item.cashbon_detail_nominal }
            </Text>
          </View>
        </View>
      </View >
    </View>
  )
  
  render() {
    const { cashDetailState } = this.state;
    let cashTotal = 0;
    cashDetailState.forEach((item) => {
      cashTotal += parseInt(item.cashbon_detail_nominal_total);
    })

    return (
      <View>
        <FlatList
          ItemSeparatorComponent={ Divider }
          keyExtractor={ this.keyExtractor }
          data={ this.state.cashDetailState }
          renderItem={ this.renderItem }
        />
        <Divider />
        <View>
          <View style={ styles.listItem }>
            <View style={{ flex: 1 }}></View>
            <View style={{ width: 90 }}>
              <View>
                <Text style={{ textAlign: 'right', fontWeight: 'bold', color: 'green' }}>
                  Rp { cashTotal.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }
                </Text>
              </View>
            </View>
          </View >
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    flexDirection: 'row'
  }
});