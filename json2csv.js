function JSON2CSV(objData, headerArray) {
    console.log(objData);
    console.log(Object.prototype.toString.call( objData ));
    // Detect data type (Array vs Object)
    if( Object.prototype.toString.call( objData ) === '[object Object]' ) {
        var array = [];
        for (var key in objData){
            array.push(objData[key]);
        }
    } else if( Object.prototype.toString.call( objData ) === '[object Array]' ) {
        var array = objData;
    } else {
        throw "objData must be an Array or Object";
    }
    
    if( Object.prototype.toString.call( headerArray ) === '[object Arrary]' ) {
        var headers = headerArray;
    } else {
        var headers = null;
    }
    
    var str = '';
    var line = '';
    
    // Write the Header Row
    if (headers){
        for (var index in headers) {
            var value = headers[index] + "";
            line += '"' + value.replace(/"/g, '""') + '",';
        }
        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    
    // Write the Data Rows
    for (var i = 0; i < array.length; i++) {
        var line = '';

        if (headers != null){
            for (var index in headers) {
                var value = array[i][headers[index]] + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
        } else {
            for (var index in array[i]) {
                var value = array[i][index] + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }   
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    return str;
}
        
function JSON2CSVDownload(objData, headerArray){
    var csv = JSON2CSV(objData, headerArray);
    window.open("data:text/csv;charset=utf-8," + escape(csv));
}