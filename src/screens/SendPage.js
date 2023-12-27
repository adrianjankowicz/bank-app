import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import NavBar from '../components/NavBar';
import { AuthContext } from '../../providers/AuthProvider';

const SendPage = ({ navigation }) => {
  const { checkEmailExists, balance, sendMoney } = useContext(AuthContext);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleSendMoney = async () => {
    console.log('Sending to email:', recipientEmail); // Sprawdź, czy e-mail jest poprawny
    setIsLoading(true);
    // Sprawdź, czy e-mail istnieje
    if (!recipientEmail || !amount) {
      Alert.alert('Error', 'Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      const emailExists = await checkEmailExists(recipientEmail);
    } catch {
      Alert.alert('Error', 'Recipient email does not exist.');
      setIsLoading(false);
      return;
    }

    // Sprawdź, czy użytkownik ma wystarczające środki
    if (amount > balance) {
      Alert.alert('Error', 'Insufficient funds.');
      setIsLoading(false);
      return;
    }


    try {
      console.log('here');
      await sendMoney(recipientEmail, parseFloat(amount));
      // Alert.alert('Success', 'Money sent successfully.');
      navigation.navigate('SuccesfulPayment', {
        amount: amount,
        recipient: recipientEmail,
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    setIsLoading(false);
  };

  const convertCurrencyFormat = (input) => {
    // Zamienia przecinki na kropki
    setAmount(input.replace(',', '.'));
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <NavBar title="Send Fund" />
        <Text style={styles.title}>Send</Text>
        <Text style={styles.subtitle}>Enter an user email to send money</Text>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={recipientEmail}
              onChangeText={setRecipientEmail}
              placeholder="user@mail.com"
              keyboardType="email-address"
              autoCapitalize='none'
            />
          </View>
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
            :
            <TouchableOpacity style={styles.button} onPress={handleSendMoney}>
              <Text style={styles.buttonText}>Send Money</Text>
            </TouchableOpacity>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

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

export default SendPage;