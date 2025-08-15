"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const buyControllers_1 = require("../controllers/buyControllers");
const router = (0, express_1.Router)();
router.get("/", buyControllers_1.getBuyProperties);
router.get("/:id", buyControllers_1.getBuyPropertyById);
router.post("/:id/purchase", buyControllers_1.purchaseProperty);
exports.default = router;
