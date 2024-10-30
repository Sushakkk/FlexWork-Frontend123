import React from 'react';
import './Header.css'

const Header = () => {
  return (
    
    <header className="header">
      <div className="header__container _container">
        <a className="header__logo" href="/">flexwork</a>
        <div className="header__burger">
          <span></span>
        </div>
        <nav className="header__menu menu">
          <ul className="menu__list">
            <li className="menu__item">
              <a id="MainLink" href="/activities" className="menu__link menu__link_active">Деятельности</a>
            </li>
            {/* <li className="menu__item">
              <a id="ServicesLink" href="#services" className="menu__link">Услуги</a>
            </li> */}
            {/* <li className="menu__item">
              <a href="#contacts" className="menu__link">Вход</a>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
