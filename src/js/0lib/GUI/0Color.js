var Color = {
    copy: function(color) {
      var r = {};
      Object.assign(r, color);
      return r;
    },
    update: function(color) {
      color.color = Color.colorString(color.red,color.green,color.blue,color.alpha);
    },
    colorString: function(r,g,b,a) {
      return 'rgba(' +
        Math.floor(r) + ',' +
        Math.floor(g) + ',' +
        Math.floor(b) + ',' +
        a +
      ')';
    },
    darken: function(color, amt) {
      if(!amt)amt=1;
      var r = color.red * .6*amt;
      var g = color.green * .7*amt;
      var b = color.blue * .7*amt;
      var a = color.alpha;
      var color = Color.colorString(r,g,b,a);
      return {red: r, green: g, blue: b, alpha:a, color: color}
    },
    lighten: function(color) {
      var d = 9;
      var r = (color.red + 255*d) / (d+1);
      var g = (color.green + 255*d)/ (d+1);
      var b = (color.blue + 255*d) /(d+1);
      var a = color.alpha;
      var color = Color.colorString(r,g,b,a);
      return {red: r, green: g, blue: b, color: color}
    }
  }