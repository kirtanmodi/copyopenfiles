import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('copyOpenFiles.copyContents', () => {
		const allDocs = vscode.workspace.textDocuments;
		let outputContent = "";

		allDocs.forEach(doc => {
			outputContent += `// ${doc.fileName}\n${doc.getText()}\n\n`;
		});

		const folderPath = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : '';
		const filePath = path.join(folderPath, 'response.txt');

		fs.writeFile(filePath, outputContent, err => {
			if (err) {
				vscode.window.showErrorMessage('Error writing file: ' + err.message);
				return;
			}
			vscode.env.clipboard.writeText(outputContent).then(() => {
				vscode.window.showInformationMessage('Files successfully written to response.txt and copied to clipboard');
			}, (clipboardError) => {
				vscode.window.showErrorMessage('Error copying content to clipboard: ' + clipboardError.message);
			});
		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }