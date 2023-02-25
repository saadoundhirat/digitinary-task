import axios from 'axios';
import Utils from '../helpers';

class Actions {
  static validateUserCredentials = (userCredentials) => {
    return new Promise((resolve, reject) => {
      const { email } = userCredentials;
      if (!email) {
        reject('Email is required');
      }
      // get all user from the api and check if the email exists or not
      axios.get('/users').then((response) => {
        const users = response.data;
        const user = users.find((user) => user.email === email);
        if (!user) {
          reject('User not found');
        }
        resolve(user);
      });
    });
  };

  static signInUser = (email, password) => {
    return new Promise((resolve, reject) => {
      if (!email) {
        reject('Email is required');
      }
      axios.get('/users').then((response) => {
        const users = response.data;
        const user = users.find((user) => user.email === email);
        if (!user) {
          reject('User not found');
        }
        resolve(user);
      });
    });
  };

  static signOutUser = () => {
    return new Promise((resolve, reject) => {
      Utils.removeLocalStorageItem('user-credentials');
      resolve();
    });
  };

  static getAllPosts = () => {
    return new Promise((resolve, reject) => {
      axios.get('/posts').then((response) => {
        resolve(response.data);
      });
    });
  };

  static getAllPostsData = () => {
    return new Promise((resolve, reject) => {
      axios.get('/posts').then((response) => {
        const postsData = response.data;
        const postPromises = postsData.map((post) =>
          axios
            .all([axios.get(`/posts/${post.id}/comments`), axios.get(`/users/${post.userId}`)])
            .then(
              axios.spread((comments, user) => ({
                ...post,
                comments: comments.data,
                user: user.data,
              }))
            )
        );
        Promise.all(postPromises).then((posts) => {
          resolve(posts);
        });
      });
    });
  };

  static deletePostById = (postId) => {
    return new Promise((resolve, reject) => {
      axios.delete(`/posts/${postId}`).then((response) => {
        resolve(response.data);
      });
    });
  };
}

export default Actions;
