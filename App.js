import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// icons
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

// screen
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import SplashScreen from "./containers/SplashScreen";
import RoomScreen from "./containers/RoomScreen";
import AroundMeScreen from "./containers/AroundMeScreen";

//components
import Logo from "./components/Logo";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState();

  // signUp state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [conirmPass, setConirmPass] = useState("");
  const [error, setError] = useState("");

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  const setUser = async (user) => {
    if (user) {
      await AsyncStorage.setItem("userId", user);
    } else {
      await AsyncStorage.removeItem("userId");
    }
    setUserId(user);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");
      const id = await AsyncStorage.getItem("userId");
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);
      setUserId(id);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="SignIn" screenOptions={{ headerShown: true }}>
              {() => (
                <SignInScreen
                  setToken={setToken}
                  setUser={setUser}
                  error={error}
                  setError={setPassword}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassowrd={setPassword}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="SignUp">
              {() => (
                <SignUpScreen
                  setToken={setToken}
                  username={username}
                  setUsername={setUsername}
                  email={email}
                  setEmail={setEmail}
                  description={description}
                  setDescription={setDescription}
                  password={password}
                  setPassword={setPassword}
                  conirmPass={conirmPass}
                  setConirmPass={setConirmPass}
                  error={error}
                  setError={setError}
                  setUser={setUser}
                  setUserId={setUserId}
                />
              )}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in ! 🎉
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: "tomato", tabBarInactiveTintColor: "gray" }}>
                <Tab.Screen
                  name="TabHome"
                  options={{ tabBarLabel: "Home", tabBarIcon: ({ color, size }) => <Ionicons name={"ios-home"} size={size} color={color} /> }}
                >
                  {() => (
                    <Stack.Navigator screenOptions={{ headerTitle: () => <Logo /> }}>
                      <Stack.Screen name="Home" options={{ title: "My App", headerBackVisible: false }}>
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      <Stack.Screen name="Room" component={RoomScreen} options={{ headerBackVisible: false }}></Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="TabAroundMe"
                  options={{ tabBarLabel: "Around me", tabBarIcon: ({ color, size }) => <EvilIcons name="location" size={size} color={color} /> }}
                >
                  {() => (
                    <Stack.Navigator screenOptions={{ headerTitle: () => <Logo /> }}>
                      <Stack.Screen name="AroundMe" component={AroundMeScreen}></Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="TabMyProfile"
                  options={{ tabBarLabel: "My Profile", tabBarIcon: ({ color, size }) => <Octicons name="person" size={size} color={color} /> }}
                >
                  {() => (
                    <Stack.Navigator screenOptions={{ headerTitle: () => <Logo /> }}>
                      <Stack.Screen name="My Profile" options={{ title: "My Profile" }}>
                        {(props) => (
                          <ProfileScreen
                            {...props}
                            setUserToken={setUserToken}
                            userId={userId}
                            setUser={setUser}
                            userToken={userToken}
                            username={username}
                            setUsername={setUsername}
                            setToken={setToken}
                            email={email}
                            setEmail={setEmail}
                            description={description}
                            setDescription={setDescription}
                            error={error}
                            setError={setError}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="TabSettings"
                  setUser
                  options={{
                    tabBarLabel: "Settings",
                    tabBarIcon: ({ color, size }) => <Ionicons name={"ios-options"} size={size} color={color} />,
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen name="Settings" options={{ title: "Settings" }}>
                        {() => <SettingsScreen setToken={setToken} setUser={setUser} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
