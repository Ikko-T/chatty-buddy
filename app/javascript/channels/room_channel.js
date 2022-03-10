import consumer from './consumer';

document.addEventListener('turbolinks:load', () => {
  window.messageContainer = document.getElementById('message-container');

  if (messageContainer === null) {
    return;
  }

  consumer.subscriptions.create('RoomChannel', {
    connected() {},

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      // Called when there's incoming data on the websocket for this channel
      messageContainer.insertAdjacentHTML('beforeend', data['message']);
    },
  });

  const documentElement = document.documentElement;
  window.messageContent = document.getElementById('message_content');
  window.scrollToBottom = () => {
    window.scroll(0, documentElement.scrollHeight);
  };

  scrollToBottom();
});
