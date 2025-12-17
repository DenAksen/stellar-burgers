import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userSelectors } from '../../slices/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(userSelectors.selectUserName) || '';
  return <AppHeaderUI userName={userName} />;
};
