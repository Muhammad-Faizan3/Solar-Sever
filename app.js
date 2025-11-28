const section = document.querySelector(".before-after-container");
const afterWrapper = document.querySelector(".after-wrapper");
const divider = document.querySelector(".divider");

let isDragging = false;

divider.addEventListener("mousedown", () => {
  isDragging = true;
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const rect = section.getBoundingClientRect();
  let x = e.clientX - rect.left;

  if (x < 0) x = 0;
  if (x > rect.width) x = rect.width;

  afterWrapper.style.left = x + "px";
  divider.style.left = x + "px";
});
let winter = ["December", "January", "February"];
let index = winter.indexOf("February");
