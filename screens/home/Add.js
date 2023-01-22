import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Animated, Modal, Dimensions } from "react-native";
import { colors } from "../../style/colors";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
	TextInput,
} from "react-native";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { getDatabase, push, ref } from "firebase/database";

const auth = getAuth(app);
const database = getDatabase(app);

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Add = (data, formClear) => {
	const [frequency, setFrequency] = useState([]);
	const [items, setItems] = useState([
		{ label: "Twice a Day", value: [2, 2, 2, 2, 2, 2, 2] },
		{ label: "Every Day", value: [1, 1, 1, 1, 1, 1] },
		{ label: "Every Other Day", value: [1, 0, 1, 0, 1, 0, 1] },
		{ label: "Custom", value: [-1] },
	]);
	const [open, setOpen] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [description, setDescription] = useState("");
	const [reminder, setReminder] = useState(true);
	const [name, setName] = useState("");

	const handleName = (text) => {
		data.handleForm("name", text);
		setName(text);
	};

	const handleDescription = (text) => {
		data.handleForm("description", text);
		setDescription(text);
	};

	const appendHabit = (
		HabitName,
		Frequency,
		Description,
		Reminders,
	) => {
		if (HabitName !== "" && Frequency !== []) {
			for (let i = 0; i < Frequency.length; i++) {
				let temp = Frequency[i];
				Frequency[i] = [temp, 0];
			}
			const uid = auth.currentUser.uid;
			push(ref(database, "users/" + uid + "/habits/"), {
				habitName: HabitName,
				streakNumber: 0,
				reminders: Reminders,
				description: Description,
				frequency: Frequency,
				type: "habit",
				completed: {},
			});
		}
	};

	useEffect(() => {
		data.handleForm("frequency", frequency);
	}, [frequency]);

	useEffect(() => {
		if (formClear) {
			setName("");
			setDescription("");
			setFrequency([]);
			setReminder(true);
			data.setFormClear(false);
		}
	}, [formClear]);

	return (
		<View
			style={{
				width: windowWidth,
				alignItems: "center",
				justifyContent: "flex-start",
			}}
		>
			<Modal
				animationType="fade"
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
				transparent
				statusBarTranslucent={true}
			>
				<View style={styles.center}>
					<View style={styles.modalContainer}>
						<TextInput
							multiline={true}
							numberOfLines={4}
							onChangeText={(text) => handleDescription(text)}
							value={description}
							style={[
								styles.input,
								{
									textAlignVertical: "top",
									marginTop: 0,
								},
							]}
							placeholder="Enter Description of Habit"
						/>
						<View style={styles.twoColumn}>
							<TouchableOpacity
								style={styles.button}
								onPress={() => setModalVisible(false)}
							>
								<Text>Confirm</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.button}
								onPress={() => {
									setDescription("");
									setModalVisible(false);
								}}
							>
								<Text>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
			<Animated.Image
				style={[
					styles.pot,
					{ transform: [{ translateY: data.animation }] },
				]}
				source={require("../../assets/images/pots/potEmpty.png")}
			/>
			<Animated.View
				style={[{ transform: [{ translateY: data.animation }] }]}
			>
				<Text style={styles.headerText}>Plant a Habit</Text>
			</Animated.View>
			<View style={styles.menuContainer}>
				<TextInput
					style={styles.input}
					placeholder="Habit Name"
					value={name}
					onChangeText={(text) => handleName(text)}
				/>
				<View style={Platform.OS === 'ios' ? { marginTop: "7%", alignSelf: "center" , zIndex: 10}: { marginTop: "7%", alignSelf: "center" }}>
					<DropDownPicker
						open={open}
						setOpen={setOpen}
						value={frequency}
						items={items}
						setValue={setFrequency}
						setItems={setItems}
						placeholder="Select"
						placeholderStyle={{
							color: "grey",
							fontFamily: "Jost",
						}}
						textStyle={{ fontFamily: "Jost" }}
					/>
				</View>
				<View style={styles.twoColumn}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => setModalVisible(true)}
					>
						<Text style={styles.buttonText}>Description</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => setReminder(!reminder)}
					>
						<Text style={styles.buttonText}>
							{reminder ? "Reminders: On" : "Reminders: Off"}
						</Text>
					</TouchableOpacity>
				</View>
				<View style={{width: "100%", marginTop: 20}}>
					<TouchableOpacity
						style={{
							backgroundColor: colors.background,
							width: "100%",
							height: "45%",
							justifyContent: 'center',
							borderRadius: 10,
							alignItems: "center",
							borderWidth: 1,
						}}
						onPress={() =>
							data.appendHabit(
								name,
								frequency,
								description,
								reminder
							)
						}
					>
						<Text style={styles.headerText}>New Plant</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

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
		backgroundColor: "white",
		justifyContent: "flex-end",
		alignContent: "center",
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
		top: "38%",
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
		bottom: 40
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

export default Add;
