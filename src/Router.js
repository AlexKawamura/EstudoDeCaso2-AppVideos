import { createAppContainer, createStackNavigator } from 'react-navigation';
import Login from './pages/Login';

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Bem-vindo',
    },
  },
}, {
    defaultNavigationOptions: {
      title: 'Minhas series',
      headerTintColor: '#FFF',
      headerStyle: {
        backgroundColor: '#003994',
        borderBottomWidth: 1,
        borderBottomColor: '#C5C5C5',
      },
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 30,
      },
    },
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
