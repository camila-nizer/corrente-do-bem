import * as React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GradientBackground from '../../components/GradientBackground';
// import TabNavigator from '../../navigation/TabNavigator';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <GradientBackground>
      <View style={styles.container}>

        <View style={styles.topContainer}>
          <Pressable style={styles.button} onPress={() => navigation.navigate('LoginScreen', { userType: 'ONG' })}>
            <Text style={styles.text}>{title= "Login Donatário"}</Text>
          </Pressable>
        </View>

        <View style={styles.adminContainer}>
          <Pressable style={styles.button} onPress={() => navigation.navigate('LoginScreen', { userType: 'Admin' })}>
              <Text style={styles.text}>{title= "Login Admin"}</Text>
          </Pressable>
        </View>

      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 30,
    margin: 15,
    backgroundColor: '#2c5321',
    width: '60%',
  },
  text: {
    fontSize: 24,
    fontWeight: '500',
    letterSpacing: 0.25,
    textAlign:'center',
    color: 'white',
  },
  topContainer: {
    flex: 1, // Ocupa o espaço restante acima do adminContainer
    justifyContent: 'center', // Centraliza verticalmente
    width: width, // Para garantir que ocupe toda a largura
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
  },
  adminContainer: {
    backgroundColor: '#7F8E71', // Fundo verde
    borderTopRightRadius: 130, // Arredondar canto superior esquerdo
    overflow: 'hidden',
    width: width, // Ocupa a largura total
    height: height/2,
    flex: 1, // Faz o container ocupar o espaço restante
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    // marginTop: '50%', // Move para o final do container pai
  }
});

export default LoginScreen;