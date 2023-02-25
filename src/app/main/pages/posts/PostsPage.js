import React, { memo, useEffect, useState } from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../../shared-components/Navbar';
import Actions from 'src/app/service';
import PostCard from './components/PostCard';
import PostDialog from './components/PostDialog';
import AddIcon from '@mui/icons-material/Add';
import { purple } from '@mui/material/colors';

const Root = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  background:
    'url(https://i0.wp.com/backgroundabstract.com/wp-content/uploads/edd/2021/09/photo_2021-09-29_17-25-26-e1656162125216.jpg?resize=1000%2C750&ssl=1) no-repeat center center fixed',
  backgroundSize: 'cover',
  overflow: 'hidden',
  maxHeight: '100vh',
  height: '100vh',
  width: '100vw',
  maxWidth: '100vw',

  '.PostPage-header-container': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '6.4rem',
    maxHeight: '6.4rem',
    backgroundColor: 'transparent',
  },

  '.PostPage-header': {
    display: 'flex',
    position: 'fixed',
    width: '80vw',
    maxWidth: '80vw',
    height: '6.4rem',
    maxHeight: '6.4rem',
    margin: '0 auto',
  },

  '.PostPage-content-wrapper': {
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
    alignItems: 'center',
    maxHeight: 'calc(100vh - 6.4rem)',
    overflowX: 'hidden',
    overflowY: 'auto',
  },

  '.PostPage-content': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '80vw',
    width: '80vw',
    height: 'auto',
  },

  '.Grid-container': {
    padding: '2rem 3rem',
  },

  '.PostPage-add-post': {
    position: 'absolute',
    top: '8rem',
    right: '5rem',

    '& .MuiIconButton-root': {
      backgroundColor: purple[900],
      color: '#fff',
      '&:hover': {
        backgroundColor: purple[700],
      },
    },
  },
}));

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [postDialogData, setPostDialogData] = useState(null);
  const [postDialogType, setPostDialogType] = useState(null);

  useEffect(() => {
    setLoading(true);
    Actions.getAllPostsData()
      .then((response) => {
        setPosts(response);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const createNewPostHandler = () => {
    setPostDialogOpen(true);
    setPostDialogType('create');
    setPostDialogData(null);
  };

  return (
    <>
      <Root>
        {!loading && (
          <div className="PostPage-add-post">
            <IconButton onClick={createNewPostHandler}>
              <AddIcon sx={{ fontSize: '3.8rem' }} />
            </IconButton>
          </div>
        )}
        <div className="PostPage-header-container">
          <div className="PostPage-header">
            <Navbar />
          </div>
        </div>
        <div className="PostPage-content-wrapper">
          <div className="PostPage-content">
            {loading && <h2>Loading...</h2>}
            {error && <h2>Something went Wrong Please Try again.</h2>}
            {!loading && !error && (
              <Grid
                className="Grid-container"
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    posts={posts}
                    setPosts={setPosts}
                    setPostDialogOpen={setPostDialogOpen}
                    setPostDialogData={setPostDialogData}
                    setPostDialogType={setPostDialogType}
                  />
                ))}
              </Grid>
            )}
          </div>
        </div>
      </Root>
      <PostDialog
        posts={posts}
        setPosts={setPosts}
        postDialogOpen={postDialogOpen}
        setPostDialogOpen={setPostDialogOpen}
        postDialogData={postDialogData}
        setPostDialogData={setPostDialogData}
        postDialogType={postDialogType}
        setPostDialogType={setPostDialogType}
      />
    </>
  );
};

export default memo(PostsPage);
