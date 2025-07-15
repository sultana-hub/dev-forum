const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const profileValidation = Joi.object({
  status: Joi.string().required().messages({
    'any.required': 'Status is required',
    'string.empty': 'Status cannot be empty'
  }),
  skills: Joi.alternatives().try(
    Joi.string().required(),
    Joi.array().items(Joi.string()).required()
  ).messages({
    'any.required': 'Skills are required'
  }),
    handle: Joi.string().max(40).required().messages({
    'any.required': 'Handle is required',
    'string.empty': 'Handle cannot be empty',
    'string.max': 'Handle must be less than or equal to 40 characters'
  }),
});


// Create Schema
const ProfileSchema = new Schema({
  user: {
  type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const  ProfileModel = mongoose.model('profile', ProfileSchema);
module.exports = {ProfileModel,profileValidation} 