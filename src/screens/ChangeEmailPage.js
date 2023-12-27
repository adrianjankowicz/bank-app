import { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import NavBar from '../components/NavBar';
import { AuthContext } from '../../providers/AuthProvider';

const ChangeEmailPage = ({ navigation }) => {
    const { changeEmail } = useContext(AuthContext);
    const [newEmail, setNewEmail] = useState('');

    const handleChangeEmail = async () => {
        try {
            await changeEmail(newEmail);
            Alert.alert("Success", "Email changed successfully.");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", error.message || "An error occurred while changing the email.");
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <NavBar title='Change Email' />
                <Text style={styles.title}>Change Your Email</Text>
                <View style={styles.content}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>New Email</Text>
                        <TextInput
                            style={styles.input}
                            value={newEmail}
                            onChangeText={setNewEmail}
                            placeholder='mail@mail.com'
                            keyboardType='email-address'
                            autoCapitalize='none'
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleChangeEmail}>
                        <Text style={styles.buttonText}>Change Email</Text>
                    </TouchableOpacity>
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

export default ChangeEmailPage;