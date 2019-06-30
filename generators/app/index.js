var Generator = require('yeoman-generator');
let yosay = require('yosay');
let mkdirp = require('mkdirp');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
        this.option('moduleName');
        this.option('displayName');
        this.option('description');
        this.option('tab');
        this.option('ps_min_version');
        this.option('ps_max_version');
        this.option('author');
        this.option('subfolder');

        this.folders = [
            '/classes',
            '/controllers',
            '/controllers/admin',
            '/controllers/front',
            '/views',
            '/views/css',
            '/views/img',
            '/views/js',
            '/views/templates',
            '/views/templates/admin',
            '/views/templates/front'
        ];
    }

    async prompting() {
        this.log(yosay('Welcome to the PrestaShop Module generator!'));

        this.answers = await this.prompt([
            {
                type: "input",
                name: "moduleName",
                message: "Module class name",
                store: true
            },
            {
                type: "input",
                name: "displayName",
                message: "Module display name",
                store: true
            },
            {
                type: "input",
                name: "description",
                message: "Module decription",
                store: true
            },
            {
                type: "input",
                name: "tab",
                message: "Tab (category) name",
                store: true
            },
            {
                type: "input",
                name: "ps_min_version",
                message: "PS min version compliancy",
                default: "1.6.0.0"
            },
            {
                type: "input",
                name: "ps_max_version",
                message: "PS max version compliancy",
                default: "1.7.5.0"
            },
            {
                type: "input",
                name: "author",
                message: "Module author",
                store: true
            },
            {
                type: "input",
                name: "subfolder",
                message: "Create folder for module?",
                default: 'y',
                store: true
            }
        ]);

        this.answers.year = new Date().getFullYear();
    }

    processingOptions() {
        let root = process.cwd();
        if(this.answers.subfolder == 'y') {
            root += '/' + this.answers.moduleName;
        }

        this.config.set('root', root);
    }

    creatingStructure() {
        if(this.answers.subfolder == 'y') {
            if(!this.fs.exists('./'+this.answers.moduleName)) {
                mkdirp.sync('./'+this.answers.moduleName);
            }
        }

        this.folders.forEach(element => {
            if(!this.fs.exists(element)) {
                mkdirp.sync(this.config.get('root') + element);
                this.fs.copyTpl(
                    this.templatePath('index.php'),
                    this.destinationPath(this.config.get('root') + element + '/index.php'),
                    this.answers
                );
            }
        });
    }

    writing() {
        let prefix = "./";
        let moduleName = this.answers.moduleName;
        if(this.answers.subfolder == 'y') {
            prefix += moduleName + '/';
        }

        this.fs.copyTpl(
            this.templatePath('module.php'),
            this.destinationPath(prefix + moduleName.toLowerCase() + '.php'),
            this.answers
        );

        this.fs.copyTpl(
            this.templatePath('index.php'),
            this.destinationPath(prefix + 'index.php'),
            this.answers
        );
    }
}