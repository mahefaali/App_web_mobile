import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ChangePasswordScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            showMessage({
                message: 'Error',
                description: 'New passwords do not match',
                type: 'danger',
            });
        return;
        }

        const token = await AsyncStorage.getItem('token');
        try {
            const response = await axios.post('http://192.168.43.120:5000/api/change-password', { currentPassword, newPassword }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                showMessage({
                    message: 'Success',
                    description: 'Password changed successfully',
                    type: 'success',
                });
            } else {
                showMessage({
                    message: 'Error',
                    description: response.data.message,
                    type: 'danger',
                });
            }
            navigation.navigate('Profile');
        } catch (error) {
            console.warn(error)
            showMessage({
                message: 'Error',
                description: error.response?.data?.message,
                type: 'danger',
            });
        }
    };

  return (
    <View style={styles.container}>
      <Text>Current Password</Text>
      <TextInput
        style={styles.input}
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
      />
      <Text>New Password</Text>
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Text>Confirm New Password</Text>
      <TextInput
        style={styles.input}
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        secureTextEntry
      />
      <Button title="Change Password" onPress={handleChangePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default ChangePasswordScreen;
