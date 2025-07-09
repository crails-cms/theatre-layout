export function udpateStickyHeader(event) {
  const header = document.querySelector("#sticky-header");
  const method = window.scrollY > 20 ? "add" : "remove";

  header.classList[method]("stick");
};
