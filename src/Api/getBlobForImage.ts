/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import RNFetchBlob from 'rn-fetch-blob';

export const getBlobForImage = async (imageUri:string) => {
  try {
    const response = await RNFetchBlob.fetch('GET', imageUri);

    console.log('response : ', response);
    console.log(response.data);
    const base64image = response.data;
    return base64image;
  } catch (err) {
    console.log(err.message);
  }
};
