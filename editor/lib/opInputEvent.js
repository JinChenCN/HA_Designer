
var inputEventNubers = 1;

function addInputEvent()
{
    inputEventNubers++;
    var s = "<div id=\"inputEventDiv##number##\">" +
    "<label id=\"lblinputEvent##number##\"> Input Event ##number## </label> <input style=\"width:200px\" onfocus=\"this.value=''\" value=\"Enter event name here\" id=\"txtinputEvent##number##\" /> " +
    "<select id=\"inputEventValueType##number##\"> " + 
                                      "<option value=\"any\">ANY</option>" + 
                                      "<option value=\"saab\">BOOL</option>" + 
                                      "<option value=\"opel\">BYTE</option>" + 
                                      "<option value=\"audi\">DATE_AND_TIME</option>" + 
                                      "<option value=\"any\">DINT</option>" + 
                                      "<option value=\"saab\">DWORD</option>" + 
                                      "<option value=\"opel\">INT</option>" + 
                                      "<option value=\"audi\">LINT</option>" + 
                                      "<option value=\"any\">LREAL</option>" + 
                                      "<option value=\"saab\">LWORD</option>" + 
                                      "<option value=\"opel\">REAL</option>" + 
                                      "<option value=\"audi\">SINT</option>" + 
                                      "<option value=\"any\">STRING</option>" + 
                                      "<option value=\"saab\">TIME</option>" + 
                                      "<option value=\"opel\">UDINT</option>" + 
                                      "<option value=\"audi\">UINT</option>" + 
                                      "<option value=\"any\">ULINT</option>" + 
                                      "<option value=\"saab\">USINT</option>" + 
                                      "<option value=\"opel\">WORD</option>" + 
                                      "<option value=\"audi\">WSTRING</option>" + 
                                     "</select>" +
        "<input id=\"txtinputEventDependence##number##\" style=\"width:150px\" onfocus=\"this.value=''\" value=\"Enter event value here\" type=\"txt\" name=\"link\" /> " +
        "<input type=\"button\" style=\"width:40px\" onclick=\"removeinputEvent(##number##)\" id=\"btnRemoveinputEvent##number##\" value=\" - \"/> </div>";
    s = s.replace(/##number##/g, inputEventNubers);
    var lastinputEventDiv = "inputEventDiv" + (inputEventNubers-1);
    document.getElementById(lastinputEventDiv).insertAdjacentHTML("afterEnd", s);
    //document.getElementById("url_list")
         
    // var options = inputEvent_list.getElementsByTagName("option");
    // inputEvent_list.appendChild(" <option value=\"inputEvent" + inputEventNubers + "\"  />");
    // var opt = document.createElement('option');
    // opt.value = "inputEvent" + inputEventNubers; 
    var t = document.getElementById('inputEvent_list').innerHTML; //.options.add(opt);
    t += " <option value=\"Input Event" + inputEventNubers + "\"  />";
    document.getElementById('inputEvent_list').innerHTML = t;
}
function removeinputEvent(num)
{
    document.getElementById("txtinputEvent" + num).value = "";
    document.getElementById("inputEventDiv" + num).style.display = "none";
}
function collectinputEventStr1()
{
    // {inputEvents:[{id:inputEvent1,value:xxx,inputEventDependency:inputEvent2},{}]}
    var s = "{\"inputEvent\":{\"number\":\"" + inputEventNubers  + "\",\"inputEvents\":[";
    for (var i = 1; i <= inputEventNubers; i++)
    {
        if (i > 1)
        {
            s += ",";
        }
        if (document.getElementById("txtinputEvent" + i).value == "")
        {
            continue;
        }
        var inputEventId = document.getElementById("lblinputEvent" + i).innerHTML;
                
        var inputEventValue = document.getElementById("txtinputEvent" + i).value;
        var inputEventValueType = document.getElementById("inputEventValueType" + i).value;
        var inputEventDependency = document.getElementById("txtinputEventDependence" + i).value;
        s += "{\"id\":\"" + inputEventId.trim() + "\",\"value\":\"" + inputEventValue.trim() + "\",\"inputEventValueType\":\"" + inputEventValueType.trim() + "\",\"inputEventDependency\":\"" + inputEventDependency.trim() + "\"}";
    }
            

    var s = s + "]}}";
    var serializedDiagram = JSON.stringify(s)
    return serializedDiagram;
    //document.getElementById("txtjson").value = s;
}

function collectinputEventStr() {
    // {inputEvents:[{id:inputEvent1,value:xxx,inputEventDependency:inputEvent2},{}]}
    var s = "{'inputEvent':[{'number':'" + inputEventNubers + "'},{'inputEvents':[";
    for (var i = 1; i <= inputEventNubers; i++) {
        if (i > 1) {
            s += ",";
        }
        if (document.getElementById("txtinputEvent" + i).value == "") {
            continue;
        }
        var inputEventId = document.getElementById("lblinputEvent" + i).innerHTML;

        var inputEventValue = document.getElementById("txtinputEvent" + i).value;
        var inputEventValueType = document.getElementById("inputEventValueType" + i).value;
        var inputEventDependency = document.getElementById("txtinputEventDependence" + i).value;
        s += "{'id':'" + inputEventId.trim() + "','value':'" + inputEventValue.trim() + "\",\"inputEventValueType\":\"" + inputEventValueType.trim() + "','inputEventDependency':'" + inputEventDependency.trim() + "'}";
    }


    var s = s + "]}]}";
   // var serializedDiagram = JSON.stringify(s)
    return s;
    //document.getElementById("txtjson").value = s;
}

function collectinputEventStr11() {
    // {inputEvents:[{id:inputEvent1,value:xxx,inputEventDependency:inputEvent2},{}]}
    var s = "{##xx##inputEvent##xx##:{##xx##number##xx##:##xx##" + inputEventNubers + "##xx##,##xx##inputEvents##xx##:[";
    for (var i = 1; i <= inputEventNubers; i++) {
        if (i > 1) {
            s += ",";
        }
        if (document.getElementById("txtinputEvent" + i).value == "") {
            continue;
        }
        var inputEventId = document.getElementById("lblinputEvent" + i).innerHTML;

        var inputEventValue = document.getElementById("txtinputEvent" + i).value;
        var inputEventValueType = document.getElementById("inputEventValueType" + i).value;
        var inputEventDependency = document.getElementById("txtinputEventDependence" + i).value;
        s += "{##xx##id##xx##:##xx##" + inputEventId.trim() + "##xx##,##xx##value##xx##:##xx##" + inputEventValue.trim() + "\",\"##xx##,##xx##inputEventValueType##xx##:##xx##\":\"" + inputEventValueType.trim() + "##xx##,##xx##inputEventDependency##xx##:##xx##" + inputEventDependency.trim() + "##xx##}";
    }


    var s = s + "]}}";
    //var serializedDiagram = JSON.stringify(s)
    return s;
    //document.getElementById("txtjson").value = s;
}

function collectinputEventStr2() {
    // {inputEvents:[{id:inputEvent1,value:xxx,inputEventDependency:inputEvent2},{}]}
    var s = "{inputEvent:{number:" + inputEventNubers + ",inputEvents:[";
    for (var i = 1; i <= inputEventNubers; i++) {
        if (i > 1) {
            s += ",";
        }
        if (document.getElementById("txtinputEvent" + i).value == "") {
            continue;
        }
        var inputEventId = document.getElementById("lblinputEvent" + i).innerHTML;

        var inputEventValue = document.getElementById("txtinputEvent" + i).value;
        var inputEventValueType = document.getElementById("inputEventValueType" + i).value;
        var inputEventDependency = document.getElementById("txtinputEventDependence" + i).value;
        s += "{id:" + inputEventId.trim() + ",value:" + inputEventValue.trim() + ",inputEventValueType:" + inputEventValueType.trim()+ ",inputEventDependency:" + inputEventDependency.trim() + "}";
    }


    var s = s + "]}}";
     
    return s;
    //document.getElementById("txtjson").value = s;
}

function reRenderinputEvent(obj) {
    //var data = returnMinputEventlInfoInJasonFormat();
    //data = JSON.parse(data);
    if (obj== null || obj.length<1 || obj[1].inputEvents == undefined || obj[1].inputEvents == null) {
        return;
    }
    inputEventNubers = obj[0].number;

    var obj = obj[1];
    var num = obj.inputEvents.length;
    var s = "<div id=\"inputEventDiv##number##\">" +
    "<label id=\"lblinputEvent##number##\"> Input Event ##number## </label> <input style=\"width:200px\" onfocus=\"this.value=''\" value=\"Enter event name here\" id=\"txtinputEvent##number##\" /> " +
    "<select id=\"inputEventValueType##number##\"> " + 
                                      "<option value=\"any\">ANY</option>" + 
                                      "<option value=\"saab\">BOOL</option>" + 
                                      "<option value=\"opel\">BYTE</option>" + 
                                      "<option value=\"audi\">DATE_AND_TIME</option>" + 
                                      "<option value=\"any\">DINT</option>" + 
                                      "<option value=\"saab\">DWORD</option>" + 
                                      "<option value=\"opel\">INT</option>" + 
                                      "<option value=\"audi\">LINT</option>" + 
                                      "<option value=\"any\">LREAL</option>" + 
                                      "<option value=\"saab\">LWORD</option>" + 
                                      "<option value=\"opel\">REAL</option>" + 
                                      "<option value=\"audi\">SINT</option>" + 
                                      "<option value=\"any\">STRING</option>" + 
                                      "<option value=\"saab\">TIME</option>" + 
                                      "<option value=\"opel\">UDINT</option>" + 
                                      "<option value=\"audi\">UINT</option>" + 
                                      "<option value=\"any\">ULINT</option>" + 
                                      "<option value=\"saab\">USINT</option>" + 
                                      "<option value=\"opel\">WORD</option>" + 
                                      "<option value=\"audi\">WSTRING</option>" + 
                                     "</select>" +
        "<input id=\"txtinputEventDependence##number##\" style=\"width:150px\" type=\"txt\" onfocus=\"this.value=''\" value=\"Enter event value here\" name=\"link\" /> " + 
        "<input type=\"button\" style=\"width:40px\" onclick=\"removeinputEvent(##number##)\" id=\"btnRemoveinputEvent##number##\" value=\" - \"/> </div>";
    document.getElementById("inputEventPanel").innerHTML = "";
    for (var i = 0; i < num; i++) {
        var inputEventid = obj.inputEvents[i].id;
        //var s = inputEventid;
        var n = inputEventid.substring(3);
        //get number from inputEventNumber
        var newline = s.replace(/##number##/g, n);
        document.getElementById("inputEventPanel").insertAdjacentHTML("beforeEnd", newline);

        document.getElementById("lblinputEvent" + n).innerHTML = inputEventid;
        document.getElementById("txtinputEvent" + n).value = obj.inputEvents[i].value;
        document.getElementById("inputEventValueType" + n).value = obj.inputEvents[i].inputEventValueType;
        document.getElementById("txtinputEventDependence" + n).value = obj.inputEvents[i].inputEventDependency;

        var t = document.getElementById('inputEvent_list').innerHTML; //.options.add(opt);
        t += " <option value=\"inputEvent" + n + "\"  />";
        document.getElementById('inputEvent_list').innerHTML = t;
    }
}
       
    function initinputEvent()
    {
         
        inputEventNubers = 1;
        document.getElementById('inputEvent_list').innerHTML = "";

        var s = "<div id=\"inputEventDiv##number##\">" +
        "<label id=\"lblinputEvent##number##\"> inputEvent##number## </label> <input id=\"txtinputEvent##number##\" /> " +
        "<select id=\"inputEventValueType##number##\"> " + 
                                      "<option value=\"any\">ANY</option>" + 
                                      "<option value=\"saab\">BOOL</option>" + 
                                      "<option value=\"opel\">BYTE</option>" + 
                                      "<option value=\"audi\">DATE_AND_TIME</option>" + 
                                      "<option value=\"any\">DINT</option>" + 
                                      "<option value=\"saab\">DWORD</option>" + 
                                      "<option value=\"opel\">INT</option>" + 
                                      "<option value=\"audi\">LINT</option>" + 
                                      "<option value=\"any\">LREAL</option>" + 
                                      "<option value=\"saab\">LWORD</option>" + 
                                      "<option value=\"opel\">REAL</option>" + 
                                      "<option value=\"audi\">SINT</option>" + 
                                      "<option value=\"any\">STRING</option>" + 
                                      "<option value=\"saab\">TIME</option>" + 
                                      "<option value=\"opel\">UDINT</option>" + 
                                      "<option value=\"audi\">UINT</option>" + 
                                      "<option value=\"any\">ULINT</option>" + 
                                      "<option value=\"saab\">USINT</option>" + 
                                      "<option value=\"opel\">WORD</option>" + 
                                      "<option value=\"audi\">WSTRING</option>" + 
                                     "</select>" +
            "<input id=\"txtinputEventDependence##number##\" type=\"txt\" onfocus=\"this.value=''\" value=\"Enter event value here\"  name=\"link\" />" +
            "<input type=\"button\" onclick=\"removeinputEvent(##number##)\" id=\"btnRemoveinputEvent##number##\" value=\" - \"/> </div>";
        document.getElementById("inputEventPanel").innerHTML = "";
         
            //var inputEventid = "";
           // var s = "";
            var n = 1;
            //get number from inputEventNumber
            var newline = s.replace(/##number##/g, n);
            document.getElementById("inputEventPanel").insertAdjacentHTML("beforeEnd", newline);
                 
            var t = document.getElementById('inputEvent_list').innerHTML; //.options.add(opt);
            t += " <option value=\"inputEvent" + n + "\"  />";
            document.getElementById('inputEvent_list').innerHTML = t;
         
            
    // var lastinputEventDiv = "inputEventDiv" + (inputEventNubers - 1);
    //document.getElementById(lastinputEventDiv).insertAdjacentHTML("afterEnd", s);
    //document.getElementById("url_list")

    // var options = inputEvent_list.getElementsByTagName("option");
    // inputEvent_list.appendChild(" <option value=\"inputEvent" + inputEventNubers + "\"  />");
    // var opt = document.createElement('option');
    // opt.value = "inputEvent" + inputEventNubers; 
            
}
        
 