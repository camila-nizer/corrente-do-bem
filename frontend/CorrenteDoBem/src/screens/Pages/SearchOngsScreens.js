import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList , TouchableOpacity, Modal} from 'react-native';
import OngFilterByRamo from '../../components/OngSearchByRamo';
import OngSearchInput from '../../components/OngSearchInput';
import GradientBackground from '../../components/GradientBackground';
import MultiSelectComponent from '../../components/OngTeste';
import DropdownComponent from '../../components/OngTesteNome';

const SearchOngsScreen = () => {
  const [filteredOngsbyRamo, setFilteredOngsByRamo] = useState([]);
  const [filteredOngbyName, setFilteredOngByName] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <GradientBackground>
    <View style={styles.container}>
      <MultiSelectComponent onFilterChange={setFilteredOngsByRamo} />
      <DropdownComponent onFilterChange={setFilteredOngByName} />
      

      {filteredOngsbyRamo && filteredOngsbyRamo.length > 0 && (
        <View>
            <FlatList
              data={filteredOngsbyRamo}
              keyExtractor={(item) => item.cnpj}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => openModal(item)}
                >
                  <Text style={styles.dropdownText}>{item.nome}</Text>
                </TouchableOpacity>
              )}
            />
        </View>
      )}

      
      {filteredOngbyName && filteredOngbyName.length > 0 && (
        <View>
          <FlatList
            data={filteredOngbyName}
            keyExtractor={(item) => item.cnpj}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => openModal(item)}
              >
                <Text style={styles.dropdownText}>{item.nome}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Modal para exibir detalhes completos */}
      {selectedItem && (
        <Modal
          transparent
          animationType="slide"
          visible={!!selectedItem}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedItem.nome}</Text>
              <Text style={styles.modalText}>
                <Text style={styles.modalLabel}>CNPJ:</Text> {selectedItem.cnpj}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.modalLabel}>Ramo:</Text>{' '}
                {selectedItem.ramo.join(', ')}
              </Text>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>

      {/* <View>
      <OngSearchInput/>
      </View>

      <View>
        <MultiSelectComponent/>
      </View> */}
    </GradientBackground>
  );
};

export default SearchOngsScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dropdownHeader: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  dropdownHeaderText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dropdownItem: {
    padding: 12,
    backgroundColor: '#EAEAEA',
    borderRadius: 8,
    marginVertical: 4,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  item: {
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginVertical: 4,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  modalLabel: {
    fontWeight: 'bold',
  },
  modalButton: {
    marginTop: 16,
    backgroundColor: '#91A261',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});