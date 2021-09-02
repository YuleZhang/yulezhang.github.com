(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Circle = /*#__PURE__*/function () {
  function Circle(_ref) {
    var origin = _ref.origin,
        speed = _ref.speed,
        color = _ref.color,
        angle = _ref.angle,
        context = _ref.context;

    _classCallCheck(this, Circle);

    this.origin = origin;
    this.position = _objectSpread({}, this.origin);
    this.color = color;
    this.speed = speed;
    this.angle = angle;
    this.context = context;
    this.renderCount = 0;
  }

  _createClass(Circle, [{
    key: "draw",
    value: function draw() {
      this.context.fillStyle = this.color;
      this.context.beginPath();
      this.context.arc(this.position.x, this.position.y, 2, 0, Math.PI * 2);
      this.context.fill();
    }
  }, {
    key: "move",
    value: function move() {
      this.position.x = Math.sin(this.angle) * this.speed + this.position.x;
      this.position.y = Math.cos(this.angle) * this.speed + this.position.y + this.renderCount * 0.3;
      this.renderCount++;
    }
  }]);

  return Circle;
}();

var Boom = /*#__PURE__*/function () {
  function Boom(_ref2) {
    var origin = _ref2.origin,
        context = _ref2.context,
        _ref2$circleCount = _ref2.circleCount,
        circleCount = _ref2$circleCount === void 0 ? 10 : _ref2$circleCount,
        area = _ref2.area;

    _classCallCheck(this, Boom);

    this.origin = origin;
    this.context = context;
    this.circleCount = circleCount;
    this.area = area;
    this.stop = false;
    this.circles = [];
  }

  _createClass(Boom, [{
    key: "randomArray",
    value: function randomArray(range) {
      var length = range.length;
      var randomIndex = Math.floor(length * Math.random());
      return range[randomIndex];
    }
  }, {
    key: "randomColor",
    value: function randomColor() {
      var range = ["8", "9", "A", "B", "C", "D", "E", "F"];
      return "#" + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range);
    }
  }, {
    key: "randomRange",
    value: function randomRange(start, end) {
      return (end - start) * Math.random() + start;
    }
  }, {
    key: "init",
    value: function init() {
      for (var i = 0; i < this.circleCount; i++) {
        var circle = new Circle({
          context: this.context,
          origin: this.origin,
          color: this.randomColor(),
          angle: this.randomRange(Math.PI - 1, Math.PI + 1),
          speed: this.randomRange(1, 6)
        });
        this.circles.push(circle);
      }
    }
  }, {
    key: "move",
    value: function move() {
      var _this = this;

      this.circles.forEach(function (circle, index) {
        if (circle.position.x > _this.area.width || circle.position.y > _this.area.height) {
          return _this.circles.splice(index, 1);
        }

        circle.move();
      });

      if (this.circles.length == 0) {
        this.stop = true;
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      this.circles.forEach(function (circle) {
        return circle.draw();
      });
    }
  }]);

  return Boom;
}();

var CursorSpecialEffects = /*#__PURE__*/function () {
  function CursorSpecialEffects() {
    _classCallCheck(this, CursorSpecialEffects);

    this.computerCanvas = document.createElement("canvas");
    this.renderCanvas = document.createElement("canvas");
    this.computerContext = this.computerCanvas.getContext("2d");
    this.renderContext = this.renderCanvas.getContext("2d");
    this.globalWidth = window.innerWidth;
    this.globalHeight = window.innerHeight;
    this.booms = [];
    this.running = false;
  }

  _createClass(CursorSpecialEffects, [{
    key: "handleMouseDown",
    value: function handleMouseDown(e) {
      var boom = new Boom({
        origin: {
          x: e.clientX,
          y: e.clientY
        },
        context: this.computerContext,
        area: {
          width: this.globalWidth,
          height: this.globalHeight
        }
      });
      boom.init();
      this.booms.push(boom);
      this.running || this.run();
    }
  }, {
    key: "handlePageHide",
    value: function handlePageHide() {
      this.booms = [];
      this.running = false;
    }
  }, {
    key: "init",
    value: function init() {
      var style = this.renderCanvas.style;
      style.position = "fixed";
      style.top = style.left = 0;
      style.zIndex = "99999";
      style.pointerEvents = "none";
      style.width = this.renderCanvas.width = this.computerCanvas.width = this.globalWidth;
      style.height = this.renderCanvas.height = this.computerCanvas.height = this.globalHeight;
      document.body.append(this.renderCanvas);
      window.addEventListener("mousedown", this.handleMouseDown.bind(this));
      window.addEventListener("pagehide", this.handlePageHide.bind(this));
    }
  }, {
    key: "run",
    value: function run() {
      var _this2 = this;

      this.running = true;

      if (this.booms.length == 0) {
        return this.running = false;
      }

      requestAnimationFrame(this.run.bind(this));
      this.computerContext.clearRect(0, 0, this.globalWidth, this.globalHeight);
      this.renderContext.clearRect(0, 0, this.globalWidth, this.globalHeight);
      this.booms.forEach(function (boom, index) {
        if (boom.stop) {
          return _this2.booms.splice(index, 1);
        }

        boom.move();
        boom.draw();
      });
      this.renderContext.drawImage(this.computerCanvas, 0, 0, this.globalWidth, this.globalHeight);
    }
  }]);

  return CursorSpecialEffects;
}();

var cursorSpecialEffects = new CursorSpecialEffects();
cursorSpecialEffects.init();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvaGV4by10aGVtZS1heWVyL3NvdXJjZS9qcy9jbGlja0Jvb20yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7SUNBTSxNO0FBQ0osd0JBQXNEO0FBQUEsUUFBeEMsTUFBd0MsUUFBeEMsTUFBd0M7QUFBQSxRQUFoQyxLQUFnQyxRQUFoQyxLQUFnQztBQUFBLFFBQXpCLEtBQXlCLFFBQXpCLEtBQXlCO0FBQUEsUUFBbEIsS0FBa0IsUUFBbEIsS0FBa0I7QUFBQSxRQUFYLE9BQVcsUUFBWCxPQUFXOztBQUFBOztBQUNwRCxTQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsU0FBSyxRQUFMLHFCQUFxQixLQUFLLE1BQTFCO0FBQ0EsU0FBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLFNBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxTQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsU0FBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLFNBQUssV0FBTCxHQUFtQixDQUFuQjtBQUNEOzs7O1dBRUQsZ0JBQU87QUFDTCxXQUFLLE9BQUwsQ0FBYSxTQUFiLEdBQXlCLEtBQUssS0FBOUI7QUFDQSxXQUFLLE9BQUwsQ0FBYSxTQUFiO0FBQ0EsV0FBSyxPQUFMLENBQWEsR0FBYixDQUFpQixLQUFLLFFBQUwsQ0FBYyxDQUEvQixFQUFrQyxLQUFLLFFBQUwsQ0FBYyxDQUFoRCxFQUFtRCxDQUFuRCxFQUFzRCxDQUF0RCxFQUF5RCxJQUFJLENBQUMsRUFBTCxHQUFVLENBQW5FO0FBQ0EsV0FBSyxPQUFMLENBQWEsSUFBYjtBQUNEOzs7V0FFRCxnQkFBTztBQUNMLFdBQUssUUFBTCxDQUFjLENBQWQsR0FBa0IsSUFBSSxDQUFDLEdBQUwsQ0FBUyxLQUFLLEtBQWQsSUFBdUIsS0FBSyxLQUE1QixHQUFvQyxLQUFLLFFBQUwsQ0FBYyxDQUFwRTtBQUNBLFdBQUssUUFBTCxDQUFjLENB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QUFRLEtBQUssT0FBTCxHQUFlLEtBQXZCO0FBQ0Q7O0FBRUQsTUFBQSxxQkFBcUIsQ0FBQyxLQUFLLEdBQUwsQ0FBUyxJQUFULENBQWMsSUFBZCxDQUFELENBQXJCO0FBRUEsV0FBSyxlQUFMLENBQXFCLFNBQXJCLENBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLEtBQUssV0FBMUMsRUFBdUQsS0FBSyxZQUE1RDtBQUNBLFdBQUssYUFBTCxDQUFtQixTQUFuQixDQUE2QixDQUE3QixFQUFnQyxDQUFoQyxFQUFtQyxLQUFLLFdBQXhDLEVBQXFELEtBQUssWUFBMUQ7QUFFQSxXQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLFVBQUMsSUFBRCxFQUFPLEtBQVAsRUFBaUI7QUFDbEMsWUFBSSxJQUFJLENBQUMsSUFBVCxFQUFlO0FBQ2IsaUJBQU8sTUFBSSxDQUFDLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEtBQWxCLEVBQXlCLENBQXpCLENBQVA7QUFDRDs7QUFDRCxRQUFBLElBQUksQ0FBQyxJQUFMO0FBQ0EsUUFBQSxJQUFJLENBQUMsSUFBTDtBQUNELE9BTkQ7QUFPQSxXQUFLLGFBQUwsQ0FBbUIsU0FBbkIsQ0FDRSxLQUFLLGNBRFAsRUFFRSxDQUZGLEVBR0UsQ0FIRixFQUlFLEtBQUssV0FKUCxFQUtFLEtBQUssWUFMUDtBQU9EOzs7Ozs7QUFHSCxJQUFNLG9CQUFvQixHQUFHLElBQUksb0JBQUosRUFBN0I7QUFDQSxvQkFBb0IsQ0FBQyxJQUFyQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNsYXNzIENpcmNsZSB7XG4gIGNvbnN0cnVjdG9yKHsgb3JpZ2luLCBzcGVlZCwgY29sb3IsIGFuZ2xlLCBjb250ZXh0IH0pIHtcbiAgICB0aGlzLm9yaWdpbiA9IG9yaWdpbjtcbiAgICB0aGlzLnBvc2l0aW9uID0geyAuLi50aGlzLm9yaWdpbiB9O1xuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5yZW5kZXJDb3VudCA9IDA7XG4gIH1cblxuICBkcmF3KCkge1xuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQuYXJjKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCAyLCAwLCBNYXRoLlBJICogMik7XG4gICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgfVxuXG4gIG1vdmUoKSB7XG4gICAgdGhpcy5wb3NpdGlvbi54ID0gTWF0aC5zaW4odGhpcy5hbmdsZSkgKiB0aGlzLnNwZWVkICsgdGhpcy5wb3NpdGlvbi54O1xuICAgIHRoaXMucG9zaXRpb24ueSA9XG4gICAgICBNYXRoLmNvcyh0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQgK1xuICAgICAgdGhpcy5wb3NpdGlvbi55ICtcbiAgICAgIHRoaXMucmVuZGVyQ291bnQgKiAwLjM7XG4gICAgdGhpcy5yZW5kZXJDb3VudCsrO1xuICB9XG59XG5cbmNsYXNzIEJvb20ge1xuICBjb25zdHJ1Y3Rvcih7IG9yaWdpbiwgY29udGV4dCwgY2lyY2xlQ291bnQgPSAxMCwgYXJlYSB9KSB7XG4gICAgdGhpcy5vcmlnaW4gPSBvcmlnaW47XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLmNpcmNsZUNvdW50ID0gY2lyY2xlQ291bnQ7XG4gICAgdGhpcy5hcmVhID0gYXJlYTtcbiAgICB0aGlzLnN0b3AgPSBmYWxzZTtcbiAgICB0aGlzLmNpcmNsZXMgPSBbXTtcbiAgfVxuXG4gIHJhbmRvbUFycmF5KHJhbmdlKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gcmFuZ2UubGVuZ3RoO1xuICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihsZW5ndGggKiBNYXRoLnJhbmRvbSgpKTtcbiAgICByZXR1cm4gcmFuZ2VbcmFuZG9tSW5kZXhdO1xuICB9XG5cbiAgcmFuZG9tQ29sb3IoKSB7XG4gICAgY29uc3QgcmFuZ2UgPSBbXCI4XCIsIFwiOVwiLCBcIkFcIiwgXCJCXCIsIFwiQ1wiLCBcIkRcIiwgXCJFXCIsIFwiRlwiXTtcbiAgICByZXR1cm4gKFxuICAgICAgXCIjXCIgK1xuICAgICAgdGhpcy5yYW5kb21BcnJheShyYW5nZSkgK1xuICAgICAgdGhpcy5yYW5kb21BcnJheShyYW5nZSkgK1xuICAgICAgdGhpcy5yYW5kb21BcnJheShyYW5nZSkgK1xuICAgICAgdGhpcy5yYW5kb21BcnJheShyYW5nZSkgK1xuICAgICAgdGhpcy5yYW5kb21BcnJheShyYW5nZSkgK1xuICAgICAgdGhpcy5yYW5kb21BcnJheShyYW5nZSlcbiAgICApO1xuICB9XG5cbiAgcmFuZG9tUmFuZ2Uoc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpICogTWF0aC5yYW5kb20oKSArIHN0YXJ0O1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2lyY2xlQ291bnQ7IGkrKykge1xuICAgICAgY29uc3QgY2lyY2xlID0gbmV3IENpcmNsZSh7XG4gICAgICAgIGNvbnRleHQ6IHRoaXMuY29udGV4dCxcbiAgICAgICAgb3JpZ2luOiB0aGlzLm9yaWdpbixcbiAgICAgICAgY29sb3I6IHRoaXMucmFuZG9tQ29sb3IoKSxcbiAgICAgICAgYW5nbGU6IHRoaXMucmFuZG9tUmFuZ2UoTWF0aC5QSSAtIDEsIE1hdGguUEkgKyAxKSxcbiAgICAgICAgc3BlZWQ6IHRoaXMucmFuZG9tUmFuZ2UoMSwgNiksXG4gICAgICB9KTtcbiAgICAgIHRoaXMuY2lyY2xlcy5wdXNoKGNpcmNsZSk7XG4gICAgfVxuICB9XG5cbiAgbW92ZSgpIHtcbiAgICB0aGlzLmNpcmNsZXMuZm9yRWFjaCgoY2lyY2xlLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBjaXJjbGUucG9zaXRpb24ueCA+IHRoaXMuYXJlYS53aWR0aCB8fFxuICAgICAgICBjaXJjbGUucG9zaXRpb24ueSA+IHRoaXMuYXJlYS5oZWlnaHRcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaXJjbGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgICBjaXJjbGUubW92ZSgpO1xuICAgIH0pO1xuICAgIGlmICh0aGlzLmNpcmNsZXMubGVuZ3RoID09IDApIHtcbiAgICAgIHRoaXMuc3RvcCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZHJhdygpIHtcbiAgICB0aGlzLmNpcmNsZXMuZm9yRWFjaCgoY2lyY2xlKSA9PiBjaXJjbGUuZHJhdygpKTtcbiAgfVxufVxuXG5jbGFzcyBDdXJzb3JTcGVjaWFsRWZmZWN0cyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY29tcHV0ZXJDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIHRoaXMucmVuZGVyQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcblxuICAgIHRoaXMuY29tcHV0ZXJDb250ZXh0ID0gdGhpcy5jb21wdXRlckNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdGhpcy5yZW5kZXJDb250ZXh0ID0gdGhpcy5yZW5kZXJDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgdGhpcy5nbG9iYWxXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHRoaXMuZ2xvYmFsSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgdGhpcy5ib29tcyA9IFtdO1xuICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICB9XG5cbiAgaGFuZGxlTW91c2VEb3duKGUpIHtcbiAgICBjb25zdCBib29tID0gbmV3IEJvb20oe1xuICAgICAgb3JpZ2luOiB7IHg6IGUuY2xpZW50WCwgeTogZS5jbGllbnRZIH0sXG4gICAgICBjb250ZXh0OiB0aGlzLmNvbXB1dGVyQ29udGV4dCxcbiAgICAgIGFyZWE6IHtcbiAgICAgICAgd2lkdGg6IHRoaXMuZ2xvYmFsV2lkdGgsXG4gICAgICAgIGhlaWdodDogdGhpcy5nbG9iYWxIZWlnaHQsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGJvb20uaW5pdCgpO1xuICAgIHRoaXMuYm9vbXMucHVzaChib29tKTtcbiAgICB0aGlzLnJ1bm5pbmcgfHwgdGhpcy5ydW4oKTtcbiAgfVxuXG4gIGhhbmRsZVBhZ2VIaWRlKCkge1xuICAgIHRoaXMuYm9vbXMgPSBbXTtcbiAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLnJlbmRlckNhbnZhcy5zdHlsZTtcbiAgICBzdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgICBzdHlsZS50b3AgPSBzdHlsZS5sZWZ0ID0gMDtcbiAgICBzdHlsZS56SW5kZXggPSBcIjk5OTk5XCI7XG4gICAgc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuXG4gICAgc3R5bGUud2lkdGggPVxuICAgICAgdGhpcy5yZW5kZXJDYW52YXMud2lkdGggPVxuICAgICAgdGhpcy5jb21wdXRlckNhbnZhcy53aWR0aCA9XG4gICAgICAgIHRoaXMuZ2xvYmFsV2lkdGg7XG4gICAgc3R5bGUuaGVpZ2h0ID1cbiAgICAgIHRoaXMucmVuZGVyQ2FudmFzLmhlaWdodCA9XG4gICAgICB0aGlzLmNvbXB1dGVyQ2FudmFzLmhlaWdodCA9XG4gICAgICAgIHRoaXMuZ2xvYmFsSGVpZ2h0O1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmQodGhpcy5yZW5kZXJDYW52YXMpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5oYW5kbGVNb3VzZURvd24uYmluZCh0aGlzKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlaGlkZVwiLCB0aGlzLmhhbmRsZVBhZ2VIaWRlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcnVuKCkge1xuICAgIHRoaXMucnVubmluZyA9IHRydWU7XG4gICAgaWYgKHRoaXMuYm9vbXMubGVuZ3RoID09IDApIHtcbiAgICAgIHJldHVybiAodGhpcy5ydW5uaW5nID0gZmFsc2UpO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJ1bi5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuY29tcHV0ZXJDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmdsb2JhbFdpZHRoLCB0aGlzLmdsb2JhbEhlaWdodCk7XG4gICAgdGhpcy5yZW5kZXJDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmdsb2JhbFdpZHRoLCB0aGlzLmdsb2JhbEhlaWdodCk7XG5cbiAgICB0aGlzLmJvb21zLmZvckVhY2goKGJvb20sIGluZGV4KSA9PiB7XG4gICAgICBpZiAoYm9vbS5zdG9wKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvb21zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgICBib29tLm1vdmUoKTtcbiAgICAgIGJvb20uZHJhdygpO1xuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyQ29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICB0aGlzLmNvbXB1dGVyQ2FudmFzLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICB0aGlzLmdsb2JhbFdpZHRoLFxuICAgICAgdGhpcy5nbG9iYWxIZWlnaHRcbiAgICApO1xuICB9XG59XG5cbmNvbnN0IGN1cnNvclNwZWNpYWxFZmZlY3RzID0gbmV3IEN1cnNvclNwZWNpYWxFZmZlY3RzKCk7XG5jdXJzb3JTcGVjaWFsRWZmZWN0cy5pbml0KCk7XG4iXX0=
