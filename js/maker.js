(function(){
    function Maker() {
        var source = document.getElementById("skeleton").innerHTML;
        var template = Handlebars.compile(source);
        var data = {
            primitives: ["http", "dnslib"],
            class_name: "HTTPRequestExperiment",
            name: "http_request",
            vars: [
                {name: "input_file", value: "input_file"},
                {name: "results", value: "[]"},
                {name: "path", value: "'/'"}
            ],
            functions: "http.get_request(line)"
        };

        var output = document.getElementById("experiment");
        output.innerHTML = template(data);
    };

    this.Maker = Maker;
})();
