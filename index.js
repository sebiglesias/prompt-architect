#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import clipboardy from 'clipboardy';

const components = [
  {
    name: 'role',
    message: 'What is the role/persona of the AI? (e.g., Senior Software Engineer)',
    type: 'input'
  },
  {
    name: 'context',
    message: 'Provide the background context for the task:',
    type: 'editor'
  },
  {
    name: 'instructions',
    message: 'What are the step-by-step instructions?',
    type: 'editor'
  },
  {
    name: 'constraints',
    message: 'What are the constraints or what NOT to do?',
    type: 'editor'
  },
  {
    name: 'input',
    message: 'What is the actual input data/question to process?',
    type: 'editor'
  }
];

async function collectExamples() {
  const examples = [];
  let addMore = true;

  while (addMore) {
    const { confirm } = await inquirer.prompt([
      {
        name: 'confirm',
        type: 'confirm',
        message: 'Would you like to add a few-shot example?',
        default: false
      }
    ]);

    if (!confirm) {
      addMore = false;
      break;
    }

    const { input, output } = await inquirer.prompt([
      {
        name: 'input',
        message: 'Example Input:',
        type: 'input'
      },
      {
        name: 'output',
        message: 'Example Output:',
        type: 'input'
      }
    ]);

    examples.push({ input, output });
  }
  return examples;
}

async function main() {
  console.log('--- Prompt Architect: Build a Production-Ready Prompt ---');
  
  const answers = await inquirer.prompt(components);
  const examples = await collectExamples();

  const prompt = `
<role>
${answers.role}
</role>

<context>
${answers.context}
</context>

<instructions>
${answers.instructions}
</instructions>

<constraints>
${answers.constraints}
</constraints>

${examples.length > 0 ? `<examples>
${examples.map(ex => `  <example>
    <input>${ex.input}</input>
    <output>${ex.output}</output>
  </example>`).join('\n')}
</examples>` : ''}

<input>
${answers.input}
</input>
`.trim();

  console.log('\n--- Generated Prompt ---\n');
  console.log(prompt);
  console.log('\n------------------------\n');

  try {
    await clipboardy.write(prompt);
    console.log('📋 Prompt copied to clipboard by default!\n');
  } catch (err) {
    console.error('Failed to copy to clipboard:', err.message);
  }

  const { save } = await inquirer.prompt([
    {
      name: 'save',
      type: 'confirm',
      message: 'Save this prompt to a file?',
      default: true
    }
  ]);

  if (save) {
    const { filename } = await inquirer.prompt([
      {
        name: 'filename',
        type: 'input',
        message: 'Filename:',
        default: 'prompt.txt'
      }
    ]);
    fs.writeFileSync(filename, prompt);
    console.log(`Prompt saved to ${filename}`);
  }
}

main().catch(err => {
  console.error('Error:', err);
});
