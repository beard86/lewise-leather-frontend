module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //Copy html
    // Copy 
    copy: {
      html: {
        expand: true,
        src: '**/*.html',
        dest: 'build', 
        cwd: 'source'
      },
    
     config: {
        expand: true,
        src: '*.config',
        dest: 'build', 
        cwd: 'source'
      },
  
      assets: {
        expand: true,
        src: '**/*',
        dest: 'build/assets',
        cwd: 'source/files'
      },

      vendorcss: {
        expand:true,
        src: '*/**',
        dest: 'build/assets',
        cwd: 'source/css'
      },

      videoassets: {
        expand: true,
        src: '**/*',
        dest: 'build/assets/video',
        cwd: 'source/video'
      },

      fontassets: {
        expand: true,
        src: '**/*',
        dest: 'build/assets/fonts',
        cwd: 'source/fonts'
      },

      dataassets: {
        expand: true,
        src: '**/*',
        dest: 'build/assets/data',
        cwd: 'source/data'
      },

      imgassets: {
        expand: true,
        src: '**/*',
        dest: 'build/assets/img',
        cwd: 'source/img'
      },

      dist: {
        expand: true,
        src: '**/*',
        dest: '../website/assets', 
        cwd: 'build/assets'
      }
    },

    //Check JavaScript quality
    jshint: {
      all: ['source/js/components/**/*', 'source/js/helpers/**/*.js', 'source/js/scripts.js'],
      options: {
        jshintrc: '.jshintrc',
        reporterOutput: ''
      }
    },

    //Code Kit / PrePros script append/prepend processing
    codekit: {
      kitFiles: {
        files: [{
          expand: true,
          cwd: 'source',
          src: ['*.kit'],
          dest: 'build',
          ext: '.html'
        }]
      },
      
      jsinclude : {
        files : {
          'build/assets/js/scripts.js' : 'source/js/scripts.js'
        }
      }
    },

    //Minify the JavaScript into the build folder
    uglify: {
      scripts: {
        files: {
          'build/assets/js/min/scripts.min.js' : ['build/assets/js/scripts.js']
        }
      }
    },

    //Lint the SCSS as per coding standards
    scsslint: {
      options: {
        config: '.scss-lint.yml',
        reporterOutput: 'scss-lint-report.xml',
        colorizeOutput: true
      },

      allFiles: [ 'source/scss/**/*.scss', '!source/scss/vendor**/*.scss' ]
    },

    sass: {
      build: {
        options: {
          outputStyle: 'expanded',
          require: 'susy',
          sourceMap: true
        },
        files: {
          'build/assets/css/styles.css': 'source/scss/styles.scss'
        }
      },

      dist: {
        options: {
          outputStyle: 'compressed',
          require: 'susy',
          sourceMap: true
        },
        files: {
          'build/assets/css/styles.css': 'source/scss/styles.scss'
        }
      }
    },

    // Autoprefixer
    autoprefixer: {
      options: {
        // browsers: ['last 2 versions', 'last 4 iOS versions', 'last 4 Android versions', 'ie 9', 'ie 10'], // uncomment if you need support for older browsers
        map: true
        
      },
      
      dist: {
        files: {
          'build/assets/css/styles.css':'build/assets/css/styles.css'
        }
      }
    },

    browserSync: {
      default_options: {
        bsFiles: {
          src: [
            "build/assets/css/*.css",
            "build/*.html"
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "build/"
          }
        }
      }
    },

    accessibility: {
      options: {
        accessibilityLevel: 'WCAG2A',
        reportLevels: {
          notice: false,
          warning: false,
          error: true
        }
      },
      test: {
        src: ['build/*.html']
      }
    },

    validation: {
      files: {
        src: ['build/*.html']
      }
    },

    //Connect server for running the pattern library
    connect: {
      server: {
        options: {
          hostname: '0.0.0.0',
          port: 8888,
          base: 'build',
          livereload: true
        }
      }
    },

    //Watch task with livereload
    watch: {
      html: {
        files: ['source/**/*.html', 'source/**/*.kit'],
        tasks: ['codekit:kitFiles','copy:html']
      },
      
      scripts: {
        files: ['source/js/**/*.js'],
        tasks: ['jshint','codekit:jsinclude']
      },

      styles: {
        files: 'source/scss/**/*.scss',
        tasks: ['sass','scsslint', 'autoprefixer']
      },

      video: {
        files: ['source/video/**/*'],
        tasks: ['copy:videoassets']
      },

      data: {
        files: ['source/data/*.json'],
        tasks: ['copy:dataassets']
      },

      images: {
        files: ['source/img/'],
        tasks: ['copy:imgassets']
      },

      webConfig: {
        files: ['source/web.config'],
        tasks: ['copy:webConfig']
      },

      livereload: {
        files: ['build/**/*'],
        options: {
          livereload: true
        }
      }
    }
    

  });

  // Load JavaScript quality check task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Load uglify task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //Load SASS task
  grunt.loadNpmTasks('grunt-sass');

  //Load copy task
  grunt.loadNpmTasks('grunt-contrib-copy');

  //JavaScript append/prepend task
  grunt.loadNpmTasks('grunt-codekit');

  //Serve up the pattern library
  grunt.loadNpmTasks('grunt-contrib-connect');
  
  //SCSS lint
  grunt.loadNpmTasks('grunt-scss-lint');

  // Autoprefixer
  grunt.loadNpmTasks('grunt-autoprefixer');

  // Accessibility
  grunt.loadNpmTasks('grunt-accessibility');

  // HTML validation
  grunt.loadNpmTasks('grunt-w3c-html-validation');

  //Watch task
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-watch-nospawn');

  //Auto reload
  grunt.loadNpmTasks('grunt-browser-sync');

  //Load local grunt tasks
  // -- common-tasks.js - Common tasks across, pattern library, kitchen sink and build projects
  //grunt.loadTasks('./grunt-tasks');

  // Default task(s).
  grunt.registerTask('default', [
    'copy:html',
    // 'copy:assets',
    'copy:config',
    'copy:fontassets',
    'copy:dataassets',
    'copy:videoassets',
    'copy:imgassets',
    'jshint',
    'codekit',
    // 'uglify',
    // 'validation',
    // 'accessibility',
    'scsslint',
    'autoprefixer',
    'sass:build',    
    'browserSync',
    'connect:server',
    'watch'
  ]);

  grunt.registerTask('dist', [
    // 'copy:assets',
    'copy:config',
    'copy:fontassets',
    'copy:dataassets',
    'copy:imgassets',
    'copy:videoassets',
    'jshint',
    'codekit',
    'uglify',
    'scsslint',
    'autoprefixer',
    'sass:dist',    
    'copy:dist'
  ]);
};