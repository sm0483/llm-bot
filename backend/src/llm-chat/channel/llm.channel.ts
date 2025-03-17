import { IChannel } from "../../shared/types/IChannel";
import { LLmChatController } from "../controller/llm-chat.controller";

export class LLmChannel implements IChannel {
  path = "/llm";
  controller = LLmChatController;
}
