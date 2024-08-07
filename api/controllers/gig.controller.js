import Gig from "../models/gig.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({ message: "api route is working" });
};

export const createGig = async (req, res, next) => {
  if (!req.user.isSeller)
    return next(errorHandler(403, "Only sellers can create a gig!"));

  const newGig = new Gig({
    userId: req.user.id,
    ...req.body,
  });

  try {
    const savedGig = await newGig.save();
    // res.status(201).json(savedGig);
    res.status(201).json({ acknowledged: true });
  } catch (error) {
    next(error);
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.user.id)
      return next(errorHandler(403, "You can delete only your gig!"));

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) next(errorHandler(404, "Gig not found!"));
    res.status(200).send(gig);
  } catch (error) {
    next(error);
  }
};

export const getGigs = async (req, res, next) => {
  
  const q = req.query;

  console.log(q);
  // attention on userId may it not work please fix it
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(gigs);
 
  } catch (error) {
    next(error);
    console.log(error);
  }
};
