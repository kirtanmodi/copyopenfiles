// // The module 'vscode' contains the VS Code extensibility API
// // Import the module and reference it with the alias vscode in your code below
// import * as vscode from 'vscode';

// // This method is called when your extension is activated
// // Your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {

// 	// Use the console to output diagnostic information (console.log) and errors (console.error)
// 	// This line of code will only be executed once when your extension is activated
// 	console.log('Congratulations, your extension "copyopenfiles" is now active!');

// 	// The command has been defined in the package.json file
// 	// Now provide the implementation of the command with registerCommand
// 	// The commandId parameter must match the command field in package.json
// 	let disposable = vscode.commands.registerCommand('copyopenfiles.helloWorld', () => {
// 		// The code you place here will be executed every time your command is executed
// 		// Display a message box to the user
// 		vscode.window.showInformationMessage('Hello World from CopyOpenFiles!');
// 	});

// 	context.subscriptions.push(disposable);
// }

// // This method is called when your extension is deactivated
// export function deactivate() {}


import * as vscode from 'vscode';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('copyOpenFiles.copyContents', () => {
		const allDocs = vscode.workspace.textDocuments;
		let outputContent = "";

		allDocs.forEach(doc => {
			outputContent += `// ${doc.fileName}\n${doc.getText()}\n\n`;
		});

		fs.writeFile(vscode.workspace.rootPath + '/response.txt', outputContent, err => {
			if (err) {
				vscode.window.showErrorMessage('Error writing file: ' + err.message);
				return;
			}
			vscode.window.showInformationMessage('Files successfully written to response.txt');
		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
