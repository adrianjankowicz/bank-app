import { AuthContext, AuthProvider } from './providers/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';


import StartPage from './src/screens/StartPage';
import LoginPage from './src/screens/LoginPage';
import EmailPage from './src/screens/EmailPage';
import PasswordPage from './src/screens/PasswordPage';
import NamePage from './src/screens/NamePage';
import MainPage from './src/screens/MainPage';
import SendPage from './src/screens/SendPage';
import HistoryPage from './src/screens/HistoryPage';
import DepositPage from './src/screens/DepositPage';

import { useAuth } from './hooks/useAuth';
import { useContext, useEffect } from 'react';
import SuccesfulPayment from './src/screens/SuccesfulPayment';
import SuccesfulDeposit from './src/screens/SuccesfulDeposit';
import HelpPage from './src/screens/HelpPage';
import ChangePasswordPage from './src/screens/ChangePasswordPage';
import UpdatePersonalData from './src/screens/UpdatePersonalDataPage';
import ChangeEmailPage from './src/screens/ChangeEmailPage';
const Stack = createNativeStackNavigator();

const App = () => {

  const Navigation = () => {
    const { user, isRegistered, setIsRegistered } = useContext(AuthContext);
    return user && !isRegistered ? <AppStack /> : <AuthStack />

  };



  const AppStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainPage" component={MainPage} />
      <Stack.Screen name="SendPage" component={SendPage} />
      <Stack.Screen name="DepositPage" component={DepositPage} />
      <Stack.Screen name="HistoryPage" component={HistoryPage} />
      <Stack.Screen name="SuccesfulPayment" component={SuccesfulPayment} />
      <Stack.Screen name="SuccesfulDeposit" component={SuccesfulDeposit} />
      <Stack.Screen name="HelpPage" component={HelpPage} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordPage} />
      <Stack.Screen name="UpdatePersonalData" component={UpdatePersonalData} />
      <Stack.Screen name="ChangeEmail" component={ChangeEmailPage} />
    </Stack.Navigator>
  );

  const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StartPage" component={StartPage} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="EmailPage" component={EmailPage} />
      <Stack.Screen name="NamePage" component={NamePage} />
      <Stack.Screen name="PasswordPage" component={PasswordPage} />
    </Stack.Navigator>
  );

  return (
    <AuthProvider>
      <NavigationContainer>
      <StatusBar style="black" backgroundColor="#6a51ae" />
        <Navigation />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
