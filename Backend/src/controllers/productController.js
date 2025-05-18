import productModel from "../models/productModel.js";

async function getAllProducts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1; // Mặc định là trang 1 nếu không truyền
    const limit = 10; // Số sản phẩm mỗi trang
    const skip = (page - 1) * limit;

    // Lấy tổng số sản phẩm để tính tổng số trang
    const total = await productModel.countDocuments();

    const productList = await productModel.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // sắp xếp mới nhất trước (tuỳ chọn)
    res.json({
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      products: productList,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getProductDetail(req, res) {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createProduct(req, res) {
  try {
    const { name, price, category, stock_quantity } = req.body;

    if (!name || !price || !category || stock_quantity === undefined) {
      return res
        .status(400)
        .json({ message: "Name, Price, Category và Stock Quantity là bắt buộc" });
    }

    const productCreated = await productModel.create(req.body);
    res.status(201).json(productCreated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.json({ message: "Xóa sản phẩm thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
  getAllProducts,
  getProductDetail,
  updateProduct,
  createProduct,
  deleteProduct,
};
