import { useSelector } from '../services/store';
import { userSelectors } from '../slices/userSlice';
import { Preloader } from '../components/ui';
import { Navigate, useLocation } from 'react-router';

type ProtectedRoutePops = {
  children: React.ReactNode;
  isPublic?: boolean;
};

function ProtectedRoute({ children, isPublic }: ProtectedRoutePops) {
  const user = useSelector(userSelectors.selectUser);
  const userCheck = useSelector(userSelectors.selectAuthCheck);
  const location = useLocation();

  if (!userCheck) {
    return <Preloader />;
  }

  if (isPublic && user) {
    const from = location.state?.from || { pathname: '/profile' };
    return <Navigate to={from} />;
  }

  if (!isPublic && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
