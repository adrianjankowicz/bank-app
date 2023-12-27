import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import NavBar from '../components/NavBar';
import ProgressBar from '../components/ProgressBar';

const EmailPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);

    const validateEmail = (text) => {
        setEmail(text); // Aktualizacja stanu email.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Proste wyrażenie regularne do walidacji emaila.
        setIsEmailValid(emailRegex.test(text)); // Aktualizacja stanu isEmailValid.
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

        <View style={styles.container}>
            <NavBar title={'Register'} />
            <ProgressBar step={1} totalSteps={3} />
            <Text style={styles.title}>Email</Text>
            <Text style={styles.subtitle}>Enter your email to register</Text>
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    onChangeText={validateEmail} // Użyj validateEmail tutaj.
                    value={email}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    onPress={() => isEmailValid && navigation.navigate('NamePage', { email: email })}
                    disabled={!isEmailValid}
                    style={[
                        styles.button,
                        isEmailValid ? styles.buttonActive : styles.buttonInactive
                    ]}
                >
                    <Text style={styles.buttonText}>Next Step</Text>
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

export default EmailPage;