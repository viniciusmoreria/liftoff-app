module.exports = {
  bumpFiles: [
    {
      filename: 'package.json',
    },
    {
      filename: 'app.json',
      updater: require.resolve('standard-version-expo'),
    },
    {
      filename: 'app.json',
      updater: require.resolve('standard-version-expo/android'),
    },
    {
      filename: 'app.json',
      updater: require.resolve('standard-version-expo/ios'),
    },
  ],
  types: [
    { type: 'feat', section: '✨ Features' },
    { type: 'fix', section: '🐛 Bug Fixes' },
    { type: 'perf', section: '🚀 Performance Improvements' },
    { type: 'refactor', section: '🛠 Refactors' },
    { type: 'revert', section: '🔙 Reverts' },
    { type: 'docs', section: '📚 Documentation' },
    { type: 'style', section: '💄 Styles' },
    { type: 'test', section: '📦 Tests' },
    { type: 'chore', section: '🤖 Chores' },
    { type: 'build', section: '🛠 Build System', hidden: true },
    { type: 'ci', hidden: true },
  ],
};
