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
          'build/mvc/sf.mvc.pool.js': [
            'src/namespace.coffee',
            'src/extends.coffee',
            'src/base.coffee',
            'src/model.coffee',
            'src/collection.coffee',
            'src/append.coffee',
            'src/pool.coffee',
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
    watch: {
      files: ['**/**.coffee', ],
      tasks: ['coffee:compile', 'coffee:compile_tests']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // grunt.registerTask('default', ['coffee:compile', 'coffee:compile_tests']);
  grunt.registerTask('default', ['watch']);
};