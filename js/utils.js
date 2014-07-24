//////////////////////////////////////////////////////////////////////////////
//  tareksherif.ca: codebase for www.tareksherif.ca
//  Copyright (C) 2013  Tarek Sherif
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU Affero General Public License as
//  published by the Free Software Foundation, either version 3 of the
//  License, or (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU Affero General Public License for more details.
//
//  You should have received a copy of the GNU Affero General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.
//////////////////////////////////////////////////////////////////////////////

utils = {
  // CaptureMouse code from Foundation HTML5 Animation with JavaScript
  // by Billy Lamberta and Keith Peters
  captureMouse: function(canvas) {
    var mouse = {x: 0, y: 0};
    
    canvas.addEventListener("mousemove", function(e) {
      var x, y;
      
      if (e.pageX !== undefined) {
        x = e.pageX;
        y = e.pageY;
      } else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      
      x -= canvas.offsetLeft;
      y -= canvas.offsetTop;
      
      mouse.x = x;
      mouse.y = y;
    }, false);
    
    return mouse;
  },
  
  // CaptureTouch code from Foundation HTML5 Animation with JavaScript
  // by Billy Lamberta and Keith Peters
  captureTouch: function(canvas) {
    var touch = {x: null, y: null, touching: false};
    
    canvas.addEventListener("touchstart", function(e) {
      touch.touching = true;
    }, false);
    
    canvas.addEventListener("touchend", function(e) {
      touch.x = null;
      touch.y = null;
      touch.touching = false;
    }, false);
    
    canvas.addEventListener("touchmove", function(event) {
      var x, y;
      var e = event.touches[0];
      
      if (e.pageX !== undefined) {
        x = e.pageX;
        y = e.pageY;
      } else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      
      x -= canvas.offsetLeft;
      y -= canvas.offsetTop;
      
      touch.x = x;
      touch.y = y;
    }, false);
    
    return touch;
  },
  
  clamp: function(value, min, max) {
    return value < min ? min :
           value > max ? max :
           value;
  },
  
  colorShift: function(color, shift_range) {
    color = utils.parseColor(color, true);
    shift_range = shift_range || 0;
    
    var r = color >> 16 & 0xFF;
    var g = color >> 8 & 0xFF;
    var b = color & 0xFF;
            
    r = utils.clamp(r + Math.floor(Math.random() * shift_range - shift_range / 2), 0, 255);
    b = utils.clamp(b + Math.floor(Math.random() * shift_range - shift_range / 2), 0, 255);
    g = utils.clamp(g + Math.floor(Math.random() * shift_range - shift_range / 2), 0, 255);
    
    return utils.parseColor(r << 16 | b << 8 | g);
  },
  
  parseColor: function(color, to_number) {
    if (to_number) {
      if (typeof color === "number") {
        return color |= 0;
      }
      if (typeof color === "string" && color[0] === "#") {
        color = color.slice(1);
      }
      return parseInt(color, 16);
    } else {
      if (typeof color === "number") {
        color = "#" + ("00000" + color.toString(16)).slice(-6);
      }
      return color;
    }
  },
  
  drawDot: function(context, x, y, color) {
    color = color || "#ff0000";
    utils.withContext(context, function() {
      context.fillStyle = color;
      context.fillRect(x - 2, y - 2, 4, 4);
    });
  },
  
  withContext: function(context, callback) {
    context.save();
    callback();
    context.restore();
  },
  
  randomColor: function() {
    return "rgb(" + Math.floor(Math.random() * 255) + ","
                  + Math.floor(Math.random() * 255) + ","
                  + Math.floor(Math.random() * 255) + ")";
  },
  
  colorToRGB: function(r, g, b, a) {
    a = a === undefined ? 1.0 : a;
    return "rgba(" + r + ","
                   + g + ","
                   + b + ","
                   + a +")";
  },
  
  multiplyColor: function(color, alpha) {
    color = utils.parseColor(color, true);
    var r = Math.floor(alpha * (color >> 16 & 0xFF));
    var g = Math.floor(alpha * (color >> 8 & 0xFF));
    var b = Math.floor(alpha * (color & 0xFF));
    
    return utils.parseColor(r << 16 | g << 8 | b);
  }
};
