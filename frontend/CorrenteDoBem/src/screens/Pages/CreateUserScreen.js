import React, { useState } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Dialog, Button as PaperButton, Checkbox, Switch } from 'react-native-paper'; // Importando Dialog e Checkbox
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { register } from '../../../src/api/authApi';
import { useNavigation } from '@react-navigation/native';

// Validação com yup
const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
  name: yup.string().required('Nome é obrigatório'),
  cnpj: yup.string().required('CNPJ é obrigatório'),
  industry: yup.array().min(1, 'Selecione pelo menos uma indústria').required('Indústria é obrigatória'),
});

const CreateUserScreen = () => {
  const [hasBankDetails, setHasBankDetails] = useState(true);
  const [noNumber, setNoNumber] = useState(false); // Estado para "Sem Número (S/N)"
  const [visible, setVisible] = useState(false); // Controla o estado do Dialog
  const [selectedIndustries, setSelectedIndustries] = useState([]); // Indústrias selecionadas
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    setValue, // Permite definir valores de campos no formulário
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      cnpj: '',
      industry: [],
      address: {
        street: '',
        number: '',
        neighborhood: '',
        city: 'Palhoça',
        state: 'Santa Catarina',
        cep: '',
        googleMapsLink: '',
      },
      bankDetails: {
        bank: '',
        agency: '',
        accountNumber: '',
        pixKey: '',
      },
    },
  });

  const industryOptions = [
    { label: 'Alimentos', value: 'alimentos' },
    { label: 'Roupas/Sapatos Adulto', value: 'roupas_sapatos_adulto' },
    { label: 'Roupas/Sapatos Infantis', value: 'roupas_sapatos_infantil' },
    { label: 'Cabelo', value: 'cabelo' },
    { label: 'Sangue/Plasma/Medula', value: 'sangue_plasma_medula' },
    { label: 'Alimentos e Itens para Animais', value: 'alimentos_animais' },
  ];

  const handleCreateUser = async (data) => {
    try {
      const response = await register(data);
      if (response.status === 200) {
        Alert.alert('Cadastro Criado!', 'Cadastro criado com sucesso.', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao criar a conta.', [{ text: 'OK' }]);
      }
    } catch (err) {
      Alert.alert('Erro', 'Tente novamente mais tarde.', [{ text: 'OK' }]);
    }
  };

  const handleIndustrySelect = (industry) => {
    setSelectedIndustries((prev) => {
      if (prev.includes(industry)) {
        return prev.filter((item) => item !== industry); // Remove se já estiver selecionada
      }
      return [...prev, industry]; // Adiciona se não estiver selecionada
    });
  };

  const handleNoNumberToggle = () => {
    setNoNumber((prev) => !prev);
    setValue('address.number', !noNumber ? 'S/N' : ''); // Atualiza o valor do campo "número"
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <TextInputField control={control} name="email" placeholder="Email" errors={errors} />
          <TextInputField control={control} name="password" placeholder="Senha" errors={errors} secureTextEntry />
          <TextInputField control={control} name="name" placeholder="Nome" errors={errors} />
          <TextInputField control={control} name="cnpj" placeholder="CNPJ" errors={errors} />

          {/* Indústria: */}
          <Text>Indústria:</Text>
          <View style={{ marginBottom: 10 }}>
            <Button title="Selecionar Indústrias" onPress={() => setVisible(true)} />
            <Text>
              {selectedIndustries.length > 0
                ? `Indústrias Selecionadas: ${selectedIndustries.join(', ')}`
                : 'Nenhuma indústria selecionada'}
            </Text>
          </View>

          {/* Dialog de Indústria */}
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Title>Selecione as Indústrias</Dialog.Title>
            <Dialog.Content>
              {industryOptions.map((option) => (
                <View key={option.value} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <Checkbox
                    status={selectedIndustries.includes(option.value) ? 'checked' : 'unchecked'}
                    onPress={() => handleIndustrySelect(option.value)}
                  />
                  <Text>{option.label}</Text>
                </View>
              ))}
            </Dialog.Content>
            <Dialog.Actions>
              <PaperButton onPress={() => setVisible(false)}>Fechar</PaperButton>
            </Dialog.Actions>
          </Dialog>

          {errors.industry && <Text style={{ color: 'red' }}>{errors.industry.message}</Text>}

          {/* Endereço: */}
          <Text>Endereço:</Text>
          <TextInputField control={control} name="address.street" placeholder="Rua" errors={errors} />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Controller
              control={control}
              name="address.number"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  placeholder="Número"
                  editable={!noNumber}
                  style={{ flex: 1, borderWidth: 1, padding: 8 }}
                />
              )}
            />
            <Switch value={noNumber} onValueChange={handleNoNumberToggle} />
            <Text style={{ marginLeft: 10 }}>Sem Número (S/N)</Text>
          </View>
          {errors.address?.number && <Text style={{ color: 'red' }}>{errors.address.number.message}</Text>}

          <TextInputField control={control} name="address.neighborhood" placeholder="Bairro" errors={errors} />
          <TextInputField control={control} name="address.cep" placeholder="CEP" errors={errors} />
          <TextInputField
            control={control}
            name="address.googleMapsLink"
            placeholder="Link do Google Maps"
            errors={errors}
          />

          {/* Dados Bancários: */}
          <Text>Dados Bancários:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Switch value={!hasBankDetails} onValueChange={() => setHasBankDetails((prev) => !prev)} />
            <Text style={{ marginLeft: 10 }}>Não desejo/tenho informações bancárias</Text>
          </View>
          {['bank', 'agency', 'accountNumber', 'pixKey'].map((field) => (
            <TextInputField
              key={field}
              control={control}
              name={`bankDetails.${field}`}
              placeholder={`Banco: ${field}`}
              errors={errors}
              editable={hasBankDetails} // Desabilita edição se o checkbox estiver marcado
            />
          ))}

          {isSubmitting ? (
            <ActivityIndicator size="large" />
          ) : (
            <Button title="Criar Conta" onPress={handleSubmit(handleCreateUser)} />
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// Componente para o input de texto com controle do react-hook-form
const TextInputField = ({ control, name, placeholder, secureTextEntry, errors }) => (
  <View style={{ marginBottom: 10 }}>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <TextInput
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          style={{
            borderWidth: 1,
            borderColor: errors[name] ? 'red' : '#ccc',
            padding: 10,
            marginBottom: 5,
          }}
        />
      )}
    />
    {errors[name] && <Text style={{ color: 'red' }}>{errors[name]?.message}</Text>}
  </View>
);

export default CreateUserScreen;
