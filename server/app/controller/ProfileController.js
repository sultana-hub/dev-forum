const httpStatusCode = require('../helper/httpStatusCode')
const { ProfileModel, profileValidation } = require('../model/Profile')
const { UserModel } = require('../model/Users')
const experienceValidation = require('../helper/validations/experience')
const educationValidation = require('../helper/validations/education')

class ProfileController {

    async getProfile(req, res) {
        try {
            const profile = await ProfileModel.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']).lean();

            if (!profile) {
                return res.status(httpStatusCode.NotFound).json({
                    status: false,
                    message: "There is no profile for this user"
                });
            }

            return res.status(httpStatusCode.Ok).json({
                status: true,
                message: "Profile fetched successfully",
                data: profile
            });

        } catch (error) {
            console.error(error.message);
            return res.status(httpStatusCode.InternalServerError).json({
                status: false,
                message: "Server error"
            });
        }
    }

    async createProfile(req, res) {
        try {
            // Validate input
            const { error, value } = profileValidation.validate({
                handle: req.body.handle,
                status: req.body.status,
                skills: req.body.skills
            });

            if (error) {
                return res.status(httpStatusCode.BadRequest).json({
                    status: false,
                    message: error.details[0].message
                });
            }

            const profileFields = {
                user: req.user._id,
                handle: value.handle,
                company: req.body.company,
                website: req.body.website,
                location: req.body.location,
                bio: req.body.bio,
                status: value.status,
                githubusername: req.body.githubusername,
                skills: value.skills.split(',').map(skill => skill.trim()),
                social: {}
            };

            // Add social links if present
            const socialFields = ['youtube', 'twitter', 'facebook', 'linkedin', 'instagram'];
            socialFields.forEach(key => {
                if (req.body[key]) {
                    profileFields.social[key] = req.body[key];
                }
            });

            let profile = await ProfileModel.findOne({ user: req.user._id });

            if (profile) {
                // Update profile
                profile = await ProfileModel.findOneAndUpdate(
                    { user: req.user._id },
                    { $set: profileFields },
                    { new: true }
                );
                return res.status(httpStatusCode.Ok).json({
                    status: true,
                    message: 'Profile updated successfully',
                    data: profile
                });
            }

            // Check if handle already exists
            const handleExists = await ProfileModel.findOne({ handle: req.body.handle });
            if (handleExists) {
                return res.status(httpStatusCode.BadRequest).json({
                    status: false,
                    message: 'That handle already exists'
                });
            }

            // Create new profile
            profile = new ProfileModel(profileFields);
            await profile.save();

            return res.status(httpStatusCode.Create).json({
                status: true,
                message: 'Profile created successfully',
                data: profile
            });

        } catch (err) {
            console.error(err.message);
            return res.status(httpStatusCode.InternalServerError).json({
                status: false,
                message: 'Server error',
                error: err.message
            });
        }
    }

    async allProfiles(req, res) {
        try {
            const profiles = await ProfileModel.find().populate('user', ['name', 'avatar'])
            res.json(profiles)
        } catch (error) {
            console.error(error.message)
            return res.status(httpStatusCode.InternalServerError).json({
                message: error.message
            })
        }
    }
    //get profile by user id 
    async getProfilesByUserId(req, res) {
        try {
            const profile = await ProfileModel.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])
            if (!profile) {
                return res.status(httpStatusCode.NotFound).json({
                    message: "profile for this user does not exist"
                })
            }
            return res.json(profile)
        } catch (error) {
            console.error(error.message)
            if (error.kind == 'ObjectId') {
                return res.status(httpStatusCode.NotFound).json({
                    message: "profile for this user does not exist"
                })
            }
            return res.status(httpStatusCode.InternalServerError).json({
                message: error.message
            })
        }
    }
    // delete user ,profile and post
    async deleteUserData(req, res) {
        try {
            //delete post

            //delete profile
            await ProfileModel.findOneAndDelete({ user: req.user._id })
            //dlete user 
            await UserModel.findOneAndDelete({ _id: req.user._id })
            return res.redirect('/admin/user-list')
            res.json({ message: "user removed" })
        } catch (error) {
            console.error(error.message)
            return res.status(httpStatusCode.InternalServerError).json({
                message: error.message
            })
        }

    }

    async addExperience(req, res) {
        try {
            const { error } = experienceValidation.validate(req.body);
            if (error) {
                return res.status(httpStatusCode.NotFound).json({ status: false, message: error.details[0].message });
            }

            const profile = await ProfileModel.findOne({ user: req.user._id });
            if (!profile) {
                return res.status(httpStatusCode.Forbidden).json({ status: false, message: 'Profile not found' });
            }

            // Create experience object
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };

            // Add to beginning of experience array
            profile.experience.unshift(newExp);
            await profile.save();

            return res.status(httpStatusCode.Ok).json({ status: true, message: 'Experience added', data: profile });
        } catch (error) {
            console.error(error.message);
            return res.status(httpStatusCode.InternalServerError).json({ status: false, message: 'Server error' });
        }
    }

    async deleteExperience(req, res) {
        try {
            const profile = await ProfileModel.findOne({ user: req.user._id });

            if (!profile) {
                return res.status(404).json({ status: false, message: 'Profile not found' });
            }

            // Filter out the experience by ID
            profile.experience = profile.experience.filter(
                (exp) => exp._id.toString() !== req.params.exp_id
            );

            await profile.save();

            return res.status(200).json({
                status: true,
                message: 'Experience deleted successfully',
                data: profile,
            });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                status: false,
                message: 'Server error',
            });
        }
    }

    async addEducation(req, res) {
        try {
            const { error } = educationValidation.validate(req.body);
            if (error) {
                return res.status(400).json({
                    status: false,
                    message: error.details[0].message
                });
            }

            const {
                school,
                degree,
                fieldofstudy,
                from,
                to,
                current,
                description
            } = req.body;

            const newEdu = {
                school,
                degree,
                fieldofstudy,
                from,
                to,
                current,
                description
            };

            const profile = await ProfileModel.findOne({ user: req.user._id });

            if (!profile) {
                return res.status(404).json({ status: false, message: 'Profile not found' });
            }

            profile.education.unshift(newEdu);
            await profile.save();

            return res.status(200).json({
                status: true,
                message: 'Education added successfully',
                data: profile
            });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ status: false, message: 'Server error' });
        }
    }
    async deleteEducation(req, res) {
        try {
            const profile = await ProfileModel.findOne({ user: req.user._id });

            if (!profile) {
                return res.status(404).json({ status: false, message: 'Profile not found' });
            }

            // Filter out education by ID
            profile.education = profile.education.filter(
                (edu) => edu._id.toString() !== req.params.edu_id
            );

            await profile.save();
            return res.status(200).json({
                status: true,
                message: 'Education deleted',
                data: profile
            });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ status: false, message: 'Server error' });
        }
    }


}

module.exports = new ProfileController;


