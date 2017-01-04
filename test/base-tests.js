// This will be an automatically-generated variable based on the component
// name provided to the pxtestkit yeoman generator
var px_dropdown_1;

// This is the bootstrapping function that will run the base and custom tests
// upon the completion of web components construction by Polymer
document.addEventListener("WebComponentsReady", function() {
  runBaseTests();
});

function testCase(options) {
  var testDescription, rootElement, eventString, eventChain, modifyFunction, assertFunction;
  var isAsync = false;
  var eventStr, eventSrc, modFn, assertFn;
  function _failTest(message) {
    test(message, function() {
      assert.isTrue(false);
    });
  }
  if (typeof options === 'object') {
    testDescription = options['description'] || 'No test description provided';
    rootElement = options['root'] || document;
    eventString = options['event'] || '';
    modifyFunction = options['modifyFunction'];
    assertFunction = options['assertFunction'] || function() { return true; };
    eventChain = options['eventChain'] ||
      [{ 'eventSource': eventSource, 'eventString': eventString, 'modifyFunction': modifyFunction }];
  }
  // fail the test if options was not provided
  else {
    _failTest(testDescription + ' Invalid test spec');
    return;
  }

  // if test is asynchronous (i.e., eventString is non-blank or non-empty eventChain was provided)
  if (eventString !== '' || (eventChain instanceof Array && eventChain.length > 0)) {
    isAsync = true;
  }
  // at this point eventSource is guaranteed to be an HTML element
  if (isAsync) {
    if (eventChain === []) {
      eventChain = [{'eventSource': eventSource, 'eventString': eventString, 'modifyFunction': modifyFunction}];
    }
    test(testDescription, function(done) {
      thisDone = done;
      if (!(rootElement instanceof HTMLElement) && !(rootElement instanceof HTMLDocument)) {
        assert.isTrue(false);
        done();
        return;
      }

      // Add the interactions specified in the eventChain argument:
      // The interactions are added in reverse order of event dispatching
      // because of the general fact that event listeners are added before
      // corresponding events are dispatched.

      // Utility function that uses closure to generate callbacks for each event
      // Without closure the test infinite-loops on the 2nd event;
      function createCallback(eventSource, eventString, modifyFunction, rootElement) {
        return function() {
          if (modifyFunction instanceof Function) {
            modifyFunction(rootElement);
          }
          eventSource.dispatchEvent(new Event(eventString));
        };
      }
      var assertTest = function() {
        flush(function() {
          assertFunction(rootElement);
          thisDone();
        });
      };
      // TODO: add validation on the eventChain structure and content types
      for (var ecLength = eventChain.length, ecIndex = ecLength-1; ecIndex >= 0; ecIndex--) {
        eventStr = eventChain[ecIndex].eventString;
        eventSrc = rootElement;
        if (ecIndex === (ecLength-1)) {
          eventSrc.addEventListener(eventStr, assertTest);
        }
        else {
          modFn = eventChain[ecIndex].modifyFunction;
          var prevEventSrc = document.querySelector(eventChain[ecIndex+1].eventSource);
          var prevEventStr = eventChain[ecIndex+1].eventString;
          eventSrc.addEventListener(eventStr,
            createCallback(
              document.querySelector(eventChain[ecIndex+1].eventSource),
              eventChain[ecIndex+1].eventString,
              modFn,
              rootElement
            )
          );
        }
      }
      eventSrc.dispatchEvent(new Event(eventStr));
    });
  }
  else {
    test(testDescription, function() {
      _deriveRoot();
      if (!(rootElement instanceof HTMLElement) && !(rootElement instanceof HTMLDocument)) {
        assert.isTrue(false);
        return;
      }
      assert.isTrue(assertFunction(rootElement));
    });
  }
}

// Wrapper for base automation tests.  This function is automatically
// generated by the pxtestkit yeoman generator
function runBaseTests() {
    suite('Base Automation Tests for predix-ui', function() {

    test('tests work', function() {
      assert.isTrue(true !== null);
    });
  });
}