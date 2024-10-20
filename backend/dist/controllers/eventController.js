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
exports.deleteEvent = exports.updateEvent = exports.getEventById = exports.getAllEvents = exports.createEvent = void 0;
const eventModel_1 = __importDefault(require("../models/eventModel"));
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEvent = new eventModel_1.default(req.body);
        const savedEvent = yield newEvent.save();
        res.status(201).json(savedEvent);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.createEvent = createEvent;
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield eventModel_1.default.find();
        res.json(events);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getAllEvents = getAllEvents;
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield eventModel_1.default.findById(req.params.id);
        if (event == null) {
            return res.status(404).json({ message: "Cannot find event" });
        }
        res.json(event);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getEventById = getEventById;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield eventModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (event == null) {
            return res.status(404).json({ message: "Cannot find event" });
        }
        res.json(event);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield eventModel_1.default.findByIdAndDelete(req.params.id);
        if (event == null) {
            return res.status(404).json({ message: "Cannot find event" });
        }
        res.json({ message: "Event deleted" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.deleteEvent = deleteEvent;
