import React from 'react';
import styled from 'styled-components';

import {Button, Text} from 'react-native-paper';
import {APP_ROUTES} from '../constants/routes';
import {RootStackParamList} from '../App';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePressUsersForm = () => {
    navigation.navigate(APP_ROUTES.USER_FORM as any);
  };

  const handlePressRecommendations = () => {
    navigation.navigate(APP_ROUTES.RECOMMENDATIONS as any);
  };

  return (
    <Container>
      <Text variant="headlineLarge">Health Recommendations</Text>
      <Text variant="headlineSmall">Proof-of-concept</Text>
      <ButtonsContainer>
        <Button labelStyle={styles.label} onPress={handlePressUsersForm}>
          User creating form
        </Button>
        <Button labelStyle={styles.label} onPress={handlePressRecommendations}>
          Recommendations
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
  },
});

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ButtonsContainer = styled(View)`
  margin-top: 64px;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
