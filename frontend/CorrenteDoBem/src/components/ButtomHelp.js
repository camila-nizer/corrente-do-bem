import React from 'react';
import { View , StyleSheet ,Pressable,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ButtomHelp = () => {
    const navigation = useNavigation();
    const styles = StyleSheet.create({
        button: {
          backgroundColor: 'transparent', // Sem fundo
          // borderBottomWidth: 1, // Adiciona uma borda inferior
          // borderBottomColor: 'black', // Cor da borda
          padding: 10,
        },
        text: {
          textDecorationLine: 'underline', // Sublinha o texto
          color: 'black', // Cor do texto
          fontSize: 16,
        },
        container: {
          position: 'absolute',
          bottom: 20, // Ajusta a distância do fundo
          left: 0,
          right: 0,
          alignItems: 'center', // Centraliza o botão horizontalmente
        },
      });
    
      return (
        <View style={styles.container}>
            <Pressable style={styles.button}onPress={() => navigation.navigate('HelpScreen')}>
                <Text style={styles.text}>{title= "Precisa de ajuda? Clique aqui."}</Text>
            </Pressable>
        </View>
    
      );
};

export default ButtomHelp;