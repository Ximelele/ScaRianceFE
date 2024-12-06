import _sodium from 'libsodium-wrappers';

/**
 * Sodium needs to initialize so its functions can be used.
 */

async function sodiumPlugin(context: any) {
  await initSodium();
}

async function initSodium() {
  await _sodium.ready
}

export default sodiumPlugin;

