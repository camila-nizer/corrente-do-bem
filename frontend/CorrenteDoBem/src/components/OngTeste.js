import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';


const MultiSelectComponent = ({ onFilterChange }) => {

  const data = [
    { label: 'Saúde', value: 'Saúde' },
    { label: 'Educação', value: 'Educação' },
    { label: 'Sangue/Plaquetas/Medula', value: 'Sangue/Plaquetas/Medula' },
    { label: 'Roupas/Calçados Adulto', value: 'Roupas/Calçados Adulto' },
    { label: 'Roupas/Calçados Infantil', value: 'Roupas/Calçados Infantil' },
    { label: 'Alimentos', value: 'Alimentos' },
    { label: 'Assistência para animais', value: 'Assistência para animais' },
    { label: 'Cabelo', value: 'Cabelo' },
  ];
  const [selected, setSelected] = useState([]);
  const [ongs, setOngs] = useState([]);
  // const [selectedRamos, setSelectedRamos] = useState([]);
  const [filteredOngs, setFilteredOngs] = useState([]);

    // Função para carregar os dados do JSON
    const ongsLoading = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3000/ongs'); 
            const dataResp = await response.json();
            setOngs(dataResp);
        } catch (error) {
            console.error('Erro ao carregar ONGs:', error);
        }
    };

    // Função para filtrar ONGs com base nos ramos selecionados
    const filtrarOngs = (selectedRamos) => {
        if (selectedRamos && selectedRamos.length > 0) {
          const resultados = ongs.filter(ong =>
            selectedRamos.some(ramo => ong.ramo.includes(ramo))
          );
          setFilteredOngs(resultados);
          // Passa os resultados para o componente pai
          if (onFilterChange) {
            onFilterChange(resultados);
          }
        }else{
          setFilteredOngs([]);
          // Passa os resultados para o componente pai
          if (onFilterChange) {
            onFilterChange([]);
          }
        }
    };

    useEffect(() => {
      ongsLoading(); // Carrega os dados ao montar o componente
    }, []);

    useEffect(() => {
      filtrarOngs(selected); // Filtra ONGs sempre que selectedRamos muda
    }, [selected]);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        <AntDesign style={styles.icon} color="#2c5321" name="Safety" size={20} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Selecionar ramo"
        value={selected}
        search
        searchPlaceholder="Pesquisa por ramo..."
        onChange={item => {
          console.log('AQUIIIIIIIIIIII ',item);
          setSelected(item);
        }}
        renderRightIcon={() => (
          <AntDesign
            style={styles.icon}
            // color={selected? "blue": "black"}
            color="#2c5321"
            name="Safety"
            size={20}
          />
        )}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Text style={styles.textSelectedStyle}>{item.label}</Text>
              <AntDesign color="black" name="delete" size={17} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
  container: { padding: 16, marginTop: 16},
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
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
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});