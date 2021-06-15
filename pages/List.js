import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import styled from 'styled-components';
import {readAll} from '../net/storage';

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
`;
const Button = styled.Button``;
const ListContainer = styled.ScrollView`
  flex: 1;
`;
const ListItem = styled.View``;
const Hashtags = styled.Text`
  font-size: 18px;
`;
const Img = styled.Image`
  width: 100%;
  height: 360px;
`;

const List = ({navigation}) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    readAll().then(data => setList(data));
  }, []);

  return (
    <>
      <Title>List</Title>
      <ListContainer>
        {list.map(item => {
          console.log(item);
          return (
            <ListItem>
              <Img source={{uri: item.imgUrl}} />
              <Hashtags>{item.hashtags}</Hashtags>
            </ListItem>
          );
        })}
      </ListContainer>
      <Button title="View Page" onPress={() => navigation.navigate('View')} />
      <Button title="New" onPress={() => navigation.navigate('Form')} />
    </>
  );
};

export default List;
