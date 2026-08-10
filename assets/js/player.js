function parseTime(s) {
    var p = s.split(':').map(Number);
    return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + p[1];
}

document.querySelectorAll('.tracklist').forEach(function(list) {
    var audio = document.getElementById(list.dataset.player);
    list.querySelectorAll('.tracklist-time').forEach(function(el) {
        el.addEventListener('click', function() {
            audio.currentTime = parseTime(this.dataset.time);
            audio.play();
        });
    });
});
