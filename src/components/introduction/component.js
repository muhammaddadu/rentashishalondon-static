import './component.scss';
import svg from './introduction.svg';

export class IntroductionComponent {
	constructor() {
		this.meta = {
			offset: 0,
			duration: 900,
			menuoffset: 300
		};

		this.$element = $('.introduction-svg');
		this.$element.attr('data-scene', 'IntroductionComponent');
		this.$element.attr('id', 'IntroductionComponent');
		this.$elementSVGContainer = this.$element.find('.svg');

		this.insertSVG();
	}

	insertSVG() {
		this.$elementSVGContainer.html(svg);
	}
}
