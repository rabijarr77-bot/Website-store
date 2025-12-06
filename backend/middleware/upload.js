const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Membuat direktori uploads jika belum ada
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi storage untuk file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = uploadDir;
    
    // Tentukan subfolder berdasarkan tipe file
    if (file.fieldname === 'qrisImage') {
      uploadPath = path.join(uploadDir, 'qris');
    } else if (file.fieldname === 'proofImage') {
      uploadPath = path.join(uploadDir, 'proofs');
    } else if (file.fieldname === 'productImage') {
      uploadPath = path.join(uploadDir, 'products');
    }
    
    // Buat direktori jika belum ada
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Filter untuk memvalidasi tipe file
const fileFilter = (req, file, cb) => {
  // Hanya izinkan gambar
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar yang diizinkan'), false);
  }
};

// Konfigurasi multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit
  },
  fileFilter: fileFilter
});

// Middleware untuk handle multiple file uploads
const handleFileUploads = (req, res, next) => {
  // Handle different field names
  const uploadFields = upload.fields([
    { name: 'productImage', maxCount: 1 },
    { name: 'qrisImage', maxCount: 1 },
    { name: 'proofImage', maxCount: 1 }
  ]);

  uploadFields(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ 
          message: 'Ukuran file terlalu besar. Maksimal 2MB' 
        });
      }
      return res.status(400).json({ 
        message: 'Error upload file',
        error: err.message 
      });
    } else if (err) {
      return res.status(400).json({ 
        message: 'Error upload file',
        error: err.message 
      });
    }
    
    next();
  });
};

module.exports = { upload, handleFileUploads };