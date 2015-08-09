function inputToLessVariableConverter(thisInput) {
    var value = undefinedToEmptyStr(thisInput.attr('data-prefix'));
    value += undefinedToEmptyStr(thisInput.val());
    value += undefinedToEmptyStr(thisInput.attr('data-suffix'));
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
    return function(thisInput){
                                  if(thisInput) {
                                      lessVariables[thisInput.attr('id')] = inputToLessVariableConverter(thisInput);
                                      less.modifyVars(lessVariables);
                                  } else {
                                      return lessVariables;
                                  }
                              };
}

var incipitCSS = function() {
    return {
        settings: function () {
            $("body") .append('<button id="settings">settings</button>'+
                              '<div id="settings-container"></div>');
            $('#settings').click(function () {
                $.ajax({
                    url: '/utils/settings.php',  type: 'GET', success: function (data) {
                        $('#settings-container').html(data);
                        $('#close-settings').click(function () {
                            $('#settings-container').html('');
                        });
                        var settings = changeLessSetings();
                        $('#settings-container').on('change','.less-var-change', function () {
                            settings($(this));
                        });
                        $(document).on('click', '#save-settings', function () {
                            $.post('/update_config.php', {data: settings()});
                        });
                        $("#settings-container").on('click', '#customize-colors', function(){
                            toggleCustomColors();
                        })
                        //TODO : fix success and failure message
                        $("#save-settings").click(function(e)
                        {
                            e.preventDefault(); //STOP default action
                            var postData = $(this).parents("#settings-form").serialize();
                            var formURL = $(this).parents("#settings-form").attr("action");
                            $.ajax(
                                {
                                    url : formURL,
                                    type: "POST",
                                    data : postData,
                                    success:function(data, textStatus, jqXHR)
                                    {
                                        console.debug(jqXHR);
                                    },
                                    error: function(jqXHR, textStatus, errorThrown)
                                    {
                                        console.debug('not cool');
                                    }
                                });
                            return false;
                        });

                    }
                });
            });
        }
    }
}();
function toggleCustomColors(colorType) {
    if($(".color-custom-settings").length > 0) {
        $('.color-custom-settings').remove();
    } else {
        $('.color-sample').not('.dominant').each(function(){
            $(this).append('<div class="color-custom-settings">'+colorEditionInputs($(this))+'</div>');
        });
    }
}
function colorEditionInputs(element) {
    var colorHSLArray = backgroundRGBToHSLArray(element);
    var colorLessVariableName = element.children('.color-title').html();
    var rangeInputHTML = '';
    for(var parameter in colorHSLArray) {
        if(parameter === 'h') {
            var max = 360;
        }else{
            var max = 100;
        }
        rangeInputHTML += '<input type="range" value="' + colorHSLArray[parameter].toFixed(0) + '" class="color-change" max="'+max+'"/>';
    }

    rangeInputHTML += '<input type="text" id="'+colorLessVariableName+'" class="custom-var-name less-var-change" disabled="disabled" value="\'@{custom}-'+colorLessVariableName+'\'" name="@'+colorLessVariableName+'" />';
    rangeInputHTML += '<input type="text" id="custom-'+colorLessVariableName+'" class="color-mod less-var-change" name="@custom-'+colorLessVariableName+'" />';
    //TODO Check that it triggers less variable only on stop !
    $('.color-change').on('mouseup', function(){
        writeColorChange($(this));
    });
    return rangeInputHTML;
}
function writeColorChange(thisRange) {
    var newLessColorParameters = rangeValuesToLessParameters(thisRange);
    //Writting the range values (converted to color functions) in the hidden input field that will be processed by PHP
    thisRange.siblings(".custom-var-name").prop("disabled", false);
    var lessColorModInput = thisRange.siblings(".color-mod");
    lessColorModInput.val(newLessColorParameters);
    //changing val() doesn't trigger change. Got to do this manually
    lessColorModInput.trigger('change');
    thisRange.siblings('.custom-var-name').trigger('change');
}
function rangeValuesToLessParameters(thisRange) {
    var dominant = $(".dominant")
    var dominantHSLArray = backgroundRGBToHSLArray(dominant);
    var colorHSLArray = rangeValuesToHSLArray(thisRange);
    var colorToDominantHSLArray = colorDominantHSLDifference(colorHSLArray, dominantHSLArray);
    var colorParameters = "lighten(saturate(spin("+dominant.css('background-color');
    for(var key in colorToDominantHSLArray) {
        var value = colorToDominantHSLArray[key].toFixed(0);
        if(value < 0 && key == 1) {
            colorParameters = colorParameters.replace('saturate','desaturate');
            value = Math.abs(value);
        } else if(value < 0 && key == 2) {
            colorParameters = colorParameters.replace('lighten','darken');
            value = Math.abs(value);
        }
        if(key != 0) {
            value = value+'%';
        }
        colorParameters += ","+value+")";
    }
    return colorParameters;
}
function rangeValuesToHSLArray(thisRange) {
    var HSL = new Array(3);
    thisRange.siblings('.color-change').andSelf().each(function(index){
        HSL[index] = $(this).val();
    });
    return HSL;
}
function colorDominantHSLDifference(color, dominant){
    var dominantArray = new Array();
    for(key in dominant) {
        dominantArray.push(dominant[key]);
    }
    return dominantArray.map(function(value, index){
        return color[index] - value;
    });
}
function backgroundRGBToHSLArray(color){
    var colorRGB = color.css("background-color");
    var RGBArray = colorRGB.replace(/^rgb\(/,'').replace(/\)$/,'').split(',');
    var RGB = new RGBColour(RGBArray[0], RGBArray[1], RGBArray[2]);

    var HSL =  RGB.getHSL();
    delete HSL["a"];
    return HSL
}


//snippets
$('q').hover(function(){
    var currentContent= $(this).html();
    $(this).html(currentContent+' <a href="'+$(this).attr('cite')+'" target="_blank"><img src="/images/external.png" /></a>');
},
function(){
   $(this).html(currentContent);
});

// Method to delete LESS localStorage and refresh @import
function destroyLessCache(pathToCss) { // e.g. '/css/' or '/stylesheets/'
    if (!window.localStorage || !less ) {
        console.debug("cache NOT cleared : Either there's no localstorage or less is undefined");
        return;
    }
    var host = window.location.host;
    var protocol = window.location.protocol;
    var keyPrefix = protocol + '//' + host + pathToCss;
    for (var key in window.localStorage) {
        if (key.indexOf(keyPrefix) === 0) {
            delete window.localStorage[key];
        }
    }
    console.debug('cache cleared');
}
