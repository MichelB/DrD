import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Logo from '../../src/assets/diet-doctor-lookup.svg';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { client} from '../../graphql/Client'
import { GetRecipes,GetMemberMealPlans ,createUser } from '../../graphql/Queries'
import AsyncStorage from '@react-native-community/async-storage'
import {
  emailValidator, 
  passwordValidator,
  firstNameValidator,
  lastNameValidator,
  countryValidator,
  taxResidenceValidator,
} from '../core/utils';

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState({ value: '', error: '' });
  const [lastName, setLastName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [country, setCountry] = useState({ value: '', error: '' });
  const [taxResidence, setTaxResidence] = useState({ value: '', error: '' });

  const _onSignUpPressed = () => {
    const firstNameError = firstNameValidator(firstName.value);
    const lastNameError = lastNameValidator(lastName.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const countryError = countryValidator(country.value);
    const taxResidenceError = taxResidenceValidator(taxResidence.value);
    var STORAGE_KEY = 'id_token';
    const createUserVariables = {
      input: {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        country : country.value,
        taxResidence : taxResidence.value,
        communicationPrefs : {
            subscribeMemberEmails : true,
            subscribeNewsletterEmails : true
        }
      }
    }
    if (emailError || passwordError || firstNameError|| countryError || taxResidenceError) {
      setFirstName({ ...firstName, error: firstNameError });
      setLastName({ ...lastName, error: lastNameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setCountry({ ...country, error: countryError });
      setTaxResidence({ ...taxResidence, error: taxResidenceError });
      return;
    }
  
    const _onValueChange = async (item, selectedValue) => {
      try {
        await AsyncStorage.setItem(item, selectedValue);
      } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
      }
    }
    client.mutate({
             mutation: createUser,
             variables: createUserVariables
          })
          .then(response => {
            // console.log('createUser.token ==>', response.data.createUser.token)
            _onValueChange(STORAGE_KEY, response.data.createUser.token),
            navigation.navigate('Dashboard')
          })
          .catch(error => {
            console.log('ERROR ==>', error)
          })

  };
 
  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />
      <Logo />
      <Header>Create Account</Header>

      <TextInput
        label="First Name"
        returnKeyType="next"
        value={firstName.value}
        onChangeText={text => setFirstName({ value: text, error: '' })}
        error={!!firstName.error}
        errorText={firstName.error}
      />
       <TextInput
        label="Last Name"
        returnKeyType="next"
        value={lastName.value}
        onChangeText={text => setLastName({ value: text, error: '' })}
        error={!!lastName.error}
        errorText={lastName.error}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="next"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <TextInput
        label="Country"
        returnKeyType="next"
        value={country.value}
        onChangeText={text => setCountry({ value: text, error: '' })}
        error={!!country.error}
        errorText={country.error}
      />  

      <TextInput
        label="Tax Residence"
        returnKeyType="done"
        value={taxResidence.value}
        onChangeText={text => setTaxResidence({ value: text, error: '' })}
        error={!!taxResidence.error}
        errorText={taxResidence.error}
      /> 

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
