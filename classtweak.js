function classtweak(elements, initAction) {

    // internals
    var reSpaces = /[\s\,]+/,
        instructionHandlers = {
            '+': function(current, target, foundIdx) {
                // if the style was not found, then add it
                if (foundIdx < 0) {
                    current[current.length] = target;
                } // if
            },
            
            '-': function(current, target, foundIdx) {
                if (foundIdx >= 0) {
                    current.splice(foundIdx, 1);
                } // if
            },
            
            '!': function(current, target, foundIdx) {
                instructionHandlers[foundIdx < 0 ? '+' : '-'](current, target, foundIdx);
            }
        };
    
    function tweak(actions) {
        // itereate through the elements
        for (var elIdx = elements.length; elIdx--; ) {
            var element = elements[elIdx],
                activeClasses = element.className ? element.className.split(/\s+/).sort() : [],
                ii;

            // if the action is a string, then parse into an array
            if (typeof actions == 'string') {
                actions = actions.split(reSpaces);
            } // if

            // iterate through the actions and apply the tweaks
            for (ii = actions.length; ii--; ) {
                // get the action instruction
                var instruction = actions[ii].slice(0, 1),
                    className = actions[ii].slice(1),
                    handler = instructionHandlers[instruction],
                    classIdx, found = -1;

                // if the instruction handler is not found, then default to +
                // also, use the full action text
                if (! handler) {
                    handler = instructionHandlers['+'];
                    className = actions[ii];
                } // if
                
                // iterate through the active classes and update the found state
                for (classIdx = activeClasses.length; (found < 0) && classIdx--; ) {
                    // if we have a match on the class, then update the found index
                    if (activeClasses[classIdx] === className) {
                        found = classIdx;
                    } // if
                } // for

                // apply the handler, activeClasses modified in place
                handler(activeClasses, className, found);
            } // for

            // update the element classname
            element.className = activeClasses.join(' ');
        } // for
    } // tweak
    
    // check the elements
    if (typeof elements == 'string') {
        elements = document.querySelectorAll(elements);
    }
    else if (! Array.isArray(elements)) {
        elements = [elements];
    } // if..else

    // apply the requested action
    if (initAction) {
        tweak(initAction);
    } // if
    
    // return the tweak
    return tweak;
} // classtweak