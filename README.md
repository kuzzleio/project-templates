# Kuzzle Project Scaffold

This repository contains references for scaffolding new Kuzzle projects.

The project scaffold in this repository are used by the [kourou app:scaffold](https://github.com/kuzzleio/kourou/#kourou-appscaffold-name) command.

Each branch contains only it's template flavor to reduce the amount of data downloaded during scaffolding. The master branch contains all flavors.

## Common tooling

Every scaffold comes with all necessary tools to develop a Kuzzle project:
 - Typescript support
 - Docker Compose configuration
 - Hot reload with Ergol
 - Linter rules with Eslint
 - Functionnal test framework with Cucumber
 - CI/CD with Github Actions

### Available template flavors

 - [generic](./generic/): a standard Kuzzle project
 - [iot-platform](./iot-platform/): a project using Kuzzle IoT Platform

## Add a new flavor

You should start from the `clean` branch which does not contains the file associated with other flavors.

Then, create a new branch with the same name as your flavor.

When you are done, commit and push your branch. Then modify the root README to reference your flavor.
