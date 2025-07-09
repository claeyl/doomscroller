const nextVideoBtn = document.querySelector('#navigation-button-down button');

function setupVideo(video) {
  if (!video) {
    return;
  }

  video.loop = false;
  video.addEventListener('ended', () => {
    nextVideoBtn.click();
  });

  const videoLoopObserver = new MutationObserver(() => {
    video.loop = false;
  });

  videoLoopObserver.observe(video, {
    attributeFilter: ['loop'],
  });
}

const videoNodeObserver = new MutationObserver(() => {
  const playingVid = document.querySelector('#shorts-inner-container video');

  if (playingVid && playingVid.src !== window._lastVideo) {
    setupVideo(playingVid);
    window._lastVideo = playingVid.src;
  }
});

videoNodeObserver.observe(document.querySelector('#shorts-inner-container'), {
  childList: true,
  subtree: true,
});

const currentVid = document.querySelector('#shorts-inner-container video');
if (currentVid) {
  window._lastVideo = currentVid.src;
  setupVideo(currentVid);
}
