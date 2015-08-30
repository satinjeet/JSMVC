var Model, SFMVC, end, exports, start, suite, time;

exports = require("../build/mvc/sf.mvc.js");

SFMVC = exports.SFMVC;

Model = SFMVC.Model;

suite = "Suite 2";

console.log("**** Starting Model Extension Tests *****");

console.log("### " + suite + " ###");

start = new Date;

describe("Extension Tests", function() {
  it("Tests Extension Attributes", function() {
    var ChildModel, obj;
    ChildModel = Model.extend({
      pool: 'Dead',
      getMe: function() {
        return this;
        return 'Demo';
      }
    });
    obj = new ChildModel;
    return expect(obj.getMe().pool).toBe('Dead');
  });
  it("Tests default Id Attribute", function() {
    var ChildModel, obj;
    ChildModel = Model.extend({
      getId: function() {
        return this.id;
      }
    });
    obj = new ChildModel({
      id: 1,
      name: 'satin'
    });
    return expect(obj.getId()).toBe(1);
  });
  return it("Tests Custom Id Attribute", function() {
    var ChildModel, obj;
    ChildModel = Model.extend({
      getId: function() {
        return this.id;
      },
      idAttribute: 'name'
    });
    obj = new ChildModel({
      id: 1,
      name: 'satin'
    });
    return expect(obj.getId()).toBe('satin');
  });
});

end = new Date;

time = (end.getTime() - start.getTime()) / 1000;

console.log("Finished " + suite + " in " + time + " seconds");
