import axiosClient from '../axios';

export const getTermsAndConditions = async () => {
  try {
    const response = await axiosClient.get('/info/terms-condition');
    return response.data;
  } catch (error) {
    console.error('Error fetching terms and conditions:', error);
    throw error;
  }
};

export const getPrivacyPolicy = async () => {
  try {
    const response = await axiosClient.get('/info/privacy-policy');
    return response.data;
  } catch (error) {
    console.error('Error fetching privacy policy:', error);
    throw error;
  }
};