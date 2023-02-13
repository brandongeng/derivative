import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	StyleSheet,
	TouchableOpacity,
	View,
	Image,
	KeyboardAvoidingView,
} from "react-native";
import Home from "./Home";
import Gallery from "./Gallery";
import ConnectAPI from "./ConnectAPI";
import Settings from "./Settings";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { useNavigation } from "@react-navigation/core";

const auth = getAuth(app);

const Tab = createBottomTabNavigator();

export default function NavBar() {
	const navigation = useNavigation();

	const handleSignOut = () => {
		auth.signOut()
			.then(() => {})
			.catch((error) => alert(error.message));
	};

	return (
		<Tab.Navigator initialRouteName="Gallery">
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								height: "80%",
								width: "50%",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Image
								source={require("../../assets/plant_index.png")}
								style={{
									height: "100%",
									width: undefined,
									aspectRatio: 1,
									resizeMode: "contain",
								}}
							/>
						</View>
					),
					tabBarShowLabel: false,
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="Gallery"
				component={Gallery}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								height: "80%",
								width: "50%",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Image
								source={require("../../assets/potted_plant.png")}
								style={{
									height: "100%",
									width: undefined,
									aspectRatio: 1,
									resizeMode: "contain",
								}}
							/>
						</View>
					),
					tabBarShowLabel: false,
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="ConnectAPI"
				component={ConnectAPI}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								height: "80%",
								width: "50%",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Image
								source={require("../../assets/plant_home.png")}
								style={{
									height: "100%",
									width: undefined,
									aspectRatio: 1,
									resizeMode: "contain",
								}}
							/>
						</View>
					),
					tabBarShowLabel: false,
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="Settings"
				component={Settings}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								height: "80%",
								width: "50%",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Image
								source={require("../../assets/plant_icon_settings.png")}
								style={{
									height: "100%",
									width: undefined,
									aspectRatio: 1,
									resizeMode: "contain",
								}}
							/>
						</View>
					),
					tabBarShowLabel: false,
					headerShown: false,
				}}
			/>
		</Tab.Navigator>
	);
}
