const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const Product = require('./../models/productModel');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/products');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadProductImages = upload.single('photo');

exports.aliasTopProducts = (req, res, next) => {
  req.query.limit = '10';
  req.query.sort = '-costPrice';
  req.query.fields = 'name,costPrice';
  next();
};

exports.getAllProducts = catchAsync(async (req, res) => {
  const features = new APIFeatures(
    Product.find({ active: { $ne: false } }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const products = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: products
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const nameProduct = await Product.findOne({ name: { $eq: req.body.name } });

  if (req.file) {
    req.body.photo = req.file.filename;
  }
  if (nameProduct) {
    const product = await Product.findByIdAndUpdate(
      nameProduct._id,
      {
        costPrice: req.body.costPrice,
        sellingPrice: req.body.sellingPrice,
        photo: req.file ? req.file.filename : req.body.photo,
        active: true
      },
      {
        new: true,
        runValidators: true
      }
    );
    res.status(200).json({
      status: 'success',
      data: product
    });
  } else {
    const product = await Product.create(req.body);
    res.status(200).json({ data: product, status: 'success' });
  }
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      costPrice: req.body.costPrice,
      sellingPrice: req.body.sellingPrice,
      photo: req.file ? req.file.filename : req.body.photo
    },
    {
      new: true,
      runValidators: true
    }
  );
  if (!product) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: product
  });
});

exports.deleteProduct = catchAsync(async (req, res) => {
  // const body = await Product.findById(req.params.id);
  // const filePath = path.join(__dirname, '../public/img/products', body.photo);
  // fs.unlink(filePath, err => {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
  // const product = await Product.findByIdAndRemove(req.params.id);
  // console.log("🚀 ~ file: productController.js:104 ~ product", product)
  await Product.findByIdAndUpdate(req.params.id, { active: false });
  res.status(200).json({
    status: 'success',
    data: null
  });
  // if (!product) {
  //   res.status(404).send('Product not found');
  //   return;
  // }
  // res.status(200).send({ data: '', status: 'Product deleted' });
});
