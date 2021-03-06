import React from 'react';
import { Link } from 'react-router-dom'

export default (props) => {
    return (
        <div className="bussiness__sidebar">
            <div className={props.pathname === "/business/dashboard" ? "bussiness__item bussiness__item--active" : "bussiness__item"}>
                <div className="bussiness__icon-warp">
                    <svg className="bussiness__icon">
                        <use xlinkHref="/sprite.svg#icon-profile" />
                    </svg>
                </div>
                <Link className="bussiness__link" to="/business/dashboard">Dashboard</Link>
            </div>
            <div className={props.pathname === "/business/activites" ? "bussiness__item bussiness__item--active" : "bussiness__item"}>
                <div className="bussiness__icon-warp">
                    <svg className="bussiness__icon">
                        <use xlinkHref="/sprite.svg#icon-display" />
                    </svg>
                </div>
                <Link className="bussiness__link" to="/business/activites">Activities</Link>
            </div>
            <div className={props.pathname === "/business/clients" ? "bussiness__item bussiness__item--active" : "bussiness__item"}>
                <div className="bussiness__icon-warp">
                    <svg className="bussiness__icon">
                        <use xlinkHref="/sprite.svg#icon-address-book" />
                    </svg>
                </div>
                <Link className="bussiness__link" to="/business/clients">Clients</Link>
            </div>
            <div className={props.pathname === "/business/calendar" ? "bussiness__item bussiness__item--active" : "bussiness__item"}>
                <div className="bussiness__icon-warp">
                    <svg className="bussiness__icon">
                        <use xlinkHref="/sprite.svg#icon-calendar" />
                    </svg>
                </div>
                <Link className="bussiness__link" to="/business/calendar">calendar</Link>
            </div>
            <div className={props.pathname === "/business/setting" ? "bussiness__item bussiness__item--active" : "bussiness__item"}>
                <div className="bussiness__icon-warp">
                    <svg className="bussiness__icon">
                        <use xlinkHref="/sprite.svg#icon-cog" />
                    </svg>
                </div>
                <Link className="bussiness__link" to="/business/setting">Settings</Link>
            </div>
        </div>
    )
}
