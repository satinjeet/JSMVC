SFMVC = SFMVC || {};
class SFMVC.Model
    allowedEvents = {
        ADDED: 'added',
        REMOVED: 'removed',
        UPDATED: 'updated',
        CHANGED: 'changed',
    }

    constructor: (@attributes = {}, @options = {})->
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