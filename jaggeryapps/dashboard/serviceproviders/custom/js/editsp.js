function drawUpdatePage() {
    if (appdata != null) {
        $('#spName').val(appdata.applicationName);
        $('#oldSPName').val(appdata.applicationName);
        var spDescription = appdata.description;
        var sptype = 'custom';
        if (spDescription.contains(']')) {
            sptype = spDescription.split(']') [0];
            spDescription = spDescription.split(']') [1];
        }
        $('#sp-description').val(spDescription);
        preDrawClaimConfig();
        if(sptype=='salesforce') {
            preDrawSalesForce();
        }else{
            preDrawSAMLConfigPage();
        }
        preDrawOAuthConfigPage();
    }
}

function preDrawUpdatePage() {
    var applicationName = getRequestParameter('applicationName');
    var sptype = getRequestParameter('sptype');
    $.ajax({
        url: "/dashboard/serviceproviders/custom/controllers/custom/getsp.jag",
        type: "GET",
        data: "&cookie=" + cookie + "&user=" + userName + "&spName=" + applicationName,
        success: function (data) {
            appdata = $.parseJSON(data).return;

            if (appdata != null && appdata.inboundAuthenticationConfig != null
                && appdata.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs != null) {
                if(appdata.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs.constructor !== Array){
                    var tempArr = [];
                    tempArr[0] = appdata.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs;
                    appdata.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs = tempArr;
                }
                for (var i in appdata.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs) {
                    var inboundConfig = appdata.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs[i];
                    if (inboundConfig.inboundAuthType == "passivests" && inboundConfig.inboundAuthKey.length > 0) {
                        $('#passiveSTSRealm').val(inboundConfig.inboundAuthKey);
                        if(inboundConfig.properties != null && inboundConfig.properties.constructor !== Array){
                            inboundConfig.properties = [inboundConfig.properties];
                        }
                        for(var i in inboundConfig.properties) {
                            var property = inboundConfig.properties[i];
                            if(property.name == "passiveSTSWReply") {
                                $('#passiveSTSWReply').val(property.value);
                            }
                        }
                    }
                }
            }
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

function updateSP() {
    $('#number_of_claimmappings').val(document.getElementById("claimMappingAddTable").rows.length);
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
    debugger;
    var str = PROXY_CONTEXT_PATH + "/dashboard/serviceproviders/custom/controllers/custom/edit_finish.jag";
    var parameters = "";
    if($('#spType').val()!='custom]'){
        parameters = $("#addServiceProvider").serialize();
    }
    if ($('#isEditSp').val() == "true") {
        parameters = parameters+"&issuersaml=" + $('#issuersaml').val() + "&acsindex=" + $('#acsindex').val();
    }
    if ($('#isEditOauthSP').val() == "true") {
        parameters = parameters + "&consumerID=" + $('#consumerID').val() + "&consumerSecret=" + $('#consumerSecret').val();
    }
    parameters = parameters + "&passiveSTSRealm=" + $('#passiveSTSRealm').val() + "&passiveSTSWReply=" + $('#passiveSTSWReply').val();
    $.ajax({
        url: str,
        type: "POST",
        data: $('#claimConfigForm').serialize() + "&oldSPName=" + $('#oldSPName').val() + "&spName=" + $('#spName').val() + "&spDesc=" + $('#spType').val() + $('#sp-description').val() + parameters + "&profileConfiguration=default" + "&cookie=" + cookie + "&user=" + userName,
    })
        .done(function (data) {
            window.location.href = PROXY_CONTEXT_PATH + "/dashboard/serviceproviders/listsp.jag";
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


/**
 * SAML configuration related
 */
function saveSAMLConfig(){
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

/**
 * Claim Configuration related
 */
function showOauthForm() {
    $('#oauthAttrIndexForm').hide();
    $('#oauthConfigBtn').hide();
    $('#addAppForm').show();
}

function cancelOauthForm() {
    $('#addAppForm').hide();
    if ($('#isEditOauthSP').val() == 'true') {
        $('#oauthAttrIndexForm').show();
        $('#oauthConfigBtn').hide();
    } else {
        $('#oauthAttrIndexForm').hide();
        $('#oauthConfigBtn').show();

    }
}

function deleteOauthConfig() {
    var str = PROXY_CONTEXT_PATH + "/dashboard/serviceproviders/custom/controllers/custom/oauthConfigHandler.jag";
    $.ajax({
        url: str,
        type: "POST",
        data: "&cookie=" + cookie + "&user=" + userName + "&appName=" + appdata.applicationName + "&clientID=" + $('#consumerID').val() + "&action=removeOauthConfig",
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

function saveOauthConfig(){
    var str = PROXY_CONTEXT_PATH + "/dashboard/serviceproviders/custom/controllers/custom/oauthConfigHandler.jag";
    $.ajax({
        url: str,
        type: "POST",
        data: $("#addAppForm").serialize() + "&action=addOauthConfig" + "&appName=" + appdata.applicationName + "&isEditSP="+$('#isEditOauthSP').val()+"&cookie=" + cookie + "&user=" + userName,
    })
        .done(function (data) {
            //reloadGrid();
            //message({content:'Successfully saved changes to the profile',type:'info', cbk:function(){} });
            $('#addAppForm').hide();
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