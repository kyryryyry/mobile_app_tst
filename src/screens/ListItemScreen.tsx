import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ScreenNames} from '../constants/screenNames';

type RootStackParamList = {
  [ScreenNames.List]: undefined;
  [ScreenNames.ListItem]: {id: number; title: string};
};

type ListItemScreenRouteProp = RouteProp<RootStackParamList, ScreenNames.ListItem>;

const ListItemScreen = () => {
  const route = useRoute<ListItemScreenRouteProp>();
  const {id, title} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{id}</Text>

        <Text style={styles.label}>Title:</Text>
        <Text style={styles.value}>{title}</Text>

        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            This is a detailed view for the selected item. In a real app, this
            would contain more information fetched from an API or local storage.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 16,
  },
  value: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
    marginTop: 4,
  },
  description: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default ListItemScreen;
