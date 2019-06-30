let Generator = require('yeoman-generator');
let yosay = require('yosay');
let mkdirp = require('mkdirp');

module.exports = class extends Generator
{
    constructor(args, opts) {
        super(args, opts);

        this.option('moduleName');
        this.option('fileName');
        this.option('author');
    }

    async prompting() {
        this.log(yosay("Let's create some FrontController!"));

        this.answers = await this.prompt([
            {
                type: "input",
                name: "className",
                message: "FrontController name:",
                store: true
            },
            {
                type: "input",
                name: "author",
                message: "Module author:",
                store: true
            }
        ]);

        this.answers.moduleName = this.config.get('moduleName');
        this.answers.year = new Date().getFullYear();
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('FrontController.php'),
            this.destinationPath(this.config.get('root') + '/controllers/front/' + this.answers.className + '.php'),
            this.answers
        );
    }
}