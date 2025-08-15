import {Request , Response, NextFunction} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getManager = async (req: Request, res: Response):Promise<void> => {
    try {
        const { cognitoId } = req.params;
        const manager = await prisma.manager.findUnique({
            where: { cognitoId },
  
        });

        if(manager) {
            res.json(manager)
        }else {
            res.status(404).json({ message: "Manager not found" });

        }
    }
    catch (error:any) {
        console.error("Error fetching Manager:", error);
        res.status(500).json({ message: `Error retrieving Manager: ${error.message} ` });
    }
}

export const createManager = async (req: Request, res: Response):Promise<void> => {
    try {
        const { cognitoId , name , email , phoneNumber} = req.body;
        const manager = await prisma.manager.create({
            data: {
                cognitoId,
                name,
                email,
                phoneNumber
            }
        });
        res.status(201).json(manager);
    }
    catch (error:any) {
        console.error("Error creating Manager:", error);
        res.status(500).json({ message: `Error creating Manager: ${error.message} ` });
    }
}

export const updateManager = async (req: Request, res: Response):Promise<void> => {
    try {
        const { cognitoId } = req.params;
        const {  name , email , phoneNumber} = req.body;
        const manager = await prisma.manager.update({
            where: { cognitoId },
            data: {             
                name,
                email,
                phoneNumber
            }
        });
        res.json(manager);
    }
    catch (error:any) {
        console.error("Error updating Manager:", error);
        res.status(500).json({ message: `Error updating Manager: ${error.message} ` });
    }
}

export const getManagerProperties = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const properties = await prisma.property.findMany({
      where: { managerCognitoId: cognitoId },
      include: {
        location: true,
      },
    });

    const propertiesWithFormattedLocation = await Promise.all(
      properties.map(async (property) => {
        const coordinates: { coordinates: string }[] =
          await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates from "Location" where id = ${property.location.id}`;

        const geoJSON: any = wktToGeoJSON(coordinates[0]?.coordinates || "");
        const longitude = geoJSON.coordinates[0];
        const latitude = geoJSON.coordinates[1];

        return {
          ...property,
          location: {
            ...property.location,
            coordinates: {
              longitude,
              latitude,
            },
          },
        };
      })
    );

    res.json(propertiesWithFormattedLocation);
  } catch (err: any) {
    console.error("Error retrieving manager properties:", err);
    res
      .status(500)
      .json({ message: `Error retrieving manager properties: ${err.message}` });
  }
};

function wktToGeoJSON(wkt: string): any {
  try {
    if (!wkt || wkt.trim() === '') {
      return { coordinates: [0, 0] };
    }

    // Handle POINT(longitude latitude) format
    const pointMatch = wkt.match(/POINT\s*\(\s*([+-]?\d+\.?\d*)\s+([+-]?\d+\.?\d*)\s*\)/i);
    if (pointMatch) {
      return {
        type: 'Point',
        coordinates: [parseFloat(pointMatch[1]), parseFloat(pointMatch[2])]
      };
    }

    // If no match, return default coordinates
    return { coordinates: [0, 0] };
  } catch (error) {
    console.error("Error parsing WKT:", error);
    return { coordinates: [0, 0] };
  }
}