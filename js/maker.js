(function(){
    function Maker() {
        var source = document.getElementById("skeleton").innerHTML;
        var template = Handlebars.compile(source);
        var data = {
            imports: "import centinel.primitives.http as http",
            name: "http_request",
            primitive: "http.get_request(line)"
        };

        var output = document.getElementById("experiment");
        output.innerHTML = template(data);
    };

    this.Maker = Maker;
})();
