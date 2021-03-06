'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var SectionGenerator = yeoman.generators.NamedBase.extend({
  generateSection: function(){
    var context = {
      content: this.name,
      id: this._.classify(this.name)
    }
    
    var fileBase = Date.now() + "_" + this._.underscored(this.name);
    var htmlFile = "app/sections/" + fileBase + ".html";
    var cssFile  = "app/css/" + fileBase + ".css"; 
    
    this.template("_section.html", htmlFile, context);
    this.template("_section.css", cssFile, context);
  },
  
  generateMenu: function(){
    var menu = this.read("_menu.html");
    
    var t = '<a class="item" href="#<%= id %>"><%= name %></a>';
    var files = this.expand("app/sections/*.html");
    
    for (var i = 0; i < files.length; i++) {
      var name = this._.chain(files[i]).strRight("_").strLeftBack(".html").humanize().value();
      
      var context = {
        name: name,
        id: this._.classify(name)
      };
      
      var link = this.engine(t, context);
      menu = this.append(menu, "div.menu", link);
    }
    
    this.write("app/menu.html", menu);
  }
});

module.exports = SectionGenerator;