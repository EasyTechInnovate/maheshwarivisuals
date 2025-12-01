import ImageKit from 'imagekit-javascript';
import axios from 'axios';
import { showToast } from './toast';

const apiBaseUrl = import.meta.env.VITE_API_URL;

const imagekit = new ImageKit({
  publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
});

export const uploadToImageKit = async (file, folder = 'uploads') => {
  if (!file) {
    throw new Error('No file provided for upload.');
  }

  const loadingToastId = showToast.loading(`Uploading ${file.name}...`);

  try {
    const authResponse = await axios.get(`${apiBaseUrl}/v1/upload/auth`);
    const { token, expire, signature } = authResponse.data;

    if (!token || !expire || !signature) {
      throw new Error('Invalid authentication parameters received from server.');
    }

    const uploadResponse = await imagekit.upload({
      file: file, 
      fileName: file.name, 
      folder: folder, 
      ...authResponse.data, 
      onUploadProgress: (progress) => {
        
        console.log(`Progress: ${progress.loaded} / ${progress.total} (${Math.round((progress.loaded / progress.total) * 100)}%)`);
      },
    });

    showToast.dismiss(loadingToastId);
    showToast.success(`${file.name} uploaded successfully!`);

    return uploadResponse;

  } catch (error) {
    showToast.dismiss(loadingToastId);
    showToast.error(error?.response?.data?.message || `Failed to upload ${file.name}.`);
    console.error("ImageKit Upload Error:", error);
    throw error; 
  }
};