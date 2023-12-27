import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../providers/AuthProvider'; // Ścieżka dostępu może się różnić
import NavBar from '../components/NavBar';

const DepositPage = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const { depositMoney } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeposit = async () => {
    setIsLoading(true);
    if (!amount) {
      Alert.alert('Error', 'Please enter an amount.');
      return;
    }

    try {
      await depositMoney(parseFloat(amount));
      navigation.navigate('SuccesfulDeposit', {
        amount: amount,
      });
    }
    catch (error) {
      Alert.alert('Error', error.message);
    }
    setIsLoading(false)
  };

  const convertCurrencyFormat = (input) => {
    // Zamienia przecinki na kropki
    setAmount(input.replace(',', '.'));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <NavBar title="Deposit Fund" />
        <Text style={styles.title}>Deposit</Text>
        <Text style={styles.subtitle}>Enter an amount to deposit.</Text>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount</Text>    
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={convertCurrencyFormat}
              placeholder="0"
              keyboardType="numeric"
            />
          </View>

          {isLoading ?
            <ActivityIndicator size="large" color="green" />
            : <TouchableOpacity style={styles.button} onPress={handleDeposit}>
              <Text style={styles.buttonText}>Deposit Money</Text>
            </TouchableOpacity>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Dodaj stylizacje według potrzeb
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,

  },
  content: {
    flex: 1,
    alignItems: 'center',

  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ECECEC',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '95%',
  },
  label: {
    // paddingHorizontal: 5,
    fontSize: 16,
    color: '#909090',
  },
  input: {
    height: 20,
    width: '90%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#606060',
    fontSize: 18,
    borderRadius: 5,
    borderWidth: 0,
  },
  button: {
    marginTop: 20,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#05BE71',
    position: 'absolute',
    bottom: 80,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  title: {
    fontSize: 28,
    marginVertical: 30,
    fontSize: 32,
    fontWeight: 400,
    lineHeight: 48,
    marginLeft: 20,

  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#606060',
    marginLeft: 20,

  },
});

export default DepositPage;
