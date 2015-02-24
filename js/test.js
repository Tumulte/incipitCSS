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
                                            'left': 0,
                                            'background': '#fff',
                                            'font-size': '0.8em',
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
    if (lessVariables === undefined) {
        var lessVariables = [];
    }
    $('#color_main').change(function(){
        lessVariables['@dominant'] = $(this).val();
        less.modifyVars(lessVariables)
    });
    $('#color_type').change(function(){
        lessVariables['@color_type'] = $(this).val();
        less.modifyVars(lessVariables)
    });
    $('#font_size').change(function(){
        lessVariables['@font_main_size'] = $(this).val()+"em";
        less.modifyVars(lessVariables)
    });
    $('#base_unit').change(function(){
        lessVariables['@ratio'] = $(this).val()+"em";
        less.modifyVars(lessVariables)
    });
}
