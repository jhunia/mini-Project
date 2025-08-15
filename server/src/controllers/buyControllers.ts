import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET all properties available for sale
export const getBuyProperties = async (_req: Request, res: Response) => {
  try {
    const properties = await prisma.property.findMany({
      where: { isForSale: true },
      include: { location: true, buyer: true },
    });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch properties for sale." });
  }
};

// GET a single property by ID
export const getBuyPropertyById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const property = await prisma.property.findUnique({
      where: { id },
      include: { location: true, buyer: true },
    });

    if (!property || !property.isForSale) {
      return res.status(404).json({ error: "Property not found or not for sale." });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch property." });
  }
};

// POST a new purchase
export const purchaseProperty = async (req: Request, res: Response) => {
  const propertyId = parseInt(req.params.id);
  const { buyerCognitoId, amount } = req.body;

  try {
    const property = await prisma.property.findUnique({ where: { id: propertyId } });

    if (!property || !property.isForSale) {
      return res.status(404).json({ error: "Property not available for sale." });
    }

    if (property.buyerCognitoId) {
      return res.status(400).json({ error: "Property already sold." });
    }

    const purchase = await prisma.purchase.create({
      data: {
        propertyId,
        buyerCognitoId,
        amount,
      },
    });

    await prisma.property.update({
      where: { id: propertyId },
      data: {
        buyerCognitoId,
        saleDate: new Date(),
      },
    });

    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ error: "Failed to complete purchase." });
  }
};
