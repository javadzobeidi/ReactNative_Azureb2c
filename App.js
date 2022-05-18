/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import B2CAuthentication from "./B2CAuthentication";
import { WebView } from 'react-native-webview';
import { authorize,logout  } from 'react-native-app-auth';



import log from "./logger"; 
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,onPress,Button,
  useColorScheme,Dimensions,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


function App()
{
  const isDarkMode = useColorScheme() === 'dark';
  const [state,setState]= React.useState({page:'www.google.com',visible:true});
  const [token,setToken]=useState({});

  let   _needRedirect=true;

  const b2cLogin = new B2CAuthentication({
    tenant: 'yourtenant.onmicrosoft.com',
    client_id: "3e010c0c-90e6-4740-aa41-b55add57ac38",
    client_secret: "WwH8Q~DOUAIfz9dBrVmrbrA10f7FlFzE5UK6TbDJ",
    user_flow_policy: "B2C_1_signupsignin",
    reset_password_policy: 'B2C_1_password_reset',
    token_uri: "https://login.microsoftonline.com/dae7f97a-d74f-4f6f-9b7f-dcfb68a7a3fb/oauth2/v2.0/token",
    authority_host: "https://login.microsoftonline.com/dae7f97a-d74f-4f6f-9b7f-dcfb68a7a3fb/oauth2/v2.0/authorize",
    redirect_uri: "https://jwt.ms",
    prompt: "login",
    scope: [ "openapi"]
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
function _handleADToken(e)
{



if (_needRedirect) {
  // this._needRedirect = false
  return true;
}
let code = /((\?|\&)code\=)[^\&]+/.exec(e.url)
if (code !== null) {
 console.log('ADLoginView._handleADToken code=', code[0])
 code = String(code[0]).replace(/(\?|\&)?code\=/, '')
}


}

const configB2c = {
  serviceConfiguration:{
  authorizationEndpoint:"https://propupcomau.b2clogin.com/propupcomau.onmicrosoft.com/B2C_1_SignAndSignup/oauth2/v2.0/authorize/",
  tokenEndpoint :"https://propupcomau.b2clogin.com/propupcomau.onmicrosoft.com/B2C_1_SignAndSignup/oauth2/v2.0/token",
  },

  clientId: '64f977bf-a132-40fd-a897-01ceb9a788ee',
  redirectUrl: 'msauth://com.nativeb2c/XlVZj%2FXPBjlUelRdY5yqAIO8TE0%3D',
  scopes: ['64f977bf-a132-40fd-a897-01ceb9a788ee','openid','email','offline_access'],
  responseTypes :"code",

};



const configLogout = {
  serviceConfiguration:{
    authorizationEndpoint:"https://propupcomau.b2clogin.com/propupcomau.onmicrosoft.com/B2C_1_SignAndSignup/oauth2/v2.0/authorize/",
    tokenEndpoint :"https://propupcomau.b2clogin.com/propupcomau.onmicrosoft.com/B2C_1_SignAndSignup/oauth2/v2.0/token",  
    endSessionEndpoint :"https://propupcomau.b2clogin.com/propupcomau.onmicrosoft.com/B2C_1_SignAndSignup/oauth2/v2.0/logout/",
    },
    clientId: '64f977bf-a132-40fd-a897-01ceb9a788ee',
};




const config = {
  serviceConfiguration:{
  authorizationEndpoint:"https://login.microsoftonline.com/dae7f97a-d74f-4f6f-9b7f-dcfb68a7a3fb/oauth2/v2.0/authorize/",
  tokenEndpoint :"https://login.microsoftonline.com/dae7f97a-d74f-4f6f-9b7f-dcfb68a7a3fb/oauth2/v2.0/token",
  },

  clientId: '3e010c0c-90e6-4740-aa41-b55add57ac38',
  redirectUrl: 'http://192.168.1.160:5001/signin-oidc',
  clientSecret :"",
  scopes: ['openid','email','offline_access'],
  responseTypes :"code",
  usePKCE :false
};


const identityserver= {
  issuer: 'https://demo.identityserver.io',
  clientId: 'interactive.public',
  redirectUrl: 'io.identityserver.demo:/oauthredirect',
  additionalParameters: {},
  scopes: ['openid', 'profile', 'email', 'offline_access'],

  // serviceConfiguration: {
  //   authorizationEndpoint: 'https://demo.identityserver.io/connect/authorize',
  //   tokenEndpoint: 'https://demo.identityserver.io/connect/token',
  //   revocationEndpoint: 'https://demo.identityserver.io/connect/revoke'
  // }

}

async function onPressLearnMore()
{
  try {
    const result = await authorize(configB2c);
    console.log(result);
    setToken(result);
    // result includes accessToken, accessTokenExpirationDate and refreshToken
  } catch (error) {
    console.log(error);
  }
}

async function onLogout()
{
  try {
    console.log(token);
    const result = await logout(configLogout,{idToken:token.idToken,
      postLogoutRedirectUrl:'msauth://com.nativeb2c/XlVZj%2FXPBjlUelRdY5yqAIO8TE0%3D'
    });
    console.log(result);
    // result includes accessToken, accessTokenExpirationDate and refreshToken
  } catch (error) {
    console.log("ERror Logout:",error);
  }
}

function spinner()
{
  return (  <View style={{ flex: 1,
    justifyContent: "center"}}>
    <ActivityIndicator />
    <ActivityIndicator size="large" />
    <ActivityIndicator size="small" color="#0000ff" />
    <ActivityIndicator size="large" color="#00ff00" />
  </View>)
}
  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View  style={{paddingLeft:0}}>

{/* 
<WebView  automaticallyAdjustContentInsets={false} style={
                    {
                      backgroundColor:'red',
                        flex: 1,
                        alignSelf: "stretch",
                        width: Dimensions.get("window").width,
                        height: Dimensions.get("window").height
                    }
                }
                incognito={true}
                source={{ uri: state.page }}
                javaScriptEnabled={true}
                domStorageEnabled={true}

             
                
                onLoadEnd={() => {
                  _needRedirect = false
                  
                }}
                decelerationRate="normal"
                javaScriptEnabledAndroid={true}
                onNavigationStateChange={(e)=>_handleADToken(e)}
                onShouldStartLoadWithRequest={e => {
                    return true;
                }}
                startInLoadingState={false}
                scalesPageToFit={true}
            /> */}
           
         
         <Button
  onPress={onPressLearnMore}
  title="Authorize"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>

  
<Button style={{paddingTop:'35'}}
  onPress={onLogout}
  title="LogOut"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
      
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
