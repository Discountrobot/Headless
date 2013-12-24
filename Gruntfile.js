module.exports = function(grunt) {

  grunt.initConfig({
    
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        undef: false,
        sub: true,
        globals: {
          jQuery: true
        },
      },

      files: {
        src: ['headless/*.js', 'chrome extension/*.js', 'chrome extension/*/*.js']
      },
    },

    jsonlint: {
      sample: {
        src: [ 'headless/json/*.json' ]
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsonlint');
  
  grunt.registerTask('default', [
    'jsonlint',
    'jshint'
  ]);
};