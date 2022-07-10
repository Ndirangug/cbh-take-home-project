const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  candidate = event ? createHashFromEvent(event) : TRIVIAL_PARTITION_KEY;

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};

function createHashFromEvent(event) {
  let candidate;

  if (event.partitionKey) {
    const data = event.partitionKey;

    candidate = typeof data === "string" ? data : JSON.stringify(data);
  } else {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }

  return candidate;
}
