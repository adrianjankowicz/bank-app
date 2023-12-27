import { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import NavBar from '../components/NavBar';
import { AuthContext } from '../../providers/AuthProvider';

const UpdatePersonalData = ({ navigation }) => {
    const { userData, updateUserData } = useContext(AuthContext);
    const [firstName, setFirstName] = useState(userData.firstName);
    const [lastName, setLastName] = useState(userData.lastName);
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);



    const handleUpdateData = async () => {
        try {
            updateUserData(newFirstName, newLastName)
            console.log('Dane zostały zaktualizowane:', newFirstName, newLastName);

            navigation.goBack(); // Powrót do poprzedniego ekranu lub odpowiedniego ekranu nawigacji
        } catch (error) {
            console.log("Error", "An error occurred while updating data.");
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <NavBar title='Update Personal Data' />
                <Text style={styles.title}>Update Your Personal Data</Text>
                <View style={styles.content}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            value={newFirstName}
                            onChangeText={setNewFirstName}
                            autoCapitalize='words'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            value={newLastName}
                            onChangeText={setNewLastName}
                            autoCapitalize='words'
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleUpdateData}>
                        <Text style={styles.buttonText}>Update Data</Text>
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

export default UpdatePersonalData;