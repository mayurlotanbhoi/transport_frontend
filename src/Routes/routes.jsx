// src/routes.jsx
import React, { lazy } from 'react';
import Menu from '../pages/Dashboards/Transpoter/pages/Menu.jsx';
import AddLorry from '../pages/Form/AddLorry.jsx';
import Lorry from '../pages/Dashboards/Transpoter/pages/Lorry.jsx';
import Trips from '../pages/Dashboards/Transpoter/pages/Trips.jsx';
import CreatTrip from '../pages/Form/CreateTrip.jsx';
import Calendar from '../pages/Calendar.tsx';
import Profile from '../pages/Profile.jsx';
import FormElements from '../pages/Form/FormElements.tsx';
import FormLayout from '../pages/Form/FormLayout.tsx';
import Tables from '../pages/Tables.tsx';
import Settings from '../pages/Settings.jsx';
import Chart from '../pages/Chart.tsx';
import Alerts from '../pages/UiElements/Alerts.tsx';
import Buttons from '../pages/UiElements/Buttons.tsx';
import TripCostCalculator from '../pages/Dashboards/Transpoter/componants/TripCostCalculator.jsx';
import BusinessCard from '../pages/Dashboards/Transpoter/pages/BusinessCard.jsx';
import PlanHistory from '../pages/Dashboards/Transpoter/pages/PlanHistory.jsx';
import CreatParty from '../pages/Form/CreateParty.jsx';
import Party from '../pages/Dashboards/Transpoter/pages/Party.jsx';
import { PostLoadCard } from '../pages/Dashboards/Transpoter/pages/Loadcard.jsx';
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
        title: 'Home Page | TransBook',
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
                title: 'Signin | TransBook',
            },
            {
                path: 'signup',
                element: <SignUp />,
                protected: false,
                title: 'Signup | TransBook',
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
    //         //     title: 'Dashboard | TransBook',
    //         // },
    //         {
    //             path: 'profile-setup',
    //             element: <ProfileSetup />,
    //             protected: false,
    //             title: 'Signup | TransBook',
    //         },
    //     ],
    // },
    {
        path: '/dashboard',
        // element: <Dashboard />,
        // protected: true,
        // roles: ['user', 'admin'],
        // title: 'Dashboard | TransBook',
        children: [
            {
                path: '',
                element: <Menu />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Dashboard | TransBook',
            },
            {
                path: 'add-lorry',
                element: <AddLorry />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Add lorry | TransBook',
            },
            {
                path: 'lorrys',
                element: <Lorry />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Lorrys | TransBook',
            },
            {
                path: 'trips',
                element: <Trips />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Trips | TransBook',
            },
            {
                path: 'trips-cost',
                element: <TripCostCalculator />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Trips cost | TransBook',
            },
            {
                path: 'creat-trip',
                element: <CreatTrip />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Creat trip | TransBook',
            },
            {
                path: 'user-profile',
                element: <Profile />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'profile | TransBook',
            },
            {
                path: 'Business-Card',
                element: <BusinessCard />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Business Card | TransBook',
            },
            {
                path: 'creat-load-Card',
                element: <PostLoadCard />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Creat load Card | TransBook',
            },
            {
                path: 'Plans-history',
                element: <PlanHistory />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Plans history | TransBook',
            },
            ,
            {
                path: 'creat-party',
                element: <CreatParty />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Creat party | TransBook',
            },
            ,
            {
                path: 'Party',
                element: <Party />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Party | TransBook',
            },
            // {
            //     path: 'send-profile',
            //     element: <SendProfile />,
            //     protected: true,
            //     roles: ['user', 'admin'],
            //     title: 'Dashboard | TransBook',
            // },
            // {
            //     path: 'marketplace',
            //     element: <Marketplace />,
            //     protected: true,
            //     roles: ['user', 'admin'],
            //     title: 'Signup | TransBook',
            // },
            // {
            //     path: 'load-enquiry',
            //     element: <LoadEnquiry />,
            //     protected: true,
            //     roles: ['user', 'admin'],
            //     title: 'Dashboard | TransBook',
            // },
            // {
            //     path: 'vehicle-enquiry',
            //     element: <VehicleEnquiry />,
            //     protected: true,
            //     roles: ['user', 'admin'],
            //     title: 'Signup | TransBook',
            // },
        ],

    },

    // {
    //     path: '/company/dashboard',
    //     element: <CompanyDashboard />,
    //     protected: true,
    //     roles: ['user', 'company'],
    //     title: 'Company Dashboard | TransBook',
    // },
    // {
    //     path: '/add-lorry',
    //     element: <AddLorry />,
    //     protected: true,
    //     roles: ['user', 'admin'],
    //     title: 'Add Lorry | TransBook',
    // },
    // {
    //     path: '/lorrys',
    //     element: <Lorries />,
    //     protected: true,
    //     roles: ['user', 'admin'],
    //     title: 'Lorries | TransBook',
    // },
    {
        path: '/calendar',
        element: <Calendar />,
        protected: true,
        roles: ['user', 'admin', 'company'],
        title: 'Calendar | TransBook',
    },
    {
        path: '/profile',
        element: <Profile />,
        protected: true,
        roles: ['user', 'admin', 'company'],
        title: 'Profile | TransBook',
    },
    {
        path: '/forms',
        children: [
            {
                path: 'form-elements',
                element: <FormElements />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Form Elements | TransBook',
            },
            {
                path: 'form-layout',
                element: <FormLayout />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Form Layout | TransBook',
            },
        ],
    },
    {
        path: '/tables',
        element: <Tables />,
        protected: true,
        roles: ['user', 'admin', 'company'],
        title: 'Tables | TransBook',
    },
    {
        path: '/settings',
        element: <Settings />,
        protected: true,
        roles: ['user', 'admin'],
        title: 'Settings | TransBook',
    },
    {
        path: '/chart',
        element: <Chart />,
        protected: true,
        roles: ['user', 'admin'],
        title: 'Chart | TransBook',
    },
    {
        path: '/ui',
        children: [
            {
                path: 'alerts',
                element: <Alerts />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Alerts | TransBook',
            },
            {
                path: 'buttons',
                element: <Buttons />,
                protected: true,
                roles: ['user', 'admin'],
                title: 'Buttons | TransBook',
            },
        ],
    },
    // {
    //     path: '/unauthorized',
    //     element: <Unauthorized />,
    //     protected: false,
    //     title: 'Unauthorized | TransBook',
    // },
    //   {
    //     path: '*',
    //     element: <Unauthorized />, // Redirect to Unauthorized or a 404 page
    //     protected: false,
    //     title: 'Page Not Found | TransBook',
    //   },
];

export default routes;
