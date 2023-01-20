import React, { useState, useEffect, useRef } from "react";
import {
	StyleSheet,
	TouchableOpacity,
	View,
	Image,
	KeyboardAvoidingView,
} from "react-native";


const Room = () => {
{/* <View style={styles.bottomContainer}>
            <View style={styles.bottomMenu}>
                <View
                    style={{
                        width: "40%",
                        height: "100%",
                    }}
                >
                    <View
                        style={[
                            styles.twoColumn,
                            {
                                width: "100%",
                                height: "100%",
                                alignItems: "center",
                                justifyContent: "space-between",
                            },
                        ]}
                    >
                        <View
                            style={{
                                height: "80%",
                                width: "50%",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignSelf: "flex-start",
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
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                height: "80%",
                                width: "45%",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignSelf: "flex-start",
                                }}
                                onPress={() => navigation.push("Register")}
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
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={[styles.circleButton]}>
                    <TouchableOpacity
                        style={[
                            styles.circleButton,
                            {
                                bottom: "0%",
                                borderWidth: 0,
                                width: "100%",
                                marginBottom: 0,
                            },
                        ]}
                        onPress={() =>
                            appendHabit(
                                formData.HabitName,
                                formData.Frequency,
                                formData.Description,
                                formData.Reminders,
                                animation
                            )
                        }
                    >
                        <Image
                            source={require("../../assets/images/icons/plus.png")}
                            style={styles.circleButtonImage}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        width: "40%",
                        height: "100%",
                    }}
                >
                    <View
                        style={[
                            styles.twoColumn,
                            {
                                width: "100%",
                                height: "100%",
                                alignItems: "center",
                                justifyContent: "space-between",
                            },
                        ]}
                    >
                        <View
                            style={{
                                height: "80%",
                                width: "50%",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignSelf: "flex-start",
                                }}
                                onPress={() => handleSignOut()}
                            >
                                <Image
                                    source={require("../../assets/plant_calendar.png")}
                                    style={{
                                        height: "100%",
                                        width: undefined,
                                        aspectRatio: 1,
                                        resizeMode: "contain",
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                height: "80%",
                                width: "45%",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignSelf: "flex-start",
                                }}
                                onPress={async () => {
                                    await schedulePushNotification();
                                }}
                            >
                                <Image
                                    source={require("../../assets/plant.png")}
                                    style={{
                                        height: "100%",
                                        width: undefined,
                                        aspectRatio: 1,
                                        resizeMode: "contain",
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View> */}
}

export default Room;