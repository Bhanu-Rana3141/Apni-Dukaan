const Cart = require('../models/CartModel');

exports.addToCart = async (req, res) => {
    const { productId, name, description, image, price, quantity } = req.body;
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        const existingProduct = cart.products.find(item => item.productId.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ productId, name, description, image, price, quantity });
        }

        await cart.save();
        res.json({ message: "Product added to cart successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error });
    }
};

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
        res.json(cart ? cart.products : []);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error });
    }
};

exports.updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ userId });
        if (cart) {
            const existingProduct = cart.products.find(item => item.productId.toString() === productId);
            if (existingProduct) {
                existingProduct.quantity = quantity; 
                await cart.save();
                return res.status(200).json({ message: "Cart updated successfully!" });
            }
        }
        res.status(404).json({ message: "Product not found in cart." });
    } catch (error) {
        res.status(500).json({ message: "Error updating cart item", error });
    }
};

exports.removeCartItem = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ userId });
        if (cart) {
            cart.products = cart.products.filter(item => item.productId.toString() !== productId);
            await cart.save();
            return res.status(200).json({ message: "Item removed from cart." });
        }
        res.status(404).json({ message: "Product not found in cart." });
    } catch (error) {
        res.status(500).json({ message: "Error removing cart item", error });
    }
};