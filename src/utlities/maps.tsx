import { Platform, Linking } from 'react-native';

const openMapMarker = (label = '', lat, lng) => {
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const latlng = `${lat},${lng}`;

  const url = Platform.select({
    ios: `${scheme}${label}@${latlng}`,
    android: `${scheme}${latlng}(${label})`,
  });


  Linking.openURL(url);
};

export {
  openMapMarker,
};
