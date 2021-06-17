import React from 'react';
import {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uploadImg from '../net/uploadImg';
import {append} from '../net/storage';

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
`;
const Button = styled.Button``;
const Image = styled.Image`
  width: 100%;
  height: 360px;
`;
const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  font-size: 16px;
  padding: 4px;
  border: 1px solid #e5e5e5;
`;

const Form = ({navigation}) => {
  const [hashtags, setHashtags] = useState('');
  const [imgUrl, setImgUrl] = useState('https://placeimg.com/640/480/any');
  const [logList, setLogList] = useState([]);

  return (
    <>
      <Button
        title="Select Image"
        onPress={() => {
          uploadImg()
            .then(response => {
              setImgUrl(response);
            })
            .catch(error => console.log(error));
        }}
      />
      <Image
        source={{
          uri: imgUrl,
        }}
      />
      <Input
        autoCorrect={false}
        placeholder="#hashtag"
        value={hashtags}
        onChangeText={text => setHashtags(text)}
      />
      <Button
        title="Save"
        onPress={() => {
          const newLog = {hashtags, imgUrl};
          append(newLog).then(navigation.goBack());
        }}
      />
    </>
  );
};

export default Form;
