import fs from "fs";
import path from "path";
import axios from "axios";

async function downloadFile(
  url: string,
  outputPath: string
): Promise<string | null> {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", () => resolve(outputPath));
      writer.on("error", reject);
    });
  } catch (error) {
    console.error(`Failed to download file from ${url}:`, error);
    return null;
  }
}

async function createImagesTs(
  images: { path: string; name: string }[],
  IMAGES_TS_PATH: string
): Promise<void> {
  let imports = "";
  let exports = "export const images = {\n";

  images.forEach(({ name, path }, index) => {
    imports += `const ${name} = require('${path}');\n`;
    exports += `  ${name},\n`;
  });

  exports += "} as any;";
  fs.writeFileSync(IMAGES_TS_PATH, `${imports}\n${exports}`, "utf8");
}

async function saveToJson(
  categories: any[],
  carousel: string[],
  icon: string,
  name: string,
  JSON_DB_PATH: string
): Promise<void> {
  const data = JSON.stringify(
    {
      app_name: name,
      categories,
      carousel,
      icon_url: icon,
    },
    null,
    2
  );
  fs.writeFileSync(JSON_DB_PATH, data, "utf8");
}

async function processImages(
  ASSETS_FOLDER_PATH: string,
  JSON_DB_PATH: string,
  IMAGES_TS_PATH: string,
  carousel: string[],
  categories: any[],
  icon: string,
  name: string,
  createImagesTs: (
    images: { path: string; name: string }[],
    IMAGES_TS_PATH: string
  ) => Promise<void>,
  saveToJson: (
    categories: any[],
    carousel: string[],
    icon: string,
    name: string,
    JSON_DB_PATH: string
  ) => Promise<void>
): Promise<string> {
  if (!fs.existsSync(ASSETS_FOLDER_PATH)) {
    fs.mkdirSync(ASSETS_FOLDER_PATH, { recursive: true });
  }

  let images: { path: string; name: string }[] = [];

  await Promise.all(
    categories.map(async (category, index) => {
      const filename = path.join(
        ASSETS_FOLDER_PATH,
        path.basename(category.icon)
      );
      const fileDownloaded = await downloadFile(category.icon, filename);

      if (!fileDownloaded) {
        throw new Error("Could not download the image file");
      }

      const iconPath = `@/assets/images/${path.basename(filename)}`;
      category.icon = `icon${index}`;
      images.push({ path: iconPath, name: `icon${index}` });

      if (!category.images || !category.images.length) {
        throw new Error("empty category images array");
      }

      await Promise.all(
        category.images.map(async (image: string, id: number) => {
          const imageFilename = path.join(
            ASSETS_FOLDER_PATH,
            path.basename(image)
          );
          const imageDownloaded = await downloadFile(image, imageFilename);

          if (!imageDownloaded) {
            throw new Error("Could not download the image file");
          }

          const imagePath = `@/assets/images/${path.basename(imageFilename)}`;
          category.images[id] = `image${index}_${id}`;
          images.push({ path: imagePath, name: `image${index}_${id}` });
        })
      );
    })
  );

  await Promise.all(
    carousel.map(async (image, id) => {
      const filename = path.join(ASSETS_FOLDER_PATH, path.basename(image));
      const fileDownloaded = await downloadFile(image, filename);

      if (!fileDownloaded) {
        throw new Error("Could not download the image file");
      }

      const imagePath = `@/assets/images/${path.basename(filename)}`;
      carousel[id] = `carousel${id}`;
      images.push({ path: imagePath, name: `carousel${id}` });
    })
  );

  const iconFilename = path.join(ASSETS_FOLDER_PATH, path.basename(icon));
  const iconDownloaded = await downloadFile(icon, iconFilename);

  if (!iconDownloaded) {
    throw new Error("Could not download the app icon file");
  }

  const appIconPath = `@/assets/images/${path.basename(iconFilename)}`;
  icon = `appIcon`;
  images.push({ path: appIconPath, name: `appIcon` });

  await createImagesTs(images, IMAGES_TS_PATH);
  await saveToJson(categories, carousel, icon, name, JSON_DB_PATH);

  return appIconPath.replace("@/", "./");
}

// This function should be added to your GitHub Actions workflow script
(async () => {
  const ASSETS_FOLDER_PATH =
    process.env.ASSETS_FOLDER_PATH || "../assets/images";
  const JSON_DB_PATH = process.env.JSON_DB_PATH || "../db.json";
  const IMAGES_TS_PATH = process.env.IMAGES_TS_PATH || "../utils/index.ts";

  const carousel = JSON.parse(process.env.CAROUSEL || "[]");
  const categories = JSON.parse(process.env.CATEGORIES || "[]");
  const icon = process.env.ICON || "";
  const name = process.env.APP_NAME || "";

  try {
    await processImages(
      ASSETS_FOLDER_PATH,
      JSON_DB_PATH,
      IMAGES_TS_PATH,
      carousel,
      categories,
      icon,
      name,
      createImagesTs,
      saveToJson
    );
    console.log("Images processed successfully.");
  } catch (error) {
    console.error("Error processing images:", error);
  }
})();
