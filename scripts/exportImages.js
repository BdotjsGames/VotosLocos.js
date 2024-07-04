require('dotenv').config()
const { execSync } = require("child_process");
const path = require("path");

class CropImage {
	static async run(options) {
		try {
			const args = options || process.argv;
			const isTesting = args.includes("--test");
			const parts = ["Torso", "Head", "Legs", "RightArm", "LeftArm"];
			const Prompt = require("./prompt.js").default;
			const filePath = await Prompt.run(["--question", "What is the .aseprite file absolute path?"]);
			const fileName = filePath.replace(/\\/g, "/").split("/").pop().replace(/\s/g, "").replace(".aseprite", "");
			const outputPath = path.join(__dirname, "./../src/Assets/images/");
			const asepritePath = process.env.ASEPRITE_PATH || (await Prompt.run(["--question", `What is the absolute path for aseprite.exe? [default: ${"C:/Program Files/Aseprite/aseprite.exe"}]`])) || "C:/Program Files/Aseprite/aseprite.exe";

			for (const aPart of parts) {
				const outputPathWithFilename = path.join(outputPath, `./${fileName}/`, `${fileName}-${aPart}`);
				const stdOut = execSync(`"${path.join(asepritePath)}" -b ${isTesting ? "--preview" : ""} --ignore-empty --verbose --layer ${aPart} "${filePath}" --sheet "${outputPathWithFilename}.png" --data "${outputPathWithFilename}.json"`, {
					encoding: "utf-8"
				});
				console.log(stdOut);
			}
		} catch(e) {
			console.error(e);
		}
		// const puppeteer = require('puppeteer');

		// const browser = await puppeteer.launch();
		// const page = await browser.newPage();

		// await page.setContent(``);
	}
}

module.exports = {
	default: CropImage
}

if (process.argv.includes("--run")) CropImage.run();