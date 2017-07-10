import React from 'react';
import {connect} from 'react-redux';

import './navbar.css';

export function Navbar(props) {
  console.log(props);
    return (
      <nav>
        <ul className="navbar">
          <li className="title">Tick-it</li>
          <li className="nav-button">{props.navButton}</li>
        </ul>
      </nav>
    )
  }

const mapStateToProps = state => ({
  navButton: state.navButton
});

export default connect(mapStateToProps)(Navbar);