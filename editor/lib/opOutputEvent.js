
var outputEventNubers = 1;

function addoutputEvent()
{
    outputEventNubers++;
    var s = "<div id=\"outputEventDiv##number##\">" +
    "<label id=\"lboutputEvent##number##\"> Output Event ##number## </label> " + 
        "<select id=\"outputEventType##number##\"> " + 
                                      "<option value=\"event\">EVENT</option>" +
                                      "<option value=\"any\">ANY</option>" + 
                                      "<option value=\"custom\">CUSTOM</option>" +                                     
                                     "</select>" +
    "<input style=\"width:200px\" onfocus=\"this.value=''\" value=\"Enter event name here\" id=\"txtoutputEvent##number##\" /> " +
"<select id=\"outputEventValueType##number##\"> " + 
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
        "<input id=\"txtoutputEventDependence##number##\" style=\"width:150px\" onfocus=\"this.value=''\" value=\"Enter event value here\" type=\"txt\" name=\"link\" /> " +
        "<input type=\"button\" style=\"width:40px\" onclick=\"removeoutputEvent(##number##)\" id=\"btnRemoveoutputEvent##number##\" value=\" - \"/> </div>";
    s = s.replace(/##number##/g, outputEventNubers);
    var lastoutputEventDiv = "outputEventDiv" + (outputEventNubers-1);
    document.getElementById(lastoutputEventDiv).insertAdjacentHTML("afterEnd", s);
    //document.getElementById("url_list")
         
    // var options = outputEvent_list.getElementsByTagName("option");
    // outputEvent_list.appendChild(" <option value=\"outputEvent" + outputEventNubers + "\"  />");
    // var opt = document.createElement('option');
    // opt.value = "outputEvent" + outputEventNubers; 
    var t = document.getElementById('outputEvent_list').innerHTML; //.options.add(opt);
    t += " <option value=\"Input Event" + outputEventNubers + "\"  />";
    document.getElementById('outputEvent_list').innerHTML = t;
}
function removeoutputEvent(num)
{
    document.getElementById("txtoutputEvent" + num).value = "";
    document.getElementById("outputEventDiv" + num).style.display = "none";
}


function collectoutputEventStr() {
    // {outputEvents:[{id:outputEvent1,value:xxx,outputEventDependency:outputEvent2},{}]}
    var s = "{\"outputEvents\":[";
    for (var i = 1; i <= outputEventNubers; i++) {
        if (document.getElementById("txtoutputEvent" + i).value == "") {                
        if ( (i!=1) && (document.getElementById("txtoutputEvent" + (i+1)) != null) && (document.getElementById("txtoutputEvent" + (i+1)).value != "")) 
        {
            s += ",";
        }
            continue;
        }
        var outputEventId = document.getElementById("lboutputEvent" + i).innerHTML;
        var outputEventType = document.getElementById("outputEventType" + i).value;
        var outputEventValue = document.getElementById("txtoutputEvent" + i).value;
        var outputEventValueType = document.getElementById("outputEventValueType" + i).value;
        var outputEventDependency = document.getElementById("txtoutputEventDependence" + i).value;
        s += "{\"id\":\"" + outputEventId.trim() + "\",\"eventType\":\"" + outputEventType.trim() + "\",\"eventName\":\"" + outputEventValue.trim() + "\",\"outputEventValueType\":\"" + outputEventValueType.trim() + "\",\"outputEventDependency\":\"" + outputEventDependency.trim() + "\"}";
        if ((document.getElementById("txtoutputEvent" + (i+1)) != null) && (document.getElementById("txtoutputEvent" + (i+1)).value != "")) 
        {
            s += ",";
        }
    }


    var s = s + "]}";
   // var serializedDiagram = JSON.stringify(s)
    return s;
    //document.getElementById("txtjson").value = s;
}


function reRenderoutputEvent(obj) {
    //var data = returnMoutputEventlInfoInJasonFormat();
    //data = JSON.parse(data);
    if (obj== null || obj.length<1 || obj[1].outputEvents == undefined || obj[1].outputEvents == null) {
        return;
    }
    outputEventNubers = obj[0].number;

    var obj = obj[1];
    var num = obj.outputEvents.length;
    var s = "<div id=\"outputEventDiv##number##\">" +
    "<label id=\"lbloutputEvent##number##\"> Input Event ##number## </label> <input style=\"width:200px\" onfocus=\"this.value=''\" value=\"Enter event name here\" id=\"txtoutputEvent##number##\" /> " +
    "<select id=\"outputEventValueType##number##\"> " + 
                                      "<option value=\"event\">EVENT</option>" +
                                      "<option value=\"any\">ANY</option>" + 
                                      "<option value=\"custom\">CUSTOM</option>" +                                     
                                     "</select>" +
        "<input id=\"txtoutputEventDependence##number##\" style=\"width:150px\" type=\"txt\" onfocus=\"this.value=''\" value=\"Enter event value here\" name=\"link\" /> " + 
        "<input type=\"button\" style=\"width:40px\" onclick=\"removeoutputEvent(##number##)\" id=\"btnRemoveoutputEvent##number##\" value=\" - \"/> </div>";
    document.getElementById("outputEventPanel").innerHTML = "";
    for (var i = 0; i < num; i++) {
        var outputEventid = obj.outputEvents[i].id;
        //var s = outputEventid;
        var n = outputEventid.substring(3);
        //get number from outputEventNumber
        var newline = s.replace(/##number##/g, n);
        document.getElementById("outputEventPanel").insertAdjacentHTML("beforeEnd", newline);

        document.getElementById("lbloutputEvent" + n).innerHTML = outputEventid;
        document.getElementById("txtoutputEvent" + n).value = obj.outputEvents[i].value;
        document.getElementById("outputEventValueType" + n).value = obj.outputEvents[i].outputEventValueType;
        document.getElementById("txtoutputEventDependence" + n).value = obj.outputEvents[i].outputEventDependency;

        var t = document.getElementById('outputEvent_list').innerHTML; //.options.add(opt);
        t += " <option value=\"outputEvent" + n + "\"  />";
        document.getElementById('outputEvent_list').innerHTML = t;
    }
}
       
    function initoutputEvent()
    {
         
        outputEventNubers = 1;
        document.getElementById('outputEvent_list').innerHTML = "";

        var s = "<div id=\"outputEventDiv##number##\">" +
        "<label id=\"lbloutputEvent##number##\"> outputEvent##number## </label> " + 
        "<select id=\"outputEventValueType##number##\"> " + 
                                      "<option value=\"any\">ANY</option>" + 
                                      "<option value=\"event\">EVENT</option>" +
                                      "<option value=\"any\">ANY</option>" + 
                                      "<option value=\"custom\">CUSTOM</option>" +                                     
                                     "</select>" +
        " <input id=\"txtoutputEvent##number##\" /> " +
         "<select id=\"outputEventValueType##number##\"> " + 
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
        
            "<input id=\"txtoutputEventDependence##number##\" type=\"txt\" onfocus=\"this.value=''\" value=\"Enter event value here\"  name=\"link\" />" +
            "<input type=\"button\" onclick=\"removeoutputEvent(##number##)\" id=\"btnRemoveoutputEvent##number##\" value=\" - \"/> </div>";
        document.getElementById("outputEventPanel").innerHTML = "";
         
            //var outputEventid = "";
           // var s = "";
            var n = 1;
            //get number from outputEventNumber
            var newline = s.replace(/##number##/g, n);
            document.getElementById("outputEventPanel").insertAdjacentHTML("beforeEnd", newline);
                 
            var t = document.getElementById('outputEvent_list').innerHTML; //.options.add(opt);
            t += " <option value=\"outputEvent" + n + "\"  />";
            document.getElementById('outputEvent_list').innerHTML = t;
         
            
    // var lastoutputEventDiv = "outputEventDiv" + (outputEventNubers - 1);
    //document.getElementById(lastoutputEventDiv).insertAdjacentHTML("afterEnd", s);
    //document.getElementById("url_list")

    // var options = outputEvent_list.getElementsByTagName("option");
    // outputEvent_list.appendChild(" <option value=\"outputEvent" + outputEventNubers + "\"  />");
    // var opt = document.createElement('option');
    // opt.value = "outputEvent" + outputEventNubers; 
            
}
        
 