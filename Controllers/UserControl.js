const User = require('../Model/User');

// get users
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        // Check if users were found
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        // Return users if found
        return res.status(200).json({ users: users });
    } catch (e) {
        // Handle any errors
        return res.status(500).json({ message: e.message });
    }
};

// add user
exports.addUser = async (req, res, next) => {
    try{
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        });
        const newUser = await user.save();
        return res.status(201).json({ message: 'User added successfully', user: newUser });
    }
    catch(e){
        return res.status(500).json({ message: e.message });
    }
}

// get user by id
exports.getUsersById = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user: user });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

// update user
exports.updateUser = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.name = req.body.name;
        user.email = req.body.email;
        user.age = req.body.age;
        const updatedUser = await user.save();
        return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

// delete user
exports.deleteUser =async (req, res, next) => {
    const userId = req.params.id;
    let user;
    try{
        user= await User.findByIdAndDelete(userId);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        return res.status(200).json({message: 'User deleted successfully'});
    }
    catch(e){
        return res.status(500).json({message: e.message});
    }
};