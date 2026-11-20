// Small progressive enhancements. Everything works without them: popovers are native HTML,
// links are real links, and the bottom bar is simply always shown when scripts are off.

// 1. Menu links close the full-screen menu before the page scrolls to the anchor.
const menu = document.getElementById("menu");
document.querySelectorAll<HTMLAnchorElement>("[data-menu-link]").forEach((a) => {
  a.addEventListener("click", () => {
    if (menu && menu.matches(":popover-open")) menu.hidePopover();
  });
});

// 2. On wide screens the channel popover opens next to the button that called it.
const sheet = document.getElementById("channels");
const wide = window.matchMedia("(min-width: 768px)");
let lastTrigger: HTMLElement | null = null;
document.querySelectorAll<HTMLElement>('[popovertarget="channels"]').forEach((btn) => {
  btn.addEventListener("click", () => { lastTrigger = btn; });
});
sheet?.addEventListener("beforetoggle", (e) => {
  const ev = e as Event & { newState?: string };
  if (ev.newState !== "open" || !lastTrigger || !wide.matches || sheet.contains(lastTrigger)) {
    sheet.style.removeProperty("--channels-top");
    sheet.style.removeProperty("--channels-right");
    sheet.style.removeProperty("--channels-left");
    return;
  }
  const r = lastTrigger.getBoundingClientRect();
  const w = 380;
  const h = Math.min(sheet.scrollHeight || 560, window.innerHeight - 24);
  const header = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 72;
  let top = r.bottom + 10;
  if (top + h > window.innerHeight - 12) top = Math.max(header + 12, r.top - h - 10);
  const left = Math.min(Math.max(12, r.left), window.innerWidth - w - 12);
  sheet.style.setProperty("--channels-top", `${Math.round(top)}px`);
  sheet.style.setProperty("--channels-left", `${Math.round(left)}px`);
  sheet.style.setProperty("--channels-right", "auto");
});

// 3. Phone bottom bar appears once the hero has left the screen.
const bar = document.querySelector<HTMLElement>("[data-mobile-bar]");
const hero = document.getElementById("hero");
if (bar && hero) {
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(([entry]) => {
      bar.classList.toggle("is-shown", !entry.isIntersecting);
      document.documentElement.classList.toggle("bar-shown", !entry.isIntersecting);
    }, { threshold: 0 });
    io.observe(hero);
  } else {
    bar.classList.add("is-shown");
  }
}
