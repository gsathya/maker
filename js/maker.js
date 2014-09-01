(function(){
    function Maker() {
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
        editor.setValue(template(data), 1)

        var download_button = document.getElementById("download");

        download_button.addEventListener("click", function(){
            var code = new Blob([editor.getValue()], {type: "text/x-python;charset=utf-8"});
            console.log(editor.getValue());
            saveAs(code, data.name + ".py"); 
        });
    };

    this.Maker = Maker;
})();
