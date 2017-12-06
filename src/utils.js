import WebFont from 'webfontloader/webfontloader.js';

export function waitForWebfonts(fonts, callback) {
    WebFont.load({
        google: { families: fonts },
        active: callback
    });
}

export function setAttributes(el, attrs) {
    for (let key in attrs) {
        attrs[key] && el.setAttribute(key, attrs[key])
    }
}

export function isMobile() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
}

export function createElementWithAttrs(tagName, attrs) {
    const el = document.createElement(tagName);
    setAttributes(el, attrs);
    return el;
}

export function shouldFallbackToBoringCV() {
    const maxHeight = 768 / 1024 * window.innerWidth;
    return window.innerHeight > maxHeight;
}

export function onBeforePrint(callback) {
    let hasMatchMedia = window['matchMedia'];

    if (hasMatchMedia) {
        return window.matchMedia('print').addListener((media) => media.matches && callback());
    }

    window.onbeforeprint = callback;
}
