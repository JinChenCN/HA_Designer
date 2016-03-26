
var outputEventNubers = 1;

var OutEventNames = [];
function checkOutEventNames(input) {
    var name = input.value;
    if (name != "")
    {
        if (OutEventNames.indexOf(name) >= 0) {
            alert("This event name has already existed, please input a new one!");
            input.value = "";
            return false;
    }
    OutEventNames.push(name);
    return true;

    }    
}

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
    "<input style=\"width:100px\" id=\"txtoutputEvent##number##\" onchange=\"checkOutEventNames(this)\"/> " +
        "<input type=\"button\" style=\"width:50px\" onclick=\"removeoutputEvent(##number##)\" id=\"btnRemoveoutputEvent##number##\" value=\" Delete \"/> </div>";
         
    s = s.replace(/##number##/g, outputEventNubers);
    var lastoutputEventDiv = "outputEventDiv" + (outputEventNubers-1);
    document.getElementById(lastoutputEventDiv).insertAdjacentHTML("afterEnd", s);

    var v = "<div id=\"outputEventValues##number##\", style=\"padding-left:30px\">" +
         " <label> Associated Values: </label> <br>";
     v = v.replace(/##number##/g, outputEventNubers);
    var valueDiv = document.getElementById('outputEventDiv' + outputEventNubers);
      valueDiv.innerHTML = valueDiv.innerHTML + v;

    for (var i = 1; i <= 20; i++) {
      if (document.getElementById("txtExternalVarableOutput" + i) == null || document.getElementById("ExternalVarableOutputDiv" + i).style.display == "none") 
        {continue;}
      var addValue = "<input type=\"checkbox\" id=\"outputEventValue" + outputEventNubers + 
      "variable##number##\" name=\"ExternalVarableOutput##number##\" value=\"ExternalVarableOutput##number##\"><label id=\"lboutputEventValue"+ outputEventNubers + 
      "check##number##\">External Varable Output ##number##<br></label>";
      addValue = addValue.replace(/##number##/g, i);

      var valueDiv = document.getElementById('outputEventValues' + outputEventNubers);
      valueDiv.innerHTML = valueDiv.innerHTML + addValue;
    }
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
        var variableValues = "";
        var variablesId = [];
        for (var j = 1; j <= 20; j++) {
          if (document.getElementById("txtExternalVarableOutput" + j) == null) 
            {continue;}
          var isAssociated = document.getElementById("outputEventValue" + i + "variable" + j).checked;
          if(isAssociated)
          {
            variablesId.push(document.getElementById("outputEventValue" + i + "variable" + j).name);
          }
        }

        if (variablesId != [])
        {
          for (var k=0; k<variablesId.length;k++)
          {
            var typeId = variablesId[k].insert(variablesId[k].length-1, "ValueType");
            var variableType = document.getElementById(typeId).value;
            var nameId = "txt"+variablesId[k];
            var varibaleName = document.getElementById(nameId).value;
            var valueId = "txt"+ variablesId[k].insert(variablesId[k].length-1, "Value");
            var varibaleValue = document.getElementById(valueId).value;
            variableValues += "{\"variableType\":\"" + variableType + "\",\"varibaleName\":\"" + varibaleName + "\",\"varibaleValue\":\"" + varibaleValue + "\"}";
            if(k != variablesId.length-1)
            {
              variableValues += ",";
            }            
          }
        }

        s += "{\"id\":\"" + outputEventId.trim() + "\",\"eventType\":\"" + outputEventType.trim() + 
        "\",\"eventName\":\"" + outputEventName.trim() + "\" ,\"variables\": ["+ variableValues  + "]}";
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

//Helper   
String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};   
        
 