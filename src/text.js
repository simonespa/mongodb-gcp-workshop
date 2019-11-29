const crypto = require('crypto');

function normalise(text = '') {
  return crypto
    .createHash('sha256')
    .update(
      text
        .trim()
        .toLowerCase()
        .split(/\s/)
        .join('')
    )
    .digest('hex');
}

module.exports = { normalise }