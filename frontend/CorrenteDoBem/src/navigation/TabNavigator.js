import React from 'react';
import SearchOngsScreen from '../screens/Pages/SearchOngsScreens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import HelpScreen from '../screens/Pages/Help';
import LoginScreen from '../screens/Pages/LoginScreen';
import Login from '../screens/Pages/LoginPage';
import CreateUserScreen from '../screens/Pages/CreateUserScreen';

const Tab = createBottomTabNavigator();

// Navegação de abas
const TabNavigator = () => {

    return (
        <Tab.Navigator 
            screenOptions={{
                tabBarActiveTintColor: '#2c5321', //cor quando ta ativo
                tabBarInactiveTintColor: '#000000',
                tabBarLabelStyle: { 
                  fontSize: 16, 
                  color: '#000', 
                  fontWeight:'semibold', 
                  textAlign:'center',
                  elevation: 50,
                }, 
                tabBarStyle: {
                  backgroundColor: '#91a261', // Cor do fundo
                  borderRadius:5,
                //   borderTopLeftRadius: 20, // Bordas arredondadas
                //   borderTopRightRadius: 20, // Bordas arredondadas
                  position: 'absolute', // Para garantir que fique fixo na parte inferior
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height:70,
                //   marginBottom:5,
                //   elevation: 10, // Sombreamento
                  paddingTop:10,
                  paddingBottom:10,
              },
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{
                    tabBarIcon: ({ color }) => <Icon name="home" size={30} color={color} />,
                }} 
            />
            <Tab.Screen 
                name="Busca" 
                component={SearchOngsScreen} 
                options={{
                    tabBarIcon: ({ color }) => <Icon name="search" size={30} color={color} />,
                }} 
            />
            <Tab.Screen 
                name="Login" 
                component={LoginScreen} 
                options={{
                    tabBarIcon: ({ color }) => <Icon name="log-in" size={30} color={color} />,
                }} 
            />
            <Tab.Screen 
                name="Help" 
                component={HelpScreen} 
                options={{
                    tabBarIcon: ({ color }) => <Icon name="heart-sharp" size={30} color={color} />,
                }}
            />
            <Tab.Screen 
                name="LoginScreen" 
                component={Login} 
                options={{
                    tabBarButton: () => null, // Oculta a aba "Teste"
                }}
                // options={{
                //     tabBarIcon: ({ color }) => <Icon name="heart-sharp" size={30} color={color} />,
                // }}
            />
            <Tab.Screen 
                name="Register" 
                component={CreateUserScreen} 
                options={{
                    tabBarButton: () => null, // Oculta a aba "Teste"
                }}
                // options={{
                //     tabBarIcon: ({ color }) => <Icon name="heart-sharp" size={30} color={color} />,
                // }}
            />
        </Tab.Navigator>
    );
  };

export default TabNavigator;