function inputToLessVariableConverter(this_input) {
    //TODO : make a methode to turn undefined into ''
    value += this_input.attr('data-prefix');
    value = this_input.val();
    value += this_input.attr('data-suffix');
    return value;
}
function changeLessSetings()
{
    var lessVariables = [];
    var changedVariable = function(this_input){
                                                value = inputToLessVariableConverter(this_input);
                                                lessVariables[this_var.attr('id')] = value;
                                                less.modifyVars(lessVariables);
                                            };
    return changedVariable;
}
var incipitCSS = function(){
    return {
        settings : function() {
            $("body")
            .append('<button id="settings">settings</button>');
            $("body")
            .append('<div id="settings-container"></div>');
            $('#settings').css({'position': 'fixed',
                                            'bottom': 0,
                                            'right': 0,
                                            'font-size': '0.8em',
                                           });
            $('#settings').click(function(){
                $('#settings-container').load('../utils/settings.php', function(){
                    $('#settings-container').css({'position': 'fixed',
                                                    'bottom': 0,
                                                    'right': 0,
                                                    'background': '#fff',
                                                    'font-size': '0.8em',
                                                    'width': '320px',
                                                    'overflow': 'auto',
                                                    'border-left': '2px solid #555',
                                                    'border-top': '2px solid #555',
                                                   });
                    $('#close-settings').click(function(){
                        $('#settings-container').html('');
                    });
                    var settings = changeLessSetings();
                    $('.less-var-change').change(function(){
                        settings($(this));
                    });
                });
            });
        }
    };
}();


//snippets
$('q').hover(function(){
    currentContent= $(this).html();
    $(this).html(currentContent+' <a href="'+$(this).attr('cite')+'" target="_blank"><img src="images/external.png" /></a>');
},
function(){
   $(this).html(currentContent);
});
