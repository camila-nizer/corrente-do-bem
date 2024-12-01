import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList , TouchableOpacity, Modal, Clipboard, Linking, Alert, LogBox, ScrollView} from 'react-native';
import OngFilterByRamo from '../../components/OngSearchByRamo';
import OngSearchInput from '../../components/OngSearchInput';
import GradientBackground from '../../components/GradientBackground';
import MultiSelectComponent from '../../components/OngTeste';
import DropdownComponent from '../../components/OngTesteNome';
import Icon from 'react-native-vector-icons/FontAwesome';


const SearchOngsScreen = () => {
  const [filteredOngsbyRamo, setFilteredOngsByRamo] = useState([]);
  const [filteredOngbyName, setFilteredOngByName] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const filtersApplied =
    filteredOngsbyRamo.length > 0 || filteredOngbyName.length > 0;

  // Desabilita o warning específico
  LogBox.ignoreLogs([
    "Clipboard has been extracted from react-native core and will be removed in a future release.",
    "RNCClipboard"
  ]);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert("Copiado!", "O texto foi copiado para a área de transferência.");
  };
  const openLink = async (url) => {
    if (!url){
      Alert.alert("Erro", "Não foi possível abrir o link.");
      return;
    }
    const supported = Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert("Erro", "Não foi possível abrir o link.");
    }
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const copyFormattedData = (data) => {
    if (!data) return;

    const formatField = (label, value) =>
      `${label}: ${Array.isArray(value) ? value.join(', ') : value || 'Não disponível'}`;

    const formattedData = `
      Nome: ${data.nome}
      CNPJ: ${data.cnpj}
      Ramo: ${data.ramo.join(', ')}
      Telefones: ${data.telefone?.join(', ') || 'Não disponível'}
      Email: ${data.email}
      Endereço:
      ${
        data.endereco?.length > 0
          ? data.endereco
              .map(
                (endereco) => `
        - Rua: ${endereco.rua || 'Não disponível'}
        - Número: ${endereco.numero || 'Não disponível'}
        - Bairro: ${endereco.bairro || 'Não disponível'}
        - Cidade: ${endereco.cidade || 'Não disponível'}
        - Estado: ${endereco.estado || 'Não disponível'}
        - Link do Google Maps: ${endereco.linkMaps || 'Não disponível'}
        `
              )
              .join('\n')
          : 'Não disponível'
      }
      Dados Bancários:
      ${
        data.dadosBancarios?.length > 0
          ? data.dadosBancarios
              .map(
                (conta) => `
      - Banco: ${conta.banco}
      - Agência: ${conta.agencia}
      - Conta: ${conta.conta}
      - Tipo de conta: ${conta.tipodeConta}
      - Pix: ${conta.pix || 'Não disponível'}`
              )
              .join('\n')
          : 'Não disponível'
      }
      Redes Sociais:
      - Instagram: ${data.instagram}
      - Site: ${data.site}
    `.trim();

    Clipboard.setString(formattedData);
    Alert.alert('Copiado!', 'Os dados foram copiados para a área de transferência.');
  };

  // Combina as listas e remove duplicatas com base no `cnpj`
  const combinedData = [
    ...filteredOngsbyRamo,
    ...filteredOngbyName.filter(
      (ongByName) => !filteredOngsbyRamo.some((ongByRamo) => ongByRamo.cnpj === ongByName.cnpj)
    ),
  ];

  return (
    <GradientBackground>
    <View style={styles.container}>
      <MultiSelectComponent onFilterChange={setFilteredOngsByRamo} />
      <DropdownComponent onFilterChange={setFilteredOngByName} />


      {combinedData && combinedData.length > 0 ? (
          <FlatList
            data={combinedData}
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
        ) : (
          // Exibe a mensagem "Nenhum resultado encontrado" somente se filtros foram aplicados
          filtersApplied && (
            <Text style={styles.emptyText}>Nenhum resultado encontrado.</Text>
          )
        )}
      

      {/* {filteredOngsbyRamo && filteredOngsbyRamo.length > 0 && (
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
      )} */}

      
      {/* {filteredOngbyName && filteredOngbyName.length > 0 && (
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
      )} */}

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
            {selectedItem && (
            <>
              <View style={styles.rowInicial}>
                <Text style={styles.modalTitleInicial}>{selectedItem.nome}</Text>
                <Text style={styles.closeText} onPress={closeModal}>Fechar</Text>
              </View>

              <ScrollView contentContainerStyle={styles.scrollViewContainer}>

                <View style={styles.row}>
                  <Text style={styles.modalText}>
                    <Text style={styles.modalLabel}>CNPJ:</Text> {selectedItem.cnpj}
                  </Text>
                  <TouchableOpacity
                    onPress={() => copyToClipboard(selectedItem.cnpj)}
                  >
                    <Icon name="clipboard" size={18} color="#91A261" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalText}>
                  <Text style={styles.modalLabel}>Ramo:</Text> {selectedItem.ramo.join(', ')}
                </Text>

                {/* Telefones */}
                <Text style={styles.modalText}>
                  <Text style={styles.modalLabel}>Telefones:</Text>
                </Text>
                {selectedItem.telefone?.length > 0 ? (
                  selectedItem.telefone.map((numero, index) => (
                    <View key={index} style={styles.phoneContainer}>
                      <Text style={styles.modalText}>{numero}</Text>
                      <TouchableOpacity
                        onPress={() => copyToClipboard(numero)}
                      >
                        <Icon name="clipboard" size={18} color="#91A261" />
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <Text style={styles.modalText}>Não disponível</Text>
                )}

                  {/* Email */}
                <View style={styles.row}>
                  <Text style={styles.modalText}>
                    <Text style={styles.modalLabel}>Email:</Text> {selectedItem.email}
                  </Text>
                  <TouchableOpacity
                    onPress={() => copyToClipboard(selectedItem.email)}
                  >
                    <Icon name="clipboard" size={18} color="#91A261" />
                  </TouchableOpacity>
                </View>

                {/* Endereço */}
                <Text style={styles.modalText}>
                  <Text style={styles.modalLabel}>Endereço:</Text>
                </Text>
                {/* Iterando sobre o array de endereço */}
                {selectedItem.endereco.length > 0 ? (
                  selectedItem.endereco.map((endereco, index) => (
                    <View key={index} style={styles.bankDetails}>
                      <View style={styles.row}>
                        <Text style={styles.modalText}>
                          <Text style={styles.modalLabel}>Rua:</Text> {endereco.rua}
                        </Text>
                        <TouchableOpacity onPress={() => copyToClipboard(endereco.rua)}>
                          <Icon name="clipboard" size={18} color="#91A261" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.row}>
                        <Text style={styles.modalText}>
                          <Text style={styles.modalLabel}>Número:</Text> {endereco.numero}
                        </Text>
                        <TouchableOpacity onPress={() => copyToClipboard(endereco.numero)}>
                          <Icon name="clipboard" size={18} color="#91A261" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.row}>
                        <Text style={styles.modalText}>
                          <Text style={styles.modalLabel}>Bairro:</Text> {endereco.bairro}
                        </Text>
                        <TouchableOpacity onPress={() => copyToClipboard(endereco.bairro)}>
                          <Icon name="clipboard" size={18} color="#91A261" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.row}>
                        <Text style={styles.modalText}>
                          <Text style={styles.modalLabel}>Cidade:</Text> {endereco.cidade}
                        </Text>
                        <TouchableOpacity onPress={() => copyToClipboard(endereco.cidade)}>
                          <Icon name="clipboard" size={18} color="#91A261" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.row}>
                        <Text style={styles.modalText}>
                          <Text style={styles.modalLabel}>Estado:</Text> {endereco.estado}
                        </Text>
                        <TouchableOpacity onPress={() => copyToClipboard(endereco.estado)}>
                          <Icon name="clipboard" size={18} color="#91A261" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={styles.modalText}>Endereço não disponível</Text>
                )}


                {/* Dados Bancários */}
                <Text style={styles.modalText}>
                  <Text style={styles.modalLabel}>Dados Bancários:</Text>
                </Text>
                {selectedItem.dadosBancarios?.length > 0 ? (
                  selectedItem.dadosBancarios.map((conta, index) => (
                    <View key={index} style={styles.bankDetails}>
                      <View style={styles.row}>
                        <Text style={styles.modalText}>
                          <Text style={styles.modalLabel}>Banco:</Text> {conta.banco}
                        </Text>
                        <TouchableOpacity onPress={() => copyToClipboard(conta.banco)}>
                          <Icon name="clipboard" size={18} color="#91A261" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.row}>
                        <Text style={styles.modalText}>
                          <Text style={styles.modalLabel}>Agência:</Text> {conta.agencia}
                        </Text>
                        <TouchableOpacity onPress={() => copyToClipboard(conta.agencia)}>
                          <Icon name="clipboard" size={18} color="#91A261" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.row}>
                        <Text style={styles.modalText}>
                          <Text style={styles.modalLabel}>Conta:</Text> {conta.conta}
                        </Text>
                        <TouchableOpacity onPress={() => copyToClipboard(conta.conta)}>
                          <Icon name="clipboard" size={18} color="#91A261" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.row}>
                        <Text style={styles.modalText}>
                          <Text style={styles.modalLabel}>Tipo de Conta:</Text> {conta.tipodeConta}
                        </Text>
                        <TouchableOpacity onPress={() => copyToClipboard(conta.tipodeConta)}>
                          <Icon name="clipboard" size={18} color="#91A261" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.row}>
                        <Text style={styles.modalText}>
                          <Text style={styles.modalLabel}>Pix:</Text> {conta.pix || 'Não disponível'}
                        </Text>
                        <TouchableOpacity onPress={() => copyToClipboard(conta.pix || 'Não disponível')}>
                          <Icon name="clipboard" size={18} color="#91A261" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={styles.modalText}>Não disponível</Text>
                )}

                {/* Links lado a lado */}
                <View style={styles.linksContainer}>
                  <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() => openLink(selectedItem.endereco[0].linkMaps)}
                  >
                    <Icon name="map-marker" size={18} color="#FFF" />
                    <Text style={styles.linkButtonText}> Google Maps</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() => openLink(selectedItem.instagram)}
                  >
                    <Icon name="instagram" size={18} color="#FFF" />
                    <Text style={styles.linkButtonText}> Instagram</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() => openLink(selectedItem.site)}
                  >
                    <Icon name="globe" size={18} color="#FFF" />
                    <Text style={styles.linkButtonText}> Site</Text>
                  </TouchableOpacity>
                </View>

                {/* Outros links com o estilo original */}
                <TouchableOpacity
                  style={styles.clipboardButton}
                  onPress={() => copyFormattedData(selectedItem)}
                >
                  <View style={styles.linksContainer}>
                    <Icon name="clipboard" size={18} color="#FFF" />
                    <Text style={styles.clipboardButtonText}> Copiar todos os dados</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={closeModal}
                >
                  <Text style={styles.modalButtonText}>Fechar</Text>
                </TouchableOpacity>
              </ScrollView>

            </>
            )}
            
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
  scrollViewContainer: {
    paddingBottom: 20,
  },
  dropdownHeader: {
    backgroundColor: '#91A261',
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
  modalContainer: {
    flex: 1,
    justifyContent:'flex-start',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    alignItems: 'justify',
    marginTop:'30%'
    // maxHeight: '80%',
    // marginTop: '20%',
    // marginBottom: 0,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',
    marginBottom: 14,
  },
  modalTitleInicial: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign:'center',
    marginBottom: 14,
    color:'#2C5321',
    flex: 1,
  },
  closeText: {
    textDecorationLine: 'underline', // Faz o texto ser sublinhado
    color: '#2C5321', // Pode mudar para qualquer cor desejada
    // marginLeft: 10, // Espaço entre o título e o "Fechar"
    fontSize: 16,
    marginBottom: 14,
    textAlign: 'right',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  modalLabel: {
    fontWeight: 'bold',
    fontSize:19,
  },
  modalButton: {
    marginTop: 16,
    backgroundColor: '#2C5321',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom:30,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:"center"
  },
  phoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
    width: '100%',
  },
  copyButton: {
    backgroundColor: '#2C5321',
    padding: 8,
    borderRadius: 8,
  },
  copyButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bankDetails: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 8,
    padding: 10,
    width: '100%',
  },
  // linkButton: {
  //   marginTop: 10,
  //   padding: 10,
  //   backgroundColor: '#4CAF50',
  //   borderRadius: 8,
  //   alignItems: 'center',
  //   width: '100%',
  // },
  clipboardButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2C5321',
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  clipboardButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row', // Faz o layout em linha, ou seja, ao lado
    justifyContent: 'space-between', // Espaça os itens
    alignItems: 'center', // Alinha verticalmente
    marginBottom: 8, // Espaço entre os itens
    width:'100%',
  },
  rowInicial: {
    flexDirection: 'row', // Faz o layout em linha, ou seja, ao lado
    // justifyContent: 'space-between', // Espaça os itens
    alignItems: 'center', // Alinha verticalmente
    marginBottom: 8, // Espaço entre os itens
    width:'100%',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10, // opcional, ajusta o espaçamento entre os links e o próximo elemento
  },
  linkButton: {
    alignItems: 'center',
    backgroundColor: '#2C5321', // cor do botão
    padding: 10,
    borderRadius: 5,
    marginRight: 10, // espaçamento entre os botões
    minWidth:'30%',
  },
  linkButtonText: {
    color: '#FFF',
    marginLeft: 5,
    textAlign:'center',
    // fontWeight: 'bold',
    fontSize: 16, // espaço entre o ícone e o texto
  },
});