import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, FAB } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth } from '../Firebase';
import { signOut } from 'firebase/auth';
import { db } from '../Firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function RegisterPage({ navigation }) {

  const [dataList, setDataList] = useState([]);
  getData = () => {
    const docs = collection(db, "Data");
    onSnapshot(docs,(ducs) => {
      const oten = [];
      ducs.forEach(element => {
        oten.push({ID:element.id, ...element.data(),});
      });
      setDataList(oten);
    })
  }

  useEffect(() => {
    getData();
  }, []);

  console.log(navigation);

  const Block = ({data, nav}) =>{
    let id = data.ID;
    return (
  
      <TouchableOpacity onPress={() => nav.navigate("Item", id)}>
          
      <View style={styles.block}>
        <Text style={styles.blockTitle}>{data.Title}</Text>
        <Text style={styles.blockDescription}>{data.Description}</Text>
      </View>
      </TouchableOpacity>
    );
  } 
  return (
    <SafeAreaView style={{flex:1}}>
    <Text style={styles.title}>Item List</Text>

    <FAB title="Sign Out" 
      onPress={() => signOut(Auth).then(() => {
        navigation.goBack();
      }).catch((error) => {
        console.log(error);
      }) }/>


      

            
    <ScrollView>
    <Button 
              title="Add Item"
              onPress={() => {
                navigation.navigate("AddItem");
              }}
            />  
      {dataList.map((datas, index) => {
        return (<Block key={index} data={datas} nav = {navigation}/>);
      })}
      

    </ScrollView>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  block: {
    backgroundColor: '#00aabb',
    padding: 20,
    alignSelf: 'center',
    borderRadius: 10,
    width: '90%',
    margin: 8,
  },
  blockTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  blockDescription: {
    color: 'white',
    fontSize: 15,
  },
  container: {
    flex: 1,
    paddingTop: '15%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
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