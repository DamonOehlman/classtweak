function classtweak(elements, initAction, scope) {

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
                var action = actions[ii],
                    instruction = action.slice(0, 1),
                    lastChar = action.slice(-1),
                    className = action.slice(1),
                    handler = instructionHandlers[instruction],
                    dotSyntax = instruction == '.' || lastChar == '.',
                    classIdx, found = -1;
                    
                // if the instruction handler is not found, then default to +
                // also, use the full action text
                if (! handler) {
                    // if we have the dot syntax then do more parsing
                    if (dotSyntax) {
                        // update the handler
                        handler = instructionHandlers[
                            instruction == '.' && lastChar == '.' ? '!' : 
                                instruction == '.' ? '+' : '-'
                        ];
                        
                        // update the classname
                        className = action.slice(
                            instruction == '.' ? 1 : 0, 
                            lastChar == '.' ? -1 : undefined
                        );
                    }
                    // otherwise, just fall back to the add handler
                    else {
                        // if the last character is a dot, push to the dot handler, otherwise +
                        handler = instructionHandlers['+'];
                        className = actions[ii];
                    } // if..else
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
        
        return tweak;
    } // tweak
    
    // check the elements
    if (typeof elements == 'string' || elements instanceof String) {
        elements = (scope || document).querySelectorAll(elements);
    }
    else if (! Array.isArray(elements)) {
        elements = [elements];
    } // if..else

    // apply the requested action
    if (initAction) {
        tweak(initAction);
    } // if
    
    // return the tweak
    return initAction ? classtweak : tweak;
} // classtweak