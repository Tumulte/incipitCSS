describe("Application", function() {
  it("creates a global variable for the name space", function () {
    expect(incipitCSS).toBeDefined();
  });
});
describe("Contrast generator application", function() {
    it("returns the luminosity contrast of two colour objects", function(){
        generated_c = new RGBColour(200, 99, 100);
        generated_c2 = new RGBColour(201, 100, 99);
        rgb = generated_c.getRGB();
        rgb2 = generated_c2.getRGB();
        expect(contrastDiff(rgb, rgb2)).toEqual(0.772);
    });
    it("returns the color contrast of two colour objects", function(){
        generated_c = new RGBColour(200, 100, 100);
        generated_c2 = new RGBColour(201, 101, 99);
        rgb = generated_c.getRGB();
        rgb2 = generated_c2.getRGB();
        expect(contrastDiffColour(rgb, rgb2)).toEqual(3);
    });
    it('returns the lowest value of an array', function(){
        var numbers = [101, 10, 5.552, 5.551, 11];
        expect(getLowestValue(numbers)).toEqual(5.551);
    });
    it('returns the highest value of an array', function(){
        var numbers = [99, 101.00002, 101, 10, 5.552, 5.551, 11];
        expect(getHighestValue(numbers)).toEqual(101.00002);
    });
    it('returns the sum of an array', function(){
        var numbers = [101.00002, 101, 10, 5.552, 5.551, 11];
        expect(getSum(numbers)).toEqual(234.10302);
    });
    it('returns a div with a height corresponding to the contrast and the color as BG', function(){
        generated_c = new RGBColour(200, 100, 100);
        generated_c2 = new RGBColour(200, 100, 99);
        rgb = generated_c.getRGB();
        rgb2 = generated_c2.getRGB();
        contrast = contrastDiffColour(rgb, rgb2);
        contrast_light = contrastDiff(rgb, rgb2);
        div = generateBars(contrast, generated_c2.getCSSIntegerRGB());
        div_light = generateBars(contrast_light, generated_c2.getCSSIntegerRGB());
        expect(div).toEqual('<div class="colour" style="height:10.00px;background:rgb(200,100,99)"></div>');
        expect(div_light).toEqual('<div class="colour" style="height:1.14px;background:rgb(200,100,99)"></div>');

    });
    it('returns an html with the highest, lowest and sum values of an array', function(){
        array = [0.5,1,52,52.02,10,14,0.8];
        expect(generateStats(array)).toEqual('<p style="clear:both">Moyenne : 0.36</p><p>Max : 52.02</p><p>Min : 0.50</p>');
    });

});
describe('Live settings side pannel methods', function () {
    it('should return the less variable with prfix and suffix taken from the data- attr', function () {
        var input = $("<input data-prefix='incipit' value='CSS' data-suffix=' rules'> ");
        expect(inputPrefixSuffixConcatenater(input)).toEqual("incipitCSS rules");
    });
    it('should transform undefined into empty string', function () {
        var input = $("<input> ");
        expect(undefinedToEmptyStr(input.val())).toEqual("");
    });
    it('should return an array of variables', function () {
        var input = $("<input id='foo' data-prefix='incipit' value='CSS' data-suffix=' rules'> ");
        var input2 = $("<input id='fooBar' data-prefix='to' value=' make' data-suffix=' beautiful stuffs'> ");
        var settings = changeLessSetings();
        settings(input);
        var settingsArray = settings(input2);
        expect(settings()).toEqual({"foo": "incipitCSS rules", "fooBar": "to make beautiful stuffs"});

    });
    it('should change RGB background into HSL array', function(){
        this.element = $('<div id="test-color" style="background-color:#00ff00"></div>');
        this.element.appendTo('body');
        var HSLArray = backgroundRGBToHSLArray($('#test-color'));
        expect(HSLArray).toEqual({ h : 120, s : 100, l : 50 });

    })
});
describe('custom colors methods', function () {
    beforeEach(function() {
        this.element = $('<div class="color-sample" style="background-color:#11aa11"></div>');
        this.element.append('<div class="color-title">foo</div>');
        this.element.appendTo('body');
        toggleCustomColors();
    }
    );
    afterEach(function() {
            this.element.remove();
        }
    );
    it('should toggle color range inputs to .color-sample elements', function() {
        var HSLArray = backgroundRGBToHSLArray($('.color-sample'));
        expect($(".color-change").length).toEqual(3);
        expect($(".color-change").first().val()).toEqual(HSLArray.h.toFixed());
        expect($("#foo").length).toEqual(1);
        expect($("#foo").attr('name')).toEqual('@foo');
        toggleCustomColors();
        expect($(".color-change").length).toEqual(0);
    });
    it('should convert range values to LESS color operation string', function() {
        this.element.append('<div class="dominant" style="background-color:#ffaaff" ></div>');
        lessOperation = HSLRangeToLessColorOperationString($('.color-change'))
        expect(lessOperation).toEqual('darken(desaturate(spin(rgb(255, 170, 255),-180),18%),46%)');
        $('.dominant').css('background', '#11aa11');
        lessOperation = HSLRangeToLessColorOperationString($('.color-change'))
        expect(lessOperation).toEqual('darken(desaturate(spin(rgb(17, 170, 17),0),0%),0%)');
        $('.dominant').css('background', '#223322');
        lessOperation = HSLRangeToLessColorOperationString($('.color-change'))
        expect(lessOperation).toEqual('lighten(saturate(spin(rgb(34, 51, 34),0),62%),20%)');
    });
});