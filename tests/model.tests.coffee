exports = require "../build/mvc/sf.mvc.js"
SFMVC = exports.SFMVC

console.log "**** Starting Model Tests *****"

describe "Object Tests", ->
	it "Fail for Normal Object for a Model, Its Not a normal Object", ->
		expect new SFMVC.Model
			.not.toBe({})

	it "Its Not a normal Object", ->
		model = new SFMVC.Model
		expect model.name
			.not.toBe('Model')

	it "Is a small Stress Test to check Model Attributes Capacity", ->
		obj = {}
		for i in [0..999]
			obj["attr#{i}"] = "value #{i}"
		model = new SFMVC.Model obj
		expect model.toJson()
			.toBe obj

		expect model.toJson().attr1
			.toBe "value 1"
