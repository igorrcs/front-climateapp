import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/logoclimate.jpg')} style={styles.logo} />
      <Text style={styles.welcomeText}>
        Bem Vindo(a) ao <Text style={styles.climateText}>Climate</Text>
        <Text style={styles.appText}>app</Text>
      </Text>
  

      <TextInput
        style={styles.input}
        placeholder="Digite a Cidade"
        placeholderTextColor="black" // Para mudar a cor do texto do placeholder
      />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('')}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Mantém o alinhamento centralizado horizontalmente
    padding: 20,
    backgroundColor: 'white', // Fundo preto
    justifyContent: 'flex-start'

  },
  logo: {
    width: 400,
    height: 230,
    marginBottom: 80,
    resizeMode: 'contain',  },
  
    welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    color: 'black', // Texto branco para contraste
  },
  climateText: {
    color: '#49b3dd', 
  },
  appText: {
    color: '#49b3dd', 
    fontSize: 18, // Tamanho da fonte menor para "App"
    fontWeight: 'normal', // Menos destaque
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 50,
    paddingHorizontal: 10,
    color: 'black', // Texto do input em branco
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
    color: 'black', // Cor do texto do botão
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
