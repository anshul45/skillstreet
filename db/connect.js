import mongoose from "mongoose";

export const db = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("db connection established"))
    .catch((err) => console.error(err));
};
