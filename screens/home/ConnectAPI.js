import React, { useState, useEffect, useRef } from "react";
import {
	StyleSheet,
	TouchableOpacity,
	View,
  Text,
	Image,
	KeyboardAvoidingView,
} from "react-native";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import { colors } from "../../style/colors";



const auth = getAuth(app);

const ConnectAPI = () => {
    const [googleaccessToken, setGoogleAccessToken] = React.useState(null);
    const [totalHP, setTotalHP] = React.useState(0);

    const handleSignOut = () => {
		auth.signOut()
			.then(() => {
				navigation.replace("Login");
			})
			.catch((error) => alert(error.message));
	};

  async function fetchUserInfo() {

    fetch("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
      method: 'POST',
      headers: { 
        'Authorization': 'Bearer ' + googleaccessToken,
        'Content-Type':'application/json' 
        },
      body: JSON.stringify({
          "aggregateBy": [{
            "dataSourceId":
              "derived:com.google.heart_minutes:com.google.android.gms:merge_heart_minutes"
          }],
         "bucketByTime": { "durationMillis": 86400000 },
          "startTimeMillis":1672613037000, //January 1 
          "endTimeMillis": 1675550780000, //February 4
      })
    })
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      let sum = 0
      for(let i = 0; i < data.bucket.length; i++) {  
        if(data.bucket[i].dataset[0].point.length > 0) { 
          //console.log(data.bucket[i].dataset[0].point[0].value[0].fpVal)
          sum = sum + data.bucket[i].dataset[0].point[0].value[0].fpVal
        }
      }
      //console.log(sum)
      setTotalHP(sum)
    })
    .catch((error) =>  { 
      console.log("fetchUserInfoError: " + error);
    });
  }

    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/fitness.activity.read', 
                'https://www.googleapis.com/auth/fitness.activity.write',
                'https://www.googleapis.com/auth/fitness.body.read',
                'https://www.googleapis.com/auth/fitness.body.write'
              ],
        forceCodeForRefreshToken: true,
        webClientId: "626497571943-u67u2r29stgc3j094i845g60hqth4e8v.apps.googleusercontent.com", 
        offlineAccess: true,
    
    });

      async function signInWithGoogle() {
        try { 
          await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        }
        catch (error) { 
          console.log("PlayServices Error: " + error)
        }
        try { 
          await GoogleSignin.signIn();
        }
        catch(error) { 
          console.log("Google Sign in Error:" + error)
        }
        try { 
            GoogleSignin.getTokens().then((tokens) => { 
              setGoogleAccessToken(tokens.accessToken);
            })
        }
        catch(error) { 
          console.log("Tokens Error" + error)
        }
      }

      React.useEffect(() => { 
        if (googleaccessToken !== null) { 
          fetchUserInfo();
        }
      }, [googleaccessToken]);


    return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'white'}}>
      <Text style={styles.headerText}>
        Grow Muscles. Grow Plants
        </Text>
      <Text style={styles.captionText}>
        By connecting to one of the applications listed below, you will be rewarded with every minute of exercise completed via
        growth points.
      </Text>
        <View style={styles.apisquare}>
        <TouchableOpacity onPress={() => signInWithGoogle()} style={styles.apirect}>
          <Image source={require("../../assets/images/icons/google_fit_logo.jpg")} style={styles.imagefit}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signInWithGoogle()} style={styles.apirect}>
          <Image source={require("../../assets/images/icons/apple_health_logo.png")} style={styles.imagefit}/>
        </TouchableOpacity>
        </View>
    </View>
    );
    };

    const styles = StyleSheet.create({
      headerText: {
        color: colors.text,
        fontFamily: "DMSerif",
        fontSize: 28,
        top: "0%",
        textAlign: "center",
        marginTop: "10%",
      },
      captionText: {
        color: colors.text, 
        fontFamily: "DMSerif",
        fontSize: 14,
        marginLeft: "2%",
        marginRight: "2%",
        marginTop: "10%",
      },
      apisquare: { 
        marginTop: "10%",
        //backgroundColor: "red",
        height: "40%",
        width: "90%",
      },
      apirect: {
        marginLeft: "5%",
        marginRight: "5%",
        width: "90%",
        height: "50%",
      },
      imagefit: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
      },
    });


export default ConnectAPI;