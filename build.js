const fs = require("fs");
const path = require("path");

const layoutPath = path.join(__dirname, "layouts", "base.html");
const partialsDir = path.join(__dirname, "partials");
const pagesDir = path.join(__dirname, "pages");
const outputDir = __dirname;

// Ortak parçaları oku
const layout = fs.readFileSync(layoutPath, "utf8");
const head = fs.readFileSync(path.join(partialsDir, "head.html"), "utf8");
const header = fs.readFileSync(path.join(partialsDir, "header.html"), "utf8");
const footer = fs.readFileSync(path.join(partialsDir, "footer.html"), "utf8");

// Sayfa dosyalarını döngüyle işle
fs.readdirSync(pagesDir).forEach((file) => {
  if (path.extname(file) === ".html") {
    const pageContent = fs.readFileSync(path.join(pagesDir, file), "utf8");

    const finalHtml = layout
      .replace("<!-- include:head -->", head)
      .replace("<!-- include:header -->", header)
      .replace("<!-- include:footer -->", footer)
      .replace("<!-- content -->", pageContent);

    const outputPath = path.join(outputDir, file); // Örn: home.html → index.html
    const outputFileName = file === "home.html" ? "index.html" : file;

    fs.writeFileSync(path.join(outputDir, outputFileName), finalHtml);
    console.log(`✔ ${outputFileName} oluşturuldu.`);
  }
});
