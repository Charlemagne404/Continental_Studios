document.addEventListener("DOMContentLoaded", () => {
  const websiteItems = document.querySelectorAll(".website-item, .website-card");
  const backToTop = document.getElementById("backToTop");
  const logoutBtn = document.getElementById("logout-btn");

  if (websiteItems.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    websiteItems.forEach((item) => observer.observe(item));
  }

  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.style.display = window.scrollY > 200 ? "block" : "none";
    }, { passive: true });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      window.location.href = "https://pclaystation.github.io/Dashboard/?";
    });
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-analytics]");
    if (!target || typeof window.gtag !== "function") {
      return;
    }

    window.gtag("event", "ui_click", {
      event_category: "engagement",
      event_label: target.getAttribute("data-analytics"),
      link_url: target.getAttribute("href") || "",
      page_path: window.location.pathname
    });
  });
});
