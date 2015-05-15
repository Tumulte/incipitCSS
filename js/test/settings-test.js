describe("Application", function() {
  it("creates a global variable for the name space", function () {
    expect(incipitCSS).toBeDefined();
  })
})
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
        expect(div).toEqual('<div class="colour" style="height:100px;background:rgb(200,100,99)"></div>');
        expect(div_light).toEqual('<div class="colour" style="height:11.4px;background:rgb(200,100,99)"></div>');

    });
    it('returns an html with the highest, lowest and sum values of an array', function(){
        array = [0.5,1,52,52.02,10,14,0.8];
        expect(generateStats(array)).toEqual('<p style="clear:both">Moyenne : 0.36</p><p>Max : 52.02</p><p>Min : 0.50</p>');
    });

});
