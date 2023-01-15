let ticking;
const animations = [];

export default function(delay, duration) {
  const now = Date.now();

  // calculate animation start/end times
  const start = now + delay;
  const end = start + duration;

  const animation = {
    start,
    end,
  };

  // add animation
  animations.push(animation);

  if (!ticking) {
    // start ticking
    ticking = true;
    requestAnimationFrame(tick);
  }
  var self = {
    start(cb) {
      // add start callback (just one)
      animation.startcb = cb;
      return self;
    },
    progress(cb) {
      // add progress callback (just one)
      animation.progresscb = cb;
      return self;
    },
    end(cb) {
      // add end callback (just one)
      animation.endcb = cb;
      return self;
    },
  };
  return self;
}

function tick() {
  const now = Date.now();

  if (!animations.length) {
    // stop ticking
    ticking = false;
    return;
  }

  for (var i = 0, animation; i < animations.length; i++) {
    animation = animations[i];
    if (now < animation.start) {
      // animation not yet started..
      continue;
    }
    if (!animation.started) {
      // animation starts
      animation.started = true;
      animation.startcb && animation.startcb();
    }
    // animation progress
    const t = (now - animation.start) / (animation.end - animation.start);
    animation.progresscb && animation.progresscb(t < 1 ? t : 1);
    if (now > animation.end) {
      // animation ended
      animation.endcb && animation.endcb();
      animations.splice(i--, 1);
      continue;
    }
  }
  requestAnimationFrame(tick);
}

// fallback
window.requestAnimationFrame ||
  (window.requestAnimationFrame = function(cb) {
    setTimeout(cb, 0);
  });
