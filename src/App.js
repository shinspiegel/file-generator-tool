const path = require("path");
const FileHelper = require("./FileHelper");
const StringHelper = require("./StringHelper");

class App {
    constructor() {
        this.setInitialValues();

        this.readGenFile();
        this.setFiles();
        this.setSourceFolder();
        this.setDestinyFolder();

        this.createFiles();
    }

    setInitialValues() {
        this.genFilePath = path.join("./.gen.json");
        this.genFileData = {};

        this.componentName = StringHelper.capitalize(process.argv[2]);
        this.replaceMatcher = /NAME_COMPONENT/g;
        this.files = [];
        this.sourceFolder = "node_modules/file-generator-tool/assets";
        this.destinyFolder = "src";
    }

    readGenFile() {
        if (FileHelper.fileExists(this.genFilePath)) {
            this.genFileData = FileHelper.readJson(this.genFilePath);
        }
    }

    setFiles() {
        if (this.genFileData?.files) {
            this.files = this.genFileData.files;
        } else {
            this.files = ["index.js", "index.css"];
        }
    }

    setSourceFolder() {
        if (this.genFileData?.sourceFolder) {
            this.sourceFolder = this.genFileData.sourceFolder;
        }
    }

    setDestinyFolder() {
        if (this.genFileData?.destinyFolder) {
            this.destinyFolder = this.genFileData.destinyFolder;
        }

        if (process.argv[3]) {
            this.destinyFolder = process.argv[2];
            this.componentName = StringHelper.capitalize(process.argv[3]);
        }
    }

    createFiles() {
        this.files.map(async (file) => {
            const filePath = path.join(this.sourceFolder, file);
            const raw = await FileHelper.readFile(filePath);

            const replacedContent = raw.replace(this.replaceMatcher, this.componentName);

            const savePathComponent = path.join(this.destinyFolder, this.componentName);

            await FileHelper.createFolderIfNotExists(savePathComponent);
            await FileHelper.saveFile(savePathComponent, file, replacedContent);
        });
    }
}

module.exports = App;
