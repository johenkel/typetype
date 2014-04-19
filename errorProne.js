// Generated by CoffeeScript 1.7.1
(function() {
  var $;

  ($ = jQuery).fn.extend({
    typetype: function(txt, keypress) {
      var elem, errorProb, interval;
      errorProb = 0.04;
      interval = function(index) {
        return Math.random() * 100 * (txt[index - 1] === txt[index] ? 1.6 : txt[index - 1] === '.' ? 12 : txt[index - 1] === '!' ? 12 : txt[index - 1] === '\n' ? 12 : txt[index - 1] === ',' ? 8 : txt[index - 1] === ';' ? 8 : txt[index - 1] === ' ' ? 3 : 2);
      };
      return $.when.apply($, (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = this.length; _i < _len; _i++) {
          elem = this[_i];
          _results.push((function(elem) {
            var append, attr, backsp, deferred, typeTo;
            attr = elem.tagName === 'input'.toUpperCase() || elem.tagName === 'textarea'.toUpperCase() ? 'value' : 'innerHTML';
            append = function(str, cont) {
              if (str.length) {
                elem[attr] += str[0];
                setTimeout((function() {
                  return append(str.slice(1), cont);
                }), 100);
              } else {
                cont();
              }
            };
            backsp = function(num, cont) {
              if (num) {
                elem[attr] = elem[attr].slice(0, -1);
                setTimeout((function() {
                  return backsp(num - 1, cont);
                }), 100);
              } else {
                cont();
              }
            };
            return deferred = $.Deferred((typeTo = function(i) {
              var afterErr, r;
              if (txt.length > i) {
                r = Math.random() / errorProb;
                afterErr = function() {
                  return setTimeout((function() {
                    return typeTo(i);
                  }), interval(i));
                };
                if (0.3 > r && txt[i - 1] !== txt[i]) {
                  append(txt.slice(i, i + 3), function() {
                    return backsp(4, afterErr);
                  });
                } else if (0.5 > r && txt[i - 1] !== txt[i]) {
                  append(txt[i], function() {
                    return backsp(1, afterErr);
                  });
                } else if (0.8 > r && txt[i - 1] !== txt[i]) {
                  append(txt[i] + txt[i - 1], function() {
                    return backsp(2, afterErr);
                  });
                } else if (1.0 > r && i > 1 && txt[i - 2] === txt[i - 2].toUpperCase()) {
                  append(txt[i - 1].toUpperCase() + txt[i], function() {
                    return backsp(2, afterErr);
                  });
                } else {
                  elem[attr] += txt[i - 1];
                  if (keypress) {
                    keypress.call(elem, i);
                  }
                  setTimeout((function() {
                    return typeTo(i + 1);
                  }), interval(i));
                }
              } else {
                deferred.resolve();
              }
            })(1));
          })(elem));
        }
        return _results;
      }).call(this));
    }
  });

}).call(this);
