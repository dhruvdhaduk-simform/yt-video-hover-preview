"use strict";

const inputForm = document.querySelector("#input-form");
const display = document.querySelector("#display");
const thumbnail = document.querySelector("#thumbnail");

inputForm.url.value = "https://youtu.be/2sdXSczmvNc";
inputForm.url.select();
inputForm.url.focus();

function getIdFromYtLink(link) {
    try {
        const url = new URL(link);

        if (url.host === 'youtu.be') {
            return url.pathname.split('/')[1];
        }
        else if (url.host === 'www.youtube.com' || url.host === 'm.youtube.com') {
            if (url.pathname === '/watch') {
                return url.searchParams.get('v');
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
    catch (err) {
        return undefined;
    }
}

inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = inputForm.url.value;
    const videoID = getIdFromYtLink(url);

    if (!videoID || videoID.length !== 11) {
        alert("Invlid Link");
        return;
    }

    display.style.display = "block";
    thumbnail.src = `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;

    window?.player?.destroy();

    window.player = new YT.Player("iframe-container", {
        videoId: videoID,
    
        playerVars: {
            start: 0,
            color: 'white',
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            rel: 0,
        },
    });

    window.player.addEventListener("onReady", () => {
        window.player?.playVideo();
    });

});