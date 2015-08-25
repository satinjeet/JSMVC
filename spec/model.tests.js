var SFMVC, exports;

exports = require("../build/mvc/sf.mvc.js");

SFMVC = exports.SFMVC;

console.log("**** Starting Model Tests *****");

describe("Object Tests", function() {
  it("Fail for Normal Object for a Model, Its Not a normal Object", function() {
    return expect(new SFMVC.Model).not.toBe({});
  });
  it("Its Not a normal Object", function() {
    var model;
    model = new SFMVC.Model;
    return expect(model.name).not.toBe('Model');
  });
  return it("Is a small Stress Test to check Model Attributes Capacity", function() {
    var i, j, model, obj;
    obj = {};
    for (i = j = 0; j <= 999; i = ++j) {
      obj["attr" + i] = "value " + i;
    }
    model = new SFMVC.Model(obj);
    expect(model.toJson()).toBe(obj);
    return expect(model.toJson().attr1).toBe("value 2");
  });
});
