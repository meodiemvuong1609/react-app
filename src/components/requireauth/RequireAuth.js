// components/RequireAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const RequireAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    if (typeof window !== "undefined") {
      const account = JSON.parse(localStorage.getItem("account"))
      if (account) {
        const dispatch = useDispatch();
        dispatch({type: 'LOGIN', payload: account})
      }
    }
    const router = useRouter();
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/auth/login');
      }
    }, [])

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default RequireAuth;
