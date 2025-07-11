class AutoscrollerController {
  static SHORTS_INNER_CONTAINER_ID = 'shorts-inner-container';

  lastVideoSrc: string | null;

  constructor() {
    this.lastVideoSrc = null;
  }

  setupVideo(video: HTMLVideoElement) {
    if (!video) return;
    video.loop = false;

    video.addEventListener('ended', () => {
      const arrowDownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        code: 'ArrowDown',
        bubbles: true,
      });
      document.dispatchEvent(arrowDownEvent);
    });

    // every triggered event seems to be restting the video's loop to `true`, so we set it back to `false`
    const videoLoopObserver = new MutationObserver(() => (video.loop = false));
    videoLoopObserver.observe(video, { attributeFilter: ['loop'] });
  }

  observeChange() {
    const videoNodeObserver = new MutationObserver(() => {
      const currentVid = document.querySelector(
        `#${AutoscrollerController.SHORTS_INNER_CONTAINER_ID} video`
      ) as HTMLVideoElement;

      if (currentVid && currentVid.src !== this.lastVideoSrc) {
        this.setupVideo(currentVid);
        this.lastVideoSrc = currentVid.src;
      }
    });

    videoNodeObserver.observe(
      document.querySelector(
        `#${AutoscrollerController.SHORTS_INNER_CONTAINER_ID}`
      ) as HTMLElement,
      {
        childList: true,
        subtree: true,
      }
    );
  }

  initialize() {
    const startingVid: HTMLVideoElement | null = document.querySelector(
      `#${AutoscrollerController.SHORTS_INNER_CONTAINER_ID} video`
    );
    if (!startingVid) return;

    this.lastVideoSrc = startingVid.src;
    this.setupVideo(startingVid);
    this.observeChange();
  }
}

let onShortsPage = false;

const injectAutoscroll = (path: string) => {
  if (!onShortsPage && path.startsWith('/shorts')) {
    onShortsPage = true;

    // TODO: fix the method below
    setTimeout(() => {
      const autoscrollerController = new AutoscrollerController();
      autoscrollerController.initialize();
    }, 3000);
  } else if (onShortsPage && !path.startsWith('/shorts')) {
    onShortsPage = false;
  }
};

injectAutoscroll(window.location.pathname);

navigation.addEventListener('navigate', (e: NavigateEvent) => {
  const dest = new URL(e.destination.url).pathname;
  injectAutoscroll(dest);
});
