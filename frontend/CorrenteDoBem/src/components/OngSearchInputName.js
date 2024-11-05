import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert } from 'react-native';
// import ongsjson from'../../ongs.json';

const OngSearchInput = () => {
    const [ongs, setOngs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOngs, setFilteredOngs] = useState([]);

    // Função para carregar os dados do JSON
    const ongsLoading = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3000/ongs'); 
            const data = await response.json();
            setOngs(data);
        } catch (error) {
            console.log('caindo no CATCHHHHH');
            Alert.alert('Erro', 'Não foi possível carregar as ONGs.');
            console.error(error);
        }
    };

    // Função para filtrar as ONGs com base no termo de busca
    const ongsFilters = (term) => {
        if (term) {
            const resultados = ongs.filter(ong =>
                ong.nome.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredOngs(resultados);
        } else {
            setFilteredOngs([]);
        }
    };

    useEffect(() => {
        ongsLoading();
    }, []);

    useEffect(() => {
        ongsFilters(searchTerm);
    }, [searchTerm]);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Icon name="search" size={30} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Busca por nome"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    // placeholderTextColor={'#0000'}
                    size={18}
                />
            </View>
            <FlatList
                data={filteredOngs}
                keyExtractor={(item) => item.cnpj} // CNPJ é chave única
                renderItem={({ item }) => (
                    <View style={styles.result}>
                        <Text>{item.nome}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text>Nenhum encontrado</Text>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#lightgray',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
    },
    icon: {
        marginRight: 8,
        color:'#000000',
    },
    result: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default OngSearchInput;
