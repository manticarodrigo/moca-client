import React from 'react';
import Svg, { Ellipse, G, Path, Polyline, Rect } from 'react-native-svg';


const DiagnosisIcon = () => (
  <Svg width="49px" height="50px" viewBox="0 0 49 50">
    <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G transform="translate(-622.000000, -327.000000)">
        <G transform="translate(622.000000, 328.000000)">
          <Rect x="0" y="0" width="47.0204082" height="48" rx="2" />
          <G transform="translate(1.959184, 0.000000)">
            <Path d="M11.5623954,20.4590164 L21.0612245,20.5" stroke="#57B0CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M11.5623954,27.5409836 L18.4998327,27.5409836" stroke="#57B0CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M11.5623954,34.6229508 L18.4998327,34.6229508" stroke="#57B0CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <Polyline stroke="#57B0CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="25.1482101 47.2131148 0 47.2131148 0 7.08196721 6.16661091 7.08196721" />
            <Polyline stroke="#57B0CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="32.3747073 7.08196721 38.5413182 7.08196721 38.5413182 20.3770492" />
            <Path d="M24.6664436,5.50819672 C24.6664436,2.46610367 22.2506686,-8.8817842e-16 19.2706591,-8.8817842e-16 C16.2906496,-8.8817842e-16 13.8748745,2.46610367 13.8748745,5.50819672 L10.0207427,5.50819672 L10.0207427,11.8032787 L28.5205754,11.8032787 L28.5205754,5.50819672 L24.6664436,5.50819672 Z" stroke="#57B0CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <Ellipse fill="#57B0CC" fillRule="nonzero" cx="19.2706591" cy="5.50819672" rx="1.54165273" ry="1.57377049" />
            <G transform="translate(23.510204, 26.000000)" stroke="#71CFEB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <Path d="M15.7088571,-6.99364611e-16 C13.7272653,-0.0188574786 11.8744472,1.00026928 10.8,2.700075 C9.72555276,1.00026928 7.87273471,-0.0188574786 5.89114286,2.33211887e-16 C2.64522095,0.00603571913 0.0132883222,2.68670199 0,6.000225 C0,11.999925 10.8,21 10.8,21 C10.8,21 21.6,11.999925 21.6,6.000225 C21.5867117,2.68670199 18.954779,0.00603571913 15.7088571,-6.99364611e-16 Z" />
            </G>
            <Polyline stroke="#71CFEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="19.2706591 42.4918033 4.62495818 42.4918033 4.62495818 11.8032787" />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default DiagnosisIcon;
