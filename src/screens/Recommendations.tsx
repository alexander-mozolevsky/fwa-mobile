import React, {useState} from 'react';
import styled from 'styled-components';

import {ActivityIndicator, Button, Text, TextInput} from 'react-native-paper';
import {
  Alert,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import {
  Recommendation,
  RecommendationProps,
} from '../components/recommendation';
import {request} from '../utils/request';

export const RecommendationsScreen = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationProps[]>(
    [],
  );

  const handlePressReGenerate = async () => {
    try {
      setLoading(true);

      const data = await request<{recommendations: RecommendationProps[]}>({
        path: `/recommendations?username=${username}`,
        method: 'GET',
      });

      setRecommendations(data.recommendations);
    } catch (error: any) {
      Alert.alert(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePressHistory = async () => {
    try {
      setLoading(true);
      const data = await request<{recommendations: RecommendationProps[]}>({
        path: `/recommendations/history?username=${username}`,
        method: 'GET',
      });

      setRecommendations(data.recommendations);
    } catch (error: any) {
      Alert.alert(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Text variant="bodySmall" style={styles.hint}>
        Provide username, if you want to get last recommendations - press
        "History", if you want to generate new recommendations - press
        "Re-generate"
      </Text>
      <TextInput
        label="Username"
        mode="outlined"
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
      />
      <ButtonsContainer>
        <Button
          labelStyle={styles.label}
          onPress={handlePressReGenerate}
          mode="contained-tonal"
          disabled={!username}>
          Re-generate
        </Button>
        <Button onPress={handlePressHistory} disabled={!username}>
          History
        </Button>
      </ButtonsContainer>
      <ListContainer>
        {loading ? (
          <ActivityIndicator animating size={'large'} />
        ) : !recommendations.length ? (
          <Text variant="bodyMedium" style={styles.empty}>
            {`No recommendations yet,\ntry to load new`}
          </Text>
        ) : (
          <FlatList
            data={recommendations}
            renderItem={({
              item,
              index,
            }: ListRenderItemInfo<RecommendationProps>) => (
              <Recommendation key={item.id || index} {...item} />
            )}
            style={styles.list}
          />
        )}
      </ListContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  hint: {
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
  },
  input: {
    width: '100%',
    marginTop: 16,
  },
  empty: {
    textAlign: 'center',
  },
  list: {
    width: '100%',
    padding: 8,
  },
});

const Container = styled(View)`
  flex: 1;
  align-items: center;
  padding: 24px;
`;

const ButtonsContainer = styled(View)`
  margin-top: 24px;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ListContainer = styled(View)`
  flex: 1;
  margin-top: 16px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
