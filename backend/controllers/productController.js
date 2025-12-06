const Product = require('../models/Product');

// Get semua produk
exports.getAllProducts = async (req, res) => {
  try {
    const { type } = req.query;
    let filter = { isActive: true };
    
    if (type) {
      filter.type = type;
    }
    
    const products = await Product.find(filter).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengambil data produk',
      error: error.message 
    });
  }
};

// Get produk by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
    
    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengambil data produk',
      error: error.message 
    });
  }
};

// Create produk baru (admin only)
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      type,
      price,
      ram,
      disk,
      cpu,
      egg,
      runtime,
      provider,
      subdomain,
      description,
      features
    } = req.body;

    // Validasi input
    if (!name || !type || !price || !description) {
      return res.status(400).json({ message: 'Field wajib tidak lengkap' });
    }

    // Validasi tipe produk
    if (type === 'pterodactyl' && (!egg || !runtime || !subdomain)) {
      return res.status(400).json({ 
        message: 'Produk Pterodactyl memerlukan egg, runtime, dan subdomain' 
      });
    }

    if (type === 'vps' && !provider) {
      return res.status(400).json({ 
        message: 'Produk VPS memerlukan provider' 
      });
    }

    const product = await Product.create({
      name,
      type,
      price,
      ram,
      disk,
      cpu,
      egg,
      runtime,
      provider,
      subdomain,
      description,
      features: features || [],
      image: req.file ? req.file.path : null
    });

    res.status(201).json({
      success: true,
      message: 'Produk berhasil dibuat',
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat membuat produk',
      error: error.message 
    });
  }
};

// Update produk (admin only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    const updateData = { ...req.body };
    
    // Jika ada file upload
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Produk berhasil diperbarui',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat memperbarui produk',
      error: error.message 
    });
  }
};

// Delete produk (admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    // Soft delete dengan mengubah isActive menjadi false
    await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false }
    );

    res.json({
      success: true,
      message: 'Produk berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat menghapus produk',
      error: error.message 
    });
  }
};