"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const ticketRoutes_1 = __importDefault(require("./routes/ticketRoutes"));
const connectDB_1 = __importDefault(require("./utils/connectDB"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
(0, connectDB_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/events", eventRoutes_1.default);
app.use("/tickets", ticketRoutes_1.default);
app.use("/auth", authRoutes_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
