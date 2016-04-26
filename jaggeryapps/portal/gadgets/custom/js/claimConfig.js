function drawClaimConfig(spClaimConfig, isLocalClaimsSelected, claimMapping) {
    var selectClaimConfig = ' <div class=\"col-lg-12 content-section\">\n' +
        '<fieldset>\n' +
        '<table class=\"table table-bordered\">' +
        '        <tr>' +
        '        <td style="white-space: nowrap;overflow: hidden; font-size: 12px">' +
        '        <label  style="display: inline-block; "> Select Claim mapping Dialect: </label> ' +
        '</td>' +
        '    <td class="leftCol-med">' +
        '        <input type="radio" id="claim_dialect_wso2" name="claim_dialect" value="local"';
    if (isLocalClaimsSelected) {
        selectClaimConfig = selectClaimConfig + "checked";
    }

    selectClaimConfig = selectClaimConfig + '> <label for="claim_dialect_wso2" style="cursor: pointer;display: inline-block;"> Use Local Claim Dialect</label>' +
        '        </td>' +
        '        </tr>' +
        '        <tr>' +
        '        <td style="width:15%" class="leftCol-med labelField">' +
        '        </td>' +
        '        <td class="leftCol-med">' +
        '        <input type="radio" id="claim_dialect_custom" name="claim_dialect" value="custom"';
    if (!isLocalClaimsSelected) {
        selectClaimConfig = selectClaimConfig + "checked";
    }
    selectClaimConfig = selectClaimConfig + '> <label for="claim_dialect_wso2" style="cursor: pointer;display: inline-block;"> Define Custom Claim Dialect</label>' +
        '        </td>' +
        '        </tr>' +
        '        </table>';

    var requestedClaimTable =
        '<table  class=\"table table-bordered\">' +
        '        <tr>' +
        '        <td class="leftCol-med labelField" style="white-space: nowrap;overflow: hidden;">' +
        '        <label id="addClaimUrisLbl">';
    if (isLocalClaimsSelected) {
        requestedClaimTable = requestedClaimTable + "Requested Claims:"
    } else {
        requestedClaimTable = requestedClaimTable + "Identity Provider Claim URIs:"
    }
    requestedClaimTable = requestedClaimTable + '</label > ' +
        '    </td>' +
        '    <td class="leftCol-med">' +
        '        <a id="claimMappingAddLink" class="icon-link" style="background-image: url(images/add.gif); ' +
        'margin-top: 0px !important; margin-bottom: 5px !important; margin-left: 5px;">Add Claim URI</a>' +
        '        <table class="table table-bordered" id="claimMappingAddTable" style=';
    if (claimMapping == null || claimMapping.length == 0) {
        requestedClaimTable = requestedClaimTable + "display:none"
    } else {
        requestedClaimTable = requestedClaimTable + ""
    }
    requestedClaimTable = requestedClaimTable +
        '    ><thead><tr>' +
        '    <th class="leftCol-big spClaimHeaders" style=';

    if (isLocalClaimsSelected) {

        requestedClaimTable = requestedClaimTable + "display:none;"
    } else {
        requestedClaimTable = requestedClaimTable + ""
    }

    requestedClaimTable = requestedClaimTable + '>Service Provider Claim</th>' +
        '        <th class="leftCol-big">Local Claim</th>' +
        '        <th class="leftCol-mid spClaimHeaders" style=';
    if (isLocalClaimsSelected) {
        requestedClaimTable = requestedClaimTable + "display:none;"
    } else {
        requestedClaimTable = requestedClaimTable + ""
    }
    requestedClaimTable = requestedClaimTable + '>Requested Claim</th>' +
        '        <th>Action</th></tr></thead>' +
        '    <tbody>';
    if (claimMapping != null && claimMapping.length > 0) {
        var i = -1;

        for (var entry in claimMapping) {
            //    Map.Entry<String, String> entry
            //} : claimMapping.entrySet()){
            i = i + 1;
            var row = '<tr> <td style=';
            if (isLocalClaimsSelected) {
                row = row + "display:none;"
            } else {
                row = row + ""
            }
            row = row + '><input type="text" class="spClaimVal" style="width: 98%;" value="' + claimMapping[entry].remoteClaim.claimUri + '" id="spClaim_' + i + '" name="spClaim_' + i + '" readonly="readonly"/></td>' +
                '<td>\n' +
                '<select id="idpClaim_' + i + '" name="idpClaim_' + i + '" class="idpClaim" style="float:left; width: 100%">';
            for (var localClaimNameEntry in spConfigClaimUris) {
                var localClaimName = spConfigClaimUris[localClaimNameEntry];
                if (localClaimName == claimMapping[entry].localClaim.claimUri) {
                    row = row + '<option value="' + localClaimName + '" selected> ' + localClaimName + '</option>';
                } else {
                    row = row + '<option value = "' + localClaimName + '" >' + localClaimName + '</option >';
                }
            }

            row = row + '</select>\n' +
                '</td>' +
                '<td style=';
            if (isLocalClaimsSelected) {
                row = row + "display:none;"
            } else {
                row = row + ""
            }
            row = row + '>';
            if (claimMapping[entry].requested == 'true') {
                row = row + '<input type="checkbox"  id="spClaim_req_' + i + '" name="spClaim_req_' + i + '" checked/>';
            } else {
                row = row + '<input type="checkbox"  id="spClaim_req_' + i + '" name="spClaim_req_' + i + '" />';
            }
            row = row + '</td>' +
                '<td>' +
                '<a title="Delete Permission ?" onclick="deleteClaimRow(this);return false;" href="#" class="icon-link" style="background-image: url(images/delete.gif)">' +
                'Delete' +
                '</a>\n' +
                '</td>\n' +
                '</tr>';
            requestedClaimTable = requestedClaimTable + row;
        }

    }
    requestedClaimTable = requestedClaimTable + '</tbody>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '    <td class="leftCol-med labelField">Subject Claim URI:' +
        '<td>' +
        '    <select class="leftCol-med" id="subject_claim_uri" name="subject_claim_uri" style=" margin-left: 5px; ">' +
        '        <option value="">---Select---</option>';

    var subjectClaimUri = json.return.localAndOutBoundAuthenticationConfig.subjectClaimUri;
    if (isLocalClaimsSelected) {
        for (var localClaimNameEntry in spConfigClaimUris) {
            var localClaimName = spConfigClaimUris[localClaimNameEntry];
            if (subjectClaimUri != null && localClaimName == localClaimName) {
                requestedClaimTable = requestedClaimTable + '<option value="' + localClaimName + '" selected>' + localClaimName + '</option>';
            } else {
                requestedClaimTable = requestedClaimTable + '<option value="' + localClaimName + '">' + localClaimName + '</option>';
            }
        }
    } else {
        for (var entry in claimMapping) {
            var entryValue = claimMapping[entry].remoteClaim.claimUri;
            if (entryValue != null && entryValue.length > 0) {
                if (subjectClaimUri != null && subjectClaimUri == entryValue) {
                    requestedClaimTable = requestedClaimTable + '<option value="' + entryValue + '" selected>' + entryValue + '</option>';
                } else {
                    requestedClaimTable = requestedClaimTable + '<option value="' + entryValue + '">' + entryValue + '</option>';
                }
            }
        }
    }
    requestedClaimTable = requestedClaimTable + '</select>' +
        '    </td>' +
        '    </tr>' +
        '    </table>' +
        '    <input type="hidden" name="number_of_claimmappings" id="number_of_claimmappings" value="1">' +
        '        <div id="localClaimsList" style="display: none;">' +
        '        <select style="float:left; width: 100%">';

    var allLocalClaims = "";
    for (var entry in spConfigClaimUris) {
        localClaimName = spConfigClaimUris[entry];
        requestedClaimTable = requestedClaimTable + '<option value="' + localClaimName + '">' + localClaimName + '</option>';
        allLocalClaims = allLocalClaims + localClaimName + ",";
    }
    requestedClaimTable = requestedClaimTable + '</select>' +
        '</div>' +
        '<input type="hidden" id ="local_calim_uris" value="' + allLocalClaims + '" >' +
        '<div id="roleMappingSelection" style=';
    if (isLocalClaimsSelected) {
        requestedClaimTable = requestedClaimTable + "display:none";
    } else {
        requestedClaimTable = requestedClaimTable + '""';
    }
    requestedClaimTable = requestedClaimTable + '>' +
        '<table class=\"table table-bordered\" style="padding-top: 10px">' +
        '<tr>' +
        '<td class="leftCol-med labelField" style="width:31%">' +
        '<label id="addClaimUrisLbl">Role Claim URI:</label>' +
        '</td>' +
        '<td >' +
        '<select id="roleClaim" name="roleClaim" style="float:left;min-width: 250px;">' +
        '<option value="">---Select---</option>';
    if (!isLocalClaimsSelected) {
        for (var entry in claimMapping) {
            var entryValue = claimMapping[entry].remoteClaim.claimUri;
            if (entryValue != null && entryValue.length > 0) {
                if (spClaimConfig.roleClaimURI != null && spClaimConfig.roleClaimURI == entryValue) {
                    requestedClaimTable = requestedClaimTable + '<option value="' + entryValue + '" selected>' + entryValue + '</option>';
                } else {
                    requestedClaimTable = requestedClaimTable + '<option value="' + entryValue + '">' + entryValue + '</option>';
                }
            }
        }
    }
    requestedClaimTable = requestedClaimTable + '</select>' +
        '    </td>' +
        '    </tr>' +
        '    <tr>' +
        '    <td class="leftCol-med" style="width:15%"></td>' +
        '        <td>' +
        '        <div class="sectionHelp">' +
        '        Select Claim URI for Service Provider Role' +
        '        </div>' +
        '        </td>' +
        '        </tr>' +
        '        </table>' +
        '        </div>' +
        '        </div>';
    var fieldsetEnd = '</fieldset>' +
        '</div>';
    var claimMappinRowID = -1;
    if (claimMapping != null) {
        claimMappinRowID = claimMapping.length - 1;
    }
    $("#gadgetBody").empty();
    $("#gadgetBody").append(selectClaimConfig + requestedClaimTable + fieldsetEnd);
    jQuery('#claimMappingAddLink').click(function () {
        $('#claimMappingAddTable').show();
        var selectedIDPClaimName = $('select[name=idpClaimsList]').val();
        if (!validaForDuplications('.idpClaim', selectedIDPClaimName, 'Local Claim')) {
            return false;
        }
        claimMappinRowID++;
        var idpClaimListDiv = $('#localClaimsList').clone();
        if (idpClaimListDiv.length > 0) {
            $(idpClaimListDiv.find('select')).attr('id', 'idpClaim_' + claimMappinRowID);
            $(idpClaimListDiv.find('select')).attr('name', 'idpClaim_' + claimMappinRowID);
            $(idpClaimListDiv.find('select')).addClass("idpClaim");
        }
        if ($('input:radio[name=claim_dialect]:checked').val() == "local") {
            $('.spClaimHeaders').hide();
            $('#roleMappingSelection').hide();
            jQuery('#claimMappingAddTable').append(jQuery('<tr>' +
                '<td style="display:none;"><input type="text" style="width: 98%;" id="spClaim_' + claimMappinRowID + '" name="spClaim_' + claimMappinRowID + '"/></td> ' +
                '<td>' + idpClaimListDiv.html() + '</td>' +
                '<td style="display:none;"><input type="checkbox"  name="spClaim_req_' + claimMappinRowID + '"  id="spClaim_req_' + claimMappinRowID + '" checked/></td>' +
                '<td><a onclick="deleteClaimRow(this);return false;" href="#" class="icon-link" style="background-image: url(images/delete.gif)"> Delete</a></td>' +
                '</tr>'));
        }
        else {
            $('.spClaimHeaders').show();
            $('#roleMappingSelection').show();
            jQuery('#claimMappingAddTable').append(jQuery('<tr>' +
                '<td><input type="text" class="spClaimVal" style="width: 98%;" id="spClaim_' + claimMappinRowID + '" name="spClaim_' + claimMappinRowID + '"/></td> ' +
                '<td>' + idpClaimListDiv.html() + '</td>' +
                '<td><input type="checkbox"  name="spClaim_req_' + claimMappinRowID + '"  id="spClaim_req_' + claimMappinRowID + '"/></td>' +
                '<td><a onclick="deleteClaimRow(this);return false;" href="#" class="icon-link" style="background-image: url(images/delete.gif)"> Delete</a></td>' +
                '</tr>'));
            $('#spClaim_' + claimMappinRowID).change(function () {
                resetRoleClaims();
            });
        }

    });

    $("[name=claim_dialect]").click(function () {
        var element = $(this);
        claimMappinRowID = -1;
        if ($('.idpClaim').length > 0) {
            $.each($('.idpClaim'), function () {
                $(this).parent().parent().remove();
            });
            $('#claimMappingAddTable').hide();
            changeDialectUIs(element);

        } else {
            $('#claimMappingAddTable').hide();
            changeDialectUIs(element);
        }
        // TODO : Handle error messages
        // TODO : Following is the correct code
        //if ($('.idpClaim').length > 0) {
        //    CARBON.showConfirmationDialog('Changing dialect will delete all claim mappings. Do you want to proceed?',
        //        function () {
        //            $.each($('.idpClaim'), function () {
        //                $(this).parent().parent().remove();
        //            });
        //            $('#claimMappingAddTable').hide();
        //            changeDialectUIs(element);
        //        },
        //        function () {
        //            //Reset checkboxes
        //            $('#claim_dialect_wso2').attr('checked', (element.val() == 'custom'));
        //            $('#claim_dialect_custom').attr('checked', (element.val() == 'local'));
        //        });
        //} else {
        //    $('#claimMappingAddTable').hide();
        //    changeDialectUIs(element);
        //}
    });
}
function preDrawClaimConfig() {
    var spClaimConfig = null;
    var isLocalClaimsSelected = true;
    var claimMapping = null;

    if (json != null && json.return != null) {
        spClaimConfig = json.return.claimConfig;
    }
    if (spClaimConfig != null) {
        isLocalClaimsSelected = (spClaimConfig.localClaimDialect.toLowerCase() === 'true');
        claimMapping = spClaimConfig.claimMappings;
        if (claimMapping.constructor !== Array) {
            var tempArr = [];
            tempArr[0] = claimMapping;
            claimMapping = tempArr;
        }
    }
    getClaimUrisClaimConfig(spClaimConfig, isLocalClaimsSelected, claimMapping);
}
function getClaimUrisClaimConfig(spClaimConfig, isLocalClaimsSelected, claimMapping) {

    $.ajax({
        url: "/portal/gadgets/custom/controllers/custom/samlSSOConfig_handler.jag",
        type: "GET",
        data: "&cookie=" + cookie + "&user=" + userName + "&clientAction=getClaimURIs",
        success: function (data) {
            spConfigClaimUris = $.parseJSON(data).return;
            drawClaimConfig(spClaimConfig, isLocalClaimsSelected, claimMapping);
        },
        error: function (e) {
            message({
                content: 'Error occurred while getting the service provider configuration.',
                type: 'error',
                cbk: function () {
                }
            });
        }
    });

}
function resetRoleClaims() {
    $("#roleClaim option").filter(function () {
        return $(this).val().length > 0;
    }).remove();
    $("#subject_claim_uri option").filter(function () {
        return $(this).val().length > 0;
    }).remove();
    $.each($('.spClaimVal'), function () {
        if ($(this).val().length > 0) {
            $("#roleClaim").append('<option value="' + $(this).val() + '">' + $(this).val() + '</option>');
            $('#subject_claim_uri').append('<option value="' + $(this).val() + '">' + $(this).val() + '</option>');
        }
    });
}

function changeDialectUIs(element) {
    $("#roleClaim option").filter(function () {
        return $(this).val().length > 0;
    }).remove();

    $("#subject_claim_uri option").filter(function () {
        return $(this).val().length > 0;
    }).remove();

    if (element.val() == 'local') {
        $('#addClaimUrisLbl').text('Requested Claims:');
        $('#roleMappingSelection').hide();
        if ($('#local_calim_uris').length > 0 && $('#local_calim_uris').val().length > 0) {
            var dataArray = $('#local_calim_uris').val().split(',');
            if (dataArray.length > 0) {
                var optionsList = "";
                $.each(dataArray, function () {
                    if (this.length > 0) {
                        optionsList += '<option value=' + this + '>' + this + '</option>'
                    }
                });
                if (optionsList.length > 0) {
                    $('#subject_claim_uri').append(optionsList);
                }
            }
        }
    } else {
        $('#addClaimUrisLbl').text('Identity Provider Claim URIs:');
        $('#roleMappingSelection').show();
    }
}

function deleteClaimRow(obj) {
    if ($('input:radio[name=claim_dialect]:checked').val() == "custom") {
        if ($(obj).parent().parent().find('input.spClaimVal').val().length > 0) {
            $('#roleClaim option[value="' + $(obj).parent().parent().find('input.spClaimVal').val() + '"]').remove();
            $('#subject_claim_uri option[value="' + $(obj).parent().parent().find('input.spClaimVal').val() + '"]').remove();
        }
    }

    jQuery(obj).parent().parent().remove();
    if ($('.idpClaim').length == 0) {
        $('#claimMappingAddTable').hide();
    }
}

function validaForDuplications(selector, authenticatorName, type) {
    if ($(selector).length > 0) {
        var isNew = true;
        $.each($(selector), function () {
            if ($(this).val() == authenticatorName) {
                //CARBON.showWarningDialog(type+' "'+authenticatorName+'" is already added');
                isNew = false;
                return false;
            }
        });
        if (!isNew) {
            return false;
        }
    }
    return true;
}