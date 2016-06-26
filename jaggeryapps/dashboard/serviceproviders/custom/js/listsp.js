function deleteCustomSP(applicationName) {
    var str = PROXY_CONTEXT_PATH + "/dashboard/serviceproviders/custom/controllers/custom/delete_finish.jag";
    $.ajax({
        url: str,
        type: "POST",
        data: "applicationName=" + applicationName + "&profileConfiguration=default" + "&cookie=" + cookie + "&user=" + userName,
    })
        .done(function (data) {
            reloadGrid();
            //message({content:'Successfully saved changes to the profile',type:'info', cbk:function(){} });

        })
        .fail(function () {
            message({
                content: 'Error while updating Profile', type: 'error', cbk: function () {
                }
            });

        })
        .always(function () {
            console.log('completed');
        });
}


function reloadGrid() {
    spList = null;
    $.ajax({
        url: "/dashboard/serviceproviders/custom/controllers/custom/getSPList.jag",
        type: "GET",
        data: "&cookie=" + cookie + "&user=" + userName,
        success: function (data) {
            if(data) {
                spList = $.parseJSON(data).return;
            }
            if (spList!=null && spList.constructor !== Array) {
                var arr = [];
                arr[0] = spList;
                spList = arr;
            }
            drawList();
        },
        error: function (e) {
            message({
                content: 'Error occurred while loading values for the grid.', type: 'error', cbk: function () {
                }
            });
        }
    });
}

function drawList() {
    var output = "";
    $("#listBody").empty();

    if (spList != null) {
        $('#spList').show();
        $('#emptyList').hide();
        for (var i in spList) {
            var spdesc = spList[i].description;
            var spimage = '<img src="../images/is/netsuit.png " class="square-element">';
            if (spList[i].description.contains(']')) {
                spdesc = spList[i].description.split(']') [1];
                var type = spList[i].description.split(']') [0];
                if (type == 'custom') {
                    spimage = '<img src="../images/is/netsuit.png " class="square-element">';
                } else if (type == 'concur') {
                    spimage = '<img src="../images/is/concur.png " class="square-element">';
                } else if (type == 'gotomeeting') {
                    spimage = '<img src="../images/is/gotomeeting.png " class="square-element">';
                } else if (type == 'netsuit') {
                    spimage = '<img src="../images/is/netsuit.png " class="square-element">';
                } else if (type == 'zuora') {
                    spimage = '<img src="../images/is/zuora.png " class="square-element">';
                } else if (type == 'salesforce') {
                    spimage = '<img src="../images/is/salesforce.png " class="square-element">';
                } else {
                    spimage = '<img src="../images/is/netsuit.png " class="square-element">';
                }
            }
            output = output + '<div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">' +
                '                    <div class="cloud-app-listing app-color-one">' +
                '                        <a href="/dashboard/serviceproviders/editsp.jag?applicationName='+spList[i].applicationName+'&sptype='+type+'">' +
                '                            <div class="app-icon">' +
                spimage +
                '                            </div>' +
                '                            <div class="app-name" >' + spList[i].applicationName +
                '                            </div>' +
                '                        </a>' +
                '                        <a class="dropdown-toggle app-extra" data-toggle="dropdown">' +
                '                            <i class="fa fa-ellipsis-v"></i>' +
                '                            <span class="sr-only">Toggle Dropdown</span>' +
                '                        </a>' +
                '                        <ul class="dropdown-menu app-extra-menu" role="menu">' +
                '                            <li><a href="/dashboard/serviceproviders/editsp.jag?applicationName='+spList[i].applicationName+'&sptype='+type+'">Edit</a></li>' +
                '                            <li><a href="" onclick = deleteCustomSP(\'' + spList[i].applicationName + '\');>Delete</a></li>' +
                '                        </ul>' +
                '                    </div>' +
                '               </div>';
            //                            <li>'+spdesc+'</li>'+
            //                           <li class="divider"></li>'+
            //                           <li><a href="#">'+spdesc+'</a></li>'+
        }
        $("#listBody").append(output);
    } else {
        $('#spList').hide();
        $('#emptyList').show();
    }

}
