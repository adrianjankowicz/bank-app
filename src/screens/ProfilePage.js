import { useContext, useState, useEffect, useCallback } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { TouchableOpacity, ScrollView, RefreshControl, View, Text, StyleSheet, Alert } from 'react-native';

import HelpButton from '../components/HelpButton';

const ProfilePage = ({ navigation }) => {

    const { user, fetchUserBalance, balance, fetchUserData, userData } = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState(false);
    const { deleteAccount } = useContext(AuthContext);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await fetchUserData(user.uid);
        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            setRefreshing(false);
        }
    }, [user, fetchUserData]);

    const handleChangePassword = () => {
        navigation.navigate('ChangePassword')
    };

    const handleChangeEmail = () => {
        navigation.navigate('ChangeEmail')
    };
    const handleChangePersonalData = () => {
        navigation.navigate('UpdatePersonalData')
    };

    const handleDeletePress = () => {
        Alert.alert(
            "Confirm Account Deletion",
            "Are you sure you want to delete your account? It will not be possible to restore your account. Are you sure you want to continue?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel "),
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: deleteAccount
                }
            ],
            { cancelable: false }
        );
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={styles.balanceLabel}>
                <Text style={styles.welcomeText}>{userData ? (<>
                    <Text>Welcome, </Text>
                    <Text style={styles.nameText}>{userData.firstName}</Text>
                    <Text> </Text>
                    <Text style={styles.nameText}>{userData.lastName}</Text>
                </>) : 'Loading Data...'}</Text>
            </View>
            <View style={styles.optionsContainer}>

                <TouchableOpacity style={styles.optionButton} onPress={handleChangePersonalData}>
                    <Text style={styles.optionButtonText}>Update personal data </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.optionButton2} onPress={handleChangeEmail}>
                    <Text style={styles.optionButtonText}>Change Email Adress</Text>
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.optionButton2} onPress={handleChangePassword}>
                    <Text style={styles.optionButtonText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtonDelete} onPress={handleDeletePress}>
                    <Text style={styles.optionButtonText}>Delete Account</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.optionButtonHelp} onPress={() => navigation.navigate('HelpPage')}>
                    <HelpButton />
                </TouchableOpacity>

        </ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        height: '100%',
    },
    balanceLabel: {
        marginVertical: 15,

    },
    balanceLabelText: {
        color: 'grey',
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    nameText: {
        fontSize: 28,
        color: 'green',
    },
    optionsContainer: {
        width: '100%',
        alignItems: 'center',
    },
    optionButton: {
        backgroundColor: '#03C03C',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        width: '80%',
        alignItems: 'center',
    },
    optionButtonHelp: {
        position: 'absolute',
        bottom: 10,
        right: 0,
    },
    optionButton2: {
        backgroundColor: '#177245',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        width: '80%',
        alignItems: 'center',
    },
    optionButtonDelete: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        width: '80%',
        alignItems: 'center',
    },
    optionButtonText: {
        fontSize: 18,
        color: '#ffffff',
    },
});

export default ProfilePage