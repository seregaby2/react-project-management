import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './style/welcomePage.css';

export function WelcomePage() {
  return (
    <div>
      <div className="welcome-page__header">
        <Link to="/login">
          <Button variant="text">sign up</Button>
        </Link>

        <Button variant="text">log in</Button>
      </div>
    </div>
  );
}
