require('dotenv').config()
const { execSync } = require("child_process");
const { readFileSync } = require('fs');
const path = require("path");

class CropImage {
	static async run(options) {
		try {
			const args = options || process.argv;
			const isTesting = args.includes("--test");
			const Prompt = require("./prompt.js").default;
			const filePath = await Prompt.run(["--question", "What is the .aseprite file absolute path?"]);
			const fileName = filePath.replace(/\\/g, "/").split("/").pop().replace(/\s/g, "").replace(".aseprite", "");
			const outputPath = path.join(__dirname, "./../src/Assets/images/");
			const asepritePath = process.env.ASEPRITE_PATH || (await Prompt.run(["--question", `What is the absolute path for aseprite.exe? [default: ${"C:/Program Files/Aseprite/aseprite.exe"}]`])) || "C:/Program Files/Aseprite/aseprite.exe";

			
			const partsStr = execSync(`"${path.join(asepritePath)}" -b --ignore-empty --list-layers "${filePath}"`, {
				encoding: "utf-8"
			});
			const parts = partsStr.split('\r\n').filter(substr => !!substr);

			for (const aPart of parts) {
				const outputPathWithFilename = path.join(outputPath, `./${fileName}/`, `${fileName}-${aPart}`);
				const stdOut = execSync(`"${path.join(asepritePath)}" -b ${isTesting ? "--preview" : ""} --ignore-empty --verbose --layer "${aPart}" "${filePath}" --sheet "${outputPathWithFilename}.png" --data "${outputPathWithFilename}.json"`, {
					encoding: "utf-8"
				});
				console.log(stdOut);

				const puppeteer = require('puppeteer');
				const browser = await puppeteer.launch({
					headless: true
				});
				const page = await browser.newPage();
				const client = await page.createCDPSession()
				await client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: path.join(outputPath, `./${fileName}/`)});
				const htmlText = readFileSync(path.join(__dirname, './cropImage.html'), 'utf-8');
				await page.setContent(htmlText);
				await page.waitForNetworkIdle({ idleTime: 1000 });
				
				const [fitToScreenCheckbox, fileInput, downloadAnchor] = await Promise.all([
					page.waitForSelector(
						`input[ref="refShrinkToFit"]`
					),
					page.waitForSelector(
						`input[ref="refDragAndDropContainerInputFile"]`
					),
					page.waitForSelector(
						`a[ref="refDownload"]`
					)
				]);
				await fileInput.uploadFile(`${outputPathWithFilename}.png`);

				let prom = new Promise((resolve) => {
					setTimeout(async () => {
						await fitToScreenCheckbox.click();
						resolve();
					}, 1000);
				});

				await prom;
				
				prom = new Promise((resolve) => {
					setTimeout(async () => {
						await downloadAnchor.click();
						resolve()
					}, 2000);
				});
				await prom;
			}

			setTimeout(async () => {
				await browser.close();
			}, 2000)
		} catch(e) {
			console.error(e);
		}
	}
}

module.exports = {
	default: CropImage
}

if (process.argv.includes("--run")) CropImage.run();