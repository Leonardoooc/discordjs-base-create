function init() {
  let originalConsoleLog = console.log;
  console.log = function() {
    args = [];
    args.push('[Holo]'.red);

    for( var i = 0; i < arguments.length; i++ ) {
      args.push( arguments[i] );
    }
    originalConsoleLog.apply( console, args );
  };

  print = function() {
    args = [];
    args.push('[Holo]'.red);

    for( var i = 0; i < arguments.length; i++ ) {
      args.push( arguments[i] );
    }
    originalConsoleLog.apply( console, args );
  }
}

module.exports = { init };
