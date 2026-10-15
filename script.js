var nav = document.getElementById('nav'), hb = document.getElementById('hbg'), bb = document.getElementById('bbg'),
    bg = document.getElementById('bg'), lk = document.getElementById('lk');

function onS() {
    var y = window.scrollY;
    nav.classList.toggle('solid', y > 60);
    if (y < window.innerHeight) hb.style.transform = 'translateY(' + y * .25 + 'px)';
    var r = bb.parentNode.getBoundingClientRect();
    bb.style.transform = 'translateY(' + (-r.top * .12) + 'px)'
}

addEventListener('scroll', onS, {passive: true});
onS();
bg.onclick = function () {
    bg.classList.toggle('open');
    lk.classList.toggle('open')
};
lk.onclick = function (e) {
    if (e.target.tagName == 'A') {
        bg.classList.remove('open');
        lk.classList.remove('open')
    }
};
var tb = document.querySelectorAll('#tabs button'), pn = document.querySelectorAll('.panel');
tb.forEach(function (b, i) {
    b.onclick = function () {
        tb.forEach(function (x) {
            x.classList.remove('on')
        });
        pn.forEach(function (x) {
            x.classList.remove('on')
        });
        b.classList.add('on');
        pn[i].classList.add('on')
    }
});
var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
        if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target)
        }
    })
}, {threshold: .15});
document.querySelectorAll('.rv').forEach(function (el) {
    io.observe(el)
});
if (matchMedia('(hover:hover)').matches) document.querySelectorAll('[data-tilt]').forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5,
            y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = 'perspective(800px) rotateY(' + x * 10 + 'deg) rotateX(' + -y * 10 + 'deg)'
    });
    el.addEventListener('mouseleave', function () {
        el.style.transform = ''
    })
});