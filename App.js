import React from "react";
import FormPage from "./screens/FormPage";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SubmissionsPage from "./screens/SubmissionsPage";
import DetailsPage from "./screens/DetailsPage";
import EditPage from "./screens/EditPage";
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="FormPage">
            <Stack.Screen name="SubmissionsPage" component={SubmissionsPage} options={{ headerShown: false }} />
            <Stack.Screen name="FormPage" component={FormPage} options={{ headerShown: false }} />
            <Stack.Screen name="DetailsPage" component={DetailsPage} options={{ headerShown: false }} />
            <Stack.Screen name="EditPage" component={EditPage} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
