/**
 * Created by ricardomendes on 15/01/15.
 */

var url = "http://localhost:1337/";

/**
 * Get data
 * @param id
 * @param callbackFunction
 */
function getData(id, sensorId, type, callbackFunction, element) {
    $.ajax({
        type: "GET",
        url: url + "testegraph/getData",
        data: {id: id, sensorId:sensorId, type: type},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){

            callbackFunction(data, element);
        },
        error: function (x, e) {
            alert("error occur");
        }
    });
}

/**
 * Get Data Rotated
 * @param id
 * @param callbackFunction
 */
function getDataRotated(id, sensorId, type,callbackFunction) {
    $.ajax({
        type: "GET",
        url: url + "testegraph/getDataRotated",
        data: {id: id, sensorId:sensorId, type: type},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callbackFunction,
        error: function (x, e) {
            alert("error occur");
        }
    });
}

/**
 *
 * @param id1
 * @param id2
 * @param sensorId1
 * @param sensorId2
 * @param type
 * @param callbackFunction
 * @param element
 */
function getData2Call(id1, id2, sensorId1, sensorId2, type, callbackFunction, element) {
    $.ajax({
        type: "GET",
        url: url + "testegraph/getData",
        data: {id: id1, sensorId:sensorId1, type: type},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data1){
            //callbackFunction(data, element);
            $.ajax({
                type: "GET",
                url: url + "testegraph/getData",
                data: {id: id2, sensorId:sensorId2, type: type},
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data2){
                    callbackFunction(data1, data2, element);
                },
                error: function (x, e) {
                    alert("error occur  data2");
                }
            });
        },
        error: function (x, e) {
            alert("error occur data1");
        }
    });
}

/**
 * Get Full List of Nodes
 * @param selectNode
 */
function selectTrackSession(selectNode) {
    $.ajax({
        type: "GET",
        url: url + "testegraph/getList",
        //data: {userId: id},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            result.forEach(function (d) {
                $(selectNode).append("<option value='" + d['TrackSessionConfigurationId'] + "'>" + d['TrackSessionConfigurationId'] + "</option>");
            });
        },
        error: function (x, e) {
            alert("error occur");
        }
    });
}

/**
 * Get TrackSession Sensors
 * @param selectNode
 */
function getListSensor(selectNode, trackSessionId) {
    $.ajax({
        type: "GET",
        url: url + "testegraph/getListSensor",
        //data: {userId: id},
        data: {trackSessionId: trackSessionId},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            result.forEach(function (d) {
                $(selectNode).append("<option value='" + d['sensorN'] + "'>" + d['sensorN'] + "</option>");
            });
        },
        error: function (x, e) {
            alert("error occur");
        }
    });
}

/**
 * Create slide
 * @param min
 * @param max
 */
function createSlider(slider, min, max) {
    $(slider).slider({
        max: max,
        min: min,
        value: 0,
        animate: "fast"
    });
    return $(slider);
}