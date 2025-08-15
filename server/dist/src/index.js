"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const path_1 = __importDefault(require("path"));
/* ROUTE IMPORTS */
const tenantRoutes_1 = __importDefault(require("./routes/tenantRoutes"));
const managerRoutes_1 = __importDefault(require("./routes/managerRoutes"));
const propertyRoutes_1 = __importDefault(require("./routes/propertyRoutes"));
const leaseRoutes_1 = __importDefault(require("./routes/leaseRoutes"));
const applicationRoutes_1 = __importDefault(require("./routes/applicationRoutes"));
const buyRoutes_1 = __importDefault(require("./routes/buyRoutes"));
/*CONFIGS*/
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
// Serve static files from uploads directory
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads'), {
    setHeaders: (res, filePath) => {
        // Set proper content types for images
        if (filePath.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
            const ext = path_1.default.extname(filePath).slice(1).toLowerCase();
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
app.use("/tenants", (0, authMiddleware_1.authMiddleware)(["tenant"]), tenantRoutes_1.default);
app.use("/managers", (0, authMiddleware_1.authMiddleware)(["manager"]), managerRoutes_1.default);
app.use("/applications", applicationRoutes_1.default);
app.use("/properties", propertyRoutes_1.default);
app.use("/leases", leaseRoutes_1.default);
app.use("/api/buy", buyRoutes_1.default);
const PORT = process.env.PORT || 2024;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
