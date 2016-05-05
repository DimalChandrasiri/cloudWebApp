function drawUpdatePage() {
    var output = "";
    var start = "";
    if (appdata != null) {
        $('#spName').val(appdata.applicationName);
        var spDescription = appdata.description;
        if (spDescription.contains(']')) {
            spDescription = spDescription.split(']') [1];
        }
        $('#sp-description').val(spDescription);
        preDrawClaimConfig();
        preDrawSAMLConfigPage();
        //preDrawSAMLConfigPage();
    }
}

function preDrawUpdatePage(applicationName) {
    var applicationName = getRequestParameter('applicationName');
    $.ajax({
        url: "/dashboard/serviceproviders/custom/controllers/custom/getsp.jag",
        type: "GET",
        data: "&cookie=" + cookie + "&user=" + userName + "&spName=" + applicationName,
        success: function (data) {
            appdata = $.parseJSON(data).return;
            drawUpdatePage();
        },
        error: function (e) {
            message({
                content: 'Error occurred while loading values for the grid.', type: 'error', cbk: function () {
                }
            });
        }
    });

}

function saveSAMLConfig(){
    debugger;
    var str = PROXY_CONTEXT_PATH + "/dashboard/serviceproviders/custom/controllers/custom/samlSSOConfig_handler.jag";
    $.ajax({
        url: str,
        type: "POST",
        data: $("#addServiceProvider").serialize() + "&clientAction=addRPServiceProvider" + "&spName=" + appdata.applicationName + "&isEditSP="+$('#isEditSp').val()+"&cookie=" + cookie + "&user=" + userName,
    })
        .done(function (data) {
            //reloadGrid();
            //message({content:'Successfully saved changes to the profile',type:'info', cbk:function(){} });
            $('#addServiceProvider').hide();
            preDrawUpdatePage(appdata.applicationName);
            //addIssuerToSP();
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


function updateSAMLConfig(){

}

function deleteSAMLIssuer(){
    var str = PROXY_CONTEXT_PATH + "/dashboard/serviceproviders/custom/controllers/custom/samlSSOConfig_handler.jag";
    $.ajax({
        url: str,
        type: "POST",
        data: "issuer=" + $('#issuersaml').val() + "&clientAction=removeServiceProvider" + "&spName="+appdata.applicationName+"&cookie=" + cookie + "&user=" + userName,
    })
        .done(function (data) {
            //reloadGrid();
            //message({content:'Successfully saved changes to the profile',type:'info', cbk:function(){} });
            preDrawUpdatePage(appdata.applicationName);
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

function showSamlForm(){
    $('#samlAttrIndexForm').hide();
    $('#samlConfigBtn').hide();
    $('#addServiceProvider').show();
}
function cancelSamlForm() {

    $('#addServiceProvider').hide();
    if ($('#isEditSp').val() == 'true') {
        $('#samlAttrIndexForm').show();
        $('#samlConfigBtn').hide();
    } else {
        $('#samlAttrIndexForm').hide();
        $('#samlConfigBtn').show();

    }
}
function updateSP(applicationName) {
    var element = "<div class=\"modal fade\" id=\"messageModal\">\n" +
        "  <div class=\"modal-dialog\">\n" +
        "    <div class=\"modal-content\">\n" +
        "      <div class=\"modal-header\">\n" +
        "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n" +
        "        <h3 class=\"modal-title\">Modal title</h4>\n" +
        "      </div>\n" +
        "      <div class=\"modal-body\">\n" +
        "        <p>One fine body&hellip;</p>\n" +
        "      </div>\n" +
        "      <div class=\"modal-footer\">\n" +
        "      </div>\n" +
        "    </div>\n" +
        "  </div>\n" +
        "</div>";
    $("#message").append(element);
    validateSPName(false);
}

function updateCustomSP() {
    var str = PROXY_CONTEXT_PATH + "/portal/gadgets/custom/controllers/custom/edit_finish.jag";
    $.ajax({
        url: str,
        type: "POST",
        data: $('#gadgetForm').serialize() + "&profileConfiguration=default" + "&cookie=" + cookie + "&user=" + userName
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

function validateSPName() {
    var spName = $("input[id='spName']").val();
    var description = $("input[id='spDesc']").val();
    if (spName.length == 0) {
        alert('Error occured. PLease provide the message box properly. Dev Issue');
        message({
            content: 'Please provide Service Provider ID', type: 'error', cbk: function () {
            }
        });
        return false;
    } else {
        updateCustomSP();

    }
}

function getRequestParameter(param) {
    var vars = {};
    window.location.href.replace( location.hash, '' ).replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function( m, key, value ) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if ( param ) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}
