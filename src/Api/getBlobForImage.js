import RNFetchBlob from 'react-native-fetch-blob';

export const getBlobForImage = async imageUri => {
  try {
    const response = await RNFetchBlob.fetch('GET', imageUri);

    console.log('response : ', response);
    console.log(response.data);
    let base64image = response.data;
    return base64image;
  } catch (err) {
    console.log(err.message);
  }
};
