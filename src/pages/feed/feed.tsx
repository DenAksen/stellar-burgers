import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedsThunk, feedsSelectors } from '../../slices/feedsSlice';

export const Feed: FC = () => {
  /** TODO: взять переменные из стора */
  const orders: TOrder[] = useSelector(feedsSelectors.selectFeedsOrders);
  const isLoading: boolean = useSelector(feedsSelectors.selectFeedsLoading);

  const dispatch = useDispatch();

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeedsThunk());
      }}
    />
  );
};
