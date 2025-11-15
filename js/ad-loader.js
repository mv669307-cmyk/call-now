/**
 * js/ad-loader.js
 * Purpose: Inserts the global Google AdSense script into the page head.
 */
(function() {
    // 1. Live AdSense Publisher ID (Client ID)
    const ADSENSE_PUB_ID = 'pub-7489296441212977';

    // 2. Insert the main AdSense script tag into the head
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    console.log("AdSense script loaded with live client ID:", ADSENSE_PUB_ID);
})();