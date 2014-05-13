// Test with/without:
// translateZ,
// requestAnimationFrame
// box-shadows

// Global constants
var targetContainer = document.querySelector('.targets');
var target = 'touch-marker';
var targetActive = 'touch-marker--active';
var targetInactive = 'touch-marker--inactive';
var touchOffset = 75 / 2;
var heightOffset = 0;
var targets = {};

(function() {
	// Start with 5 targets on page, adds more later if needed.
	_.times(5, addTarget);
})();

function addTarget() {
	var el = document.createElement('div');
	el.classList.add('touch-marker');
	el.classList.add(targetInactive);
	// Build target offscreen.
	setTargetLocation(el, -300, -300)
	targetContainer.appendChild(el);

	return el;
}

// Creates a new target element on finger down. Draws from the pre-rendered
// pool until exhausted, then creates new elements as needed.
targetContainer.addEventListener('touchstart', function(e) {
	e.preventDefault();
	e.stopPropagation();
	// changedTouches
	// Add to map
	_.each(e.changedTouches, function(touch) {
		// Either gets an available marker or creates a new one.
		var nextTarget =
			document.querySelector('.' + targetInactive) ||
			addTarget();
		targets[touch.identifier] = nextTarget;
		nextTarget.classList.remove(targetInactive);
		nextTarget.classList.add(targetActive);
		setTargetLocation(nextTarget, touch.clientX, touch.clientY);
	});
});

// Fade out target element when finger lifted.
targetContainer.addEventListener('touchend', handleTouchUp);
targetContainer.addEventListener('touchcancel', handleTouchUp);
function handleTouchUp(e) {
	e.preventDefault();
	e.stopPropagation();

	_.each(e.changedTouches, function(touch) {
		var target = targets[touch.identifier];

		target.classList.remove(targetActive);
		target.classList.add('touch-marker--fade');
		_.delay(function() {
			target.classList.add(targetInactive);
			target.classList.remove('touch-marker--fade');
		}, 1500);
	});
}

// Track each movement by moving the underlying target element.
targetContainer.addEventListener('touchmove', function(e) {
	e.preventDefault();
	e.stopPropagation();

	_.each(e.changedTouches, function(touch) {
		var target = targets[touch.identifier];
		setTargetLocation(target, touch.clientX, touch.clientY);
	});
});

// Prevent scrolling on doc.
document.body.addEventListener('touchmove', function(e) {
  e.preventDefault();
}); 

function setTargetLocation(el, x, y) {
	var moveTarget = function() {
		el.style.webkitTransform =
			'translateX(' + (x - touchOffset) + 'px) ' +
			'translateY(' + (y - touchOffset - heightOffset) + 'px)' +
			(settings.useTranslateZ ? ' translateZ(0)' : '');
	};
	
	if (settings.useRAF) {
		window.webkitRequestAnimationFrame(moveTarget);
	} else {
		moveTarget();
	}
}