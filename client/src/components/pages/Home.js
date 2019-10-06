import React, { useEffect, useContext } from 'react';

import AuthContext from '../../context/auth/authContext';
import ContactForm from '../contacts/ContactForm';
import ContactList from '../contacts/ContactList';
import ContactFilter from '../contacts/ContactFilter';
import Loader from '../layout/Loader';

const Home = () => {
  const { loading, loadUser } = useContext(AuthContext);

  // Same as componentDidMount
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <main className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <ContactList />
      </div>
    </main>
  );
};

export default Home;
