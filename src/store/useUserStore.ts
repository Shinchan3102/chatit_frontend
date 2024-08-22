import { create } from 'zustand';
import { getJwtToken, getUserFromCookies } from '@/utils/cookie';

type UserStore = {
  userInfos: {
    id: string;
    jwtToken: string;
    username: string;
    email: string;
  } | null;
  fetchUserDetails: (router: any) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  userInfos: null,

  fetchUserDetails: (router: any) => {
    try {
      const jwtToken = getJwtToken();
      const userInfo = getUserFromCookies();
      if (!jwtToken || !userInfo) {
        router.push('/sign-in');
        return;
      }
      set({ userInfos: { id: userInfo.id, jwtToken, username: userInfo.username, email: userInfo.email } });
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  },
}));
