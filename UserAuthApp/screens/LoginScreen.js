import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null, // Supprime la flèche de retour en arrière
      gestureEnabled: false,  // Désactive le geste de retour sur iOS
    });
  }, [navigation]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.43.120:5000/api/login', { username, password });
      const { token } = response.data;
      await AsyncStorage.setItem('token', token);
      navigation.navigate('Profile');
    } catch (error) {
      //console.error(error)
      showMessage({
        message: 'Error',
        description: 'Login Failed'+ error || 'An error occurred',
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Text>Or</Text>
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    padding: 10,
  },
});

export default LoginScreen;
