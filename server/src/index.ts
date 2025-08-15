import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { authMiddleware } from './middleware/authMiddleware';
import path from 'path';

/* ROUTE IMPORTS */
import tenantRoutes from "./routes/tenantRoutes";
import managerRoutes from "./routes/managerRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import leaseRoutes from "./routes/leaseRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import buyRoutes from "./routes/buyRoutes";



/*CONFIGS*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, filePath) => {
    // Set proper content types for images
    if (filePath.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      const ext = path.extname(filePath).slice(1).toLowerCase();
      const mimeType = ext === 'jpg' ? 'jpeg' : ext;
      res.setHeader('Content-Type', `image/${mimeType}`);
    }
  }
}));
// app.use('/uploads', express.static('uploads'));



/* ROUTES */
app.get('/', (req, res) => {
  res.send('Welcome to the Huve Estate API');
});

app.use("/tenants", authMiddleware(["tenant"]), tenantRoutes);
app.use("/managers", authMiddleware(["manager"]), managerRoutes);
app.use("/applications", applicationRoutes);
app.use("/properties", propertyRoutes);
app.use("/leases", leaseRoutes);
app.use("/api/buy", buyRoutes);


const PORT = process.env.PORT || 2024;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});