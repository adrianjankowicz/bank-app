import React, { createContext, useEffect, useState, useMemo } from 'react';
import { updatePassword, updateEmail, deleteUser, onAuthStateChanged, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { Alert } from 'react-native';
import { db, register, login, logout, auth } from '../firebase/firebase';
import { query, where, getDoc, getDocs, collection, setDoc, doc, addDoc, runTransaction, updateDoc } from 'firebase/firestore';
import { Decimal } from 'decimal.js';


export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoadingInitial, setIsLoadingInitial] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [balance, setBalance] = useState(0);
    const [userData, setUserData] = useState(null);

    const checkEmailExists = async (email) => {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    };

    const fetchUserBalance = async (uid) => {
        const userDocRef = doc(db, 'users', user.uid);
        try {
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                setBalance(docSnap.data().balance);
            } else {
                console.log('No user document found');
            }
        } catch (error) {
            console.error('Error fetching user balance:', error);
        }
    };
    const fetchUserData = async (uid) => {
        const userDocRef = doc(db, 'users', uid);
        try {
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                setUserData(docSnap.data());
            } else {
                console.log('No user document found');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };


    const registerHandler = async (email, password, fname, lname) => {
        setIsLoading(true);
        console.log(email, password, fname, lname);

        try {
            const response = await register(email, password);
            // console.log(email, password, fname, lname);
            const userData = {
                email: response.user.email,
                balance: 0,
                firstName: fname,
                lastName: lname
            };

            await setDoc(doc(db, 'users', response.user.uid), {
                ...userData,
                _id: response.user.uid,
            });
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };


    const loginHandler = async (email, password) => {
        setIsLoading(true);
        try {
            await login(email, password);
        } catch (error) {
            console.log(error.code);
            if (error.code === 'auth/invalid-credential') {
                Alert.alert('Login Error', 'Please provide a valid email address and password');
            }
            else if (error.code === 'auth/too-many-requests') {
                Alert.alert('Login Error', 'Too many login attempts. Please try again later');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const logoutHandler = async () => {
        setIsLoading(true);
        try {
            await logout();
        } catch (error) {
            Alert.alert('Error logout:', error.message || 'Unknown error');
        } finally {
            setIsLoading(false);
        }
    };

    const sendMoney = async (recipientEmail, amountToSend) => {
        if (!user || !user.email) {
            throw new Error('User is not logged in or does not have an email');
        }

        if (user.email === recipientEmail) {
            throw new Error("You cannot send money to yourself.");
        }

        const senderRef = doc(db, 'users', user.uid);
        const senderDoc = await getDoc(senderRef);
        if (!senderDoc.exists()) {
            throw new Error('Sender does not exist');
        }

        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', recipientEmail));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            throw new Error('Recipient does not exist');
        }

        const recipientRef = querySnapshot.docs[0].ref;

        await runTransaction(db, async (transaction) => {
            const senderSnapshot = await transaction.get(senderRef);
            const recipientSnapshot = await transaction.get(recipientRef);

            if (!recipientSnapshot.exists() || !senderSnapshot.exists()) {
                throw new Error('Transaction failed: User does not exist');
            }

            const senderBalance = new Decimal(senderSnapshot.data().balance);
            const recipientBalance = new Decimal(recipientSnapshot.data().balance);
            const amount = new Decimal(amountToSend);

            if (senderBalance.lessThan(amount)) {
                throw new Error('Insufficient funds');
            }

            const newSenderBalance = senderBalance.minus(amount).toFixed(2);
            const newRecipientBalance = recipientBalance.plus(amount).toFixed(2);

            // Aktualizacja balansu w Firestore
            transaction.update(senderRef, { balance: parseFloat(newSenderBalance) });
            transaction.update(recipientRef, { balance: parseFloat(newRecipientBalance) });


            // Rejestrowanie transakcji
            const transactionData = {
                userId: user.uid,
                transactionType: 'send',
                date: new Date(),
                amount: amountToSend,
                sender: user.email,
                recipient: recipientEmail,

            };
            await addTransaction(transactionData);
        });

        return true;
    };

    const depositMoney = async (amount) => {
        const userRef = doc(db, 'users', user.uid);

        try {
            await runTransaction(db, async (transaction) => {
                const userDoc = await transaction.get(userRef);
                if (!userDoc.exists()) {
                    throw new Error('User does not exist');
                }

                const newBalance = userDoc.data().balance + amount;
                transaction.update(userRef, { balance: newBalance });

                // Rejestrowanie transakcji
                const transactionData = {
                    userId: user.uid,
                    transactionType: 'deposit',
                    date: new Date(),
                    amount: amount,
                    sender: user.email, 
                    recipient: user.email,
                };
                await addTransaction(transactionData);
            });

            setBalance(prevBalance => (prevBalance + amount));

        } catch (error) {
            console.error('Error in depositing money:', error);
            throw error;
        }
    };

    const addTransaction = async (transactionData) => {
        const transactionsRef = collection(db, 'transactions');
        try {
            await addDoc(transactionsRef, transactionData);
        } catch (error) {
            console.error('Error adding transaction:', error);
            throw error;
        }
    };


    const fetchTransactions = async () => {
        const transactionsRef = collection(db, 'transactions');
        const q = query(transactionsRef, where('userId', '==', user.uid));

        try {
            const querySnapshot = await getDocs(q);
            const transactions = querySnapshot.docs.map(doc => {
                const data = doc.data();
                if (data.date && data.date.toDate) {
                    data.date = data.date.toDate();
                }
                data.type = data.type || 'unknown';
                return data;
            });
            return transactions;
        } catch (error) {
            console.error('Error fetching transactions:', error);
            throw error;
        }
    };

    const updateUserData = async (newFirstName, newLastName) => {
        if (!user || !user.uid) {
            throw new Error('User is not authenticated');
        }

        const userRef = doc(db, 'users', user.uid);
        try {
            await updateDoc(userRef, {
                firstName: newFirstName,
                lastName: newLastName
            });

            setUserData(prevUserData => ({ ...prevUserData, firstName: newFirstName, lastName: newLastName }));

            Alert.alert('Success', 'Your data has been updated.');
        } catch (error) {
            console.error('Error updating user data:', error);
            Alert.alert('Error', 'An error occurred while updating your data.');
            throw error;
        }
    };

    const changePassword = async (currentPassword, newPassword) => {
        if (!user) {
            throw new Error('User is not authenticated');
        }

        try {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);

            await updatePassword(user, newPassword);
            Alert.alert('Success', 'Your password has been changed. Now please login using the new password.');
            await logout();
        } catch (error) {
            console.error('Error during password change:', error);
            if (error.code === 'auth/wrong-password') {
                Alert.alert("Error", "The current password is incorrect.");
            } else {
                Alert.alert("Error", "An error occurred while changing the password.");
            }
            throw error;
        }
    };

    const changeEmail = async (newEmail) => {

        if (!user) {
            throw new Error('User is not authenticated');
        }

        try {
            await updateEmail(user, newEmail);
        } catch (error) {
            console.error('Error changing email:', error);
            throw error;
        }
    };

    const sendSupportMessage = async (email, message) => {
        try {
            const messagesRef = collection(db, 'supportMessages');
            await addDoc(messagesRef, {
                email,
                message,
                timestamp: new Date()
            });
            Alert.alert("Success", "Message sent successfully. We will contact you as soon as possible.");
        } catch (error) {
            console.error('Error sending support message:', error);
            Alert.alert("Error", "An error occurred while sending the message.");
            throw error;
        }
    };

    const deleteAccount = async () => {

        if (!user) {
            throw new Error('User is not authenticated');
        }

        try {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            reauthenticateWithCredential(user, credential);
            await deleteUser(user);
            console.log("Account deleted");
            Alert.alert("Success", "Your account has been deleted.");
        } catch (error) {
            console.error('Error deleting account:', error);
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser || null);
            setIsLoadingInitial(false);
            if (user) {
                fetchUserBalance(user.uid);
                fetchUserData(user.uid);
            }
        });
        return unsubscribe; 
    }, [user]);


    const value = useMemo(() => ({
        user, isLoading, login: loginHandler, logout: logoutHandler, register: registerHandler, checkEmailExists, fetchUserBalance, fetchUserData, sendMoney, balance, userData, depositMoney, fetchTransactions, updateUserData, changePassword, changeEmail, sendSupportMessage, deleteAccount
    }), [user, isLoading, balance, userData]);

    return <AuthContext.Provider value={value}>{!isLoadingInitial && children}</AuthContext.Provider>;
};
