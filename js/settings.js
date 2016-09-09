function inputPrefixSuffixConcatenater(thisInput) {
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
                                      lessVariables[thisInput.attr('id')] = inputPrefixSuffixConcatenater(thisInput);
                                      less.modifyVars(lessVariables);
                                  } else {
                                      return lessVariables;
                                  }
                              };
}
function rgbToHex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
function hex(x) {
    var hexDigits = new Array ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

var incipitCSS = function() {
    return {
        settings: function () {
            var body = document.getElementsByTagName('body')[0];
            body.innerHTML += '<button id="settings">settings</button>'+
                              '<div id="settings-container"></div>';
            document.getElementById('settings').onclick = function () {
                $.ajax({
                    url: incipitSettings.url+'utils/settings.php',  type: 'GET', success: function (data) {

                        var settingsContainer = document.getElementById('settings-container');
                        settingsContainer.innerHTML = data;
                        document.getElementById('close-settings').onclick = function(){settingsContainer.innerHTML = ''};
                        var settings = changeLessSetings();
                        $('#settings-container').on('change','.less-var-change', function () {
                            $("#save-validate, #save-off").html('Save');
                            $("#save-validate, #save-off").attr('id', 'save-settings');
                            settings($(this));
                        });
                        $('#settings-container').on('click', '#save-settings', function () {
                            $(this).html('Are you sure ?');
                            $(this).attr('id', 'save-validate');
                        });
                        $("#settings-container").on('click', '#customize-colors', function(){
                            toggleCustomColors();
                        });
                        //TODO : fix success and failure message
                        $("#settings-container").on('click', "#save-validate", function(e)
                        {
                            e.preventDefault(); //STOP default action
                            var postData = settings();
                            var formURL = $(this).parents("#settings-form").attr("action");
                            $.ajax(
                                {
                                    url : formURL,
                                    type: "POST",
                                    data : postData,
                                    success:function(data, textStatus, jqXHR)
                                    {
                                        console.debug(data, textStatus, jqXHR);
                                        //TODO add clear cache button
                                        localStorage.clear();
                                        $(this).attr('id', 'save-off');
                                    },
                                    error: function(jqXHR, textStatus, errorThrown)
                                    {
                                    }
                                });
                            return false;
                        });

                    },
                    complete: function(){
                        var baseUnit = parseInt($('html').css("line-height"));
                        var fontMainSize = parseInt($('html').css("font-size"));
                        var dominantColor = rgbToHex($('.dominant').css('background-color'));
                        $('#font-main-size').attr('value', fontMainSize);
                        $('#base-unit').attr('value', (baseUnit/fontMainSize).toFixed(1));
                        $('#dominant').attr('value', dominantColor);
                        $('#dominant').attr('value', dominantColor);
                     
                    }
                    
                });
            };
        }
    };
}();
function toggleCustomColors() {
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
        var max = 100;
        if(parameter === 'h') {
             max = 360;
        }
        rangeInputHTML +='<label>'+parameter+' <input type="range" value="' + colorHSLArray[parameter].toFixed(0) + '" class="color-change" max="'+max+'"/></label>';
    }

    rangeInputHTML += '<input type="hidden" id="'+colorLessVariableName+'" class="custom-var-name less-var-change" disabled="disabled" value="\'@{custom}-'+colorLessVariableName+'\'" name="@'+colorLessVariableName+'" />';
    rangeInputHTML += '<input type="hidden" id="custom-'+colorLessVariableName+'" class="color-mod less-var-change" name="@custom-'+colorLessVariableName+'" />';
    //TODO Check that it triggers less variable only on stop !
    $('.color-change').on('mouseup', function(){
        writeColorOperationInInput($(this));
    });
    return rangeInputHTML;
}

function writeColorOperationInInput(thisRange) {
    var lessColorOperationString = HSLRangeToLessColorOperationString(thisRange);
    thisRange.siblings(".custom-var-name").prop("disabled", false);
    var colorOperationInput = thisRange.siblings(".color-mod");
    colorOperationInput.val(lessColorOperationString);
    //changing val() doesn't trigger change. Got to do this manually
    colorOperationInput.trigger('change');
    thisRange.siblings('.custom-var-name').trigger('change');
}
function HSLRangeToLessColorOperationString(thisRange) {
    var dominant = $(".dominant");
    var dominantHSLArray = backgroundRGBToHSLArray(dominant);
    var rangeColorHSL = rangeValuesToHSLArray(thisRange);
    var HSLDiffArray = HSLDiff(rangeColorHSL, dominantHSLArray);
    var colorOperationString = "lighten(saturate(spin("+dominant.css('background-color');
    for(var key in HSLDiffArray) {
        var value = HSLDiffArray[key].toFixed(0);
        if(value <= 0 && key == 1) {
            colorOperationString = colorOperationString.replace('saturate','desaturate');
            value = Math.abs(value);
        } else if(value <= 0 && key == 2) {
            colorOperationString = colorOperationString.replace('lighten','darken');
            value = Math.abs(value);
        }
        if(key !== '0') {
            value = value+'%';
        }
        colorOperationString += ","+value+")";
    }
    return colorOperationString;
}
function rangeValuesToHSLArray(thisRange) {
    var HSL = new Array(3);
    thisRange.siblings('.color-change').andSelf().each(function(index){
        HSL[index] = $(this).val();
    });
    return HSL;
}
function HSLDiff(color, dominant){
    var dominantArray = [];
    for(key in dominant) {
        dominantArray.push(dominant[key]);
    }
    return dominantArray.map(function(value, index){
        return color[index] - value;
    });
}
function backgroundRGBToHSLArray(element){
    var colorRGB = element.css("background-color");
    var RGBArray = colorRGB.replace(/^rgb\(/,'').replace(/\)$/,'').split(',');
    var RGB = new RGBColour(RGBArray[0], RGBArray[1], RGBArray[2]);

    var HSL =  RGB.getHSL();
    delete HSL.a;
    return HSL;
}
