var worker = new Worker('./js/worker.js');
worker.postMessage('hello'); // Start the worker.
worker.addEventListener('message', e => {
  console.log('Worker said: ', e.data);
});
