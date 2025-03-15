import mongoose from "mongoose";
import { ContextData } from "../types/context.types";

type ContextDataDocument = ContextData & mongoose.Document;

const contextDataSchema = new mongoose.Schema<ContextDataDocument>(
  {
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ContextDataModel = mongoose.model<ContextDataDocument>(
  "ContextData",
  contextDataSchema,
);

export default ContextDataModel;
