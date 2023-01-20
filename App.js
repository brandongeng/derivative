import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Intro1 from "./screens/intro/Intro1";
import Login from "./screens/general/Login";
import Register from "./screens/general/Register";
import { app } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, useCallback } from "react";
import Home from "./screens/home/Home";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";

const Stack = createNativeStackNavigator();
const auth = getAuth(app);
SplashScreen.preventAutoHideAsync();
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			try {
				// Pre-load fonts, make any API calls you need to do here
				await Font.loadAsync({
					DMSerif: require("./assets/fonts/DMSerifDisplay-Regular.ttf"),
					Jost: require("./assets/fonts/Jost-Regular.ttf"),
					JostBold: require("./assets/fonts/Jost-Bold.ttf"),
				});
			} catch (e) {
				console.warn(e);
			} finally {
				// Tell the application to render
				setIsReady(true);
			}
			await onAuthStateChanged(auth, (user) => {
				if (user) {
					setLoggedIn(true);
					//console.log(user)
				} else {
					setLoggedIn(false);
				}
			});
		}
		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (isReady) {
			// This tells the splash screen to hide immediately! If we call this after
			// `setIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync();
		}
	}, [isReady]);

	if (!isReady) {
		return null;
	}

	return (
		<NavigationContainer onReady={onLayoutRootView}>
			{!loggedIn ? (
				<Stack.Navigator>
					<Stack.Screen
						options={{ headerShown: false }}
						name="Intro1"
						component={Intro1}
					/>
					{
						<Stack.Screen
							name="Login"
							component={Login}
							options={{ headerShown: false }}
						/>
					}
					<Stack.Screen
						name="Register"
						component={Register}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Home"
						component={Home}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			) : (
				<Stack.Navigator>
					<Stack.Screen
						name="home"
						component={Home}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({});
