import { userModel } from "../../../../db/models/user.model.js";
import { asyncHandler } from "../../../utils/errorhandling.js";
export const getuser = asyncHandler(async (req, res, next) => {
 const id = req.user._id
 const user = await userModel.findById(id)
  return res.json({ message: "done", user: user});
});