// Karma configuration
// Generated on Wed Mar 09 2016 00:01:40 GMT+0800 (中国标准时间)

module.exports = function(config) {
  var configuration={

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './src/*.js',
      './test/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        './src/*.js':['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],
    coverageReporter:{
        dir:'./coverage',
        reporters:[
            {type:'html',subdir:'html'},
            {type:'text-summary',subdir:'.',file:'coverage-summary.txt'}
        ]
    },
    plugins:[
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-coverage')
    ],
    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    customLaunchers:{
        // Chrome_travis_ci:{
        //     base:'Chrome',
        //     flags:['--no-sandbox']
        // }
        Firefox_travis_ci:{
            base:'Firefox',
            flags:['--no-sandbox']
        }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  };

  if(process.env.TRAVIS){
    configuration.plugins=[
        require('karma-jasmine'),
        require('karma-firefox-launcher'),
        require('karma-coverage')
    ];
    configuration.browsers=['Firefox_travis_ci'];
  }

  config.set(configuration);
};
