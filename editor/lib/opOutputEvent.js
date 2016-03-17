
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
    "<input style=\"width:200px\" id=\"txtoutputEvent##number##\" /> " +
        "<input type=\"button\" style=\"width:50px\" onclick=\"removeoutputEvent(##number##)\" id=\"btnRemoveoutputEvent##number##\" value=\" Delete \"/> </div>";
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
        var outputEventId = document.getElementById("lboutputEvent" + i).id;
        var outputEventType = document.getElementById("outputEventType" + i).value;
        var outputEventName = document.getElementById("txtoutputEvent" + i).value;
        s += "{\"id\":\"" + outputEventId.trim() + "\",\"eventType\":\"" + outputEventType.trim() + "\",\"eventName\":\"" + outputEventName.trim() + "\"}";
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
        
 