module.exports = function(grunt) {
  grunt.initConfig({
    coffee: {
      compile: {
        files: {
          'build/mvc/sf.mvc.js': [
            'src/namespace.coffee',
            'src/extends.coffee',
            'src/base.coffee',
            'src/model.coffee',
            'src/collection.coffee',
            'src/append.coffee',
          ],
        },
        options: {
          bare: true
        },
      },
      compile_tests: {
        expand: true,
        flatten: true,
        cwd: 'tests',
        src: ['*.coffee'],
        dest: 'spec/',
        rename  : function (dest, src) {
          return dest + '/' + src.substring(0, src.lastIndexOf('.')) + '.js';
        },
        options: {
          bare: true
        },
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');

  grunt.registerTask('default', ['coffee:compile', 'coffee:compile_tests']);
};