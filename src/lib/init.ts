import inquirer from 'inquirer';
import fs from 'fs';

import { Config, ConfigFile } from './types.js';

const { existsSync } = fs;
enum CustomConfig {
  All,
  Base,
  Recommended,
}
interface Answers extends Config {
  useCustomConfig: boolean;
  customConfig: CustomConfig;
  overwriteConfig: boolean;
  useTicket: boolean;
  useDefaultMainBranches: boolean;
  validateBranch: boolean;
  validateCommit: boolean;
  createBranch: boolean;
  createCommitFromBranch: boolean;
  createCommit: boolean; // TODO
}

export const init = () => {
  return inquirer.prompt<Answers>([
    // WOULD YOU LIKE TO VALIDATE BRANCH NAME

    // WOULD YOU LIKE TO CREATE BRANCH NAME

    // WOULD YOU LIKE TO VALIDATE COMMIT MESSAGE

    // WOULD YOU LIKE TO CREATE COMMIT MESSAGE

    // WOULD YOU LIKE TO CREATE CONVENTIONAL COMMIT MESSAGE
    {
      message: 'Would you like to create custom config?',
      name: 'useCustomConfig',
      type: 'confirm',
    },
    {
      choices: [
        { name: 'all', value: CustomConfig.All },
        { name: 'base', value: CustomConfig.Base },
        {
          checked: 'true',
          name: 'recommended (only)',
          value: CustomConfig.Recommended,
        },
      ],
      message: 'Which options would you like to set?',
      name: 'costomConfig',
      type: 'list',
      when: ({ useCustomConfig }) => useCustomConfig,
    },
    {
      choices: [ConfigFile.PackageJSON, ConfigFile.GitNames],
      message: 'Where to save the config?',
      name: 'configFile',
      type: 'list',
      when: ({ useCustomConfig }) => useCustomConfig,
    },
    {
      message: `Config file ${ConfigFile.GitNames} already exist. Do you want to overwrite it?`,
      name: 'overwriteConfig',
      type: 'confirm',
      when: ({ configFile }) =>
        existsSync(configFile) && configFile === ConfigFile.GitNames,
    },
    {
      message:
        'Would you like to use default main branches (["master", "main", "dev", "test"])?',
      name: 'useDefaultMainBranches',
      type: 'confirm',
      when: ({ useCustomConfig }) => useCustomConfig,
    },
    {
      filter: input => input.split(','),
      message: 'Enter comma separated list of branch names.',
      name: 'mainBranches',
      type: 'input',
      validate: input => {
        if (input.length > 0) {
          return true;
        }

        return 'Enter at least one branch';
      },
      when: ({ useCustomConfig, useDefaultMainBranches }) =>
        useCustomConfig && useDefaultMainBranches,
    },
    {
      message: 'Would you like to use tickets as a scope?',
      name: 'useTicket',
      type: 'confirm',
      when: ({ customConfig, useCustomConfig }) =>
        useCustomConfig && customConfig !== CustomConfig.Base,
    },
    {
      message: 'Type ticket key',
      name: 'ticketKey',
      type: 'input',
      when: ({ customConfig, useCustomConfig }) =>
        useCustomConfig && customConfig !== CustomConfig.Base,
    },
    {
      message: 'Type ticket separator (default: "-").',
      name: 'ticketSeparator',
      type: 'input',
      when: ({ customConfig, useCustomConfig }) =>
        useCustomConfig && customConfig !== CustomConfig.Base,
    },
    {
      filter: ({ branchesToSkip }) => branchesToSkip.split(','),
      message:
        'Enter comma separated list of change types to to use for commits and branch names (default: ["build", "fix", "feat", "chore", "ci", "docs", "perf", "refactor", "style", "test"]).',
      name: 'changeType',
      type: 'input',
      when: ({ customConfig, useCustomConfig }) =>
        useCustomConfig && customConfig !== CustomConfig.Base,
    },
    {
      message:
        'Type global scope that will be used to create and to validate branches and commits.',
      name: 'globalScope',
      type: 'input',
      when: ({ customConfig, useCustomConfig }) =>
        useCustomConfig && customConfig === CustomConfig.All,
    },
    {
      message:
        'Set branch description characters range (default: "[a-z0-9_-]").',
      name: 'branchDescriptionChars',
      type: 'input',
      when: ({ customConfig, useCustomConfig }) =>
        useCustomConfig && customConfig === CustomConfig.All,
    },
    {
      message: 'Set max description length (default: 92).',
      name: 'branchMaxLength',
      type: 'input',
      validate: ({ branchMaxLength }) => {
        if (isNaN(branchMaxLength)) {
          return 'Please enter a valid number';
        }

        return true;
      },
      when: ({ customConfig, useCustomConfig }) =>
        useCustomConfig && customConfig === CustomConfig.All,
    },
    {
      message: 'Set minimum description length. (default: 4).',
      name: 'branchMinLength',
      type: 'input',
      validate: ({ branchMinLength }) => {
        if (isNaN(branchMinLength)) {
          return 'Please enter a valid number';
        }

        return true;
      },
      when: ({ customConfig, useCustomConfig }) =>
        useCustomConfig && customConfig === CustomConfig.All,
    },
    {
      message: 'Set branch parts separator (default: "/").',
      name: 'branchSeparator',
      type: 'input',
      validate: ({ branchSeparator }) => {
        if (branchSeparator.length > 1) {
          return 'Please enter one character';
        }

        return true;
      },
      when: ({ customConfig, useCustomConfig }) =>
        useCustomConfig && customConfig === CustomConfig.All,
    },
    {
      message:
        'Enter a feedback message that will be displayed when branch name is invalid.',
      name: 'branchNameFeedback',
      type: 'input',
      when: ({ customConfig, useCustomConfig }) =>
        useCustomConfig && customConfig === CustomConfig.All,
    },
    {
      message: 'Enter a pattern that will be used to validate branch.',
      name: 'branchNamePattern',
      type: 'input',
      when: ({ customConfig, useCustomConfig }) =>
        useCustomConfig && customConfig === CustomConfig.All,
    },
    {
      filter: ({ branchesToSkip }) =>
        branchesToSkip ? branchesToSkip.split(',') : [],
      message:
        'Enter comma separated list of branch names to skip validation for.',
      name: 'branchesToSkip',
      type: 'input',
      validate: input => {
        if (input.length > 0) {
          return true;
        }

        return 'Enter at least one branch';
      },
      when: ({ customConfig, useCustomConfig }) =>
        useCustomConfig && customConfig === CustomConfig.All,
    },
    {
      message: 'Enter a pattern to validate commit message (default: ".*).',
      name: 'commitMessagePattern',
      type: 'input',
      when: ({ customConfig, useCustomConfig }) =>
        useCustomConfig && customConfig === CustomConfig.All,
    },
    {
      message: 'Set max ticket number length (default: 1).',
      name: 'ticketNumberMinLength',
      type: 'input',
      validate: ({ ticketNumberMinLength }) => {
        if (ticketNumberMinLength && isNaN(ticketNumberMinLength)) {
          return 'Please enter a valid number';
        }

        return true;
      },
      when: ({ customConfig, useCustomConfig }) =>
        useCustomConfig && customConfig === CustomConfig.All,
    },
    {
      message: 'Set minimum description length (default: 0).',
      name: 'ticketNumberMaxLength',
      type: 'input',
      validate: ({ ticketNumberMaxLength }) => {
        if (ticketNumberMaxLength && isNaN(ticketNumberMaxLength)) {
          return 'Please enter a valid number';
        }

        return true;
      },
      when: ({ customConfig, useCustomConfig }) =>
        useCustomConfig && customConfig === CustomConfig.All,
    },
  ]);
  // .then(answers => {
  //   console.log('Your favorite color is ' + answers.color + '.');

  //   if (answers.isLight) {
  //     console.log('It is a light color.');
  //   } else {
  //     console.log('It is a dark color.');

  //     if (answers.color === 'Blue') {
  //       console.log('You like ' + answers.shade + ' shade of blue.');
  //     } else if (answers.color === 'Green') {
  //       console.log('You like ' + answers.shade + ' shade of green.');
  //     }
  //   }
  // });
};
