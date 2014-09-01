(function(){
    function Maker() {
        // import the required primitives
        Handlebars.registerHelper('import', function(items, options) {
            var out = '';

            for(var i=0; i<items.length; i++) {
                out += "import centinel.primitives.";
                out += items[i] + " as " + items[i] + "\n";
            }

            return out;
        });

        Handlebars.registerHelper('instance_vars', function(item){
            var out = '';
            out += "self." + item.name + " = " + item.value + "\n";
            return out;
        });

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
