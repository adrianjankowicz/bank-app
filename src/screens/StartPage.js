import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import MasterCardLogo from '../components/MasterCardLogo'
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';

const StartPage = ({ navigation }) => {

    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'CourierPrime-Regular': require('../../assets/fonts/CourierPrime-Regular.ttf'),
                // Załaduj więcej czcionek tutaj jeśli potrzebujesz
            });
            setFontsLoaded(true);
        }
        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return <View><Text>Loading...</Text></View>;
    }

    return (
        <View style={styles.container}>
            <View >
                <Text style={styles.title}>Welcome to JBank</Text></View>
            <View style={styles.cards}>
                <Image style={styles.card1} source={require('../../assets/img/card-background1.jpeg')} />
                <Image style={styles.card1_logo} source={require('../../assets/img/logo2.png')} />
                <Text style={styles.card1_number}>1234 5678 9012 2345</Text>
                <Text style={styles.card1_name}>John Smith</Text>
                <Text style={styles.card1_expDate}>09/26</Text>
                <MasterCardLogo style={styles.card1_mastercardLogo} />
                <Image style={styles.card2} source={require('../../assets/img/card-background2.jpeg')} />
                <Image style={styles.card2_logo} source={require('../../assets/img/logo2.png')} />
                <Text style={styles.card2_number}>1234 5678 9012 2345</Text>
                <Text style={styles.card2_name}>John Smith</Text>
                <Text style={styles.card2_expDate}>09/26</Text>
                <MasterCardLogo style={styles.card2_mastercardLogo} />
            </View>
            <View ><Text style={styles.description}>Easy to manage money</Text></View>
            <View style={styles.description2}><Text>Transfer and receive your money easily with JBank</Text></View>
            <TouchableOpacity
                    onPress={() => navigation.navigate('EmailPage')}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
        </View>
    )
}

export default StartPage

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    title: {
        fontSize: 44,
        fontWeight: 'bold',
        color: 'purple',
        marginTop: 30
    },
    description: {
        fontSize: 28,
        marginBottom: 10
    },
    description2: {
        fontSize: 15,
        marginBottom: 80
    },
    button: {
        width: '90%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        position: 'absolute',
        bottom: 60,
        backgroundColor: '#05BE71',
    },
      buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
    cards: {
        height: 550,

    },

    card1: {
        width: 360,
        height: 220,
        transform: [
            {
                rotate: '-12.828deg',
            }
        ],
        flexShrink: 0,
        borderRadius: 16,
        zIndex: 2,
        position: 'absolute',
        left: -260,
        top: 160,
    },
    card1_logo: {
        width: 60,
        height: 40,
        transform: [
            {
                rotate: '-12.828deg',
            }
        ],
        zIndex: 3,
        position: 'absolute',
        left: 10,
        top: 150,
    },
    card1_number: {
        zIndex: 3,
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'CourierPrime-Regular',
        position: 'absolute',
        top: 290,
        left: -230,
        transform: [
            {
                rotate: '-12.828deg',
            }
        ],
    },
    card1_name: {
        zIndex: 3,
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'CourierPrime-Regular',
        position: 'absolute',
        top: 330,
        left: -215,
        transform: [
            {
                rotate: '-12.828deg',
            }
        ],
    },
    card1_expDate: {
        zIndex: 3,
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'CourierPrime-Regular',
        position: 'absolute',
        top: 290,
        left: -30,
        transform: [
            {
                rotate: '-12.828deg',
            }
        ],
    },
    card1_mastercardLogo: {
        zIndex: 3,
        position: 'absolute',
        top: 230,
        left: 10,
        transform: [
            {
                rotate: '-12.828deg',
            }
        ],
    },
    card2: {
        width: 380,
        height: 220,
        transform: [
            {
                rotate: '-12.828deg',
            }
        ],
        flexShrink: 0,
        borderRadius: 16,
        zIndex: 1,
        position: 'absolute',
        left: -200,
        top: 240,
    },
    card2_logo: {
        width: 60,
        height: 40,
        transform: [
            {
                rotate: '-12.828deg',
            }
        ],
        zIndex: 1,
        position: 'absolute',
        left: 85,
        top: 230,
    },
    card2_number: {
        zIndex: 1,
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'CourierPrime-Regular',
        position: 'absolute',
        top: 380,
        left: -160,
        transform: [
            {
                rotate: '-12.828deg',
            }
        ],
    },
    card2_name: {
        zIndex: 3,
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'CourierPrime-Regular',
        position: 'absolute',
        top: 420,
        left: -140,
        transform: [
            {
                rotate: '-12.828deg',
            }
        ],
    },
    card2_expDate: {
        zIndex: 3,
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'CourierPrime-Regular',
        position: 'absolute',
        top: 385,
        left: 30,
        transform: [
            {
                rotate: '-12.828deg',
            }
        ],
    },
    card2_mastercardLogo: {
        zIndex: 1,
        position: 'absolute',
        top: 310,
        left: 90,
        transform: [
            {
                rotate: '-12.828deg',
            }
        ],
    },
})
