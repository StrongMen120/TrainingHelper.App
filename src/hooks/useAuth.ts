import { useContext } from 'react';
import { AuthContext } from '../context/Auth0Context';

const useAuth = () => useContext(AuthContext);

export default useAuth;
