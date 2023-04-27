import {Route, Redirect} from 'react-router-dom';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';
import { Login } from '../pages/login';


export const ProtectedRoute = () =>{
    const user = useAuth(); 
    console.log("//// user authenticated", user);


    return typeof user === 'undefined' ? (
        <h1>Loading....</h1>
    ) : user ? (
        <Outlet />
    ) : (
        <Login />
    );
}
