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

  const messageButton = document.getElementById('message-button');

  const button_activation = () => {
    if (messageContent === '') {
      messageButton.classList.add('disabled');
    } else {
      messageButton.classList.remove('disabled');
    }
  };

  messageContent.addEventListener('input', () => {
    button_activation();
    changeLineCheck();
  });

  messageButton.addEventListener('click', () => {
    messageButton.classList.add('disabled');
    changeLineCount(1);
  });

  const maxLineCount = 10;

  const getLineCount = () => {
    return (messageContent.value + '\n').match(/\r?\n/g).length;
  };

  let lineCount = getLineCount();
  let newLineCount;

  const changeLineCheck = () => {
    newLineCount = Math.min(getLineCount(), maxLineCount);

    if (lineCount !== newLineCount) {
      changeLineCount(newLineCount);
    }
  };

  const footer = document.getElementById('footer');
  let footerHeight = footer.scrollHeight;
  let newFooterHeight, footerHeightDiff;

  const changeLineCount = (newLineCount) => {
    messageContent.rows = lineCount = newLineCount;

    newFooterHeight = footer.scrollHeight;
    footerHeightDiff = newFooterHeight - footerHeight;

    if (footerHeightDiff > 0) {
      messageContainer.style.paddingBottom = newFooterHeight + 'px';
      window.scrollBy(0, footerHeightDiff);
    } else {
      window.scrollBy(0, footerHeightDiff);
      messageContainer.style.paddingBottom = newFooterHeight + 'px';
    }
    footerHeight = newFooterHeight;
  };

  // let oldestMessageId;

  // window.loadUp = true;

  // window.addEventListener(
  //   'scroll',
  //   () => {
  //     if (documentElement.scrollTop === 0 && loadUp) {
  //       loadUp = false;
  //       oldestMessageId = document.getElementsByClassName('message')[0].id.replace(/[^0-9]/g, '');
  //       $.ajax({
  //         type: 'GET',
  //         url: '/load_up',
  //         cache: false,
  //         data: { oldest_message_id: oldestMessageId, remote: true },
  //       });
  //     }
  //   },
  //   { passive: true }
  // );
});
