import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import Screen1 from "./Screens/Screen1";
import CreateBlog from "./Screens/CreateBlog";
import BlogDetail from "./Screens/BlogDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Home}>
        <Stack.Screen name="Home" component={Home} options={{ title: null }} />
        <Stack.Screen
          name="Screen1"
          component={Screen1}
          options={{ title: "Blogs" }}
        />
        <Stack.Screen
          name="BlogDetail"
          component={BlogDetail}
          options={{ title: "Blog Details" }}
        />
        <Stack.Screen
          name="CreateBlog"
          component={CreateBlog}
          options={{ title: "Create Blog" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
