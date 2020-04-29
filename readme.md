## install
```
npm i xlsxtojson_dch -g
```
## usage
### 配置文件格式**注：输出配置可选，没有配置文件将按"表头标题":"值"格式输出**
- 添加输出配置，**注意是json文件**
```JSON
//opt.json
{
    "sheetName_field":"sheetName字段名",
    "dictionary": {
        "表头标题":"JSON中需要的字段名"
    }
}
```
例如：
```
//test.xlsx中sheetName，3月18日
输出国家	输入地区	新增输入人数	累计输入人数
英国	上海	2	3
英国	广东	4	8
英国	北京	7	13
匈牙利	北京	3	3
西班牙	北京	7	20
泰国	广东	1	4
卢森堡	北京	1	1
菲律宾	广东	2	6
法国	广东	2	4
巴西	北京	1	1
奥地利	北京	2	2
意大利	浙江	1	1
```
以上表格想输出‘输出国家’=》‘source’，‘输入地区’=》‘target’，‘累计输入人数’=》‘value’
配置文件：
```JSON
//opt.json
{
    "sheetName_field":"date",
    "dictionary": {
        "输出国家": "source",
        "输入地区": "target",
        "累计输入人数": "value"
    }
}
```
按配置文件输出将得到：
```JSON
{"date":"3月18日","data":[{"source":"英国","target":"上海","value":3},{"source":"英国","target":"广东","value":8},{"source":"英国","target":"北京","value":13},{"source":"匈牙利","target":"北京","value":3},{"source":"西班牙","target":"北京","value":20},{"source":"泰国","target":"广东","value":4},{"source":"卢森堡","target":"北京","value":1},{"source":"菲律宾","target":"广东","value":6},{"source":"法国","target":"广东","value":4},{"source":"巴西","target":"北京","value":1},{"source":"奥地利","target":"北京","value":2},{"source":"意大利","target":"浙江","value":1}]}
```
## 操作
在需要转的xlsx文件所在文件夹下运行命令行输入 xlsxtojson_dch，按提示操作即可