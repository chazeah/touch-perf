var settings = {
	useTranslateZ: true,
	useRAF: true,
	useSimpleShapes: false
};

// When settings simple shapes, toggle complex class.
var targetContainer2 = document.querySelector('.targets');
var showSimpleShapes = 'targets--simple-shapes';
Object.defineProperty(settings, 'useSimpleShapes', {
	get: function() {
		return this.value_;
	},
	set: function(enable) {
		this.value_ = enable;
		if (enable) {
			targetContainer2.classList.add(showSimpleShapes);
		} else {
			targetContainer2.classList.remove(showSimpleShapes);
		}
	}
});

var settingsContainer = document.querySelector('.settings');

// Prevents taps in settings area from propagating through to targets.
settingsContainer.addEventListener('touchstart', function(e) {
	e.stopPropagation();
});

settingsContainer.addEventListener('touchend', function(e) {
	e.stopPropagation();
});

(function setupSettings() {
	var toggles = document.querySelectorAll('input', settingsContainer);
	_.each(toggles, function(toggle) {
		toggle.addEventListener('change', function(e) {
			// Flips the global setting for target input.
			var newState = !settings[e.target.id];
			settings[e.target.id] = newState;

			var changeFunction = toggle.hasAttribute('data-change-function');
			if (!!changeFunction) {
				window[changeFunction](newState);
			}
		});
	});
})();