import productModel from "../models/product.model.js";

export const AddProductController = async (req, res) => {
  try {
    const {
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    } = req.body;

    if (
      !name ||
      !image[0] ||
      !category[0] ||
      !subCategory[0] ||
      !unit ||
      !price ||
      !description
    ) {
      return res.status(400).json({
        message: "Provide required Fields",
        error: true,
        success: false,
      });
    }
    const addProduct = new productModel({
      name,
      image,
      category,
    });
    const saveProduct = await addProduct.save();
    if (!saveProduct) {
      return res.status(500).json({
        message: "Not Created",
        error: true,
        success: false,
      });
    }
    return res.json({
      message: "Added product",
      data: saveProduct,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getProductController = async (req, res) => {
  try {
    let { page, limit, search } = req?.body;
    if (!page) page = 1;
    if (!limit) limit = 10;
    const query = search
      ? {
          $text: { $search: search },
        }
      : {};

    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
      productModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      productModel.countDocuments(query),
    ]);

    return res.json({
      message: "Product Data",
      data: data,
      totalCount: totalCount,
      totalNoPage: Math.ceil(totalCount / limit),
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getProductByCategory = async (req, res) => {
  try {
    let { id } = req?.body;

    if (!id) {
      return res.status(500).json({
        message: "id m=not provided",
        error: true,
        success: false,
      });
    }

    const product = await productModel.find({
      category: { $in: id },
    }).limit(15);

    return res.json({
      message: "category product list",
      data: product,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
