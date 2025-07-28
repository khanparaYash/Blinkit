import subCategoryModel from "../models/subCategory.model.js";
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

    if (!name || !image[0] || !category[0]||!subCategory[0]||!unit||!price ||!description) {
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
