var SFMVC;

SFMVC = new ((function() {
  function _Class() {}

  _Class.prototype.version = '0.0.1';

  return _Class;

})());

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SFMVC.extend = function(obj1, obj2) {
  return extend(obj2, obj1);
};

var Base;

Base = (function() {
  function Base() {}

  Base.extend = function(obj) {
    return SFMVC.extend(obj, new this);
  };

  return Base;

})();

var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SFMVC.Model = (function(superClass) {
  var allowedEvents;

  extend(Model, superClass);

  allowedEvents = {
    ADDED: 'added',
    REMOVED: 'removed',
    UPDATED: 'updated',
    CHANGED: 'changed'
  };

  function Model(attributes, options) {
    this.attributes = attributes != null ? attributes : {};
    this.options = options != null ? options : {};
    this.plugin = bind(this.plugin, this);
    this.toJson = bind(this.toJson, this);
    this.on = bind(this.on, this);
    this.setSingle = bind(this.setSingle, this);
    this.set = bind(this.set, this);
    this.fire = bind(this.fire, this);
    this.events = {};
    this;
  }

  Model.prototype.fire = function(name) {
    var handler, i, len, ref;
    if (!this.events[name]) {
      return;
    }
    ref = this.events[name];
    for (i = 0, len = ref.length; i < len; i++) {
      handler = ref[i];
      setTimeout(handler, 0);
    }
    return void 0;
  };

  Model.prototype.set = function(values) {
    var key;
    if (values == null) {
      values = {};
    }
    for (key in set) {
      this.setSingle(key, values[key]);
    }
    return this;
  };

  Model.prototype.setSingle = function(name, value) {
    if (this.attributes.hasOwnProperty(name)) {
      this.attributes[name] = value;
      this.fire(allowedEvents.CHANGED);
    } else {
      this.attributes[name] = value;
      this.fire(allowedEvents.UPDATED);
    }
    return void 0;
  };

  Model.prototype.on = function(ev, hd) {
    if (!this.events[ev]) {
      this.events[ev] = [];
    }
    this.events[ev].push(hd);
    return void 0;
  };

  Model.prototype.toJson = function() {
    return this.attributes;
  };

  Model.prototype.plugin = function(plugins, ovverride) {
    var i, isArray, len, plugin, results;
    if (ovverride == null) {
      ovverride = false;
    }
    isArray = plugins instanceof Array;
    if (!isArray) {
      plugins = [plugins];
    }
    results = [];
    for (i = 0, len = plugins.length; i < len; i++) {
      plugin = plugins[i];
      if (this.hasOwnProperty(plugin.name)) {
        if (ovverride) {
          results.push(Object.defineProperty(this, plugin.name, {
            value: plugin.def
          }));
        } else {
          results.push(void 0);
        }
      } else {
        results.push(Object.defineProperty(this, plugin.name, {
          value: plugin.def
        }));
      }
    }
    return results;
  };

  return Model;

})(Base);

var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SFMVC.Collection = (function(superClass) {
  var allowedEvents;

  extend(Collection, superClass);

  allowedEvents = {
    ADDED: 'added',
    REMOVED: 'removed',
    CHANGED: 'changed'
  };

  function Collection(raw_data) {
    this.on = bind(this.on, this);
    this.removeAt = bind(this.removeAt, this);
    this.pop = bind(this.pop, this);
    this.push = bind(this.push, this);
    this.fire = bind(this.fire, this);
    this.pool = new Array;
    this.events = {};
  }

  Collection.prototype.fire = function(name) {
    var handler, i, len, ref;
    if (!this.events[name]) {
      return;
    }
    ref = this.events[name];
    for (i = 0, len = ref.length; i < len; i++) {
      handler = ref[i];
      setTimeout(handler, 0);
    }
    return void 0;
  };

  Collection.prototype.push = function(model) {
    this.pool.push(model);
    this.fire(allowedEvents.ADDED);
    return this;
  };

  Collection.prototype.pop = function() {
    return this.pool.pop;
  };

  Collection.prototype.removeAt = function(index) {
    delete this.pool[index];
    this.pool.slice(index, 1);
    this.fire(allowedEvents.REMOVED);
    return this.fire(allowedEvents.CHANGED);
  };

  Collection.prototype.on = function(ev, hd) {
    if (!this.events[ev]) {
      this.events[ev] = [];
    }
    this.events[ev].push(hd);
    return void 0;
  };

  return Collection;

})(Base);

if (typeof exports !== "undefined" && exports !== null) {
  exports.SFMVC = SFMVC;
}
