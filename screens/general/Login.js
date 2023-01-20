import {
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { app } from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { colors } from "../../style/colors";

const auth = getAuth(app);

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleSignUp = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				alert(errorMessage);
			});
	};
	const navigation = useNavigation();
	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			<Text style={styles.headerText}>Welcome Back, Carpe Diem!</Text>
			<Image
				source={require("../../assets/images/introImages/fist.png")}
				style={styles.imageCenter}
			/>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Email"
					value={email}
					onChangeText={(text) => setEmail(text)}
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
						<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>
					<View style={styles.align}>
						<Text>Don't have an account? </Text>
						<TouchableOpacity
							onPress={() => navigation.replace("Register")}
						>
							<Text style={styles.link}>Sign Up</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

export default Login;

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
