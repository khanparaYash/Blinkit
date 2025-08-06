// import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export const AddProductToWishlistController = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.userId; // middleware auth
    const user = await UserModel.findById(userId);

    const alreadyInWishlist = user.wishlist.some(
      (item) => item.productId.toString() === productId
    );
    if (alreadyInWishlist) {
      return res
        .status(400)
        .json({ message: "Already in wishlist", success: false, error: true });
    }
    user.wishlist.push({ productId });
    const data= await user.save();

    res.json({
      message: "Added to wishlist",
      data:data,
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
export const RemoveProductToWishlistController = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.userId; // middleware auth
    const user = await UserModel.findById(userId);

    user.wishlist = user.wishlist.filter(
      item => item.productId.toString() !== productId
    );
    const data=await user.save();
   
   
    res.json({
      message: "Remove from wishlist",
      data:data,
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
export const GetWishlistController = async (req, res) => {
  try {

    const userId = req.userId; // middleware auth
    const user = await UserModel.findById(userId).populate('wishlist.productId');

    res.json({
      message: "Remove from wishlist",
      wishlist: user.wishlist,
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

