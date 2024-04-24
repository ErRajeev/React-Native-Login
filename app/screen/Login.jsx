import {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {FIREBASE_AUTH} from '../../FirebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const auth = FIREBASE_AUTH;

  const signin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      Alert.alert('Login Successful');
    } catch (err) {
      console.error(err);
      setError('Login Failed: ' + err.message);
      Alert.alert('Login Failed', err.message);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  const signup = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(response);
      Alert.alert('Signup Successful');
    } catch (err) {
      console.error(err);
      setError('Signup Failed: ' + err.message);
      Alert.alert('Signup Failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry={true}
      />
      <Button
        title={loading ? 'Loading...' : 'Login'}
        onPress={signin}
        disabled={loading}
      />
      <Button
        title={loading ? 'Loading...' : 'Create Account'}
        onPress={signup}
        disabled={loading}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    color: 'black',
    fontSize: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color: '#000000',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default Login;
