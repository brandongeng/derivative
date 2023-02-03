import React, { useEffect } from "react";
import { Animated, Dimensions } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { colors } from "../../style/colors";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { getDatabase, update, ref, set } from "firebase/database";
import { duration } from "moment";

const database = getDatabase(app);
const auth = getAuth(app);

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Habit = (data) => {
	useEffect(() => {
		console.log("freq: ", data);
	}, []);
	const streakText = ["Complete this task often\n to build your streak"];
	const statusText = [
		"Getting Started",
		"Budding",
		"Developing",
		"Established",
		"Influential",
	];
	
	const handleComplete = () => {
		const updates = {};
		const uid = auth.currentUser.uid;
		var today = new Date();
		today.setHours(0, 0, 0, 0);
		let updateCompleted = {};
		if (!data.completed) {
			updateCompleted[today] = 1;
		} else {
			updateCompleted = data.completed;
			updateCompleted[today] = (updateCompleted[today] || 1) + 1;
		}
		updates["/users/" + uid + "/habits/" + data.key + "/completed/"] =
			updateCompleted;
		console.log(data.key)
		//set(ref(database, "/users/" + uid + "/habits/" + data.key + "/completed/"), updateCompleted)
	};

	function handleStreak() {
		let day = new Date();
		day.setHours(0, 0, 0, 0);
		let count = 0;
		if (!data.completed) {
			return count;
		}
		if (day.toString() in data.completed) {
			count++;
		}
		day.setDate(day.getDate() - 1);
		while (day.toString() in data.completed) {
			count++;
			day.setDate(day.getDate() - 1);
		}
		return count;
	}

	function thisWeekDay(day) {
		let now = new Date();
		now.setHours(0, 0, 0, 0);
		now.setDate(now.getDate() - now.getDay() + day);
		return now;
	}

	const dotStyle = (frequency, id) => {
		let backgroundColor;
		const day = thisWeekDay(id).toString();
		if (frequency == 0) {
			backgroundColor = "#D3D3D3";
		} else if (frequency !== 0 && data.completed && day in data.completed) {
			backgroundColor = colors.text;
		} else {
			backgroundColor = "transparent";
		}
		return {
			borderWidth: 1,
			borderRadius: 100,
			height: undefined,
			width: "100%",
			aspectRatio: 1,
			backgroundColor: backgroundColor,
		};
	};

	return (
		<View
			style={{
				width: windowWidth,
				alignItems: "center",
				justifyContent: "flex-start",
			}}
		>
			<Animated.Image
				style={[
					styles.pot,
					{
						transform: [{ translateY: data.animation }],
					},
				]}
				source={require("../../assets/images/pots/sunflower/sunflower1.png")}
			/>
			<Animated.View
				style={[{ transform: [{ translateY: data.animation }] }]}
			>
				<Text
					style={[
						styles.headerText,
						{ marginLeft: "10%", marginRight: "10%", top: "-35%" },
					]}
				>
					{data.habitName}
				</Text>
			</Animated.View>
			<View style={[styles.menuContainer, { height: "37.5%" }]}>
				<View style={[styles.twoColumn, { height: "80%" }]}>
					<View style={styles.column}>
						<View
							style={[
								styles.streakContainer,
								{
									borderWidth: 1,
									backgroundColor: colors.background,
									borderRadius: 10,
									justifyContent: "center",
									alignItems: "center",
								},
							]}
						>
							<Image
								source={require("../../assets/images/icons/streak.png")}
								style={{ height: "40%", resizeMode: "contain" }}
							/>
							<Text style={{ fontFamily: "Jost", fontSize: 18 }}>
								{handleStreak()}
								{data.streakNumber === 1 ? " Day" : " Days"}
							</Text>
							<Text
								style={{
									fontFamily: "Jost",
									fontSize: 12,
									textAlign: "center",
								}}
							>
								{streakText[Math.floor(data.streakNumber / 5)]}
							</Text>
						</View>
						<TouchableOpacity
							style={[
								styles.button,
								{ width: "100%", padding: "10%" },
							]}
						>
							<Text style={styles.buttonText}>More Info</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.column}>
						<View
							style={[
								styles.streakContainer,
								{ justifyContent: "space-between" },
							]}
						>
							<View
								style={{
									height: "45%",
									width: "100%",
									backgroundColor: colors.background,
									borderRadius: 10,
									borderWidth: 1,
								}}
							>
								<View
									style={[
										styles.twoColumn,
										{ height: "100%" },
									]}
								>
									<View
										style={{
											height: "100%",
											justifyContent: "center",
											width: "70%",
										}}
									>
										<Text
											style={{
												marginLeft: "10%",
												fontFamily: "Jost",
												fontSize: 18,
											}}
										>
											Habit Status:
										</Text>
										<Text
											style={{
												marginLeft: "10%",
												fontFamily: "Jost",
											}}
										>
											Getting Started
										</Text>
									</View>
									<View
										style={{
											width: "30%",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<Image
											source={require("../../assets/images/status/seed.png")}
											style={{
												height: "80%",
												resizeMode: "contain",
											}}
										/>
									</View>
								</View>
							</View>
							<View
								style={{
									height: "45%",
									width: "100%",
									backgroundColor: colors.background,
									borderRadius: 10,
									borderWidth: 1,
									justifyContent: "space-evenly",
									alignItems: "center",
									flexDirection: "row",
								}}
							>
								{data.frequency.map((item, id) => {
									const days = [
										"M",
										"T",
										"W",
										"T",
										"F",
										"S",
										"S",
									];
									return (
										<View style={{ width: "10%" }}>
											<View
												style={dotStyle(item, id)}
											></View>
											<Text
												style={{ textAlign: "center" }}
											>
												{days[id]}
											</Text>
										</View>
									);
								})}
							</View>
						</View>
						<TouchableOpacity
							style={[
								styles.button,
								{ width: "100%", padding: "10%" },
							]}
						>
							<Text style={styles.buttonText}>Edit</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={{ width: "100%", marginTop: 20 }}>
					<TouchableOpacity
						style={{
							backgroundColor: colors.background,
							width: "100%",
							height: "45%",
							justifyContent: "center",
							borderRadius: 10,
							alignItems: "center",
							borderWidth: 1,
						}}
						onPress={() => handleComplete()}
						disabled={
							data.completed &&
							new Date().toString() in data.completed
						}
					>
						<Text style={styles.headerText}>Complete Habit</Text>
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
		bottom: 40,
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

export default Habit;
