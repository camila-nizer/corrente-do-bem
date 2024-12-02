import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Toast from 'react-native-toast-message';


const DropdownComponent = ({onFilterChange, setFilteredOngbyName}) => {
  const [itemSelected, setItemSelected] = useState(null);
  const [data, setData] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

   // Função para carregar os dados do JSON
   const ongsLoading = async () => {
    try {
        const response = await fetch('http://10.0.2.2:3000/ongs'); 
        const respData = await response.json();
        
        const formattedData = respData.map(ong => ({
          label: ong.nome,
          value: ong.nome,
          ...ong, // Inclui todos os outros campos do objeto ONG
        }));
  
        setData(formattedData);

    } catch (error) {
      console.log('Erro ao carregar ONGs:', error);
      setFilteredOngbyName(true);
      setHaveDataOngByName(false);
      Toast.show({
        type: 'error',  // Tipo de toast
        position: 'bottom',  // Posição do toast
        text1: 'Erro',  // Título do toast
        text2: 'Não foi possível carregar as ONGs.',  // Texto do toast
        visibilityTime: 3000,  // Tempo de visibilidade
        autoHide: true,  // Auto-hide após o tempo especificado
        bottomOffset: 40,  // Distância da parte inferior da tela
      });   
    }
    };

    useEffect(() => {
        ongsLoading(); // Carrega os dados ao montar o componente
    }, []);
  
    const handleChange = (item) => {
      if (item?.value === itemSelected?.value) {
        setItemSelected(null);
        onFilterChange(null); // Envia null ao deselecionar
        setHaveDataOngByName(false);
      } else {
        setItemSelected(item);
        onFilterChange([item]); // Envia o item completo selecionado
      }
    };


  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Pesquisa por nome' : '...'}
        searchPlaceholder="Search..."
        value={itemSelected}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleChange}
        renderRightIcon={() => (
          itemSelected ? (
            <AntDesign
              style={styles.icon}
              color="#F6725C"
              name="closecircle"
              size={20}
              onPress={() => {
                setItemSelected(null); // Redefine o valor para null
                onFilterChange([]); // Atualiza o valor no pai
              }}
            />
          ) : null
        )}
        
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderRadius: 12,
    paddingHorizontal: 8,

  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});