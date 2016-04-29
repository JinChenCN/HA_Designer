
var inputEventNubers = 1;

function addInputEvent()
{
    inputEventNubers++;
    var s = "<div id=\"inputEventDiv##number##\">" +
    "<label id=\"lbinputEvent##number##\"> Input Event ##number## </label>"+
        "<select id=\"inputEventType##number##\"> " + 
                                      "<option value=\"Event\">EVENT</option>" +
                                      "<option value=\"Any\">ANY</option>" + 
                                      "<option value=\"Custom\">CUSTOM</option>" +                                     
                                     "</select>" +
    " <input style=\"width:100px\" id=\"txtinputEvent##number##\" onchange=\"checkEventNames(this)\" /> " +
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
      if (document.getElementById("txtExternalVarableInput" + i) == null|| document.getElementById("ExternalVarableInputDiv" + i).style.display == "none") 
        {continue;}
      var addValue = "<input type=\"checkbox\" id=\"inputEventValue" + inputEventNubers + 
      "variable##number##\" name=\"ExternalVarableInput##number##\" value=\"ExternalVarableInput##number##\"><label id=\"lbinputEventValue" + 
      inputEventNubers + "check##number##\">External Varable Input ##number##<br></label>";
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
        var variableValues = "";
        var variablesId = [];
        for (var j = 1; j <= 20; j++) {
          if (document.getElementById("txtExternalVarableInput" + j) == null) 
            {continue;}
          var isAssociated = document.getElementById("inputEventValue" + i + "variable" + j).checked;
          if(isAssociated)
          {
            variablesId.push(document.getElementById("inputEventValue" + i + "variable" + j).name);
          }
        }

        if (variablesId != [])
        {
          for (var k=0; k<variablesId.length;k++)
          {
            var typeId = variablesId[k].insert(variablesId[k].length-1, "ValueType");
            var variableType = document.getElementById(typeId).value;
            var nameId = "txt"+variablesId[k];
            var variableName = document.getElementById(nameId).value;
            var valueId = "txt"+variablesId[k].insert(variablesId[k].length-1, "Value");
            var varibaleValue = document.getElementById(valueId).value;

            variableValues += "{\"variableType\":\"" + variableType + "\",\"variableName\":\"" + variableName + "\",\"varibaleValue\":\"" + varibaleValue + "\"}";
            
            if(k != variablesId.length-1)
            {
              variableValues += ",";
            }            
          }
        }
        s += "{\"id\":\"" + inputEventId.trim() + "\",\"eventType\":\"" + inputEventType.trim() + "\",\"eventName\":\"" + 
        inputEventName.trim() + "\" ,\"variables\": ["+ variableValues + "]}";
        if ((document.getElementById("txtinputEvent" + (i+1)) != null) && (document.getElementById("txtinputEvent" + (i+1)).value != "")) 
          { s += ",";}
    }


    var s = s + "]},";

   // var serializedDiagram = JSON.stringify(s)
    return s;
    //document.getElementById("txtjson").value = s;
}
     

//Helper   
String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};
 