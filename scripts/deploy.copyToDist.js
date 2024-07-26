const { join, dirname } = require("path");
const { rmSync, mkdirSync, existsSync, readdirSync, copyFileSync, lstatSync } = require("fs");

const copyDir = function (src, dest) {
    let entries = readdirSync(src, { recursive: true, withFileTypes: true })

    for (let entry of entries) {
        let srcPath = join(entry.path, entry.name);
        let destPath = srcPath.replace(src, dest);
        let destDir = dirname(destPath);
        
        if (entry.isFile()) {
            mkdirSync(destDir, { recursive: true })
            copyFileSync(srcPath, destPath);
        }
    }
}

const distDir = join(__dirname, "../dist");
const srcFiles = ["/Assets/", "/js/", "index.html", "manifest.json", "sw.js"];

if (existsSync(distDir)) {
	console.log(`Cleaning up old ${distDir}`);
	rmSync(distDir, { recursive: true, force: true });
}

if (!existsSync(distDir)) {
	console.log(`mkdir ${distDir}`);
	mkdirSync(distDir);
}

console.log("Copying files to dist/")
for (const filePath of srcFiles) {
	const from = join(__dirname, "../src", filePath);
	const to = join(__dirname, "../dist", filePath);
	// console.log(`Copy from [${from}] to [${to}]`);
	if (lstatSync(from).isDirectory()) {
		copyDir(from, to);
	} else {
		copyFileSync(from, to);
	}
}

console.log("Done copying")
