module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var jsLibs = [
    "js/scripts.js"
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        sourceComments: false,
        sourceMap: true,
        outputStyle: 'expanded'
      },
      style: {
        files: {
          'css/style.css': 'scss/style.scss'
        }
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        jsLibs
      ]
    },

    uglify: {
      dist: {
        options: {
          sourceMap: true,
          preserveComments: 'none'
        },
        files: {'js/scripts.min.js': [jsLibs]}
      }
    },

    watch: {
      js: {
        files: [
          jsLibs,
          'Gruntfile.js'
        ],
        tasks: ['uglify']
      },
      scss: {
        files: 'scss/**/*.scss',
        tasks: ['sass:style']
      }
    },

    autoprefixer: {
      options: {
        browsers: ['Last 2 versions', 'IE 10', 'IE 11'],
        cascade: false,
        remove: false,
        map: false
      },
      css: {
        src: 'css/style.css'
      }
    },

    bless: {
      css: {
        options: {},
        files: {
          'blessed/style.css': 'css/style.css'
        }
      }
    },

    cssmetrics: {
      dev: {
        src: [
          'css/style.css'
        ]
      }
    },

    removescsscomments: {
      your_target: {
        options: {
          singleline: true,
          multiline: true
        },
        src: ['scss/**/*.scss']
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src : 'css/style.css'
        },
        options: {
          watchTask: true,
          proxy: "http://figurit.dev",
          injectChanges: true
        }
      }
    },

    stylelint: {
      stylelint: {
        options: {
          configFile: 'scss/.stylelint.json',
          formatter: 'string',
          ignoreDisables: false,
          failOnError: true,
          outputFile: '',
          reportNeedlessDisables: false,
          syntax: ''
        },
        src: [
          'scss/**/*.scss'
        ]
      }
    },

    sasslint: {
      options: {
        configFile: 'scss/.sass-lint.yml'
      },
      target: ['scss/view/_view-certifications.scss']
    },

    eslint: {
      options: {
        configFile: '.eslintrc.json'
        // rulePaths: ['conf/rules']
      },
      target: ['js/scripts.js']
    }

  });

  grunt.registerTask('build', ['sass', 'autoprefixer', 'jshint', 'uglify', 'sasslint']);
  grunt.registerTask('default', ['build']);
  grunt.registerTask('sync', ['browserSync','watch']);
};
