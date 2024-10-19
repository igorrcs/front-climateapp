import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({}) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a exibição da senha

  const handleLogin = () => {
    // Validação de campos vazios
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Validação de formato de email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    // Caso as validações sejam bem-sucedidas, navega para a tela bemvindo
    navigation.navigate('WelcomeScreen');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require('./assets/logoclimate.jpg')} style={styles.logo} />
        <Text style={styles.title}>Faça seu Login</Text>

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={24} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword} // Mostra ou oculta o texto da senha
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye' : 'eye-slash'}
              size={24}
              color="#333"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Icon name="google" size={24} color="#EA4335" />
            <Text style={styles.socialButtonText}>Login com Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Icon name="facebook" size={24} color="#3b5998" />
            <Text style={styles.socialButtonText}>Login com Facebook</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('WelcomeScreen')}>
          <Text style={styles.linkText}>Primeiro Acesso? Clique Aqui</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 320,
    height: 200,
    marginBottom: 30,
    marginTop: -20, // Valor negativo para mover a logo mais para cima
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    width: '50%',
    height: 50,
    backgroundColor: '#49b3dd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 5,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginBottom: 10,
    textDecorationLine: 'underline', // Sublinhado para destacar o link
  },
  linkText: {
    color: '#007BFF',
    fontSize: 16,
  },
  socialLoginContainer: {
    width: '100%',
    marginTop: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 10,
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
