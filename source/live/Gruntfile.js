module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= pkg.srcDir %>/assets/js/*.js',
        dest: '<%= pkg.dstDir %>/assets/js/<%= pkg.name %>-<%= pkg.version %>.min.js'
      }
    },
    jshint:{
      options: {
        reporter: require('jshint-stylish')
      },
      build: ['<%= pkg.srcDir %>/assets/js/*.js']
    },
    copy:{
      build:{
        files:[
          {
            cwd: '<%= pkg.srcDir %>',
            expand: true, 
            src: ['*.html'], 
            dest: '<%= pkg.dstDir %>/', 
            filter: 'isFile'
          }
        ]
      }
    },
    clean:{
      options: {
        force: true
      },
      build: ['<%= pkg.dstDir %>/*.html', '<%= pkg.dstDir %>/assets/**']
    },
    replace:{
      build:{
        src: ['<%= pkg.dstDir %>/*.html'],
        overwrite: true,
        replacements: [
          {
            from: '@APP_VERSION@',
            to: '<%= pkg.version %>'
          },
          {
            from: '@APP_NAME@',
            to: '<%= pkg.name %>'
          }
        ]
      }
    },
    watch:{
      build:{
        files: ['<%= pkg.srcDir %>/*.*','<%= pkg.srcDir %>/**/**/*.*'],
        tasks: ['default']
      }
    },
    less: {
      build: {
        options: {
          compress: true //minifying the result
        },
        files: {
          '<%= pkg.dstDir %>/assets/css/<%= pkg.name %>-<%= pkg.version %>.css' : '<%= pkg.srcDir %>/assets/css/app.less'
        }
      }
    },
    concat: {
      options: {
          separator: '\n\r/*########### SPACER BETWEEN FILES ###########*/\n\r',
      },
      js_app:{
        src: [
          '<%= pkg.srcDir %>/assets/js/app.js',
          '<%= pkg.srcDir %>/**/controller.*.js'
        ],
        dest: '<%= pkg.dstDir %>/assets/js/<%= pkg.name %>-<%= pkg.version %>.min.js'
      },
      js_vendor: {
        src: [
          'bower_components/angular/angular.min.js',
          'bower_components/angular-route/angular-route.min.js',
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js'
        ],
        dest: '<%= pkg.dstDir %>/assets/js/vendor-<%= pkg.version %>.min.js'
      },
      css_vendor: {
        src: [
          'bower_components/bootstrap/dist/css/bootstrap.min.css',
          'bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        dest: '<%= pkg.dstDir %>/assets/css/vendor-<%= pkg.version %>.css'
      }
    },
    html2js: {
      options: {
          module: "templates",
          htmlmin: {
              collapseBooleanAttributes: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true,
              removeComments: true,
              removeEmptyAttributes: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true
          }
      },
      build: {
        src: [
          "<%= pkg.srcDir %>/**/*.html"
        ],
        dest: '<%= pkg.dstDir %>/assets/js/templates-<%= pkg.version %>.min.js'
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-html2js');

  // Default task(s).
  grunt.registerTask('default', [
    'clean:build',
    'jshint:build',
    'concat:js_vendor',
    'concat:js_app',
    'concat:css_vendor',
    'copy:build',
    'replace:build',
    'less:build',
    'html2js:build'
  ]);

};