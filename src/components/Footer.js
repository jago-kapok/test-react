import * as React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import TravelDetail from './TravelDetail';
import Transportation from './Transportation';
import Hotel from './Hotel';
import Cash from './Cash';

export default class Footer extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home', icon: 'home' },
      { key: 'transportation', title: 'Transportation', icon: 'train-car' },
      { key: 'hotel', title: 'Hotel', icon: 'domain' },
      { key: 'cash', title: 'Cash', icon: 'cash-multiple' }
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: () => <TravelDetail travelId={ this.props.travelId } />,
    transportation: () => <Transportation travelId={ this.props.travelId } />,
    hotel: () => <Hotel travelId={ this.props.travelId } />,
    cash: () => <Cash cashId={ this.props.cashId } />
  });

  render() {
    return (
      <BottomNavigation
        barStyle={{ backgroundColor: '#f8f7f9',
          borderTopWidth: StyleSheet.hairlineWidth,
          borderStyle: 'solid',
          borderColor: '#d0cfd0'
        }}
        navigationState={ this.state }
        onIndexChange={ this._handleIndexChange }
        renderScene={ this._renderScene }
      />
    );
  }
}