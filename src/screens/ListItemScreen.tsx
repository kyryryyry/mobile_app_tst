import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {ScreenNames} from '../constants/screenNames';
import {useArticle} from '../hooks/useArticle';
import {GenericRoute} from '../types/navigation';

const ListItemScreen = () => {
  const route = useRoute<GenericRoute<ScreenNames.ListItem>>();
  const {id} = route.params;
  const {article, loading, error} = useArticle(id);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!article) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Article not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{article.id}</Text>

        <Text style={styles.label}>User ID:</Text>
        <Text style={styles.value}>{article.userId}</Text>

        <Text style={styles.label}>Title:</Text>
        <Text style={styles.value}>{article.title}</Text>

        <Text style={styles.label}>Body:</Text>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{article.body}</Text>
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default ListItemScreen;
