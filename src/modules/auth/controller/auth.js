import jwt from "jsonwebtoken";
import { userModel } from "../../../../db/models/user.model.js";
import bcrypt from "bcrypt";
import { asyncHandler } from "../../../utils/errorhandling.js";
import sendemail from "../../../utils/email.js";
export const signup = asyncHandler(async (req, res, next) => {
  const {fname, lname, email, password } = req.body;

  const usercheck = await userModel.findOne({ email });
  if (usercheck) {
    return next(new Error("email exist", { cause: 201 }));
  }
  const hashpassword = bcrypt.hashSync(password, 8);
  const user = await userModel.create({
    fname,
    lname,
    username: fname + " " + lname,
    email,
    password: hashpassword,
  });
 
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    "HAMADA",
  );

 
  const html = `<a href="http://localhost:5000/auth/confirm/${token}"> confirm Email </a>
  <br>
  <br>  `;
  await sendemail({
    to: email,
    subject: "confirmemail",
    text: "confrm email",
    html,
  });

  return res.json({ message: "done", user });
});

export const Login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log({ email, password });

  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new Error("email not exist"));
  }
  const math = bcrypt.compareSync(password, user.password);
  if (!math) {
    return next(new Error("in-valid login data"));
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    "hamohamo",
    {
      expiresIn: "1d",
    }
  );
  return res.status(201).json({ message: "done", user, token });
});

export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;

  const decode = jwt.verify(token, "HAMADA");

  const user = await userModel.findByIdAndUpdate(decode.id, {
    confirmEmail: true,
  });
  return user
    ? res.json({ message: "done" })
    : next(new Error("not user rejesrte"), { cause: 201 });
});

