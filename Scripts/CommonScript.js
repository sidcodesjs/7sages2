
/* Content Window */
function OpenDefaultContentWindow(content, type, events) {
    //ChangeAlertIcon($('#contentTemplate .ct_Icon'), type);
    $('#contentTemplate .ct_content').html(GetAlertContent(content, type));

    type = (type ? type : "").toLowerCase();
    switch (type) {
        case "confirm":
            $('#contentTemplate .ct_YesNobuttons').show();
            $('#contentTemplate .ct_Okbuttons').hide();
            break;
        default:
            //if (type == 'error') {
            //    if (events) {
            //        if (events.Ok) {
            //            $('#contentTemplate .ct_Okbuttons').show();
            //        }

            //    }
            //    else {
            //        $('#contentTemplate .ct_Okbuttons').hide();
            //    }


            //}
            //else {
            //    $('#contentTemplate .ct_Okbuttons').hide();
            //}
            $('#contentTemplate .ct_Okbuttons').show();

            $('#contentTemplate .ct_YesNobuttons').hide();
            break;
    }

    //var $window = $("#wndContent").data("kendoWindow");
    //$window.content($('#contentTemplate').html()).open();
    wndContent.Show();

    if (events) {
        //console.log("events");
        if (events.Yes) {
            //console.log("events 11");
            $('#wndContent .ct_Yes').click(events.Yes);
        }

        $('#wndContent .ct_No').click(events.No ? events.No : CloseContentWindow);
        $('#wndContent .ct_Ok').click(events.Ok ? events.Ok : CloseContentWindow);
        if (events.Ok) {
            if (type != 'error') {
                setTimeout(function () {
                    $('#wndContent .ct_Ok').trigger("click");
                }, 2000);
            }
        }
    }
    else {
        //console.log("events 1");
        $('#wndContent .ct_No').click(CloseContentWindow);
        $('#wndContent .ct_Ok').click(CloseContentWindow);
        setTimeout(function () {
            $('#wndContent .ct_Ok').trigger("click");
            $('#wndContent .ct_No').trigger("click");
        }, 2000);
    }


    $("#wndContent").prev().parent().css('height', 'auto');
    //.css('width', 'auto');

    //$window.center();
    //setTimeout(function () {
    //    $window.center();
    //});

}

function ChangeAlertIcon(control, alertType) {
    alertType = (alertType ? alertType : "").toLowerCase();
    var title = "";
    switch (alertType) {
        case 'error':
            control.removeClass('InfoIcon').removeClass('WarningIcon').removeClass('EmptyIcon').removeClass('ConfirmIcon').addClass('ErrorIcon');
            title = "Error";
            break;
        case 'warning':
            control.removeClass('InfoIcon').removeClass('ErrorIcon').removeClass('EmptyIcon').removeClass('ConfirmIcon').addClass('WarningIcon');
            title = "Warning";
            break;
        case 'info':
            control.removeClass('WarningIcon').removeClass('ErrorIcon').removeClass('EmptyIcon').removeClass('ConfirmIcon').addClass('InfoIcon');
            title = "Information";
            break;
        case 'confirm':
            control.removeClass('WarningIcon').removeClass('ErrorIcon').removeClass('EmptyIcon').removeClass('ConfirmIcon').addClass('ConfirmIcon');
            title = "Question";
            break;
        default:
            control.removeClass('WarningIcon').removeClass('ErrorIcon').removeClass('InfoIcon').removeClass('ConfirmIcon').addClass('EmptyIcon');
            break;
    }
    $("#wndContent").prev().find(".k-window-title").html(title);
}

function GetAlertContent(content, type) {
    //content = content.trimRight();
    var lastChar = content.charAt(content.length - 1);
    if (lastChar == '.' || lastChar == '?') {
        return content;
    }

    content += type == "confirm" ? "?" : ".";
    return content;
}

function CloseContentWindow() {
    //$("#wndContent").data("kendoWindow").close();
    wndContent.Hide();
}

function DoAjax(url, type, data, CallBack) {
    $.ajax({
        url: url,
        type: type,
        data: data,
        success: function (data) {
            if (data.HasError == true || data.HasError == false) {
                if (CallBack) {
                    CallBack(data);
                }
            }
            else {
                location.href = document.URL;
            }
        }
    });
}