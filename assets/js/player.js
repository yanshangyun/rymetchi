function fmtTime(s) {
    s = Math.floor(s);
    var h = Math.floor(s / 3600);
    var m = Math.floor((s % 3600) / 60);
    var sec = s % 60;
    return h + ':' + (m < 10 ? '0' : '') + m + ':' + (sec < 10 ? '0' : '') + sec;
}

function parseTime(s) {
    var p = s.split(':').map(Number);
    return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + p[1];
}

document.querySelectorAll('.player').forEach(function(ctrl) {
    var audio = document.getElementById(ctrl.dataset.for);
    var btn = ctrl.querySelector('.player-play');
    var seek = ctrl.querySelector('.player-seek');
    var curr = ctrl.querySelector('.player-current');
    var dur = ctrl.querySelector('.player-duration');

    function updateProgress() {
        var pct = audio.duration ? (audio.currentTime / audio.duration * 100) : 0;
        seek.style.setProperty('--progress', pct + '%');
    }

    audio.addEventListener('loadedmetadata', function() {
        seek.max = audio.duration;
        dur.textContent = fmtTime(audio.duration);
    });

    audio.addEventListener('timeupdate', function() {
        seek.value = audio.currentTime;
        curr.textContent = fmtTime(audio.currentTime);
        updateProgress();
    });

    audio.addEventListener('play', function() { btn.textContent = '⏸'; });
    audio.addEventListener('pause', function() { btn.textContent = '▶'; });
    audio.addEventListener('ended', function() { btn.textContent = '▶'; });

    btn.addEventListener('click', function() {
        audio.paused ? audio.play() : audio.pause();
    });

    seek.addEventListener('input', function() {
        audio.currentTime = seek.value;
        updateProgress();
    });
});

//wire up tracklist timestamps
document.querySelectorAll('.tracklist').forEach(function(list) {
    var audio = document.getElementById(list.dataset.player);
    list.querySelectorAll('.tracklist-time').forEach(function(el) {
        el.addEventListener('click', function() {
            audio.currentTime = parseTime(this.dataset.time);
            audio.play();
        });
    });
});
