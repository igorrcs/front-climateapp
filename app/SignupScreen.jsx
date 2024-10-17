import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

// Definição do esquema de validação usando Yup
const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres') // Validação para no mínimo 3 caracteres
    .required('Nome completo é obrigatório'), // Nome é obrigatório
  email: Yup.string()
    .email('Digite um email válido') // Validação de email
    .required('O email é obrigatório'), // Email é obrigatório
  password: Yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres') // Validação de senha com no mínimo 6 caracteres
    .required('A senha é obrigatória'), // Senha é obrigatória
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas não correspondem') // Validação para garantir que as senhas sejam iguais
    .required('A confirmação de senha é obrigatória'), // Confirmação de senha é obrigatória
});

const SignupScreen = () => {
  const navigation = useNavigation(); // Hook para navegação
  const [showPassword, setShowPassword] = useState(false); // Estado para exibir/ocultar a senha
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para exibir/ocultar a confirmação de senha

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Ajuste do teclado para iOS
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Logo da tela */}
        <Image source={require('./assets/logoclimate.jpg')} style={styles.logo} />
        <Text style={styles.title}>Crie sua conta</Text>

        {/* Formulário de cadastro utilizando Formik */}
        <Formik
          initialValues={{
            fullName: '', // Valor inicial do nome
            email: '', // Valor inicial do email
            password: '', // Valor inicial da senha
            confirmPassword: '', // Valor inicial da confirmação de senha
          }}
          validationSchema={validationSchema} // Aplica a validação definida no Yup
          onSubmit={(values) => {
            // Ao enviar o formulário, exibe um alerta com os valores
            Alert.alert('Cadastro realizado com sucesso!', JSON.stringify(values, null, 2));

            // Navega para a tela de login após o cadastro
            navigation.navigate('LoginScreen');
          }}
        >
          {({
            handleChange, // Função para atualizar os valores do formulário
            handleBlur, // Função para registrar quando o campo perde o foco
            handleSubmit, // Função para submeter o formulário
            values, // Valores atuais do formulário
            errors, // Mensagens de erro de validação
            touched, // Campos que já foram tocados (focados)
          }) => (
            <View style={styles.form}>
              
              {/* Campo de entrada para Nome Completo */}
              <View style={styles.inputContainer}>
                <Icon name="user" type="font-awesome" size={24} color="#333" />
                <TextInput
                  style={styles.input}
                  placeholder="Nome Completo"
                  onChangeText={handleChange('fullName')} // Atualiza o valor do campo fullName
                  onBlur={handleBlur('fullName')} // Registra quando o campo perde o foco
                  value={values.fullName} // Exibe o valor atual do campo
                />
              </View>
              {touched.fullName && errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text> // Exibe mensagem de erro se houver
              )}

              {/* Campo de entrada para Email */}
              <View style={styles.inputContainer}>
                <Icon name="envelope" type="font-awesome" size={24} color="#333" />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address" // Teclado otimizado para emails
                  onChangeText={handleChange('email')} // Atualiza o valor do campo email
                  onBlur={handleBlur('email')} // Registra quando o campo perde o foco
                  value={values.email} // Exibe o valor atual do campo
                />
              </View>
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text> // Exibe mensagem de erro se houver
              )}

              {/* Campo de entrada para Senha */}
              <View style={styles.inputContainer}>
                <Icon name="lock" type="font-awesome" size={24} color="#333" />
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  secureTextEntry={!showPassword} // Exibe ou oculta o texto da senha
                  onChangeText={handleChange('password')} // Atualiza o valor do campo senha
                  onBlur={handleBlur('password')} // Registra quando o campo perde o foco
                  value={values.password} // Exibe o valor atual do campo
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {/* Ícone para mostrar/ocultar senha */}
                  <Icon
                    name={showPassword ? 'eye' : 'eye-slash'}
                    type="font-awesome"
                    size={24}
                    color="#333"
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text> // Exibe mensagem de erro se houver
              )}

              {/* Campo de confirmação de senha */}
              <View style={styles.inputContainer}>
                <Icon name="lock" type="font-awesome" size={24} color="#333" />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmar Senha"
                  secureTextEntry={!showConfirmPassword} // Exibe ou oculta o texto da confirmação de senha
                  onChangeText={handleChange('confirmPassword')} // Atualiza o valor do campo confirmPassword
                  onBlur={handleBlur('confirmPassword')} // Registra quando o campo perde o foco
                  value={values.confirmPassword} // Exibe o valor atual do campo
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {/* Ícone para mostrar/ocultar a confirmação de senha */}
                  <Icon
                    name={showConfirmPassword ? 'eye' : 'eye-slash'}
                    type="font-awesome"
                    size={24}
                    color="#333"
                  />
                </TouchableOpacity>
              </View>
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text> // Exibe mensagem de erro se houver
              )}

              {/* Botão de cadastro */}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        {/* Link para a tela de login */}
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginLink}>Já tem uma conta? Faça login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Garante que o conteúdo ocupe todo o espaço disponível
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'flex-start',  //deixar mais acima

  },
  logo: {
    width: 320, // Largura da imagem
    height: 200, // Altura da imagem
    marginBottom: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 28, // Tamanho da fonte do título
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 1,
    color: '#333', // Cor do texto
  },
  form: {
    marginTop: 20, // Margem superior do formulário
  },
  inputContainer: {
    flexDirection: 'row', // Exibe o ícone e o campo de texto na mesma linha
    alignItems: 'center',
    backgroundColor: '#fff', // Fundo branco para o campo de entrada
    borderWidth: 1, // Borda fina ao redor do campo
    borderColor: '#ddd', // Cor da borda
    padding: 10,
    borderRadius: 5, // Borda arredondada
    marginBottom: 15, // Espaço entre os campos
  },
  input: {
    flex: 1, // O campo de texto ocupa o espaço restante
    paddingLeft: 10, // Espaçamento à esquerda do texto
    fontSize: 16,
  },
  errorText: {
    color: 'red', // Cor do texto de erro
    marginBottom: 10,
  },
  button: {
    width: '50%',
    height: 50,
    backgroundColor: '#49b3dd', // Cor de fundo do botão
    justifyContent: 'center', // Centraliza o texto verticalmente
    alignItems: 'center', // Centraliza o texto horizontalmente
    borderRadius: 8, // Bordas arredondadas
    marginBottom: 5,
    alignSelf: 'center', // Centraliza o botão horizontalmente
  },
  buttonText: {
    color: '#000000', // Cor do texto do botão
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    color: '#1E90FF', // Cor do link para a tela de login
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline', // Sublinhado para destacar o link
  },
});

export default SignupScreen;
