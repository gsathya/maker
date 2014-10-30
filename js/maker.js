(function(){
    function Maker() {
        var data;
        
        var primitives = {
            http: {
                checked: false,
                headers: false
            },
            dns: {
                checked: false
            }
        };

        var source = document.getElementById("skeleton").innerHTML;
        var template = Handlebars.compile(source);

        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/python");

        var download_button = document.getElementById("download");
        download_button.addEventListener("click", function(){
            var code = new Blob([editor.getValue()], {type: "text/x-python;charset=utf-8"});
            console.log(editor.getValue());
            saveAs(code, data.exp_name + ".py");

            var url_element = document.getElementById("input_urls");
            var urls = new Blob([url_element.value], {type: "text;charset=utf-8"});
            saveAs(urls, data.exp_name + ".txt");

        });

        var make_button = document.getElementById("make");
        make_button.addEventListener("click", function(){
            data = getData();

            // compile the code
            editor.setValue(template(data), 1)

            // make it visible
            var code_div = document.getElementById("code");
            code_div.style.display = 'block';
        });

        var http_primitive_checkbox = document.getElementById("http_primitive_checkbox")
        http_primitive_checkbox.checked = primitives.http.checked;
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
        dns_primitive_checkbox.checked = primitives.dns.checked;
        dns_primitive_checkbox.addEventListener("click", function(){
            var dns_primitive_panel = document.getElementById("dns_primitive_settings")
            primitives.dns.checked = this.checked;
            if(this.checked) {
                dns_primitive_panel.style.display = 'block';
            } else {
                dns_primitive_panel.style.display = 'none';
            }
        });

        var http_headers_checkbox = document.getElementById("http_headers")
        http_headers_checkbox.checked = primitives.http.headers;
        http_headers_checkbox.addEventListener("click", function(){
            var http_headers_panel = document.getElementById("http_headers_settings")
            primitives.http.headers = this.checked;
            if(this.checked) {
                http_headers_panel.style.display = 'block';
            } else {
                http_headers_panel.style.display = 'none';
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
                var http_repeat = document.getElementById("http_repeat").value;
                
                for(var i=0; i<http_repeat; i++){
                    var http_method = $('.selectpicker').val();
                    var http_header = {
                        module: 'http',
                        method: http_method,
                        args: document.getElementById("http_args").value,
                    };
                    
                    if(primitives.http.headers){
                        http_header.headers = {
                            name: 'Content-Type',
                            value: '"'+document.getElementById("header_value").value+'"'
                        };
                    };

                    config.functions.push(http_header);
                }
            }

            if (primitives.dns.checked){
                config.primitives.push({name: "dnslib", alias: "dns"});

                var dns_repeat = document.getElementById("dns_repeat").value
                for(var i=0; i<dns_repeat; i++) {
                    config.functions.push({
                        module: 'dns',
                        method: document.getElementById("dns_method").value,
                        args: document.getElementById("dns_args").value,
                    });
                }
            }

            var exp_vars = document.getElementById("exp_vars").value;
            exp_vars = exp_vars.split(',');
            for (var i=0; i<exp_vars.length; i++){
                var exp_var = exp_vars[i].split('=');
                config.vars.push({name: exp_var[0], value: exp_var[1]});
            }

            config.exp_name = document.getElementById("exp_name").value;
            config.class_name = document.getElementById("class_name").value;

            return config
        };
    };

    this.Maker = Maker;
})();
