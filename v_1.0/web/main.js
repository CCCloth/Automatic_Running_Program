Object.defineProperty(window, "console", {
    get: function(){
        throw "console exception.";
    },
    set: function(){
        throw "console exception.";
    }
});
function Run(){
    let Sno = document.getElementById("Sno").value;
    let Dis = Number(document.getElementById("Dis").value);
    // console.log(Dis);
    let Area = Math.floor(Number(document.getElementById("Area").value));
    let Id = getIdBySno(Sno);
    if(typeof Id == "undefined"){
        alert("请检查学号！");
        return;
    }
    if(Dis < 1000 || Dis > 5500 || isNaN(Dis)){
        alert("运动距离应在1000至5500之间！");
        return;
    }
    if(Area < 1 || Area > 5 || isNaN(Area)){
        alert("运动区域编号应在1至5之间！");
        return;
    }
    newData(Id, Dis, Area);
}
function getIdBySno(Sno){
    let Stu = {
    	"no": Sno
	};
    let httpRequest = new XMLHttpRequest();
    let url = "抓包得到的url";
    httpRequest.open('POST', url, false); //发送请求（同步）
    httpRequest.setRequestHeader("content-type", "application/json");
    httpRequest.send(JSON.stringify(Stu));
    let res = httpRequest.responseText;
    res = JSON.parse(res);
    return res.data.id;
}
function newData(Id, Dis, Area){
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
    if(getDay-122 <= 0){    //每年更新一次代码
        alert("请提醒某人该更新版本了！");
        return;
    }
    nd = new Date();
    let temp = Math.floor(2*(nd.getTime()+5e11));
    let token = "QDSPORT"+String(temp);
    let Data = {
        "week" : 202219+Math.floor((getDay-122)/7),    
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
    let httpRequest = new XMLHttpRequest();
    let url = "抓包得到的url";
    httpRequest.open('POST', url, true); //发送请求（异步）
    httpRequest.setRequestHeader("content-type", "application/json");
    httpRequest.send(JSON.stringify(Data));
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            let x = document.getElementById("h1");
            x.innerHTML = "运动成功！";
            x.style.top = "40%";
            x = document.getElementById("p");
            x.innerHTML = "";
        } 
    };
}