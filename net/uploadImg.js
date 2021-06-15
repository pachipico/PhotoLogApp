import React from 'react';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import axios from 'axios';

const uploadImg = async () => {
  return new Promise((resolve, reject) => {
    let imgUrl;

    let data = new FormData();
    DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    })
      .then(res => {
        let url = RNFS.readFile(res.uri, 'base64');
        return url;
      })
      .then(url => {
        data.append('image', url);
        let config = {
          method: 'post',
          url: 'https://api.imgur.com/3/image',
          headers: {
            Authorization: 'Client-ID 86bcada04a93379',
          },
          data,
        };
        return config;
      })
      .then(config => {
        axios(config).then(function (response) {
          console.log(response.data.data.link);
          resolve(response.data.data.link);
        });
      })
      .catch(error => {
        reject(error.data.data.error);
      });
  });
};

export default uploadImg;
