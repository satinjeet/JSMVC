SFMVC = SFMVC || {};
class SFMVC.Collection
    allowedEvents = {
        ADDED: 'added',
        REMOVED: 'removed',
        CHANGED: 'changed',
    }

    constructor: (raw_data)->
        @pool = new Array
        @events = {}

    fire: (name)=>
        return if !@events[name]
        for handler in @events[name]
            setTimeout handler, 0
        undefined

    push: (model)=>
        @pool.push model
        @fire allowedEvents.ADDED
        @

    pop: ()=>
        @pool.pop

    removeAt: (index)=>
        delete @pool[index]
        @pool.slice index, 1
        @fire allowedEvents.REMOVED
        @fire allowedEvents.CHANGED

    on: (ev, hd)=>
        if not @events[ev]
            @events[ev] = []
        @events[ev].push hd
        undefined