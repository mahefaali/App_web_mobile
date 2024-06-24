import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null, // Supprime la flèche de retour en arrière
      gestureEnabled: false,  // Désactive le geste de retour sur iOS
    });
  }, [navigation]);

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
          <Text>ID: {user._id}</Text>
          <Text>First name: {user.firstName}</Text>
          <Text>Last name: {user.lastName}</Text>
          <Button title="Change Password" onPress={() => navigation.navigate('ChangePassword')} />
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
