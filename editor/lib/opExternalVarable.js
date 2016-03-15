
var externalVarableNubers = 1;

function addExternalVarable()
{
    externalVarableNubers++;
    var s = "<div id=\"ExternalVarableDiv##number##\">" +
    "<label id=\"lbExternalVarable##number##\"> External Varable ##number## </label> " +
    "<select id=\"ExternalVarableValueType##number##\"> " + 
                                      "<option value=\"any\">ANY</option>" + 
                                      "<option value=\"bool\">BOOL</option>" + 
                                      "<option value=\"byte\">BYTE</option>" + 
                                      "<option value=\"date_and_time\">DATE_AND_TIME</option>" + 
                                      "<option value=\"dint\">DINT</option>" + 
                                      "<option value=\"word\">DWORD</option>" + 
                                      "<option value=\"int\">INT</option>" + 
                                      "<option value=\"lint\">LINT</option>" + 
                                      "<option value=\"lreal\">LREAL</option>" + 
                                      "<option value=\"lword\">LWORD</option>" + 
                                      "<option value=\"real\">REAL</option>" + 
                                      "<option value=\"sint\">SINT</option>" + 
                                      "<option value=\"string\">STRING</option>" + 
                                      "<option value=\"time\">TIME</option>" + 
                                      "<option value=\"udint\">UDINT</option>" + 
                                      "<option value=\"uint\">UINT</option>" + 
                                      "<option value=\"ulint\">ULINT</option>" + 
                                      "<option value=\"usint\">USINT</option>" + 
                                      "<option value=\"word\">WORD</option>" + 
                                      "<option value=\"wstring\">WSTRING</option>" + 
                                     "</select>" +
        "<input id=\"txtExternalVarable##number##\" style=\"width:200px\" onfocus=\"this.value=''\" value=\"Enter external varable value here\" type=\"txt\" name=\"link\" /> " +
        "<input type=\"button\" style=\"width:40px\" onclick=\"removeExternalVarable(##number##)\" id=\"btnExternalVarable##number##\" value=\" - \"/> </div>";
    s = s.replace(/##number##/g, externalVarableNubers);
    var lastExternalVarableDiv = "ExternalVarableDiv" + (externalVarableNubers-1);
    document.getElementById(lastExternalVarableDiv).insertAdjacentHTML("afterEnd", s);
    //document.getElementById("url_list")
         
    // var options = externalVarable_list.getElementsByTagName("option");
    // externalVarable_list.appendChild(" <option value=\"externalVarable" + externalVarableNubers + "\"  />");
    // var opt = document.createElement('option');
    // opt.value = "externalVarable" + externalVarableNubers; 
    var t = document.getElementById('ExternalVarable_list').innerHTML; //.options.add(opt);
    t += " <option value=\"External Varable" + externalVarableNubers + "\"  />";
    document.getElementById('ExternalVarable_list').innerHTML = t;
}

function removeExternalVarable(num)
{
    document.getElementById("txtExternalVarable" + num).value = "";
    document.getElementById("ExternalVarableDiv" + num).style.display = "none";
}

function collectExternalVarableStr() {
    // {externalVarables:[{id:externalVarable1,value:xxx,externalVarableDependency:externalVarable2},{}]}
    var s = "{\"ExternalVarables\":[";
    for (var i = 1; i <= externalVarableNubers; i++) {

        if (document.getElementById("txtExternalVarable" + i).value == "") {
                  if ( (i!=1) && (document.getElementById("txtExternalVarable" + (i+1)) != null) && (document.getElementById("txtExternalVarable" + (i+1)).value != "")) {
            s += ",";
        }
            continue;
        }
        var externalVarableId = document.getElementById("lbExternalVarable" + i).innerHTML;
        var ExternalVarableValueType = document.getElementById("ExternalVarableValueType" + i).value;
        var externalVarableValue = document.getElementById("txtExternalVarable" + i).value;
        s += "{\"id\":\"" + externalVarableId.trim() + "\",\"ExternalVarableValueType\":\"" + ExternalVarableValueType.trim() + "\",\"value\":\"" + externalVarableValue.trim() + "\"}";
         if ( (document.getElementById("txtExternalVarable" + (i+1)) != null) && (document.getElementById("txtExternalVarable" + (i+1)).value != "")) {
            s += ",";}
    }


    var s = s + "]},";
   // var serializedDiagram = JSON.stringify(s)
    return s;
    //document.getElementById("txtjson").value = s;
}

function reRenderexternalVarable(obj) {
    //var data = returnMexternalVarablelInfoInJasonFormat();
    //data = JSON.parse(data);
    if (obj== null || obj.length<1 || obj[1].externalVarables == undefined || obj[1].externalVarables == null) {
        return;
    }
    externalVarableNubers = obj[0].number;

    var obj = obj[1];
    var num = obj.externalVarables.length;
    var s = "<div id=\"ExternalVarableDiv##number##\">" +
    "<label id=\"lbExternalVarable##number##\"> External Varable ##number## </label> <input style=\"width:200px\" onfocus=\"this.value=''\" value=\"Enter event name here\" id=\"txtExternalVarable##number##\" /> " +
    "<select id=\"ExternalVarableValueType##number##\"> " + 
                                      "<option value=\"any\">ANY</option>" + 
                                      "<option value=\"bool\">BOOL</option>" + 
                                      "<option value=\"byte\">BYTE</option>" + 
                                      "<option value=\"date_and_time\">DATE_AND_TIME</option>" + 
                                      "<option value=\"dint\">DINT</option>" + 
                                      "<option value=\"word\">DWORD</option>" + 
                                      "<option value=\"int\">INT</option>" + 
                                      "<option value=\"lint\">LINT</option>" + 
                                      "<option value=\"lreal\">LREAL</option>" + 
                                      "<option value=\"lword\">LWORD</option>" + 
                                      "<option value=\"real\">REAL</option>" + 
                                      "<option value=\"sint\">SINT</option>" + 
                                      "<option value=\"string\">STRING</option>" + 
                                      "<option value=\"time\">TIME</option>" + 
                                      "<option value=\"udint\">UDINT</option>" + 
                                      "<option value=\"uint\">UINT</option>" + 
                                      "<option value=\"ulint\">ULINT</option>" + 
                                      "<option value=\"usint\">USINT</option>" + 
                                      "<option value=\"word\">WORD</option>" + 
                                      "<option value=\"wstring\">WSTRING</option>" + 
                                     "</select>" +
        "<input id=\"txtExternalVarableDependence##number##\" style=\"width:150px\" type=\"txt\" onfocus=\"this.value=''\" value=\"Enter event value here\" name=\"link\" /> " + 
        "<input type=\"button\" style=\"width:40px\" onclick=\"removeexternalVarable(##number##)\" id=\"btnRemoveexternalVarable##number##\" value=\" - \"/> </div>";
    document.getElementById("externalVarablePanel").innerHTML = "";
    for (var i = 0; i < num; i++) {
        var externalVarableid = obj.externalVarables[i].id;
        //var s = externalVarableid;
        var n = externalVarableid.substring(3);
        //get number from externalVarableNumber
        var newline = s.replace(/##number##/g, n);
        document.getElementById("externalVarablePanel").insertAdjacentHTML("beforeEnd", newline);

        document.getElementById("lbExternalVarable" + n).innerHTML = externalVarableid;
        document.getElementById("txtExternalVarable" + n).value = obj.externalVarables[i].value;
        document.getElementById("ExternalVarableValueType" + n).value = obj.externalVarables[i].ExternalVarableValueType;
        document.getElementById("txtExternalVarableDependence" + n).value = obj.externalVarables[i].externalVarableDependency;

        var t = document.getElementById('externalVarable_list').innerHTML; //.options.add(opt);
        t += " <option value=\"externalVarable" + n + "\"  />";
        document.getElementById('externalVarable_list').innerHTML = t;
    }
}
       
    function initexternalVarable()
    {
         
        externalVarableNubers = 1;
        document.getElementById('externalVarable_list').innerHTML = "";

        var s = "<div id=\"ExternalVarableDiv##number##\">" +
        "<label id=\"lbExternalVarable##number##\"> externalVarable##number## </label> <input id=\"txtExternalVarable##number##\" /> " +
        "<select id=\"ExternalVarableValueType##number##\"> " + 
                                      "<option value=\"any\">ANY</option>" + 
                                      "<option value=\"bool\">BOOL</option>" + 
                                      "<option value=\"byte\">BYTE</option>" + 
                                      "<option value=\"date_and_time\">DATE_AND_TIME</option>" + 
                                      "<option value=\"dint\">DINT</option>" + 
                                      "<option value=\"word\">DWORD</option>" + 
                                      "<option value=\"int\">INT</option>" + 
                                      "<option value=\"lint\">LINT</option>" + 
                                      "<option value=\"lreal\">LREAL</option>" + 
                                      "<option value=\"lword\">LWORD</option>" + 
                                      "<option value=\"real\">REAL</option>" + 
                                      "<option value=\"sint\">SINT</option>" + 
                                      "<option value=\"string\">STRING</option>" + 
                                      "<option value=\"time\">TIME</option>" + 
                                      "<option value=\"udint\">UDINT</option>" + 
                                      "<option value=\"uint\">UINT</option>" + 
                                      "<option value=\"ulint\">ULINT</option>" + 
                                      "<option value=\"usint\">USINT</option>" + 
                                      "<option value=\"word\">WORD</option>" + 
                                      "<option value=\"wstring\">WSTRING</option>" + 
                                     "</select>" +
            "<input id=\"txtExternalVarableDependence##number##\" type=\"txt\" onfocus=\"this.value=''\" value=\"Enter event value here\"  name=\"link\" />" +
            "<input type=\"button\" onclick=\"removeexternalVarable(##number##)\" id=\"btnRemoveexternalVarable##number##\" value=\" - \"/> </div>";
        document.getElementById("externalVarablePanel").innerHTML = "";
         
            //var externalVarableid = "";
           // var s = "";
            var n = 1;
            //get number from externalVarableNumber
            var newline = s.replace(/##number##/g, n);
            document.getElementById("externalVarablePanel").insertAdjacentHTML("beforeEnd", newline);
                 
            var t = document.getElementById('externalVarable_list').innerHTML; //.options.add(opt);
            t += " <option value=\"externalVarable" + n + "\"  />";
            document.getElementById('externalVarable_list').innerHTML = t;
         
            
    // var lastExternalVarableDiv = "ExternalVarableDiv" + (externalVarableNubers - 1);
    //document.getElementById(lastExternalVarableDiv).insertAdjacentHTML("afterEnd", s);
    //document.getElementById("url_list")

    // var options = externalVarable_list.getElementsByTagName("option");
    // externalVarable_list.appendChild(" <option value=\"externalVarable" + externalVarableNubers + "\"  />");
    // var opt = document.createElement('option');
    // opt.value = "externalVarable" + externalVarableNubers; 
            
}
        
 