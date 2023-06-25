import React from 'react';
import styled from 'styled-components';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';

export interface RecommendationProps {
  id: string;
  priority: number;
  recommendation: string;
}

export const Recommendation = (props: RecommendationProps) => {
  const {recommendation, priority} = props;

  return (
    <Card style={styles.card}>
      <Priority width={priority * 100} />
      <Card.Content style={styles.content}>
        <Text variant="bodyMedium">{recommendation}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 8,
    overflow: 'hidden',
  },
  content: {marginTop: 16},
});

const Priority = styled(View)<{width: number}>`
  width: ${({width}) => `${width}%`};
  height: 100%;
  background-color: blue;
  opacity: 0.1;
  position: absolute;
  z-index: -1;
`;
