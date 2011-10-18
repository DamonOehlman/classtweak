describe('query selector tweaks', function() {
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
    
    it('classtweak with actions can be chained', function() {
        classtweak
            ('#test', '+bounce')
            ('#test2', '+bounce');
            
        expect(elements[0].className).toEqual('bounce');
        expect(elements[1].className).toEqual('bounce');
        expect(elements[2].className).toEqual('');
    });
    
    it('a tweaker can be chained', function() {
        classtweak('#test')('+bounce')('+slide');
        expect(elements[0].className).toContain('bounce');
        expect(elements[0].className).toContain('slide');
        expect(elements[1].className).toEqual('');
        expect(elements[2].className).toEqual('');
    });
});