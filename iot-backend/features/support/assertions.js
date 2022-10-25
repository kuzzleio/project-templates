const _ = require("lodash"),
  should = require("should");

should.Assertion.add(
  "matchObject",
  function (expected) {
    this.params = { operator: "match object" };

    for (const [keyPath, expectedValue] of Object.entries(expected)) {
      const objectValue = _.get(this.obj, keyPath);

      if (expectedValue === "_ANY_") {
        should(objectValue).not.be.undefined();
      } else if (expectedValue === "_STRING_") {
        should(objectValue).be.String();
      } else if (expectedValue === "_NUMBER_") {
        should(objectValue).be.Number();
      } else if (expectedValue === "_OBJECT_") {
        should(objectValue).be.Object();
      } else if (expectedValue === "_UNDEFINED_") {
        should(objectValue).be.undefined();
      } else if (expectedValue === "_DATE_NOW_") {
        should(objectValue).be.approximately(Date.now(), 1000);
      } else if (expectedValue === "_DATE_NOW_SEC_") {
        should(objectValue).be.approximately(Date.now() / 1000, 1000);
      } else if (_.isPlainObject(objectValue)) {
        should(objectValue).matchObject(
          expectedValue,
          `"${keyPath}" does not match. Expected "${JSON.stringify(
            expectedValue
          )}" have "${JSON.stringify(objectValue)}"`
        );
      } else {
        should(objectValue).match(
          expectedValue,
          `"${keyPath}" does not match. Expected "${JSON.stringify(
            expectedValue
          )}" have "${JSON.stringify(objectValue)}"`
        );
      }
    }
  },
  false
);
