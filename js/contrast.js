function contrastLight(rgb){
    return (rgb.r*299+rgb.g*587+rgb.b*114);
}
function contrastDiff(colour1, colour2){
   brightness1 = contrastLight(colour1);
   brightness2 = contrastLight(colour2);
   return (Math.max(brightness2, brightness1) -
          Math.min(brightness1, brightness2))/1000;
}
function contrastDiffColour(colour1, colour2){
    return Math.max(colour2.r, colour1.r) - Math.min(colour1.r, colour2.r) +
           Math.max(colour2.g, colour1.g) - Math.min(colour1.g, colour2.g) +
           Math.max(colour2.b, colour1.b) - Math.min(colour1.b, colour2.b)
}

function getLowestValue(valueArray){
    var contrast_min = false;
    $.each(valueArray, function(index, value){
        if(value < contrast_min || !contrast_min) {
            contrast_min = value;
        }
    });
    return contrast_min;
}
function getHighestValue(valueArray){
    var contrast_max = false;
    $.each(valueArray, function(index, value){
        if(value > contrast_max || !contrast_max) {
            contrast_max = value;
        }
    });
    return contrast_max;
}
function getSum(valueArray){
    var sum = 0;
    $.each(valueArray, function(index, value){
        sum += value;
    });
    return sum;
}


var previous_rgb = false;
var contrast_colour_bars = '';
var contrast_array = [];
var contrast_colour_array = [];
function generateBars(contrast, colour){
   return '<div class="colour" style="height:'+(contrast*10).toFixed(2)+'px;background:'+colour+'"></div>';
}

var colourContrast = false;
var hue = 10;
function displayBars(hue, colourContrast){
    var contrastBars = '';
    var previousRGB = false;
    for(i=1; i<=360; i++){
        generated_c = new HSLColour(hue, 100, i/3.6)
        rgb = generated_c.getRGB();
        colour = generated_c.getCSSIntegerRGB();
        if(previousRGB){
            if(colourContrast){
                contrast = contrastDiffColour(rgb, previousRGB);
            } else {
                contrast = contrastDiff(rgb, previousRGB);
            }
            contrastBars+= generateBars(contrast, colour );
            contrast_array[i-2] = contrast;
        }
        previousRGB = generated_c.getRGB();
    }
    contrast_sum = getSum(contrast_array);
    contrast_max = getHighestValue(contrast_array);
    contrast_min = getLowestValue(contrast_array);
    $('#colors').append(contrastBars);
    $('#colors').append('<p style="clear:both">Moyenne : '+contrast_sum/360+'</p>');
    $('#colors').append('<p>Max : '+contrast_max+'</p>');
    $('#colors').append('<p>Min : '+contrast_min+'</p>');
}
function contrastPerHue(params) {
    contrastBars = '';
    for(i=1; i<=360; i++){
        generated_c = new HSLColour(i, params['sat'], params['light'])
        generated_c2 = new HSLColour(i, params['sat']+params['sat_diff'], params['light']+params['light_diff'])
        rgb = generated_c.getRGB();
        colour = generated_c.getCSSIntegerRGB();
        colour2 = generated_c2.getCSSIntegerRGB();
        rgb = generated_c.getRGB();
        rgb2 = generated_c2.getRGB();
        contrast = contrastDiffColour(rgb, rgb2);
        contrastBars+= generateBars(contrast, colour );
        contrast_array[i-2] = contrast;
    }
    $('#colors').append(contrastBars);
    displayStats(contrast_array);
}
function displayStats(contrast_array){
    $('#colors').append(generateStats(contrast_array));
}
function generateStats(contrast_array){
    contrast_sum = getSum(contrast_array);
    contrast_max = getHighestValue(contrast_array);
    contrast_min = getLowestValue(contrast_array);
    return '<p style="clear:both">Moyenne : '+(contrast_sum/360).toFixed(2)+'</p>'+
    '<p>Max : '+contrast_max.toFixed(2)+'</p>'+
    '<p>Min : '+contrast_min.toFixed(2)+'</p>';
}
