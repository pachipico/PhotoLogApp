import React from 'react';
import {useState} from 'react';
import {Switch, Text} from 'react-native';
import {withContext} from 'context-q';

const Settings = ({context}) => {
  const [checked, setChecked] = useState(context.showDate);
  return (
    <>
      <Text>Show Date</Text>
      <Switch
        value={checked}
        onValueChange={() => {
          setChecked(!checked);
          context.update({
            showDate: !checked,
          });
        }}
      />
    </>
  );
};

export default withContext(Settings);
