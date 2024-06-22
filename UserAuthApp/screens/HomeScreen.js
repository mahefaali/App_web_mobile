import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
	return(
		<View style={styles.container} >
			<Text>Welcome to user management App!</Text>
			<Button title="Login" onPress={() => navigation.navigate('Login')} />
			<Button title="Register" onPress={() => navigation.navigate('Register')} />
			<Button title="Profile" onPress={() => navigation.navigate('Profile')} />
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

//pour le commit

export default HomeScreen;