import React, { useState } from 'react';
import { Dimensions, View, Text,StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, { useSharedValue } from "react-native-reanimated";
import GradientBackground from '../../components/GradientBackground';
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../../../assets/doacao_alimentos.jpg';
import img2 from '../../../assets/doacao_de_cabelo_interna.png';
import img3 from'../../../assets/fmp_campanha_agasalho.jpg';
import img4 from'../../../assets/hemosc.png';
import img5 from'../../../assets/pet.jpg';

const { width, height } = Dimensions.get('window');

const carrouselHeight = 350

const styles = StyleSheet.create({
    imageContainer: {
      width: '100%',
      height: '100%',
      borderWidth: 2,
      borderColor: '#91A261',
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
    image: {
      resizeMode: 'cover', //'contain',
      width: '100%',
      height: '100%',
      borderRadius: 20,
    },
    heartContainer: {
      marginTop: (height / 2) + 100,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    title: {
      fontSize: 44,
      fontWeight: '500',
      // marginBottom: 100,
      textAlign:'center',
      color:'white',
      fontStyle: 'italic',     
    },
    containerTitle:{
      backgroundColor: '#2c5321', // Fundo verde
      borderBottomRightRadius: 130, // Arredondar canto inferior direito
      overflow: 'hidden',
      width: width, // Ocupa a largura total
      height: height/2.5, // Ajuste a altura para o valor desejado
      justifyContent: 'center', // Centraliza o conteúdo verticalmente
      alignItems: 'center',
      paddingBottom: 10,
      marginBottom: 10,
      position: 'absolute',
      top: 0, // Alinha ao topo da tela
      left: 0,
      right: 0,
  },
  });

    const images = [
        { id: '1', image: img1 },
        { id: '2', image: img2 },
        { id: '3', image: img3 },
        { id: '4', image: img4 },
        { id: '5', image: img5 },
    ];

const HomeScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const offsetX = useSharedValue(0);

    return (
        <GradientBackground >
            <View>
              
              <View style={styles.containerTitle}>
                <Text style={styles.title}>Corrente do bem</Text>
              </View>
              <Carousel
                  loop
                  // autoPlay
                  // autoPlayInterval={3000.0}
                  style={{
                    marginTop: (height / 2) - 250.0,
                  }}
                  mode="parallax"
                  width={width}
                  height={carrouselHeight}
                  data={images}
                  onScroll={event => {
                    offsetX.value = event.contentOffset.x;
                  }}
                  onSnapToItem={index => setCurrentIndex(index)} // Atualiza o índice atual
                  renderItem={({ item, index }) => {
                     return (
                        <View style={styles.imageContainer}>
                          <Animated.Image
                              source={item.image}
                              style={[styles.image]}
                          />
                        </View>
                    );
                  }}
              />

              <View style={styles.heartContainer}>
                {images.map((_, index) => (
                  <Icon
                    key={index}
                    name={currentIndex === index ? 'heart-sharp' : 'heart-sharp'}
                    size={currentIndex === index ? 28 : 20} // Ajusta o tamanho conforme selecionado
                    color={currentIndex === index ? '#2c5321' : '#91A261'} // Cor do coração
                    //style={styles.dotsContainer}
                    style={{ margin: 4 }} // Espaçamento entre os ícones
                  />
                ))}
              </View>

              <View style={styles.buttomhelpcontainer}>
              </View>
            </View>
            
        </GradientBackground>
      );
};

  export default HomeScreen;