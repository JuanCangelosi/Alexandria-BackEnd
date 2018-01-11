import * as fs from "fs";
import * as AdmZip from "adm-zip";

export class GutenbergUnzipper {

    public unzip() {
        this.deleteFolderRecursive("./unzips");
        fs.mkdirSync("./unzips");
        const zips: string[] = fs.readdirSync("./zips");
        for (const zip of zips) {
            console.log(zip);
            const adm = new AdmZip("./zips/" + zip);
            adm.extractAllTo("./unzips");
        }
        console.log("Unzipping done");
    }

    private deleteFolderRecursive(path: string) {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach((file, index) => {
                const curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    this.deleteFolderRecursive(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }
}