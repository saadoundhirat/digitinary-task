import React, { useEffect } from 'react';
import { Box, Paper, TextField, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Logo from 'src/app/main/shared-components/Logo';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import _ from '@lodash';
import { NavLink, useNavigate } from 'react-router-dom';
import Actions from 'src/app/service';
import Utils from 'src/app/helpers';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - must be at least 8 chars.'),
});

const defaultValues = {
  email: '',
  password: '',
};

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,

  '.SignInPage-content': {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',

    '.Logo-container': {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      width: '100%',
      height: '8.4rem',
      maxHeight: '8.4rem',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '0 1rem',

      '& :first-child': {
        margin: '0rem 5rem',
      },
    },

    // style the login container
    '.Paper-container': {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',

      '& .Paper-footer': {
        display: 'flex',
        width: '40rem',
        flexDirection: 'row',
        height: 'auto',
        alightItems: 'center',
        justifyContent: 'center',
        marginTop: '.8rem',
        fontSize: '1.3rem',

        '& > a': {
          color: '#5E0EC6',
          textDecoration: 'none',
          marginLeft: '0.4rem',
          fontWeight: '600',
          '&:hover': {
            color: '#3F1082',
            textDecoration: 'underline',
          },
        },
      },
    },

    '.Paper-content': {
      padding: '6rem 5rem',
      width: '40rem',
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alightItems: 'center',
      justifyContent: 'center',

      '& > h1': {
        fontSize: '3.2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '4rem',
        lineHeight: '1.25',
        letterSpacing: '-0.025rem',
      },

      '& > form': {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
        alightItems: 'center',
        justifyContent: 'center',

        '& > div': {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: 'auto',
          alightItems: 'center',
          justifyContent: 'center',
          marginBottom: '2.4rem',
          fontSize: '1.3rem',

          '& > label': {
            fontSize: '1.5rem',
            fontWeight: '500',
            marginLeft: '-0.4rem',
          },

          '& > span': {
            fontSize: '1.3rem',
          },

          '& > input': {
            fontSize: '1.3rem',
            borderRadius: '0.4rem',
          },

          '& > p': {
            fontSize: '1rem',
            fontWeight: '400',
          },
        },

        '& > button': {
          width: '100%',
          height: '4.8rem',
          fontSize: '1.3rem',
          fontWeight: '600',
          marginBottom: '1.8rem',
          borderRadius: '0.4rem',
          backgroundColor: '#5E0EC6',
          color: '#fff',

          '&:hover': {
            backgroundColor: '#3F1082',
          },
        },

        '& > :last-child': {
          fontSize: '1.3rem',
          textAlign: 'center',

          '& > a': {
            color: '#5E0EC6',
            textDecoration: 'none',
            marginLeft: '0.4rem',
            '&:hover': {
              color: '#3F1082',
              textDecoration: 'underline',
            },
          },
        },
      },
    },
  },
}));

const SignInPage = () => {
  const navigate = useNavigate();

  const { control, formState, handleSubmit, setError, setValue, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    setValue('email', 'Sincere@april.biz', { shouldDirty: true, shouldValidate: true });
    setValue('password', '12345678', { shouldDirty: true, shouldValidate: true });
  }, [setValue]);

  function onSubmit({ email, password }) {
    Actions.signInUser(email, password)
      .then((response) => {
        Utils.setLocalStorageItem('user-credentials', response);
        reset(defaultValues);
        navigate(0);
      })
      .catch((error) => {
        setError('email', {
          type: 'manual',
          message:
            'Invalid email or password - please enter one of the users email address with any password.',
        });
      })
      .finally(() => {
        reset(defaultValues);
      });
  }

  return (
    <Root>
      <div className="SignInPage-content">
        <div className="Logo-container">
          <Logo />
        </div>
        <div className="Paper-container">
          <Paper className="Paper-content" elevation={3}>
            <Typography variant="h1">Sign In</Typography>
            <form
              name="loginForm"
              noValidate
              className="flex flex-col justify-center w-full mt-32"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    autoFocus
                    type="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                    inputProps={{
                      style: { fontSize: 13 },
                    }}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    variant="outlined"
                    required
                    fullWidth
                    inputProps={{
                      style: { fontSize: 13 },
                    }}
                  />
                )}
              />

              <Button
                variant="contained"
                aria-label="Sign in"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="medium"
              >
                Sign in
              </Button>

              <Typography className="" variant="body1">
                Don&apos;t have an account? <NavLink to="#">Sign up</NavLink>
              </Typography>
            </form>
          </Paper>
          <Typography className="Paper-footer" variant="body1">
            Back to <NavLink to="/">Home</NavLink>
          </Typography>
        </div>
      </div>
    </Root>
  );
};

export default SignInPage;
