var util = require('util'),
    path = require('path'),
    exec = require('child_process').exec,
    yeoman = require('yeoman-generator')

var DudeGenerator = module.exports = function DudeGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments)

    this.appName = args[0]

    this.on('end', function () {
        var yo = this
        exec('component install', function (err, stdout, stderr) {
            if (stdout) console.log(stdout)
            if (stderr) console.log(stderr)
            if (err) {
                console.log('exec error: ' + err)
            } else {
                yo.installDependencies({
                    bower: false
                })
            }
        })
    })

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')))
}

util.inherits(DudeGenerator, yeoman.generators.Base)

DudeGenerator.prototype.askFor = function askFor() {

    console.log("\n=== Whatuuuuup, dude! ===\n")

    if (!this.appName) {
        var cb = this.async()
        this.prompt({
            name: 'appName',
            message: 'What\'s the name of this extension?'
        }, function (props) {
            this.appName = props.appName
            this.hasStyle = props.hasStyle
            cb()
        }.bind(this))   
    }
}

DudeGenerator.prototype.app = function app() { 
    this.directory('ext', './')
}

DudeGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('_jshintrc', '.jshintrc')
    this.copy('_gitignore', '.gitignore')
}