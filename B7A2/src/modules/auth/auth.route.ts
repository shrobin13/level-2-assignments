import { Router } from "express";
import { authController } from "./auth.controller";

const router: Router = Router();

router.post("/login", authController.loginController);
router.post("/signup", authController.registerController);

export const authRoute = router;
