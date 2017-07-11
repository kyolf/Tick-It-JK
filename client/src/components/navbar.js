import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './navbar.css';

export function Navbar(props) {
    return (
      <nav>
        <ul className="navbar">
          <li className="title">Tick-it</li>
          <Link to='/login'>
            <li className="nav-button">{props.navButton}</li>
          </Link>
        </ul>
      </nav>
    )
  }

const mapStateToProps = state => ({
  navButton: state.navButton
});

export default connect(mapStateToProps)(Navbar);