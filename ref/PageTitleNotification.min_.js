var PageTitleNotification={Vars:{OriginalTitle:document.title,Interval:null},On:function(e,t){var n=this;n.Vars.Interval=setInterval(function(){document.title=n.Vars.OriginalTitle==document.title?e:n.Vars.OriginalTitle},t?t:1e3)},Off:function(){clearInterval(this.Vars.Interval);document.title=this.Vars.OriginalTitle}}