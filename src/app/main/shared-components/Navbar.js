import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from 'src/app/auth/AuthContext';
import Actions from 'src/app/service';

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flex: '1 1 auto',
  flexWrap: 'nowrap',
  alightItems: 'center',
  justifyContent: 'space-between',
  height: '6.4rem',
  maxHeight: '6.4rem',

  '.HomePage-navbar': {
    width: '100%',
    height: '6.4rem',
    maxHeight: '6.4rem',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alightItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',

    '& > div:first-child': {
      display: 'flex',
      width: '25.6rem',
      maxWidth: '25.6rem',
      minWidth: '25.6rem',
    },
    '& > div:nth-child(2)': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flex: '1 0 auto',

      '& > nav': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',

        '& > ul': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          listStyle: 'none',

          '& > li': {
            width: 'auto',
            margin: '0 1rem',
            padding: '1rem',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',

            '& > a': {
              fontSize: '1.6rem',
              fontWeight: '600',
              color: '#fff',
              textDecoration: 'none',
              '&:hover': {
                color: '#f1f1f1',
              },
            },
          },

          '& .signin-link': {
            '& > a': {
              borderRadius: '0.4rem',
              padding: '0.8rem 1.6rem',
              fontSize: '1.3rem',
              backgroundColor: '#5E0EC6',
              '&:hover': {
                backgroundColor: '#3F1082',
              },
            },
          },

          '& .signout-link': {
            '& > a': {
              borderRadius: '0.4rem',
              padding: '0.8rem 1.6rem',
              fontSize: '1.3rem',
              backgroundColor: '#5E0EC6',
              '&:hover': {
                backgroundColor: '#3F1082',
              },
            },
          },
        },
      },
    },
  },
}));

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const signOutHandler = () => {
    Actions.signOutUser();
    navigate(0);
  };

  return (
    <Root>
      <div className="HomePage-navbar">
        <div>
          <Logo />
        </div>
        <div>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/posts">Posts</NavLink>
              </li>

              {isAuthenticated ? (
                <li className="signout-link">
                  <NavLink to="/" onClick={signOutHandler}>
                    SignOut
                  </NavLink>
                </li>
              ) : (
                <li className="signin-link">
                  <NavLink to="/sign-in">SignIn</NavLink>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </Root>
  );
};

export default Navbar;
