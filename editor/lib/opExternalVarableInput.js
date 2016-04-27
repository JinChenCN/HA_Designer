
var externalVarableInputNumbers = 1;

function addExternalVarableInput()
{
    externalVarableInputNumbers++;
    var s = "<div id=\"ExternalVarableInputDiv##number##\">" +
    "<label id=\"lbExternalVarableInput##number##\"> External Varable Input ##number## </label> " +
    "<select id=\"ExternalVarableInputValueType##number##\"> " + 
                                      "<option value=\"ANY\">ANY</option>" + 
                                      "<option value=\"BOOL\">BOOL</option>" + 
                                      "<option value=\"BYTE\">BYTE</option>" + 
                                      "<option value=\"DATE_AND_TIME\">DATE_AND_TIME</option>" + 
                                      "<option value=\"DINT\">DINT</option>" + 
                                      "<option value=\"DWORD\">DWORD</option>" + 
                                      "<option value=\"INT\">INT</option>" + 
                                      "<option value=\"LINT\">LINT</option>" + 
                                      "<option value=\"LREAL\">LREAL</option>" + 
                                      "<option value=\"LWORD\">LWORD</option>" + 
                                      "<option value=\"REAL\">REAL</option>" + 
                                      "<option value=\"SINT\">SINT</option>" + 
                                      "<option value=\"STRING\">STRING</option>" + 
                                      "<option value=\"TIME\">TIME</option>" + 
                                      "<option value=\"UDINT\">UDINT</option>" + 
                                      "<option value=\"UINT\">UINT</option>" + 
                                      "<option value=\"ULINT\">ULINT</option>" + 
                                      "<option value=\"USINT\">USINT</option>" + 
                                      "<option value=\"WORD\">WORD</option>" + 
                                      "<option value=\"WSTRING\">WSTRING</option>" + 
                                     "</select>" +
        "<input id=\"txtExternalVarableInput##number##\" style=\"width:75px\" type=\"txt\" name=\"link\" onchange=\"checkVarNames(this)\"/> " +
        " <input id=\"txtExternalVarableInputValue##number##\"  style=\"width:100px\" /> "+
        "<input type=\"button\" style=\"width:50px\" onclick=\"removeExternalVarableInput(##number##)\" id=\"btnExternalVarableInput##number##\" value=\" Delete \"/> </div>";
    s = s.replace(/##number##/g, externalVarableInputNumbers);
    var lastExternalVarableInputDiv = "ExternalVarableInputDiv" + (externalVarableInputNumbers-1);
    document.getElementById(lastExternalVarableInputDiv).insertAdjacentHTML("afterEnd", s);

    for (var i = 1; i <= 20; i++) {
      if (document.getElementById("txtinputEvent" + i) == null) {continue;}
      var addValue = "<input type=\"checkbox\" id=\"inputEventValue" + i + 
      "variable##number##\" name=\"ExternalVarableInput##number##\" value=\"ExternalVarableInput##number##\"><label id=\"lbinputEventValue" + 
      i + "check##number##\">External Varable Input ##number##<br></label>";
      addValue = addValue.replace(/##number##/g, externalVarableInputNumbers);
      var valueDiv = document.getElementById('inputEventValues' + i);
      valueDiv.innerHTML = valueDiv.innerHTML + addValue;
    }
}

function removeExternalVarableInput(num)
{
    document.getElementById("txtExternalVarableInput" + num).value = "";
    document.getElementById("ExternalVarableInputDiv" + num).style.display = "none";
    for (var i = 1; i <= 20; i++) {
      if(document.getElementById("lbinputEventValue" + i +"check" + num) == null) {continue;}
      document.getElementById("lbinputEventValue" + i +"check" + num).remove(); 
    }

    for (var i = 1; i <= 20; i++) {
      if(document.getElementById("inputEventValue" + i +"variable" + num) == null) {continue;}
      document.getElementById("inputEventValue" + i +"variable" + num).remove();
    }

}

function collectExternalVarableInputStr() {
    // {externalVarables:[{id:externalVarable1,value:xxx,externalVarableDependency:externalVarable2},{}]}
    var s = "{\"ExternalVarableInput\":[";
    for (var i = 1; i <= externalVarableInputNumbers; i++) {

        if (document.getElementById("txtExternalVarableInput" + i).value == "" || isInAssociated(i)) {
            if ( (i!=1) && (document.getElementById("txtExternalVarableInput" + (i+1)) != null) && (document.getElementById("txtExternalVarableInput" + (i+1)).value != "") && !(isInAssociated(i+1))) 
            {
              s += ",";
            }
            continue;
        }
        var externalVarableId = document.getElementById("lbExternalVarableInput" + i).id;
        var ExternalVarableInputValueType = document.getElementById("ExternalVarableInputValueType" + i).value;
        var externalVarableName = document.getElementById("txtExternalVarableInput" + i).value;
        var externalVarableValue = document.getElementById("txtExternalVarableInputValue" + i).value;
        s += "{\"id\":\"" + externalVarableId.trim() + "\",\"Type\":\"" + ExternalVarableInputValueType.trim() + "\",\"Name\":\"" + externalVarableName.trim()+ "\",\"Value\":\"" + externalVarableValue.trim() + "\"}";
         if ( (document.getElementById("txtExternalVarableInput" + (i+1)) != null) && (document.getElementById("txtExternalVarableInput" + (i+1)).value != "")) {
            s += ",";}
    }


    var s = s + "]},";
    
   // var serializedDiagram = JSON.stringify(s)
    return s;
    //document.getElementById("txtjson").value = s;
}

function isInAssociated(i) {
  var isAssociated = false;
  for (var j = 1; j <= 20; j++) {
    if (document.getElementById("txtinputEvent" + j) == null) 
            {continue;}
     isAssociated = document.getElementById("inputEventValue" + j + "variable" + i).checked;
     if(isAssociated == true)
     {
      return isAssociated;
     }
    }
    return isAssociated;
}

        
 