import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, FAB } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Auth } from '../Firebase';
// import { signOut } from 'firebase/auth';
import { db } from './Firebase';
import { collection, onSnapshot, getDoc, addDoc} from 'firebase/firestore';

export default function AddItem({ navigation }) {
    
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const addItems00 = async () => {  
    try {
        const docRef = await addDoc(collection(db, "Data"), {
        Title: title,
        Description: desc,
        });
        console.log("Document written with ID: ", docRef.id);
        navigation.navigate("Home");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
  }

    return(

        <View style={styles.container}>
        <Text style={styles.title}>Fill Up Details</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          value={title}
          placeholder="Task Name"
        />
        
        <TextInput
          style={styles.input}
          onChangeText={setDesc}
          value={desc}
          placeholder="Description"
        />
        <TouchableOpacity style={styles.button} onPress={addItems00}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      alignItems: 'center',
      justifyContent: 'center',
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