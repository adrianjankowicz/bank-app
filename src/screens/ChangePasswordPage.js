import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import NavBar from '../components/NavBar';
import { AuthContext } from '../../providers/AuthProvider';

const ChangePasswordPage = ({ navigation }) => {
    const { changePassword } = useContext(AuthContext);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validatePassword = (password) => {
        return password.length >= 6;
    };


    const handleChangePassword = async () => {
        if (!validatePassword(newPassword)) {
            Alert.alert("Error", "The password must contain more than 6 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Błąd", "Passwords are not identical.");
            return
        }

        if (currentPassword === newPassword) {
            Alert.alert("Error", "The new password can be the current password.");
            return;
        }

        try {
            await changePassword(currentPassword, newPassword);
            // navigation.goBack();
        } catch (error) {
            console.log("Error", error.message || "An error occurred while changing the password.");
        }
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

            <View style={styles.container}>
                <NavBar title='Change Password' />
                <Text style={styles.title}>Change password</Text>
                <Text style={styles.subtitle}>The new password must have at least 6 characters.</Text>
                <View style={styles.content}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Current password</Text>
                        <TextInput
                            style={styles.input}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            placeholder="*******"
                            secureTextEntry
                            autoCapitalize='none'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>New password</Text>
                        <TextInput
                            style={styles.input}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            placeholder="*******"
                            secureTextEntry
                            autoCapitalize='none'

                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Confirm new password</Text>
                        <TextInput
                            style={styles.input}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholder="*******"
                            secureTextEntry
                            autoCapitalize='none'

                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                        <Text style={styles.buttonText}>Change password</Text>
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

export default ChangePasswordPage;
