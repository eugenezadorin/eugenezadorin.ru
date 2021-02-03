(function(){

    var touchStartPos = 0;
    var touchEndPos = 0;
    var THRESHOLD = 50;
    var panel = document.getElementById('panel');

    document.addEventListener('touchstart', function(event) {
        touchStartPos = event.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', function(event) {
        touchEndPos = event.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        var diff = touchStartPos - touchEndPos;
        if (Math.abs(diff) > THRESHOLD) {
            if (diff > 0) {
                onSwipeLeft();
            } else {
                onSwipeRight();
            }
        }
    }

    function onSwipeLeft() {
        panel.classList.add('swiped');
    }

    function onSwipeRight() {
        panel.classList.remove('swiped');
    }

})();