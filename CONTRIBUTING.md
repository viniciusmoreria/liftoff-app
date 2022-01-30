# Contributing Guidelines 

Great to have you here! Here are a few ways you can help make this project better!

## Setting up a development environment

Refer to [React Native environment setup](https://reactnative.dev/docs/environment-setup) to make sure everything is up and running.
Follow the `Expo CLI Quickstart` section as Liftoff runs on Expo managed flow.

*Note: you'll need a MacOS to run iOS apps*

### How to run

Clone repository and install dependencies:
```sh
git@github.com:viniciusmoreria/liftoff.git

cd liftoff

yarn

npm install -g expo-cli
```

Run the app:
```sh
yarn ios
```

or

```sh
yarn android
```

At this point, the app should be running on the simulator or on your device!

## Code style

We use [ESLint](https://eslint.org/) to enforce code style and best practices. We have a pre-commit hook enforcing commits to follow our lint rules.

To check for lint issues on your code, run this on your terminal:

```sh
yarn lint
```

## Code formatting

We use [Prettier](https://prettier.io) to format the code style in our project. We have a pre-commit hook enforcing commits to follow our style guides.

To fix your code formatting issues, run this on your terminal:

```sh
yarn format
```

[Check this link](https://prettier.io/docs/en/editors.html) to see how to integrate Prettier with your preferred code editor, and run Prettier when save your file for example.

### Pull request

As soon as your changes are ready, you can open a Pull Request.

The title of your PR should be descriptive, including either feat, fix or refactor at the beginning, e.g. fix: app crashing on startup.

You may share working results prior to finishing, please include [WIP] in the title. This way anyone can look at your code: you can ask for help within the PR if you don't know how to solve a problem.

Your PR is automatically inspected by various tools, check their response and try to improve your code accordingly. Requests that fail to build or have wrong coding style won't be merged.
