import {ProfileData, UserData} from '@app/screens/types';

// #region Navigator Param Lists
export type HomeStackParamList = {
  FollowList: {
    listAPI: string;
    title: string;
  };
  Search: undefined;
  Profile: {
    profileData: ProfileData | UserData;
  };
};

// #endregion
