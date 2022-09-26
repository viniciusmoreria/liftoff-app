const { withDangerousMod } = require('@expo/config-plugins');
const path = require('path');
const fs = require('fs');

function withNewPodfile(config) {
  return withDangerousMod(config, [
    'ios',
    async (c) => {
      const filePath = path.join(c.modRequest.platformProjectRoot, 'Podfile');
      const contents = fs.readFileSync(filePath, 'utf-8');

      const results = contents.includes('$static_library')
        ? contents
        : contents.replace(
            '# end',
            `# end

  $static_library = [
    'Google-Maps-iOS-Utils',
    'GoogleMaps',
    'react-native-maps',
    'react-native-google-maps',
    'React-hermes'
  ]
             
  pre_install do |installer|
    Pod::Installer::Xcode::TargetValidator.send(:define_method, :verify_no_static_framework_transitive_dependencies) {}
      installer.pod_targets.each do |pod|
        bt = pod.send(:build_type)
        if $static_library.include?(pod.name)
          puts "Overriding the build_type to static_library from static_framework for #{pod.name}"
          def pod.build_type;
            Pod::BuildType.static_library
          end
        end
      end
      installer.pod_targets.each do |pod|
        bt = pod.send(:build_type)
        puts "#{pod.name} (#{bt})"
        puts "  linkage: #{bt.send(:linkage)} packaging: #{bt.send(:packaging)}"
      end
  end`
          );
      fs.writeFileSync(filePath, results);

      return c;
    },
  ]);
}

module.exports = (config) => {
  return withNewPodfile(config);
};
