
$(document).ready(function () {
    $('.modal-dialog #myTabs a').on('click', function (e) {
        alert('clicked');
        e.preventDefault();
        $(this).tab('show');
    });

    $('#edit').click(function () {
        bootbox.dialog({
            message: $('#editPopUp').html(),
            title: "Edit Element",
            buttons: {
                cancel: {
                    label: "Cancel",
                    className: "btn-default",
                    callback: function () {
                        
                    }
                },
                remove: {
                    label: "Delete",
                    className: "btn-danger",
                    callback: function () {

                    }
                },
                save: {
                    label: "Save",
                    className: "btn-primary",
                    callback: function () {
                        
                    }
                }
            }
        });
    });

    $('#add').click(function () {
        bootbox.dialog({
            message: $('#addPopUp').html(),
            title: "Add New Element",
            buttons: {
                cancel: {
                    label: "Cancel",
                    className: "btn-default",
                    callback: function () {

                    }
                },
                save: {
                    label: "Save",
                    className: "btn-primary",
                    callback: function () {
                        $('#spanAddOuter').addClass("label-warning");
                        $('#spanAddInner').show();
                    }
                }
            }
        });
    });

});

