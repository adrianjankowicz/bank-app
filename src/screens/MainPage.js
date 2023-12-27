import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import { useContext, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../hooks/useAuth';


const Tab = createBottomTabNavigator();

const MainPage = ({ navigation }) => {
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState();

  const signOut = () => {
    setIsLoading(true);
    logout();
    setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topBar}>
          <Image style={styles.logo} source={require('../../assets/img/logo.png')} />
          {isLoading ? 
        <ActivityIndicator size="large" color="green" />
       :<TouchableOpacity onPress={signOut} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
            <MaterialCommunityIcons name="logout" size={22} color="#fff" />
          </TouchableOpacity>}
        </View>
      </View>


      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            }
            else if (route.name === 'Profile') {
              iconName = focused ? 'account' : 'account-outline';
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          // tabBarActiveBackgroundColor: 'tomato', // Kolor tła aktywnej zakładki
          // tabBarInactiveBackgroundColor: 'gray', // Kolor tła nieaktywnej zakładki
          tabBarLabelStyle: {
            fontSize: 13,
          },
          tabBarActiveTintColor: 'green', 
          tabBarInactiveTintColor: 'grey',
        })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },

  content: {
    position: 'relative',
    marginTop: 50,
    marginHorizontal: 15,

  },
  nav: {
    position: 'absolute',
    bottom: 5,
  },

  logoutButton: {
    backgroundColor: 'green', 
    // paddingHorizontal: 20,
    width: 100,
    paddingVertical: 10,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff'
  },

  topBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 60
  },

});


export default MainPage