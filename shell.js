/*
 * @Descripttion: 
 * @version: 
 * @Author: jiakun
 * @Date: 2021-10-08 16:57:56
 */
global.__NUXT_PATHS__ = (global.__NUXT_PATHS__ || []).concat(__dirname)

const cli = require('@nuxt/cli/dist/cli-index.js');

// cli.run(["build"]);
cli.run(["start"]);