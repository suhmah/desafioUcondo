import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Search: React.FC = () => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#C4C4D1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M17.5 17.5L13.875 13.875" stroke="#C4C4D1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  );
}

export default Search;