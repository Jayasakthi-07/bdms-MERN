import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material';
import { NavigateNext, Home } from '@mui/icons-material';

export const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" />}
      className="mb-4"
    >
      <Link
        to="/"
        className="flex items-center gap-1 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
      >
        <Home fontSize="small" />
        <span>Home</span>
      </Link>
      
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const label = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

        return last ? (
          <Typography
            key={to}
            className="text-gray-800 dark:text-gray-200 font-medium"
          >
            {label}
          </Typography>
        ) : (
          <Link
            key={to}
            to={to}
            className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
          >
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
