// Some Relevant Selectors
const SHORTS_INNER_CONTAINER_ID = 'shorts-inner-container';
const NEXT_VIDEO_BUTTON_CONTAINER_ID = 'navigation-button-down';

// Some global variables
let lastVideoSrc: string | null = null;
const nextVideoBtn = document.querySelector(
  `#${NEXT_VIDEO_BUTTON_CONTAINER_ID} button`
) as HTMLButtonElement;

const setupVideo = (video: HTMLVideoElement): void => {
  if (!video) return;
  video.loop = false;

  video.addEventListener('ended', () => nextVideoBtn.click());

  // every triggered event seems to be making video.loop to true, so we set it back to false
  const videoLoopObserver = new MutationObserver(() => (video.loop = false));
  videoLoopObserver.observe(video, { attributeFilter: ['loop'] });
};

const observeChange = (): void => {
  const videoNodeObserver = new MutationObserver(() => {
    const currentVid = document.querySelector(
      `#${SHORTS_INNER_CONTAINER_ID} video`
    ) as HTMLVideoElement;

    if (currentVid && currentVid.src !== lastVideoSrc) {
      setupVideo(currentVid);
      lastVideoSrc = currentVid.src;
    }
  });

  videoNodeObserver.observe(
    document.querySelector(`#${SHORTS_INNER_CONTAINER_ID}`) as HTMLElement,
    {
      childList: true,
      subtree: true,
    }
  );
};

const initialize = (): void => {
  const startingVid: HTMLVideoElement | null = document.querySelector(
    `#${SHORTS_INNER_CONTAINER_ID} video`
  );
  if (!startingVid) return;

  lastVideoSrc = startingVid.src;
  setupVideo(startingVid);
  observeChange();
};

initialize();
