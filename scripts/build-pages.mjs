import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const headerTemplate = fs.readFileSync(path.join(root, "partials/header.html"), "utf8");
const footerTemplate = fs.readFileSync(path.join(root, "partials/footer.html"), "utf8");

const pages = [
  { file: "index.html", active: "home", dashboard: true },
  { file: "news.html", active: "news", dashboard: false },
  { file: "websites.html", active: "websites", dashboard: false },
  { file: "contact.html", active: "none", dashboard: false },
  { file: "404.html", active: "none", dashboard: false },
];

function renderHeader(active, dashboard) {
  const classes = {
    home: active === "home" ? 'class="semi-bold-text"' : "",
    news: active === "news" ? 'class="semi-bold-text"' : "",
    websites: active === "websites" ? 'class="semi-bold-text"' : "",
  };

  const dashboardButton = dashboard
    ? '<div class="right-text"><button id="logout-btn" type="button" data-analytics="dashboard_click">Dashboard</button></div>'
    : "";

  return headerTemplate
    .replace("{{CLASS_HOME}}", classes.home)
    .replace("{{CLASS_NEWS}}", classes.news)
    .replace("{{CLASS_WEBSITES}}", classes.websites)
    .replace("{{DASHBOARD_BUTTON}}", dashboardButton);
}

for (const page of pages) {
  const filePath = path.join(root, page.file);
  let html = fs.readFileSync(filePath, "utf8");

  html = html.replace(
    /<!-- START:HEADER -->[\s\S]*?<!-- END:HEADER -->/,
    `<!-- START:HEADER -->\n${renderHeader(page.active, page.dashboard)}\n<!-- END:HEADER -->`
  );

  html = html.replace(
    /<!-- START:FOOTER -->[\s\S]*?<!-- END:FOOTER -->/,
    `<!-- START:FOOTER -->\n${footerTemplate}\n<!-- END:FOOTER -->`
  );

  fs.writeFileSync(filePath, html);
}

console.log("Built shared header/footer into all pages.");
