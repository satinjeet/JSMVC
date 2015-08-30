class SFMVC.Model extends Base

    @extend = (obj)->
        class child extends SFMVC.Model
        for k,v of obj
            child.prototype[k] = v
        child

    allowedEvents = {
        ADDED: 'added',
        REMOVED: 'removed',
        UPDATED: 'updated',
        CHANGED: 'changed',
    }

    idAttribute: 'id'
    id: undefined

    constructor: (@attributes = {}, @options = {})->
        if @attributes[@idAttribute]
            @id = @attributes[@idAttribute]
        @events = {}
        @

    fire: (name)=>
        return if !@events[name]
        for handler in @events[name]
            setTimeout handler, 0
        undefined

    set: (values = {})=>
        for key of set
            @setSingle key, values[key]
        @

    setSingle: (name, value)=>
        if @attributes.hasOwnProperty name
            @attributes[name] = value
            @fire allowedEvents.CHANGED
        else
            @attributes[name] = value
            @fire allowedEvents.UPDATED
        undefined

    on: (ev, hd)=>
        if not @events[ev]
            @events[ev] = []
        @events[ev].push hd
        undefined

    ## In future hash the attributes to an attribute Object type implement object
    toJson: =>
        @attributes

    # An Exra function that you can register to your object at runtime, no need for extra class inheritance
    # Just for dynamic definition, i dont know if it is going to be useful anytime soon or not.
    # method 
    #   plugin: {
    #       name: 'functionName',
    #       def : function() {}  
    #   }
    #   OR
    #   
    #    plugin: [{
    #       name: 'functionName2',
    #       def : function() {}  
    #   },{
    #       name: 'functionName1',
    #       def : function() {}  
    #   }]
    plugin: (plugins, ovverride = false)=>
        isArray = plugins instanceof Array
        if not isArray
            plugins = [plugins]

        for plugin in plugins
            if @hasOwnProperty plugin.name
                if ovverride
                    Object.defineProperty @, plugin.name, value: plugin.def
            else
                Object.defineProperty @, plugin.name, value: plugin.def



