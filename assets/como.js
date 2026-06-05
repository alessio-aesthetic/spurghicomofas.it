(() => {
  const box = document.getElementById("cookieBox");
  const ok = document.getElementById("cookieOk");
  if (box && localStorage.getItem("como-cookie-consent") !== "ok") {
    box.classList.add("show");
  }
  ok?.addEventListener("click", () => {
    localStorage.setItem("como-cookie-consent", "ok");
    box?.classList.remove("show");
  });
})();
