import {
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Image,
	BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { app } from "../../firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { colors } from "../../style/colors";
import { getDatabase, ref, set } from "firebase/database";

const auth = getAuth(app);
const database = getDatabase(app);

function validateEmail(email) {
	var re = /\S+@\S+\.\S+/;
	return re.test(email);
}

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigation = useNavigation();

	const handleSignUp = () => {
		if (validateEmail(email)) {
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredentials) => {
					const uid = userCredentials.user.uid;
					const email = userCredentials.user.email;
					set(ref(database, "users/" + uid), {
						email: email,
					});
				})
				.catch((error) => console.log(error.message));
		} else {
			alert("Enter Valid Email");
		}
	};

	function handleBackButton() {
		navigation.goBack();
		return true;
	}

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", handleBackButton);
		return () => {
			BackHandler.removeEventListener(
				"hardwareBackPress",
				handleBackButton
			);
		};
	}, []);

	return (
		<KeyboardAvoidingView style={styles.container} behavior={"padding"}>
			<Text style={styles.headerText}>First Step of a Great Journey</Text>
			<Image
				source={require("../../assets/images/introImages/shoe.png")}
				style={styles.imageCenter}
			/>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Email"
					onChangeText={(text) => setEmail(text)}
					value={email}
					style={styles.input}
				/>
				<TextInput
					placeholder="Password"
					value={password}
					onChangeText={(text) => setPassword(text)}
					style={styles.input}
					secureTextEntry
				/>

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.button}
						onPress={handleSignUp}
					>
						<Text style={styles.buttonText}>Register</Text>
					</TouchableOpacity>
					<View style={styles.align}>
						<Text>Already have an account? </Text>
						<TouchableOpacity
							onPress={() => navigation.replace("Login")}
						>
							<Text style={styles.link}>Log In</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

export default Register;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.background,
	},
	align: {
		flexDirection: "row",
	},
	inputContainer: {
		width: "80%",
	},
	input: {
		backgroundColor: "white",
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		marginBottom: 20,
	},
	buttonContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		backgroundColor: colors.text,
		width: "100%",
		padding: 10,
		borderRadius: 10,
		alignItems: "center",
		color: "white",
		marginBottom: 10,
	},
	buttonText: {
		color: "white",
		fontWeight: "700",
		fontSize: 16,
	},
	link: {
		color: colors.text,
		textDecorationLine: "underline",
	},
	headerText: {
		color: colors.text,
		fontFamily: "DMSerif",
		fontSize: 48,
		marginTop: 20,
	},
	imageCenter: {
		width: "70%",
		height: undefined,
		resizeMode: "contain",
		aspectRatio: 1,
		marginTop: 10,
		marginBottom: 0,
	},
});
