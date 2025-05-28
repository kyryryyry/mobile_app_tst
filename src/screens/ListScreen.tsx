import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenNames} from '../constants/screenNames';

type RootStackParamList = {
  [ScreenNames.List]: undefined;
  [ScreenNames.ListItem]: {id: number; title: string};
};

type ListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ScreenNames.List
>;

interface ListItem {
  id: number;
  title: string;
}

const mockData: ListItem[] = [
  {id: 1, title: 'First Item'},
  {id: 2, title: 'Second Item'},
  {id: 3, title: 'Third Item'},
  {id: 4, title: 'Fourth Item'},
  {id: 5, title: 'Fifth Item'},
];

const ListScreen = () => {
  const navigation = useNavigation<ListScreenNavigationProp>();

  const renderItem = ({item}: {item: ListItem}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate(ScreenNames.ListItem, item)}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockData}
        renderItem={renderItem}
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
  },
  arrow: {
    fontSize: 24,
    color: '#999',
  },
});

export default ListScreen;