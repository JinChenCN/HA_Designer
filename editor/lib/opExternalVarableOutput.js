﻿
var ExternalVarableOutputNumbers = 1;

function addExternalVarableOutput()
{
    ExternalVarableOutputNumbers++;
    var s = "<div id=\"ExternalVarableOutputDiv##number##\">" +
    "<label id=\"lbExternalVarableOutput##number##\"> External Varable Output ##number## </label> " +
    "<select id=\"ExternalVarableOutputValueType##number##\"> " + 
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
        "<input id=\"txtExternalVarableOutput##number##\" style=\"width:200px\" type=\"txt\" name=\"link\" /> " +
        "<input type=\"button\" style=\"width:50px\" onclick=\"removeExternalVarableOutput(##number##)\" id=\"btnExternalVarableOutput##number##\" value=\" Delete \"/> </div>";
    s = s.replace(/##number##/g, ExternalVarableOutputNumbers);
    var lastExternalVarableOutputDiv = "ExternalVarableOutputDiv" + (ExternalVarableOutputNumbers-1);
    document.getElementById(lastExternalVarableOutputDiv).insertAdjacentHTML("afterEnd", s);

    for (var i = 1; i <= 20; i++) {
      if (document.getElementById("txtoutputEvent" + i) == null) {continue;}
      var addValue = "<input type=\"checkbox\" id=\"outputEventValue" + i + 
      "variable##number##\" name=\"ExternalVarableOutput##number##\" value=\"ExternalVarableOutput##number##\"><label id=\"lboutputEventValue" + i + 
      "check##number##\">External Varable Output ##number##<br></label>";
      addValue = addValue.replace(/##number##/g, ExternalVarableOutputNumbers);

      var valueDiv = document.getElementById('outputEventValues' + i);
      valueDiv.innerHTML = valueDiv.innerHTML + addValue;
    }
}

function removeExternalVarableOutput(num)
{
    document.getElementById("txtExternalVarableOutput" + num).value = "";
    document.getElementById("ExternalVarableOutputDiv" + num).style.display = "none";

    for (var i = 1; i <= 20; i++) {
      if(document.getElementById("lboutputEventValue" + i +"check" + num) == null) {continue;}
      document.getElementById("lboutputEventValue" + i +"check" + num).remove(); 
    }

    for (var i = 1; i <= 20; i++) {
      if(document.getElementById("outputEventValue" + i +"variable" + num) == null) {continue;}
      document.getElementById("outputEventValue" + i +"variable" + num).remove();
    }
}

function collectExternalVarableOutputStr() {
    // {externalVarables:[{id:externalVarable1,value:xxx,externalVarableDependency:externalVarable2},{}]}
    var s = "{\"ExternalVarableOutput\":[";
    for (var i = 1; i <= ExternalVarableOutputNumbers; i++) {

        if ((document.getElementById("txtExternalVarableOutput" + i).value == "") || isAssociated(i)) {
                  if ( (i!=1) && (document.getElementById("txtExternalVarableOutput" + (i+1)) != null) && (document.getElementById("txtExternalVarableOutput" + (i+1)).value != "") && !(isAssociated(i+1))) {
            s += ",";
        }
            continue;
        }
        var externalVarableId = document.getElementById("lbExternalVarableOutput" + i).id;
        var ExternalVarableOutputValueType = document.getElementById("ExternalVarableOutputValueType" + i).value;
        var externalVarableValue = document.getElementById("txtExternalVarableOutput" + i).value;
        s += "{\"id\":\"" + externalVarableId.trim() + "\",\"Type\":\"" + ExternalVarableOutputValueType.trim() + "\",\"value\":\"" + externalVarableValue.trim() + "\"}";
         if ( (document.getElementById("txtExternalVarableOutput" + (i+1)) != null) && (document.getElementById("txtExternalVarableOutput" + (i+1)).value != "")) {
            s += ",";}
    }


    var s = s + "]},";
   // var serializedDiagram = JSON.stringify(s)
    return s;
    //document.getElementById("txtjson").value = s;
}

function isAssociated(i) {
  var isAssociated = false;
  for (var j = 1; j <= 20; j++) {
    if (document.getElementById("txtoutputEvent" + j) == null) 
            {continue;}
     isAssociated = document.getElementById("outputEventValue" + j + "variable" + i).checked;
     if(isAssociated == true)
     {
      return isAssociated;
     }
    }
    return isAssociated;
}

        
 