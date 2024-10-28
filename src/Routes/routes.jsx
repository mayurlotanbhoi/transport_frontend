// src/routes.jsx
import React, { lazy } from 'react';
import Menu from '../pages/Dashboards/Transpoter/pages/Menu.jsx';
import AddLorry from '../pages/Form/AddLorry.jsx';
import Lorry from '../pages/Dashboards/Transpoter/pages/Lorry.jsx';
import Trips from '../pages/Dashboards/Transpoter/pages/Trips.jsx';
import CreatTrip from '../pages/Form/CreateTrip.jsx';
import Calendar from '../pages/Calendar.tsx';
import Profile from '../pages/Profile.tsx';
import FormElements from '../pages/Form/FormElements.tsx';
import FormLayout from '../pages/Form/FormLayout.tsx';
import Tables from '../pages/Tables.tsx';
import Settings from '../pages/Settings.tsx';
import Chart from '../pages/Chart.tsx';
import Alerts from '../pages/UiElements/Alerts.tsx';
import Buttons from '../pages/UiElements/Buttons.tsx';
import TripCostCalculator from '../pages/Dashboards/Transpoter/componants/TripCostCalculator.jsx';
// import TransDirectory from '../pages/publicPages/TransDirectory.jsx';
// const Enquiry = lazy(() => import('../pages/Dashboard/pages/Enquiry.jsx'));
// const CompanyEnquiry = lazy(() => import('../pages/Dashboard/pages/CompanyEnquiry.jsx'));
// const NewBranch = lazy(() => import('../pages/Dashboard/pages/NewBranch.jsx'));
// const Jobs = lazy(() => import('../pages/Dashboard/pages/Jobs.jsx'));
// const SendProfile = lazy(() => import('../pages/Dashboard/pages/SendProfile.jsx'));
// const Marketplace = lazy(() => import('../pages/Dashboard/pages/Marketplace.jsx'));
// const LoadEnquiry = lazy(() => import('../pages/Dashboard/pages/LoadEnquiry.jsx'));
// const VehicleEnquiry = lazy(() => import('../pages/Dashboard/pages/VehicleEnquiry.jsx'));
// const ProfileSetup = lazy(() => import('../pages/Dashboard/pages/ProfileSetup.jsx'));

// Public Routes
const LandingPage = lazy(() => import('../pages/Landing/LandingPage.jsx'));
const SignIn = lazy(() => import('../pages/Authentication/SignIn.jsx'));
const SignUp = lazy(() => import('../pages/Authentication/SignUp.jsx'));

// Protected Routes
// const Dashboard = lazy(() => import('./../pages/Dashboard/Menu.jsx'));
// const CompanyDashboard = lazy(() => import('./../pages/Comp.Dashboard/CompanyMenu.jsx'));
// const AddLorry = lazy(() => import('././../pages/Lorries/AddLorry'));
// const Lorries = lazy(() => import('././../pages/Lorries/Lorries'));
// const Calendar = lazy(() => import('./../pages/Calendar.tsx'));
// const Profile = lazy(() => import('./../pages/Profile.tsx'));
// const FormElements = lazy(() => import('./../pages/Form/FormElements.tsx'))
// const FormLayout = lazy(() => import('./../pages/Form/FormLayout.tsx'));
// const Tables = lazy(() => import('./../pages/Tables.tsx'));
// const Settings = lazy(() => import('./../pages/Settings.tsx'));
// const Chart = lazy(() => import('./../pages/Chart.tsx'));
// const Alerts = lazy(() => import('./../pages/UiElements/Alerts.tsx'));
// const Buttons = lazy(() => import('./../pages/UiElements/Buttons.tsx'));

// Unauthorized Page
// const Unauthorized = lazy(() => import('././../pages/Unauthorized'));



const routes = [
    {
        path: '/',
        element: <LandingPage />,
        protected: false,
        title: 'Home Page | TailAdmin - Tailwind CSS Admin Dashboard Template',
        exact: true,
    },
    // {
    //     path: '/trans-directory',
    //     element: <TransDirectory />,
    //     protected: false,
    //     title: 'TransDirectory',
    //     exact: true,
    // },
    {
        path: '/auth',
        children: [
            {
                path: 'signin',
                element: <SignIn />,
                protected: false,
                title: 'Signin | TailAdmin - Tailwind CSS Admin Dashboard Template',
            },
            {
                path: 'signup',
                element: <SignUp />,
                protected: false,
                title: 'Signup | TailAdmin - Tailwind CSS Admin Dashboard Template',
            },
        ],
    },

    // {
    //     path: '/dashboard',
    //     element: <Dashboard />,
    //     children: [
    //         // {
    //         //     path: '',
    //         //     element: <Dashboard />,
    //         //     protected: true,
    //         //     roles: ['user', 'admin'],
    //         //     title: 'Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template',
    //         // },
    //         {
    //             path: 'profile-setup',
    //             element: <ProfileSetup />,
    //             protected: false,
    //             title: 'Signup | TailAdmin - Tailwind CSS Admin Dashboard Template',
    //         },
    //     ],
    // },
    {
        path: '/dashboard',
        // element: <Dashboard />,
        // protected: true,
        // roles: ['user', 'admin'],
        // title: 'Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template',
        children: [
            {
                path: '',
                element: <Menu />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template',
            },
            {
                path: 'add-lorry',
                element: <AddLorry />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Signup | TailAdmin - Tailwind CSS Admin Dashboard Template',
            },
            {
                path: 'lorrys',
                element: <Lorry />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template',
            },
            {
                path: 'trips',
                element: <Trips />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Signup | TailAdmin - Tailwind CSS Admin Dashboard Template',
            },
            {
                path: 'trips-cost',
                element: <TripCostCalculator />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Signup | TailAdmin - Tailwind CSS Admin Dashboard Template',
            },
            {
                path: 'creat-trip',
                element: <CreatTrip />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template',
            },
            // {
            //     path: 'jobs',
            //     element: <Jobs />,
            //     protected: true,
            //     roles: ['user', 'admin'],
            //     title: 'Signup | TailAdmin - Tailwind CSS Admin Dashboard Template',
            // },
            // {
            //     path: 'send-profile',
            //     element: <SendProfile />,
            //     protected: true,
            //     roles: ['user', 'admin'],
            //     title: 'Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template',
            // },
            // {
            //     path: 'marketplace',
            //     element: <Marketplace />,
            //     protected: true,
            //     roles: ['user', 'admin'],
            //     title: 'Signup | TailAdmin - Tailwind CSS Admin Dashboard Template',
            // },
            // {
            //     path: 'load-enquiry',
            //     element: <LoadEnquiry />,
            //     protected: true,
            //     roles: ['user', 'admin'],
            //     title: 'Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template',
            // },
            // {
            //     path: 'vehicle-enquiry',
            //     element: <VehicleEnquiry />,
            //     protected: true,
            //     roles: ['user', 'admin'],
            //     title: 'Signup | TailAdmin - Tailwind CSS Admin Dashboard Template',
            // },
        ],

    },

    // {
    //     path: '/company/dashboard',
    //     element: <CompanyDashboard />,
    //     protected: true,
    //     roles: ['user', 'company'],
    //     title: 'Company Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template',
    // },
    // {
    //     path: '/add-lorry',
    //     element: <AddLorry />,
    //     protected: true,
    //     roles: ['user', 'admin'],
    //     title: 'Add Lorry | TailAdmin - Tailwind CSS Admin Dashboard Template',
    // },
    // {
    //     path: '/lorrys',
    //     element: <Lorries />,
    //     protected: true,
    //     roles: ['user', 'admin'],
    //     title: 'Lorries | TailAdmin - Tailwind CSS Admin Dashboard Template',
    // },
    {
        path: '/calendar',
        element: <Calendar />,
        protected: true,
        roles: ['user', 'admin', 'company'],
        title: 'Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template',
    },
    {
        path: '/profile',
        element: <Profile />,
        protected: true,
        roles: ['user', 'admin', 'company'],
        title: 'Profile | TailAdmin - Tailwind CSS Admin Dashboard Template',
    },
    {
        path: '/forms',
        children: [
            {
                path: 'form-elements',
                element: <FormElements />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template',
            },
            {
                path: 'form-layout',
                element: <FormLayout />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template',
            },
        ],
    },
    {
        path: '/tables',
        element: <Tables />,
        protected: true,
        roles: ['user', 'admin', 'company'],
        title: 'Tables | TailAdmin - Tailwind CSS Admin Dashboard Template',
    },
    {
        path: '/settings',
        element: <Settings />,
        protected: true,
        roles: ['user', 'admin'],
        title: 'Settings | TailAdmin - Tailwind CSS Admin Dashboard Template',
    },
    {
        path: '/chart',
        element: <Chart />,
        protected: true,
        roles: ['user', 'admin'],
        title: 'Chart | TailAdmin - Tailwind CSS Admin Dashboard Template',
    },
    {
        path: '/ui',
        children: [
            {
                path: 'alerts',
                element: <Alerts />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template',
            },
            {
                path: 'buttons',
                element: <Buttons />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template',
            },
        ],
    },
    // {
    //     path: '/unauthorized',
    //     element: <Unauthorized />,
    //     protected: false,
    //     title: 'Unauthorized | TailAdmin - Tailwind CSS Admin Dashboard Template',
    // },
    //   {
    //     path: '*',
    //     element: <Unauthorized />, // Redirect to Unauthorized or a 404 page
    //     protected: false,
    //     title: 'Page Not Found | TailAdmin - Tailwind CSS Admin Dashboard Template',
    //   },
];

export default routes;
