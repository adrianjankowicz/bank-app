import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import NavBar from '../components/NavBar';
import { useState, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const HelpPage = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const { sendSupportMessage } = useContext(AuthContext);

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleContactPress = async () => {
        if (!isEmailValid(email)) {
            Alert.alert("Error", "Email is incorrect. Please enter your email again.");
            return;
        }

        try {
            await sendSupportMessage(email, message);
            setEmail("");
            setMessage("");
        } catch (error) {
            console.error('Error sending support message:', error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

        <View style={styles.container}>
            <NavBar title='Help' />
            <View style={styles.content}>
                <Text style={styles.title}>Help & Support</Text>
                <Text style={styles.description}>
                    Welcome to BankApp Help. Here, you can find guidance on how to use key features of our app.
                    {"\n\n"}
                    <Text style={styles.subtitle}>Depositing Money:</Text>
                    To deposit money, go to the 'Deposit' section, enter the amount, and confirm.
                    {"\n\n"}
                    <Text style={styles.subtitle}>Sending Money:</Text>
                    To send money, navigate to the 'Send Money' section, enter the recipient's details and the amount, then confirm the transaction.
                    {"\n\n"}
                    <Text style={styles.subtitle}>Transaction History:</Text>
                    You can view your transaction history under the 'History' tab to keep track of your deposits, withdrawals, and transfers.
                    {"\n\n"}
                    For more assistance, feel free to contact our support team.
                </Text>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Write your message"
                    multiline
                />
                <TextInput
                    style={styles.inputEmail}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Write your email address"
                    autoCapitalize='none'
                    keyboardType="email-address"

                />
                <TouchableOpacity style={styles.button} onPress={handleContactPress}>
                    <Text style={styles.buttonText}>Send Message</Text>
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
        marginLeft: 15,
        marginRight: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    subtitle: {
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        height: 100,
        textAlignVertical: 'top',
    },
    inputEmail: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        height: 35,
        // textAlignVertical: 'top', 
    },
});

export default HelpPage;
