$(function(){
    $("body")
    .append('<button id="settings">settings</button>');
    $("body")
    .append('<div id="settings_container"></div>');
    $('#settings').css({'position': 'fixed',
                                    'bottom': 0,
                                    'right': 0,
                                    'font-size': '0.8em',
                                   });
    $('#settings').click(function(){
        $('#settings_container').load('../utils/settings.html', function(){
            $('#settings_container').css({'position': 'fixed',
                                            'bottom': 0,
                                            'right': 0,
                                            'background': '#fff',
                                            'font-size': '0.8em',
                                            'width': '320px',
                                            'overflow': 'auto',
                                            'border-left': '2px solid #555',
                                            'border-top': '2px solid #555',
                                           });
            $('#close_settings').click(function(){
                $('#settings_container').html('');
            });
            changeLessSetings();
        });
    });


//snippets
    $('q').hover(function(){
        current_content= $(this).html();
        $(this).html(current_content+' <a href="'+$(this).attr('cite')+'" target="_blank"><img src="images/external.png" /></a>');
    },
    function(){
       $(this).html(current_content);
    });
});
function changeLessSetings()
{
    var possibleLessVariables = ['dominant', 'color_type', 'font_main_size', 'base_unit'];
    if (lessVariables === undefined) {
        var lessVariables = [];
    }
    for (index in possibleLessVariables) {
        $('#'+possibleLessVariables[index]).change(function(){
            value = $(this).val();
            if (!isNaN(parseInt(value))){
                value += 'em';
            }
            lessVariables[$(this).attr('id')] = value;
            console.debug(lessVariables);
            less.modifyVars(lessVariables)
        });
    }
}
