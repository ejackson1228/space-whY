const { AuthenticationError } = require('apollo-server-errors');
const { User, Profile, Inkling } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('inklings')
            .populate('friends');
  
          return userData;
        }
  
        throw new AuthenticationError('Not logged in!');
      },
      users: async () => {
        return User.find()
          .select('-__v -password')
          .populate('inklings')
          .populate('friends');
      },
      user: async (parent, { username }) => {
        return User.findOne({ username })
        .select('-__v -password')
        .populate('inklings')
        .populate('friends')
      },
      inklings: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Inkling.find(params).sort({ createdAt: -1 });
      },
      inkling: async (parent, { _id }) => {
        return Inkling.findOne({ _id });
      },
      profile: async (parent, { user_id }) => {
        return Profile.findOne({ user : user_id  } );
      },
      profiles: async () => {
        return Profile.find()
        .select('-__v')
      }
    },
  
    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
  
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Incorrect Username');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect Password');
        }
  
        const token = signToken(user);
        return { token, user };
      },
      addInkling: async (parent, args, context) => {
        if (context.user) {
          const inkling = await Inkling.create({ ...args, username: context.user.username });
  
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { inklings: inkling._id } },
            { new: true }
          );
  
          return inkling;
        }
  
        throw new AuthenticationError('Please Log In!');
      },
      addComment: async (parent, { inklingId, commentBody }, context) => {
        if (context.user) {
          const updatedinkling = await Inkling.findOneAndUpdate(
            { _id: inklingId },
            { $push: { comments: { commentBody, username: context.user.username } } },
            { new: true, runValidators: true }
          );
  
          return updatedinkling;
        }
  
        throw new AuthenticationError('Please Log In!');
      },
      addFriend: async (parent, { friendId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { friends: friendId } },
            { new: true }
          ).populate('friends');
  
          return updatedUser;
        }
  
        throw new AuthenticationError('Please Log In!');
      },
      addProfile: async (parent, args , context) => {
        if(context.user) {
          const createdProfile = await Profile.create(
            { ...args, user: context.user._id }
          )

          return createdProfile;
        }

        throw new AuthenticationError('Please Log in!');
      },
      addLike: async (parent, { inklingId }, context) => {
        if(context.user) {
          const updatedInkling = await Inkling.findByIdAndUpdate(
            { _id: inklingId },
            { $addToSet: { likes: { user_id: context.user._id, username: context.user.username } } },
            { new: true, runValidators: true}
          )

          return updatedInkling;
        }

        throw new AuthenticationError('Please log in!')
      }
    }
  };
  
  module.exports = resolvers;
  
  // user: async (parent, { username, _id }) => {
      //   const findUserByUsername = function () {
      //     return User.findOne({ username })
      //     .select('-__v -password')
      //     .populate('friends')
      //     .populate('inklings');
      //   } 

      //   const findUserById = function() {
      //     return User.findById({ _id })
      //     .select('-__v -password')
      //     .populate('friends')
      //     .populate('inklings');
      //   }
        
      //   username ? 
      //   findUserByUsername(username)
      //   :
      //   findUserById(_id)
        
      // }