import {
  Avatar,
  Card,
  CardHeader,
  Grid,
  IconButton,
  CardContent,
  Typography,
  CardActions,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
  Box,
  Button,
} from '@mui/material';
import React, { Fragment, useState } from 'react';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import CardActionsMenu from './CardActionsMenu';
import { useAuth } from 'src/app/auth/AuthContext';
import Actions from 'src/app/service';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const CustomCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: '0.5rem 1rem',
  minHeight: '36rem',

  '& .MuiCard-root': {
    backgroundColor: 'transparent',

    '& .MuiCardHeader-root': {
      fontSize: '20px',
    },
  },

  '& .MuiCardHeader-root': {
    fontSize: '20px',
  },

  '.Card-content': {
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
    width: '100%',
    height: '100%',

    '& > h4': {
      marginBottom: '1rem',
    },

    '& > p': {
      fontSize: '1.3rem',
    },
  },

  '.Card-actions': {
    width: '100%',
    justifySelf: 'flex-end',
  },

  '.Card-delete-confirm': {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 3rem',
    backgroundColor: purple.A700,
    color: '#fff',
    zIndex: '999999',
    MouseEvent: 'none',

    '.Card-delete-confirm-text': {
      width: '100%',
      marginBottom: '2rem',
      fontSize: '1.5rem',
    },

    '.Card-delete-confirm-buttons': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
  },
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostCard = ({
  post,
  posts,
  setPosts,
  setPostDialogOpen,
  setPostDialogData,
  setPostDialogType,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const { user } = useAuth();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const cancelDeleteHandler = () => {
    setShowDeleteConfirm(false);
    setPostToDelete(null);
  };

  const deletePostHandler = () => {
    if (postToDelete) {
      Actions.deletePostById(postToDelete.id).then((response) => {
        const filteredPosts = posts.filter((p) => p.id !== postToDelete.id);
        setPosts(filteredPosts);
        setShowDeleteConfirm(false);
        setPostToDelete(null);
      });
    }
  };

  const editPostHandler = () => {
    setPostDialogOpen(true);
    setPostDialogData(post);
    setPostDialogType('edit');
  };

  return (
    <Grid key={post.id} item xs={12} sm={6} md={4} lg={4} xl={4}>
      <CustomCard className="Post-card">
        {showDeleteConfirm && post?.id === postToDelete?.id && (
          <Box className="Card-delete-confirm">
            <Typography className="Card-delete-confirm-text" variant="h5">
              {`Are you sure you want to delete post card with ID ${postToDelete?.id}? This action cannot be undone and all post associated data will be lost.`}
            </Typography>
            <Box className="Card-delete-confirm-buttons">
              <Button
                variant="contained"
                size="medium"
                color="inherit"
                onClick={cancelDeleteHandler}
                sx={{
                  backgroundColor: (theme) => theme.palette.grey[400],
                  color: (theme) => theme.palette.text.primary,
                  fontSize: '1.2rem',
                  padding: '0.7rem 1rem',
                  minWidth: '10rem',
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.grey[300],
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                onClick={deletePostHandler}
                color="error"
                size="medium"
                sx={{
                  fontSize: '1.2rem',
                  color: '#fff',
                  padding: '0.7rem 1rem',
                  minWidth: '10rem',
                }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        )}
        <CardHeader
          sx={{
            padding: '1rem 0',
            '& .MuiCardHeader-title': {
              fontSize: '1.3rem',
              fontWeight: '500',
            },
            '& .MuiCardHeader-subheader': {
              fontSize: '1rem',
            },
          }}
          avatar={
            <Avatar sx={{ bgcolor: purple[800] }} aria-label="recipe">
              {post?.user?.name?.charAt(0).toUpperCase()}
            </Avatar>
          }
          action={
            post?.userId === user?.id && (
              <CardActionsMenu
                post={post}
                setPostToDelete={setPostToDelete}
                setShowDeleteConfirm={setShowDeleteConfirm}
                editPostHandler={editPostHandler}
              />
            )
          }
          title={post?.user?.name}
          subheader={post?.user?.email}
        />

        <CardContent className="Card-content">
          <Typography variant="h4" color="text.secondary">
            {post?.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {post?.body}
          </Typography>
        </CardContent>

        <CardActions className="Card-actions" disableSpacing>
          {post?.userId === user?.id && (
            <IconButton
              aria-label="edit"
              sx={{
                fontSize: '2.4rem',
                color: '#fff',
                backgroundColor: purple[800],
                '&:hover': {
                  backgroundColor: purple[900],
                },
              }}
              onClick={editPostHandler}
            >
              <BorderColorIcon />
            </IconButton>
          )}
          {post?.comments.length > 0 && (
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              sx={{
                fontSize: '2.4rem',
                backgroundColor: purple[800],
                '&:hover': {
                  backgroundColor: purple[900],
                },
              }}
            >
              <ExpandMoreIcon sx={{ fontSize: '1.8rem', color: '#fff' }} />
            </ExpandMore>
          )}
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {post?.comments.map((comment) => (
                <Fragment key={comment.id}>
                  <ListItem sx={{ p: 0, m: 0 }} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: purple[100] }}>
                        <PersonIcon sx={{ fontSize: '2rem', color: '#fff' }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={comment?.email} secondary={comment?.body} />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </Fragment>
              ))}
            </List>
          </CardContent>
        </Collapse>
      </CustomCard>
    </Grid>
  );
};

export default PostCard;
