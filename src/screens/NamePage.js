import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import NavBar from '../components/NavBar';
import ProgressBar from '../components/ProgressBar';

const NamePage = ({ navigation, route }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const email = route.params.email;
    const [isNotEmpty, setIsNotEmpty] = useState(false);

    useEffect(() =>{
        if (firstName.length > 0 && lastName.length > 0) setIsNotEmpty(true);
    })

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

        <View style={styles.container}>
            <NavBar title={'Register'} />
            <ProgressBar step={2} totalSteps={3} />
            <Text style={styles.title}>Full name</Text>
            <Text style={styles.subtitle}>Enter your firstname and lastname to register</Text>
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    onChangeText={setFirstName} // Użyj validateEmail tutaj.
                    value={firstName}
                    placeholder="Firstname"
                    keyboardType="default"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setLastName} // Użyj validateEmail tutaj.
                    value={lastName}
                    placeholder="Lastname"
                    keyboardType="default"
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('PasswordPage', { email: email, firstName: firstName, lastName: lastName })}
                    disabled={!isNotEmpty}
                    style={[
                        styles.button,
                        isNotEmpty ? styles.buttonActive : styles.buttonInactive
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
        backgroundColor: '#05BE71', // Zielony kolor dla aktywnego przycisku
    },
    buttonInactive: {
        backgroundColor: 'grey', // Szary kolor dla nieaktywnego przycisku
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
    label:{

    },
});

export default NamePage;