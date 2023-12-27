import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { AuthContext } from '../../providers/AuthProvider';
import NavBar from '../components/NavBar';

const HistoryPage = () => {
    const [transactions, setTransactions] = useState([]);
    const { fetchTransactions } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const loadTransactions = async () => {
        setIsLoading(true);
        try {
            const fetchedTransactions = await fetchTransactions();
            setTransactions(fetchedTransactions);
        } catch (error) {
            console.error('Failed to load transactions:', error);
        }
        setIsLoading(false);
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            loadTransactions();
        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            setRefreshing(false);
        }
    }, [fetchTransactions]);

    useEffect(() => {
        loadTransactions();
    }, [fetchTransactions]);

    const TransactionItem = ({ item }) => {
        return (
            <View style={styles.transaction}>

                <Text style={styles.text}>Type: {item.transactionType}</Text>
                <Text style={styles.text}>Date: {item.date.toLocaleDateString()}</Text>
                <Text style={styles.text}>Amount: ${item.amount}</Text>
                <Text style={styles.text}>To: {item.recipient}</Text>
                {/* Inne szczegóły transakcji */}
            </View>
        );
    };
    

    return (
        <View style={styles.container}>
            <NavBar title="History" />
            {isLoading ?
                <ActivityIndicator size="large" color="green" />
                : <FlatList
                    data={transactions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <TransactionItem item={item} />}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                      }
                />}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    transaction: {
        backgroundColor: 'lightgrey',
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
    },
    text: {
        fontSize: 16,
        color: 'black',
        // Dodatkowe style
    },
});

export default HistoryPage;
