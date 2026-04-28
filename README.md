# prompt-architect

A CLI tool to build structured, production-ready prompts based on the components defined in the website documentation. It uses XML tagging to define boundaries between roles, context, instructions, and data to reduce model hallucinations.

## Features

- Interactive prompts for Role, Context, Instructions, Constraints, and Input.
- Support for adding multiple few-shot examples.
- Automatically copies the final prompt to the clipboard.
- Optional saving to a local file.

## Installation

1. Navigate to the project directory:
   ```bash
   cd prompt-architect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Link the CLI globally:
   ```bash
   npm link
   ```

## Usage

Run the following command in your terminal:

```bash
prompt-architect
```

Follow the interactive prompts to generate your structured prompt. Once finished, the output will be copied to your clipboard and you will be asked if you want to save it to a file.
