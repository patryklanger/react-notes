import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../services/auth';
import { useAuthAction } from './useActions';
import { useSelector } from 'react-redux';
import { selectors } from '../state';

export const useProtectedRoute = () => {
  const navigate = useNavigate();
  const { checkIfUserLogged } = useAuthAction();
  const { inProgres } = useSelector(selectors.authSelectors.selectAuthState);
  useEffect(() => {
    firebaseAuth.onAuthStateChanged(function (user) {
      if (inProgres) return;
      if (
        !user &&
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/signup'
      ) {
        console.error(
          'Access to protected route denied, redirecting to login...'
        );
        navigate('/login');
      } else {
        checkIfUserLogged();
      }
    });
  }, [navigate]);
};
