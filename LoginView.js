import React,{useState} from "react";
import { Dimensions,View,Text } from "react-native";
import { WebView } from 'react-native-webview';
import log from "./logger";
import B2CAuthentication from "./B2CAuthentication";


export default  function LoginView({context})
{

  const [state,setState]= React.useState({page:'https://login.microsoftonline.com/dae7f97a-d74f-4f6f-9b7f-dcfb68a7a3fb/oauth2/v2.0/authorize?client_id=3e010c0c-90e6-4740-aa41-b55add57ac38&nonce=123456789&redirect_uri=https://jwt.ms&scope=openid&response_type=code',visible:true});
const [needRedirect,setNeedRedirect]=useState(true);
  const webViewRef = React.useRef();

    function     getLoginUrl(url)
    {
        console.log("getLoginUrl");
        const authUrl = url;
        const redirect = context.getConfig().redirect_uri;
        const prompt = context.getConfig().prompt || "login";
        const userFlowPolicy = context.getConfig().user_flow_policy;
        const clientId = context.getConfig().client_id;
        const scope = context.getConfig().scope;
        if (context !== null) {
            const result =
                `${authUrl}?p=${userFlowPolicy}&response_type=code` +
                `&client_id=${clientId}` +
                (redirect ? `&redirect_uri=${redirect}&nonce=rnad-${Date.now()}` : "") +
                (prompt ? `&prompt=${prompt}` : "") +
                (scope ? `&scope=${scope.join(" ")}` : "");
            ;

            console.log(result);
            return result;
        } else {
            throw new Error("context should not be null/undefined.");
        }
    }

    let js = `document.getElementsByTagName('body')[0].style.height = '${
        Dimensions.get("window").height
        }px';`;

        function _handleADToken()
        {
            console.log("Change");
        }

    return (
        <WebView
        ref={webViewRef}
                automaticallyAdjustContentInsets={false}
                style={
                    {
                        flex: 1,
                        alignSelf: "stretch",
                        width: Dimensions.get("window").width,
                        height: Dimensions.get("window").height
                    }
                }
                source={{ uri: state.page }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onLoadEnd={() => {
                  
                }}
                decelerationRate="normal"
                javaScriptEnabledAndroid={true}
                onNavigationStateChange={()=>_handleADToken}
                onShouldStartLoadWithRequest={e => {
                    return true;
                }}
                startInLoadingState={false}
                injectedJavaScript={js}
                scalesPageToFit={true}
            />
    )
}

