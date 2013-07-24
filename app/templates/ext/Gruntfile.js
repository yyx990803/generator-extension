module.exports = function( grunt ) {

    grunt.initConfig({

        sass: {
            build: {
                options: {
                    style: 'compressed'
                },
                files: { 
                    'build/css/inject.css': 'src/sass/main.sass'
                }
            },
            dev: {
                files: {
                    'build/css/inject.css': 'src/sass/main.sass'
                }
            } 
        },

        component_build: {
            build: {
                output: './build/js/',
                name: 'inject',
                styles: false,
                scripts: true,
                verbose: true,
                standalone: true
            }
        },

        watch: {
            component: {
                files: ['src/js/**/*.js', 'component.json'],
                tasks: 'component_build'
            },
            sass: {
                files: ['src/sass/**/*.sass'],
                tasks: 'sass:dev',
                options: {
                    nospawn: true
                }
            }
        }

    })

    grunt.loadNpmTasks( 'grunt-contrib-watch' )
    grunt.loadNpmTasks( 'grunt-contrib-sass' )
    grunt.loadNpmTasks( 'grunt-component-build' )

    grunt.registerTask( 'build', ['sass:build', 'component_build'] )
    grunt.registerTask( 'default', ['build', 'pub'])

    grunt.registerTask( 'pub', 'compress for publishing', function () {
        var version = require('./manifest.json').version,
            fs = require('fs')
        if (!fs.existsSync('dist')) fs.mkdirSync('dist')
        grunt.util.spawn({
            cmd: 'zip',
            args: ['-r', 'dist/' + version + '.zip', 'manifest.json', 'build', 'images'],
            opts: {
                stdio: 'inherit'
            }
        }, function () {})
    })
    
}