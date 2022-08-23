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
    let Area = Math.floor(Number(document.getElementById("Area").value));
    let Id = getIdBySno(Sno);
    // Id = 0; //用于debug的用户Id
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
    let url = "自己的服务器后台url";
    httpRequest.open('POST', url, false); //发送请求（同步）
    httpRequest.setRequestHeader("content-type", "application/json;charset=utf-8");
    httpRequest.send(JSON.stringify(Stu));
    let res = httpRequest.responseText;
    res = JSON.parse(res);
    return res.id;
}
function newData(Id, Dis, Area){
    //一年更新一次代码
    let date = new Date();
    let year = date.getFullYear();
    if(year > 2022){    //主要是week属性需要修改
        alert("请提醒某人该更新版本了！");
        return;
    }
    let Runner = {
        "Id": Id,
        "Dis": Dis,
        "Area": Area
    };
    let httpRequest = new XMLHttpRequest();
    let url = "自己的服务器后台url";
    httpRequest.open('POST', url, true); //发送请求（异步）
    httpRequest.setRequestHeader("content-type", "application/json;charset=utf-8");
    httpRequest.send(JSON.stringify(Runner));
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