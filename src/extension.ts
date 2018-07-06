'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { Rules } from './rules';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "badger" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.format', () => {
        // The code you place here will be executed every time your command is executed
        let editor = vscode.window.activeTextEditor;
        if (!editor || editor.document.languageId !== 'javascript') {
            return;
        }

        // let selection = editor.selection;
        // let text = editor.document.getText(selection);

        loopLines(editor);
        // message();

        // Display a message box to the user
        // vscode.window.showInformationMessage('Selected characters: ' + text.length + ' Filetype: ' + editor.document.languageId);
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

function loopLines(editor: vscode.TextEditor) {
    const lineCount = editor.document.lineCount;
    const edit = new vscode.WorkspaceEdit();

    for (let index = 0; index < lineCount; index++) {
        const line = editor.document.lineAt(index);
        const lineText = line.text;

        message(lineText);
        const ruleOutput = (Rules.ruleOne(lineText));
        message(ruleOutput);

        edit.replace(editor.document.uri, line.range, ruleOutput);
        // vscode.TextEdit.replace(line.range, ruleOutput);
        vscode.workspace.applyEdit(edit);
    }
}

function message(text: string){
    // vscode.window.showInformationMessage('Formatted');
    vscode.window.showInformationMessage(text);
}