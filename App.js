import { createAppContainer, createStackNavigator } from "react-navigation";
import Login from "./src/pages/Login";

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
