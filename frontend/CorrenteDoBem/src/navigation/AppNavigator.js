import { NavigationContainer } from '@react-navigation/native';
import SearchOngsScreen from '../screens/Pages/SearchOngsScreens';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen';
import GradientBackground from '../components/GradientBackground';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from '../screens/Pages/LoginScreen';
import HelpScreen from '../screens/Pages/Help';
import TabNavigator from './TabNavigator';
import Login from '../screens/Pages/LoginPage';



const Drawer = createDrawerNavigator();


// Função para renderizar o cabeçalho com ícone de ajuda
const renderHeaderWithHelp = (navigation, title) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 20 }}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Help')}>
          <Icon name="help-outline" size={24} color="#000" />
      </TouchableOpacity>
  </View>
);


const AppNavigator = () => {
  return(
    <GradientBackground style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator 
          screenOptions={{
            drawerLabelStyle: {
              fontSize: 20, // Aumenta o tamanho do texto
            },
            drawerItemStyle: {
              width: 'auto',
              paddingTop: 20,
              paddingBottom:20,
              margin: 0,
            },
            
          }}
        >
          <Drawer.Screen 
              name='Home' 
              component={TabNavigator} 
              options={{
                headerTitle: 'Home',
                drawerIcon: ({ focused }) => (
                  <Icon name="home-outline" size={20} color={focused ? '#2c5321' : '#000'} />
                ),
                // headerShown: false , //TODO: PEDIR PRO JAIR OLHAR ISSO AQUI PQ FAZ O MENU SUMIR
               }} 
          />

          <Drawer.Screen name= 'Busca' component={SearchOngsScreen} options={{
            drawerIcon: ({ focused }) => (
              <Icon name="search-outline" size={20} color={focused ? '#2c5321' : '#000'} />
            ),
            }} 
          />

          <Drawer.Screen name= 'Login' component={LoginScreen} options={{
            drawerIcon: ({ focused }) => (
              <Icon name="log-in-outline" size={20} color={focused ? '#2c5321' : '#000'} />
            ),
            }} 
          />
          <Drawer.Screen 
            name='Help' 
            component={HelpScreen} 
            options={{
              drawerIcon: ({ focused }) => (
                <Icon name="heart-outline" size={20} color={focused ? '#2c5321' : '#000'} />
              ),
            }} 
          />

          <Drawer.Screen name= 'Logout' component={LoginScreen} options={{
            drawerIcon: ({ focused }) => (
              <Icon name="log-out-outline" size={20} color={focused ? '#2c5321' : '#000'} />
            ),
            }}
            style={{ margintop: 100}} 
          />

          <Drawer.Screen name= 'Teste' component={Login} options={{
            drawerIcon: ({ focused }) => (
              <Icon name="log-out-outline" size={20} color={focused ? '#2c5321' : '#000'} />
            ),
            }}
            style={{ margintop: 100}} 
          />

        </Drawer.Navigator>
      </NavigationContainer>
    </GradientBackground>

  )
}

export default AppNavigator;