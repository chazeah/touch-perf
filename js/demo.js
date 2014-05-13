// Fire several fake touches to encourage user to touch screen
(function() {
	var w = document.width / 3;
	var w2 = (2 * w);
	//w -= 75 / 2;
	var h = document.height / 3;

	var fakeTouches = [
		[0, w, h],
		[1, w2, h],
		[1, w, 2 * h],
		[1, w2, 2 * h],
	];

	_.each(fakeTouches, function(touch, i) {
		var fakeTouch = {
			identifier: touch[0],
			clientX: touch[1],
			clientY: touch[2]
		};

		_.delay(function() {
			var evt = document.createEvent('UIEvents');
			evt.initUIEvent('touchstart', true, true);
			evt.changedTouches = [];
			evt.changedTouches[0] = fakeTouch;
			targetContainer.dispatchEvent(evt);

			evt = document.createEvent('UIEvents');
			evt.initUIEvent('touchend', true, true);
			evt.changedTouches = [];
			evt.changedTouches[0] = fakeTouch;
			targetContainer.dispatchEvent(evt);
		}, 1500 + (100 * i));
	});
})();