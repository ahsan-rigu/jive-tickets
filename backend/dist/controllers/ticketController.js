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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTicket = exports.getUserTickets = exports.purchaseTicket = void 0;
const ticketModel_1 = __importDefault(require("../models/ticketModel"));
const eventModel_1 = __importDefault(require("../models/eventModel"));
const qrcode_1 = __importDefault(require("qrcode"));
const tierModel_1 = __importDefault(require("../models/tierModel"));
const generateQRCode = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const qrCodeString = yield qrcode_1.default.toString(data, { type: "svg" });
        return qrCodeString;
    }
    catch (err) {
        console.error("Error generating QR code:", err);
        throw err;
    }
});
const purchaseTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId, tierId, userId } = req.body;
        const event = yield eventModel_1.default.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        const tier = yield tierModel_1.default.findById(tierId);
        if (!tier) {
            return res.status(404).json({ message: "Ticket tier not found" });
        }
        if (tier.availableTickets <= 0) {
            return res
                .status(400)
                .json({ message: "No tickets available for this tier" });
        }
        const pricePaid = tier.price * (1 - (tier.discountPercentage || 0) / 100);
        const qrCodeData = JSON.stringify({ eventId, tierId, userId });
        const qrCode = yield generateQRCode(qrCodeData);
        const newTicket = new ticketModel_1.default({
            event: eventId,
            user: userId,
            tier: tierId,
            qrCode: qrCode,
            pricePaid: pricePaid,
        });
        const savedTicket = yield newTicket.save();
        tier.availableTickets--;
        yield tier.save();
        res.status(201).json(savedTicket);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});
exports.purchaseTicket = purchaseTicket;
const getUserTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const tickets = yield ticketModel_1.default.find({ user: userId }).populate("event");
        res.json(tickets);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getUserTickets = getUserTickets;
const validateTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { qrCode } = req.body;
        const ticket = yield ticketModel_1.default.findOne({ qrCode: qrCode });
        if (!ticket) {
            return res
                .status(404)
                .json({ message: "Ticket not found", isValid: false });
        }
        if (!ticket.isValid) {
            return res
                .status(400)
                .json({ message: "Ticket already used", isValid: false });
        }
        ticket.isValid = false;
        yield ticket.save();
        res.json({ message: "Ticket valid", isValid: true, ticket });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.validateTicket = validateTicket;
