
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
    //document.getElementById("url_list")
         
    // var options = externalVarable_list.getElementsByTagName("option");
    // externalVarable_list.appendChild(" <option value=\"externalVarable" + externalVarableInputNumbers + "\"  />");
    // var opt = document.createElement('option');
    // opt.value = "externalVarable" + externalVarableInputNumbers; 
    var t = document.getElementById('ExternalVarableInput_list').innerHTML; //.options.add(opt);
    t += " <option value=\"External Varable" + externalVarableInputNumbers + "\"  />";
    document.getElementById('ExternalVarableInput_list').innerHTML = t;
}

function removeExternalVarableInput(num)
{
    document.getElementById("txtExternalVarableInput" + num).value = "";
    document.getElementById("ExternalVarableInputDiv" + num).style.display = "none";
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
        var externalVarableId = document.getElementById("lbExternalVarableInput" + i).innerHTML;
        var ExternalVarableInputValueType = document.getElementById("ExternalVarableInputValueType" + i).value;
        var externalVarableValue = document.getElementById("txtExternalVarableInput" + i).value;
        s += "{\"id\":\"" + externalVarableId.trim() + "\",\"ExternalVarableInputValueType\":\"" + ExternalVarableInputValueType.trim() + "\",\"value\":\"" + externalVarableValue.trim() + "\"}";
         if ( (document.getElementById("txtExternalVarableInput" + (i+1)) != null) && (document.getElementById("txtExternalVarableInput" + (i+1)).value != "")) {
            s += ",";}
    }


    var s = s + "]},";
   // var serializedDiagram = JSON.stringify(s)
    return s;
    //document.getElementById("txtjson").value = s;
}

        
 