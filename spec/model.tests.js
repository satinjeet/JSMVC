var SFMVC, end, exports, start, suite, time;

exports = require("../build/mvc/sf.mvc.js");

SFMVC = exports.SFMVC;

suite = "Suite 1";

console.log("**** Starting Model Tests *****");

console.log("### " + suite + " ###");

start = new Date;

describe("Object Tests", function() {
  it("Fail for Normal Object for a Model, Its Not a normal Object", function() {
    return expect(new SFMVC.Model).not.toBe({});
  });
  it("Its Not a normal Object", function() {
    var model;
    model = new SFMVC.Model;
    return expect(model.name).not.toBe('Model');
  });
  it("Is a small Stress Test to check Model Attributes Capacity", function() {
    var i, j, model, obj;
    obj = {};
    for (i = j = 0; j <= 999; i = ++j) {
      obj["attr" + i] = "value " + i;
    }
    model = new SFMVC.Model(obj);
    expect(model.toJson()).toBe(obj);
    return expect(model.toJson().attr1).toBe("value 1");
  });
  it("Stress test on 9999 attributes on 9999 models", function() {
    var i, j, k, models, obj;
    obj = {};
    for (i = j = 0; j < 9999; i = ++j) {
      obj["attr" + i] = "value " + i;
    }
    models = [];
    for (i = k = 0; k < 9999; i = ++k) {
      models.push(new SFMVC.Model(obj));
    }
    return expect(models.length).toBe(9999);
  });
  it("Testing Plugin for models", function() {
    var model, obj;
    obj = {
      name: 'myName',
      def: function() {
        return 'CustomModel';
      }
    };
    model = new SFMVC.Model({
      attr1: 1
    });
    model.plugin(obj);
    return expect(model.myName()).toBe('CustomModel');
  });
  return it("Testing Plugin/s for models", function() {
    var model, obj;
    obj = [
      {
        name: 'myName',
        def: function() {
          return this.attributes;
        }
      }
    ];
    model = new SFMVC.Model({
      attr1: 1
    });
    model.plugin(obj);
    return expect(model.myName().attr1).toBe(1);
  });
});

end = new Date;

time = (end.getTime() - start.getTime()) / 1000;

console.log("Finished " + suite + " in " + time + " seconds");
