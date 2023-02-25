import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../../shared-components/Navbar';

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  background:
    'url(https://i0.wp.com/backgroundabstract.com/wp-content/uploads/edd/2021/09/photo_2021-09-29_17-25-26-e1656162125216.jpg?resize=1000%2C750&ssl=1) no-repeat center center fixed',
  backgroundSize: 'cover',

  '.HomePage-container': {
    position: 'relative',
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '80vw',
    maxWidth: '80vw',
    margin: '0 auto',
    padding: '0 1rem',
    backgroundColor: 'transparent',
    [theme.breakpoints.up('md')]: {
      padding: '0 2rem',
    },
  },
  '.HomePage-content': {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '.HomePage-info-section': {
    width: '620px',
    height: '620px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingTop: '2rem',
    overflow: 'hidden',
    borderRadius: '50%',
    background:
      'linear-gradient(90deg, rgba(102,34,205,1) 4%, rgba(100,21,215,1) 18%, rgba(92,48,159,1) 76%)',
  },
}));

const HomePage = () => {
  return (
    <Root>
      <div className="HomePage-container">
        <Navbar />
        <div className="HomePage-content">
          <section className="HomePage-info-section">
            <h1>React Position - Task</h1>
            <br></br>
            <p>
              All the task information is in the README.md file in project.
            </p>
          </section>
        </div>
      </div>
    </Root>
  );
};

export default HomePage;
