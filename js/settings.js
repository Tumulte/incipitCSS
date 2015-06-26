var incipitCSS = function(){
    function changeLessSetings()
    {
        var possibleLessVariables = ['dominant', 'color-type', 'font-main-size', 'base-unit'];
        if (lessVariables === undefined) {
            var lessVariables = [];
        }
        for (index in possibleLessVariables) {
            $('#'+possibleLessVariables[index]).change(function(){
                value = $(this).val();
                if (!isNaN(parseInt(value))){
                    value += $(this).attr('data-unit');
                }
                lessVariables[$(this).attr('id')] = value;
                less.modifyVars(lessVariables)
            });
        }
    }
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
                    changeLessSetings();
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
