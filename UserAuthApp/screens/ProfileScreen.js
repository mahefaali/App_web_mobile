import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://192.168.43.120:5000/api/profile', {
            headers: {
               Authorization: `Bearer ${token}`, 
              },
          });
          setUser(response.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        navigation.navigate('Login');
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text>Username: {user.username}</Text>
          <Text>ID: {user.id}</Text>
          <Button title="Logout" onPress={() => {
            AsyncStorage.removeItem('token');
            navigation.navigate('Login');
          }} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
