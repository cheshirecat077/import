self.addEventListener('message', e => {
  setTimeout(function() {
    self.postMessage(e.data);
  }, 2000);
});
