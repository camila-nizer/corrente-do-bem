import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { Checkbox } from 'react-native-paper';

const ramos = ['Saúde', 'Educação', 'Meio Ambiente', 'Assistência Social'];

const OngFilterByRamo = () => {
    const [ongs, setOngs] = useState([]);
    const [selectedRamos, setSelectedRamos] = useState([]);
    const [filteredOngs, setFilteredOngs] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    // Função para carregar os dados do JSON
    const ongsLoading = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3000/ongs'); 
            const data = await response.json();
            setOngs(data);
        } catch (error) {
            console.error('Erro ao carregar ONGs:', error);
        }
    };

    // Função para filtrar ONGs com base nos ramos selecionados
    const filtrarOngs = () => {
        if (selectedRamos.length === 0) {
            setFilteredOngs(ongs); // Mostra todas as ONGs se nenhum ramo estiver selecionado
        } else {
            const resultados = ongs.filter(ong =>
                selectedRamos.some(ramo => ong.ramo.includes(ramo))
            );
            setFilteredOngs(resultados);
        }
    };

    useEffect(() => {
        ongsLoading(); // Carrega os dados ao montar o componente
    }, []);

    useEffect(() => {
        filtrarOngs(); // Filtra ONGs sempre que selectedRamos muda
    }, [selectedRamos, ongs]);

    const toggleRamo = (ramo) => {
        if (selectedRamos.includes(ramo)) {
            setSelectedRamos(selectedRamos.filter(r => r !== ramo));
        } else {
            setSelectedRamos([...selectedRamos, ramo]);
        }
    };

    const clearSelections = () => {
        setSelectedRamos([]);
    };

    const renderRamoOptions = () => (
        ramos.map(ramo => (
            <TouchableOpacity key={ramo} style={styles.option} onPress={() => toggleRamo(ramo)}>
                <Checkbox
                    status={selectedRamos.includes(ramo) ? 'checked' : 'unchecked'}
                    color="green" // Define a cor do checkbox marcado como verde
                />
                <Text>{ramo}</Text>
            </TouchableOpacity>
        ))
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdown}>
                <Text style={styles.dropdownText}>
                    {selectedRamos.length > 0 ? `Selecionado: ${selectedRamos.join(', ')}` : 'Selecione o Ramo'}
                </Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.header}>
                            <Text style={styles.modalTitle}>Selecione os Ramo(s):</Text>
                            <TouchableOpacity onPress={clearSelections}>
                                <Text style={styles.clearTextStyle}>Limpar Seleções</Text>
                            </TouchableOpacity>
                        </View>
                        {renderRamoOptions()}
                        <View style={styles.buttonContainer}>
                            <Button title="Aplicar" onPress={() => setModalVisible(false)} />
                            <Button title="Fechar" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
            <FlatList
                data={filteredOngs}
                keyExtractor={(item) => item.cnpj} // Use uma chave única
                renderItem={({ item }) => (
                    <View style={styles.resultado}>
                        <Text>{item.nome}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text>Nenhuma ONG encontrada para os ramos selecionados.</Text>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    clearTextStyle: {
        color: 'blue',
        textDecorationLine: 'underline',
        fontSize: 16,
    },
    dropdown: {
        padding: 16,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginBottom: 10,
    },
    dropdownText: {
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    resultado: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});

export default OngFilterByRamo;
