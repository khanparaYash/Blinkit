import cartProductModel from "../models/cartproduct.model.js";
import UserModel from "../models/user.model.js";

export const addToCartController = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;
    if (!productId) {
      return res.status(402).json({
        message: "Provide product Id",
        success: false,
        error: true,
      });
    }
    const checkItem = await cartProductModel.findOne({
      userId: userId,
      productId: productId,
    });
    if (checkItem) {
      return res.status(402).json({
        message: "already in cart",
        success: false,
        error: true,
      });
    }

    const cartItem = new cartProductModel({
      quantity: 1,
      userId: userId,
      productId: productId,
    });
    const save = await cartItem.save();
    const updateCartUser = await UserModel.updateOne(
      { _id: userId },
      {
        $push: {
          shopping_cart: productId,
        },
      }
    );
    return res.json({
      data: save,
      message: "item added successful",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
export const updateCartQtyController = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id, qty } = req.body;
    if (!_id || !qty) {
      return res.status(402).json({
        message: "Provide data",
        success: false,
        error: true,
      });
    }
    const checkItem = await cartProductModel.updateOne(
      {
        _id: _id,
      },
      { quantity: qty }
    );

    return res.json({
      data: checkItem,
      message: "item added successful",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
export const deleteCartItemQtyController = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id } = req.body;
    if (!_id) {
      return res.status(402).json({
        message: "Provide data",
        success: false,
        error: true,
      });
    }
    
    const deleteCartItem=await cartProductModel.deleteOne({_id:_id})

    return res.json({
      data: deleteCartItem,
      message: "item remove",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
export const getCartItemController = async (req, res) => {
  try {
    const userId = req.userId;

    const cartItem = await cartProductModel
      .find({
        userId: userId,
      })
      .populate("productId");

    return res.json({
      data: cartItem,
      data: cartItem,
      message: "find successful",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
