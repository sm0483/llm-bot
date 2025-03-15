import ContextDataModel from "../src/chat/models/context.models";
import connectDB from "./db";
import { sciFiData } from "./data";

const seedContext = async () => {
  await connectDB();
  await ContextDataModel.deleteMany({});
  const contextData = await ContextDataModel.create(sciFiData);
  console.log(contextData);
};

seedContext();



