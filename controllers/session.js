// export const getRooms = async (req, res, next) => {
//   try {
//     const rooms = await SesSion.find().lean();
//     res.status(200).send({ success: true, rooms });
//   } catch (error) {
//     next(error);
//   }
// };
import Session from "../models/Session.js";

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Session.find().populate("messages.senderId");
    res.status(200).send({ success: true, rooms });
  } catch (error) {
    next(error);
  }
};
export const getRoomMessage = async (req, res, next) => {
  try {
    const { userId } = req.query;

    let room = await Session.findOne({ userId }).lean();

    if (!room) {
      room = await Session.create({ userId, messages: [] });
    }

    res.status(200).send({ success: true, room });
  } catch (error) {
    next(error);
  }
};
