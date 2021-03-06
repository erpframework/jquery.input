module.exports = function (grunt) {
    var bannerTemplate = '' +
        '// <%= pkg.name %> version <%= pkg.version %>\n' +
        '// <%= pkg.repository.url %>\n' +
        '// (<%= pkg.license %>) <%= grunt.template.today("dd-mm-yyyy") %>\n' +
        '// <%= pkg.author %>\n';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        preprocess : {
            options: {
                context : {
                    DEBUG: true
                }
            },
            test : {
                src : 'test/index.pre.html',
                dest : 'test/index.html'
            },
            index: {
                src: 'index.pre.html',
                dest: 'index.html'
            }
        },

        concat: {
            options: {
                separator: '\n',
                banner: bannerTemplate
            },
            dist: {
                src: [
                    'src/intro.js',
                    'src/library.js',
                    'src/input/base.js',
                    'src/input/button.js',
                    'src/input/checkbox.js',
                    'src/input/email.js',
                    'src/input/file.js',
                    'src/input/hidden.js',
                    'src/input/multipleFile.js',
                    'src/input/multipleSelect.js',
                    'src/input/password.js',
                    'src/input/radio.js',
                    'src/input/range.js',
                    'src/input/select.js',
                    'src/input/text.js',
                    'src/input/textarea.js',
                    'src/input/url.js',
                    'src/buildFormInputs.js',
                    'src/factory.js',
                    'src/main.js',
                    'src/outro.js'
                ],
                dest: '<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: { banner: bannerTemplate },
            dist: {
                files: { '<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'] }
            }
        },

        qunit: {
            all: ['test/index.html']
        },

        watch: {
            scripts: {
                files: ['**/*'],
                tasks: ['preprocess', 'concat', 'uglify', 'qunit'],
                options: { spawn: true }
            }
        }

    });

    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('default', ['preprocess', 'concat', 'uglify', 'qunit']);
};
