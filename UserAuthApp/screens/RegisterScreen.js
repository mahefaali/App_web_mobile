import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      showMessage({
        message: 'Error',
        description: 'Passwords do not match',
        type: 'danger',
      });
      return;
    }

    try {
      const response = await axios.post('http://192.168.43.120:5000/api/register', { 
        firstName, 
        lastName, 
        username, 
        password 
      });
      showMessage({
        message: 'Registration Successful',
        description: 'You can now log in with your new account.',
        type: 'success',
      });
      navigation.navigate('Login'); // Navigate to the login screen upon successful registration
    } catch (error) {
      showMessage({
        message: 'Error',
        description: 'Registration Failed'+ error.response?.data?.message || 'An error occurred',
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your first name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your last name"
        value={lastName}
        onChangeText={setLastName}
      />
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default RegisterScreen;
