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
                name: "moduleName",
                message: "Module name:",
                store: true
            },
            {
                type: "input",
                name: "fileName",
                message: "FrontController file name:",
                store: true
            },
            {
                type: "input",
                name: "author",
                message: "Module author:",
                store: true
            }
        ]);
    }

    writing() {
        this.answers.year = new Date().getFullYear();

        if(!this.fs.exists('./controllers/front')) {
            mkdirp.sync('./controllers/front');
        }

        this.fs.copyTpl(
            this.templatePath('FrontController.php'),
            this.destinationPath('controllers/front/' + this.answers.fileName + '.php'),
            this.answers
        );

        this.fs.copyTpl(
            this.templatePath('index.php'),
            this.destinationPath('controllers/front/index.php'),
            this.answers
        );
    }
}