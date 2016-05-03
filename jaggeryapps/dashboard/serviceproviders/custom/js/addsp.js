function drawAddSP() {
    var output = "";
output = '<div class="row">'+
        '<div class="col-md-5 forms">'+
            '<div class="form-group">'+
                '<label for="service-provider-name">Service Provider Name: </label>'+
                '<input name="service-provider-name" id="spName" name="spName" type="text" class="form-control" placeholder="Enter service provider name" />'+
            '</div>'+
            '<div class="form-group">'+
                '<label for="service-provider-description" >Description: </label>'+
                '<textarea name="service-provider-description" id="spDesc" name="spDesc" class="form-control" rows="3" ></textarea>'+
                '<input type="hidden" value="custom]" id="spType" name="spType" />\n' +
            '</div>'+
            '<div class="form-group">'+
                 '<button class="cu-btn cu-btn-sm cu-btn-blue cu-btn-position" onclick="registerSP();return false;" >'+
                 '<span class="fw-stack fw-lg btn-action-ico">'+
                     '<i class="fw fw-ring fw-stack-2x"></i>'+
                     '<i class="fw fw-add fw-stack-1x"></i>'+
                 '</span>'+
                ' Register'+
                 '</button>'+
                '<button class="cu-btn cu-btn-sm cu-btn-blue cu-btn-position" style="margin-left: 2%;" onclick="cancel();return false;">'+
                '<span class="fw-stack fw-lg btn-action-ico">'+
                '<i class="fw fw-ring fw-stack-2x"></i>'+
                '<i class="fw fw-add fw-stack-1x"></i>'+
                '</span>'+
                ' Cancel'+
                '</button>'+
            '</div>'+
        '</div>'+
        '</div>';
    $("#addSPBody").empty();
    $("#addSPBody").append(output);
}

function drawFederationConfigPage() {
    alert('federation config page');
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
        registerCustomSP();

    }
}

function registerCustomSP() {
    var str = PROXY_CONTEXT_PATH + "/dashboard/serviceproviders/custom/controllers/custom/add_finish.jag";
    $.ajax({
        url: str,
        type: "POST",
        data: "spName="+$('#spName').val()+"&spDesc="+$('#spType').val()+$('#spDesc').val() + "&profileConfiguration=default" + "&cookie=" + cookie + "&user=" + userName
    })
        .done(function (data) {
            window.location.href = PROXY_CONTEXT_PATH + "/dashboard/serviceproviders/listsp.jag"
            //message({content:'Successfully saved changes to the profile',type:'info', cbk:function(){} });
        })
        .fail(function () {
            message({content: 'Error while updating Profile', type: 'error', cbk: function () {
            } });

        })
        .always(function () {
            console.log('completed');
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
    validateSPName();


}

function cancel() {
    gadgets.Hub.publish('org.wso2.is.dashboard', {
        msg: 'A message from User profile',
        id: "custom_sp .shrink-widget"
    });

}

