import { TouchableOpacity, ScrollView, RefreshControl, View, Text, StyleSheet, Alert } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const HelpButton = () => {
    return <View style={styles.optionButtonHelp}> 
    <View style={styles.icon}>
        <MaterialCommunityIcons name='help-circle' size={42} color='#FDEE00' />
        </View>
        <>
        <Text style={styles.optionButtonText}>Help</Text>
        </>
    </View>
}

const styles = StyleSheet.create({
    optionButtonHelp: {
        alignItems: 'center',
    },

    optionButtonText: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    icon:{
        padding: 1,
        backgroundColor: 'black',
        borderRadius: 50,
    }
});

export default HelpButton;