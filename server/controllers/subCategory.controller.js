import subCategoryModel from "../models/subCategory.model.js";
import productModel from "../models/product.model.js";

export const AddSubCategoryController = async (req, res) => {
  try {
    const { name, image ,category} = req.body;
    if (!name && !image&&!category[0]) {
      return res.status(400).json({
        message: "Provide required Fields",
        error: true,
        success: false,
      });
    }
    const addSubCategory = new subCategoryModel({
      name,
      image,
      category,
    });
    const saveSubCategory = await addSubCategory.save();
    if (!saveSubCategory) {
      return res.status(500).json({
        message: "Not Created",
        error: true,
        success: false,
      });
    }
    return res.json({
      message: "Added SubCategory",
      data: saveSubCategory,
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
export const getSubCategoryController = async (req, res) => {
  try {
    const data = await subCategoryModel.find().sort({createdAt:-1}).populate('category');
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
export const updateSubCategoryController = async (req, res) => {
  try {
    const { _id, name, image,category } = req.body;
// console.log(_id,name,image,category);

    const update = await subCategoryModel.findByIdAndUpdate(
      _id,
      { name, image },
      {category:category},
      { new: true }
    );
// console.log(update);

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