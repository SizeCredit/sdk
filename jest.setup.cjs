// Teach JSON.stringify how to handle BigInt
// This is needed because Jest uses JSON serialization internally
// and BigInt values are used throughout the tests
BigInt.prototype.toJSON = function() {
  return this.toString();
};
