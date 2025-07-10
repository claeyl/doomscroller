"use strict";
// Some Relevant Selectors
const SHORTS_INNER_CONTAINER_ID = 'shorts-inner-container';
const NEXT_VIDEO_BUTTON_CONTAINER_ID = 'navigation-button-down';
// Some global variables
let lastVideoSrc = null;
const nextVideoBtn = document.querySelector(`#${NEXT_VIDEO_BUTTON_CONTAINER_ID} button`);
const setupVideo = (video) => {
    if (!video)
        return;
    video.loop = false;
    video.addEventListener('ended', () => nextVideoBtn.click());
    // every triggered event seems to be making video.loop to true, so we set it back to false
    const videoLoopObserver = new MutationObserver(() => (video.loop = false));
    videoLoopObserver.observe(video, { attributeFilter: ['loop'] });
};
const observeChange = () => {
    const videoNodeObserver = new MutationObserver(() => {
        const currentVid = document.querySelector(`#${SHORTS_INNER_CONTAINER_ID} video`);
        if (currentVid && currentVid.src !== lastVideoSrc) {
            setupVideo(currentVid);
            lastVideoSrc = currentVid.src;
        }
    });
    videoNodeObserver.observe(document.querySelector(`#${SHORTS_INNER_CONTAINER_ID}`), {
        childList: true,
        subtree: true,
    });
};
const initialize = () => {
    const startingVid = document.querySelector(`#${SHORTS_INNER_CONTAINER_ID} video`);
    if (!startingVid)
        return;
    lastVideoSrc = startingVid.src;
    setupVideo(startingVid);
    observeChange();
};
initialize();
