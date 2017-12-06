import './style/_module.scss';

import * as skrollr from 'skrollr';
import * as components from './components';

import {setAttributes, isMobile } from './utils';

export class App {
	constructor() {
        this.canvasEl = $('.site');

		this.loadComponents();
        this.initSkrollr();
		this.resizeScenes();

        this.canvasEl.attr('uiState', 'show');
	}



    initSkrollr() {
        if (!skrollr.get()) {
            window.skrollr = skrollr;
            require('skrollr-stylesheets');
            require('skrollr-menu/src/skrollr.menu.js');
            this.skrollr = skrollr.init(Object.assign({}, this.getSkrollrConfiguration()));

            skrollr.menu.init(this.skrollr, {
                animate: true,
                easing: 'swing',
                scenes: this.timings,
                scale: 1,
                duration (currentTop, targetTop) {
                    return Math.abs(currentTop - targetTop) * 0.5
                }
            });
        }

        this.skrollr.refresh();
    }

    loadComponents() {
        let begin = 0;
        this.components = {};
        this.timings = {};

        for (let key in components) {
            let component = new components[key]();
            begin += component.offset;

            this.timings[key]
            component.name = key;
            component.begin = begin;
            component.end = begin + component.duration;

            begin += component.duration;

            this.components[key] = component;
        }
    }

    resizeScenes() {
        const innerWidth = window.innerWidth
        const clientHeight = isMobile() ? document.documentElement.clientHeight : window.innerHeight;

        [].forEach.call(document.querySelectorAll('.svg-screen .svg svg'), scene => {
            setAttributes(scene, {
                width: innerWidth,
                height: clientHeight
            });
        });
    }

    getSkrollrConfiguration() {
        return {
            render: data => {
                // for (let name in this.scenes) {
                //     if (typeof this.scenes[name].render === 'function') {
                //         this.scenes[name].render(data)
                //     }
                // }
            },
            beforerender: data => {
                // for (let name in this.scenes) {
                //     if (typeof this.scenes[name].beforerender === 'function') {
                //         this.scenes[name].beforerender(data)
                //     }
                // }
            }
        };
    }
}

window.onload = function() {
	new App();
};
