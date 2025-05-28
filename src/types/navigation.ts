import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator.tsx';

export type AvailableScreens = keyof RootStackParamList;

export type GenericNavigation<T extends AvailableScreens> = NativeStackNavigationProp<
  RootStackParamList,
  T
>;

export type GenericRoute<T extends AvailableScreens> = RouteProp<RootStackParamList, T>;
