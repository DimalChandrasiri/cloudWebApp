function drawList() {
    var output = "";
    var top = " <div class=\"col-lg-12 content-section\">" +
        "                <div class=\"control-group\">\n" +
        "                    <div class=\"controls\">\n" +
        "                        <input type=\"button\" onclick=\"drawAddSP();\" class=\"btn btn-primary\" value=\"Add Service Provider\"/>\n" +
        "                    </div>\n" +
        "                </div>" +
        "<fieldset>" +
        "              <table class=\"table table-bordered\">\n" +
        "                  <thead>\n" +
        "                      <tr>\n" +
        "                          <th class='txtAlnCen width30'>Service Providers</th>\n" +
        "                          <th class='txtAlnCen width30p'>Description</th>\n" +
        "                          <th class='txtAlnCen'>Actions</th>\n" +
        "                      </tr>\n" +
        "                  </thead>\n" +
        "                  <tbody>\n";
    var middle = "";
    if (json != null && json.return != null) {
        if (json.return.constructor === Array) {
            for (var i in json.return) {
                middle = middle + "       <tr>\n" +
                    "                        <td><label class=\"\">" + json.return[i].applicationName + "</label> </td>\n" +
                    "                        <td><label class=\"\">" + json.return[i].description + "</label> </td>\n" +
                    "                        <td>\n" +
                    "                            <input type=\"button\" onclick=\"getSP('" + json.return[i].applicationName + "');\" class=\"btn btn-primary\" value=\"Edit\"/>\n" +
                    "                            <input type=\"button\" onclick=\"deleteSP('" + json.return[i].applicationName + "');\" class=\"btn btn-primary\" value=\"Delete\"/>\n" +
                    "                        </td>\n" +
                    "                     </tr>\n";
            }
        } else {
            middle = middle + "       <tr>\n" +
                "                        <td><label class=\"\">" + json.return.applicationName + "</label> </td>\n" +
                "                        <td><label class=\"\">" + json.return.description + "</label> </td>\n" +
                "                        <td>\n" +
                "                            <input type=\"button\" onclick=\"getSP('" + json.return.applicationName + "');\" class=\"btn btn-primary\" value=\"Edit\"/>\n" +
                "                            <input type=\"button\" onclick=\"deleteSP('" + json.return.applicationName + "');\" class=\"btn btn-primary\" value=\"Delete\"/>\n" +
                "                        </td>\n" +
                "                     </tr>\n";
        }
    }

    var end = "                  </tbody>\n" +
        "               </table>\n" +
        "</fieldset>\n" +
        "</div>";
    output = top + middle + end;
    $("#gadgetBody").empty();
    $("#gadgetBody").append(output);
}

function drawAddSP() {
    var output = "";
    var start = " <div class=\"col-lg-12 content-section\">" +
        "<fieldset>" +
        "              <table class=\"table table-bordered\">\n" +
        "                  <thead>\n" +
        "                      <tr>\n" +
        "                          <th colspan=\"2\">Basic Information</th>\n" +
        "                      </tr>\n" +
        "                  </thead>\n" +
        "                  <tbody>\n" +
        "                     <tr>\n" +
        "                        <td><label class=\"\">Service Provider Name</label> </td>\n" +
        "                        <td>\n" +
        "                            <input type=\"text\" value=\"\" id=\"spName\" name=\"spName\"  class=\"col-lg-3\" />\n" +
        "                        </td>\n" +
        "                     </tr>\n" +
        "                      <tr>\n" +
        "                         <td><label class=\"\">Description</label> </td>\n" +
        "                         <td>\n" +
        "                             <input type=\"text\" value=\"\" id=\"spDesc\" name=\"spDesc\"  class=\"col-lg-3\" />\n" +
        "                         </td>\n" +
        "                      </tr>\n" +
        "                  </tbody>\n" +
        "               </table>" +
        "                </fieldset>\n" +
        "                <div class=\"control-group\">\n" +
        "                    <div class=\"controls\">\n" +
        "                        <input type=\"button\" onclick=\"registerSP();\" class=\"btn btn-primary\" value=\"Register\"/>\n" +
        "                        <input type=\"button\" onclick=\"cancel();\" class=\"btn\" value=\"Cancel\"/>\n" +
        "                    </div>\n" +
        "                </div>";
    output = start;
    $("#gadgetBody").empty();
    $("#gadgetBody").append(output);
}

function drawUpdatePage() {
    var output = "";
    var start = "";
    if (json != null && json.return != null) {
        start = " <div class=\"col-lg-12 content-section\">" +
            "<fieldset>" +
            "              <table class=\"table table-bordered\">\n" +
            "                  <thead>\n" +
            "                      <tr>\n" +
            "                          <th colspan=\"2\">Basic Information</th>\n" +
            "                      </tr>\n" +
            "                  </thead>\n" +
            "                  <tbody>\n" +
            "                     <tr>\n" +
            "                        <td><label class=\"\">Service Provider Name</label> </td>\n" +
            "                        <td>\n" +
            "                            <input type=\"text\" value=\"" + json.return.applicationName + "\" id=\"spName\" name=\"spName\"  class=\"col-lg-3\" />\n" +
            "                        </td>\n" +
            "                     </tr>\n" +
            "                      <tr>\n" +
            "                         <td><label class=\"\">Description</label> </td>\n" +
            "                         <td>\n" +
            "                             <input type=\"text\" value=\"" + json.return.description + "\" id=\"spDesc\" name=\"spDesc\"  class=\"col-lg-3\" />\n" +
            "                         </td>\n" +
            "                      </tr>\n" +
            "                  </tbody>\n" +
            "               </table>\n";
        var claimConfig = "              <table class=\"table table-bordered\">\n" +
            "                  <thead>\n" +
            "                      <tr>\n" +
            "                          <th colspan=\"2\">Claim Configuration</th>\n" +
            "                      </tr>\n" +
            "                  </thead>\n" +
            "                  <tbody>\n" +
            "                     <tr>\n" +
            "                        <td><label class=\"\">Claim Configuration</label> </td>\n" +
            "                        <td>\n" +
            "                            <input type=\"button\" onclick=\"preDrawClaimConfig();\" class=\"btn btn-primary\" value=\"Edit\"/>\n" +
            "                        </td>\n" +
            "                     </tr>\n" +
            "                  </tbody>\n" +
            "               </table>";
        var configs =
            "              <table class=\"table table-bordered\">\n" +
            "                  <thead>\n" +
            "                      <tr>\n" +
            "                          <th colspan=\"2\">Inbound Authentication Configuration</th>\n" +
            "                      </tr>\n" +
            "                  </thead>\n" +
            "                  <tbody>\n" +
            "                     <tr>\n" +
            "                        <td><label class=\"\">SAML2 Web SSO Configuration</label> </td>\n" +
            "                        <td>\n" +
            "                            <input type=\"button\" onclick=\"preDrawSAMLConfigPage();\" class=\"btn btn-primary\" value=\"Edit\"/>\n" +
            "                        </td>\n" +
            "                     </tr>\n" +
            "                      <tr>\n" +
            "                         <td><label class=\"\">OAuth/OpenID Connect Configuration</label> </td>\n" +
            "                         <td>\n" +
            "                             <input type=\"button\" onclick=\"drawOAuthConfigPage();\" class=\"btn btn-primary\" value=\"Edit\"/>\n" +
            "                         </td>\n" +
            "                      </tr>\n" +
            "                      <tr>\n" +
            "                         <td><label class=\"\">WS-Federation (Passive) Configuration</label> </td>\n" +
            "                         <td>\n" +
            "                             <input type=\"button\" onclick=\"drawFederationConfigPage();\" class=\"btn btn-primary\" value=\"Edit\"/>\n" +
            "                         </td>\n" +
            "                      </tr>\n" +
            "                  </tbody>\n" +
            "               </table>" +
            "                </fieldset>\n";
        var end =
            "                <div class=\"control-group\">\n" +
            "                    <div class=\"controls\">\n" +
            "                        <input type=\"button\" onclick=\"updateSP('" + json.return.applicationName + "');\" class=\"btn btn-primary\" value=\"Update\"/>\n" +
            "                        <input type=\"button\" onclick=\"cancel();\" class=\"btn\" value=\"Cancel\"/>\n" +
            "                    </div>\n" +
            "                </div>";
        "                </div>";
        output = start + claimConfig + configs + end;
    }
    $("#gadgetBody").empty();
    $("#gadgetBody").append(output);
}


function drawOAuthConfigPage() {
    alert('oauth config page');
}

function drawFederationConfigPage() {
    alert('federation config page');
}
function validateSPName(isRegister) {
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
        if (isRegister) {
            registerCustomSP();
        } else {
            updateCustomSP();
        }
    }
}

function reloadGrid() {
    json = null;
    $.ajax({
        url: "/portal/gadgets/custom/index.jag",
        type: "GET",
        data: "&cookie=" + cookie + "&user=" + userName,
        success: function (data) {
            json = $.parseJSON(data);
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

function registerSP() {
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
    validateSPName(true);


}

function getSP(applicationName) {
    $.ajax({
        url: "/portal/gadgets/custom/controllers/custom/getsp.jag",
        type: "GET",
        data: "&cookie=" + cookie + "&user=" + userName + "&spName=" + applicationName,
        success: function (data) {
            json = $.parseJSON(data);
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

function deleteSP(applicationName) {
    deleteCustomSP(applicationName)
}


function cancel() {
    gadgets.Hub.publish('org.wso2.is.dashboard', {
        msg: 'A message from User profile',
        id: "custom_sp .shrink-widget"
    });

}


