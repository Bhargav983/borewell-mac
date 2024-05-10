import React from 'react';
import { View, Text } from 'react-native';

const NoTanks = ({ marginTop = 0, msg = "There are no tanks associated with this device." }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop }}>
      <Text style={{ fontSize: 18, textAlign: 'center', color: 'black' }}>
        {msg}
      </Text>
    </View>
  );
};

export default NoTanks;
