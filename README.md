# tf-target

A VS Code extension that makes it easy to copy Terraform resource target IDs.

## Features

* Right-click inside a Terraform resource block and select **Copy Terraform Target**.
* The extension copies the resource's `target` identifier (e.g., `aws_instance.web`) to your clipboard.

## Development

Install dependencies and compile the extension:

```bash
npm install
npm run compile
```

Launch the Extension Development Host from VS Code to test the command.
