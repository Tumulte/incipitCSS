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
        });
    });

    

    color_picked = false;
    type_picked = false;
    $('#color_main').change(function(){
      if(!type_picked){
        less.modifyVars({'@dominant' : $(this).val()})
      }else{
        less.modifyVars({'@dominant' : $(this).val(), '@color_type' : type_picked})
      }
      color_picked = $(this).val();
    });
    $('#color_type').change(function(){
      if(!color_picked){
        less.modifyVars({'@color_type' : $(this).val()})
      }else{
        less.modifyVars({'@color_type' : $(this).val(), '@dominant' : color_picked})
      }
      type_picked = $(this).val();
    });
    $('#font_size').change(function(){
        less.modifyVars({'@font_main_size' : $(this).val()+"em"})
    });
    $('#base_unit').change(function(){
        less.modifyVars({'@ratio' : $(this).val()+"em"})
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
