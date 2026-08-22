import { useEffect, useState } from 'react';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import api from '../services/api';

const PublicLayout = ({ children }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api
      .get('/profile')
      .then(({ data }) => setProfile(data.data))
      .catch(() => setProfile(null));
  }, []);

  return (
    <div className="min-h-screen bg-canvas bg-gradient-hero bg-fixed">
      <Navbar name={profile?.name} logoUrl={profile?.logoUrl} />
      <main>{typeof children === 'function' ? children(profile) : children}</main>
      <Footer profile={profile} />
    </div>
  );
};

export default PublicLayout;
