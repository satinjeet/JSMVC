exports = require "../build/mvc/sf.mvc.js"
SFMVC = exports.SFMVC
Model = SFMVC.Model

suite = "Suite 1"
console.log "**** Starting Model Tests *****"
console.log "### #{suite} ###"

start = new Date
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

	it "Stress test on 9999 attributes on 9999 models", ->
		obj = {}
		for i in [0...9999]
			obj["attr#{i}"] = "value #{i}"

		models = []
		for i in [0...9999]
			models.push new SFMVC.Model obj

		expect models.length 
			.toBe 9999 

	it "Testing Plugin for models", ->
		obj = 
			name: 'myName'
			def: ->
				return 'CustomModel'

		model = new SFMVC.Model {attr1: 1}
		model.plugin obj

		expect model.myName()
			.toBe 'CustomModel'

	it "Testing Plugin/s for models", ->
		obj = [
			name: 'myName'
			def: ->
				return @attributes
		]

		model = new SFMVC.Model {attr1: 1}
		model.plugin obj

		expect model.myName().attr1
			.toBe 1

end  = new Date
time = (end.getTime() - start.getTime())/1000

console.log "Finished #{suite} in #{time} seconds"