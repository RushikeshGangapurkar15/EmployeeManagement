import React from 'react';
import {View} from 'react-native';
import {Svg, Path, Rect, Circle, Mask} from 'react-native-svg';
import {COLORS} from './theme/theme';

export const NextArrow = ({width, height, color}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={color}
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L17.7071 9.29289C18.0976 9.68342 18.0976 10.3166 17.7071 10.7071L13.7071 14.7071C13.3166 15.0976 12.6834 15.0976 12.2929 14.7071C11.9024 14.3166 11.9024 13.6834 12.2929 13.2929L14.5858 11H3C2.44772 11 2 10.5523 2 10C2 9.44772 2.44772 9 3 9H14.5858L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z"
        fill={color}
      />
    </Svg>
  );
};

export const CloseEye = ({width, height, color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 20" fill="none">
      <Path
        d="M11 6.5C10.2044 6.5 9.44129 6.81607 8.87868 7.37868C8.31607 7.94129 8 8.70435 8 9.5C8 10.2956 8.31607 11.0587 8.87868 11.6213C9.44129 12.1839 10.2044 12.5 11 12.5C11.7956 12.5 12.5587 12.1839 13.1213 11.6213C13.6839 11.0587 14 10.2956 14 9.5C14 8.70435 13.6839 7.94129 13.1213 7.37868C12.5587 6.81607 11.7956 6.5 11 6.5ZM11 14.5C9.67392 14.5 8.40215 13.9732 7.46447 13.0355C6.52678 12.0979 6 10.8261 6 9.5C6 8.17392 6.52678 6.90215 7.46447 5.96447C8.40215 5.02678 9.67392 4.5 11 4.5C12.3261 4.5 13.5979 5.02678 14.5355 5.96447C15.4732 6.90215 16 8.17392 16 9.5C16 10.8261 15.4732 12.0979 14.5355 13.0355C13.5979 13.9732 12.3261 14.5 11 14.5ZM11 2C6 2 1.73 5.11 0 9.5C1.73 13.89 6 17 11 17C16 17 20.27 13.89 22 9.5C20.27 5.11 16 2 11 2Z"
        fill={color}
      />
      <Mask id="path-2-inside-1_1024_6411" fill="white">
        <Path d="M1 17.0822L19.7166 0.185851L21.4856 2.14548L2.76905 19.0418L1 17.0822Z" />
      </Mask>
      <Path
        d="M1 17.0822L19.7166 0.185851L21.4856 2.14548L2.76905 19.0418L1 17.0822Z"
        fill={color}
      />
      <Path
        d="M20.1454 0.660924L1.42887 17.5573L4.10923 20.5264L22.8258 3.63004L20.1454 0.660924Z"
        fill="white"
        mask="url(#path-2-inside-1_1024_6411)"
      />
    </Svg>
  );
};
export const EyeComponent = ({width, height, color}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 22 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M11 4.5C10.2044 4.5 9.44129 4.81607 8.87868 5.37868C8.31607 5.94129 8 6.70435 8 7.5C8 8.29565 8.31607 9.05871 8.87868 9.62132C9.44129 10.1839 10.2044 10.5 11 10.5C11.7956 10.5 12.5587 10.1839 13.1213 9.62132C13.6839 9.05871 14 8.29565 14 7.5C14 6.70435 13.6839 5.94129 13.1213 5.37868C12.5587 4.81607 11.7956 4.5 11 4.5ZM11 12.5C9.67392 12.5 8.40215 11.9732 7.46447 11.0355C6.52678 10.0979 6 8.82608 6 7.5C6 6.17392 6.52678 4.90215 7.46447 3.96447C8.40215 3.02678 9.67392 2.5 11 2.5C12.3261 2.5 13.5979 3.02678 14.5355 3.96447C15.4732 4.90215 16 6.17392 16 7.5C16 8.82608 15.4732 10.0979 14.5355 11.0355C13.5979 11.9732 12.3261 12.5 11 12.5ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0Z"
        fill={color}
      />
    </Svg>
  );
};

export const BackIcon = ({width, height, color}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect x="0.5" y="0.5" width="35" height="35" rx="17.5" fill="white" />
      <Rect x="0.5" y="0.5" width="35" height="35" rx="17.5" stroke="#EDEDED" />
      <Path
        d="M20.5 23.8333L14.6667 18L20.5 12.1667"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
export const EditIcon = () => {
  return (
    <View style={{width: 24, height: 24}}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        stroke={COLORS.primaryOrangeHex}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </Svg>
    </View>
  );
};

export const LogoutIcon = () => {
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32">
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M23.93,25v3h-16V4h16V7h2V3a1,1,0,0,0-1-1h-18a1,1,0,0,0-1,1V29a1,1,0,0,0,1,1h18a1,1,0,0,0,1-1V25Z"
      />
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15.92,16,28.92,16"
      />
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M28.92,16,24.92,20"
      />
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M28.92,16,24.92,12"
      />
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M24.92,8.09,24.92,6.09"
      />
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M24.92,26,24.92,24"
      />
    </Svg>
  );
};
