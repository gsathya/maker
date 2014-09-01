(function(){
    function Maker() {
        var primitives = {
            http: {
                checked: 'false'
            },
            dns: {
                checked: 'false'
            }
        };

        var source = document.getElementById("skeleton").innerHTML;
        var template = Handlebars.compile(source);

        var data = {
            primitives: [
                {name: "http", alias: "http"},
                {name: "dnslib", alias: "dns"}
            ],
            class_name: "HTTPRequestExperiment",
            name: "http_request",
            vars: [
                {name: "input_file", value: "input_file"},
                {name: "results", value: "[]"},
                {name: "path", value: "'/'"}
            ],
            functions: [{
                module: "http",
                method: "get_request",
                args: "line, self.path"
            }]
        };

        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/python");

        var download_button = document.getElementById("download");
        download_button.addEventListener("click", function(){
            var code = new Blob([editor.getValue()], {type: "text/x-python;charset=utf-8"});
            console.log(editor.getValue());
            saveAs(code, data.name + ".py");
        });

        var make_button = document.getElementById("make");
        make_button.addEventListener("click", function(){
            var data = getData();

            // compile the code
            editor.setValue(template(data), 1)

            // make it visible
            var code_div = document.getElementById("code");
            code_div.style.display = 'block';
        });

        var http_primitive_checkbox = document.getElementById("http_primitive_checkbox")
        http_primitive_checkbox.addEventListener("click", function(){
            var http_primitive_panel = document.getElementById("http_primitive_settings")
            primitives.http.checked = this.checked;
            if(this.checked) {
                http_primitive_panel.style.display = 'block';
            } else {
                http_primitive_panel.style.display = 'none';
            }
        });

        var dns_primitive_checkbox = document.getElementById("dns_primitive_checkbox")
        dns_primitive_checkbox.addEventListener("click", function(){
            var dns_primitive_panel = document.getElementById("dns_primitive_settings")
            primitives.dns.checked = this.checked;
            if(this.checked) {
                dns_primitive_panel.style.display = 'block';
            } else {
                dns_primitive_panel.style.display = 'none';
            }
        });

        var getData = function(){
            var config = {
                primitives: [],
                vars: [],
                functions: []
            };

            if (primitives.http.checked){
                config.primitives.push({name: "http", alias: "http"});
            }

            if (primitives.dns.checked){
                config.primitives.push({name: "dnslib", alias: "dns"});
            }
        };
    };

    this.Maker = Maker;
})();
