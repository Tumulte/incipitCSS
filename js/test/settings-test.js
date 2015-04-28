describe("Application", function() {
  it("creates a global variable for the name space", function () {
    expect(incipitCSS).toBeDefined();
  })
})
describe("Contrast generator application", function() {
    it("returns the luminosity contrast of two colour objects", function(){
        generated_c = new RGBColour(200, 100, 100);
        generated_c2 = new RGBColour(200, 100, 99);
        rgb = generated_c.getRGB();
        rgb2 = generated_c2.getRGB();
        expect(contrastDiff(rgb, rgb2)).toEqual(0.299);
    });
    it("returns the color contrast of two colour objects", function(){
        generated_c = new RGBColour(200, 100, 100);
        generated_c2 = new RGBColour(200, 100, 99);
        rgb = generated_c.getRGB();
        rgb2 = generated_c2.getRGB();
        expect(contrastDiffColour(rgb, rgb2)).toEqual(1);
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
});
