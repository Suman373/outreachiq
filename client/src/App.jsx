import { lazy, Suspense } from "react";
import {
  Analytics,
  Auth,
  ContactUs,
  Flow,
  FlowDetails,
  FlowLogs,
  Home,
  Landing,
  Preloader,
  ResetPassword,
  SavedFlows,
  Settings,
  UserProfile
} from "./pages";
import { BrowserRouter as BRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from "./contexts/AuthContext";
import { ResetScroll } from "./components";

const App = () => {
  const { isLoggedIn, isLoading, isInitialized } = useAuthContext();
  if (!isInitialized || isLoading) {
    return <Preloader />;
  }
  return (
    <BRouter>
      <Suspense fallback={<Preloader />}>
        <ResetScroll />
        <Routes>
          <Route 
            path="/" 
            element={!isLoggedIn ? <Landing /> : <Home />}
          >
            <Route index element={<Flow />} />
            <Route path="saved-flows" element={<SavedFlows />} />
            <Route path="flow/:id" element={<FlowDetails />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="logs" element={<FlowLogs />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
          
          <Route 
            path="/register" 
            element={!isLoggedIn ? <Auth /> : <Navigate to="/" replace />} 
          />
          
          <Route 
            path="/reset-password" 
            element={!isLoggedIn ? <ResetPassword /> : <Navigate to="/" replace />} 
          />
          
          <Route 
            path="/verify" 
            element={<><h1>Verify your email</h1></>} 
          />
          
          <Route path="/contact-us" element={<ContactUs />} />
          
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </Suspense>
    </BRouter>
  );
};

export default App;