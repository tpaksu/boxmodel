module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                sourceMap: true
            },
            build: {
                src: ['js/boxmodel.js'],
                dest: 'build/js/boxmodel.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'build/css/boxmodel.min.css': 'css/boxmodel.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: ['js/boxmodel.js'],
                tasks: ['uglify','obfuscator']
            },
            styles: {
                files: ['css/boxmodel.scss'],
                tasks: 'sass'
            },
            docs: {
            	files: ['documentation.md'],
            	tasks: 'markdown'
            }
        },
        markdown: {
            all: {
                files: [{
                    expand: true,
                    src: 'documentation.md',
                    dest: 'docs/',
                    ext: '.html'
                }],
                options: {  
		    template: 'docs/includes/template.html',        
		    autoTemplate: true,
		    autoTemplateFormat: 'html'
                }
            }
        },
        jsObfuscate: {
            default: {
                files: { 'build/js/boxmodel.obf.js' : 'build/js/boxmodel.min.js' }            
            }            
        }
    });
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('js-obfuscator');
    grunt.registerTask('min', ['uglify', 'jsObfuscate', 'sass', 'markdown']);
    grunt.registerTask('default', ['uglify', 'jsObfuscate', 'sass', 'markdown']);
};
