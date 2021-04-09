import fs from "fs"
import path from "path"
import {promisify} from "util"

const pCopyFile = promisify(fs.copyFile)
const pMkdir = promisify(fs.mkdir)
const root = path.resolve(__dirname, "../")
const dest = path.resolve(root, "lib")

const makeDirectorys = [
  "graphql"
];


const filesToCopy = [
    "graphql/post.graphql",
    "jwtRS256.key",
    "jwtRS256.key.pub"
]

const start = async () => {

    for(const directory of makeDirectorys) {
        const fullDir = path.resolve(dest, directory);
        console.log(`Make directory ${directory} in ${dest}`);
        await pMkdir(fullDir);
    }

    for (const file of filesToCopy) {
        const fullSource = path.resolve(root, "src", file)
        const fullDest = path.resolve(dest, file)
        console.log(`Copy ${fullSource} -> ${fullDest}`)
        await pCopyFile(fullSource, fullDest)
    }
}

start().catch((error) => {
    console.error(error)
    process.exit(1)
})
