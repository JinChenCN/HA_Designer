
var inputEventNubers = 1;

function addInputEvent()
{
    inputEventNubers++;
    var s = "<div id=\"inputEventDiv##number##\">" +
    "<label id=\"lbinputEvent##number##\"> Input Event ##number## </label>"+
        "<select id=\"inputEventType##number##\"> " + 
                                      "<option value=\"event\">EVENT</option>" +
                                      "<option value=\"any\">ANY</option>" + 
                                      "<option value=\"custom\">CUSTOM</option>" +                                     
                                     "</select>" +
    " <input style=\"width:200px\" id=\"txtinputEvent##number##\" /> " +
        "<input type=\"button\" style=\"width:50px\" onclick=\"removeinputEvent(##number##)\" id=\"btnRemoveinputEvent##number##\" value=\" Delete \"/> </div>";
    s = s.replace(/##number##/g, inputEventNubers);
    var lastinputEventDiv = "inputEventDiv" + (inputEventNubers-1);
    document.getElementById(lastinputEventDiv).insertAdjacentHTML("afterEnd", s);

    var v = "<div id=\"inputEventValues##number##\", style=\"padding-left:30px\">" +
         " <label> Associated Values: </label> <br>";
     v = v.replace(/##number##/g, inputEventNubers);
    var valueDiv = document.getElementById('inputEventDiv' + inputEventNubers);
      valueDiv.innerHTML = valueDiv.innerHTML + v;

    for (var i = 1; i <= 20; i++) {
      if (document.getElementById("txtExternalVarableInput" + i) == null) 
        {continue;}
      var addValue = "<input type=\"checkbox\" id=\"inputEventValue" + inputEventNubers + "variable##number##\" name=\"ExternalVarableInput##number##\" value=\"ExternalVarableInput##number##\"><label name=\"lbinputEventValue##number##\">External Varable Input ##number##<br></label>";
      addValue = addValue.replace(/##number##/g, i);
      var valueDiv = document.getElementById('inputEventValues' + inputEventNubers);
      valueDiv.innerHTML = valueDiv.innerHTML + addValue;
    }
}


function removeinputEvent(num)
{
    document.getElementById("txtinputEvent" + num).value = "";
    document.getElementById("inputEventDiv" + num).style.display = "none";
}


function collectinputEventStr() {
    // {inputEvents:[{id:inputEvent1,value:xxx,inputEventDependency:inputEvent2},{}]}
    var s = "{\"inputEvents\":[";
    for (var i = 1; i <= inputEventNubers; i++) {

        if (document.getElementById("txtinputEvent" + i).value == "") {
            if ( (i!=1) && (document.getElementById("txtinputEvent" + (i+1)) != null) && (document.getElementById("txtinputEvent" + (i+1)).value != "")) 
              { s += ",";}
            continue;
        }
        var inputEventId = document.getElementById("lbinputEvent" + i).id;
        var inputEventType = document.getElementById("inputEventType" + i).value;
        var inputEventName = document.getElementById("txtinputEvent" + i).value;       
        s += "{\"id\":\"" + inputEventId.trim() + "\",\"eventType\":\"" + inputEventType.trim() + "\",\"eventName\":\"" + inputEventName.trim() + "\"}";
                    if ((document.getElementById("txtinputEvent" + (i+1)) != null) && (document.getElementById("txtinputEvent" + (i+1)).value != "")) 
              { s += ",";}
    }


    var s = s + "]},";
   // var serializedDiagram = JSON.stringify(s)
    return s;
    //document.getElementById("txtjson").value = s;
}
        
 