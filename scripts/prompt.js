class Prompt {
	static async run(questionPrompt) {
		const prom = new Promise((resolve, reject) => {
			try {
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

// test
// Prompt.run("Hello, whats your name?")
// 	.then(result => {
// 		console.log(result);
// 	});
