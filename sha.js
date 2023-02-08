const crypto = require("crypto");

function sha(str, num) {
  if (num === 0) {
    return str;
  } else {
    const hash = crypto.createHash("sha3-512");
    hash.update(str);
    str = hash.digest("hex");
    num = num - 1;
    return sha(str, num);
  }
}

exports.sha = sha
