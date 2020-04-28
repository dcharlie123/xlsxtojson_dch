#!/usr/bin/env node
const fs = require("fs");
const path = require('path');
const xlsx = require('xlsx');
const inquirer = require('inquirer');
const chalk = require('chalk');
const promptlist = [{
        type: 'input',
        message: '需要转json的xlsx文件路径:',
        name: 'inputFileName',
        validate: val => {
            if (!fs.existsSync(val)) {
                return `不存在文件${path.resolve(__dirname, val)}`
            }

            if (path.extname(val) == '.xlsx') {
                return true
            }

            return '请输入xlsx格式文件'
        }
    },
    {
        type: 'input',
        message: '需要处理第几个sheet（输入数字或“all”）',
        name: "sheetNum",
        validate: val => {
            if (val == 'all') {
                return true
            } else if (/^(\d+)$/g.test(val)) {
                return true
            }
            return '请输入数字或“all”'
        }
    },
    {
        type: 'input',
        message: '输出配置对应的文件路径(json格式，格式见readme.md)',
        name: 'dictionarires',
        validate: val => {
            if (!fs.existsSync(val)) {
                return `不存在文件${path.resolve(__dirname, val)}`
            }
            if (path.extname(val) == '.json') {
                return true
            }
            return '请输入json格式文件'
        }
    },
    {
        type: 'list',
        message: '选择输出的json类型',
        name: 'outputType',
        choices: [
            "直接输出json",
            "输出接口类型json"
        ],
        filter: val => {
            if (val == "直接输出json") {
                return false
            } else {
                return true
            }
        }
    },
    {
        type: 'input',
        message: '输出的json文件名',
        name: "outputName"
    },

]
inquirer.prompt(promptlist).then(answers => {
    let workbook = xlsx.readFile(path.resolve(__dirname, answers.inputFileName));
    let sheetNames = workbook.SheetNames;
    var datajson = fs.readFileSync(path.resolve(__dirname, answers.dictionarires), 'utf8');
    var dictionary = JSON.parse(datajson).dictionary
    var keyArr = [];
    for (var i in dictionary) {
        keyArr.push(i)
    }
    let dataArr = [];
    if (answers.sheetNum == 'all') {
        sheetNames.forEach((sheetName, idx) => {
            let worksheet = workbook.Sheets[sheetNames[idx]];
            let hrefs = xlsx.utils.sheet_to_json(worksheet);
            let arr = [];

            hrefs.forEach((item) => {
                let obj = {};
                for (let i = 0; i < keyArr.length; i++) {
                    obj[dictionary[keyArr[i]]] = item[keyArr[i]]
                }
                arr.push(obj)
            })
            dataArr.push({
                date: sheetName,
                data: arr
            })
        })
    } else {
        var worksheet = workbook.Sheets[sheetNames[answers.sheetNum - 1]];
        var hrefs = xlsx.utils.sheet_to_json(worksheet);
        let arr = [];
        hrefs.forEach((item) => {
            let obj = {};
            for (let i = 0; i < keyArr.length; i++) {
                obj[dictionary[keyArr[i]]] = item[keyArr[i]]
            }
            arr.push(obj)
        })
        dataArr = {
            date: sheetNames[answers.sheetNum - 1],
            data: arr
        }
    }
    var res;
    if (answers.outputType) {
        res = {
            "errcode": 0,
            "errmsg": "ok",
            "data": dataArr
        }
    } else {
        res = dataArr
    }
    fs.writeFile(path.resolve(__dirname, `${answers.outputName}.json`), JSON.stringify(res), (err) => {
        if (err) throw err;
        console.log(chalk.green('转换成功，输出地址：', path.resolve(__dirname, `${answers.outputName}.json`)));
    });

})