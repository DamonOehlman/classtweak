describe('direct object tests (reselecting)', function() {
    // get the first section by id
    var testEl = document.getElementById('test');
    
    // reset the clasname
    testEl.className = '';
    
    // check we can add a class to the element
    it('can add a class', function() {
        classtweak(testEl, '+bounce');
        expect(testEl.className).toEqual('bounce');
    });
    
    it('can remove a class', function() {
        classtweak(testEl, '-bounce');
        expect(testEl.className).toEqual('');
    });
    
    it('can toggle a class', function() {
        classtweak(testEl, '!bounce');
        expect(testEl.className).toEqual('bounce');

        classtweak(testEl, '!bounce');
        expect(testEl.className).toEqual('');
    });

    // check that we can add multiple classes
    it('can add multiple classes', function() {
        classtweak(testEl, '+bounce +slide +fade');
        expect(testEl.className).toContain('bounce');
        expect(testEl.className).toContain('slide');
        expect(testEl.className).toContain('fade');
    });
    
    it('can remove multiple classes', function() {
        classtweak(testEl, '-bounce -fade');
        expect(testEl.className).toEqual('slide');
    });
    
    it('can toggle multiple classes', function() {
        classtweak(testEl, '!bounce !slide');
        expect(testEl.className).toEqual('bounce');
    });
});