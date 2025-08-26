import { Suspense, useEffect, useState } from "react";
import { Auth, Home } from "./pages";
import { BrowserRouter as BRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from "./contexts/AuthContext";
import Landing from "./pages/Landing";
import ResetScroll from "./components/shared/misc/ResetScroll";
import Preloader from "./pages/Preloader";

const App = () => {
  const { isLoggedIn, setIsLoggedIn, fetchAndSetUser } = useAuthContext();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('outreachiq-user'));
    if (userId) {
      fetchAndSetUser(userId).finally(()=>{ setIsLoggedIn(true)});
    }
  }, [setIsLoggedIn]);

  return (
    <BRouter>
      <Suspense fallback={<Preloader />}>
        <ResetScroll />
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Landing />} />
          <Route path="/register" element={!isLoggedIn ? <Auth /> : <Navigate to="/" />}></Route>
          <Route path="*" element={<h1>Page not found</h1>}></Route>
        </Routes>
      </Suspense >
    </BRouter >
  )
}

export default App;