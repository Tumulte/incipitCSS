function inputToLessVariableConverter(thisInput) {
    console.debug(thisInput);
    var value = undefinedToEmptyStr(thisInput.attr('data-prefix'));
    value += undefinedToEmptyStr(thisInput.val());
    value += undefinedToEmptyStr(thisInput.attr('data-suffix'));
    console.debug(value);
    return value;
}
function undefinedToEmptyStr(varToCheck) {
    if (varToCheck === undefined) {
        return '';
    } else {
        return varToCheck;
    }
}
function changeLessSetings()
{
    var lessVariables = {};
    var changedVariable = function(thisInput){
                                                if(thisInput) {
                                                    value = inputToLessVariableConverter(thisInput);
                                                    lessVariables[thisInput.attr('id')] = value;
                                                    less.modifyVars(lessVariables);
                                                } else {
                                                    console.debug(lessVariables);
                                                    return lessVariables;
                                                }
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
                    $(document).on('click', '#save-settings', function() {
                        console.debug(settings());
                        $.post('/update_config.php', {data: settings()});
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
