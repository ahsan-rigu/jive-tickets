"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ticketSchema = new mongoose_1.Schema({
    event: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Event', required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    tier: { type: mongoose_1.Schema.Types.ObjectId, ref: 'TicketTier', required: true },
    qrCode: { type: String, required: true },
    purchaseDate: { type: Date, default: Date.now },
    pricePaid: { type: Number, required: true },
    isValid: { type: Boolean, default: true }
});
const Ticket = (0, mongoose_1.model)('Ticket', ticketSchema);
exports.default = Ticket;
