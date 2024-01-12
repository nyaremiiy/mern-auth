import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
  res.json({
    message: 'Hello world!',
  });
};

// delete user

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json('User has been deleted');
  try {
  } catch (error) {
    next(error);
  }
};

// updete user
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }
  try {
    if (req.body.password) {
      req.body.password = await bcryptjs.hashSync(req.body.password, 10);
    }

    const { username, email, password, profilePicture } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username,
          email,
          password,
          profilePicture,
        },
      },
      { new: true }
    );

    const { password: hashedPassword, ...rest } = updateUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
