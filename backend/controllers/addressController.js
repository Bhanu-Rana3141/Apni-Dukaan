const Address = require('../models/AddressModel');

exports.addAddress = async (req, res) => {
    try {
        const { name, phone, address, city, state, pincode } = req.body;
        const userId = req.user.id;
        const newAddress = new Address({
            user: userId,
            name,
            phone,
            address,
            city,
            state,
            pincode
        });
        await newAddress.save();
        res.status(201).json({ message: 'Address saved successfully!', address: newAddress });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAddress = async (req, res) => {
    try {
        const userId = req.user.id; // Get the user ID from the authenticated user
        const address = await Address.findOne({ user: userId }); // Find the address for the user
        
        if (!address) {
            return res.status(404).json({ message: 'No address found for this user.' });
        }

        res.status(200).json({ address }); // Return the address
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAddress = async (req, res) => {
    try {
        const { name, phone, address, city, state, pincode } = req.body;
        const userId = req.user.id;

        // Find the existing address for the user
        const existingAddress = await Address.findOne({ user: userId });

        if (!existingAddress) {
            return res.status(404).json({ message: 'No address found to update.' });
        }

        // Update the address 
        existingAddress.name = name;
        existingAddress.phone = phone;
        existingAddress.address = address;
        existingAddress.city = city;
        existingAddress.state = state;
        existingAddress.pincode = pincode;

        await existingAddress.save();

        res.status(200).json({ message: 'Address updated successfully!', address: existingAddress });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};