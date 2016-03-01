
var odeNubers = 1;

function addOde()
{
    odeNubers++;
    var s = "<div id=\"odeDiv##number##\">" +
    "<label id=\"lblode##number##\"> ode##number## </label> <input style=\"width:200px\" id=\"txtOde##number##\" /> " +
        "<input id=\"txtDependence##number##\" style=\"width:70px\" type=\"txt\" list=\"ode_list\" name=\"link\" /> <input type=\"button\" style=\"width:40px\" onclick=\"removeOde(##number##)\" id=\"btnRemoveOde##number##\" value=\" - \"/> </div>";
    s = s.replace(/##number##/g, odeNubers);
    var lastOdeDiv = "odeDiv" + (odeNubers-1);
    document.getElementById(lastOdeDiv).insertAdjacentHTML("afterEnd", s);
    //document.getElementById("url_list")
         
    // var options = ode_list.getElementsByTagName("option");
    // ode_list.appendChild(" <option value=\"ode" + odeNubers + "\"  />");
    // var opt = document.createElement('option');
    // opt.value = "ode" + odeNubers; 
    var t = document.getElementById('ode_list').innerHTML; //.options.add(opt);
    t += " <option value=\"ode" + odeNubers + "\"  />";
    document.getElementById('ode_list').innerHTML = t;
}
function removeOde(num)
{
    document.getElementById("txtOde" + num).value = "";
    document.getElementById("odeDiv" + num).style.display = "none";
}
function collectOdeStr1()
{
    // {odes:[{id:ode1,value:xxx,dependency:ode2},{}]}
    var s = "{\"ode\":{\"number\":\"" + odeNubers  + "\",\"odes\":[";
    for (var i = 1; i <= odeNubers; i++)
    {
        if (i > 1)
        {
            s += ",";
        }
        if (document.getElementById("txtOde" + i).value == "")
        {
            continue;
        }
        var odeId = document.getElementById("lblode" + i).innerHTML;
                
        var odeValue = document.getElementById("txtOde" + i).value;
        var odeDependency = document.getElementById("txtDependence" + i).value;
        s += "{\"id\":\"" + odeId.trim() + "\",\"value\":\"" + odeValue.trim() + "\",\"dependency\":\"" + odeDependency.trim() + "\"}";
    }
            

    var s = s + "]}}";
    var serializedDiagram = JSON.stringify(s)
    return serializedDiagram;
    //document.getElementById("txtjson").value = s;
}

function collectOdeStr() {
    // {odes:[{id:ode1,value:xxx,dependency:ode2},{}]}
    var s = "{'ode':[{'number':'" + odeNubers + "'},{'odes':[";
    for (var i = 1; i <= odeNubers; i++) {
        if (i > 1) {
            s += ",";
        }
        if (document.getElementById("txtOde" + i).value == "") {
            continue;
        }
        var odeId = document.getElementById("lblode" + i).innerHTML;

        var odeValue = document.getElementById("txtOde" + i).value;
        var odeDependency = document.getElementById("txtDependence" + i).value;
        s += "{'id':'" + odeId.trim() + "','value':'" + odeValue.trim() + "','dependency':'" + odeDependency.trim() + "'}";
    }


    var s = s + "]}]}";
   // var serializedDiagram = JSON.stringify(s)
    return s;
    //document.getElementById("txtjson").value = s;
}

function collectOdeStr11() {
    // {odes:[{id:ode1,value:xxx,dependency:ode2},{}]}
    var s = "{##xx##ode##xx##:{##xx##number##xx##:##xx##" + odeNubers + "##xx##,##xx##odes##xx##:[";
    for (var i = 1; i <= odeNubers; i++) {
        if (i > 1) {
            s += ",";
        }
        if (document.getElementById("txtOde" + i).value == "") {
            continue;
        }
        var odeId = document.getElementById("lblode" + i).innerHTML;

        var odeValue = document.getElementById("txtOde" + i).value;
        var odeDependency = document.getElementById("txtDependence" + i).value;
        s += "{##xx##id##xx##:##xx##" + odeId.trim() + "##xx##,##xx##value##xx##:##xx##" + odeValue.trim() + "##xx##,##xx##dependency##xx##:##xx##" + odeDependency.trim() + "##xx##}";
    }


    var s = s + "]}}";
    //var serializedDiagram = JSON.stringify(s)
    return s;
    //document.getElementById("txtjson").value = s;
}

function collectOdeStr2() {
    // {odes:[{id:ode1,value:xxx,dependency:ode2},{}]}
    var s = "{ode:{number:" + odeNubers + ",odes:[";
    for (var i = 1; i <= odeNubers; i++) {
        if (i > 1) {
            s += ",";
        }
        if (document.getElementById("txtOde" + i).value == "") {
            continue;
        }
        var odeId = document.getElementById("lblode" + i).innerHTML;

        var odeValue = document.getElementById("txtOde" + i).value;
        var odeDependency = document.getElementById("txtDependence" + i).value;
        s += "{id:" + odeId.trim() + ",value:" + odeValue.trim() + ",dependency:" + odeDependency.trim() + "}";
    }


    var s = s + "]}}";
     
    return s;
    //document.getElementById("txtjson").value = s;
}

function reRenderOde(obj) {
    //var data = returnModelInfoInJasonFormat();
    //data = JSON.parse(data);
    if (obj== null || obj.length<1 || obj[1].odes == undefined || obj[1].odes == null) {
        return;
    }
    odeNubers = obj[0].number;

    var obj = obj[1];
    var num = obj.odes.length;
    var s = "<div id=\"odeDiv##number##\">" +
    "<label id=\"lblode##number##\"> ode##number## </label> <input id=\"txtOde##number##\" /> " +
        "<input id=\"txtDependence##number##\" type=\"txt\" list=\"ode_list\" name=\"link\" /> <input type=\"button\" onclick=\"removeOde(##number##)\" id=\"btnRemoveOde##number##\" value=\" - \"/> </div>";
    document.getElementById("odePanel").innerHTML = "";
    for (var i = 0; i < num; i++) {
        var odeid = obj.odes[i].id;
        //var s = odeid;
        var n = odeid.substring(3);
        //get number from odeNumber
        var newline = s.replace(/##number##/g, n);
        document.getElementById("odePanel").insertAdjacentHTML("beforeEnd", newline);

        document.getElementById("lblode" + n).innerHTML = odeid;
        document.getElementById("txtOde" + n).value = obj.odes[i].value;
        document.getElementById("txtDependence" + n).value = obj.odes[i].dependency;

        var t = document.getElementById('ode_list').innerHTML; //.options.add(opt);
        t += " <option value=\"ode" + n + "\"  />";
        document.getElementById('ode_list').innerHTML = t;
    }
}
       
    function initOde()
    {
         
        odeNubers = 1;
        document.getElementById('ode_list').innerHTML = "";

        var s = "<div id=\"odeDiv##number##\">" +
        "<label id=\"lblode##number##\"> ode##number## </label> <input id=\"txtOde##number##\" /> " +
            "<input id=\"txtDependence##number##\" type=\"txt\" list=\"ode_list\" name=\"link\" /> <input type=\"button\" onclick=\"removeOde(##number##)\" id=\"btnRemoveOde##number##\" value=\" - \"/> </div>";
        document.getElementById("odePanel").innerHTML = "";
         
            //var odeid = "";
           // var s = "";
            var n = 1;
            //get number from odeNumber
            var newline = s.replace(/##number##/g, n);
            document.getElementById("odePanel").insertAdjacentHTML("beforeEnd", newline);
                 
            var t = document.getElementById('ode_list').innerHTML; //.options.add(opt);
            t += " <option value=\"ode" + n + "\"  />";
            document.getElementById('ode_list').innerHTML = t;
         
            
    // var lastOdeDiv = "odeDiv" + (odeNubers - 1);
    //document.getElementById(lastOdeDiv).insertAdjacentHTML("afterEnd", s);
    //document.getElementById("url_list")

    // var options = ode_list.getElementsByTagName("option");
    // ode_list.appendChild(" <option value=\"ode" + odeNubers + "\"  />");
    // var opt = document.createElement('option');
    // opt.value = "ode" + odeNubers; 
            
}
        
 