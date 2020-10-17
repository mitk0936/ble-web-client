import hm10 from './hm-10';

window.start = function () {
  const client = new hm10({ onDisconnect: () => alert('Disconnected') });

  client().then(({ write, subscribe }) => {
    console.log(res);
    setInterval(() => {
      write(`${+new Date()}\r\n`);
    }, 5700);

    subscribe(console.log);
  }).catch(console.error);
};