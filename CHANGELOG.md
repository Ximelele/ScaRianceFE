# CHANGELOG

- template headers for release/change tracking
```
### Added
for new features.

### Changed
for changes in existing functionality.

### Deprecated
for soon-to-be removed features.

### Removed
for now removed features.

### Fixed
for any bug fixes.

### Security
in case of vulnerabilities.
```

refer to https://keepachangelog.com

## [Unreleased]

[unreleased]: https://gitlab.int.sk-cert.sk/cvd/cvd-ui/compare/develop...HEAD

### Added
 - access token, symmetric key, public key models
 - libsodium cyrptography library:
   - asymmetric encryption using `x25519` and signing using `ed25519`
   - symmetric encryption using `xsalsa20_poly1305`
 - pinia store for access tokens and locales
 - i18n for access token errors
 - tests using vitest
   - template component test for i18n and conditional element enabling
   - functions related to access tokens - loading, exporting, en/decryption
 - global component for notifications
 - Dynamic form
   - Creation
   - Deletion
   - Duplication
   - Share
   - uuid generating
   - validation for unwanted types
