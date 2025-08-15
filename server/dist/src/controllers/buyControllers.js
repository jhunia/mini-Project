"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseProperty = exports.getBuyPropertyById = exports.getBuyProperties = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// GET all properties available for sale
const getBuyProperties = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const properties = yield prisma.property.findMany({
            where: { isForSale: true },
            include: { location: true, buyer: true },
        });
        res.json(properties);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch properties for sale." });
    }
});
exports.getBuyProperties = getBuyProperties;
// GET a single property by ID
const getBuyPropertyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const property = yield prisma.property.findUnique({
            where: { id },
            include: { location: true, buyer: true },
        });
        if (!property || !property.isForSale) {
            return res.status(404).json({ error: "Property not found or not for sale." });
        }
        res.json(property);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch property." });
    }
});
exports.getBuyPropertyById = getBuyPropertyById;
// POST a new purchase
const purchaseProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const propertyId = parseInt(req.params.id);
    const { buyerCognitoId, amount } = req.body;
    try {
        const property = yield prisma.property.findUnique({ where: { id: propertyId } });
        if (!property || !property.isForSale) {
            return res.status(404).json({ error: "Property not available for sale." });
        }
        if (property.buyerCognitoId) {
            return res.status(400).json({ error: "Property already sold." });
        }
        const purchase = yield prisma.purchase.create({
            data: {
                propertyId,
                buyerCognitoId,
                amount,
            },
        });
        yield prisma.property.update({
            where: { id: propertyId },
            data: {
                buyerCognitoId,
                saleDate: new Date(),
            },
        });
        res.status(201).json(purchase);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to complete purchase." });
    }
});
exports.purchaseProperty = purchaseProperty;
