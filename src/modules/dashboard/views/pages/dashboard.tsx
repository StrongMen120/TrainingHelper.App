import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTrackerRoot } from '../../context/TrackerContext';
import { Button } from 'primereact/button';
import useAuth from 'src/hooks/useAuth';

const RootView: FC = observer(() => {
  const { logout, isAuthenticated, user } = useAuth();
  const root = useTrackerRoot();
  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
});

export default RootView;
