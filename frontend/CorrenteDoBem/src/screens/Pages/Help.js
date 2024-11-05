import React, { useState } from 'react';
import { View, Text, TouchableOpacity , StyleSheet, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GradientBackground from '../../components/GradientBackground';
import { MaterialIcons } from '@expo/vector-icons';


const { width, height } = Dimensions.get('window');

const HelpScreen = () => {
  const navigation = useNavigation();

  const [questions, setQuestions] = useState([
    { question: 'O que é donatário?', answer: 'Donatário é aquele que recebe a doação.', isOpened: false },
    { question: 'Posso ser donatário sendo pessoa fisica?', answer: 'Não. Apenas pessoas jurídicas podem se cadastrar.', isOpened: false },
    { question: 'Posso realizar doações pelo aplicativo?', answer: 'Ainda não. Estamos trabalhando nesta atualização :)', isOpened: false },
  ]);
  const toggleAnswer = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].isOpened = !newQuestions[index].isOpened;
    setQuestions(newQuestions);
  };

  return (
    <GradientBackground>
        <View style={styles.container}>
            <View style={styles.containerTitle}>
              <Text style={styles.title}>Perguntas Frequentes</Text>
              <Text style={styles.subtitle}>Este aplicativo busca divulgar as pessoas jurídicas que recebem doações sociais e campanhas de doações.</Text>
            </View>

            <View style={styles.questionView}>
              {questions.map((question, index) => (
              <View key={index} style={styles.questionContainer}>
                  <TouchableOpacity onPress={() => toggleAnswer(index)} style={styles.questionHeader}>
                  <Text style={styles.questionText}>{question.question}</Text>
                  <MaterialIcons name={question.isOpened ? 'keyboard-arrow-down' : 'keyboard-arrow-right'} size={24} />
                  </TouchableOpacity>
                  {question.isOpened && <Text style={styles.answer}>{question.answer}</Text>}
              </View>
              ))}
            </View>
        </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 10,
      flex: 1,
    },
    containerTitle:{
      backgroundColor: '#2c5321', // Fundo verde
      borderBottomRightRadius: 130, // Arredondar canto superior direito
      // borderBottomLeftRadius: 50, // Arredondar canto superior esquerdo
      overflow: 'hidden',
      width: width, // Ocupa a largura total
      height: height/3, // Ajuste a altura para o valor desejado
      justifyContent: 'center', // Centraliza o conteúdo verticalmente
      alignItems: 'center',
      paddingBottom: 10,
      marginBottom: 10,
      position: 'absolute',
      top: 0, // Alinha ao topo da tela
      left: 0,
      right: 0,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      marginBottom: 30,
      color: '#ffffff',
      textAlign: 'center', 
    },
    subtitle: {
      fontSize: 18,
      marginBottom: 30,
      marginHorizontal:10,
      padding:5,
      color: 'white',
      textAlign:'justify',
      fontStyle: 'italic',      
    },
    questionView:{
      marginTop: height / 3 + 20,
    },
    questionContainer: {
      marginBottom: 30,
      marginTop:20,
      borderWidth: 2,
      borderColor: 'gray',
      padding: 10,
      alignItems: 'justify',
      minHeight: 50,
      minWidth: 420, 
      borderRadius: 15,
      backgroundColor: '#91A261',  
    },
    questionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    questionText: {
      fontSize: 20,
      color: 'black',
      alignItems: 'center',
    },
    answer: {
      fontSize: 20,
      marginTop: 10,
      color: 'black',
      padding:20,
    },
  });

export default HelpScreen;