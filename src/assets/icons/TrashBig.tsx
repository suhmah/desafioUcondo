import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const TrashBig: React.FC = () => {
  return (
    <Svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/Svg">
      <Path d="M6 12H10H42" stroke="#FF6680" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M16 12V8.00002C16 6.93915 16.4214 5.92173 17.1716 5.17159C17.9217 4.42144 18.9391 4.00002 20 4.00002H28C29.0609 4.00002 30.0783 4.42144 30.8284 5.17159C31.5786 5.92173 32 6.93915 32 8.00002V12M38 12V40C38 41.0609 37.5786 42.0783 36.8284 42.8284C36.0783 43.5786 35.0609 44 34 44H14C12.9391 44 11.9217 43.5786 11.1716 42.8284C10.4214 42.0783 10 41.0609 10 40V12H38Z" stroke="#FF6680" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  );
}

export default TrashBig;