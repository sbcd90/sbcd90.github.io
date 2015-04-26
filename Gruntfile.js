module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                livereload: true
            },
            jade: {
                tasks: ["jade:debug"],
                files: ["**/*.jade", "**/*.md", "!layouts/*.jade"]
            }
        },
        jade: {
            options: {
                pretty: true,
                files: {
                    "*": ["**/*.jade", "!layouts/*.jade"]
                }
            },
            debug: {
                options: {
                    locals: {
                        livereload: true
                    }
                }
            },
            publish: {
                options: {
                    locals: {
                        livereload: false
                    }
                }
            }
        },
        host: {
            options: {
                port: 8001
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jade-tasks');
    
    grunt.registerTask('default', ['jade:debug', 'host']);
    grunt.registerTask('publish', ['jade:publish']);
    
    grunt.registerTask('host', 'Start host server', function() {
        var options = this.options();
        
        var express = require('express');
        var app = express();
        
        console.log('Hello World');
        
        app.use(express.static(__dirname ));
        app.engine('html',require('ejs').renderFile);
        app.use(function(req, res, next) {
            res.render('index.html');
        });
        app.listen(options.port);
        
        console.log('Hello World');
        console.log('http://localhost:%s', options.port);
        
        grunt.task.run(["watch:jade"]);
    });
};