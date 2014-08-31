(function(){
    function Maker() {
        var source = document.getElementById("skeleton").innerHTML;
        var template = Handlebars.compile(source);
        var data = {
            imports: "This is maker"
        };

        var output = document.getElementById("experiment");
        output.innerHTML = template(data);
    };

    this.Maker = Maker;
})();
