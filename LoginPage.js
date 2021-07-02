import React from 'react';
import { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';





const styles = StyleSheet.create({
    input: {
      marginTop: 20,
      height: 40,
      borderColor: "black",
      borderWidth: 1
    }
})

const LoginPage = ({description}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    
const login = () => {
    if (username === "qazi" && password === "admin"){
        navigation.navigate("Home")
    }
}
  
    return(
    <View>
        <Text>Login Page</Text>
        <TextInput
        
        value={description}
        style={styles.inout}
        placeholder="Enter your username"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.inout}
        secureTextEntry = {true}
        placeholder="Enter your password"
        onChangeText={text => setPassword(text)}
      />
        <Button title="GO back" onPress={() => navigation.goBack()} />
    </View>
  )
}

export default LoginPage;
