const express = require('express');

const {  validateUserId,  validateUser, validatePost } = require('../middleware/middleware')

const Users = require('./users-model');
const Posts = require('../posts/posts-model');


// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  Users.find(req.query)
  .then(users => {
    res.status(200).json(users);
  })
  .catch(next);
  // RETURN AN ARRAY WITH ALL THE USERS
});

router.get('/:id', validateUserId,  (req, res, next) => {
  res.json(req.user);
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
 
})
 
router.post('/', validateUser, (req, res, next) => {
  Users.add(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(next);
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, validatePost, (req, res, next) => {
  Users.update(req.params.id, req.body)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(next)
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, (req, res, next) => {
  Users.update(req.params.id, req.body)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(next);
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts',validatePost, (req, res, next) => {
  Posts.validatePost(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error getting the post',
    })
  })
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
