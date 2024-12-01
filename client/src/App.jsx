import { useEffect, useState } from "react";
import { Auth, Home } from "./pages";
import { BrowserRouter as BRouter, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('email-seq-user');
    if (user) {
        setIsLoggedIn(true)
    }
  }, [setIsLoggedIn]);

  return (
    <BRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home setIsLoggedIn={setIsLoggedIn}/> : <Navigate to="/register" />} />
        <Route path="/register" element={!isLoggedIn ? <Auth setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />}></Route>
        <Route path="*" element={<h1>Page not found</h1>}></Route>
      </Routes>
    </BRouter>
  )
}

export default App;