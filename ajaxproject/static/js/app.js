$(document).ready(function () {
    function showLoadingImage() {
        $("div:hidden").show(); 
    }
    
    
    var csrf = $("input[name=csrfmiddlewaretoken]").val();

    $("#getBtn").click(function() {
        console.log("Button clicked");
        $.ajax({
            url: '', 
            type: 'get',
            data: {
                button_text: $(this).text()
            }, 
            success: function(response) {
                $(".btn").text(response.seconds)
                $("#seconds").append('<li>' + response.seconds + '</li>')
            }
        }); 
    });

    $("#seconds").on('click', 'li', function () {
        $.ajax({
            url: '', 
            type: 'post', 
            data: {
                text: $(this).text(), 
                csrfmiddlewaretoken: csrf
            }, 
            success: function(response) {
                $("#right").append('<li>' + response.data + '</li>');
            }
        })
    });
    var source_code; 
    function getSourceCode() {
        source_code = $("#source-code").val(); 
        if(source_code == "") {
            console.log("Empty"); 
        }
        else {
            console.log(source_code); 
        }
    }
    var accepted_output = "Hello\n";
    function hideLoadingImage() {
        $("#loader").hide();
    }
    function runCode() {

        
        //var input_given = $("#custom-input").val();
        var run_data = {
            source: source_code,
            csrfmiddlewaretoken: csrf,
        };
        
        $.ajax({
            url: "run/", 
            type: "post", 
            data: run_data, 
            dataType: "json", 
            timeout: 10000,
            beforeSend: function(){
                // Show image container
                showLoadingImage();
            },
            success: function(response) {
                var cstatus = response.compile_status; 
                var rstatus = response.run_status.status; 

                var output = response.run_status.output; 
                if(accepted_output == output) {
                    $("#output").append('<li> <button class="btn btn-success">' +  "Accepted" + '</button>  </li>');
                }
                else {
                    $("#output").append('<li> <button class="btn btn-danger">' +  "Wrong Answer" + '</button>  </li>');
                }

                
            }, 
            complete: function() {
                hideLoadingImage();
            }
            
        }); 

    }


    $("#runCode").click(function() {
        console.log("Submit button clicked!"); 
        getSourceCode();
        runCode(); 
    })


});