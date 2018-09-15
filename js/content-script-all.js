function getAllCompanyName() {
    /**
     * 前程无忧
     * @type {NodeList}
     */
    var $51jb =document.getElementsByClassName("t2");
    var $51jbresultList=document.getElementById("resultList");
    for(var i=1;i<$51jb.length;i++){
        checkData($51jb[i].textContent,$51jbresultList);
    }

    /**
     * BOSS直聘
     * @type {NodeList}
     */
    var zhipin =document.getElementsByClassName("name");
    var zhipinmain=document.getElementById("main");
    for(var j=0;j<zhipin.length;j++){
        checkData(zhipin[j].textContent,zhipinmain);
    }


    /**
     * 中华英才网
     * @type {NodeList}
     */
    var chinahr =document.getElementsByClassName("job-company");
    var chinahrmain=document.getElementById("container");
    for(var j=0;j<chinahr.length;j++){
        checkData(chinahr[j].textContent,chinahrmain);
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
