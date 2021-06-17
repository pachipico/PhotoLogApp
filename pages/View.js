import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import styled from 'styled-components';
import {readById} from '../net/storage';
import ActivityIndicator from 'react-native';
import {withContext} from 'context-q';
import moment from 'moment';

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
`;
const Img = styled.Image`
  width: 100%;
  height: 360px;
`;
const Hashtags = styled.Text`
  font-size: 18px;
`;
const Date = styled.Text`
  color: #aaaaaa;
  font-size: 12px;
  text-align: right;
`;

const View = ({route, context}) => {
  const [item, setItem] = useState(null);
  useEffect(() => {
    readById(route.params.id).then(data => setItem(data));
  }, []);

  return (
    <>
      {item?.imgUrl && <Img source={{uri: item?.imgUrl}} />}
      <Date>
        {context.showDate && moment(item?.id, 'x').format('YYYY-MM-DD')}
      </Date>
      <Title>{item?.hashtags}</Title>
    </>
  );
};

export default withContext(View);
