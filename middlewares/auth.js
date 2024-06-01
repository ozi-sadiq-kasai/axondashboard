import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const auth = async (req, res, next) => {
  // Check if the request headers contain the authorization key
  const { authorization } = req.headers;
  //console.log('Authorization Header:', authorization); // Add this line for debugging

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token not found' });
  }

  // Grab the token from headers (taking the "Bearer " string away)
  const token = authorization.split(' ')[1];

  try {
    // Decode and extract the user id from token
    const { _id } = jwt.verify(token, process.env.SECRET);

    // Save the user in request
    req.user = await User.findById(_id).select('_id');

    // If user not found, return an error
    if (!req.user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Go to the next function/middleware
    next();
  } catch (error) {
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

export default auth;
