import React from 'react'
import { logout } from '../../helpers/auth'

export const HeaderAuth = () => (
    <header className="app-header navbar">
        <a className="navbar-brand" href="#"></a>
        <ul className="nav navbar-nav hidden-md-down">
        <li className="nav-item px-1"><a className="nav-link" href="/admin/dashboard">Dashboard</a></li>
        <li className="nav-item px-1"><a className="nav-link"  onClick={() => {
                logout()
                }} href="#">Logut</a></li>
        </ul>
    </header>
);