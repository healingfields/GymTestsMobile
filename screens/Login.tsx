import React from "react"
import { Formik } from "formik"
import { SafeAreaView, TextInput, Button, View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native"
import { NavigationProp } from "@react-navigation/native"
import { saveToken } from "../services/keychainService"

interface LoginInfos {
  userName: string,
  password: string
}

const intialValues: LoginInfos = { userName: '', password: '' }

const handleSubmit = async (values: LoginInfos, navigation: NavigationProp<any>) => {
  // handle submitting
  try {
    const response = await fetch('http://10.0.2.2:8080/login',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(values)
      });

    if (!response.ok) {
      const errorText = `Error ${response.status}: ${response.statusText}`;
      console.log(errorText);
      throw new Error('invalid credentials')
    }
    const data = await response.json();
    const token = data.jwt;
    console.log(token);
    await saveToken(token)
    navigation.navigate('home', { token });
  } catch (error) {
    console.log(error);
    Alert.alert('login failed ' + error);
  }
}

function Login({ navigation }: { navigation: NavigationProp<any> }): React.JSX.Element {
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.header}>Login</Text>
      </View>
      <Formik
        initialValues={intialValues}
        onSubmit={(values) => handleSubmit(values, navigation)}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <SafeAreaView style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder='userName'
              value={values.userName}
              onBlur={handleBlur('userName')}
              onChangeText={handleChange('userName')}>
            </TextInput>
            <TextInput
              style={styles.input}
              placeholder='password'
              value={values.password}
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}>
            </TextInput>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </SafeAreaView>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    fontSize: 50,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 120,
    color: 'gray',
    fontWeight: '900'

  },
  input: {
    height: 60,
    width: 300,
    fontSize: 25,
    marginBottom: 35,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  form: {
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 1
  },
  separator: {
    marginVertical: 8,
  }
})

export default Login;
