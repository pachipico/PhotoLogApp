import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import styled from 'styled-components';
import {readAll} from '../net/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {withContext} from 'context-q';
import moment from 'moment';

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
`;
const Button = styled.Button``;
const ListContainer = styled.ScrollView`
  flex: 1;
`;
const ListItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-bottom-width: 1px;
  border-bottom-color: #e5e5e5;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Hashtags = styled.Text``;
const Thumbnail = styled.Image`
  width: 80px;
  height: 80px;
  margin-right: 12px;
`;
const Date = styled.Text`
  font-size: 14px;
  color: #aaaaaa;
  margin-right: 12px;
`;

const List = ({navigation, context}) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const refresh = navigation.addListener('focus', e => {
      readAll().then(data => setList(data));
    });
    readAll().then(data => setList(data));
    return () => refresh();
  }, [navigation]);

  return (
    <>
      <ListContainer>
        {list.map(item => {
          return (
            <ListItem
              key={item.id}
              onPress={() => {
                navigation.navigate('View', {id: item.id});
              }}>
              <Row>
                <Thumbnail source={{url: item.imgUrl}} />
                <Hashtags>{item.hashtags}</Hashtags>
              </Row>
              <Date>
                {context.showDate && moment(item?.id, 'x').format('YYYY-MM-DD')}
              </Date>
            </ListItem>
          );
        })}
      </ListContainer>

      <Button title="New" onPress={() => navigation.navigate('Form')} />
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <Button title="Clear" onPress={() => AsyncStorage.clear()} />
    </>
  );
};

export default withContext(List);
