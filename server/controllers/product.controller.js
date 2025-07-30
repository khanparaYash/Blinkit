import { Types } from "mongoose";
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
export const updateProductController = async (req, res) => {
  try {
    let { _id } = req?.body;
    console.log(_id);

    if (!_id) {
      return res.status(400).json({
        message: "id not found",
        error: true,
        success: false,
      });
    }
    const updateProduct = await productModel.findByIdAndUpdate(_id, {
      ...req.body.data,
    });

    return res.json({
      message: "Product updated",
      data: updateProduct,
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
      productModel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category subCategory"),
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
export const getProductByCategoryAndSubCategory = async (req, res) => {
  try {
    let { categoryId, subCategoryId, page, limit } = req?.body;

    if (!categoryId || !subCategoryId) {
      return res.status(500).json({
        message: "id not provided",
        error: true,
        success: false,
      });
    }
    if (!page) page = 1;
    if (!limit) limit = 10;
    const query = {
      $or: [
        { category: { $in: categoryId } },
        { subCategory: { $in: subCategoryId } },
      ],
    };

    const skip = (page - 1) * limit;

    const [data, dataCount] = await Promise.all([
      productModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      productModel.countDocuments(query),
    ]);

    return res.json({
      message: " product list",
      data: data,
      totalCount: dataCount,
      page: page,
      limit: limit,
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

    const product = await productModel
      .find({
        category: { $in: id },
      })
      .limit(15);

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
export const searchProduct = async (req, res) => {
  try {
    let { search, page, limit } = req?.body;
    if (!page) page = 1;
    if (!limit) limit = 10;
    const skip = (page - 1) * limit;
    const query = search
      ? {
          $text: {
            $search: search,
          },
        }
      : {};
    const [data, dataCount] = await Promise.all([
      productModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      populate("category subCategory"),
      productModel.countDocuments(query),
    ]);

    return res.json({
      message: " product data ",
      data: data,
      page: page,
      totalCount: dataCount,
      limit: limit,
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
export const getProductDetails = async (req, res) => {
  try {
    let { productId } = req?.body;

    if (!productId) {
      return res.status(500).json({
        message: "id m=not provided",
        error: true,
        success: false,
      });
    }

    const product = await productModel.find({ _id: productId });

    return res.json({
      message: " product ",
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
export const DeleteProduct = async (req, res) => {
  try {
    let { _id } = req?.body;

    if (!_id) {
      return res.status(500).json({
        message: "id not provided",
        error: true,
        success: false,
      });
    }

    await productModel.findByIdAndDelete(_id);

    return res.json({
      message: " deleted successful",
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
