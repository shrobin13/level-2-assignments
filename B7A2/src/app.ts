import express, { type Application } from "express";
import { userRoute } from "./modules/user/user.route";
import { authRoute } from "./modules/auth/auth.route";
import globalErrorHandler from "./globals/globalErrorHandler";
import { issuesRoute } from "./modules/issues/issues.route";
import auth from "./middleware/auth";
import { UserRole } from "./enums-types/enums";

const app: Application = express();

app.use([express.json()]);

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/issues", issuesRoute);

app.use(globalErrorHandler);
export default app;
