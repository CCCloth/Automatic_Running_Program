let express = require('express');
let app = express();
let request = require('request');
//req.body是解析json的结果，一定加上这么一句，否则取不到req.body
app.use(express.json());
//设置跨域
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header("X-Powered-By",' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
app.post('/getIdBySno', (req, res) => {
    let Stu = {
    	"no": req.body.no
	};
	request({
		url: '抓包得到的url',
		method: "POST",
		json: true,
		headers: {
			"content-type": "application/json;charset=utf-8",
			"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001431) NetType/4G Language/zh_CN",
			"Host": "s.dshenme.com"
		},
		body: Stu
		}, function(error, response, body) {
		if (!error && response.statusCode == 200) {//请求成功的处理逻辑
			res.json({
				id : body.data.id
			});
		}
	}); 
});
app.post('/newData', (req, res) => {
	let Id = req.body.Id;
	let Dis = req.body.Dis;
	let Area = req.body.Area;
    Dis = Dis+Math.random()*50;
    let down = Math.floor(5*Dis/1000*60);
    let up = Math.floor(7*Dis/1000*60);
    let time = Math.floor(Math.random()*(up-down)+down); //配速5到7之间随机生成运动时间
    let max_v = Math.random()*2+4;
    let cal = Math.floor(60*Dis/1000);
    let nd = new Date();
    let end = nd.getTime()-Math.ceil(Math.random()*1500+1500);
    let start = end-(time*1000+Math.ceil(Math.random()*999));
    let sd = new Date(start);  
    let year = String(sd.getFullYear());
    let month = String(sd.getMonth()+1 < 10 ? '0'+(sd.getMonth()+1) : sd.getMonth()+1);
    let day = String(sd.getDate() < 10 ? '0'+sd.getDate() : sd.getDate());
    let hour = String(sd.getHours() < 10 ? '0'+sd.getHours() : sd.getHours());
    let minute = String(sd.getMinutes() < 10 ? '0'+sd.getMinutes() : sd.getMinutes());
    let second = String(sd.getSeconds() < 10 ? '0'+sd.getSeconds() : sd.getSeconds());
    let term;
    if(nd.getMonth()+1 >= 9)
        term = '02';
    else
        term = '01';
    up = Math.floor(2*Dis/3);
    down = Math.floor(Dis/2);
    let step = Math.floor(Math.random()*(up-down)+down);
    let StrId = Id;
    while(StrId.length < 6)
        StrId = '0'+StrId;
    let sum = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    if(nd.getFullYear()%4==0 && nd.getFullYear()%100!=0 || nd.getFullYear()%400==0)
        for(let i = 2; i < 12; i++)
            sum[i]++;
    let getDay = sum[nd.getMonth()]+nd.getDate();   //一年中的第几天
    // if(getDay-122 <= 0){    //每年更新一次代码
    //     alert("请提醒某人该更新版本了！");
    //     return;
    // }
    nd = new Date();
    let temp = Math.floor(2*(nd.getTime()+5e11));
    let token = "QDSPORT"+String(temp);
    let Data = {
        "week" : 202219+Math.floor((getDay-122)/7), //每年都需要修改！   
        "av" : "NaN",           //目前大部分人都是0
        "time" : time,
        "mv" : max_v,
        "step" : step,
        "month" : year+month,
        "updateuser" : Id,
        "os" : 12,
        "year" : year,
        "term" : year+term,
        "hidetime" : 0,
        "id" : -1,
        "user" : Id,
        "no" : year+month+day+hour+minute+second+StrId,
        "date" : year+month+day,
        "to" : end,
        "isStep" : 1,
        "distance" : Dis,
        "token" : token,
        "from" : start,
        "area" : Area,
        "cal" : cal
    };
	request({
		url: '抓包得到的url',
		method: "POST",
		json: true,
		headers: {
			"content-type": "application/json;charset=utf-8",
			"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001431) NetType/4G Language/zh_CN",
			"Host": "s.dshenme.com"
		},
		body: Data
		}, function(error, response, body) {
		if (!error && response.statusCode == 200) {//请求成功的处理逻辑
			res.end();//也许可以更鲁棒一点
		}
	}); 
	
});
//启动服务
app.listen(8000);
