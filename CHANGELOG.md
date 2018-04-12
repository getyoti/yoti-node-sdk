# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [3.1.1] - 2018-04-12
### Added 
- `isAgeVerified` helper to the profile

## [3.1.0] - 2018-04-05
### Changed
- `userProfile.selfie` will return image data as an array of bytes instead of an image URI

### Added
- `activityDetails.getBase64SelfieUri()` helper returns the base64 selfie URI

### Removed
- `config/config.json` as a method of configuring the SDK

## [3.0.0] - 2018-03-01
### Added
- [AML (Anti Money Laundering) check](README.md#aml-integration)

### Changed
- Yoti client initialisation has been [updated](README.md#upgrading-from-sdk-version-2xx)
