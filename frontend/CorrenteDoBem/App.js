import './gesture-handler';
import React, { useEffect } from 'react';
import { View , Text, LogBox} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator'
import Toast from 'react-native-toast-message';



const App = () => {

  useEffect(() => {
    // Desabilita o warning específico
    LogBox.ignoreLogs(['Function components cannot be given refs.']); // Adiciona o texto do warning a ser ignorado
  }, []);

  const toastConfig = {
    success: ({ text1, text2 }) => (
      <View style={{
        flexDirection: 'row',
        height: 60,
        width: '90%',
        backgroundColor: 'white', // Fundo branco
        borderRadius: 10,
        borderLeftWidth: 5,
        borderLeftColor: 'green', // Faixa verde à esquerda
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
      }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'green' }}>{text1}</Text>
          <Text style={{ fontSize: 14, color: 'black' }}>{text2}</Text>
        </View>
      </View>
    ),
    error: ({ text1, text2 }) => (
      <View style={{
        flexDirection: 'row',
        height: 60,
        width: '90%',
        backgroundColor: 'white', // Fundo branco
        borderRadius: 10,
        borderLeftWidth: 5,
        borderLeftColor: 'red', // Faixa vermelha à esquerda
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
      }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red' }}>{text1}</Text>
          <Text style={{ fontSize: 14, color: 'black' }}>{text2}</Text>
        </View>
      </View>
    ),
    info: ({ text1, text2 }) => (
      <View style={{
        flexDirection: 'row',
        height: 60,
        width: '90%',
        backgroundColor: 'white', // Fundo branco
        borderRadius: 10,
        borderLeftWidth: 5,
        borderLeftColor: 'blue', // Faixa azul à esquerda
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
      }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'blue' }}>{text1}</Text>
          <Text style={{ fontSize: 14, color: 'black' }}>{text2}</Text>
        </View>
      </View>
    ),
  };

  return (
    <View style={{ flex: 1 }}>
      <AppNavigator/>
      <Toast ref={(ref) => Toast.setRef(ref)} config={toastConfig}/>
    </View>
);
};

export default App;
