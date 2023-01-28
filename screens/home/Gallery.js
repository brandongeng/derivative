import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect, useRef } from "react";
import { Animated, Dimensions, FlatList, Keyboard } from "react-native";
import {
	StyleSheet,
	TouchableOpacity,
	View,
	Image,
	Text,
	KeyboardAvoidingView,
} from "react-native";
import { app } from "../../firebase";
import { colors } from "../../style/colors";
import { useKeyboard } from "@react-native-community/hooks";
import { getAuth } from "firebase/auth";
import Habit from "./Habit";
import Add from "./Add";
import { getDatabase, onValue, push, ref } from "firebase/database";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const auth = getAuth(app);
const database = getDatabase(app);

const Slide = ({ data }) => {
	if (data.type != null) {
		return Habit(data);
	} else {
		return (
			<View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
				<Text>
					No data to display
				</Text>
			</View>
		);
	}
};

const Gallery = () => {
	/* React Nav */
	const navigation = useNavigation();

	/* Keyboard and keyboard animation */
	const keyboard = useKeyboard();
	const animation = useRef(new Animated.Value(0)).current;
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);
	useEffect(() => {
		let to;
		if (isKeyboardVisible) {
			animation.current = 0;
			to = (-1 * keyboard.keyboardHeight) / 3;
		} else {
			animation.current = (-1 * keyboard.keyboardHeight) / 3;
			to = 0;
		}
		Animated.timing(animation, {
			toValue: to,
			duration: 100,
			useNativeDriver: true,
		}).start();
	}, [isKeyboardVisible]);
	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			() => {
				setKeyboardVisible(true); // or some other action
			}
		);
		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				setKeyboardVisible(false); // or some other action
			}
		);

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);
	
	/* Flatlist Index */
	const [index, setIndex] = useState(0);
	const indexRef = useRef(index);
	indexRef.current = index;

	/* Flatlist habit data */
	const [habitData, setHabitData] = useState([]);

	/* Loading data from firebase */
	useEffect(() => {
		const habitRef = ref(
			database,
			"users/" + auth.currentUser.uid + "/habits"
		);
		onValue(habitRef, (snapshot) => {
			const data = snapshot.val();
			console.log(data);
			let toHabit = [
			];
			for (const key in data) {
				data[key]["animation"] = animation;
				toHabit.push(data[key]);
			}
			console.log("loaded");
			setHabitData(toHabit);
		});
	}, []);

	return (
		<KeyboardAvoidingView style={styles.container} behavior="height">
			<FlatList
				scrollEnabled={!isKeyboardVisible}
				data={habitData}
				pagingEnabled
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => {
					return (
						<Slide
							data={item}
						/>
					);
				}}
				style={{
					height: "100%",
					width: "100%",
					position: "absolute",
					zIndex: 2,
					top: 0,
				}}
			/>
			<Animated.View
				style={[
					styles.topContainer,
					{ transform: [{ translateY: animation }] },
				]}
			>
				<Image
					source={require("../../assets/images/windows/beach.png")}
					style={styles.imageCenter}
				/>
				<View style={{ height: "10%" }} />
			</Animated.View>
			<View style={styles.bottomContainer}>
			</View>
		</KeyboardAvoidingView>
	);
};

export default Gallery;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		position: "relative",
	},
	topContainer: {
		flex: 1.2,
		backgroundColor: colors.background,
		width: "100%",
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		justifyContent: "flex-end",
		alignContent: "center",
		borderWidth: 1,
	},
	bottomContainer: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	headerText: {
		color: colors.text,
		fontFamily: "DMSerif",
		fontSize: 28,
		top: "0%",
		textAlign: "center",
	},
	button: {
		backgroundColor: colors.background,
		width: "45%",
		padding: "5%",
		borderRadius: 10,
		alignItems: "center",
		marginTop: "7%",
		borderWidth: 1,
	},
	buttonText: {
		fontFamily: "Jost",
	},
	imageCenter: {
		width: undefined,
		height: "60%",
		resizeMode: "contain",
	},
	pot: {
		height: "10%",
		resizeMode: "contain",
		top: "46.5%",
	},
	bottomMenu: {
		height: "20%",
		width: "100%",
		backgroundColor: colors.background,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderWidth: 1,
		zIndex: 2,
	},
	circleButton: {
		height: "100%",
		width: undefined,
		aspectRatio: 1,
		borderRadius: 100000,
		borderWidth: 1,
		backgroundColor: colors.text,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 2,
		marginBottom: "10%",
	},
	circleButtonImage: {
		width: "50%",
		height: "50%",
		zIndex: 2,
	},
	overlay: {
		position: "absolute",
		height: "85%",
		width: "100%",
		zIndex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		top: 0,
	},
	menuContainer: {
		width: "90%",
		alignItems: "center",
		position: "absolute",
		bottom: 0,
	},
	input: {
		backgroundColor: "white",
		paddingHorizontal: "5%",
		paddingVertical: "3.5%",
		borderRadius: 10,
		marginTop: "7%",
		width: "100%",
		borderWidth: 1,
		fontFamily: "Jost",
	},
	twoColumn: {
		width: "100%",
		justifyContent: "space-between",
		flexDirection: "row",
	},
	modalContainer: {
		backgroundColor: "white",
		flexBasis: "auto",
		width: "90%",
		padding: "5%",
		borderWidth: 1,
		borderRadius: 20,
	},
	center: {
		height: "100%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,.5)",
	},
	streakContainer: {
		height: "65%",
		width: "100%",
	},
	column: {
		height: "100%",
		width: "47.5%",
		justifyContent: "space-around",
	},
});
