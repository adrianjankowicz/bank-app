import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const NavBar = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navButton}>
        {/* <Text>Back</Text> */}
        <FontAwesome name="arrow-left" size={32} color="green" />

      </TouchableOpacity>
      <Text style={styles.navTitle}>{title ? title : "JBank"}</Text>
      {/* <Image style={styles.logo} source={require('../../assets/img/logo.png')} /> */}

      {/* <TouchableOpacity> */}
      {/* <FontAwesome name="home" size={32} color="green" /> */}
      <Image style={styles.logo} source={require('../../assets/img/logo.png')} />
      {/* </TouchableOpacity> */}
      {/* <TouchableOpacity onPress={() => console.log('Right button pressed')} style={styles.navButton}>
        <Text></Text> 
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    height: 60, // Wysokość paska nawigacyjnego
    // paddingHorizontal: 10, // Odstępy po bokach
    display: 'flex',
    flexDirection: 'row', // Ustawienie elementów w poziomie
    alignItems: 'center', // Wyśrodkowanie elementów w pionie
    justifyContent: 'space-between', // Równomierne rozmieszczenie elementów
    // backgroundColor: '#EFEFEF', // Kolor tła paska nawigacyjnego
    marginTop: 40,
  },
  navButton: {
    padding: 10, // Odstępy wokół tekstu/ikonki
  },
  navTitle: {
    fontWeight: 'bold', // Pogrubienie tekstu
    fontSize: 16,
    marginLeft:20,
  },
  logo: {
    width: 70,
    height: 60
  },
});

export default NavBar;
