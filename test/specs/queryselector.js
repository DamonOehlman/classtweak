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
    
    it('can add a class to a targeted element', function() {
        classtweak('#test', '+bounce');
        expect(elements[0].className).toEqual('bounce');
        expect(elements[1].className).toEqual('');
        expect(elements[2].className).toEqual('');
    });
    
    it('can add a class all sections', function() {
        classtweak('section', '+bounce');
        expect(elements[0].className).toEqual('bounce');
        expect(elements[1].className).toEqual('bounce');
        expect(elements[2].className).toEqual('bounce');
    });
    
    it('can add a class to sections with data-route attriute', function() {
        classtweak('section[data-route]', '+bounce');
        expect(elements[0].className).toEqual('');
        expect(elements[1].className).toEqual('bounce');
        expect(elements[2].className).toEqual('bounce');
    });
    
    it('can add a class to certain elements and then toggle on all', function() {
        classtweak('section[data-route]', '+bounce');
        classtweak('section', '!bounce');
        expect(elements[0].className).toEqual('bounce');
        expect(elements[1].className).toEqual('');
        expect(elements[2].className).toEqual('');
    });
    
    it('can handle string objects', function() {
        classtweak('section[data-route]', '+bounce');
        classtweak(new String('section'), '!bounce');
        expect(elements[0].className).toEqual('bounce');
        expect(elements[1].className).toEqual('');
        expect(elements[2].className).toEqual('');
    });
});