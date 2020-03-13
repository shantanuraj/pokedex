import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

export function Header () {
  return (
    <header>
      <nav>
        <NavLink to="/" activeClassName="active" exact>home</NavLink>
        <NavLink to="/random">random</NavLink>
      </nav>
      <aside>
        <NavLink to="/search">search</NavLink>
      </aside>
    </header>
  );
}
