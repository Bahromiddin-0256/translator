let ripple_timeout;
let ripple_end = false;

let element_data = {
  size: 0,
  color: "",
  transition: 200,
  half_width: 0,
  half_height: 0,
  touch_data: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

document.body.addEventListener("pointerdown", (event) => {
  if (event.target.classList.contains("wk-rp") && !event.target.disabled) {
    start(event);
  }
});

document.body.addEventListener("mouseleave", (event) => {
  if (event.target.classList.contains("wk-rp") && !event.target.disabled) {
    end(event.target);
  }
});

document.body.addEventListener("mouseup", (event) => {
  if (event.target.classList.contains("wk-rp") && !event.target.disabled) {
    end(event.target);
  }
});

document.body.addEventListener("touchleave", (event) => {
  if (event.target.classList.contains("wk-rp") && !event.target.disabled) {
    end(event.target);
  }
});

document.body.addEventListener("touchend", (event) => {
  if (event.target.classList.contains("wk-rp") && !event.target.disabled) {
    end(event.target);
  }
});

const start = (event) => {
  set_element_size(event.target);
  set_color_and_transition(event.target);

  element_data.half_width = event.target.offsetWidth / 2;
  element_data.half_height = event.target.offsetHeight / 2;
  ripple_timeout = setTimeout(() => {
    ripple_end = true;
  }, element_data.transition);
  create(event);
};

const set_element_size = (element) => {
  const width = Number(
    window
      .getComputedStyle(element)
      .getPropertyValue("width")
      .replace(/px/gi, "")
  );
  const height = Number(
    window
      .getComputedStyle(element)
      .getPropertyValue("height")
      .replace(/px/gi, "")
  );
  element_data.size = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 4;
};

const set_color_and_transition = (element) => {
  element_data.color = window
    .getComputedStyle(element)
    .getPropertyValue("--wk-rp-color");
  element_data.transition = Number(
    window.getComputedStyle(element).getPropertyValue("--wk-rp-transition")
  );
};

const create = (event) => {
  const span = document.createElement("span");
  span.classList.add("ripple");
  event.target.appendChild(span);
  set_touch_data(event);
  span.style.top = `${element_data.touch_data.top - element_data.size / 2}px`;
  span.style.left = `${element_data.touch_data.left - element_data.size / 2}px`;
  span.style.willChange = "transform border-radius width height top left";
  span.style.backgroundColor = element_data.color;
  span.style.transform = `scale(${
    get_scale_ripple() / (element_data.size / 2)
  })`;
  span.style.width = `${element_data.size}px`;
  span.style.height = `${element_data.size}px`;
  span.style.borderRadius = "100%";
  span.style.position = "absolute";
  span.style.pointerEvents = "none";
  span.style.opacity = "1";
  span.style.transition = `opacity linear ${element_data.transition}ms, transform linear ${element_data.transition}ms`;
};

const set_touch_data = (event) => {
  element_data.touch_data.left = Number(
    Math.abs(event.target.getBoundingClientRect().left - event.clientX)
  );
  element_data.touch_data.top = Number(
    Math.abs(event.target.getBoundingClientRect().top - event.clientY)
  );
  element_data.touch_data.right = Number(
    Math.abs(event.target.getBoundingClientRect().right - event.clientX)
  );
  element_data.touch_data.bottom = Number(
    Math.abs(event.target.getBoundingClientRect().bottom - event.clientY)
  );
};

const get_formula = () => {
  return {
    a: Math.sqrt(
      element_data.touch_data.bottom ** 2 + element_data.touch_data.right ** 2
    ),
    b: Math.sqrt(
      element_data.touch_data.bottom ** 2 + element_data.touch_data.left ** 2
    ),
    c: Math.sqrt(
      element_data.touch_data.top ** 2 + element_data.touch_data.right ** 2
    ),
    d: Math.sqrt(
      element_data.touch_data.top ** 2 + element_data.touch_data.left ** 2
    ),
  };
};

const get_scale_ripple = () => {
  return element_data.touch_data.top <= element_data.half_height &&
    element_data.touch_data.left <= element_data.half_width
    ? get_formula().a
    : element_data.touch_data.top < element_data.half_height &&
      element_data.touch_data.left > element_data.half_width
    ? get_formula().b
    : element_data.touch_data.top > element_data.half_height &&
      element_data.touch_data.left < element_data.half_width
    ? get_formula().c
    : element_data.touch_data.top > element_data.half_height &&
      element_data.touch_data.left > element_data.half_width
    ? get_formula().d
    : get_formula().d;
};

const end = (element) => {
  const span = document.querySelectorAll(".ripple");
  span.forEach((ripple) => {
    if (ripple_end) {
      ripple.style.opacity = "0";
      ripple.style.transition = `opacity linear ${element_data.transition}`;
      ripple.addEventListener("transitionend", () => {
        ripple.remove();
      });
    } else {
      setTimeout(() => {
        ripple.style.opacity = "0";
        ripple.style.transition = `opacity linear ${element_data.transition}`;
        ripple.addEventListener("transitionend", () => {
          ripple.remove();
        });
      }, element_data.transition);
    }
    clearTimeout(ripple_timeout);
    ripple_end = false;
  });
};
