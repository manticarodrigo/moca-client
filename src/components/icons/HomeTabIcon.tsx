import React from 'react';
import Svg, { Defs, Path, G, Circle, Rect, Mask, Use } from 'react-native-svg';

const white = '#fff';
const washedBlue = '#c5d2dc';
const lightBlue = '#bbe4f2';
const darkBlue = '#57b0cc';

const HomeTabIcon = ({ focused }) => (
  <Svg width={48} height={48}>
    <Defs>
      <Path id="a" d="M0 .148h20.944v24.689H0z" />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Circle fill={focused ? darkBlue : 'none'} cx={24} cy={24} r={24} />
      <G transform="translate(11 11)">
        <Rect width={26} height={26} rx={2} />
        <Path
          d="M13.49 12.732l3.394-3.755c.6-.664-.372-1.66-.974-.993l-3.393 3.755c-.6.664.371 1.66.974.993M8.736 11.793l3.527 3.557c.63.637 1.605-.355.974-.992L9.71 10.8c-.63-.636-1.605.356-.974.993M8.071 19.584c.009 1.686.018 1.678.026 3.364.005.904 1.382.905 1.378 0-.01-1.686-.018-1.678-.027-3.364-.004-.905-1.382-.905-1.377 0"
          fill={focused ? lightBlue : washedBlue}
        />
        <Path
          d="M7.322 21.905c1.654-.009 1.345-.018 2.999-.027.887-.004.888-1.408 0-1.403-1.654.008-1.345.017-2.999.026-.887.005-.888 1.409 0 1.404M13.49 18.513l3.684-3.854c.62-.648-.354-1.641-.973-.993l-3.684 3.854c-.62.647.354 1.641.974.993"
          fill={focused ? lightBlue : washedBlue}
        />
        <G transform="translate(3 1.015)">
          <Mask id="b" fill="#fff">
            <Use href="#a" />
          </Mask>
          <Path
            d="M20.815 8.518c-.887-5.29-5.84-8.212-10.284-8.366a.575.575 0 0 0-.067-.004l-.01.176-.036-.176a.886.886 0 0 0-.123.01c-4 .15-7.436 2.162-9.19 5.383C-1.36 10.073.81 14.633 2.657 17.67c.166.272.43.423.735.413a.948.948 0 0 0 .789-.49c.136-.259.121-.549-.042-.817C2.271 13.705.627 10.074 2.597 6.42c1.475-2.738 4.41-4.426 7.842-4.516 4.12.11 8.532 3.042 8.781 7.757.204 3.867-2.344 8.298-7.582 13.178-.128.084-.303.17-.427.117-.124-.052-.224-.244-.288-.553-.068-.331-.063-.662-.059-1.012L10.89 15a.899.899 0 0 0-.026-.216V5.538c0-1.12-1.721-1.12-1.721 0v11.21l-.013.559c-.035 1.538-.072 3.128.013 4.68.043.784.24 1.842.932 2.428.332.282.693.422 1.078.422.457 0 .949-.199 1.466-.591a.894.894 0 0 0 .215-.147c4.18-3.89 8.959-9.752 7.981-15.58"
            fill={focused ? white : washedBlue}
            mask="url(#b)"
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default HomeTabIcon;
