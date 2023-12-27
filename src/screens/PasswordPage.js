import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import NavBar from '../components/NavBar';
import ProgressBar from '../components/ProgressBar';
import { useAuth } from '../../hooks/useAuth'

const PasswordPage = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);

  const { register } = useAuth(); 

  const email = route.params.email;
  const fname = route.params.firstName;
  const lname = route.params.lastName;

  const handlePasswordChange = (text) => {
    setPassword(text);
    setIsPasswordValid(text.length >= 6);
    setDoPasswordsMatch(text === confirmPassword);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    setDoPasswordsMatch(password === text); 
  };

  const handleCompleteRegistration = async () => {
    if (!isPasswordValid || !doPasswordsMatch) {
      Alert.alert('Error', 'Please ensure the passwords are valid and match.');
      return;
    }

    try {
      await register(email, password, fname, lname);
      Alert.alert(
        'Registration Successful', 
        'Your account has been created.', 
        [{ text: "OK", onPress: () => console.log('worked')}]
      );
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    }
  };


  const canProceed = isPasswordValid && doPasswordsMatch; 

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

    <View style={styles.container}>
      <NavBar title={'Password'} />
      <ProgressBar step={3} totalSteps={3} />
      <Text style={styles.title}>Enter password</Text>
      <Text style={styles.subtitle}>The new password must have at least 6 characters.</Text>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          onChangeText={handlePasswordChange}
          value={password}
          placeholder="Password"
          secureTextEntry // This hides the password input
        />
        <TextInput
          style={styles.input}
          onChangeText={handleConfirmPasswordChange}
          value={confirmPassword}
          placeholder="Confirm Password"
          secureTextEntry // This hides the confirmation password input
        />
        <TouchableOpacity
          onPress={handleCompleteRegistration}
          disabled={!canProceed}
          style={[
            styles.button,
            canProceed ? styles.buttonActive : styles.buttonInactive
          ]}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // paddingHorizontal: 20,
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
  content: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '90%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
  },
  button: {
    width: '90%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: 60,
},
  buttonActive: {
    backgroundColor: '#05BE71',
  },
  buttonInactive: {
    backgroundColor: 'grey',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  register: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 8,
  },
  forgotPassword: {
    textAlign: 'right',
    color: 'blue',
    marginVertical: 8,
  },
});

export default PasswordPage;