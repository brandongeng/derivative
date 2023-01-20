import * as Font from "expo-font";

export default async function useCustomFonts() {
	await Font.loadAsync({
		DMS: require("../assets/fonts/DMSerif/DMSerifDisplay-Regular.ttf"),
		Jost: require("../assets/fonts/Jost/Jost-Regular.ttf"),
	});
}
