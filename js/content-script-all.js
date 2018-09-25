function getAllCompanyName() {

    var reg = /^http(s)?:\/\/(.*?)\//;
    var url=document.location.href;
    var host=reg.exec(url)[2];
    var name="";
    var address="";
    var cityId="1";
    /**
     * 前程无忧
     * @type {NodeList}
     */
    var $51jbHost=/51job/;
    if($51jbHost.test(host)) {
        var $51jb = document.getElementsByClassName("t2");
        var $51jbresultList = document.getElementById("resultList");
        var $51Html=document.getElementsByTagName("body")[0];
        for (var i = 1; i < $51jb.length; i++) {
            checkData($51jb[i].textContent, $51jbresultList);
        }
        var hookHtml=/jobs.51job.com\/all/;
        if (!hookHtml.test(url)){
            var hidJobID=document.getElementById("tHeader_mk");
            name=$(".cname")[0].children[0].innerText;
            address=$(".fp")[1].innerText;
            checkData(name, $(".cname")[0]);
            hidJobID.after("前程堪忧啊");
            findAndReplaceDOMText($51Html, {
                find:"前程堪忧啊",
                replace: function(portion) {
                    var ec = document.createElement('span');
                    ec.style="width:180px;bottom:20px;right:0;display:block;height:30px;line-height:30px;font-size:15px;color:#fff;background-color:#ff6000;-webkit-border-radius:2px;-moz-border-radius:2px;-ms-border-radius:2px;-o-border-radius:2px;border-radius:2px;text-align: center;";
                    ec.innerHTML = "举报培训机构--插件提供";
                    ec.setAttribute("href","javascript:void()");
                    ec.setAttribute("id","zhipinBtn");
                    return ec;
                }
            });
            document.getElementById('zhipinBtn').addEventListener("click",function(){
                var data={
                    "name":name,
                    "address":address,
                    "cityId":cityId,
                    "source":"前程无忧",
                    "remark":"来自谷歌浏览器插件提交数据"
                };
                submitData(data);
            },false);
        }

    }

    /**
     * BOSS直聘
     * @type {NodeList}
     */
    var zhipinHost=/zhipin/;
    if(zhipinHost.test(host)){
        var zhipin =document.getElementsByClassName("company-text");
        var zhipinmain=document.getElementById("main");
        for(var j=0;j<zhipin.length;j++){
            checkData(zhipin[j].children[0].innerText,zhipinmain);
        }
        var job_detailReg=/job_detail/;
        if(job_detailReg.test(url)){
            var time=document.getElementsByClassName("time");
            var job_detail=document.getElementById("main");
            name=$(".name")[1].innerText;
            address=$(".location-address")[0].innerText;
            checkData(name,job_detail);
            findAndReplaceDOMText(job_detail, {
                find:time[0].innerHTML,
                replace: function(portion) {
                    var el = document.createElement('span');
                    el.innerHTML = portion.text;
                    var ec = document.createElement('a');
                    ec.className = "btn";
                    ec.style="margin-left: 10px;";
                    ec.innerHTML = "举报培训机构--插件提供";
                    ec.setAttribute("href","javascript:void()");
                    ec.setAttribute("id","zhipinBtn");
                    el.appendChild(ec);
                    return el;
                }
            });
            document.getElementById('zhipinBtn').addEventListener("click",function(){
                var data={
                    "name":name,
                    "address":address,
                    "cityId":cityId,
                    "source":"BOSS直聘",
                    "remark":"来自谷歌浏览器插件提交数据"
                };
                submitData(data);
            },false);
        }
    }


    /**
     * 中华英才网
     * @type {NodeList}
     */
    var chinahrHost=/chinahr/;
    if(chinahrHost.test(host)) {
        var chinahr = document.getElementsByClassName("job-company");
        var chinahrmain = document.getElementById("container");
        for (var j = 0; j < chinahr.length; j++) {
            checkData(chinahr[j].textContent, chinahrmain);
        }
    }

    /**
     * 智联招聘
     * @type {NodeList}
     */
    var zhaopinHost=/zhaopin/;
    if(zhaopinHost.test(host)) {
        name=$(".company.l a")[0].innerText;
        var zhaopinmain = $(".clearfix")[1];
        checkData(name, zhaopinmain);
        address=$(".add-txt")[0].innerText;
        var html='<a class=" info-apply" href="javascript:;" id="zhipinBtn" style="height: 30px;margin-top: 5px;line-height: 30px;">举报培训机构-插件提供</a>';
        $("#applyVacButton1").after(html);
        document.getElementById('zhipinBtn').addEventListener("click",function(){
            var data={
                "name":name,
                "address":address,
                "cityId":cityId,
                "source":"智联招聘",
                "remark":"来自谷歌浏览器插件提交数据"
            };
            submitData(data);
        },false);
    }

}

getAllCompanyName();
function checkData(compyName,container) {
    $.ajax({
        type:"POST",
        url: 'https://www.peixun69.com/w_search.html',
        dataType: "json",
        data: {
            "searchkey": compyName,
            "page":1
        },
        success: function(data){
            if (data.status==1){
                if(data.totalPage!=0){
                    findAndReplaceDOMText(container, {
                        find:compyName,
                        replace: function(portion) {
                            var el = document.createElement('span');
                            el.style.backgroundColor = "#B9F00F";
                            el.innerHTML = portion.text;
                            return el;
                        }
                    });
                }
            }
        }
    });
}

function submitData(data) {
    $.ajax({
        url:"https://www.peixun69.com/add.do",
        type:"POST",
        data:data,
        success:function(data){
            if(data==0){
                alert("该公司已存在！");
            }else if(data==1){
                alert("提交成功,管理员审核通过后显示出来，感谢您的支持！");
            }else if(data==3){
                alert("请不要提交非法字符！");
            }else{
                alert("提交失败，请重试！");
            }
        },
        error:function(){
            alert("提交成功,管理员审核通过后显示出来，感谢您的支持！");
        }
    });
}
