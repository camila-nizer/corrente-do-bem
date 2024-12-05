import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert,TouchableOpacity ,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GradientBackground from '../../components/GradientBackground';


const { width, height } = Dimensions.get('window');


const Login = ({ navigation, route }) => {
    const { userType } = route.params; // Recebe o tipo de usuário (Admin ou Donatário)
    // const userType = 'ONG';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        // Aqui você pode adicionar a lógica de autenticação
        // Alert.alert('Login', `Email: ${email}\nSenha: ${password}\nTipo de Usuário: ${userType}`);
        try {
            //QUANDO TIVER BACKEND INPLEMENTADO
            // const response = await fetch('http://10.0.2.2:3000/users', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         email,
            //         password,
            //         type: userType,
            //     }),
            // });

            const response = await fetch('http://10.0.2.2:3000/users');

            const result = await response.json(); // Obtendo o JSON da resposta

            console.log("Resultado da requisição:", JSON.stringify(result, null, 2)); // Log do resultado
            
            // Verificando se há um usuário que corresponde ao email, senha e tipo fornecidos
            const user = result.data.find(user => 
                user.email === email && 
                user.senha === password && 
                user.tipo === userType
            );

            if (user) {
                Alert.alert('Login com sucesso', `Bem-vindo, ${user.nome}!`);
                // Navegar para a tela apropriada com base no tipo de usuário
                // navigation.navigate(user.tipo === 'Admin' ? 'AdminHome' : 'OngHome');
            } else {
                Alert.alert('Erro', 'Email ou senha incorretos');
            }
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login');
        }
    };


    return (
        <GradientBackground>
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}> Login {userType}</Text>
                </View>
                
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#aaa"
                />
                
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputpassword}
                        placeholder="Senha"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword} // Mostra ou oculta a senha
                        placeholderTextColor="#aaa"
                    />
                    <TouchableOpacity 
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.iconContainer}
                    >
                        <Icon name={showPassword ? "eye-off" : "eye"} size={24} color="#aaa" />
                    </TouchableOpacity>
                </View>
                
                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </Pressable>
                
                {/* Exibe o botão "Criar uma conta" somente para Donatário */}
                {userType === 'ONG' && (
                    <Pressable onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.link}>Clique para criar uma conta.</Text>
                    </Pressable>
                )}
                
                <Pressable onPress={() => Alert.alert('Recuperação de senha', 'Um link foi enviado para seu e-mail de recuperação de senha.')}>
                    <Text style={styles.link}> Esqueceu a senha? </Text>
                </Pressable>
            </View>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        margin:0,
        marginBottom:5,
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
        fontSize: 32,
        fontWeight: '500',
        marginBottom: 20,
        textAlign:'center',
        color:'white'
    },
    input: {
        width: '90%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    button: {
        width: '60%',
        padding: 15,
        backgroundColor: '#2c5321',
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
    },
    link: {
        marginTop: 20,
        color: '#2c5321',
        textDecorationLine: 'underline',
    },
    iconContainer: {
        padding: 10, // Ajuste do padding para centralizar o ícone
    },
    inputpassword: {
        flex: 1,
        width: '90%',
        padding: 15,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 0,
        backgroundColor: '#fff',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
});

export default Login;
