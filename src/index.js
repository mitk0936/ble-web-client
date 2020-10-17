import hm10 from './hm-10';

window.start = function () {
  const client = new hm10({ onDisconnect: () => alert('Disconnected') });
  
  client();
};

