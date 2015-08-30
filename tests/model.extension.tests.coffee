exports = require "../build/mvc/sf.mvc.js"
SFMVC = exports.SFMVC
Model = SFMVC.Model

suite = "Suite 2"
console.log "**** Starting Model Extension Tests *****"
console.log "### #{suite} ###"

start = new Date
describe "Extension Tests", ->
    it "Tests Extension Attributes", ->
        ChildModel = Model.extend
            pool: 'Dead'
            getMe: ->
                return @
                return 'Demo'

        obj = new ChildModel
        expect obj.getMe().pool
            .toBe 'Dead'

    it "Tests default Id Attribute", ->
        ChildModel = Model.extend
            getId: ->
                return @id

        obj = new ChildModel {id: 1, name: 'satin' }
        expect obj.getId()
            .toBe 1

    it "Tests Custom Id Attribute", ->
        ChildModel = Model.extend
            getId: ->
                return @id
            idAttribute: 'name'

        obj = new ChildModel {id: 1, name: 'satin' }
        expect obj.getId()
            .toBe 'satin'


end  = new Date
time = (end.getTime() - start.getTime())/1000

console.log "Finished #{suite} in #{time} seconds"