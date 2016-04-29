function drawSAMLConfigPage(issuer, isEditSP, tableTitle) {
    var tablehead = " <div class=\"col-lg-12 content-section\">\n" +
        "<fieldset>\n" +
        "<table class=\"table table-bordered\">\n" +
        "<thead>\n" +
        "<tr>";

    tablehead = tablehead + "<th colspan=\"2\">" + tableTitle + "</th>\n" +
        "</tr>\n" +
        "</thead>";

    var tableBody = "<tbody>\n";
    var issuerRow = "<tr>\n" +
        "    <td><label class=\"\">Issuer <font color=\"red\">*</font></label> </td>\n" +
        "    <td><input type=\"text\" id=\"issuer\" name=\"issuer\" maxlength=\"100\" class=\"text-box-big\"" +
        "value=\"" + issuer + "\"";
    if (isEditSP) {
        issuerRow = issuerRow + "disabled=\"disabled\"";
    }
    issuerRow = issuerRow + "/>\n" +
        "    <input type=\"hidden\" id=\"hiddenIssuer\" name=\"hiddenIssuer\" value=\"" + issuer + "\"\n" +
        "</td>\n" +
        "                     </tr>\n";
    tableBody = tableBody + issuerRow;

    var assertionConsumerURLInputRow = "<tr id=\"assertionConsumerURLInputRow\">\n" +
        "<td><label class=\"\">Assertion Consumer URLs <font color=\"red\">*</font></label> </td>\n" +
        "<td>\n" +
        " <input type=\"text\" id=\"assertionConsumerURLTxt\" class=\"text-box-big\" value=\"\" white-list-patterns=\"https-url\"/>\n" +
        " <input id=\"addAssertionConsumerURLBtn\" type=\"button\" value=\"Add\" onclick=\"onClickAddACRUrl()\"/>\n" +
        "</td>\n" +
        "</tr>\n";
    tableBody = tableBody + assertionConsumerURLInputRow;
    if (isEditSP && provider != null && provider.assertionConsumerUrls != null) {
        var assertionConsumerURLTblRow = "<tr id=\"assertionConsumerURLTblRow\">\n" +
            "<td></td>\n" +
            "<td>\n" +
            "<table id=\"assertionConsumerURLsTable\" style=\"width: 40%; margin-bottom: 3px;\" class=\"styledInner\">" +
            "<tbody id=\"assertionConsumerURLsTableBody\">";

        var assertionConsumerURLsBuilder = "";
        var acsColumnId = 0;
        if (provider.assertionConsumerUrls.constructor === Array) {
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
        } else {
            var assertionConsumerURL = provider.assertionConsumerUrls;
            assertionConsumerURLsBuilder = assertionConsumerURLsBuilder + assertionConsumerURL;
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
            "</table>\n" +
            "<input type=\"hidden\" id=\"assertionConsumerURLs\" name=\"assertionConsumerURLs\" value=\"" + assertionConsumerURL + "\">\n" +
            "<input type=\"hidden\" id=\"currentColumnId\" value=\"" + acsColumnId + "\">" +
            "    </td>\n" +
            "</tr>";
    }
    tableBody = tableBody + assertionConsumerURLTblRow;
    var defaultAssertionConsumerURLRow = "<tr id=\"defaultAssertionConsumerURLRow\">\n" +
        "<td><label class=\"\"> Default Assertion Consumer URL <font color=\"red\">*</font></label>\n" +
        "</td>\n" +
        "<td>\n" +
        "<select id=\"defaultAssertionConsumerURL\" name=\"defaultAssertionConsumerURL\">\n" +
        "<option value=\"\">---Select---</option>\n";

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

    defaultAssertionConsumerURLRow = defaultAssertionConsumerURLRow + "</select>\n" +
        "</td>\n" +
        "</tr>\n";

    tableBody = tableBody + defaultAssertionConsumerURLRow;

    var nameIDVal = "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress";
    if (isEditSP && provider != null) {
        nameIDVal = provider.nameIDFormat.replace(/\//g, ":");
    }
    var nameIdFormatRow = "<tr>\n" +
        "<td>\n" +
        "<label class=\"\"> NameID format</label>\n" +
        "</td>\n" +
        "<td>\n" +
        "<input type=\"text\" id=\"nameIdFormat\" name=\"nameIdFormat\" class=\"text-box-big\" value=\"" + nameIDVal + "\"/>\n" +
        "</td>\n" +
        "</tr>\n";
    var applicationSPName = json.return.applicationName;

    var claimUris = spConfigClaimUris;
    if (applicationSPName == null || applicationSPName.length == 0) {
        //  <!-- UseUserClaimValueInNameID -->

        if (isEditSP && provider != null && provider.nameIdClaimUri != null) {

            nameIdFormatRow = nameIdFormatRow + "<tr>\n" +
                "<td colspan=\"2\">\n" +
                "<input type=\"checkbox\" name=\"enableNameIdClaimUri\" value=\"true\" checked=\"checked\" onclick=\"disableNameIdClaimUri(this);\"/>\n" +
                '<input type="hidden" id="enableNameIdClaimUriHidden" name="enableNameIdClaimUriHidden" value="true" />' +
                'Define Claim Uri for NameID' +
                '</td>\n' +
                '</tr>\n' +
                '<tr>' +
                '<td style="padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;">' +
                '<select id="nameIdClaim" name="nameIdClaim">';
            if (claimUris != null) {
                for (var i in claimUris) {
                    var claimUri = claimUris[i];
                    if (claimUri != null) {
                        if (claimUri == provider.nameIdClaimUri) {
                            nameIdFormatRow = nameIdFormatRow + '<option selected="selected" value="' + claimUri + '">\n' +
                                claimUri + '</option>\n';
                        } else {
                            nameIdFormatRow = nameIdFormatRow + '<option value="' + claimUri + '">' + claimUri + '</option>\n';
                        }
                    }
                }
            }
            nameIdFormatRow = nameIdFormatRow + '</select>\n' +
                '</td>' +
                '</tr>';
        } else {
            nameIdFormatRow = nameIdFormatRow + '<tr>\n' +
                '<td colspan="2">\n' +
                '<input type="checkbox" name="enableNameIdClaimUri" value="true" onclick="disableNameIdClaimUri(this);"/>\n' +
                'Define Claim Uri for NameID' +
                '<input type="hidden" id="enableNameIdClaimUriHidden" name="enableNameIdClaimUriHidden" />\n' +
                '</td>\n' +
                '</tr>\n' +
                '<tr>' +
                '<td style="padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;">' +
                '<select id="nameIdClaim" name="nameIdClaim">';

            if (claimUris != null) {
                for (var r in claimUris) {
                    var claimUri = claimUris[i];
                    if (claimUri != null) {
                        nameIdFormatRow = nameIdFormatRow + '<option value="' + claimUri + '">' + claimUri + '</option>\n';
                    }
                }
            }
            nameIdFormatRow = nameIdFormatRow + '</select>\n' +
                '</td>\n' +
                '</tr>';
        }
    }

    tableBody = tableBody + nameIdFormatRow;

    var certificateAliasRow = "";
    var aliasSet = spConfigCertificateAlias;
    if (provider != null && isEditSP) {

        certificateAliasRow = certificateAliasRow + '<tr>\n' +
            '<td>\n' +
            '<label class=""> Certificate Alias </label>\n' +
            '</td>\n' +
            '<td>\n' +
            '<select id="alias" name="alias">';
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
        certificateAliasRow = certificateAliasRow + '</select></td>' + '</tr>\n';
    } else {
        certificateAliasRow = certificateAliasRow + '<tr>\n' +
            '<td>\n' +
            '<label class=""> Certificate Alias </label>\n' +
            '</td>\n' +
            '<td>\n' +
            '<select id="alias" name="alias">';
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
        certificateAliasRow = certificateAliasRow + '</select></td>\n </tr>\n';
    }

    tableBody = tableBody + certificateAliasRow;

    var defaultSigningAlgorithmRow = '<tr id="defaultSigningAlgorithmRow">\n' +
        '<td>\n' +
        '<label class=""> Response Signing Algorithm  <font color="red">*</font></label>\n' +
        '</td>\n' +
        '<td>\n' +
        '<select id="signingAlgorithm" name="signingAlgorithm">';
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
                var defaultSigningAlgorithmRow = defaultSigningAlgorithmRow + '<option value="' + signingAlgo + '" selected>\n' +
                    signingAlgo + '</option>';
            } else {
                var defaultSigningAlgorithmRow = defaultSigningAlgorithmRow + '<option value="' + signingAlgo + '">' + signingAlgo +
                    '</option>\n';
            }
        }
    }
    defaultSigningAlgorithmRow = defaultSigningAlgorithmRow + '</select>\n' +
        '</td>\n' +
        '</tr>';
    tableBody = tableBody + defaultSigningAlgorithmRow;

    var digestAlgorithmRow = '<tr id="digestAlgorithmRow">' +
        '<td>\n' +
        '<label class=""> Response Digest Algorithm  <font color="red">*</font></label>\n' +
        '</td>\n' +
        '<td>\n' +
        '<select id="digestAlgorithm" name="digestAlgorithm">\n';

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
    digestAlgorithmRow = digestAlgorithmRow + '</select>\n' +
        '</td>\n' +
        '</tr>';
    tableBody = tableBody + digestAlgorithmRow;

    var enableResponseSignatureRow = '<tr>' +
        '<td colspan="2">' +
        '<input type="checkbox" name="enableResponseSignature" value="true" onclick="disableResponseSignature(this);"';
    if (isEditSP && provider.doSignResponse == 'true') {
        enableResponseSignatureRow = enableResponseSignatureRow + "checked=\"checked\"";
    }
    enableResponseSignatureRow = enableResponseSignatureRow + '/>\n' +
        '<label class="" style="display: inline-block"> Enable Response Signing </label>\n' +
        '</td>\n' +
        '</tr>\n' +
        '<input type="hidden" name="enableAssertionSignature" value="true"/>';
    tableBody = tableBody + enableResponseSignatureRow;

    var enableSigValidationRow = "";

    //TODO : isEditSP && provider.isDoValidateSignatureInRequestsSpecified() && provider.getDoValidateSignatureInRequests()

    if (isEditSP && provider.doValidateSignatureInRequests == 'true') {
        enableSigValidationRow = '<tr>\n' +
            '<td colspan="2">\n' +
            '<input type="checkbox" id="enableSigValidation" name="enableSigValidation" value="true" checked="checked"/>\n' +
            '<label class="" style="display: inline-block"> Enable Signature Validation in Authentication Requests and Logout Requests </label>\n' +
            '</td>\n' +
            '</tr>\n';
    } else {
        enableSigValidationRow = '<tr>\n' +
            '<td colspan="2">\n' +
            '<input type="checkbox" id="enableSigValidation" name="enableSigValidation" value="true"/>\n' +
            '<label class="" style="display: inline-block"> Enable Signature Validation in Authentication Requests and Logout Requests </label>\n' +
            '</td>\n' +
            '</tr>\n';
    }
    tableBody = tableBody + enableSigValidationRow;

    var encryptedAssertionRow = "";

    //TODO : isEditSP && provider.isDoEnableEncryptedAssertionSpecified() && provider.getDoEnableEncryptedAssertion()
    if (isEditSP && provider.doEnableEncryptedAssertion == 'true') {
        encryptedAssertionRow = '<tr>\n' +
            '<td colspan="2">\n' +
            '<input type="checkbox" id="enableEncAssertion" name="enableEncAssertion" value="true" checked="checked"/>\n' +
            '<label class="" style="display: inline-block"> Enable Assertion Encryption </label>\n' +
            '</td>\n' +
            '</tr>';
    } else {
        encryptedAssertionRow = '<tr>\n' +
            '<td colspan="2">' +
            '<input type="checkbox" id="enableEncAssertion" name="enableEncAssertion" value="true"/>' +
            '<label class="" style="display: inline-block"> Enable Assertion Encryption </label>\n' +
            '</td>\n' +
            '</tr>';
    }
    tableBody = tableBody + encryptedAssertionRow;
    var enableSingleLogoutRow = '<tr>\n' +
        '<td colspan="2"><input type="checkbox" name="enableSingleLogout" value="true" onclick="disableLogoutUrl(this);"';
    if (isEditSP && provider.doSingleLogout == 'true') {
        enableSingleLogoutRow = enableSingleLogoutRow + "checked=\"checked\"";
    }
    enableSingleLogoutRow = enableSingleLogoutRow + '/>\n' +
        '<label class="" style="display: inline-block"> Enable Single Logout </label>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td style="padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;">\n' +
        '<label class="">SLO Response URL</label>\n' +
        '</td>\n' +
        '<td><input type="text" id="sloResponseURL" name="sloResponseURL" value="';
    if (isEditSP && provider.sloResponseURL != "") {
        enableSingleLogoutRow = enableSingleLogoutRow + provider.sloResponseURL;
    }
    enableSingleLogoutRow = enableSingleLogoutRow + '"class="text-box-big"';
    if (isEditSP && provider.doSingleLogout == 'true') {
        enableSingleLogoutRow = enableSingleLogoutRow + ">"
    } else {
        enableSingleLogoutRow = enableSingleLogoutRow + "disabled=\"disabled\">";
    }
    enableSingleLogoutRow = enableSingleLogoutRow + '<div class = "sectionHelp" style="margin-top: 2px;"> Single logout response accepting endpoint' +
        '</div>\n' +
        '</td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td style="padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;">\n' +
        '<label class="">SLO Request URL</label>\n' +
        '</td>\n' +
        '<td><input type="text" id="sloRequestURL" name="sloRequestURL" value="';
    if (isEditSP && provider.sloRequestURL != "") {
        enableSingleLogoutRow = enableSingleLogoutRow + provider.sloRequestURL
    }
    enableSingleLogoutRow = enableSingleLogoutRow + '"class="text-box-big"';
    if (isEditSP && provider.doSingleLogout == 'true') {
        enableSingleLogoutRow = enableSingleLogoutRow + ">";
    } else {
        enableSingleLogoutRow = enableSingleLogoutRow + "disabled=\"disabled\">";
    }
    enableSingleLogoutRow = enableSingleLogoutRow + '<div class="sectionHelp" style="margin-top: 2px;">' +
        'Single logout request accepting endpoint' +
        '</div>' +
        '</td>' +
        '</tr>';
    tableBody = tableBody + enableSingleLogoutRow;

    var enableAudienceRestrictionRow = "";
    if (isEditSP && provider.requestedAudiences != null && provider.requestedAudiences.length > 0 &&
        provider.requestedAudiences[0] != null) {

        enableAudienceRestrictionRow = '<tr>' +
            '        <td colspan="2"><input type="checkbox"' +
            '        name="enableAudienceRestriction" id="enableAudienceRestriction"' +
            '        value="true" checked="checked"' +
            '        onclick="disableAudienceRestriction(this);"/> <label class="" style="display: inline-block"> Enable Audience Restriction </label> </td>' +
            '            </tr>' +
            '            <tr>' +
            '            <td' +
            '        style="padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;">' +
            '            <label class="">Audience </label>' +
            '            </td>' +
            '            <td>' +
            '            <input type="text" id="audience" name="audience"' +
            '    class="text-box-big"/>' +
            '            <input id="addAudience" name="addAudience" type="button"' +
            '        value="Add"' +
            '        onclick="addAudienceFunc()"/>' +
            '            </td>' +
            '            </tr>';

    } else {
        enableAudienceRestrictionRow = '<tr>' +
            '        <td colspan="2">' +
            '            <input type="checkbox"' +
            '        name="enableAudienceRestriction" id="enableAudienceRestriction" value="true"' +
            '        onclick="disableAudienceRestriction(this);"/>' +
            '             <label class="" style="display: inline-block"> Enable Audience Restriction </label> ' +
            '            </td>' +
            '            </tr>' +
            '            <tr>' +
            '            <td' +
            '        style="padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;">' +
            '            <label class="">Audience </label>' +
            '            </td>' +
            '            <td>' +
            '            <input type="text" id="audience" name="audience"' +
            '    class="text-box-big" disabled="disabled"/>' +
            '            <input id="addAudience" name="addAudience" type="button"' +
            '        disabled="disabled" value="Add"' +
            '        onclick="addAudienceFunc()"/>' +
            '            </td>' +
            '            </tr>';
    }
    var audienceTableStyle = "";
    if (provider != null && provider.requestedAudiences != null && provider.requestedAudiences.length > 0) {
        audienceTableStyle = "";
    } else {
        audienceTableStyle = "display:none";
    }

    enableAudienceRestrictionRow = enableAudienceRestrictionRow + '<tr>' +
        '    <td></td>' +
        '    <td>' +
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
    enableAudienceRestrictionRow = enableAudienceRestrictionRow + '<input type="hidden" name="audiencePropertyCounter" id="audiencePropertyCounter"' +
        '    value="' + j + '"/>' +
        '        </tbody>' +
        '        </table>' +
        '        </td>' +
        '        </tr>';

    tableBody = tableBody + enableAudienceRestrictionRow;

    var enableReceiptValidRow = "";

    if (isEditSP && provider.requestedRecipients != null && provider.requestedRecipients.length > 0 && provider.requestedRecipients[0] != null) {
        enableReceiptValidRow = enableReceiptValidRow + '<tr>' +
            '    <td colspan="2"><input type="checkbox"' +
            '                           name="enableRecipients" id="enableRecipients"' +
            '                           value="true" checked="checked"' +
            '                           onclick="disableRecipients(this);"/> ' +
            '           <label class="" style="display: inline-block"> Enable Recipient Validation </label></td>' +
            '</tr>' +
            '<tr>' +
            '    <td' +
            '            style="padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;">' +
            '       <label class=""> Recipient</label>' +
            '    </td>' +
            '    <td>' +
            '        <input type="text" id="recipient" name="recipient"' +
            '               class="text-box-big"/>' +
            '        <input id="addRecipient" name="addRecipient" type="button"' +
            '               value="Add"' +
            '               onclick="addRecipientFunc()"/>' +
            '    </td>' +
            '</tr>';


    } else {
        enableReceiptValidRow = enableReceiptValidRow + '<tr>' +
            '    <td colspan="2">' +
            '        <input type="checkbox"' +
            '               name="enableRecipients" id="enableRecipients" value="true"' +
            '               onclick="disableRecipients(this);"/>' +
            '           <label class="" style="display: inline-block"> Enable Recipient Validation </label>' +
            '    </td>' +
            '</tr>' +
            '<tr>' +
            '    <td' +
            '            style="padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;">' +
            '        <label class="">Recipient</label>' +
            '    </td>' +
            '    <td>' +
            '        <input type="text" id="recipient" name="recipient"' +
            '               class="text-box-big" disabled="disabled"/>' +
            '        <input id="addRecipient" name="addRecipient" type="button"' +
            '               disabled="disabled" value="Add"' +
            '               onclick="addRecipientFunc()"/>' +
            '    </td>' +
            '</tr>';


    }

    var recipientTableStyle = "";
    if (provider != null && provider.requestedRecipients != null && provider.requestedRecipients.length > 0) {
        recipientTableStyle = "";
    } else {
        recipientTableStyle = "display:none";
    }
    enableReceiptValidRow = enableReceiptValidRow + '<tr>' +
        '    <td></td>' +
        '    <td>' +
        '    <table id="recipientTableId" style="width: 40%; ' + recipientTableStyle + ';" class="styledInner">' +
        '        <tbody id="recipientTableTbody">';

    var k = 0;
    if (isEditSP && provider.requestedRecipients != null && provider.requestedRecipients.length > 0) {
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

    enableReceiptValidRow = enableReceiptValidRow + '<input type="hidden" name="recipientPropertyCounter" id="recipientPropertyCounter"' +
        '    value="' + k + '"/>' +
        '        </tbody>' +
        '        </table>' +
        '        </td>' +
        '        </tr>';


    tableBody = tableBody + enableReceiptValidRow;

    var idpInitSSORow = '<tr>' +
        '    <td colspan="2">' +
        '        <input type="checkbox" name="enableIdPInitSSO" value="true"' +
        '    onclick="disableIdPInitSSO(this);"';
    if (isEditSP && provider.idPInitSSOEnabled) {
        idpInitSSORow = idpInitSSORow + "checked=\"checked\""
    } else {
        idpInitSSORow + ""
    }
    idpInitSSORow = idpInitSSORow + '/>' +
        '<label class="" style="display: inline-block"> Enable IdP Initiated SSO</label>' +
        '        </td>' +
        '        </tr>';


    tableBody = tableBody + idpInitSSORow;

    var idpSLOReturnToURLInputRow = '<tr>' +
        '    <td colspan="2">' +
        '        <input type="checkbox" name="enableIdPInitSLO" value="true"' +
        '    onclick="disableIdPInitSLO(this);"';
    if (isEditSP && provider.idPInitSLOEnabled == 'true') {
        idpSLOReturnToURLInputRow = idpSLOReturnToURLInputRow + "checked=\"checked\""
    }
    idpSLOReturnToURLInputRow = idpSLOReturnToURLInputRow + '/>' +
        '     <label class="" style="display: inline-block">   Enable IdP Initiated SLO </label>' +
        '        </td>' +
        '        </tr>';


    var tempstyle = "";
    if (isEditSP && provider.idPInitSLOEnabled == 'true') {
        tempstyle = "";
    } else {
        tempstyle = "disabled=\"disabled\"";
    }

    idpSLOReturnToURLInputRow = '<tr id="idpSLOReturnToURLInputRow">' +
        '        <td' +
        '    style="padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;">' +
        '      <label class="" >  Return to URL </label> ' +
        '        </td>' +
        '        <td>' +
        '        <input type="text" id="returnToURLTxtBox" class="text-box-big" ' + tempstyle + ' />' +
        '    <input id="addReturnToURL" type="button"' + tempstyle +
        '    value="Add" onclick="addSloReturnToURL()"/>' +
        '        </td>' +
        '        </tr>';


    if (isEditSP && provider.idpInitSLOReturnToURLs != null) {
        idpSLOReturnToURLInputRow = idpSLOReturnToURLInputRow + '<tr id="idpSLOReturnToURLsTblRow">' +
            '            <td></td>' +
            '            <td>' +
            '            <table id="idpSLOReturnToURLsTbl" style="width: 40%;" class="styledInner">' +
            '            <tbody id="idpSLOReturnToURLsTblBody">';

        var sloReturnToURLsBuilder = "";
        var returnToColumnId = 0;
        if (provider.idpInitSLOReturnToURLs.constructor === Array) {
            for (var i in provider.idpInitSLOReturnToURLs) {
                var returnToURL = provider.idpInitSLOReturnToURLs[i];
                if (returnToURL != null && "null" != returnToURL) {
                    if (sloReturnToURLsBuilder.length > 0) {
                        sloReturnToURLsBuilder = sloReturnToURLsBuilder + "," + returnToURL;
                    } else {
                        sloReturnToURLsBuilder = sloReturnToURLsBuilder + returnToURL;
                    }
                    idpSLOReturnToURLInputRow = idpSLOReturnToURLInputRow + '<tr id="returnToUrl_' + returnToColumnId + '>' +
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
        } else {

            idpSLOReturnToURLInputRow = idpSLOReturnToURLInputRow + '<tr id="returnToUrl_' + returnToColumnId + '>' +
                '                    <td style="padding-left: 15px !important; color: rgb(119, 119, 119);font-style: italic;">' +
                provider.idpInitSLOReturnToURLs +
                '                    </td>' +
                '                    <td>' +
                '                    <a onclick="removeSloReturnToURL(\'' + provider.idpInitSLOReturnToURLs + '\', \'returnToUrl_' + returnToColumnId + '\');return false;"' +
                '                href="#" class="icon-link"' +
                '                style="background-image: url(../admin/images/delete.gif)">' +
                '                    Delete' +
                '                    </a>' +
                '                    </td>' +
                '                    </tr>';
            returnToColumnId = returnToColumnId + 1;
        }
        idpSLOReturnToURLInputRow = idpSLOReturnToURLInputRow + '</tbody>' +
            '        </table>' +
            '        <input type="hidden" id="idpInitSLOReturnToURLs" name="idpInitSLOReturnToURLs" value="' + sloReturnToURLsBuilder + '">' +
            '        <input type="hidden" id="currentReturnToColumnId" value="' + returnToColumnId + '">' +
            '            </td>' +
            '            </tr>';
    }

    tableBody = tableBody + idpSLOReturnToURLInputRow;
    var tableEnd = "</tbody>\n" +
        "</table>\n" +
        "</fieldset>\n" +
        "</div>";

    $("#gadgetBody").empty();
    $("#gadgetBody").append(tablehead + tableBody + tableEnd);
}

function preDrawSAMLConfigPage() {
    provider = null;
    spConfigData = null;
    spConfigClaimUris = null;
    spConfigCertificateAlias = null;
    spConfigSigningAlgos = null;
    spConfigDigestAlgos = null;
    signingAlgorithmUriByConfig = null;
    digestAlgorithmUriByConfig = null;

    $.ajax({
        url: "/portal/gadgets/custom/controllers/custom/samlSSOConfig_handler.jag",
        type: "GET",
        data: "&cookie=" + cookie + "&user=" + userName + "&clientAction=getServiceProviders",
        success: function (data) {
            var tableTitle = "New Service Provider";
            var isEditSP = false;
            var issuer = "";
            if (json != null && json.return != null && json.return.inboundAuthenticationConfig != null
                && json.return.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs != null) {
                for (var i in json.return.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs) {
                    var inboundConfig = json.return.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs[i];
                    if (inboundConfig.inboundAuthType == "samlsso" && inboundConfig.inboundAuthKey.length > 0) {
                        tableTitle = "Edit Service Provider (" + inboundConfig.inboundAuthKey + ")";
                        issuer = inboundConfig.inboundAuthKey;
                        isEditSP = true;
                    }
                }
            }
            debugger;
            spConfigData = $.parseJSON(data);
            if(spConfigData.return.serviceProviders.constructor !== Array){
                var spArr = [];
                spArr[0] = spConfigData.return.serviceProviders;
                spConfigData.return.serviceProviders = spArr;
            }
            for (var i in spConfigData.return.serviceProviders) {
                var sp = spConfigData.return.serviceProviders[i];
                if (sp.issuer == issuer) {
                    provider = sp;
                }
            }
            getClaimUris(issuer, isEditSP, tableTitle);
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
function getClaimUris(issuer, isEditSP, tableTitle) {
    $.ajax({
        url: "/portal/gadgets/custom/controllers/custom/samlSSOConfig_handler.jag",
        type: "GET",
        data: "&cookie=" + cookie + "&user=" + userName + "&clientAction=getClaimURIs",
        success: function (data) {
            spConfigClaimUris = $.parseJSON(data).return;
            getCertAlias(issuer, isEditSP, tableTitle);
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

function getCertAlias(issuer, isEditSP, tableTitle) {
    $.ajax({
        url: "/portal/gadgets/custom/controllers/custom/samlSSOConfig_handler.jag",
        type: "GET",
        data: "&cookie=" + cookie + "&user=" + userName + "&clientAction=getCertAlias",
        success: function (data) {
            spConfigCertificateAlias = $.parseJSON(data).return;
            getSigningAlgorithmUris(issuer, isEditSP, tableTitle);
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

function getSigningAlgorithmUris(issuer, isEditSP, tableTitle) {
    $.ajax({
        url: "/portal/gadgets/custom/controllers/custom/samlSSOConfig_handler.jag",
        type: "GET",
        data: "&cookie=" + cookie + "&user=" + userName + "&clientAction=getSigningAlgorithmUris",
        success: function (data) {
            spConfigSigningAlgos = $.parseJSON(data).return;
            getDigestAlgorithmURIs(issuer, isEditSP, tableTitle);
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

function getDigestAlgorithmURIs(issuer, isEditSP, tableTitle) {
    $.ajax({
        url: "/portal/gadgets/custom/controllers/custom/samlSSOConfig_handler.jag",
        type: "GET",
        data: "&cookie=" + cookie + "&user=" + userName + "&clientAction=getDigestAlgorithmURIs",
        success: function (data) {
            spConfigDigestAlgos = $.parseJSON(data).return;
            getSigningAlgorithmUriByConfig(issuer, isEditSP, tableTitle);
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

function getSigningAlgorithmUriByConfig(issuer, isEditSP, tableTitle) {
    $.ajax({
        url: "/portal/gadgets/custom/controllers/custom/samlSSOConfig_handler.jag",
        type: "GET",
        data: "&cookie=" + cookie + "&user=" + userName + "&clientAction=getSigningAlgorithmUriByConfig",
        success: function (data) {
            signingAlgorithmUriByConfig = $.parseJSON(data).return;
            getDigestAlgorithmURIByConfig(issuer, isEditSP, tableTitle);
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

function getDigestAlgorithmURIByConfig(issuer, isEditSP, tableTitle) {
    $.ajax({
        url: "/portal/gadgets/custom/controllers/custom/samlSSOConfig_handler.jag",
        type: "GET",
        data: "&cookie=" + cookie + "&user=" + userName + "&clientAction=getDigestAlgorithmURIByConfig",
        success: function (data) {
            digestAlgorithmUriByConfig = $.parseJSON(data).return;
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
function disableNameIdClaimUri(chkbx) {
    if (chkbx.checked) {
        document.addServiceProvider.enableNameIdClaimUriHidden.value = "true";
        document.addServiceProvider.useFullQualifiedUsername.value = "false";
        document.getElementById("useFullQualifiedUsername").checked = 'false';
    } else {
        document.addServiceProvider.enableNameIdClaimUriHidden.value = "false";
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

    if (!$("#assertionConsumerURLTblRow").length) {
        var row = '<tr id="assertionConsumerURLTblRow">' +
            '    <td></td>' +
            '    <td>' +
            '        <table id="assertionConsumerURLsTable" style="width: 40%; margin-bottom: 3px;" class="styledInner">' +
            '            <tbody id="assertionConsumerURLsTableBody">' +
            '            </tbody>' +
            '        </table>' +
            '        <input type="hidden" id="assertionConsumerURLs" name="assertionConsumerURLs" value="">' +
            '        <input type="hidden" id="currentColumnId" value="0">' +
            '    </td>' +
            '</tr>';
        $('#assertionConsumerURLInputRow').after(row);
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
        $('#assertionConsumerURLTblRow').remove();
    }
}

function disableResponseSignature(chkbx) {
    document.addServiceProvider.enableResponseSignature.value = (chkbx.checked) ? true
        : false;
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
    if ($(chkbx).is(':checked')) {
        $("#returnToURLTxtBox").prop('disabled', false);
        $("#addReturnToURL").prop('disabled', false);
    } else {
        $("#returnToURLTxtBox").prop('disabled', true);
        $("#addReturnToURL").prop('disabled', true);
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


function disableIdPInitSLO(chkbx) {
    if ($(chkbx).is(':checked')) {
        $("#returnToURLTxtBox").prop('disabled', false);
        $("#addReturnToURL").prop('disabled', false);
    } else {
        $("#returnToURLTxtBox").prop('disabled', true);
        $("#addReturnToURL").prop('disabled', true);
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
        $('#idpSLOReturnToURLsTblRow').remove();
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
        CARBON.showWarningDialog("<fmt:message key='slo.enter.not.valid.endpoint.address'/>", null, null);
        return false;
    }

    if (!$("#idpSLOReturnToURLsTblRow").length) {
        var row = '<tr id="idpSLOReturnToURLsTblRow">' +
            '    <td></td>' +
            '    <td>' +
            '        <table id="idpSLOReturnToURLsTbl" style="width: 40%; margin-bottom: 3px;" class="styledInner">' +
            '            <tbody id="idpSLOReturnToURLsTblBody">' +
            '            </tbody>' +
            '        </table>' +
            '        <input type="hidden" id="idpInitSLOReturnToURLs" name="idpInitSLOReturnToURLs" value="">' +
            '        <input type="hidden" id="currentReturnToColumnId" value="0">' +
            '    </td>' +
            '</tr>';
        $('#idpSLOReturnToURLInputRow').after(row);
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
