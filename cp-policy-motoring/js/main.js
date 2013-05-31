var currentdomain = window.location.href.substring(7, window.location.href.indexOf('/', 7));

if (currentdomain.indexOf('localhost') != -1) {
    currentdomain = "qpp-dev";
}

var webServicePath = "http://" + currentdomain + "/atrackws/service1.asmx/";

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function formatJSONDate(jsonDate) {
    return eval(jsonDate.replace(/\/Date\((\d+)\)\//gi, "new Date($1)"));
}

function callWebService(callType, parameters, webmethodName, returnData) {

    try {
        
        jQuery.support.cors = true;

        switch (callType) {

            case "json":

                if (parameters != null) {   // Web Service Method with parameters

                    //call the web service
                    $.ajax({
                        url: webServicePath + webmethodName,
                        crossDomain: true,
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify(parameters),
                        success: function (returnedData) {
                            returnData(returnedData.d);
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            LogError("main.js", "callWebService()", xhr.status + " " + xhr.responseText);
                            returnData(null);
                        }
                    });
                }
                else {  // Web Service Method no parameters

                    $.ajax({
                        url: webServicePath + webmethodName,
                        crossDomain: true,
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (returnedData) {
                            returnData(returnedData.d);
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            LogError("main.js", "callWebService()", xhr.status + " " + xhr.responseText);
                            returnData(null);
                        }
                    });

                }
                break;

            case "xml":

                if (parameters != null) {   // Web Service Method with parameters

                    //call the web service
                    $.ajax({
                        url: webServicePath + webmethodName,
                        crossDomain: true,
                        type: "POST",
                        dataType: "xml",
                        data: parameters,
                        success: function (returnedData) {
                            returnData(returnedData);
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            LogError("main.js", "callWebService()", xhr.status + " " + xhr.responseText);
                            returnData(null);
                        }
                    });
                }
                else {  // Web Service Method no parameters

                    $.ajax({
                        url: webServicePath + webmethodName,
                        crossDomain: true,
                        type: "POST",
                        dataType: "xml",
                        success: function (returnedData) {
                            returnData(returnedData);
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            LogError("main.js", "callWebService()", xhr.status + " " + xhr.responseText);
                            returnData(null);
                        }
                    });

                }
                break;
        }

    }
    catch (ex) {
        LogError("main.js", "callWebService()", ex);
    }
}

function LogError(jsFileName, functionName, errorDescription) {
    try {
        alert("The following error has occured in file " + jsFileName + " in function " + functionName + " - " + errorDescription);
    }
    catch (ex) {
        alert("Failed to log error, occuring in file " + jsFileName + "in function " + functionName);
    }
}

function GetIconImage(iJourneyNo, iEventType) {
    
    var iconImage = "car-marker.png";

    switch (iJourneyNo)
    {
        case 0:
            switch (iEventType)
            {
                case 4:
                case 5:
                    iconImage = "key-marker.png";
                    break;
                case 14:
                    iconImage = "speed-marker.png";
                    break;
                case 35:
                    iconImage = "accel-marker.png";
                    break;
                case 36:
                    iconImage = "brake-marker.png";
                    break;
                default:
                    iconImage = "car-marker.png";
                    break;
            }
            break;
        case 1:
            switch (iEventType)
            {
                case 4:
                case 5:
                    iconImage = "key-marker-blu.png";
                    break;
                case 14:
                    iconImage = "speed-marker-blu.png";
                    break;
                case 35:
                    iconImage = "accel-marker-blu.png";
                    break;
                case 36:
                    iconImage = "brake-marker-blu.png";
                    break;
                default:
                    iconImage = "car-marker-blu.png";
                    break;
            }
            break;
        case 2:
            switch (iEventType)
            {
                case 4:
                case 5:
                    iconImage = "key-marker-grn.png";
                    break;
                case 14:
                    iconImage = "speed-marker-grn.png";
                    break;
                case 35:
                    iconImage = "accel-marker-grn.png";
                    break;
                case 36:
                    iconImage = "brake-marker-grn.png";
                    break;
                default:
                    iconImage = "car-marker-grn.png";
                    break;
            }
            break;
        case 3:
            switch (iEventType)
            {
                case 4:
                case 5:
                    iconImage = "key-marker-pnk.png";
                    break;
                case 14:
                    iconImage = "speed-marker-pnk.png";
                    break;
                case 35:
                    iconImage = "accel-marker-pnk.png";
                    break;
                case 36:
                    iconImage = "brake-marker-pnk.png";
                    break;
                default:
                    iconImage = "car-marker-pnk.png";
                    break;
            }
            break;
        case 4:
            switch (iEventType)
            {
                case 4:
                case 5:
                    iconImage = "key-marker-red.png";
                    break;
                case 14:
                    iconImage = "speed-marker-red.png";
                    break;
                case 35:
                    iconImage = "accel-marker-red.png";
                    break;
                case 36:
                    iconImage = "brake-marker-red.png";
                    break;
                default:
                    iconImage = "car-marker-red.png";
                    break;
            }
            break;
        case 5:
            switch (iEventType)
            {
                case 4:
                case 5:
                    iconImage = "key-marker-ylw.png";
                    break;
                case 14:
                    iconImage = "speed-marker-ylw.png";
                    break;
                case 35:
                    iconImage = "accel-marker-ylw.png";
                    break;
                case 36:
                    iconImage = "brake-marker-ylw.png";
                    break;
                default:
                    iconImage = "car-marker-ylw.png";
                    break;
            }
            break;
        case 6:
            switch (iEventType)
            {
                case 4:
                case 5:
                    iconImage = "key-marker-blu2.png";
                    break;
                case 14:
                    iconImage = "speed-marker-blu2.png";
                    break;
                case 35:
                    iconImage = "accel-marker-blu2.png";
                    break;
                case 36:
                    iconImage = "brake-marker-blu2.png";
                    break;
                default:
                    iconImage = "car-marker-blu2.png";
                    break;
            }
            break;
        case 7:
            switch (iEventType)
            {
                case 4:
                case 5:
                    iconImage = "key-marker-grn2.png";
                    break;
                case 14:
                    iconImage = "speed-marker-grn2.png";
                    break;
                case 35:
                    iconImage = "accel-marker-grn2.png";
                    break;
                case 36:
                    iconImage = "brake-marker-grn2.png";
                    break;
                default:
                    iconImage = "car-marker-grn2.png";
                    break;
            }
            break;
        case 8:
            switch (iEventType)
            {
                case 4:
                case 5:
                    iconImage = "key-marker-ppl.png";
                    break;
                case 14:
                    iconImage = "speed-marker-ppl.png";
                    break;
                case 35:
                    iconImage = "accel-marker-ppl.png";
                    break;
                case 36:
                    iconImage = "brake-marker-ppl.png";
                    break;
                default:
                    iconImage = "car-marker-ppl.png";
                    break;
            }
            break;
        case 9:
            switch (iEventType)
            {
                case 4:
                case 5:
                    iconImage = "key-marker-brn.png";
                    break;
                case 14:
                    iconImage = "speed-marker-brn.png";
                    break;
                case 35:
                    iconImage = "accel-marker-brn.png";
                    break;
                case 36:
                    iconImage = "brake-marker-brn.png";
                    break;
                default:
                    iconImage = "car-marker-brn.png";
                    break;
            }
            break;
        default:
            switch (iEventType)
            {
                case 4:
                case 5:
                    iconImage = "key-marker.png";
                    break;
                case 14:
                    iconImage = "speed-marker.png";
                    break;
                case 35:
                    iconImage = "accel-marker.png";
                    break;
                case 36:
                    iconImage = "brake-marker.png";
                    break;
                default:
                    iconImage = "car-marker.png";
                    break;
            }
            break;
    }

    return iconImage;
    
}

function GetEventType(eventtype) {

    var sEventDesc = "";

    switch (eventtype) {
        case "1":
            sEventDesc = "GPS";
            break;
        case "2":
            sEventDesc = "Panic local";
            break;
        case "3":
            sEventDesc = "Panic remote";
            break;
        case "4":
            sEventDesc = "Ignition on";
            break;
        case "5":
            sEventDesc = "Ignition off";
            break;
        case "6":
            sEventDesc = "Travel start";
            break;
        case "7":
            sEventDesc = "Travel stop";
            break;
        case "11":
            sEventDesc = "Connection";
            break;
        case "12":
            sEventDesc = "Door open";
            break;
        case "13":
            sEventDesc = "Battery low";
            break;
        case "14":
            sEventDesc = "Speedband";
            break;
        case "15":
            sEventDesc = "Disconnection";
            break;
        case "16":
            sEventDesc = "CANbus sensor data";
            break;
        case "17":
            sEventDesc = "Manual Arrive";
            break;
        case "18":
            sEventDesc = "Manual Leave";
            break;
        case "19":
            sEventDesc = "Locally Detected Arrive";
            break;
        case "20":
            sEventDesc = "Locally Detected Leave";
            break;
        case "21":
            sEventDesc = "Cancel Panic";
            break;
        case "22":
            sEventDesc = "Dummy Cancel Panic";
            break;
        case "23":
            sEventDesc = "Forecourt Information";
            break;
        case "24":
            sEventDesc = "Bonnet open";
            break;
        case "25":
            sEventDesc = "Ignition override";
            break;
        case "26":
            sEventDesc = "Back door open";
            break;
        case "27":
            sEventDesc = "Back door closed";
            break;
        case "28":
            sEventDesc = "Diagnostic";
            break;
        case "29":
            sEventDesc = "Health check";
            break;
        case "30":
            sEventDesc = "TTU Signon";
            break;
        case "31":
            sEventDesc = "Digital Tacho";
            break;
        case "32":
            sEventDesc = "Trailer tracking";
            break;
        case "33":
            sEventDesc = "Electric vehicle";
            break;
        case "34":
            sEventDesc = "Bonnet closed";
            break;
        case "35":
            sEventDesc = "Harsh Acceleration";
            break;
        case "36":
            sEventDesc = "Harsh Braking";
            break;
        case "37":
            sEventDesc = "Rest Digital";
            break;
        case "38":
            sEventDesc = "Rest Manual";
            break;
        case "39":
            sEventDesc = "POA Digital";
            break;
        case "40":
            sEventDesc = "POA Manual";
            break;
        case "41":
            sEventDesc = "Excessive idling";
            break;
        case "42":
            sEventDesc = "Excessive Over-revving";
            break;
        case "43":
            sEventDesc = "Self-triggered sensor data";
            break;
        case "44":
            sEventDesc = "Logon With Non-Cumulative CANbus";
            break;
        case "45":
            sEventDesc = "Logoff With Non-Cumulative CANbus";
            break;
        case "46":
            sEventDesc = "Privacy Mode Engaged";
            break;
        case "47":
            sEventDesc = "Business Mode Engaged";
            break;
        case "48":
            sEventDesc = "Temperature sensor data";
            break;
        case "49":
            sEventDesc = "Excessive Idling End";
            break;
        case "50":
            sEventDesc = "Excessive Over-revving End";
            break;
        case "51":
            sEventDesc = "Excessive Speeding";
            break;
        case "52":
            sEventDesc = "Excessive Speeding End";
            break;
    }

    return sEventDesc;
}

function formatDateToShortString(d) {
    
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();

    return curr_date + "/" + curr_month + "/" + curr_year;

}

function formatDateToShortDTString(d) {
    
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    var curr_hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    var curr_mins = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();

    return curr_date + "/" + curr_month + "/" + curr_year + " " + curr_hours + ":" + curr_mins;

}
