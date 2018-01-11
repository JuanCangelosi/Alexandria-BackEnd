"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const AdmZip = require("adm-zip");
class GutenbergUnzipper {
    unzip() {
        this.deleteFolderRecursive("./unzips");
        fs.mkdirSync("./unzips");
        const zips = fs.readdirSync("./zips");
        for (const zip of zips) {
            console.log(zip);
            const adm = new AdmZip("./zips/" + zip);
            adm.extractAllTo("./unzips");
        }
        console.log("Unzipping done");
    }
    deleteFolderRecursive(path) {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach((file, index) => {
                const curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) {
                    this.deleteFolderRecursive(curPath);
                }
                else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }
}
exports.GutenbergUnzipper = GutenbergUnzipper;
//# sourceMappingURL=gutenberg-unzipper.js.map