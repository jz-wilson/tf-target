import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('tf-target.copyTarget', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor');
            return;
        }
        const target = getTerraformTarget(editor.document, editor.selection.active);
        if (target) {
            vscode.env.clipboard.writeText(target);
            vscode.window.showInformationMessage(`Copied Terraform target: ${target}`);
        } else {
            vscode.window.showWarningMessage('Terraform resource not found at cursor');
        }
    });
    context.subscriptions.push(disposable);
}

function getTerraformTarget(doc: vscode.TextDocument, pos: vscode.Position): string | null {
    for (let line = pos.line; line >= 0; line--) {
        const text = doc.lineAt(line).text;
        const resourceMatch = text.match(/^\s*(resource|data)\s+"([^"]+)"\s+"([^"]+)"/);
        if (resourceMatch) {
            return `${resourceMatch[2]}.${resourceMatch[3]}`;
        }
        const moduleMatch = text.match(/^\s*module\s+"([^"]+)"/);
        if (moduleMatch) {
            return `module.${moduleMatch[1]}`;
        }
    }
    return null;
}

export function deactivate() {}
