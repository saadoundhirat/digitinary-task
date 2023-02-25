import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import { DialogActions, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { purple } from '@mui/material/colors';
import TitleIcon from '@mui/icons-material/Title';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { useAuth } from 'src/app/auth/AuthContext';

const schema = () =>
  yup.object().shape({
    title: yup.string().required('You must enter a title'),
    body: yup.string().required('You must enter a body'),
  });

const defaultValues = {
  title: '',
  body: '',
};

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {},
  '& .MuiDialogTitle-root': {
    minHeight: '5.2rem',
    borderBottom: `1px solid ${purple[100]}`,
  },
  '& .MuiDialogContent-root': {
    padding: '2rem',
    border: 'none',

    '.Post-form': {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      width: '100%',
      height: '100%',

      '& > div': {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        width: '100%',
        height: 'auto',
        marginBottom: '2rem',

        '& > div': {
          width: '100%',
          marginLeft: '1rem',

          '& .MuiTextField-root': {
            width: '100%',

            '& .MuiInputBase-root': {
              height: 'auto',
              fontSize: '1.3rem',
            },

            '& .MuiInputLabel-root': {
              fontSize: '1.3rem',
            },

            '& .MuiFormHelperText-root': {
              fontSize: '1rem',
            },
          },
        },
      },
    },
  },
  '& .MuiDialogActions-root': {
    padding: '2rem',
    borderTop: `1px solid ${purple[100]}`,
  },
}));

const CustomDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon sx={{ fontSize: '2.4rem' }} />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

CustomDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function PostDialog({
  posts,
  setPosts,
  postDialogOpen,
  postDialogData,
  postDialogType,
  setPostDialogOpen,
  setPostDialogData,
  setPostDialogType,
}) {
  const { user } = useAuth();
  const { control, formState, handleSubmit, reset, trigger } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema()),
  });

  const { isValid, errors } = formState;

  useEffect(() => {
    if (postDialogData && postDialogType === 'edit') {
      reset(postDialogData);
    } else {
      reset(defaultValues);
    }
  }, [postDialogData, postDialogType, reset]);

  const handleClose = () => {
    setPostDialogOpen(false);
    setPostDialogData(null);
    setPostDialogType(null);
  };

  const updatePostHandler = (postData) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postData.id) {
        return postData;
      }
      return post;
    });
    setPosts(updatedPosts);
    handleClose();
  };

  const createPostHandler = ({ title, body }) => {
    const newPost = {
      id: posts.length + 1,
      title,
      body,
      userId: user.id,
      comments: [],
      user,
    };
    setPosts([newPost, ...posts]);
    handleClose();
  };

  function onSubmit(data) {
    trigger();
    if (data && postDialogType === 'edit' && isValid) {
      updatePostHandler(data);
    }

    if (data && postDialogType === 'create' && isValid) {
      createPostHandler(data);
    }
  }

  return (
    <CustomDialog
      classes={{
        paper: 'rounded',
      }}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      scroll="paper"
      maxWidth={'sm'}
      fullWidth
      open={postDialogOpen}
      TransitionComponent={Transition}
    >
      <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <Typography
          sx={{ fontSize: '1.6rem', fontWeight: '600', color: 'text.primary', lineHeight: '1.2' }}
        >
          {postDialogType === 'create' ? 'Create New Post' : `Edit Post ${postDialogData?.id}`}
        </Typography>
      </CustomDialogTitle>

      <DialogContent dividers>
        <form
          id="post-form"
          className="Post-form"
          name="post-form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <IconButton
              sx={{
                width: '4.8rem',
                height: '4.8rem',
                padding: '0.4rem',
                borderRadius: '0.4rem',
                color: '#fff',
                backgroundColor: purple[600],
              }}
              color="inherit"
              aria-label="title"
            >
              <TitleIcon sx={{ fontSize: '2.4rem' }} />
            </IconButton>

            <div>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    variant="outlined"
                    fullWidth
                    autoFocus
                    required
                    error={!!errors.title}
                    helperText={errors?.title?.message}
                    inputProps={{
                      style: { fontSize: 13 },
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div>
            <IconButton
              sx={{
                width: '4.8rem',
                height: '4.8rem',
                padding: '0.4rem',
                borderRadius: '0.4rem',
                color: '#fff',
                backgroundColor: purple[600],
              }}
              color="inherit"
              aria-label="body"
            >
              <WysiwygIcon sx={{ fontSize: '2.4rem' }} />
            </IconButton>

            <div>
              <Controller
                name="body"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Body"
                    variant="outlined"
                    fullWidth
                    required
                    multiline
                    minRows={6}
                    maxRows={8}
                    error={!!errors.body}
                    helperText={errors?.body?.message}
                    inputProps={{
                      style: { fontSize: 13 },
                    }}
                  />
                )}
              />
            </div>
          </div>
        </form>
      </DialogContent>

      <DialogActions>
        <Button
          type="submit"
          form="post-form"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          sx={{
            fontSize: '1.3rem',
            color: '#fff',
            backgroundColor: purple[600],
            '&:hover': {
              backgroundColor: purple[700],
            },
          }}
        >
          {postDialogType === 'create' ? 'Create' : 'Update'}
        </Button>
      </DialogActions>
    </CustomDialog>
  );
}

export default PostDialog;
