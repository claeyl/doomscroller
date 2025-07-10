"use strict";
// Some Relevant Selectors
class AutoscrollerController {
    constructor() {
        this.lastVideoSrc = null;
        this.nextVideoBtn = document.querySelector(`#${AutoscrollerController.NEXT_VIDEO_BUTTON_CONTAINER_ID} button`);
    }
    setupVideo(video) {
        if (!video)
            return;
        video.loop = false;
        video.addEventListener('ended', () => this.nextVideoBtn.click());
        // every triggered event seems to be restting the video's loop to `true`, so we set it back to `false`
        const videoLoopObserver = new MutationObserver(() => (video.loop = false));
        videoLoopObserver.observe(video, { attributeFilter: ['loop'] });
    }
    observeChange() {
        const videoNodeObserver = new MutationObserver(() => {
            const currentVid = document.querySelector(`#${AutoscrollerController.SHORTS_INNER_CONTAINER_ID} video`);
            if (currentVid && currentVid.src !== this.lastVideoSrc) {
                this.setupVideo(currentVid);
                this.lastVideoSrc = currentVid.src;
            }
        });
        videoNodeObserver.observe(document.querySelector(`#${AutoscrollerController.SHORTS_INNER_CONTAINER_ID}`), {
            childList: true,
            subtree: true,
        });
    }
    initialize() {
        const startingVid = document.querySelector(`#${AutoscrollerController.SHORTS_INNER_CONTAINER_ID} video`);
        if (!startingVid)
            return;
        this.lastVideoSrc = startingVid.src;
        this.setupVideo(startingVid);
        this.observeChange();
    }
}
AutoscrollerController.SHORTS_INNER_CONTAINER_ID = 'shorts-inner-container';
AutoscrollerController.NEXT_VIDEO_BUTTON_CONTAINER_ID = 'navigation-button-down';
const autoscrollerController = new AutoscrollerController();
autoscrollerController.initialize();
// Some global variables
// let lastVideoSrc: string | null = null;
// const nextVideoBtn =
// )
// const setupVideo = (video: HTMLVideoElement): void => {
//   if (!video) return;
//   video.loop = false;
//   video.addEventListener('ended', () => nextVideoBtn.click());
//   // every triggered event seems to be making video.loop to true, so we set it back to false
//   const videoLoopObserver = new MutationObserver(() => (video.loop = false));
//   videoLoopObserver.observe(video, { attributeFilter: ['loop'] });
// };
// const observeChange = (): void => {
//   const videoNodeObserver = new MutationObserver(() => {
//     const currentVid = document.querySelector(
//       `#${SHORTS_INNER_CONTAINER_ID} video`
//     ) as HTMLVideoElement;
//     if (currentVid && currentVid.src !== lastVideoSrc) {
//       setupVideo(currentVid);
//       lastVideoSrc = currentVid.src;
//     }
//   });
//   videoNodeObserver.observe(
//     document.querySelector(`#${SHORTS_INNER_CONTAINER_ID}`) as HTMLElement,
//     {
//       childList: true,
//       subtree: true,
//     }
//   );
// };
// const initialize = (): void => {
//   const startingVid: HTMLVideoElement | null = document.querySelector(
//     `#${SHORTS_INNER_CONTAINER_ID} video`
//   );
//   if (!startingVid) return;
//   lastVideoSrc = startingVid.src;
//   setupVideo(startingVid);
//   observeChange();
// };
// initialize();
