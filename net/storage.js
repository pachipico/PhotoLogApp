import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import _ from 'lodash';

const KEY = 'photo-logs';

const read = async key => {
  let data = await AsyncStorage.getItem(key);
  let json = [];
  if (data !== null) {
    json = JSON.parse(data);
  }
  return json;
};

export const store = async value => {
  await AsyncStorage.setItem(KEY, value);
};

export const readAll = async () => {
  const data = await read(KEY);
  return data;
};

export const readById = async id => {
  const data = await read(KEY);
  return _.find(data, item => item.id === id);
};

export const append = async value => {
  const data = await read(KEY);
  data.push({
    ...value,
    id: new Date().getTime().toString(),
  });

  return store(JSON.stringify(data));
};
