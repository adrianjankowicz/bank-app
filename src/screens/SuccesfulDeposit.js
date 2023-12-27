import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import NavBar from '../components/NavBar';

const SuccesfulDeposit = ({ route, navigation }) => {
    const { amount } = route.params;
   return (
    <View style={styles.container}>
      <NavBar title='Succesful Deposit' />


      <View style={styles.content}>
        <View style={styles.checkCircle}>
          <AntDesign name="check" size={32} color="white" />
        </View>

        <Text style={styles.paymentSuccessful}>Deposit Successful</Text>
        <Text style={styles.amount}>${amount}</Text>
        <Text style={styles.successMessage}>
          You have successfully deposited money.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainPage')}>
        <Text style={styles.buttonText}>Back Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 220,
    
  },
  checkCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  successMessage: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    position: 'absolute',
    bottom: 60,
    right: 25,
    width: '90%',
    backgroundColor: '#05BE71',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SuccesfulDeposit;
