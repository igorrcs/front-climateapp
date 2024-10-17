
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import WelcomeScreen from './WelcomeScreen';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SignupScreen />
    </SafeAreaView>
  

);
};

export default App;

