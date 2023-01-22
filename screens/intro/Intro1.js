import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Image,
	FlatList,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { colors } from "../../style/colors";
import { useNavigation } from "@react-navigation/native";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../../firebase";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const slideData = [
	{
		headerText: "Grow Healthy\nHabits",
		bodyText: [
			{ text: "Build ", type: "regular" },
			{ text: "routines", type: "bold" },
			{ text: " to become happier, healthier, and ", type: "regular" },
			{ text: "reach your goals", type: "bold" },
		],
		id: 0,
	},
	{
		headerText: "Set Up Simple\nSmall Goals",
		bodyText: [
			{
				text: "Set up daily tasks and celebrate taking ",
				type: "regular",
			},
			{ text: "small steps", type: "bold" },
			{ text: " towards improvement ", type: "regular" },
		],
		id: 1,
	},
	{
		headerText: "See Incredible\nResults",
		bodyText: [
			{ text: "Create ", type: "regular" },
			{ text: "powerful positive habits", type: "bold" },
			{ text: " as you complete your goals every day", type: "regular" },
		],
		id: 2,
	},
	{ id: 4, bodyText: [], headerText: "Let's Build\nGreat Habits" },
];

const handleGetStarted = (navigation) => {
	signInAnonymously(auth)
		.then(() => {
			// navigation handled in App.js
			// navigation.push("Home")
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.warn(errorMessage);
		});
};

const Slide = ({ data }) => {
	const navigation = useNavigation();
	images = [
		require("../../assets/images/introImages/hand.png"),
		require("../../assets/images/introImages/acorns.png"),
		require("../../assets/images/introImages/tree.png"),
	];
	if (data.id !== slideData.length) {
		return (
			<View style={styles.pageContainer}>
				<Text style={styles.headerText}>{data.headerText}</Text>
				<Image source={images[data.id]} style={styles.imageCenter} />
				<Text style={styles.bodyText}>
					{data.bodyText.map((item, id) => {
						if (item.type === "regular") {
							return item.text;
						} else {
							return (
								<Text
									style={{
										color: colors.text,
										fontFamily: "JostBold",
									}}
									id={item.id}
								>
									{item.text}
								</Text>
							);
						}
					})}
				</Text>
			</View>
		);
	} else {
		return (
			<View style={styles.pageContainer}>
				<Text style={styles.headerText}>{data.headerText}</Text>
				<Image
					style={styles.imageLogo}
					source={require("../../assets/images/introImages/logo.png")}
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={() => handleGetStarted(navigation)}
				>
					<Text style={styles.buttonText}>Get Started</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.push("Register")}
				>
					<Text style={styles.buttonText}>Sign Up</Text>
				</TouchableOpacity>
				<Text style={styles.footerText}>No Sign Up Required</Text>
				<View style={styles.align}>
					<Text style={styles.footerText}>
						Already have an Account?{"\t"}
					</Text>
					<TouchableOpacity onPress={() => navigation.push("Login")}>
						<Text style={styles.link}>{"\t"}Sign In</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
};

const Intro1 = () => {
	const [index, setIndex] = useState(0);
	const indexRef = useRef(index);
	indexRef.current = index;

	const onScroll = useCallback((event) => {
		const slideSize = event.nativeEvent.layoutMeasurement.width;
		const index = event.nativeEvent.contentOffset.x / slideSize;
		const roundIndex = Math.round(index);
		const distance = Math.abs(roundIndex - index);
		const isNoMansLand = 0.4 < distance;

		if (roundIndex !== indexRef.current && !isNoMansLand) {
			setIndex(roundIndex);
		}
	}, []);

	/*useEffect(() => {
		console.log(index);

	}, [index]);

	useEffect(()=>{
		return () => {
			console.log("Unmount")
		}
	},[])*/

	return (
		<SafeAreaView style={styles.pageContainer}>
			<FlatList
				data={slideData}
				style={{ flex: 1, height: "90%", bottom: 60}}
				pagingEnabled
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => {
					return <Slide data={item} />;
				}}
				onScroll={onScroll}
			/>
			<View style={styles.dotContainer}>
				{slideData.map((_, id) => {
					return id === index ? (
						<View style={dotStyle(colors.text)} key={id} />
					) : (
						<View style={dotStyle("white")} key={id} />
					);
				})}
			</View>
		</SafeAreaView>
	);
};

export default Intro1;

const dotStyle = function (options) {
	return {
		aspectRatio: 1,
		width: 15,
		marginHorizontal: 5,
		marginVertical: 20,
		backgroundColor: options,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "black",
		position: "relative",
		zIndex: 8,
	};
};

const styles = StyleSheet.create({
	pageContainer: {
		windowHeight,
		width: windowWidth,
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: colors.background,
	},
	headerText: {
		color: colors.text,
		fontFamily: "DMSerif",
		fontSize: 48,
		marginTop: 80,
	},
	imageCenter: {
		width: "80%",
		height: undefined,
		resizeMode: "contain",
		aspectRatio: windowHeight > 700 ? 1 : 1.5,
		marginTop: 20,
		marginBottom: 20,
	},
	imageLogo: {
		width: "50%",
		height: undefined,
		resizeMode: "contain",
		aspectRatio: windowHeight > 700 ? 1 : 1.5,
		marginTop: "15%",
		marginBottom: "15%",
	},
	bodyText: {
		color: "black",
		fontFamily: "Jost",
		fontSize: 22,
		marginLeft: 30,
		marginRight: 30,
		textAlign: "center",
	},
	dotContainer: {
		flexDirection: "row",
		justifyContent: "center",
		zIndex: 8,
		position: "absolute",
		alignSelf: "center",
		bottom: 20,
	},
	dot: {
		aspectRatio: 1,
		width: 12,
		marginHorizontal: 2,
		marginVertical: 2,
		backgroundColor: "white",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "black",
		position: "relative",
		zIndex: 8,
	},
	button: {
		backgroundColor: colors.text,
		width: "70%",
		padding: 10,
		borderRadius: 10,
		alignItems: "center",
		color: "white",
		marginBottom: 10,
	},
	buttonText: {
		color: "white",
		fontSize: 20,
		padding: 2.5,
		fontFamily: "JostBold",
	},
	link: {
		color: colors.text,
		textDecorationLine: "underline",
	},
	align: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	footerText: {
		fontFamily: "Jost",
	},
});
