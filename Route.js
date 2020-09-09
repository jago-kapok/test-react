import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';
import Travel from "./src/Travel";
import TravelMain from "./src/components/TravelMain";
import TravelCreate from "./src/components/TravelCreate";

const Route = createStackNavigator(
  {
    Travel: Travel,
	TravelMain: TravelMain,
	TravelCreate: TravelCreate
  },
  {
    headerMode: 'none',
	initialRouteName: 'Travel',
	transitionConfig: () => fromRight(),
  }
);

const AppContainer = createAppContainer(Route);

export default AppContainer;