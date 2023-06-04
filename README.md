oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g sbxw
$ sbxw COMMAND
running command...
$ sbxw (--version)
sbxw/0.0.0 linux-x64 node-v19.9.0
$ sbxw --help [COMMAND]
USAGE
  $ sbxw COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sbxw SfpCommand`](#sbxw-sfpcommand)
* [`sbxw help [COMMANDS]`](#sbxw-help-commands)
* [`sbxw org login`](#sbxw-org-login)
* [`sbxw plugins`](#sbxw-plugins)
* [`sbxw plugins:install PLUGIN...`](#sbxw-pluginsinstall-plugin)
* [`sbxw plugins:inspect PLUGIN...`](#sbxw-pluginsinspect-plugin)
* [`sbxw plugins:install PLUGIN...`](#sbxw-pluginsinstall-plugin-1)
* [`sbxw plugins:link PLUGIN`](#sbxw-pluginslink-plugin)
* [`sbxw plugins:uninstall PLUGIN...`](#sbxw-pluginsuninstall-plugin)
* [`sbxw plugins:uninstall PLUGIN...`](#sbxw-pluginsuninstall-plugin-1)
* [`sbxw plugins:uninstall PLUGIN...`](#sbxw-pluginsuninstall-plugin-2)
* [`sbxw plugins update`](#sbxw-plugins-update)
* [`sbxw transformation report`](#sbxw-transformation-report)

## `sbxw SfpCommand`

```
USAGE
  $ sbxw SfpCommand
```

_See code: [dist/commands/SfpCommand.ts](https://github.com/adiza-dev/sbxw/blob/v0.0.0/dist/commands/SfpCommand.ts)_

## `sbxw help [COMMANDS]`

Display help for sbxw.

```
USAGE
  $ sbxw help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for sbxw.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `sbxw org login`

Login to a source org or org

```
USAGE
  $ sbxw org login -a <value> -i <value> [-s <value>]

FLAGS
  -a, --alias=<value>        (required) Alias of the authenticated org
  -i, --id=<value>           (required) Id of the org
  -s, --sourceorgid=<value>  Id of the source org

DESCRIPTION
  Login to a source org or org

  Login to the org with the given id and alias
```

## `sbxw plugins`

List installed plugins.

```
USAGE
  $ sbxw plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ sbxw plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `sbxw plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ sbxw plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ sbxw plugins add

EXAMPLES
  $ sbxw plugins:install myplugin 

  $ sbxw plugins:install https://github.com/someuser/someplugin

  $ sbxw plugins:install someuser/someplugin
```

## `sbxw plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ sbxw plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ sbxw plugins:inspect myplugin
```

## `sbxw plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ sbxw plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ sbxw plugins add

EXAMPLES
  $ sbxw plugins:install myplugin 

  $ sbxw plugins:install https://github.com/someuser/someplugin

  $ sbxw plugins:install someuser/someplugin
```

## `sbxw plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ sbxw plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ sbxw plugins:link myplugin
```

## `sbxw plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ sbxw plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ sbxw plugins unlink
  $ sbxw plugins remove
```

## `sbxw plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ sbxw plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ sbxw plugins unlink
  $ sbxw plugins remove
```

## `sbxw plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ sbxw plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ sbxw plugins unlink
  $ sbxw plugins remove
```

## `sbxw plugins update`

Update installed plugins.

```
USAGE
  $ sbxw plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `sbxw transformation report`

Report about transformation

```
USAGE
  $ sbxw transformation report -m <value> -s <value> -i <value>

FLAGS
  -i, --id=<value>       (required) Id of the transformation
  -m, --message=<value>  (required) Message that need to be submitted
  -s, --status=<value>   (required) Status of the transformation

DESCRIPTION
  Report about transformation

  Send message and status
```
<!-- commandsstop -->
