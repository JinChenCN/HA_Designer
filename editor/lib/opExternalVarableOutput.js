
var ExternalVarableOutputNumbers = 1;

function addExternalVarableOutput()
{
    ExternalVarableOutputNumbers++;
    var s = "<div id=\"ExternalVarableOutputDiv##number##\">" +
    "<label id=\"lbExternalVarableOutput##number##\"> External Varable Output##number## </label> " +
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
    //document.getElementById("url_list")
         
    // var options = externalVarable_list.getElementsByTagName("option");
    // externalVarable_list.appendChild(" <option value=\"externalVarable" + ExternalVarableOutputNumbers + "\"  />");
    // var opt = document.createElement('option');
    // opt.value = "externalVarable" + ExternalVarableOutputNumbers; 
    var t = document.getElementById('ExternalVarableOutput_list').innerHTML; //.options.add(opt);
    t += " <option value=\"External Varable" + ExternalVarableOutputNumbers + "\"  />";
    document.getElementById('ExternalVarableOutput_list').innerHTML = t;
}

function removeExternalVarableOutput(num)
{
    document.getElementById("txtExternalVarableOutput" + num).value = "";
    document.getElementById("ExternalVarableOutputDiv" + num).style.display = "none";
}

function collectExternalVarableOutputStr() {
    // {externalVarables:[{id:externalVarable1,value:xxx,externalVarableDependency:externalVarable2},{}]}
    var s = "{\"ExternalVarableOutput\":[";
    for (var i = 1; i <= ExternalVarableOutputNumbers; i++) {

        if (document.getElementById("txtExternalVarableOutput" + i).value == "") {
                  if ( (i!=1) && (document.getElementById("txtExternalVarableOutput" + (i+1)) != null) && (document.getElementById("txtExternalVarableOutput" + (i+1)).value != "")) {
            s += ",";
        }
            continue;
        }
        var externalVarableId = document.getElementById("lbExternalVarableOutput" + i).innerHTML;
        var ExternalVarableOutputValueType = document.getElementById("ExternalVarableOutputValueType" + i).value;
        var externalVarableValue = document.getElementById("txtExternalVarableOutput" + i).value;
        s += "{\"id\":\"" + externalVarableId.trim() + "\",\"ExternalVarableOutputValueType\":\"" + ExternalVarableOutputValueType.trim() + "\",\"value\":\"" + externalVarableValue.trim() + "\"}";
         if ( (document.getElementById("txtExternalVarableOutput" + (i+1)) != null) && (document.getElementById("txtExternalVarableOutput" + (i+1)).value != "")) {
            s += ",";}
    }


    var s = s + "]},";
   // var serializedDiagram = JSON.stringify(s)
    return s;
    //document.getElementById("txtjson").value = s;
}

        
 