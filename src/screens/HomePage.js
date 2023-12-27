import { TouchableOpacity, ScrollView, RefreshControl, View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useContext, useState, useEffect, useCallback } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import HelpButton from '../components/HelpButton';

const HomePage = ({ navigation }) => {
    const { user, fetchUserBalance, balance, fetchUserData, userData } = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await fetchUserBalance(user.uid);
            await fetchUserData(user.uid);
        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            setRefreshing(false);
        }
    }, [user, fetchUserBalance, fetchUserData]);

    useEffect(() => {
        fetchUserBalance();
    }, [user, fetchUserBalance,  balance]);

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
                <Text style={styles.balanceLabelText}>Your Balance</Text>
            </View>
            <View style={styles.balanceAmount}>
                <Text style={styles.currency}>$</Text>
                <Text style={styles.amount}>{balance}</Text>
            </View>
            <View style={styles.operations}>

                <TouchableOpacity style={styles.send} onPress={() => navigation.navigate('SendPage')}>
                    <MaterialCommunityIcons name='cash' size={42} color='green' />
                    <Text style={styles.sendText}>Send</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.send} onPress={() => navigation.navigate('DepositPage')}>
                    <MaterialCommunityIcons name='cash-plus' size={42} color='green' />
                    <Text style={styles.sendText}>Deposit</Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.send} onPress={() => navigation.navigate('HistoryPage')}>
                    <MaterialCommunityIcons name='receipt' size={42} color='green' />
                    <Text style={styles.sendText}>History</Text>

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
    nameText:{
        fontSize: 28,
        color: 'green',
    },

    balanceAmount: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15
    },
    currency: {
        marginRight: 5,
        fontSize: 40
    },

    amount: {
        fontSize: 40
    },

    operations: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 2,
        padding: 20,
        borderRadius: 8,
        borderColor: 'grey',
    },

    send: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    optionButtonHelp: {
        position: 'absolute',
        bottom: 10,
        right: 0,
    },

});

export default HomePage