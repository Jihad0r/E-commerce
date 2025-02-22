import User from "./auth.modle.js"; // Ensure correct file name


export const AddToCart = async (req, res) => {
    try {
        const { title, price, amount,img } = req.body;
        const userId = req.user._id.toString();
        
        if (!title) return res.status(400).json({ message: "Title is required" });
        if (!img) return res.status(400).json({ message: "Img is required" });
        if (!price || isNaN(price)) return res.status(400).json({ message: "Valid price is required" });
        if (!amount || isNaN(amount)) return res.status(400).json({ message: "Valid amount is required" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const existingProduct = user.cart.find((item) => item.title === title);

        if (existingProduct) {
            existingProduct.amount += Number(amount);
        } else {
            user.cart.push({ title,img, price: Number(price), amount: Number(amount) });
        }

        await user.save();
        const newProduct = user.cart.find((item) => item.title === title);
        res.status(201).json(newProduct)

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const UpdateCart = async (req, res) => {
    try {
        const { title, action } = req.body;
        const userId = req.user._id.toString();

        if (!title) return res.status(400).json({ message: "Title is required" });
        if (!action || !["increase", "decrease"].includes(action)) {
            return res.status(400).json({ message: "Action must be 'increase' or 'decrease'" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const product = user.cart.find((item) => item.title === title);
        if (!product) return res.status(404).json({ message: "Product not found in cart" });

        if (action === "increase") {
            product.amount += 1;
        } else if (action === "decrease") {
            product.amount -= 1;
            if (product.amount <= 0) {
                user.cart = user.cart.filter((item) => item.title !== title);
            }
        }
        await user.save();
        res.status(200).json({ message: "Cart updated successfully", cart: user.cart });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const GetCart = async (req, res) => {
    try {
        const userId = req.user._id.toString();

        const user = await User.findById(userId);
        
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(201).json(user.cart);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const DeleteCart = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const user = await User.findById(userId);
        
        if (!user) return res.status(404).json({ message: "User not found" });
        user.cart = [];
        await user.save();

        res.status(200).json(user.cart);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const DeleteFromCart = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const { title } = req.body; 

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const productIndex = user.cart.findIndex((item) => item.title === title);
        if (productIndex === -1) return res.status(404).json({ message: "Product not found in cart" });

        user.cart.splice(productIndex, 1);
        await user.save();

        res.status(200).json(user.cart);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
