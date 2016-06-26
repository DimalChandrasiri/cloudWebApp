function drawSAMLConfigPage(issuer, isEditSP, tableTitle) {
    $('#addServiceProvider h4').html(tableTitle);
    $('#issuer').val(issuer);
    $('#hiddenIssuer').val(issuer);
    if (isEditSP) {
        $('#issuer').prop('disabled', true);
    } else {
        $('#issuer').prop('disabled', false);
    }

    if (isEditSP && provider != null && provider.assertionConsumerUrls != null) {
        var assertionConsumerURLTblRow =
            "<table id=\"assertionConsumerURLsTable\" style=\"width: 40%; margin-bottom: 3px;\" class=\"styledInner\">" +
            "<tbody id=\"assertionConsumerURLsTableBody\">";

        var assertionConsumerURLsBuilder = "";
        var acsColumnId = 0;
        if (provider.assertionConsumerUrls.constructor !== Array) {
            var tempArr = [];
            tempArr[0] = provider.assertionConsumerUrls;
            provider.assertionConsumerUrls = tempArr;

        }
        for (var i in provider.assertionConsumerUrls) {
            var assertionConsumerURL = provider.assertionConsumerUrls[i];

            if (assertionConsumerURLsBuilder.length > 0) {
                assertionConsumerURLsBuilder = assertionConsumerURLsBuilder + "," + assertionConsumerURL;
            } else {
                assertionConsumerURLsBuilder = assertionConsumerURLsBuilder + assertionConsumerURL;
            }

            var trow = " <tr id=\"acsUrl_" + acsColumnId + "\">\n" +
                "<td style=\"padding-left: 15px !important; color: rgb(119, 119, 119);font-style: italic;\">\n" +
                assertionConsumerURL +
                "</td>" +
                "<td>" +
                "<a onclick=\"removeAssertionConsumerURL('" + assertionConsumerURL + "','acsUrl_" + acsColumnId + "');return false;\"" +
                "href=\"#\" class=\"icon-link\" style=\"background-image: url(../admin/images/delete.gif)\">\n" +
                "Delete" +
                "</a>\n" +
                "</td>\n" +
                "</tr>";
            assertionConsumerURLTblRow = assertionConsumerURLTblRow + trow;
            acsColumnId++;
        }

        var assertionConsumerURL = assertionConsumerURLsBuilder.length > 0 ? assertionConsumerURLsBuilder : "";
        assertionConsumerURLTblRow = assertionConsumerURLTblRow + "</tbody>\n" +
            "</table>\n";
        $('#assertionConsumerURLs').val(assertionConsumerURL);
        $('#currentColumnId').val(acsColumnId);
        $('#assertionConsumerURLTblRow').empty();
        $('#assertionConsumerURLTblRow').append(assertionConsumerURLTblRow);
    }

    var defaultAssertionConsumerURLRow = "<option value=\"\">---Select---</option>\n";

    if (isEditSP && provider != null && provider.assertionConsumerUrls != null) {
        for (var i in provider.assertionConsumerUrls) {
            var assertionConsumerUrl = provider.assertionConsumerUrls[i];
            var option = "";
            if (assertionConsumerUrl == provider.defaultAssertionConsumerUrl) {
                option = "<option value=\"" + assertionConsumerUrl + "\" selected>" + assertionConsumerUrl + "</option>";
            } else {
                option = "<option value=\"" + assertionConsumerUrl + "\">" + assertionConsumerUrl + "</option>";
            }
            defaultAssertionConsumerURLRow = defaultAssertionConsumerURLRow + option;
        }
    }
    $('#defaultAssertionConsumerURL').empty();
    $('#defaultAssertionConsumerURL').append(defaultAssertionConsumerURLRow);


    var nameIDVal = "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress";
    if (isEditSP && provider != null) {
        nameIDVal = provider.nameIDFormat.replace(/\//g, ":");
    }
    $('#nameIdFormat').val(nameIDVal);
    var certificateAliasRow = "";
    var aliasSet = spConfigCertificateAlias;
    if (provider != null && isEditSP) {
        if (aliasSet != null) {
            for (var i in aliasSet) {
                var alias = aliasSet[i];
                if (alias != null) {
                    if (alias == provider.certAlias) {
                        certificateAliasRow = certificateAliasRow + '<option selected="selected" value="' + alias + '">' + alias +
                            '</option>\n';
                    } else {
                        certificateAliasRow = certificateAliasRow + '<option value="' + alias + '">' + alias + '</option>\n';
                    }
                }
            }
        }
        $('#alias').empty();
        $('#alias').append(certificateAliasRow);
    } else {
        if (aliasSet != null) {
            for (var i in aliasSet) {
                var alias = aliasSet[i];
                if (alias != null) {
                    if (alias == 'http://www.w3.org/2000/09/xmldsig#rsa-sha1') {
                        certificateAliasRow = certificateAliasRow + '<option selected="selected" value="' + alias + '">' + alias +
                            '</option>\n';
                    } else {
                        certificateAliasRow = certificateAliasRow + '<option value="' + alias + '">' + alias + '</option>\n';
                    }
                }
            }
        }
        $('#alias').empty();
        $('#alias').append(certificateAliasRow);
    }


    var defaultSigningAlgorithmRow = "";
    if (spConfigSigningAlgos != null) {
        for (var i in spConfigSigningAlgos) {
            var signingAlgo = spConfigSigningAlgos[i];
            var signAlgorithm = null;
            if (provider != null) {
                signAlgorithm = provider.signingAlgorithmURI;
            }
            else {
                signAlgorithm = signingAlgorithmUriByConfig;
            }
            if (signAlgorithm != null && signingAlgo == signAlgorithm) {
                defaultSigningAlgorithmRow = defaultSigningAlgorithmRow + '<option value="' + signingAlgo + '" selected>\n' +
                    signingAlgo + '</option>';
            } else {
                defaultSigningAlgorithmRow = defaultSigningAlgorithmRow + '<option value="' + signingAlgo + '">' + signingAlgo +
                    '</option>\n';
            }
        }
    }
    $('#signingAlgorithm').empty();
    $('#signingAlgorithm').append(defaultSigningAlgorithmRow);

    var digestAlgorithmRow = "";

    if (spConfigDigestAlgos != null) {
        for (var i in spConfigDigestAlgos) {
            var digestAlgo = spConfigDigestAlgos[i];
            var digestAlgorithm = "";
            if (provider != null) {
                digestAlgorithm = provider.digestAlgorithmURI;
            } else {
                digestAlgorithm = digestAlgorithmUriByConfig;
            }
            if (digestAlgorithm != "" && digestAlgo == digestAlgorithm) {
                digestAlgorithmRow = digestAlgorithmRow + '<option value="' + digestAlgo + '" selected>' + digestAlgo +
                    '</option>';
            } else {
                digestAlgorithmRow = digestAlgorithmRow + '<option value="' + digestAlgo + '">' + digestAlgo +
                    '</option>';
            }
        }
    }
    $('#digestAlgorithm').empty();
    $('#digestAlgorithm').append(digestAlgorithmRow);
    if (isEditSP && provider.doSignResponse == 'true') {
        $('#enableResponseSignature').prop('checked', true);
    } else {
        $('#enableResponseSignature').prop('checked', false);
    }

    if (isEditSP && provider.doValidateSignatureInRequests == 'true') {
        $('#enableSigValidation').prop('checked', true);
    } else {
        $('#enableSigValidation').prop('checked', false);
    }

    if (isEditSP && provider.doEnableEncryptedAssertion == 'true') {
        $('#enableEncAssertion').prop('checked', true);
    } else {
        $('#enableEncAssertion').prop('checked', false);
    }

    if (isEditSP && provider.doSingleLogout == 'true') {
        $('#enableSingleLogout').prop('checked', true);
        $('#sloResponseURL').prop('disabled', false);
        $('#sloRequestURL').prop('disabled', false);
        $('#sloResponseURL').val(provider.sloResponseURL);
        $('#sloRequestURL').val(provider.sloRequestURL);
    } else {
        $('#enableSingleLogout').prop('checked', false);
        $('#sloResponseURL').prop('disabled', true);
        $('#sloRequestURL').prop('disabled', true);
        $('#sloResponseURL').val("");
        $('#sloRequestURL').val("");
    }



    var appClaimConfigs = appdata.claimConfig.claimMappings;
    var requestedClaimsCounter = 0;
    if (appClaimConfigs != null) {
        if (appClaimConfigs.constructor !== Array) {
            var tempArr = [];
            tempArr[0] = appClaimConfigs;
            appClaimConfigs = tempArr;
        }

        for (var i in appClaimConfigs) {
            var tempClaim = appClaimConfigs[i];
            if (tempClaim.requested == 'true') {
                requestedClaimsCounter = requestedClaimsCounter + 1;
            }
        }
    }
    //spConfigClaimUris
    var applicationSPName = appdata.applicationName;
    var show = false;
    if (applicationSPName == null || applicationSPName.length == 0) {
        if (requestedClaimsCounter > 0) {
            show = true;
        }
    } else {
        show = true;
    }
    if (isEditSP && show) {

        if (provider.attributeConsumingServiceIndex != null && provider.attributeConsumingServiceIndex.length > 0) {
            $('#enableAttributeProfile').prop("checked", true);
            $('#enableDefaultAttributeProfile').prop("disabled", false);
            $('#enableAttributeProfile').val("true");
            if (provider.enableAttributesByDefault == 'true') {
                $('#enableDefaultAttributeProfile').prop("checked", true);
                $('#enableDefaultAttributeProfile').val("true");
                $('#enableDefaultAttributeProfileHidden').val("true");
            }
            else {
                $('#enableDefaultAttributeProfile').prop("checked", false);
                $('#enableDefaultAttributeProfile').val("false");
                $('#enableDefaultAttributeProfileHidden').val("false");
            }
        } else {
            $('#enableAttributeProfile').prop("checked", false);
            $('#enableAttributeProfile').val("false");
            $('#enableDefaultAttributeProfile').prop("checked", false);
            $('#enableDefaultAttributeProfile').prop("disabled", true);
        }
    } else {
        $('#enableAttributeProfile').val("false");
        $('#enableDefaultAttributeProfile').val("false");
        $('#enableAttributeProfile').prop("checked", false);
        $('#enableDefaultAttributeProfile').prop("checked", false);
        $('#enableDefaultAttributeProfile').prop("disabled", true);
    }

    var enableAudienceRestrictionRow = "";
    if (isEditSP && provider.requestedAudiences != null && provider.requestedAudiences.length > 0 &&
        provider.requestedAudiences[0] != null) {
        $('#enableAudienceRestriction').prop("checked",true);
        $('#audience').prop('disabled', false);
    } else {
        $('#enableAudienceRestriction').prop("checked",false);
        $('#audience').prop('disabled', true);
    }
    var audienceTableStyle = "";
    if (provider != null && provider.requestedAudiences != null && provider.requestedAudiences.length > 0) {
        audienceTableStyle = "";
    } else {
        audienceTableStyle = "display:none";
    }

    enableAudienceRestrictionRow = enableAudienceRestrictionRow +
        '    <table id="audienceTableId" style="width: 40%;' + audienceTableStyle + '" class="styledInner">' +
        '        <tbody id="audienceTableTbody">';
    var j = 0;
    if (isEditSP && provider.requestedAudiences != null && provider.requestedAudiences.length > 0) {
        if (provider.requestedAudiences.constructor === Array) {
            for (var i in provider.requestedAudiences) {
                var audience = provider.requestedAudiences[i];
                if (audience != null && "null" != audience) {
                    enableAudienceRestrictionRow = enableAudienceRestrictionRow + '<tr id="audienceRow' + j + '">' +
                        '                    <td style="padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;">' +
                        '                    <input type="hidden" name="audiencePropertyName' + j + '"' +
                        '                id="audiencePropertyName' + j + '" value="' + audience + '"/>' + audience +
                        '                    </td>' +
                        '                    <td>' +
                        '                    <a onclick="removeAudience(\'' + j + '\');return false;"' +
                        '                href="#" class="icon-link"' +
                        '                style="background-image: url(../admin/images/delete.gif)">Delete' +
                        '                    </a>' +
                        '                    </td>' +
                        '                    </tr>';
                    j = j + 1;
                }
            }
        }
        else {
            enableAudienceRestrictionRow = enableAudienceRestrictionRow + '<tr id="audienceRow' + j + '">' +
                '                    <td style="padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;">' +
                '                    <input type="hidden" name="audiencePropertyName' + j + '"' +
                '                id="audiencePropertyName' + j + '" value="' + provider.requestedAudiences + '"/>' + provider.requestedAudiences +
                '                    </td>' +
                '                    <td>' +
                '                    <a onclick="removeAudience(\'' + j + '\');return false;"' +
                '                href="#" class="icon-link"' +
                '                style="background-image: url(../admin/images/delete.gif)">Delete' +
                '                    </a>' +
                '                    </td>' +
                '                    </tr>';
            j = j + 1;
        }

    }
    $('#audiencePropertyCounter').val(j);
    enableAudienceRestrictionRow = enableAudienceRestrictionRow +
        '        </tbody>' +
        '        </table>' ;
    $('#audienceTblRow').empty();
    $('#audienceTblRow').append(enableAudienceRestrictionRow);


    var enableReceiptValidRow = "";

    if (isEditSP && provider.requestedRecipients != null && provider.requestedRecipients.length > 0 && provider.requestedRecipients[0] != null) {
        $('#enableRecipients').prop("checked",true);
        $('#recipient').prop('disabled', false);
    } else {
        $('#enableRecipients').prop("checked",false);
        $('#recipient').prop('disabled', true);
    }

    var recipientTableStyle = "";
    if (provider != null && provider.requestedRecipients != null && provider.requestedRecipients.length > 0) {
        recipientTableStyle = "";
    } else {
        recipientTableStyle = "display:none";
    }
    enableReceiptValidRow = enableReceiptValidRow +
        '    <table id="recipientTableId" style="width: 40%; ' + recipientTableStyle + ';" class="styledInner">' +
        '        <tbody id="recipientTableTbody">';

    var k = 0;
    if (isEditSP && provider.requestedRecipients != null && provider.requestedRecipients.length > 0) {
        if(provider.requestedRecipients.constructor !== Array){
            var tempArr = [provider.requestedRecipients];
            provider.requestedRecipients = tempArr;
        }
        for (var i in provider.requestedRecipients) {
            var recipient = provider.requestedRecipients[i];
            if (recipient != null && "null" != recipient) {

                enableReceiptValidRow = enableReceiptValidRow + '<tr id="recipientRow' + k + '">' +
                    '                    <td style="padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;">' +
                    '                    <input type="hidden" name="recipientPropertyName' + k + '"' +
                    '                id="recipientPropertyName' + k + '" value="' + recipient + '"/>' + recipient +
                    '                    </td>' +
                    '                    <td>' +
                    '                    <a onclick="removeRecipient(\'' + k + '\');return false;"' +
                    '                href="#" class="icon-link"' +
                    '                style="background-image: url(../admin/images/delete.gif)">Delete' +
                    '                    </a>' +
                    '                    </td>' +
                    '                    </tr>';
                k = k + 1;
            }
        }

    }
    $('#recipientPropertyCounter').val(k);
    enableReceiptValidRow = enableReceiptValidRow +
        '        </tbody>' +
        '        </table>' ;
    $('#recptTblRow').empty();
    $('#recptTblRow').append(enableReceiptValidRow);

    if (isEditSP && provider.idPInitSSOEnabled=='true') {
        $('#enableIdPInitSSO').prop("checked",true);
    } else {
        $('#enableIdPInitSSO').prop("checked",false);
    }

    if (isEditSP && provider.idPInitSLOEnabled == 'true') {
        $('#enableIdPInitSLO').prop("checked",true);
    } else {
        $('#enableIdPInitSLO').prop("checked",false);
    }

    var tempstyle = "";
    if (isEditSP && provider.idPInitSLOEnabled == 'true') {
        $('#returnToURLTxtBox').prop("disabled",false);
        $('#addReturnToURL').prop("disabled",false);
    } else {
        $('#returnToURLTxtBox').prop("disabled",true);
        $('#addReturnToURL').prop("disabled",true);
    }

    var idpSLOReturnToURLInputRow = '<table id="idpSLOReturnToURLsTbl" style="width: 40%;" class="styledInner">\n' +
        '            <tbody id="idpSLOReturnToURLsTblBody">\n';
    var returnToColumnId = 0;
    if (isEditSP && provider.idpInitSLOReturnToURLs != null) {
        var sloReturnToURLsBuilder = "";

        if (provider.idpInitSLOReturnToURLs.constructor !== Array) {
            var tempArr = [provider.idpInitSLOReturnToURLs];
            provider.idpInitSLOReturnToURLs = tempArr;
        }
        for (var i in provider.idpInitSLOReturnToURLs) {
            var returnToURL = provider.idpInitSLOReturnToURLs[i];
            if (returnToURL != null && "null" != returnToURL) {
                if (sloReturnToURLsBuilder.length > 0) {
                    sloReturnToURLsBuilder = sloReturnToURLsBuilder + "," + returnToURL;
                } else {
                    sloReturnToURLsBuilder = sloReturnToURLsBuilder + returnToURL;
                }
                idpSLOReturnToURLInputRow = idpSLOReturnToURLInputRow + '<tr id="returnToUrl_' + returnToColumnId + '">' +
                    '                    <td style="padding-left: 15px !important; color: rgb(119, 119, 119);font-style: italic;">' +
                    returnToURL +
                    '                    </td>' +
                    '                    <td>' +
                    '                    <a onclick="removeSloReturnToURL(\'' + returnToURL + '\', \'returnToUrl_' + returnToColumnId + '\');return false;"' +
                    '                href="#" class="icon-link"' +
                    '                style="background-image: url(../admin/images/delete.gif)">' +
                    '                    Delete' +
                    '                    </a>' +
                    '                    </td>' +
                    '                    </tr>';
                returnToColumnId = returnToColumnId + 1;
            }
            }

    }
        idpSLOReturnToURLInputRow = idpSLOReturnToURLInputRow + '</tbody>' +
            '        </table>';
        $('#idpInitSLOReturnToURLs').val(sloReturnToURLsBuilder);
        $('#currentReturnToColumnId').val(returnToColumnId);


    $("#idpSLOReturnToURLInputRow").empty();
    $("#idpSLOReturnToURLInputRow").append(idpSLOReturnToURLInputRow);
    if (isEditSP && provider.attributeConsumingServiceIndex != null && provider.attributeConsumingServiceIndex.length > 0){
        $('#attributeConsumingServiceIndex').val(provider.attributeConsumingServiceIndex);
    }
}

function preDrawSAMLConfigPage() {
    provider = null;
    serviceProviders = null;
    spConfigClaimUris = null;
    spConfigCertificateAlias = null;
    spConfigSigningAlgos = null;
    spConfigDigestAlgos = null;
    signingAlgorithmUriByConfig = null;
    digestAlgorithmUriByConfig = null;
    $.ajax({
        url: "/dashboard/serviceproviders/custom/controllers/custom/samlSSOConfigClient.jag",
        type: "GET",
        data: "&cookie=" + cookie + "&user=" + userName,
        success: function (data) {
            var tableTitle = "New Service Provider";
            var isEditSP = false;
            var issuer = "";
            if (appdata != null && appdata.inboundAuthenticationConfig != null
                && appdata.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs != null) {
                if(appdata.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs.constructor !== Array){
                    var tempArr = [];
                    tempArr[0] = appdata.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs;
                    appdata.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs = tempArr;
                }
                for (var i in appdata.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs) {
                    var inboundConfig = appdata.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs[i];
                    if (inboundConfig.inboundAuthType == "samlsso" && inboundConfig.inboundAuthKey.length > 0) {
                        tableTitle = "Edit Service Provider (" + inboundConfig.inboundAuthKey + ")";
                        issuer = inboundConfig.inboundAuthKey;
                        isEditSP = true;
                        $('#issuersaml').val(issuer);
                    }
                }
            }
            if(isEditSP){
                $('#samlAttrIndexForm').show();
                $('#samlConfigBtn').hide();
                $('#samlRgsterBtn').hide();
                $('#samlUpdtBtn').show();
            } else {
                $('#samlAttrIndexForm').hide();
                $('#samlConfigBtn').show();
                $('#samlRgsterBtn').show();
                $('#samlUpdtBtn').hide();
            }
            $('#isEditSp').val(isEditSP);
            samlClient = $.parseJSON(data);
            serviceProviders = samlClient.serviceProviders.serviceProviders;
            if(serviceProviders!=null) {
                if (serviceProviders.constructor !== Array) {
                    var spArr = [];
                    spArr[0] = serviceProviders;
                    serviceProviders = spArr;
                }
                for (var i in serviceProviders) {
                    var sp = serviceProviders[i];
                    if (sp.issuer == issuer) {
                        provider = sp;
                        $('#acsindex').val(provider.attributeConsumingServiceIndex);
                    }
                }
            }
            spConfigClaimUris = samlClient.claimURIs;
            spConfigCertificateAlias = samlClient.certAliases;
            spConfigSigningAlgos = samlClient.signingAlgos;
            spConfigDigestAlgos = samlClient.digestAlgos;
            signingAlgorithmUriByConfig = samlClient.signingAlgo;
            digestAlgorithmUriByConfig = samlClient.digestAlgo;
            drawSAMLConfigPage(issuer, isEditSP, tableTitle);
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

function preDrawSalesForce(){
    spConfigClaimUris = null;
    spConfigCertificateAlias = null;
    spConfigSigningAlgos = null;
    spConfigDigestAlgos = null;
    signingAlgorithmUriByConfig = null;
    digestAlgorithmUriByConfig = null;
    $.ajax({
        url: "/dashboard/serviceproviders/custom/controllers/custom/samlSSOConfigClient.jag",
        type: "GET",
        data: "&cookie=" + cookie + "&user=" + userName +"&spType=salesforce",
        success: function (data) {
            samlClient = $.parseJSON(data);
            spConfigClaimUris = samlClient.claimURIs;
            spConfigCertificateAlias = samlClient.certAliases;
            spConfigSigningAlgos = samlClient.signingAlgos;
            spConfigDigestAlgos = samlClient.digestAlgos;
            signingAlgorithmUriByConfig = samlClient.signingAlgo;
            digestAlgorithmUriByConfig = samlClient.digestAlgo;
            var inboundConfig = null;
            if (appdata != null && appdata.inboundAuthenticationConfig != null
                && appdata.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs != null) {
                if(appdata.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs.constructor !== Array){
                    var tempArr = [];
                    tempArr[0] = appdata.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs;
                    appdata.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs = tempArr;
                }
                for (var i in appdata.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs) {
                    inboundConfig = appdata.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs[i];
                    if (inboundConfig.inboundAuthType == "Salesforce") {
                        break;
                    }
                }
                drawSalesForce(inboundConfig);
            }

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

function drawSalesForce(salesforceConfig){
    showSamlForm();
    $('#samlRgsterBtn').hide();
    $('#samlUpdtBtn').hide();
    $('#samlCanclBtn').hide();
    $('#idpInitSLORow').hide();
    $('#idpInitSSORow').hide();
    $('#receipientRow').hide();
    $('#audienceRestrictionRow').hide();
    $('#attributeRow').hide();
    $('#singleLogoutRow').hide();
    $('#nameIDRow').hide();
    $('#issuerRow').hide();
    $('#addServiceProvider h4').html('Salesforce Configuration');
    $('#spType').val('salesforce]');

    var signAlgorithm = signingAlgorithmUriByConfig;
    var digestAlgorithm = digestAlgorithmUriByConfig;
    var doSignResponse = false;
    var doValidateSignatureInRequests = false;
    var doEnableEncryptedAssertion = false;
    var certAlias = 'http://www.w3.org/2000/09/xmldsig#rsa-sha1';
    var acsurls = null;
    var defaultacs = null;
    var salesforceProperties = {};
    if(salesforceConfig != null && salesforceConfig.properties != null){
        if(salesforceConfig.properties.constructor !== Array){
            salesforceConfig.properties = [salesforceConfig.properties.constructor];
        }
        for (var i in salesforceConfig.properties) {
            salesforceProperties[salesforceConfig.properties[i].name] = salesforceConfig.properties[i];
        }
        if (salesforceProperties["enableEncAssertion"].value == "true") {
            doEnableEncryptedAssertion = true;
        }
        if (salesforceProperties["enableResponseSignature"].value == "true") {
            doSignResponse = true;
        }
        if (salesforceProperties["enableSigValidation"].value == "true") {
            doValidateSignatureInRequests = true;
        }
        if (salesforceProperties["signingAlgorithm"].value != null && salesforceProperties["signingAlgorithm"].value.length > 0) {
            signAlgorithm = salesforceProperties["signingAlgorithm"].value;
        }
        if (salesforceProperties["digestAlgorithm"].value != null && salesforceProperties["digestAlgorithm"].value.length > 0) {
            digestAlgorithm = salesforceProperties["digestAlgorithm"].value;
        }
        if (salesforceProperties["alias"].value != null && salesforceProperties["alias"].value.length > 0) {
            certAlias = salesforceProperties["alias"].value;
        }
        if (salesforceProperties["assertionConsumerURLs"].value != null && salesforceProperties["assertionConsumerURLs"].value.length > 0) {
            acsurls = salesforceProperties["assertionConsumerURLs"].value.split(',');
        }
        if (salesforceProperties["defaultAssertionConsumerURL"].value != null && salesforceProperties["defaultAssertionConsumerURL"].value.length > 0) {
            defaultacs = salesforceProperties["defaultAssertionConsumerURL"].value;
        }
    }
    var defaultAssertionConsumerURLRow = "<option value=\"\">---Select---</option>\n";
    if (acsurls != null) {
        var assertionConsumerURLTblRow =
            "<table id=\"assertionConsumerURLsTable\" style=\"width: 40%; margin-bottom: 3px;\" class=\"styledInner\">" +
            "<tbody id=\"assertionConsumerURLsTableBody\">";

        var assertionConsumerURLsBuilder = "";
        var acsColumnId = 0;
        if (acsurls.constructor !== Array) {
            acsurls = [acsurls];
        }
        if (defaultacs == null) {
            defaultacs = acsurls[0];
        }
        for (var i in acsurls) {
            var assertionConsumerURL = acsurls[i];
            var option = "";
            if (assertionConsumerURL == defaultacs) {
                option = "<option value=\"" + assertionConsumerURL + "\" selected>" + assertionConsumerURL + "</option>";
            } else {
                option = "<option value=\"" + assertionConsumerURL + "\">" + assertionConsumerURL + "</option>";
            }
            defaultAssertionConsumerURLRow = defaultAssertionConsumerURLRow + option;

            if (assertionConsumerURLsBuilder.length > 0) {
                assertionConsumerURLsBuilder = assertionConsumerURLsBuilder + "," + assertionConsumerURL;
            } else {
                assertionConsumerURLsBuilder = assertionConsumerURLsBuilder + assertionConsumerURL;
            }

            var trow = " <tr id=\"acsUrl_" + acsColumnId + "\">\n" +
                "<td style=\"padding-left: 15px !important; color: rgb(119, 119, 119);font-style: italic;\">\n" +
                assertionConsumerURL +
                "</td>" +
                "<td>" +
                "<a onclick=\"removeAssertionConsumerURL('" + assertionConsumerURL + "','acsUrl_" + acsColumnId + "');return false;\"" +
                "href=\"#\" class=\"icon-link\" style=\"background-image: url(../admin/images/delete.gif)\">\n" +
                "Delete" +
                "</a>\n" +
                "</td>\n" +
                "</tr>";
            assertionConsumerURLTblRow = assertionConsumerURLTblRow + trow;
            acsColumnId++;
        }

        var assertionConsumerURL = assertionConsumerURLsBuilder.length > 0 ? assertionConsumerURLsBuilder : "";
        assertionConsumerURLTblRow = assertionConsumerURLTblRow + "</tbody>\n" +
            "</table>\n";
        $('#assertionConsumerURLs').val(assertionConsumerURL);
        $('#currentColumnId').val(acsColumnId);
        $('#assertionConsumerURLTblRow').empty();
        $('#assertionConsumerURLTblRow').append(assertionConsumerURLTblRow);
    }
    $('#defaultAssertionConsumerURL').empty();
    $('#defaultAssertionConsumerURL').append(defaultAssertionConsumerURLRow);


    var certificateAliasRow = "";
    if (spConfigCertificateAlias != null) {
        for (var i in spConfigCertificateAlias) {
            var alias = spConfigCertificateAlias[i];
            if (alias != null) {
                if (alias == certAlias) {
                    certificateAliasRow = certificateAliasRow + '<option selected="selected" value="' + alias + '">' + alias +
                        '</option>\n';
                } else {
                    certificateAliasRow = certificateAliasRow + '<option value="' + alias + '">' + alias + '</option>\n';
                }
            }
        }
    }
    $('#alias').empty();
    $('#alias').append(certificateAliasRow);


    var defaultSigningAlgorithmRow = "";
    if (spConfigSigningAlgos != null) {
        for (var i in spConfigSigningAlgos) {
            var signingAlgo = spConfigSigningAlgos[i];

            if (signAlgorithm != null && signingAlgo == signAlgorithm) {
                defaultSigningAlgorithmRow = defaultSigningAlgorithmRow + '<option value="' + signingAlgo + '" selected>\n' +
                    signingAlgo + '</option>';
            } else {
                defaultSigningAlgorithmRow = defaultSigningAlgorithmRow + '<option value="' + signingAlgo + '">' + signingAlgo +
                    '</option>\n';
            }
        }
    }
    $('#signingAlgorithm').empty();
    $('#signingAlgorithm').append(defaultSigningAlgorithmRow);

    var digestAlgorithmRow = "";

    if (spConfigDigestAlgos != null) {
        for (var i in spConfigDigestAlgos) {
            var digestAlgo = spConfigDigestAlgos[i];
            if (digestAlgorithm != "" && digestAlgo == digestAlgorithm) {
                digestAlgorithmRow = digestAlgorithmRow + '<option value="' + digestAlgo + '" selected>' + digestAlgo +
                    '</option>';
            } else {
                digestAlgorithmRow = digestAlgorithmRow + '<option value="' + digestAlgo + '">' + digestAlgo +
                    '</option>';
            }
        }
    }
    $('#digestAlgorithm').empty();
    $('#digestAlgorithm').append(digestAlgorithmRow);
    if (doSignResponse) {
        $('#enableResponseSignature').prop('checked', true);
    } else {
        $('#enableResponseSignature').prop('checked', false);
    }

    if (doValidateSignatureInRequests) {
        $('#enableSigValidation').prop('checked', true);
    } else {
        $('#enableSigValidation').prop('checked', false);
    }

    if (doEnableEncryptedAssertion) {
        $('#enableEncAssertion').prop('checked', true);
    } else {
        $('#enableEncAssertion').prop('checked', false);
    }


}
function onClickAddACRUrl() {
    //var isValidated = doValidateInputToConfirm(document.getElementById('assertionConsumerURLTxt'), "<fmt:message key='sp.not.https.endpoint.address'/>",
    //    addAssertionConsumerURL, null, null);
    var isValidated = true;
    if (isValidated) {
        addAssertionConsumerURL();
    }
}

function disableAttributeProfile(chkbx) {
    if(chkbx.checked){
        $('#enableDefaultAttributeProfile').prop("disabled", false);
        $('#enableAttributeProfile').val(true);
    } else {
        $('#enableDefaultAttributeProfile').prop("checked", false);
        $('#enableDefaultAttributeProfile').prop("disabled", true);
        $('#enableAttributeProfile').val(false);
    }
}
function disableDefaultAttributeProfile(chkbx) {
    if (chkbx.checked) {
        $('#enableDefaultAttributeProfileHidden').val("true");
        $('#enableDefaultAttributeProfile').val(true);
    } else {
        $('#enableDefaultAttributeProfileHidden').val("false");
        $('#enableDefaultAttributeProfile').val(false);
    }

}

function disableResponseSignature(chkbx) {
    if (chkbx.checked) {
        $('#enableResponseSignature').val(true);
    } else {
        $('#enableResponseSignature').val(false);
    }
}

function disableLogoutUrl(chkbx) {
    if ($(chkbx).is(':checked')) {
        $("#sloResponseURL").prop('disabled', false);
        $("#sloRequestURL").prop('disabled', false);
    } else {
        $("#sloResponseURL").prop('disabled', true);
        $("#sloRequestURL").prop('disabled', true);
        $("#sloResponseURL").val("");
        $("#sloRequestURL").val("");
    }
}

function disableAudienceRestriction(chkbx) {
    if ($(chkbx).is(':checked')) {
        $("#audience").prop('disabled', false);
        $("#addAudience").prop('disabled', false);
    } else {
        $("#audience").prop('disabled', true);
        $("#addAudience").prop('disabled', true);
    }
}

function disableRecipients(chkbx) {
    if ($(chkbx).is(':checked')) {
        $("#recipient").prop('disabled', false);
        $("#addRecipient").prop('disabled', false);
    } else {
        $("#recipient").prop('disabled', true);
        $("#addRecipient").prop('disabled', true);
    }
}

function disableIdPInitSSO(chkbx) {
    $('#disableIdPInitSSO').val(chkbx.checked);
}


function disableIdPInitSLO(chkbx) {
    if ($(chkbx).is(':checked')) {
        $("#returnToURLTxtBox").prop('disabled', false);
        $("#addReturnToURL").prop('disabled', false);
    } else {
        $("#returnToURLTxtBox").prop('disabled', true);
        $("#addReturnToURL").prop('disabled', true);
    }
}

function isContainRaw(tbody) {
    if (tbody.childNodes == null || tbody.childNodes.length == 0) {
        return false;
    } else {
        for (var i = 0; i < tbody.childNodes.length; i++) {
            var child = tbody.childNodes[i];
            if (child != undefined && child != null) {
                if (child.nodeName == "tr" || child.nodeName == "TR") {
                    return true;
                }
            }
        }
    }
    return false;
}
/**
 *
 * Manage tables
 */
function addAssertionConsumerURL() {
    var assertionConsumerURL = $("#assertionConsumerURLTxt").val();
    if (assertionConsumerURL == null || assertionConsumerURL.trim().length == 0) {
        //CARBON.showWarningDialog("<fmt:message key='sp.enter.not.valid.endpoint.address'/>", null, null);
        return false;
    }

    assertionConsumerURL = assertionConsumerURL.trim();

    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (!regexp.test(assertionConsumerURL) || assertionConsumerURL.indexOf(",") > -1) {
        //CARBON.showWarningDialog("<fmt:message key='sp.enter.not.valid.endpoint.address'/>", null, null);
        return false;
    }

    if ($("#assertionConsumerURLsTable").length == 0) {
        var row =
            '        <table id="assertionConsumerURLsTable" style="width: 40%; margin-bottom: 3px;" class="styledInner">' +
            '            <tbody id="assertionConsumerURLsTableBody">' +
            '            </tbody>' +
            '        </table>' ;
        $('#assertionConsumerURLTblRow').append(row);
        $('#assertionConsumerURLs').val("");
        $('#currentColumnId').val("0");
    }

    var assertionConsumerURLs = $("#assertionConsumerURLs").val();
    var currentColumnId = $("#currentColumnId").val();
    if (assertionConsumerURLs == null || assertionConsumerURLs.trim().length == 0) {

        $("#assertionConsumerURLs").val(assertionConsumerURL);
        var row =
            '<tr id="acsUrl_' + parseInt(currentColumnId) + '">' +
            '</td><td style="padding-left: 15px !important; color: rgb(119, 119, 119);font-style: italic;">' + assertionConsumerURL +
            '</td><td><a onclick="removeAssertionConsumerURL (\'' + assertionConsumerURL + '\', \'acsUrl_' + parseInt(currentColumnId) + '\');return false;"' +
            'href="#" class="icon-link" style="background-image: url(../admin/images/delete.gif)"> Delete </a></td></tr>';

        $('#assertionConsumerURLsTable tbody').append(row);
        $('#defaultAssertionConsumerURL').append($("<option></option>").attr("value", assertionConsumerURL).text(assertionConsumerURL));
        $('#defaultAssertionConsumerURL').val(assertionConsumerURL);
    } else {
        var isExist = false;
        $.each(assertionConsumerURLs.split(","), function (index, value) {
            if (value === assertionConsumerURL) {
                isExist = true;
                //CARBON.showWarningDialog("<fmt:message key='sp.endpoint.address.already.exists'/>", null, null);
                return false;
            }
        });
        if (isExist) {
            return false;
        }

        $("#assertionConsumerURLs").val(assertionConsumerURLs + "," + assertionConsumerURL);
        var row =
            '<tr id="acsUrl_' + parseInt(currentColumnId) + '">' +
            '</td><td style="padding-left: 15px !important; color: rgb(119, 119, 119);font-style: italic;">' + assertionConsumerURL +
            '</td><td><a onclick="removeAssertionConsumerURL(\'' + assertionConsumerURL + '\', \'acsUrl_' + parseInt(currentColumnId) + '\');return false;"' +
            'href="#" class="icon-link" style="background-image: url(../admin/images/delete.gif)"> Delete </a></td></tr>';

        $('#assertionConsumerURLsTable tr:last').after(row);
        $('#defaultAssertionConsumerURL').append($("<option></option>").attr("value", assertionConsumerURL).text(assertionConsumerURL));
    }
    $("#assertionConsumerURLTxt").val("");
    $("#currentColumnId").val(parseInt(currentColumnId) + 1);
}

function removeAssertionConsumerURL(assertionConsumerURL, columnId) {

    var assertionConsumerURLs = $("#assertionConsumerURLs").val();
    var defaultAssertionConsumerURL = $('#defaultAssertionConsumerURL').val();
    var newAssertionConsumerURLs = "";
    var isDeletingSelected = false;

    if (assertionConsumerURLs != null && assertionConsumerURLs.trim().length > 0) {
        $.each(assertionConsumerURLs.split(","), function (index, value) {
            if (value === assertionConsumerURL) {
                if (assertionConsumerURL === defaultAssertionConsumerURL) {
                    isDeletingSelected = true;
                }
                return true;
            }

            if (newAssertionConsumerURLs.length > 0) {
                newAssertionConsumerURLs = newAssertionConsumerURLs + "," + value;
            } else {
                newAssertionConsumerURLs = value;
            }
        });
    }

    $('#defaultAssertionConsumerURL option[value="' + assertionConsumerURL + '"]').remove();

    if (isDeletingSelected && newAssertionConsumerURLs.length > 0) {
        $('select[id="defaultAssertionConsumerURL"] option:eq(1)').attr('selected', 'selected');
    }

    $('#' + columnId).remove();
    $("#assertionConsumerURLs").val(newAssertionConsumerURLs);

    if (newAssertionConsumerURLs.length == 0) {
        $('#assertionConsumerURLsTable').remove();
    }
}

function addAudienceFunc() {
    var propertyCount = document.getElementById("audiencePropertyCounter");

    var i = propertyCount.value;
    var currentCount = parseInt(i);

    currentCount = currentCount + 1;
    propertyCount.value = currentCount;

    document.getElementById('audienceTableId').style.display = '';
    var audienceTableTBody = document.getElementById('audienceTableTbody');

    var audienceRow = document.createElement('tr');
    audienceRow.setAttribute('id', 'audienceRow' + i);

    var audience = document.getElementById('audience').value;
    var audiencePropertyTD = document.createElement('td');
    audiencePropertyTD.setAttribute('style', 'padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;');
    audiencePropertyTD.innerHTML = "" + audience + "<input type='hidden' name='audiencePropertyName" + i + "' id='audiencePropertyName" + i + "'  value='" + audience + "'/> ";

    var audienceRemoveTD = document.createElement('td');
    audienceRemoveTD.innerHTML = "<a href='#' class='icon-link' style='background-image: url(../admin/images/delete.gif)' onclick='removeAudience(" + i + ");return false;'>" + "Delete" + "</a>";

    audienceRow.appendChild(audiencePropertyTD);
    audienceRow.appendChild(audienceRemoveTD);

    audienceTableTBody.appendChild(audienceRow);
}

function removeAudience(i) {
    var propRow = document.getElementById("audienceRow" + i);
    if (propRow != undefined && propRow != null) {
        var parentTBody = propRow.parentNode;
        if (parentTBody != undefined && parentTBody != null) {
            parentTBody.removeChild(propRow);
            if (!isContainRaw(parentTBody)) {
                var propertyTable = document.getElementById("audienceTableId");
                propertyTable.style.display = "none";
            }
        }
    }
}

function addRecipientFunc() {
    var propertyCount = document.getElementById("recipientPropertyCounter");

    var i = propertyCount.value;
    var currentCount = parseInt(i);

    currentCount = currentCount + 1;
    propertyCount.value = currentCount;

    document.getElementById('recipientTableId').style.display = '';
    var recipientTableTBody = document.getElementById('recipientTableTbody');

    var recipientRow = document.createElement('tr');
    recipientRow.setAttribute('id', 'recipientRow' + i);

    var recipient = document.getElementById('recipient').value;
    var recipientPropertyTD = document.createElement('td');
    recipientPropertyTD.setAttribute('style', 'padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;');
    recipientPropertyTD.innerHTML = "" + recipient + "<input type='hidden' name='recipientPropertyName" + i + "' id='recipientPropertyName" + i + "'  value='" + recipient + "'/> ";

    var recipientRemoveTD = document.createElement('td');
    recipientRemoveTD.innerHTML = "<a href='#' class='icon-link' style='background-image: url(../admin/images/delete.gif)' onclick='removeRecipient(" + i + ");return false;'>" + "Delete" + "</a>";

    recipientRow.appendChild(recipientPropertyTD);
    recipientRow.appendChild(recipientRemoveTD);

    recipientTableTBody.appendChild(recipientRow);
}

function removeRecipient(i) {
    var propRow = document.getElementById("recipientRow" + i);
    if (propRow != undefined && propRow != null) {
        var parentTBody = propRow.parentNode;
        if (parentTBody != undefined && parentTBody != null) {
            parentTBody.removeChild(propRow);
            if (!isContainRaw(parentTBody)) {
                var propertyTable = document.getElementById("recipientTableId");
                propertyTable.style.display = "none";
            }
        }
    }
}

function removeSloReturnToURL(returnToURL, columnId) {

    var idpInitSLOReturnToURLs = $("#idpInitSLOReturnToURLs").val();
    var newIdpInitSLOReturnToURLs = "";

    if (idpInitSLOReturnToURLs != null && idpInitSLOReturnToURLs.trim().length > 0) {
        $.each(idpInitSLOReturnToURLs.split(","), function (index, value) {
            if (value === returnToURL) {
                return true;
            }

            if (newIdpInitSLOReturnToURLs.length > 0) {
                newIdpInitSLOReturnToURLs = newIdpInitSLOReturnToURLs + "," + value;
            } else {
                newIdpInitSLOReturnToURLs = value;
            }
        });
    }

    $('#' + columnId).remove();
    $("#idpInitSLOReturnToURLs").val(newIdpInitSLOReturnToURLs);

    if (newIdpInitSLOReturnToURLs.length == 0) {
        $('#idpSLOReturnToURLsTbl').remove();
    }
}

function addSloReturnToURL() {

    var returnToURL = $("#returnToURLTxtBox").val();
    if (returnToURL == null || returnToURL.trim().length == 0) {
        // CARBON.showWarningDialog("<fmt:message key='slo.enter.not.valid.endpoint.address'/>", null, null);
        return false;
    }

    returnToURL = returnToURL.trim();

    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (!regexp.test(returnToURL) || returnToURL.indexOf(",") > -1) {
        //CARBON.showWarningDialog("<fmt:message key='slo.enter.not.valid.endpoint.address'/>", null, null);
        return false;
    }

    if ($("#idpSLOReturnToURLsTbl").length==0) {
        var row =
            '        <table id="idpSLOReturnToURLsTbl" style="width: 40%; margin-bottom: 3px;" class="styledInner">' +
            '            <tbody id="idpSLOReturnToURLsTblBody">' +
            '            </tbody>' +
            '        </table>' ;
        $('#idpSLOReturnToURLInputRow').append(row);
    }

    var idpInitSLOReturnToURLs = $("#idpInitSLOReturnToURLs").val();
    var currentColumnId = $("#currentReturnToColumnId").val();
    if (idpInitSLOReturnToURLs == null || idpInitSLOReturnToURLs.trim().length == 0) {
        $("#idpInitSLOReturnToURLs").val(returnToURL);
        var row =
            '<tr id="returnToUrl_' + parseInt(currentColumnId) + '">' +
            '</td><td style="padding-left: 15px !important; color: rgb(119, 119, 119);font-style: italic;">' + returnToURL +
            '</td><td><a onclick="removeSloReturnToURL(\'' + returnToURL + '\', \'returnToUrl_' +
            parseInt(currentColumnId) + '\');return false;"' +
            'href="#" class="icon-link" style="background-image: url(../admin/images/delete.gif)"> Delete </a></td></tr>';

        $('#idpSLOReturnToURLsTbl tbody').append(row);
    } else {
        var isExist = false;
        $.each(idpInitSLOReturnToURLs.split(","), function (index, value) {
            if (value === returnToURL) {
                isExist = true;
                //CARBON.showWarningDialog("<fmt:message key='slo.endpoint.address.already.exists'/>", null, null);
                return false;
            }
        });
        if (isExist) {
            return false;
        }

        $("#idpInitSLOReturnToURLs").val(idpInitSLOReturnToURLs + "," + returnToURL);
        var row =
            '<tr id="returnToUrl_' + parseInt(currentColumnId) + '">' +
            '</td><td style="padding-left: 15px !important; color: rgb(119, 119, 119);font-style: italic;">' +
            returnToURL + '</td><td><a onclick="removeSloReturnToURL(\'' + returnToURL + '\', \'returnToUrl_' + parseInt(currentColumnId) + '\');return false;"' +
            'href="#" class="icon-link" style="background-image: url(../admin/images/delete.gif)"> Delete </a></td></tr>';

        $('#idpSLOReturnToURLsTbl tr:last').after(row);
    }
    $("#returnToURLTxtBox").val("");
    $("#currentReturnToColumnId").val(parseInt(currentColumnId) + 1);
}




