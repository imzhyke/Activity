import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FAB } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../Firebase';
import { getDoc, doc, deleteDoc, updateDoc  } from 'firebase/firestore';

export default function Item({ navigation, route}) {


  const [descc, setDescc] = useState('');

    const [data, setData] = useState(Object);
    getData = () => {
        const docRef = doc(db, "Data", route.params);
        getDoc(docRef).then( (data) => {
            setData(data.data());
        } ).catch( (error) => {
            console.log("ERROR MAN OY " + error);
            navigation.goBack();
        } );
    }

    const delData = async() => {
      await deleteDoc(doc(db, "Data", route.params));
      console.log(data.Title);
      navigation.navigate("Home");

    };

    const updateData = async() => {
      await updateDoc(doc(db, "Data", route.params),{
        Description: descc
      });
      console.log(data.Title);
      navigation.navigate("Home");
    };
    
    useEffect( () => {
        getData();
    }, [] )

    console.log(data);
  return (
    <SafeAreaView>
    
    <View style={styles.container}>
      <Text style={styles.title}>{data.Title}</Text>
      <TextInput 
        onChangeText={setDescc}
        value={descc}
        placeholder= {data.Description}
         style={styles.description}>
          
      </TextInput>
      <View style={{paddingHorizontal: 20}}>
      <Button style={styles.buttonRow} title='Edit' onPress={updateData}/>
      </View>
      <View style={{paddingHorizontal: 20, marginTop: 10}}>
      <Button style={styles.buttonRow} color='red'  title='Delete' onPress={delData}/>
      </View>
      <View style={{paddingHorizontal: 20, marginTop: 200}}>
      <Button style={styles.button} color='violet' title='Go Back' onPress={() => {navigation.goBack()}}/>

      </View>

    </View>
   
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
        description: {
        borderWidth: 2,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        width: '80%',
        height: '10%',
        marginBottom: 20,
        marginLeft: 30,
    },
  container: {
    justifyContent: 'center',
    height: '100%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    marginBottom: 30,
    width: '80%',
  },
  buttonRow: {
    width: 40,
    backgroundColor: 'blue',
    borderRadius: 5,
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