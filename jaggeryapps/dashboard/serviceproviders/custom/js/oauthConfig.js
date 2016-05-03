function preDrawOAuthConfigPage() {
    var clientID = "";
    var clientSecret = "";
    var isEditSP = false;
    if (json != null && json.return != null && json.return.inboundAuthenticationConfig != null
        && json.return.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs != null) {
        for (var i in json.return.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs) {
            var inboundConfig = json.return.inboundAuthenticationConfig.inboundAuthenticationRequestConfigs[i];
            if (inboundConfig.inboundAuthType == "oauth2" && inboundConfig.inboundAuthKey.length > 0) {
                clientID = inboundConfig.inboundAuthKey;
                if (inboundConfig.properties.constructor !== Array) {
                    var arr = [];
                    arr[0] = inboundConfig.properties;
                    inboundConfig.properties = arr;
                }
                for (var prop in inboundConfig.properties) {
                    if (inboundConfig.properties[prop].name == 'oauthConsumerSecret') {
                        clientSecret = inboundConfig.properties[prop].value;
                    }
                }
                isEditSP = true;
            }
        }
    }
    //+ "&appName=" + json.return.applicationName + "&clientID=" + clientID,
    if (isEditSP) {
        $.ajax({
            url: "/portal/gadgets/custom/controllers/custom/oauthConfigHandler.jag",
            type: "GET",
            data: "&cookie=" + cookie + "&user=" + userName + "&appName=" + json.return.applicationName + "&clientID=" + clientID,
            success: function (data) {
                oauthClient = $.parseJSON(data);
                allowedGrantTypes = oauthClient.grantTypes;
                drawOAuthEditPage();
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
    } else {
        $.ajax({
            url: "/portal/gadgets/custom/controllers/custom/oauthConfigHandler.jag",
            type: "GET",
            data: "&cookie=" + cookie + "&user=" + userName,
            success: function (data) {
                oauthClient = $.parseJSON(data);
                allowedGrantTypes = oauthClient.grantTypes;
                drawOAuthConfigPage();
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
}
function drawOAuthConfigPage() {
    var page = "";
    var top = ' <div class=\"col-lg-12 content-section\">\n' +
        '<fieldset>\n' + '<div id="middle">' +
        '        <h2>Register New Application</h2>' +
        '        <div id="workArea">' +
        '    <form id="addAppForm" method="post" name="addAppform" action="add-finish.jsp"' +
        '    target="_self">' +
        '        <table class=\"table table-bordered\">' +
        '        <thead>' +
        '        <tr>' +
        '        <th>New Application</th>' +
        '        </tr>' +
        '        </thead>' +
        '        <tbody>' +
        '        <tr>' +
        '        <td class="formRow">' +
        '        <table class="normal" >' +
        '        <tr>' +
        '        <td class="leftCol-small">OAuth Version<span class="required">*</span> </td>' +
        '    <td><input id="oauthVersion10a" name="oauthVersion" type="radio" value="OAuth-1.0a" />1.0a' +
        '    <input id="oauthVersion20" name="oauthVersion" type="radio" value="OAuth-2.0" CHECKED />2.0</td>' +
        '    </tr>';
    page = top;
    var applicationSPName = json.return.applicationName;
    if (applicationSPName != null && applicationSPName.length > 0) {
        page = page + '<tr style="display: none;">' +
            '<td colspan="2" style="display: none;"><input class="text-box-big" type="hidden" id="application" name="application"' +
            'value="' + applicationSPName + '"/></td>' +
            '</tr>';
    } else {
        page = page + '<tr>' +
            '<td class="leftCol-small">Application Name<span class="required">*</span></td>' +
            '<td><input class="text-box-big" id="application" name="application" type="text" /></td> </tr>';
    }

    var callbackRow = '<tr id="callback_row">' +
        '        <td class="leftCol-small">Callback Url<span class="required">*</span></td>' +
        '    <td><input class="text-box-big" id="callback" name="callback" type="text"' +
        '    white-list-patterns="https-url"/></td>' +
        '        </tr>';
    page = page + callbackRow;

    var grantRow = '<tr id="grant_row" name="grant_row">' +
        '        <td class="leftCol-small">Allowed Grant Types</td>' +
        '        <td>' +
        '        <table>';
    page = page + grantRow;
    if ($.inArray('authorization_code', allowedGrantTypes) > 0) {
        page = page + '<tr><label><input type="checkbox" id="grant_code" name="grant_code" value="authorization_code" checked="checked" onclick="toggleCallback()"/>Code</label></tr>';
    }
    if ($.inArray('implicit', allowedGrantTypes) > 0) {
        page = page + '<tr><label><input type="checkbox" id="grant_implicit" name="grant_implicit" value="implicit" checked="checked" onclick="toggleCallback()"/>Implicit</label></tr>';
    }
    if ($.inArray('password', allowedGrantTypes) > 0) {
        page = page + '<tr><lable><input type="checkbox" id="grant_password" name="grant_password" value="password" checked="checked"/>Password</lable></tr>';
    }
    if ($.inArray('client_credentials', allowedGrantTypes) > 0) {
        page = page + '<tr><label><input type="checkbox" id="grant_client" name="grant_client" value="client_credentials" checked="checked"/>Client Credential</label></tr>';
    }
    if ($.inArray('refresh_token', allowedGrantTypes) > 0) {
        page = page + '<tr><label><input type="checkbox" id="grant_refresh" name="grant_refresh" value="refresh_token" checked="checked"/>Refresh Token</label></tr>';
    }
    if ($.inArray('urn:ietf:params:oauth:grant-type:saml1-bearer', allowedGrantTypes) > 0) {
        page = page + '<tr><label><input type="checkbox" id="grant_saml1" name="grant_saml1" value="urn:ietf:params:oauth:grant-type:saml1-bearer" checked="checked"/>SAML1</label></tr>';
    }
    if ($.inArray('urn:ietf:params:oauth:grant-type:saml2-bearer', allowedGrantTypes) > 0) {
        page = page + '<tr><label><input type="checkbox" id="grant_saml2" name="grant_saml2" value="urn:ietf:params:oauth:grant-type:saml2-bearer" checked="checked"/>SAML2</label></tr>';
    }
    if ($.inArray('iwa:ntlm', allowedGrantTypes) > 0) {
        page = page + '<tr><label><input type="checkbox" id="grant_ntlm" name="grant_ntlm" value="iwa:ntlm" checked="checked"/>IWA-NTLM</label></tr>';
    }

    page = page + '</table>' +
        '</td>' +
        '</tr>';
    if (oauthClient.isPKCESupportEnabled == 'true') {
        page = page + '<tr id="pkce_enable">' +
            '<td class="leftcol-small">' +
            '            PKCE Mandatory' +
            '            </td>' +
            '            <td>' +
            '            <input type="checkbox" name="pkce" value="mandatory"/>Mandatory' +
            '            <div class="sectionHelp">' +
            '            Only allow applications that bear PKCE Code Challenge with them.' +
            '            </div>' +
            '            </td>' +
            '            </tr>' +
            '            <tr id="pkce_support_plain">' +
            '            <td>' +
            '            Support PKCE \'Plain\' Transform Algorithm' +
            '            </td>' +
            '            <td>' +
            '            <input type="checkbox" name="pkce_plain" value="yes" checked>Yes' +
            '        <div class="sectionHelp">' +
            '            Server supports \'S256\' PKCE tranformation algorithm by default.' +
            '            </div>' +
            '            </td>' +
            '            </tr>';
    }
    page = page + '</table>' +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' +
        '<input name="addprofile" type="button" class=\"btn btn-primary\" value="Add" onclick="onClickAdd();"/>' +
        '<input type="button" class=\"btn btn-primary\" onclick="" value="Cancel"/>' +
        '</td>' +
        '    </tr>' +
        '    </tbody>' +
        '    </table>' +
        '    </form>' +
        '    </div>' +
        '    </div>' +
        '</fieldset>' +
        '</div>';

    $("#gadgetBody").empty();
    $("#gadgetBody").append(page);

//TODO : check the following condition if needed for cancel button
//
//        <%
//
//        boolean applicationComponentFound = CarbonUIUtil.isContextRegistered(config, "/application/");
//    if (applicationComponentFound) {
//    %>
//    <input type="button" class="button"
//        onclick="javascript:location.href='../application/configure-service-provider.jsp?spName=<%=Encode.forUriComponent(applicationSPName)%>'"
//        value="<fmt:message key='cancel'/>"/>
//            <% } else { %>
//
//    <input type="button" class="button"
//        onclick="javascript:location.href='index.jsp?region=region1&item=oauth_menu&ordinal=0'"
//        value="<fmt:message key='cancel'/>"/>
//            <%} %>
//</td>
//    </tr>
//    </tbody>
//    </table>
//
//    </form>
//    </div>
//    </div>

    jQuery(document).ready(function () {
        //on load adjust the form based on the current settings
        adjustForm();
        $(jQuery("#addAppForm input")).change(adjustForm);
    })

}
function drawOAuthEditPage() {
    var VERSION_2 = 'OAuth-2.0';
    var VERSION_1 = 'OAuth-1.0a';
    var app = oauthClient.app;
    var applicationSPName = json.return.applicationName;
    var codeGrant = false;
    var implicitGrant = false;
    var passowrdGrant = false;
    var clientCredGrant = false;
    var refreshGrant = false;
    var samlGrant1 = false;
    var samlGrant2 = false;
    var ntlmGrant = false;
    if (VERSION_2 == app.OAuthVersion) {
        var grants = app.grantTypes;
        if (grants != null) {
            codeGrant = grants.contains("authorization_code") ? true : false;
            implicitGrant = grants.contains("implicit") ? true : false;
            passowrdGrant = grants.contains("password") ? true : false;
            clientCredGrant = grants.contains("client_credentials") ? true : false;
            refreshGrant = grants.contains("refresh_token") ? true : false;
            samlGrant1 = grants.contains("urn:ietf:params:oauth:grant-type:saml1-bearer") ? true : false;
            samlGrant2 = grants.contains("urn:ietf:params:oauth:grant-type:saml2-bearer") ? true : false;
            ntlmGrant = grants.contains("iwa:ntlm") ? true : false;
        }
    }
    var top = ' <div class=\"col-lg-12 content-section\">\n' +
        '<fieldset>\n' + '<div id="middle">' +
        '' +
        '        <h2>View/Update application settings</h2>' +
        '' +
        '        <div id="workArea">' +
        '' +
        '' +
        '    <form method="post" name="editAppform"  action="edit-finish.jsp"  target="_self">' +
        '        <input id="consumerkey" name="consumerkey" type="hidden" value="' + app.oauthConsumerKey + '" />' +
        '        <input id="consumersecret" name="consumersecret" type="hidden" value="' + app.oauthConsumerSecret + '" />' +
        '        <table class=\"table table-bordered\">' +
        '        <thead>' +
        '        <tr>' +
        '        <th>Application Settings</th>' +
        '        </tr>' +
        '        </thead>' +
        '        <tbody>' +
        '        <tr>' +
        '        <td class="formRow">' +
        '        <table class="normal" cellspacing="0">' +
        '        <tr>' +
        '        <td class="leftCol-small">OAuth Version<span class="required">*</span></td>' +
        '    <td>' + app.OAuthVersion + '<input id="oauthVersion" name="oauthVersion"' +
        '    type="hidden" value="' + app.OAuthVersion + '"/></td>' +
        '        </tr>';
    if (applicationSPName == null) {
        top = top + '<tr>' +
            '        <td class="leftCol-small">Application Name<span class="required">*</span></td>' +
            '        <td><input class="text-box-big" id="application" name="application"' +
            '        type="text" value="' + app.applicationName + '" /></td>' +
            '            </tr>';
    } else {
        top = top +
            '    <tr style="display: none;">' +
            '            <td colspan="2" style="display: none;"><input class="text-box-big" id="application" name="application"' +
            '        type="hidden" value="' + applicationSPName + '" /></td>' +
            '            </tr>';
    }

    var body = "";

    var callbackRow = '<tr id="callback_row">' +
        '        <td class="leftCol-small">Callback Url<span class="required">*</span></td>' +
        '    <td><input class="text-box-big" id="callback" name="callback"' +
        '    type="text" value="' + app.callbackUrl + '"/></td>' +
        '        </tr>';

    if (app.OAuthVersion == VERSION_1 || codeGrant || implicitGrant) {
        $(jQuery('#callback_row')).attr('style', '');
    } else {
        $(jQuery('#callback_row')).attr('style', 'display:none');
    }

    body = body + callbackRow;
    var garntRow = "";
    if (app.OAuthVersion == VERSION_2) {
        garntRow = '<tr id="grant_row" name="grant_row">' +
            '            <td class="leftCol-small">Allowed Grant Types</td>' +
            '            <td>' +
            '            <table>';
        if ($.inArray('authorization_code', allowedGrantTypes) > 0) {
            garntRow = garntRow + '<tr><label><input type="checkbox" id="grant_code" name="grant_code" value="authorization_code"';
            if (codeGrant) {
                garntRow = garntRow + "checked=\"checked\"";
            }
            garntRow = garntRow + '/>Code</label></tr>';
        }
        if ($.inArray('implicit', allowedGrantTypes) > 0) {
            garntRow = garntRow + '<tr><label><input type="checkbox" id="grant_implicit" name="grant_implicit" value="implicit"';
            if (implicitGrant) {
                garntRow = garntRow + "checked=\"checked\"";
            }
            garntRow = garntRow + '/>Implicit</label></tr>';
        }
        if ($.inArray('password', allowedGrantTypes) > 0) {
            garntRow = garntRow + '<tr><lable><input type="checkbox" id="grant_password" name="grant_password" value="password"';
            if (passowrdGrant) {
                garntRow = garntRow + "checked=\"checked\"";
            }
            garntRow = garntRow + '/>Password</lable></tr>';
        }
        if ($.inArray('client_credentials', allowedGrantTypes) > 0) {
            garntRow = garntRow + '<tr><label><input type="checkbox" id="grant_client" name="grant_client" value="client_credentials"';
            if (clientCredGrant) {
                garntRow = garntRow + "checked=\"checked\"";
            }
            garntRow = garntRow + '/>Client Credential</label></tr>';
        }
        if ($.inArray('refresh_token', allowedGrantTypes) > 0) {
            garntRow = garntRow + '<tr><label><input type="checkbox" id="grant_refresh" name="grant_refresh" value="refresh_token"';
            if (refreshGrant) {
                garntRow = garntRow + "checked=\"checked\"";
            }
            garntRow = garntRow + '/>Refresh Token</label></tr>';
        }
        if ($.inArray('urn:ietf:params:oauth:grant-type:saml1-bearer', allowedGrantTypes) > 0) {
            garntRow = garntRow + '<tr><tr><label><input type="checkbox" id="grant_saml1" name="grant_saml1" value="urn:ietf:params:oauth:grant-type:saml1-bearer"';
            if (samlGrant1) {
                garntRow = garntRow + "checked=\"checked\""
            }
            garntRow = garntRow + '/>SAML1</label></tr>';
        }
        if ($.inArray('urn:ietf:params:oauth:grant-type:saml2-bearer', allowedGrantTypes) > 0) {
            garntRow = garntRow + '<tr><tr><label><input type="checkbox" id="grant_saml2" name="grant_saml2" value="urn:ietf:params:oauth:grant-type:saml2-bearer"';
            if (samlGrant2) {
                "checked=\"checked\"";
            }
            garntRow = garntRow + '/>SAML2</label></tr>';
        }
        if ($.inArray('iwa:ntlm', allowedGrantTypes) > 0) {
            garntRow = garntRow + '<tr><tr><label><input type="checkbox" id="grant_ntlm" name="grant_ntlm" value="iwa:ntlm"';
            if (ntlmGrant) {
                "checked=\"checked\"";
            }
            garntRow = garntRow + '/>IWA-NTLM</label></tr>';
        }
        body = body + garntRow;

        body = body + '</table>' +
            '</td>' +
            '</tr>';
        if (oauthClient.isPKCESupportEnabled) {

            var pkceEnableRow = '<tr id="pkce_enable">' +
                '                <td class="leftcol-small">' +
                '                PKCE Mandatory' +
                '                </td>' +
                '                <td>' +
                '                <input type="checkbox" name="pkce" value="mandatory"';
            if (app.pkceMandatory == 'true') {
                pkceEnableRow = pkceEnableRow + "checked";
            }
            pkceEnableRow = pkceEnableRow + '/>Mandatory' +
                '                <div class="sectionHelp">' +
                '                Only allow applications that bear PKCE Code Challenge with them.' +
                '                </div>' +
                '                </td>' +
                '                </tr>' +
                '                <tr id="pkce_support_plain">' +
                '                <td>' +
                '                Support PKCE \'Plain\' Transform Algorithm' +
                '                </td>' +
                '                <td>' +
                '                <input type="checkbox" name="pkce_plain" value="yes"';
            if (app.pkceSupportPlain == 'true') {
                pkceEnableRow = pkceEnableRow + "checked";
            }
            pkceEnableRow = pkceEnableRow + '>Yes' +
                '                <div class="sectionHelp">' +
                '                Server supports \'S256\' PKCE tranformation algorithm by default.' +
                '                </div>' +
                '                </td>' +
                '                </tr>';
            body = body + pkceEnableRow
        }
    }
    body = body + '</table>' +
        '    </td>' +
        '    </tr>' +
        '    <tr>' +
        '    <td>' +
        '        <input name="update" type="button" class=\"btn btn-primary\" value="Update" onclick="onClickUpdate();"/>' +
        '<input type="button" class=\"btn btn-primary\" value="Cancel">' +
        '</td>' +
        '    </tr>' +
        '    </tbody>' +
        '    </table>' +
        '    </form>' +
        '    </div>' +
        '    </div>' +
        '</fieldset>' +
        '</div>';

    //TODO : check the condition ass same in the add if needed for cancel button
    $("#gadgetBody").empty();
    $("#gadgetBody").append(top + body);
    jQuery(document).ready(function () {
        //on load adjust the form based on the current settings
        adjustFormEdit();
        $("form[name='editAppform']").change(adjustForm);
    })
}
function onClickAdd() {
    var version2Checked = document.getElementById("oauthVersion20").checked;
    if ($(jQuery("#grant_code"))[0].checked || $(jQuery("#grant_implicit"))[0].checked) {
        var callbackUrl = document.getElementById('callback').value;
        if (callbackUrl.trim() == '') {
            //CARBON.showWarningDialog('<fmt:message key="callback.is.required"/>');
            return false;
        } else {
            validate();
        }
    } else {
        var callbackUrl = document.getElementsByName("callback")[0].value;
        if (!version2Checked) {
            if (callbackUrl.trim() == '') {
               // CARBON.showWarningDialog('<fmt:message key="callback.is.required"/>');
                return false;
            }
        }
        validate();
    }
}

function validate() {
    //var callbackUrl = document.getElementById('callback').value;
    //if ($(jQuery("#grant_code"))[0].checked || $(jQuery("#grant_implicit"))[0].checked) {
    //    if (!isWhiteListed(callbackUrl, ["url"]) || !isNotBlackListed(callbackUrl,
    //            ["uri-unsafe-exists"])) {
    //        //CARBON.showWarningDialog('<fmt:message key="callback.is.not.url"/>');
    //        return false;
    //    }
    //}
    //var value = document.getElementsByName("application")[0].value;
    //if (value == '') {
    //    //CARBON.showWarningDialog('<fmt:message key="application.is.required"/>');
    //    return false;
    //}
    //var version2Checked = document.getElementById("oauthVersion20").checked;
    //if (version2Checked) {
    //    if (!$(jQuery("#grant_code"))[0].checked && !$(jQuery("#grant_implicit"))[0].checked) {
    //        document.getElementsByName("callback")[0].value = '';
    //    }
    //} else {
    //    if (!isWhiteListed(callbackUrl, ["url"]) || !isNotBlackListed(callbackUrl,
    //            ["uri-unsafe-exists"])) {
    //        //CARBON.showWarningDialog('<fmt:message key="callback.is.not.url"/>');
    //        return false;
    //
    //    }
    //}
    document.addAppform.submit();
}
function adjustForm() {
    debugger;
    var VERSION_2 = 'OAuth-2.0';
    var VERSION_1 = 'OAuth-1.0a';
    var oauthVersion = $('input[name=oauthVersion]:checked').val();
    var supportGrantCode = $('input[name=grant_code]:checked').val() != null;
    var supportImplicit = $('input[name=grant_implicit]:checked').val() != null;

    if (oauthVersion == VERSION_1) {
        $(jQuery('#grant_row')).hide();
        $(jQuery("#pkce_enable").hide());
        $(jQuery("#pkce_support_plain").hide());
    } else if (oauthVersion == VERSION_2) {
        $(jQuery('#grant_row')).show();
        $(jQuery("#pkce_enable").show());
        $(jQuery("#pkce_support_plain").show());

        if (!supportGrantCode && !supportImplicit) {
            $(jQuery('#callback_row')).hide();
        } else {
            $(jQuery('#callback_row')).show();
        }
        if (supportGrantCode) {
            $(jQuery("#pkce_enable").show());
            $(jQuery("#pkce_support_plain").show());
        } else {
            $(jQuery("#pkce_enable").hide());
            $(jQuery("#pkce_support_plain").hide());
        }
    }

}

//<EDIT OAUTH>
function onClickUpdate() {
    var versionValue = document.getElementsByName("oauthVersion")[0].value;
    var callbackUrl = document.getElementsByName("callback")[0].value;
    if (!(versionValue == '<%=OAuthConstants.OAuthVersions.VERSION_2%>')) {
        if (callbackUrl.trim() == '') {
           // CARBON.showWarningDialog('<fmt:message key="callback.is.required"/>');
            return false;
        } else {
            validateEdit();
        }
    }

    if ($(jQuery("#grant_code"))[0].checked || $(jQuery("#grant_implicit"))[0].checked) {
        callbackUrl = document.getElementById('callback').value;
        if (callbackUrl.trim() == '') {
          //  CARBON.showWarningDialog('<fmt:message key="callback.is.required"/>');
            return false;
        } else {
            validateEdit();
        }
    } else {
        validateEdit();
    }
}

function validateEdit() {
    var callbackUrl = document.getElementById('callback').value;
    var value = document.getElementsByName("application")[0].value;
    if (value == '') {
        CARBON.showWarningDialog('<fmt:message key="application.is.required"/>');
        return false;
    }
    var versionValue = document.getElementsByName("oauthVersion")[0].value;
    if (versionValue == '<%=OAuthConstants.OAuthVersions.VERSION_2%>') {
        if (!$(jQuery("#grant_code"))[0].checked && !$(jQuery("#grant_implicit"))[0].checked) {
            document.getElementsByName("callback")[0].value = '';
        } else {
            if (!isWhiteListed(callbackUrl, ["url"]) || !isNotBlackListed(callbackUrl,
                    ["uri-unsafe-exists"])) {
               // CARBON.showWarningDialog('<fmt:message key="callback.is.not.url"/>');
                return false;
            }
        }
    } else {
        if (!isWhiteListed(callbackUrl, ["url"]) || !isNotBlackListed(callbackUrl,
                ["uri-unsafe-exists"])) {
           // CARBON.showWarningDialog('<fmt:message key="callback.is.not.url"/>');
            return false;
        }
    }
    document.editAppform.submit();
}

function adjustFormEdit() {
    var oauthVersion = $('input[name=oauthVersion]:checked').val();
    var supportGrantCode = $('input[name=grant_code]:checked').val() != null;
    var supportImplicit = $('input[name=grant_implicit]:checked').val() != null;

    if (!supportGrantCode && !supportImplicit) {
        $(jQuery('#callback_row')).hide();
    } else {
        $(jQuery('#callback_row')).show();
    }
    if (supportGrantCode) {
        $(jQuery("#pkce_enable").show());
        $(jQuery("#pkce_support_plain").show());
    } else {
        $(jQuery("#pkce_enable").hide());
        $(jQuery("#pkce_support_plain").hide());
    }

}
