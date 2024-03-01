import { Router } from "express";
import {
  create_store,
  fetch_store,
  fetch_stores,
} from "../controllers/store_controller.js";
import { upload } from "../middlewares/multer.js";
import { validate_create_store } from "../middlewares/input_validator.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router
  .route("/create_store")
  .post(
    upload.single("image"),
    authenticate,
    validate_create_store,
    create_store
  );

router.route("/fetch_stores").get(authenticate, fetch_stores);
router.route("/fetch_store/:id").get(authenticate, fetch_store);

export default router;
