import {
  TEXT_MESSAGE,
  CARD_MESSAGE,
  QUICK_REPLIES,
  RECIEPT_MESSAGE,
} from '../constants';

const formatMessages = message => {
  switch (message.messageType) {
    case TEXT_MESSAGE:
      return message;
    default:
      return message;
  }
};
export default formatMessages;
