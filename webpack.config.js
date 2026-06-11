const fs = require("fs");
const path = require("path");

const entries = fs.readdirSync("./src")
    .filter(file => file.endsWith(".mjs"))
    .reduce((acc, file) => {
        if (["all.mjs", "core.mjs"].includes(file)) return acc;
        const modName = file.slice(0, -4).replaceAll(
            /(?:^|-)([a-z])/g,
            (m, p1) => p1.toUpperCase()
        );
        return Object.assign(acc, {[modName]: `./src/${file}`});
    }, {})
;

function kebabize(camel) {
    return camel.replaceAll(
        /(^|[a-z])([A-Z])/g,
        (m, p1, p2) => p1 ? (p1 + '-' + p2.toLowerCase()) : p2.toLowerCase()
    );
}

module.exports = [
    {
        mode: "production",
        entry: {all: "./src/all.mjs"},
        output: {
            clean: false,
            path: path.resolve(__dirname, "dist"),
            library: "kongUtil"
        }
    },
    {
        mode: "production",
        entry: entries,
        output: {
            clean: false,
            filename: pathData => kebabize(pathData.chunk.name) + ".js",
            path: path.resolve(__dirname, "dist"),
            library: "kongUtil[name]"
        }
    },
    {
        mode: "production",
        entry: Object.assign({All: "./src/all.mjs"}, entries),
        output: {
            clean: true,
            filename: pathData => kebabize(pathData.chunk.name) + ".mjs",
            path: path.resolve(__dirname, "mod"),
            library: {type: "module"}
        },
        experiments: {
            outputModule: true
        }
    }
];
