import yaml from "js-yaml";

export default function (eleventyConfig) {
  // Inhalte/Einstellungen als YAML pflegbar
  eleventyConfig.addDataExtension("yaml,yml", (contents) => yaml.load(contents));

  // Statische Dateien (Bilder, CSS, JS) unverändert übernehmen
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Aktuelles Jahr, z. B. fürs Impressum/Footer
  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    // Vorschau läuft unter einem Unterpfad (GitHub Pages). Beim Umzug auf
    // die echte Domain einfach PATH_PREFIX="/" setzen (siehe pages.yml).
    pathPrefix: process.env.PATH_PREFIX || "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
