const express = require('express');
const app = express();
const PORT = 5000;

const cors = require('cors');
const path = require('path')
const authRoutes = require('./routes/authRoutes');
const categoriesRoutes = require('./routes/categories');
const productsRouter = require('./routes/products'); 
const subcategoriesRouter = require('./routes/subcategories');
const contactRoutes = require('./routes/contacts');

app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRouter);
app.use('/api/subcategories', subcategoriesRouter);
app.use('/api/contact', contactRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});