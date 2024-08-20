import { useContext } from 'react';
import { AuthContext } from 'src/context/KeyCloakContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;
