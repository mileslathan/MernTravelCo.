import './App.css';
import { useState, useEffect } from 'react'
import AuthPage from '../AuthPage/AuthPage';
import BookingPage from '../BookingPage/BookingPage'
import CheckoutPage from '../CheckoutPage/CheckoutPage'
import PackageDetail from '../../components/PackageDetail/PackageDetail'
import { Routes, Route } from 'react-router-dom'
import NavBar from '../../components/NavBar'
import { getUser } from '../../utilities/users-service'
import * as packageAPI from '../../utilities/packages-api';

export default function App() {
  const [user, setUser] = useState(getUser())
  const [packages, setPackages] = useState([]);
  const [checkout, setCheckout] = useState([]);
  useEffect(function() {
    async function getItems() {
      const packages = await packageAPI.getAll();
      setPackages(packages);
      // console.log(packages)
    }
    getItems();
  }, []);

  function addToCheckout(pkg) {
    setCheckout([...checkout, pkg]);
  }

  return (
    <main className="App">
      {user ?
      <> 
          <NavBar user={user} setUser={setUser} />
          <Routes>

            <Route path="/packages" element={<BookingPage packages={packages} addNewPackages={addToCheckout}/>} />
            <Route path="/checkout" element={<CheckoutPage checkout={checkout}/>} />

            {/* <Route path="/packages/:id" element={<PackageDetail packages={packages}/>} /> */}
          </Routes>
      </>
      :
      <AuthPage setUser={setUser} />}
    </main>
  );
}