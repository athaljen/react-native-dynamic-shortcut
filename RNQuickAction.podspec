require 'json'
version = JSON.parse(File.read('package.json'))["version"]

Pod::Spec.new do |s|

  s.name         = "RNQuickAction"
  s.version      = version
  s.homepage     = "https://github.com/athaljen/react-native-dynamic-shortcut.git"
  s.summary      = "A react-native interface for Touch 3D home screen quick actions shortcut"
  s.license      = "MIT"
  s.author       = { "Athal Jen" => "athaljen@gmail.com" }
  s.platform     = :ios, "9.0"
  s.source       = { :git => "https://github.com/athaljen/react-native-dynamic-shortcut.git", :tag => "#{s.version}" }
  s.source_files = 'RNQuickAction/RNQuickAction/*.{h,m}'
  s.preserve_paths = "**/*.js"
  s.dependency 'React'

end
