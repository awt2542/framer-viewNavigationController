require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Layers":[function(require,module,exports){
module.exports = {
  all: function() {
    return Framer.CurrentContext.getLayers();
  },
  withName: function(name) {
    var i, layer, len, matchingLayers, ref;
    matchingLayers = [];
    ref = this.all();
    for (i = 0, len = ref.length; i < len; i++) {
      layer = ref[i];
      if (layer.name === name) {
        matchingLayers.push(layer);
      }
    }
    return matchingLayers.reverse();
  },
  containing: function(name) {
    var i, layer, len, matchingLayers, ref;
    matchingLayers = [];
    ref = this.all();
    for (i = 0, len = ref.length; i < len; i++) {
      layer = ref[i];
      if (layer.name.indexOf(name) !== -1) {
        matchingLayers.push(layer);
      }
    }
    return matchingLayers.reverse();
  },
  startingWith: function(name) {
    var i, layer, len, matchingLayers, ref;
    matchingLayers = [];
    ref = this.all();
    for (i = 0, len = ref.length; i < len; i++) {
      layer = ref[i];
      if (layer.name.substring(0, name.length) === name) {
        matchingLayers.push(layer);
      }
    }
    return matchingLayers.reverse();
  },
  endingWith: function(name) {
    var i, layer, len, matchingLayers, ref;
    matchingLayers = [];
    ref = this.all();
    for (i = 0, len = ref.length; i < len; i++) {
      layer = ref[i];
      if (layer.name.match(name + "$")) {
        matchingLayers.push(layer);
      }
    }
    return matchingLayers.reverse();
  },
  withState: function(state) {
    var i, layer, layerStates, len, matchingLayers, ref;
    matchingLayers = [];
    ref = this.all();
    for (i = 0, len = ref.length; i < len; i++) {
      layer = ref[i];
      layerStates = layer.states._orderedStates;
      if (layerStates.indexOf(state) !== -1) {
        matchingLayers.push(layer);
      }
    }
    return matchingLayers.reverse();
  },
  withCurrentState: function(state) {
    var currentState, i, layer, len, matchingLayers, ref;
    matchingLayers = [];
    ref = this.all();
    for (i = 0, len = ref.length; i < len; i++) {
      layer = ref[i];
      currentState = layer.states.current;
      if (currentState.indexOf(state) !== -1) {
        matchingLayers.push(layer);
      }
    }
    return matchingLayers.reverse();
  },
  withSuperLayer: function(name) {
    var i, layer, len, matchingLayers, ref;
    matchingLayers = [];
    ref = this.withName(name);
    for (i = 0, len = ref.length; i < len; i++) {
      layer = ref[i];
      matchingLayers = matchingLayers.concat(layer.subLayers);
    }
    return matchingLayers.reverse();
  },
  withSubLayer: function(name) {
    var i, layer, len, matchingLayers, ref;
    matchingLayers = [];
    ref = this.withName(name);
    for (i = 0, len = ref.length; i < len; i++) {
      layer = ref[i];
      if (matchingLayers.indexOf(layer.superLayer) === -1) {
        matchingLayers.push(layer.superLayer);
      }
    }
    return matchingLayers.reverse();
  },
  where: function(obj) {
    return _.where(Framer.CurrentContext.getLayers(), obj);
  },
  get: function(name) {
    return this.withName(name)[0];
  }
};

Layer.prototype.prefixSwitch = function(newPrefix, delimiter) {
  var name, newName;
  if (delimiter == null) {
    delimiter = '_';
  }
  name = this.name;
  newName = newPrefix + name.slice(name.indexOf(delimiter));
  return module.exports.get(newName);
};

Layer.prototype.findSubLayer = function(needle, recursive) {
  var i, j, len, len1, ref, ref1, subLayer;
  if (recursive == null) {
    recursive = true;
  }
  ref = this.subLayers;
  for (i = 0, len = ref.length; i < len; i++) {
    subLayer = ref[i];
    if (subLayer.name.toLowerCase().indexOf(needle.toLowerCase()) !== -1) {
      return subLayer;
    }
  }
  if (recursive) {
    ref1 = this.subLayers;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      subLayer = ref1[j];
      if (subLayer.findSubLayer(needle, recursive)) {
        return subLayer.findSubLayer(needle, recursive);
      }
    }
  }
};

Layer.prototype.findSuperLayer = function(needle, recursive) {
  if (recursive == null) {
    recursive = true;
  }
  if (this.superLayer.name.toLowerCase().indexOf(needle.toLowerCase()) !== -1) {
    return this.superLayer;
  }
  if (recursive) {
    if (this.superLayer.findSuperLayer(needle, recursive)) {
      return this.superLayer.findSuperLayer(needle, recursive);
    }
  }
};



},{}],"ViewNavigationController":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.ViewNavigationController = (function(superClass) {
  extend(ViewNavigationController, superClass);

  function ViewNavigationController(options) {
    if (options == null) {
      options = {};
    }
    if (options.width == null) {
      options.width = Screen.width;
    }
    if (options.height == null) {
      options.height = Screen.height;
    }
    if (options.clip == null) {
      options.clip = true;
    }
    if (options.animationOptions == null) {
      options.animationOptions = {
        curve: "bezier-curve(.2, 1, .2, 1)",
        time: .6
      };
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = "rgba(190,190,190,0.9)";
    }
    if (options.perspective == null) {
      options.perspective = 1000;
    }
    ViewNavigationController.__super__.constructor.call(this, options);
    this.history = [];
  }

  ViewNavigationController.prototype.add = function(view, point) {
    if (point == null) {
      point = {
        x: 0,
        y: 0
      };
    }
    view.superLayer = this;
    view.on(Events.Click, function() {});
    view.point = point;
    return this.current = view;
  };

  ViewNavigationController.prototype.saveCurrentToHistory = function(animation) {
    return this.history.unshift({
      view: this.current,
      animation: animation
    });
  };

  ViewNavigationController.prototype.back = function() {
    var anim, backwards, previous;
    previous = this.history[0];
    if (previous.view != null) {
      anim = previous.animation;
      backwards = anim.reverse();
      backwards.start();
      this.current = previous.view;
      this.history.shift();
      return backwards.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.current.bringToFront();
        };
      })(this));
    }
  };

  ViewNavigationController.prototype.applyAnimation = function(view, animProperties, animationOptions) {
    var anim;
    if (view !== this.current) {
      _.extend(animProperties, animationOptions);
      anim = view.animate(animProperties);
      this.saveCurrentToHistory(anim);
      this.current = view;
      if (this.subLayers.indexOf(view) === -1) {
        this.add(view);
      }
      return this.current.bringToFront();
    }
  };

  ViewNavigationController.prototype.subLayersIgnoreEvents = function(view, boolean) {
    var i, len, ref, results, subLayer;
    print(view);
    view.ignoreEvents = boolean;
    ref = view.subLayers;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      subLayer = ref[i];
      results.push(this.subLayersIgnoreEvents(subLayer, boolean));
    }
    return results;
  };


  /* ANIMATIONS */

  ViewNavigationController.prototype.switchInstant = function(view) {
    return this.fadeIn(view, {
      time: 0
    });
  };

  ViewNavigationController.prototype.slideInUp = function(view, animationOptions) {
    var animProperties;
    if (animationOptions == null) {
      animationOptions = this.animationOptions;
    }
    view.y = -this.height;
    animProperties = {
      properties: {
        y: 0
      }
    };
    return this.applyAnimation(view, animProperties, animationOptions);
  };

  ViewNavigationController.prototype.slideInDown = function(view, animationOptions) {
    var animProperties;
    if (animationOptions == null) {
      animationOptions = this.animationOptions;
    }
    view.y = this.height;
    animProperties = {
      properties: {
        y: 0
      }
    };
    return this.applyAnimation(view, animProperties, animationOptions);
  };

  ViewNavigationController.prototype.slideInRight = function(view, animationOptions) {
    var animProperties;
    if (animationOptions == null) {
      animationOptions = this.animationOptions;
    }
    view.x = this.width;
    animProperties = {
      properties: {
        x: 0
      }
    };
    return this.applyAnimation(view, animProperties, animationOptions);
  };

  ViewNavigationController.prototype.slideInLeft = function(view, animationOptions) {
    var animProperties;
    if (animationOptions == null) {
      animationOptions = this.animationOptions;
    }
    view.x = -this.width;
    animProperties = {
      properties: {
        x: 0
      }
    };
    return this.applyAnimation(view, animProperties, animationOptions);
  };

  ViewNavigationController.prototype.fadeIn = function(view, animationOptions) {
    var animProperties;
    if (animationOptions == null) {
      animationOptions = this.animationOptions;
    }
    view.opacity = 0;
    animProperties = {
      properties: {
        opacity: 1
      }
    };
    return this.applyAnimation(view, animProperties, animationOptions);
  };

  ViewNavigationController.prototype.zoomIn = function(view, animationOptions) {
    var animProperties;
    if (animationOptions == null) {
      animationOptions = this.animationOptions;
    }
    view.scale = 0.8;
    view.opacity = 0;
    animProperties = {
      properties: {
        scale: 1,
        opacity: 1
      }
    };
    return this.applyAnimation(view, animProperties, animationOptions);
  };

  ViewNavigationController.prototype.zoomedIn = function(view, animationOptions) {
    var animProperties;
    if (animationOptions == null) {
      animationOptions = this.animationOptions;
    }
    view.scale = 1.5;
    view.opacity = 0;
    animProperties = {
      properties: {
        scale: 1,
        opacity: 1
      }
    };
    return this.applyAnimation(view, animProperties, animationOptions);
  };

  ViewNavigationController.prototype.flipInRight = function(view, animationOptions) {
    var animProperties;
    if (animationOptions == null) {
      animationOptions = this.animationOptions;
    }
    view.x = this.width / 2;
    view.rotationY = 100;
    view.z = 800;
    animProperties = {
      properties: {
        x: 0,
        rotationY: 0,
        z: 0
      }
    };
    return this.applyAnimation(view, animProperties, animationOptions);
  };

  ViewNavigationController.prototype.flipInLeft = function(view, animationOptions) {
    var animProperties;
    if (animationOptions == null) {
      animationOptions = this.animationOptions;
    }
    view.x = -this.width / 2;
    view.rotationY = -100;
    view.z = 800;
    animProperties = {
      properties: {
        x: 0,
        rotationY: 0,
        z: 0
      }
    };
    return this.applyAnimation(view, animProperties, animationOptions);
  };

  return ViewNavigationController;

})(Layer);



},{}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYW5kcmVhcy9Ecm9wYm94L1Byb3RvdHlwZXIgRnJhbWVyIFN0dWRpby9teU1vZHVsZXMvZnJhbWVyLXZpZXdOYXZpZ2F0aW9uQ29udHJvbGxlci92bmMtZXhhbXBsZTAxLmZyYW1lci9tb2R1bGVzL0xheWVycy5jb2ZmZWUiLCIvVXNlcnMvYW5kcmVhcy9Ecm9wYm94L1Byb3RvdHlwZXIgRnJhbWVyIFN0dWRpby9teU1vZHVsZXMvZnJhbWVyLXZpZXdOYXZpZ2F0aW9uQ29udHJvbGxlci92bmMtZXhhbXBsZTAxLmZyYW1lci9tb2R1bGVzL1ZpZXdOYXZpZ2F0aW9uQ29udHJvbGxlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxNQUFNLENBQUMsT0FBUCxHQUFpQjtBQUFBLEVBQ2hCLEdBQUEsRUFBSyxTQUFBLEdBQUE7V0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQXRCLENBQUEsRUFBSDtFQUFBLENBRFc7QUFBQSxFQUVoQixRQUFBLEVBQVUsU0FBQyxJQUFELEdBQUE7QUFDVCxRQUFBLGtDQUFBO0FBQUEsSUFBQSxjQUFBLEdBQWlCLEVBQWpCLENBQUE7QUFDQTtBQUFBLFNBQUEscUNBQUE7cUJBQUE7QUFDRSxNQUFBLElBQThCLEtBQUssQ0FBQyxJQUFOLEtBQWMsSUFBNUM7QUFBQSxRQUFBLGNBQWMsQ0FBQyxJQUFmLENBQW9CLEtBQXBCLENBQUEsQ0FBQTtPQURGO0FBQUEsS0FEQTtBQUdDLFdBQU8sY0FBYyxDQUFDLE9BQWYsQ0FBQSxDQUFQLENBSlE7RUFBQSxDQUZNO0FBQUEsRUFPaEIsVUFBQSxFQUFZLFNBQUMsSUFBRCxHQUFBO0FBQ1gsUUFBQSxrQ0FBQTtBQUFBLElBQUEsY0FBQSxHQUFpQixFQUFqQixDQUFBO0FBQ0E7QUFBQSxTQUFBLHFDQUFBO3FCQUFBO0FBQ0UsTUFBQSxJ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ZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0ge1xuXHRhbGw6IC0+IEZyYW1lci5DdXJyZW50Q29udGV4dC5nZXRMYXllcnMoKVxuXHR3aXRoTmFtZTogKG5hbWUpIC0+XG5cdFx0bWF0Y2hpbmdMYXllcnMgPSBbXVxuXHRcdGZvciBsYXllciBpbiBAYWxsKClcbiBcdFx0XHRtYXRjaGluZ0xheWVycy5wdXNoKGxheWVyKSBpZiBsYXllci5uYW1lIGlzIG5hbWVcbiBcdFx0cmV0dXJuIG1hdGNoaW5nTGF5ZXJzLnJldmVyc2UoKSAjIHRvIG1hdGNoIGxheWVybGlzdCBvcmRlclxuXHRjb250YWluaW5nOiAobmFtZSkgLT5cblx0XHRtYXRjaGluZ0xheWVycyA9IFtdXG5cdFx0Zm9yIGxheWVyIGluIEBhbGwoKVxuIFx0XHRcdG1hdGNoaW5nTGF5ZXJzLnB1c2gobGF5ZXIpIGlmIGxheWVyLm5hbWUuaW5kZXhPZihuYW1lKSBpc250IC0xXG4gXHRcdHJldHVybiBtYXRjaGluZ0xheWVycy5yZXZlcnNlKCkgIyB0byBtYXRjaCBsYXllcmxpc3Qgb3JkZXJcblx0c3RhcnRpbmdXaXRoOiAobmFtZSkgLT5cblx0XHRtYXRjaGluZ0xheWVycyA9IFtdXG5cdFx0Zm9yIGxheWVyIGluIEBhbGwoKVxuIFx0XHRcdG1hdGNoaW5nTGF5ZXJzLnB1c2gobGF5ZXIpIGlmIGxheWVyLm5hbWUuc3Vic3RyaW5nKDAsbmFtZS5sZW5ndGgpIGlzIG5hbWVcbiBcdFx0cmV0dXJuIG1hdGNoaW5nTGF5ZXJzLnJldmVyc2UoKSAjIHRvIG1hdGNoIGxheWVybGlzdCBvcmRlclxuXHRlbmRpbmdXaXRoOiAobmFtZSkgLT5cblx0XHRtYXRjaGluZ0xheWVycyA9IFtdXG5cdFx0Zm9yIGxheWVyIGluIEBhbGwoKVxuIFx0XHRcdG1hdGNoaW5nTGF5ZXJzLnB1c2gobGF5ZXIpIGlmIGxheWVyLm5hbWUubWF0Y2goXCIje25hbWV9JFwiKVxuIFx0XHRyZXR1cm4gbWF0Y2hpbmdMYXllcnMucmV2ZXJzZSgpICMgdG8gbWF0Y2ggbGF5ZXJsaXN0IG9yZGVyXG5cdHdpdGhTdGF0ZTogKHN0YXRlKSAtPiBcblx0XHRtYXRjaGluZ0xheWVycyA9IFtdXG5cdFx0Zm9yIGxheWVyIGluIEBhbGwoKVxuXHRcdFx0bGF5ZXJTdGF0ZXMgPSBsYXllci5zdGF0ZXMuX29yZGVyZWRTdGF0ZXNcblx0XHRcdG1hdGNoaW5nTGF5ZXJzLnB1c2gobGF5ZXIpIGlmIGxheWVyU3RhdGVzLmluZGV4T2Yoc3RhdGUpIGlzbnQgLTFcblx0XHRyZXR1cm4gbWF0Y2hpbmdMYXllcnMucmV2ZXJzZSgpXG5cdHdpdGhDdXJyZW50U3RhdGU6IChzdGF0ZSkgLT4gXG5cdFx0bWF0Y2hpbmdMYXllcnMgPSBbXVxuXHRcdGZvciBsYXllciBpbiBAYWxsKClcblx0XHRcdGN1cnJlbnRTdGF0ZSA9IGxheWVyLnN0YXRlcy5jdXJyZW50XG5cdFx0XHRtYXRjaGluZ0xheWVycy5wdXNoKGxheWVyKSBpZiBjdXJyZW50U3RhdGUuaW5kZXhPZihzdGF0ZSkgaXNudCAtMVxuXHRcdHJldHVybiBtYXRjaGluZ0xheWVycy5yZXZlcnNlKClcblx0d2l0aFN1cGVyTGF5ZXI6IChuYW1lKSAtPlxuXHRcdG1hdGNoaW5nTGF5ZXJzID0gW11cblx0XHRmb3IgbGF5ZXIgaW4gQHdpdGhOYW1lKG5hbWUpXG5cdFx0XHRtYXRjaGluZ0xheWVycyA9IG1hdGNoaW5nTGF5ZXJzLmNvbmNhdChsYXllci5zdWJMYXllcnMpXG5cdFx0cmV0dXJuIG1hdGNoaW5nTGF5ZXJzLnJldmVyc2UoKVxuXHR3aXRoU3ViTGF5ZXI6IChuYW1lKSAtPlxuXHRcdG1hdGNoaW5nTGF5ZXJzID0gW11cblx0XHRmb3IgbGF5ZXIgaW4gQHdpdGhOYW1lKG5hbWUpXG5cdFx0XHRpZiBtYXRjaGluZ0xheWVycy5pbmRleE9mKGxheWVyLnN1cGVyTGF5ZXIpIGlzIC0xXG5cdFx0XHRcdG1hdGNoaW5nTGF5ZXJzLnB1c2gobGF5ZXIuc3VwZXJMYXllcikgXG5cdFx0cmV0dXJuIG1hdGNoaW5nTGF5ZXJzLnJldmVyc2UoKVxuXHR3aGVyZTogKG9iaikgLT5cblx0XHRfLndoZXJlIEZyYW1lci5DdXJyZW50Q29udGV4dC5nZXRMYXllcnMoKSwgb2JqXG5cdGdldDogKG5hbWUpIC0+XG5cdFx0QHdpdGhOYW1lKG5hbWUpWzBdXG59XG5cbkxheWVyOjpwcmVmaXhTd2l0Y2ggPSAobmV3UHJlZml4LCBkZWxpbWl0ZXIgPSAnXycpIC0+XG5cdG5hbWUgPSB0aGlzLm5hbWVcblx0bmV3TmFtZSA9IG5ld1ByZWZpeCArIG5hbWUuc2xpY2UgbmFtZS5pbmRleE9mIGRlbGltaXRlclxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHMuZ2V0IG5ld05hbWVcblxuIyBCeSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svc2hvcnRjdXRzLWZvci1mcmFtZXJcbkxheWVyOjpmaW5kU3ViTGF5ZXIgPSAobmVlZGxlLCByZWN1cnNpdmUgPSB0cnVlKSAtPlxuICAjIFNlYXJjaCBkaXJlY3QgY2hpbGRyZW5cbiAgZm9yIHN1YkxheWVyIGluIEBzdWJMYXllcnNcbiAgICByZXR1cm4gc3ViTGF5ZXIgaWYgc3ViTGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YobmVlZGxlLnRvTG93ZXJDYXNlKCkpIGlzbnQgLTEgXG4gICMgUmVjdXJzaXZlbHkgc2VhcmNoIGNoaWxkcmVuIG9mIGNoaWxkcmVuXG4gIGlmIHJlY3Vyc2l2ZVxuICAgIGZvciBzdWJMYXllciBpbiBAc3ViTGF5ZXJzXG4gICAgICByZXR1cm4gc3ViTGF5ZXIuZmluZFN1YkxheWVyKG5lZWRsZSwgcmVjdXJzaXZlKSBpZiBzdWJMYXllci5maW5kU3ViTGF5ZXIobmVlZGxlLCByZWN1cnNpdmUpXG4gICAgICBcbkxheWVyOjpmaW5kU3VwZXJMYXllciA9IChuZWVkbGUsIHJlY3Vyc2l2ZSA9IHRydWUpIC0+XG4gICMgU2VhcmNoIGRpcmVjdCBjaGlsZHJlblxuICByZXR1cm4gQHN1cGVyTGF5ZXIgaWYgQHN1cGVyTGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YobmVlZGxlLnRvTG93ZXJDYXNlKCkpIGlzbnQgLTEgXG4gICMgUmVjdXJzaXZlbHkgc2VhcmNoIGNoaWxkcmVuIG9mIGNoaWxkcmVuXG4gIGlmIHJlY3Vyc2l2ZVxuICBcdHJldHVybiBAc3VwZXJMYXllci5maW5kU3VwZXJMYXllcihuZWVkbGUsIHJlY3Vyc2l2ZSkgaWYgQHN1cGVyTGF5ZXIuZmluZFN1cGVyTGF5ZXIobmVlZGxlLCByZWN1cnNpdmUpIiwiIyBUT0RPOlxuIyBJZ25vcmUgYWxsIGV2ZW50cyBub3QgcGFydCBvZiBjaGlsZHJlbiB0byBAY3VycmVudCAoYXZvaWQgY2xpY2sgdGhyb3VnaClcbiMgQWRkIGN1c3RvbSBhbmltYXRpb25PcHRpb25zIHRvIC5iYWNrKCk/XG4jIEFkZCBcIm1vdmVPdXRcIiBhbmltYXRpb25zPyB3aGF0J3MgdGhlIHVzZSBjYXNlPyBjb3ZlcmVkIGJ5IGJhY2s/XG4jIElmIG5vIG5lZWQgZm9yIG1vdmVPdXQsIG1heWJlIHdlIHdvbnQgbmVlZCBjb25zaXN0ZW50IFwiSW5cIiBuYW1pbmcgc2NoZW1lXG4jIHRlc3QgdXNlIGNhc2Ugd2l0aCBpb3MgbmF0aXZlIHB1c2ggbWVzc2FnZXNcbiMgYWRkIHBhZ2VzIHdoZW4gdHJ5aW5nIHRvIGFuaW1hdGUgdGhlbS4gZWcuIGlmIEBzdWJMYXllcnMuaW5kZXhPZih2aWV3KSBpcyAtMSB0aGVuIEBhZGQgdmlld1xuXG5jbGFzcyBleHBvcnRzLlZpZXdOYXZpZ2F0aW9uQ29udHJvbGxlciBleHRlbmRzIExheWVyXG5cdFx0XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucz17fSkgLT5cblx0XHRvcHRpb25zLndpZHRoID89IFNjcmVlbi53aWR0aFxuXHRcdG9wdGlvbnMuaGVpZ2h0ID89IFNjcmVlbi5oZWlnaHRcblx0XHRvcHRpb25zLmNsaXAgPz0gdHJ1ZVxuXHRcdG9wdGlvbnMuYW5pbWF0aW9uT3B0aW9ucyA/PSBjdXJ2ZTogXCJiZXppZXItY3VydmUoLjIsIDEsIC4yLCAxKVwiLCB0aW1lOiAuNlxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IFwicmdiYSgxOTAsMTkwLDE5MCwwLjkpXCJcblx0XHRvcHRpb25zLnBlcnNwZWN0aXZlID89IDEwMDBcblxuXHRcdHN1cGVyIG9wdGlvbnNcblx0XHRAaGlzdG9yeSA9IFtdXG5cdFx0XHRcdFxuXHRhZGQ6ICh2aWV3LCBwb2ludCA9IHt4OjAsIHk6MH0pIC0+XG5cdFx0dmlldy5zdXBlckxheWVyID0gQFxuXHRcdHZpZXcub24gRXZlbnRzLkNsaWNrLCAtPiByZXR1cm4gIyBwcmV2ZW50IGNsaWNrLXRocm91Z2gvYnViYmxpbmdcblx0XHR2aWV3LnBvaW50ID0gcG9pbnRcblx0XHRAY3VycmVudCA9IHZpZXdcblx0XHRcblx0c2F2ZUN1cnJlbnRUb0hpc3Rvcnk6IChhbmltYXRpb24pIC0+XG5cdFx0QGhpc3RvcnkudW5zaGlmdFxuXHRcdFx0dmlldzogQGN1cnJlbnRcblx0XHRcdGFuaW1hdGlvbjogYW5pbWF0aW9uXG5cblx0YmFjazogLT4gXG5cdFx0cHJldmlvdXMgPSBAaGlzdG9yeVswXVxuXHRcdGlmIHByZXZpb3VzLnZpZXc/XG5cdFx0XHRhbmltID0gcHJldmlvdXMuYW5pbWF0aW9uXG5cdFx0XHRiYWNrd2FyZHMgPSBhbmltLnJldmVyc2UoKVxuXHRcdFx0YmFja3dhcmRzLnN0YXJ0KClcblx0XHRcdEBjdXJyZW50ID0gcHJldmlvdXMudmlld1xuXHRcdFx0QGhpc3Rvcnkuc2hpZnQoKVxuXHRcdFx0YmFja3dhcmRzLm9uIEV2ZW50cy5BbmltYXRpb25FbmQsID0+XG5cdFx0XHRcdEBjdXJyZW50LmJyaW5nVG9Gcm9udCgpXG5cdFx0XHRcblxuXHRhcHBseUFuaW1hdGlvbjogKHZpZXcsIGFuaW1Qcm9wZXJ0aWVzLCBhbmltYXRpb25PcHRpb25zKSAtPlxuXHRcdHVubGVzcyB2aWV3IGlzIEBjdXJyZW50XG5cdFx0XHRfLmV4dGVuZCBhbmltUHJvcGVydGllcywgYW5pbWF0aW9uT3B0aW9uc1xuXHRcdFx0YW5pbSA9IHZpZXcuYW5pbWF0ZSBhbmltUHJvcGVydGllc1xuXHRcdFx0QHNhdmVDdXJyZW50VG9IaXN0b3J5IGFuaW1cblx0XHRcdCNhbmltLm9uIEV2ZW50cy5BbmltYXRpb25FbmQsID0+XG5cdFx0XHRAY3VycmVudCA9IHZpZXdcblx0XHRcdGlmIEBzdWJMYXllcnMuaW5kZXhPZih2aWV3KSBpcyAtMSB0aGVuIEBhZGQgdmlld1xuXHRcdFx0QGN1cnJlbnQuYnJpbmdUb0Zyb250KClcblxuXHRzdWJMYXllcnNJZ25vcmVFdmVudHM6ICh2aWV3LCBib29sZWFuKSAtPlxuXHRcdHByaW50IHZpZXdcblx0XHR2aWV3Lmlnbm9yZUV2ZW50cyA9IGJvb2xlYW5cblx0XHRmb3Igc3ViTGF5ZXIgaW4gdmlldy5zdWJMYXllcnNcblx0XHRcdEBzdWJMYXllcnNJZ25vcmVFdmVudHMgc3ViTGF5ZXIsIGJvb2xlYW5cblx0XHRcdFxuXG5cdCMjIyBBTklNQVRJT05TICMjI1xuXG5cdHN3aXRjaEluc3RhbnQ6ICh2aWV3KSAtPiBAZmFkZUluIHZpZXcsIHRpbWU6IDBcblxuXHRzbGlkZUluVXA6ICh2aWV3LCBhbmltYXRpb25PcHRpb25zID0gQGFuaW1hdGlvbk9wdGlvbnMpIC0+IFxuXHRcdHZpZXcueSA9IC1AaGVpZ2h0XG5cdFx0YW5pbVByb3BlcnRpZXMgPVxuXHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0eTogMFxuXHRcdEBhcHBseUFuaW1hdGlvbiB2aWV3LCBhbmltUHJvcGVydGllcywgYW5pbWF0aW9uT3B0aW9uc1xuXG5cdHNsaWRlSW5Eb3duOiAodmlldywgYW5pbWF0aW9uT3B0aW9ucyA9IEBhbmltYXRpb25PcHRpb25zKSAtPiBcblx0XHR2aWV3LnkgPSBAaGVpZ2h0XG5cdFx0YW5pbVByb3BlcnRpZXMgPVxuXHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0eTogMFxuXHRcdEBhcHBseUFuaW1hdGlvbiB2aWV3LCBhbmltUHJvcGVydGllcywgYW5pbWF0aW9uT3B0aW9uc1xuXG5cdHNsaWRlSW5SaWdodDogKHZpZXcsIGFuaW1hdGlvbk9wdGlvbnMgPSBAYW5pbWF0aW9uT3B0aW9ucykgLT4gXG5cdFx0dmlldy54ID0gQHdpZHRoXG5cdFx0YW5pbVByb3BlcnRpZXMgPVxuXHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0eDogMFxuXHRcdEBhcHBseUFuaW1hdGlvbiB2aWV3LCBhbmltUHJvcGVydGllcywgYW5pbWF0aW9uT3B0aW9uc1xuXG5cdHNsaWRlSW5MZWZ0OiAodmlldywgYW5pbWF0aW9uT3B0aW9ucyA9IEBhbmltYXRpb25PcHRpb25zKSAtPiBcblx0XHR2aWV3LnggPSAtQHdpZHRoXG5cdFx0YW5pbVByb3BlcnRpZXMgPVxuXHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0eDogMFxuXHRcdEBhcHBseUFuaW1hdGlvbiB2aWV3LCBhbmltUHJvcGVydGllcywgYW5pbWF0aW9uT3B0aW9uc1xuXG5cdGZhZGVJbjogKHZpZXcsIGFuaW1hdGlvbk9wdGlvbnMgPSBAYW5pbWF0aW9uT3B0aW9ucykgLT4gXG5cdFx0dmlldy5vcGFjaXR5ID0gMFxuXHRcdGFuaW1Qcm9wZXJ0aWVzID1cblx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdG9wYWNpdHk6IDFcblx0XHRAYXBwbHlBbmltYXRpb24gdmlldywgYW5pbVByb3BlcnRpZXMsIGFuaW1hdGlvbk9wdGlvbnNcblx0XHRcdFxuXHR6b29tSW46ICh2aWV3LCBhbmltYXRpb25PcHRpb25zID0gQGFuaW1hdGlvbk9wdGlvbnMpIC0+IFxuXHRcdHZpZXcuc2NhbGUgPSAwLjhcblx0XHR2aWV3Lm9wYWNpdHkgPSAwXG5cdFx0YW5pbVByb3BlcnRpZXMgPVxuXHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0c2NhbGU6IDFcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdEBhcHBseUFuaW1hdGlvbiB2aWV3LCBhbmltUHJvcGVydGllcywgYW5pbWF0aW9uT3B0aW9uc1xuXG5cdHpvb21lZEluOiAodmlldywgYW5pbWF0aW9uT3B0aW9ucyA9IEBhbmltYXRpb25PcHRpb25zKSAtPiBcblx0XHR2aWV3LnNjYWxlID0gMS41XG5cdFx0dmlldy5vcGFjaXR5ID0gMFxuXHRcdGFuaW1Qcm9wZXJ0aWVzID1cblx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdHNjYWxlOiAxXG5cdFx0XHRcdG9wYWNpdHk6IDFcblx0XHRAYXBwbHlBbmltYXRpb24gdmlldywgYW5pbVByb3BlcnRpZXMsIGFuaW1hdGlvbk9wdGlvbnNcblxuXHRmbGlwSW5SaWdodDogKHZpZXcsIGFuaW1hdGlvbk9wdGlvbnMgPSBAYW5pbWF0aW9uT3B0aW9ucykgLT4gXG5cdFx0dmlldy54ID0gQHdpZHRoLzJcblx0XHR2aWV3LnJvdGF0aW9uWSA9IDEwMFxuXHRcdHZpZXcueiA9IDgwMFxuXHRcdGFuaW1Qcm9wZXJ0aWVzID1cblx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdHg6IDBcblx0XHRcdFx0cm90YXRpb25ZOiAwXG5cdFx0XHRcdHo6IDBcblx0XHRAYXBwbHlBbmltYXRpb24gdmlldywgYW5pbVByb3BlcnRpZXMsIGFuaW1hdGlvbk9wdGlvbnNcblxuXHRmbGlwSW5MZWZ0OiAodmlldywgYW5pbWF0aW9uT3B0aW9ucyA9IEBhbmltYXRpb25PcHRpb25zKSAtPiBcblx0XHR2aWV3LnggPSAtQHdpZHRoLzJcblx0XHR2aWV3LnJvdGF0aW9uWSA9IC0xMDBcblx0XHR2aWV3LnogPSA4MDBcblx0XHRhbmltUHJvcGVydGllcyA9XG5cdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHR4OiAwXG5cdFx0XHRcdHJvdGF0aW9uWTogMFxuXHRcdFx0XHR6OiAwXG5cdFx0QGFwcGx5QW5pbWF0aW9uIHZpZXcsIGFuaW1Qcm9wZXJ0aWVzLCBhbmltYXRpb25PcHRpb25zIl19
