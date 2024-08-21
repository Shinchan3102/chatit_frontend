import Cookies from 'js-cookie';

export const setAuthCookies = (data: { jwt: string, user: { email: string, username: string } }) => {
  Cookies.set('chatit', JSON.stringify(data), { expires: 7 });
};

export const getJwtToken = () => {
  const cookieData = Cookies.get('chatit');

  if (cookieData) {
    try {
      const parsedData = JSON.parse(cookieData);
      return parsedData?.jwt;
    } catch (error) {
      console.error('Error parsing cookie:', error);
      return null;
    }
  }

  return null;
};

export const getUserFromCookies = () => {
  if (Cookies.get('chatit') !== undefined) {
    return JSON.parse(Cookies.get('chatit')!)?.user;
  }
  return null;
};

export const clearAuthCookies = () => {
  Cookies.remove('chatit');
};