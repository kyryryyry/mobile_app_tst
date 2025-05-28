import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../constants/screenNames';
import {Article} from '../types/Article';
import {useArticles} from '../hooks/useArticles';
import {GenericNavigation} from '../types/navigation';


const ListScreen = () => {
  const navigation = useNavigation<GenericNavigation<ScreenNames.List>>();
  const {articles, loading, error} = useArticles();

  const renderItem = ({item}: {item: Article}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate(ScreenNames.ListItem, {id: item.id})}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

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

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={renderItem}
        initialNumToRender={12}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
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
  listContent: {
    paddingVertical: 16,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  arrow: {
    fontSize: 24,
    color: '#999',
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default ListScreen;
