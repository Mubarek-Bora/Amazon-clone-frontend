/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Routering from './Router';
import { DataContext } from './components/DataProvider/DataProvider';
import { auth } from './Utility/firebase';
import { Type } from './Utility/action.type';
const App = () => {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
     auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

  }, []);
  return (
    <div>
      <Routering />
    </div>
  );
}

export default App
