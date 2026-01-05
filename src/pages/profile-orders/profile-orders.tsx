import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrdersThunk,
  userOderSelectors
} from '../../slices/userOrdersSlise';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);
  const ordersData = useSelector(userOderSelectors.selectUserOrders);
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = ordersData;

  return <ProfileOrdersUI orders={orders} />;
};
