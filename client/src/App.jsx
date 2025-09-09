import { Suspense, useEffect } from "react";
import {
  Analytics,
  Auth,
  Flow,
  FlowDetails,
  FlowLogs,
  Home,
  Landing,
  Preloader,
  ResetPassword,
  SavedFlows,
  Settings
} from "./pages";
import { BrowserRouter as BRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from "./contexts/AuthContext";
import { ResetScroll } from "./components";

const App = () => {
  const { isLoggedIn, setIsLoggedIn, fetchAndSetUser } = useAuthContext();

  useEffect(() => {
    (async () => {
      const userId = JSON.parse(localStorage.getItem('outreachiq-user'));
      if (userId) {
        await fetchAndSetUser(userId).finally(() => setIsLoggedIn(true));
      } else {
        setIsLoggedIn(false);
      }
    })();
  }, [setIsLoggedIn]);

  return (
    <BRouter>
      <Suspense fallback={<Preloader />}>
        <ResetScroll />
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Landing />}>
            <Route index element={<Flow />}></Route>
            <Route path="saved-flows" element={<SavedFlows />}></Route>
            <Route path={`flow/:id`} element={<FlowDetails />}></Route>
            <Route path="analytics" element={<Analytics />}></Route>
            <Route path="logs" element={<FlowLogs />}></Route>
            <Route path="settings" element={<Settings />}></Route>
          </Route>
          <Route path="/register" element={!isLoggedIn ? <Auth /> : <Navigate to="/" />}></Route>
          <Route path="/reset-password" element={!isLoggedIn ? <ResetPassword /> : <Navigate to="/" />}></Route>
          <Route path="/verify" element={<><h1>Verify your email</h1></>}></Route>
          <Route path="*" element={<h1>Page not found</h1>}></Route>
        </Routes>
      </Suspense >
    </BRouter >
  )
}

export default App;