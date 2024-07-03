class Prompt {
	static async run(options) {
		options = options || process.argv;
		const prom = new Promise((resolve, reject) => {
			try {
				const questionPrompt = options.at(options.indexOf("--question") + 1);
				const readline = require('readline').createInterface({
					input: process.stdin,
					output: process.stdout
				});
				
				readline.question(`${questionPrompt}`, resp => {
					readline.close();
					resolve(resp);
				});
			} catch(e) {
				reject(e);
			}
		});

		return prom;
	}
}

module.exports = {
	default: Prompt
}


if (process.argv.includes("--test-prompt")) Prompt.run();
