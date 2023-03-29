# git-names

Conventional commit message creator

[![GitHub license](https://img.shields.io/badge/license-ISC-blue.svg)](https://github.com/aleksanderfret/git-names/blob/main/LICENSE)

## Description

**git-names** is a command-line tool for validating branch names and creating commit message prefixes base active branch name according to [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

- [git-names](#git-names)
  - [Description](#description)
  - [Installation](#installation)
  - [Command Line](#command-line)
  - [Config file](#config-file)
  - [Config options](#config-options)
    - [branchMaxLength](#branchmaxlength)
    - [branchMinLength](#branchminlength)
    - [branchDescriptionChars](#branchdescriptionchars)
    - [branchNameFeedback](#branchnamefeedback)
    - [branchNamePattern](#branchnamepattern)
    - [branchSeparator](#branchseparator)
    - [branchesToSkip](#branchestoskip)
    - [changeType](#changetype)
    - [commitMessagePattern](#commitmessagepattern)
    - [globalScope](#globalscope)
    - [mainBranches](#mainbranches)
    - [ticketKey](#ticketkey)
    - [ticketNumberMaxLength](#ticketnumbermaxlength)
    - [ticketNumberMinLength](#ticketnumberminlength)
    - [ticketSeparator](#ticketseparator)

## Installation

```sh
npm install --save-dev git-names
```

## Command Line

```sh
# validate branch name with the default setup
gn validate-branch-name

# validate branch name using an alias
gn vbn

# validate branch name using custom config
gn vbn -c package.json
```

## Config file

You can adjust **git-names** by adding `gitNames` entry in your project `pacakge.json`.

```json
 "gitNames": {
  "ticketPrefix": "gn",
},
```

## Config options

All options have default values

### branchMaxLength

Type: `number` (optional, default: `92`)

Maximum length of your branch description

### branchMinLength

Type: `number` (optional, default: `4`)

Minimum length of your description

### branchDescriptionChars

Type: `string[]` (optional, default: `[a-z0-9_-]`)
The range of characters allowed to use in a branch description. Don't use [branchSeparator](#branchSeparator) character here, (default or custom one) as it will broke branch name validation.

### branchNameFeedback

Type: `string` (optional, default: `Branch name should follow the pattern: <branchNamePattern>`

The default feedback message that will be displayed to the user when branch doesn't match the pattern, where default pattern is [branchNamePattern](#branchNamePattern))

### branchNamePattern

Type: `string` (optional, default: `^(master|main|dev|test){1}$|^((build|fix|feat|chore|ci|docs|perf|refactor|style|test){1}/key-[0-9]{1,}!?/[a-z0-9-]{4,92})$`)

The pattern is built upon the default options and option provided in the config. The pattern struture allows the program to create commit messages according to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

### branchSeparator

Type: `string` (optional, default: `/`)

Separator used to separate branch name sections: `type`, `scope`, and `description`

### branchesToSkip

Type: `string[]` (optional, default: `['(no branch)', 'no branch']`)

List of branches names that should be skipped from validation.

### changeType

Type: `string[]` (optional, default: `['build', 'fix', 'feat', 'chore', 'ci', 'docs', 'perf', 'refactor', 'style', 'test']`)

The change type that will be allowed to use in branches and that will be added to commit messages in `prepare-commit-msg` hook.

### commitMessagePattern

Type: `string` (optional, default: `.*`)

The pattern used to validate commit message.

### globalScope

Type: `string` (optional, default: `''`)

If it passed it will be used instead of `ticketKey`, `ticketNumberMaxLength`, `ticketNumberMinLength`, `ticketSeparator`.

### mainBranches

Type: `string[]` (optional, default: `['master', 'main', 'dev', 'test']`)

List of branches names that should be skipped from branch validation validation.

### ticketKey

Type: `string` (optional, default: `''`)

The key included in the project's ticket.

### ticketNumberMaxLength

Type: `number` (optional, default: `0`)

Maximum length of your ticket number. For `0` the lenght will be unlimited.

### ticketNumberMinLength

Type: `number` (optional, default: `1`)

Minimum length of your ticket number.

### ticketSeparator

Type: `string` (optional, default: `-`)

The ticket separtor used to separate ticket key and ticket number.
