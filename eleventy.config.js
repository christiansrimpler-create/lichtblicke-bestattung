import yaml from "js-yaml";

export default function (eleventyConfig) {
  // Inhalte/Einstellungen als YAML pflegbar
  eleventyConfig.addDataExtension("yaml,yml", (contents) => yaml.load(contents));

  // Statische Dateien (Bilder, CSS, JS) unverändert übernehmen
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // CMS (Sveltia): Admin-Oberfläche & Konfiguration 1:1 übernehmen. Die
  // index.html wird vom Template-Build ausgenommen, damit sie nicht durch
  // die Nunjucks-Engine läuft, sondern unverändert kopiert wird.
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.ignores.add("src/admin/index.html");

  // Aktuelles Jahr, z. B. fürs Impressum/Footer
  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));

  // Datum als YYYY-MM-DD (für die Sitemap)
  eleventyConfig.addFilter("dateISO", (d) => new Date(d).toISOString().slice(0, 10));

  // Cache-Busting: ändert sich bei jedem Build, wird an CSS/JS angehängt,
  // damit Besucher nach einer Änderung garantiert die frische Datei laden.
  eleventyConfig.addGlobalData("assetVersion", Date.now());

  // Suchmaschinen-Indexierung nur auf der echten Domain (Root-Pfad "/") erlauben.
  // Die Vorschau unter dem GitHub-Pages-Unterpfad bekommt "noindex", damit sie
  // nicht bei Google landet. Beim Domain-Umzug PATH_PREFIX auf "/" setzen –
  // dann ist die Seite automatisch indexierbar.
  eleventyConfig.addGlobalData(
    "erlaubeIndexierung",
    (process.env.PATH_PREFIX || "/") === "/"
  );

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    // Vorschau läuft unter einem Unterpfad (GitHub Pages). Beim Umzug auf
    // die echte Domain einfach PATH_PREFIX="/" setzen (siehe pages.yml).
    pathPrefix: process.env.PATH_PREFIX || "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
