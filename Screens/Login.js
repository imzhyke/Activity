import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RegisterPage from './Register';
import { Auth, signIn } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({navigation}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(Auth, username, password)
      .then((userCredential) => {
        console.log('Login successful');
      })
      .catch((error) => {
        console.log('Login failed', error);
      });
  };

  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged((user) => {
      if (user) {
        // User is authenticated
        console.log('User authenticated');
        navigation.replace('Home');
      }
    });
    // Unsubscribe from the listener when component unmounts
    return unsubscribe;
  }, []);

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Email"
      />
      
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '80%',
    fontSize: 18,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});