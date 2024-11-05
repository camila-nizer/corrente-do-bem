// import React, { useState, useEffect } from 'react';
// import { StyleSheet} from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// import GradientBackground from '../components/GradientBackground';
// import { createNativeStackNavigator} from '@react-navigation/native-stack'
// import SearchOngsScreen from '../screens/Pages/SearchOngsScreens';
// // import { TouchableOpacity, Text } from 'react-native';
// // import Icon from 'react-native-vector-icons/FontAwesome'; 
// import LoginScreen from '../screens/Pages/LoginScreen';
// import HelpScreen from '../screens/Pages/Help';
// import * as Font from 'expo-font';
// import HomeScreen from '../screens/Home/HomeScreen';
// import TabNavigator from './TabNavigator';



// const HomeNavigator = () => {
//   // const navigation = useNavigation();
//   const Stack = createNativeStackNavigator();
//   const [fontsLoaded, setFontsLoaded] = useState(false);
//   useEffect(() => {
//       const loadFonts = async () => {
//         await Font.loadAsync({
//           'poppins-regular-italic': require('@expo-google-fonts/poppins/Poppins_600SemiBold.ttf'),
//         });
//         setFontsLoaded(true);
//       };
//       loadFonts();
//     }, []);

//   if (!fontsLoaded) {
//     console.log('ta com fonte null');
//     return null;
//   }

//   return (
//     <GradientBackground>
//       <Stack.Navigator initialRouteName='HomeUserScreen' screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
//           {/* <Stack.Screen name="HomeScreen" component={HomeScreen} screenOptions={{ headerShown: false }}          /> */}
//           {/* <Stack.Screen name="SearchOngsScreen" component={SearchOngsScreen} screenOptions={{ headerShown: false }}/> */}
//           {/* <Stack.Screen name="HelpScreen" component={HelpScreen} screenOptions={{ headerShown: false }}/> */}
//           <Stack.Screen name="LoginScreen" component={LoginScreen} screenOptions={{ headerShown: false }}/> 
                 
//       </Stack.Navigator>
//     </GradientBackground>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     borderWidth: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 18,
//     borderRadius: 4,
//     elevation: 3,
//     margin: 15,
//     backgroundColor: 'transparent',
//     width: '60%',
//   },
//   text: {
//     fontSize: 18,
//     fontFamily:'poppins-regular-italic',
//     fontWeight: 'bold',
//     letterSpacing: 0.25,
//     color: 'black',
//   },
// });

// export default HomeNavigator;