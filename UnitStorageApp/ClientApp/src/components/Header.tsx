import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-primary p-2">
      <Link className="navbar-brand h1 text-white" to="/">
        Unit Storage App
      </Link>
    </nav>
  );
};
