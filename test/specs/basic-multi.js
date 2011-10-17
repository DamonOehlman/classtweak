describe('multiple element tweaks', function() {
    // get the first section by id
    var ids = ['test', 'test2', 'test3'],
        elements = [], ii;

    // initialise the elements
    for (ii = 0; ii < ids.length; ii++) {
        elements[ii] = document.getElementById(ids[ii]);
    } // for
    
    beforeEach(function() {
        for (ii = 0; ii < elements.length; ii++) {
            elements[ii].className = '';
        } // for
    });
    
    it('can add a class to multiple elements', function() {
        classup(elements, '+bounce');
        expect(elements[0].className).toEqual('bounce');
        expect(elements[1].className).toEqual('bounce');
        expect(elements[2].className).toEqual('bounce');
    });

    it('can remove a class to multiple elements', function() {
        classup(elements, '+bounce');
        classup(elements, '-bounce');
        expect(elements[0].className).toEqual('');
        expect(elements[1].className).toEqual('');
        expect(elements[2].className).toEqual('');
    });
});