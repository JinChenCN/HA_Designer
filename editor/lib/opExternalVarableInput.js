﻿
var externalVarableInputNumbers = 1;

function addExternalVarableInput()
{
    externalVarableInputNumbers++;
    var s = "<div id=\"ExternalVarableInputDiv##number##\">" +
    "<label id=\"lbExternalVarableInput##number##\"> External Varable Input ##number## </label> " +
    "<select id=\"ExternalVarableInputValueType##number##\"> " + 
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
        "<input id=\"txtExternalVarableInput##number##\" style=\"width:200px\" type=\"txt\" name=\"link\" /> " +
        "<input type=\"button\" style=\"width:50px\" onclick=\"removeExternalVarableInput(##number##)\" id=\"btnExternalVarableInput##number##\" value=\" Delete \"/> </div>";
    s = s.replace(/##number##/g, externalVarableInputNumbers);
    var lastExternalVarableInputDiv = "ExternalVarableInputDiv" + (externalVarableInputNumbers-1);
    document.getElementById(lastExternalVarableInputDiv).insertAdjacentHTML("afterEnd", s);

    for (var i = 1; i <= 20; i++) {
      if (document.getElementById("txtinputEvent" + i) == null) {continue;}
      var addValue = "<input type=\"checkbox\" id=\"inputEventValue" + i + "variable##number##\" name=\"ExternalVarableInput##number##\" value=\"ExternalVarableInput##number##\"><label name=\"lbinputEventValue##number##\">External Varable Input ##number##<br></label>";
      addValue = addValue.replace(/##number##/g, externalVarableInputNumbers);
      var valueDiv = document.getElementById('inputEventValues' + i);
      valueDiv.innerHTML = valueDiv.innerHTML + addValue;
    }
}

function removeExternalVarableInput(num)
{
    document.getElementById("txtExternalVarableInput" + num).value = "";
    document.getElementById("ExternalVarableInputDiv" + num).style.display = "none";
    for (var i = 0; i < document.getElementsByName("lbinputEventValue" + num).length; i++) {
      document.getElementsByName("lbinputEventValue" + num)[i].remove();
    }
    //document.getElementsByName("lbinputEventValue" + num).remove();
    for (var i = 0; i < document.getElementsByName("ExternalVarableInput" + num).length; i++) {
      document.getElementsByName("ExternalVarableInput" + num)[i].remove();
    }
    //document.getElementsByName("ExternalVarableInput" + num).remove();
}

function collectExternalVarableInputStr() {
    // {externalVarables:[{id:externalVarable1,value:xxx,externalVarableDependency:externalVarable2},{}]}
    var s = "{\"ExternalVarableInput\":[";
    for (var i = 1; i <= externalVarableInputNumbers; i++) {

        if (document.getElementById("txtExternalVarableInput" + i).value == "") {
                  if ( (i!=1) && (document.getElementById("txtExternalVarableInput" + (i+1)) != null) && (document.getElementById("txtExternalVarableInput" + (i+1)).value != "")) {
            s += ",";
        }
            continue;
        }
        var externalVarableId = document.getElementById("lbExternalVarableInput" + i).id;
        var ExternalVarableInputValueType = document.getElementById("ExternalVarableInputValueType" + i).value;
        var externalVarableValue = document.getElementById("txtExternalVarableInput" + i).value;
        s += "{\"id\":\"" + externalVarableId.trim() + "\",\"Type\":\"" + ExternalVarableInputValueType.trim() + "\",\"value\":\"" + externalVarableValue.trim() + "\"}";
         if ( (document.getElementById("txtExternalVarableInput" + (i+1)) != null) && (document.getElementById("txtExternalVarableInput" + (i+1)).value != "")) {
            s += ",";}
    }


    var s = s + "]},";
   // var serializedDiagram = JSON.stringify(s)
    return s;
    //document.getElementById("txtjson").value = s;
}

        
 