import { validition } from "../../middleware/validation.js";
import * as authcontroller from "./controller/auth.js";
import * as validators from "./validition.js";
import { Router } from "express";
const router = Router();

router.post("/signup", validition(validators.signup), authcontroller.signup);
router.post("/login", validition(validators.login), authcontroller.Login);
router.get("/confirm/:token", authcontroller.confirmEmail);
export default router;
