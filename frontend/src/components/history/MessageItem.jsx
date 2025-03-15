import React from "react";
import Avatar from "./Avatar";
import MessageContent from "./MessageContent";
import IconButton from "./IconButton";
import { IMAGES } from "../../images";

function MessageItem({ message, onClick }) {
  return (
    <div
      className="p-4 border-b hover:bg-gray-50 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center">
        <Avatar src={IMAGES.logo} />
        <MessageContent
          text={message.message}
          avatar={message.avatar}
          timestamp={message.timestamp}
        />
        <IconButton src={IMAGES.rightOpenButton} alt="Ask Question Icon" />
      </div>
    </div>
  );
}

export default MessageItem;
