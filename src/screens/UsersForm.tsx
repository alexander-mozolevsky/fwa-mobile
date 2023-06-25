import React, {useState} from 'react';
import styled from 'styled-components';
import {Button, Text, TextInput} from 'react-native-paper';
import {Alert, StyleSheet, View} from 'react-native';
import {request} from '../utils/request';

export const UsersFormScreen = () => {
  const [username, setUsername] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [dob, setDob] = useState<string>('1615876858');

  const handlePressCreate = async () => {
    try {
      await request({
        path: '/users',
        body: JSON.stringify({
          username,
          height,
          weight,
          dob,
        }),
        method: 'POST',
      });

      Alert.alert('Success, we have created new user');
    } catch (error: any) {
      Alert.alert(error?.message);
    }
  };

  const handlePressUpdate = async () => {
    try {
      await request({
        path: `/users?username=${username}`,
        body: JSON.stringify({
          username,
          height,
          weight,
          dob,
        }),
        method: 'PUT',
      });

      Alert.alert("Success, we have updated user's data");
    } catch (error: any) {
      Alert.alert(error?.message);
    }
  };

  const isDisabled = !username || !height || !weight || !dob;

  return (
    <Container>
      <Text variant="bodySmall" style={styles.topHint}>
        Simulate user "registration" in the application
      </Text>
      <TextInput
        label={'Username'}
        mode="outlined"
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
      />
      <TextInput
        label={'Height'}
        mode="outlined"
        onChangeText={setHeight}
        style={styles.input}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
      />
      <TextInput
        label={'Weight'}
        mode="outlined"
        onChangeText={setWeight}
        style={styles.input}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
      />
      <TextInput
        label={'Date of birth'}
        mode="outlined"
        onChangeText={setDob}
        style={styles.input}
        defaultValue="1615876858"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
      />
      <Button
        style={styles.button}
        labelStyle={styles.label}
        onPress={handlePressCreate}
        disabled={isDisabled}
        mode="contained-tonal">
        Create new user
      </Button>
      <Text variant="bodySmall" style={styles.hint}>
        In case you want to update the user's data, to get new recommendations -
        provide apropriate username and press the button below
      </Text>
      <Button
        labelStyle={styles.button}
        onPress={handlePressUpdate}
        disabled={isDisabled}>
        Update user data
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginBottom: 16,
  },
  button: {
    marginTop: 24,
  },
  label: {
    fontSize: 18,
  },
  hint: {
    marginTop: 32,
    textAlign: 'center',
    marginBottom: 8,
  },
  topHint: {
    marginBottom: 16,
  },
});

const Container = styled(View)`
  flex: 1;
  align-items: center;
  padding: 24px;
`;
