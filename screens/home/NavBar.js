import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	StyleSheet,
	TouchableOpacity,
	View,
	Image,
	KeyboardAvoidingView,
} from "react-native";
import Home from './Home';
import Room from './Room';

const Tab = createBottomTabNavigator();

export default function NavBar() {
  return (
    <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={Home} 
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
                headerShown: false
            }}
        />
        <Tab.Screen name="Settings" component={Room} 
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
                headerShown: false
            }}
        />
    </Tab.Navigator>
  );
}

