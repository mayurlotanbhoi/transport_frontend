
import React, { useEffect, useState, Suspense, useLayoutEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import routes from './Routes/routes';
import ProtectedRoute from './Routes/ProtectedRoute';
import Footer from './components/Footer';
import Header from './components/Header';
import { PublicHeader } from './pages/Landing/componats/Header.componats';
import DefaultLayout from './layout/DefaultLayout';
import { useReAuthQuery } from './services/auth-service';
import { logOut, setCredentials } from './redux/auth/authSlice';
import { setToken } from './util/localStorage';
// import { PublicHeader } from "./pages/Landing/componats/Header.componats.jsx"

function App() {
  const { data: authResponse, isLoading, error, refetch } = useReAuthQuery();
  // const [isAuthenticated, setisAuthenticated] = useState(false)
  const isAuthenticated = useSelector((state) => state.auth.isLogin);
  // const isLogin = useSelector((state) => state.auth.isLogin);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log('isLoading', isLoading)
  // console.log("isAuthenticated", isAuthenticated)

  // useLayoutEffect(() => {
  //   setisAuthenticated(isLogin)
  // }, [authResponse, isLoading, error, isLogin])
  // useEffect(() => {
  //   window.location.reload();
  // }, [])


  useEffect(() => {
    // When data is fetched, handle authentication status
    console.log("authResponse.success", authResponse?.success)
    console.log("authResponse", authResponse)
    if (!isLoading && authResponse?.success) {
      if (authResponse?.success) {
        const { accessToken, user } = authResponse.data;
        console.log("accessToken, user", accessToken, user)
        dispatch(setCredentials({ accessToken, user }));
        setToken(accessToken)
        console.log("isAuthenticated app", isAuthenticated)
        navigate('/dashboard')
      } else {
        dispatch(logOut());
        navigate('/');
      }
    }

    if (error) {
      console.error("ReAuth error:", error);
      dispatch(logOut());
      navigate('/');
    }

  }, [authResponse, isLoading, error]);

  useEffect(() => {
    // Scroll to top on location change
    window.scrollTo(0, 0);
  }, [pathname]);

  if (isLoading) {
    return <Loader />;
  }








  const renderRoutes = (routesArray) => {
    return routesArray.map((route, index) => {
      // Handle routes with children (nested routes)
      if (route.children) {
        return (
          <Route path={route.path} key={index}>
            {route.protected ? (
              <>

                <ProtectedRoute roles={route.roles} >
                  {renderRoutes(route.children)}
                </ProtectedRoute>

              </>
            ) : (
              renderRoutes(route.children)
            )}
          </Route>
        );
      }

      // Handle routes without children
      const element = route.protected ? (
        <>
          {/* <Header /> */}
          <DefaultLayout >
            <ProtectedRoute roles={route.roles} >
              <PageTitle title={route.title} />
              {route.element}
            </ProtectedRoute>
            <Footer />
          </DefaultLayout>
        </>
      ) : (
        <><PublicHeader />
          <PageTitle title={route.title} />
          {route.element}
        </>
      );

      // Render the route
      return <Route path={route.path} element={element} key={index} />;
    });
  };

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {renderRoutes(routes)}
        {/* Redirect to login if not authenticated */}
        {/* <Route
          path="/"
          element={!isAuthenticated ? <Navigate to="/auth/signin" replace /> : <Navigate to="/dashboard" replace />}
        /> */}
      </Routes>


    </Suspense>
  );
}

export default App;























// import { useEffect, useState } from 'react';
// import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

// import Loader from './common/Loader';
// import PageTitle from './components/PageTitle';
// import SignIn from './pages/Authentication/SignIn';
// import SignUp from './pages/Authentication/SignUp';
// import Calendar from './pages/Calendar';
// import Chart from './pages/Chart';
// import ECommerce from './pages/Dashboards/ECommerce';
// import FormElements from './pages/Form/FormElements';
// import FormLayout from './pages/Form/FormLayout';
// import Profile from './pages/Profile';
// import Settings from './pages/Settings';
// import Tables from './pages/Tables';
// import Alerts from './pages/UiElements/Alerts';
// import Buttons from './pages/UiElements/Buttons';
// import LandingPage from './pages/Landing/LandingPage';
// import UserRout from './Routes/user.rout';
// import PublicRout from './Routes/public.rout';
// import Menu from './pages/Dashboards/Transpoter/pages/Menu';
// import Lorry from './pages/Dashboards/Transpoter/pages/Lorry';
// import { useSelector } from 'react-redux';
// import AddLorry from './pages/Form/AddLorry';
// import Trips from './pages/Dashboards/Transpoter/pages/Trips';
// import CreatTrip from './pages/Form/CreateTrip';
// import { useGetVehiclesQuery } from './services/vehicle.services';

// function App() {
//   const [loading, setLoading] = useState(true);
//   const { isLoading, error } = useGetVehiclesQuery();
//   // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
//   const isAuthenticated = useSelector((state) => state?.auth?.isLogin)
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 1000);
//   }, []);



//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <Routes>
//       {/* Define routes under /user here if needed */}
//       <Route path="/*" element={<UserRout />}>
//         <Route
//           path="dashboard"
//           element={
//             <>
//               <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               {/* <ECommerce /> */}
//               <Menu />
//             </>
//           }
//         />

//         <Route
//           path="add-lorry"
//           element={
//             <>
//               <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               {/* <ECommerce /> */}
//               <AddLorry />
//             </>
//           }
//         />

//         <Route
//           path="lorrys"
//           element={
//             <>
//               <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               {/* <ECommerce /> */}
//               <Lorry />
//             </>
//           }
//         />
//         <Route
//           path="trips"
//           element={
//             <>
//               <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               {/* <Calendar /> */}
//               <Trips />
//             </>
//           }
//         />
//         <Route
//           path="add-trip"
//           element={
//             <>
//               <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <CreatTrip />
//             </>
//           }
//         />
//         <Route
//           path="forms/form-elements"
//           element={
//             <>
//               <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <FormElements />
//             </>
//           }
//         />
//         <Route
//           path="forms/form-layout"
//           element={
//             <>
//               <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <FormLayout />
//             </>
//           }
//         />
//         <Route
//           path="tables"
//           element={
//             <>
//               <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <Tables />
//             </>
//           }
//         />
//         <Route
//           path="settings"
//           element={
//             <>
//               <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <Settings />
//             </>
//           }
//         />
//         <Route
//           path="chart"
//           element={
//             <>
//               <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <Chart />
//             </>
//           }
//         />
//         <Route
//           path="ui/alerts"
//           element={
//             <>
//               <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <Alerts />
//             </>
//           }
//         />
//         <Route
//           path="ui/buttons"
//           element={
//             <>
//               <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <Buttons />
//             </>
//           }
//         />
//       </Route>


//       <Route path='' element={<PublicRout />}>

//         <Route
//           path="/auth/signin"
//           element={
//             <>
//               <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <SignIn />
//             </>
//           }
//         />

//         <Route
//           path="/auth/signup"
//           element={
//             <>
//               <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <SignUp />
//             </>
//           }
//         />
//         <Route
//           path="/"
//           element={isAuthenticated ? (
//             <>
//               <PageTitle title="home Page | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <LandingPage />
//             </>
//           ) : (
//             <Navigate to="/auth/signin" replace />
//           )}
//         />
//       </Route>

//     </Routes>
//   );
// }

// export default App;
