module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      build: {
          src: 'public/js/ndual.js',
          dest: 'public/build/ndual.min.js'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');


  grunt.registerTask('default', [ 'uglify']);

};
