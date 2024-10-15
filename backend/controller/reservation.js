import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const reservation = async (req, res, next) => {
  const { firstName, lastName, email, phone, date, time } = req.body;

  // Check if all fields are provided
  if (!firstName || !lastName || !email || !phone || !date || !time) {
    return next(new ErrorHandler("Please fill the full reservation form!", 400));
  }

  try {
    // Use create method and pass all fields as an object
    await Reservation.create({
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
    });

    // Success response
    res.status(200).json({
      success: true,
      message: "Reservation Sent Successfully!",
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(new ErrorHandler(validationErrors.join(" ,"), 400));
    }
    return next(error);
  }
};
