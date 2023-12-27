import React, { useState, useContext, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import NavBar from '../components/NavBar';
import SuccessModal from '../components/SuccessModal';
import LoadingScreen from '../components/LoadingScreen';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState('');
  const { login, isLoading } = useAuth();
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);


  const validateEmail = (text) => {
    setEmail(text); 
    setIsEmailValid(email.length > 0); 
  };

  const validatePassword = (text) => {
    setPassword(text);
    // setIsPasswordValid(password.length >= 5); 
  };

  const handleLogin = () => {
    login(email, password)
  };

  useEffect(() => {
    setIsPasswordValid(password.length >= 6);
  },[password, isEmailValid])

  return (
    <View style={styles.container}>
      <NavBar title="Login"
      />
      {isLoading ? (<LoadingScreen />
      ) : (
        <>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Enjoy all the features that make it easy for you to manage your finances</Text>
          <SuccessModal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            content={content}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={validateEmail}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={validatePassword}
            autoCapitalize="none"

          />
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password</Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
                    onPress={() => isEmailValid && isPasswordValid && handleLogin()}
                    disabled={!isEmailValid && !isPasswordValid}

              style={[
                styles.button,
                isEmailValid && isPasswordValid? styles.buttonActive : styles.buttonInactive
              ]}>
              <Text style={styles.buttonText}>Login
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('EmailPage')}>
            <Text style={styles.register}>Don't have an account? Register</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    marginVertical: 30,
    fontSize: 32,
    // fontWeight: 400,
    lineHeight: 48,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#606060',
  },
  input: {
    height: 70,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 18,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
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

export default LoginPage;
