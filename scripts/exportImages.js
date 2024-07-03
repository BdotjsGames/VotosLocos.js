const { execSync } = require("child_process");
class CropImage {
	static async run() {
		const isDebugging = false;
		const parts = ["Torso", "Head", "Legs", "RightArm", "LeftArm"];
		const Prompt = require("./prompt.js").default;
		const filePath = await Prompt.run("What is the .aseprite file absolute path?")
		const fileName = filePath.replace(/\\/g, "/").split("/").pop().replace(/\s/g, "").replace(".aseprite", "");

		for (const aPart of parts) {
			try {
				const stdOut = execSync(`"C:\\Program Files\\Aseprite\\aseprite.exe" -b ${isDebugging ? "--preview" : ""} --ignore-empty --verbose --layer ${aPart} "${filePath}" --sheet ${fileName}-${aPart}.png`, {
					encoding: "utf-8"
				});
				console.log(stdOut);
			} catch(e) {
				console.error(e);
			}
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

CropImage.run();
