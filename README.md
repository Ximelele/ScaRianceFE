# cvd-ui

Common Vulnerability Disclosure UI - unified UI for both privileged and unprivileged clients.

## Keep a changelog, use gitflow
- refer to the [CHANGELOG.md](./CHANGELOG.md) for upcoming and past changes
- refer to the [CVD-DOCS git-flow guideline](https://gitlab.int.sk-cert.sk/cvd/docs/) in the project documentation repo

## Package version notes
- `vue-i18n` is as of now fixed to `9.13.1`, [dues to this issue](https://github.com/intlify/vue-i18n/pull/1919), need to wait for other packages to update their types.

## Build and installation

### Environment variables
 - `VITE_CVD_CORE_API_URL` - url to core api, for instance `http://cvd-core.local`
 - `VITE_CVD_ADMIN_API_URL` - url to admin api, for instance `http://cvd-admin.local`
 - `VITE_API_VERSION` - version of the api to use, for instance `v1`

### Dependencies

Run following command to install all needed dependencies to develop.
```sh
npm install
```

or run dev server directly in docker:
```sh
docker build -t cvd-ui:dev --build-arg http_proxy --build-arg https_proxy .
docker run --name cvd-ui -d -p 8080:5173 cvd-ui:dev
```

all npm commands mentioned below can be run inline using `docker run`

### Tests

To verify that everything is running correctly run following command.
```sh
npm run test
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Usage
TODO


