const s = () => new Promise((resolve, reject) => setTimeout(resolve, 100));


const func = async function () {
	await s();
	console.log('asf');
	return 'asdads'
};

func();

document.addEventListener('DOMContentLoaded', () => {
	navigator.bluetooth.requestDevice({ filters: [{ services: ['0000FFE0-0000-1000-8000-00805F9B34FB'.toLowerCase()] }] })
		.then(device => { /* ... */ })
		.catch(error => { console.log(error); });
}, false);
