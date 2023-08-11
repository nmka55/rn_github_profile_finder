import {Colors, Typography} from 'react-native-ui-lib';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect} from 'react';

import {LogBox} from 'react-native';
import RootContainer from '@app/navigators';
import {theme} from '@constants';

//For dark theme support
require('react-native-ui-lib/config').setConfig({appScheme: 'default'});

LogBox.ignoreLogs([
  'The new TextField implementation does not support the', // RN UI Lib will fix this when TextField migrattion done
  'Warning: Function components cannot be given refs.', // RN UI Lib TextField leadingAccessory ref warning
]);

export default function App(): JSX.Element {
  const queryClient = new QueryClient();

  useEffect(() => {
    Colors.loadDesignTokens({primaryColor: theme?.primaryColor});
    Colors.loadColors(theme?.colors);
    Typography.loadTypographies(theme?.fonts);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RootContainer />
    </QueryClientProvider>
  );
}
