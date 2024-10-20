import { Request, Response } from "express";
import Event from "../models/eventModel";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event == null) {
      return res.status(404).json({ message: "Cannot find event" });
    }
    res.json(event);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (event == null) {
      return res.status(404).json({ message: "Cannot find event" });
    }
    res.json(event);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (event == null) {
      return res.status(404).json({ message: "Cannot find event" });
    }
    res.json({ message: "Event deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
