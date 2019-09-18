import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

import { Colors } from '@src/styles';

const AfternoonIcon = ({ focused }) => (
  <Svg width="35px" height="28px" viewBox="0 0 35 28">
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G
        id="Assets"
        transform="translate(-216.000000, -1316.000000)"
        fill={focused ? Colors.white : '#57B0CC'}
        fillRule="nonzero"
      >
        <G id="lunch" transform="translate(216.000000, 1316.000000)">
          <Path
            d="M20.8774146,13.3969756 C20.4826146,13.3969756 20.1624585,13.7170976 20.1624585,14.1119317 C20.1624585,14.5067659 20.4825805,14.8268878 20.8774146,14.8268878 C21.2722488,14.8268878 21.5923707,14.5067659 21.5923707,14.1119317 C21.5923707,13.7157659 21.2722488,13.3969756 20.8774146,13.3969756 Z M18.0176585,14.825522 C17.6228585,14.825522 17.3027024,15.1456439 17.3027024,15.540478 C17.3027024,15.9353122 17.6228244,16.2554341 18.0176585,16.2554341 C18.4124927,16.2554341 18.7326146,15.9353122 18.7326146,15.540478 C18.7326146,15.1456439 18.4124927,14.825522 18.0176585,14.825522 Z M33.511561,19.2884488 C33.2901424,19.0857049 32.9646732,18.7002098 32.6539073,18.3094049 C32.8753259,18.1880249 33.0274,17.955922 33.0274,17.6851756 C33.0274,14.078639 28.6324244,11.2520049 23.0208146,11.2520049 C17.4092049,11.2520049 13.0142293,14.0770683 13.0142293,17.6851756 C13.0142293,17.8345659 13.0609141,17.9746205 13.1396112,18.0893317 L12.5647234,18.8923171 C12.5020341,18.9683473 12.4340078,19.0550449 12.3646463,19.1497498 L12.9435293,9.46618878 L13.1689498,9.46618878 C13.5637498,9.46618878 13.8839059,9.14606683 13.8839059,8.75123268 L13.8839059,6.32096927 C13.8839059,5.92616927 13.5637839,5.60601317 13.1689498,5.60601317 L7.96436439,5.60601317 L9.00876439,0.385379024 L7.60688634,0.105273171 L6.5064522,5.60590732 L1.01776927,5.60590732 C0.622969268,5.60590732 0.302813171,5.92602927 0.302813171,6.32086341 L0.302813171,8.75112683 C0.302813171,9.12325366 0.588256098,9.42606341 0.951047317,9.45939024 L2.00077415,27.0194878 C2.02344937,27.3969756 2.33556878,27.6919297 2.71436439,27.6919297 L11.1802668,27.6919297 C11.5590863,27.6919297 11.8711839,27.3969824 11.8938571,27.0194878 L12.2219829,21.5335366 C12.3953815,21.6429107 12.6301341,21.7256098 12.9582463,21.7256098 C12.9635817,21.7256098 12.9915923,21.724276 13.0142668,21.724276 L13.0142668,23.0314321 C13.0142668,23.2621862 13.0916288,23.468915 13.2170107,23.6223345 C13.0929639,23.7503833 13.0142668,23.9264487 13.0142668,24.118515 C13.0142668,26.0885882 14.61754,27.6919297 16.5876815,27.6919297 L29.4540229,27.6919297 C31.4240961,27.6919297 33.0274376,26.0886565 33.0274376,24.118515 C33.0274376,23.9251067 32.9500756,23.7503833 32.8246937,23.6223345 C32.9487405,23.4689423 33.0274376,23.2621931 33.0274376,23.0314321 L33.0274376,21.724276 C33.2982078,21.724276 34.1238424,21.724276 34.3839693,21.0560321 C34.6600732,20.3451053 33.9971595,19.7341931 33.5116327,19.2886858 L33.511561,19.2884488 Z M10.5068293,26.2618146 L3.388,26.2618146 L2.38361951,9.4648878 L11.5109366,9.4648878 L10.5068293,26.2618146 Z M1.73292683,8.03620488 L1.73292683,7.0344878 L12.4541951,7.0344878 L12.4541951,8.03620488 L1.73292683,8.03620488 Z M23.021122,12.6818146 C27.2545854,12.6818146 30.8908293,14.5825366 31.5071707,16.9702537 L14.5354146,16.9702537 C15.1516537,14.5826732 18.7876585,12.6818146 23.0214634,12.6818146 L23.021122,12.6818146 Z M16.5879512,26.2618146 C15.6555854,26.2618146 14.8606244,25.6642537 14.565839,24.8319366 L24.744522,24.8319366 L25.8022732,26.2618146 L16.5879512,26.2618146 Z M25.4779512,23.4033902 L28.8939512,23.4033902 L27.2199951,25.7749561 L25.4779512,23.4033902 Z M29.4542927,26.2618146 L28.6366585,26.2618146 L29.6944098,24.8319366 L31.476439,24.8319366 C31.1816605,25.6642537 30.385361,26.2618146 29.4543268,26.2618146 L29.4542927,26.2618146 Z M31.597761,22.1816683 L14.4446878,22.1816683 L14.4446878,21.1839463 C14.4967063,21.1452654 14.5460615,21.1079161 14.594078,21.0692351 L16.3053902,21.0692351 C16.6761854,21.388022 17.1830537,21.7228302 18.0180341,21.7228302 C18.8530146,21.7228302 19.3518585,21.3867005 19.717361,21.0692351 L21.325961,21.0692351 C21.6900976,21.3866902 22.1889415,21.7228302 23.0226244,21.7228302 C23.8509463,21.7228302 24.3418,21.3747083 24.6806,21.0692351 L26.3612488,21.0692351 C26.6987102,21.3773512 27.1909024,21.7228302 28.0272146,21.7228302 C28.8635268,21.7228302 29.3690634,21.3773717 29.7185171,21.0692351 L31.4044927,21.0692351 C31.4658502,21.1212537 31.5325415,21.1746073 31.6018995,21.227961 L31.5992317,22.1816683 L31.597761,22.1816683 Z M30.5266927,19.1005073 C29.7170488,19.1005073 29.2648829,19.5313317 28.9340732,19.8461268 C28.6419615,20.124901 28.4658927,20.2942976 28.0243805,20.2942976 C27.602878,20.2942976 27.4494927,20.1435722 27.170722,19.8701317 C26.8399293,19.5460078 26.3877463,19.101839 25.5234341,19.101839 C24.6577561,19.101839 24.2002634,19.5460146 23.8667902,19.8714634 C23.5866844,20.1449005 23.4333024,20.2942976 23.021122,20.2942976 C22.5822732,20.2942976 22.3982244,20.1222307 22.0914195,19.8368049 C21.75796,19.5273537 21.3031171,19.1018732 20.5188098,19.1018732 C19.7345024,19.1018732 19.2810049,19.526039 18.9488634,19.8368049 C18.6434141,20.1222478 18.4580098,20.2942976 18.0178293,20.2942976 C17.5669951,20.2942976 17.3629024,20.1062263 17.0534683,19.8234537 C16.7226756,19.5180044 16.2704927,19.101839 15.5155512,19.101839 C14.7525854,19.101839 14.2484146,19.5099902 13.8429268,19.8381024 C13.674862,19.9741551 13.5374776,20.0835293 13.409439,20.1608912 C13.4934698,20.0301756 13.5935083,19.8914561 13.6962137,19.7647254 L14.6752576,18.4002034 L30.920038,18.4002034 C31.1347878,18.6883132 31.4735844,19.1338034 31.8190429,19.5473156 C31.5002561,19.3112244 31.0907698,19.1004766 30.5265356,19.1004766 L30.5266927,19.1005073 Z M28.0244146,14.8253854 C27.6296146,14.8253854 27.3094585,15.1455073 27.3094585,15.5403415 C27.3094585,15.9351756 27.6295805,16.2552976 28.0244146,16.2552976 C28.4192488,16.2552976 28.7393707,15.9351756 28.7393707,15.5403415 C28.7393707,15.1455073 28.4205839,14.8253854 28.0244146,14.8253854 Z M25.8796146,14.1104293 C25.4848146,14.1104293 25.1646585,14.4305512 25.1646585,14.8253854 C25.1646585,15.2202195 25.4847805,15.5403415 25.8796146,15.5403415 C26.2744488,15.5403415 26.5945749,15.2202195 26.5945749,14.8253854 C26.5959048,14.4305854 26.2757839,14.1104293 25.8796146,14.1104293 Z M23.0211902,14.8253854 C22.6263902,14.8253854 22.3062341,15.1455073 22.3062341,15.5403415 C22.3062341,15.9351756 22.6263561,16.2552976 23.0211902,16.2552976 C23.4160244,16.2552976 23.7361463,15.9351756 23.7361463,15.5403415 C23.7361463,15.1455073 23.4160244,14.8253854 23.0211902,14.8253854 Z"
            id="Shape"
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default AfternoonIcon;
