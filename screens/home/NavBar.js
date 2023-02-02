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
import Room from "./Room";
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
		<Tab.Navigator initialRouteName="Home">
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarIcon: ({ focused }) => (
						<TouchableOpacity onPress={handleSignOut}>
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
						</TouchableOpacity>
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
				name="Room"
				component={Room}
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
		</Tab.Navigator>
	);
}
