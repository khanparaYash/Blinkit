import CategoryModel from "../models/category.model.js";
import subCategoryModel from "../models/subCategory.model.js";
import productModel from "../models/product.model.js";

export const AddCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image) {
      return res.status(400).json({
        message: "Provide required Fields",
        error: true,
        success: false,
      });
    }
    const addCategory = new CategoryModel({
      name,
      image,
    });
    const saveCategory = await addCategory.save();
    if (!saveCategory) {
      return res.status(500).json({
        message: "Not Created",
        error: true,
        success: false,
      });
    }
    return res.json({
      message: "Add Category",
      data: saveCategory,
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
export const getCategoryController = async (req, res) => {
  try {
    const data = await CategoryModel.find().sort({createdAt:-1});
    return res.json({
      data: data,
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
export const deleteCategoryController = async (req, res) => {
  try {
    const { _id } = req.body;
     if (!_id) {
      return res.status(400).json({
        message: "Category ID is required.",
        error: true,
        success: false,
      });
    }
    const checkSubCategory = await subCategoryModel
      .find({
        category: {
          $in: [_id],
        },
      })
      .countDocuments();
    const checkProduct = await productModel
      .find({
        category: {
          $in: [_id],
        },
      })
      .countDocuments();

    if (checkSubCategory > 0 || checkProduct > 0) {
      return res.status(400).json({
        message: "Category is already use can't delete",
        error: true,
        success: true,
      });
    }

    const update = await CategoryModel.findByIdAndDelete(_id);

    return res.json({
      message: "deleted Category",
      error: false,
      success: true,
      data: update,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
};
export const updateCategoryController = async (req, res) => {
  try {
    const { _id, name, image } = req.body;

    const update = await CategoryModel.findByIdAndUpdate(
      _id,
      { name, image },
      { new: true }
    );

    return res.json({
      message: "Updated Category",
      error: false,
      success: true,
      data: update,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
};
