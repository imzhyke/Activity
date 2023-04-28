import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Auth } from '../Firebase';
import { ToastAndroid } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {  
    try {
    const userCredential = await createUserWithEmailAndPassword(Auth, username, password);
    // On successful registration, userCredential object will contain user information
    console.log('User registered successfully:', userCredential.user);
    // You can navigate to the login screen or any other relevant screen here
    } catch (error) {
      console.log('Registering error: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
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