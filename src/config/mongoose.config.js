import { connect, Types } from "mongoose";

export const connectDB = async () => {
  const URL = "mongodb+srv://haiverhercas:12345@haiverhdz.knujl.mongodb.net/DB";
  try {
    connect(URL);
    console.log("conectado a mongoose");
  } catch (error) {
    console.log("error al conectar");
  }
};

export const isValidID = (id) => {
  return Types.ObjectId.isValid(id);
};