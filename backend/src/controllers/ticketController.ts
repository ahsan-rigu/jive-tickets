import { Request, Response } from "express";
import Ticket from "../models/ticketModel";
import Event from "../models/eventModel";
import qrcode from "qrcode";
import TicketTier from "../models/tierModel";

const generateQRCode = async (data: string) => {
  try {
    const qrCodeString = await qrcode.toString(data, { type: "svg" });
    return qrCodeString;
  } catch (err) {
    console.error("Error generating QR code:", err);
    throw err;
  }
};

export const purchaseTicket = async (req: Request, res: Response) => {
  try {
    const { eventId, tierId, userId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const tier = await TicketTier.findById(tierId);
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
    const qrCode = await generateQRCode(qrCodeData);

    const newTicket = new Ticket({
      event: eventId,
      user: userId,
      tier: tierId,
      qrCode: qrCode,
      pricePaid: pricePaid,
    });
    const savedTicket = await newTicket.save();

    tier.availableTickets--;
    await tier.save();

    res.status(201).json(savedTicket);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getUserTickets = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const tickets = await Ticket.find({ user: userId }).populate("event");
    res.json(tickets);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const validateTicket = async (req: Request, res: Response) => {
  try {
    const { qrCode } = req.body;
    const ticket = await Ticket.findOne({ qrCode: qrCode });

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
    await ticket.save();

    res.json({ message: "Ticket valid", isValid: true, ticket });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
