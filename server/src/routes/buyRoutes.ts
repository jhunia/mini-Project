import { Router } from "express";
import {
  getBuyProperties,
  getBuyPropertyById,
  purchaseProperty,
} from "../controllers/buyControllers";

const router = Router();

router.get("/", getBuyProperties);
router.get("/:id", getBuyPropertyById);
router.post("/:id/purchase", purchaseProperty);

export default router;
