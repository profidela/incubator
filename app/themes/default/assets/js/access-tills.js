$( document ).ready(function() {

    $('select#StaffId').select2({
        placeholder: "Выберите сотрудника"
    });

    $('select#CassaId').select2({
        placeholder: "Выберите кассу"
    });

    $('#StaffId').bind("change keyup input",function() {
        let submit_el = $("input[type='submit']");
        let cassa_id = $('#CassaId').val();
        let tr = $(".table>tbody tr");
        let staff_el = $("#StaffName");
        let staff_id = $(this).val();
        let staff_name = $('#StaffName').val();
        let cassa_title = $('#CassaTitle').val();

        tr.show();
        let staff = staffs.find(o => o.id === staff_id);
        (staff ? staff_el.val(staff['name']) : staff_el.val(''))
        if(staff_id) {
            tr.each(function (i, elem) {
                let id = $(this).find("td[data-key='StaffId']").text();
                ((staff_id !== id)?$(this).closest("tr").hide():'')
            });
        }
        if(staff_id && cassa_id) { submit_el.removeAttr("disabled"); } else { submit_el.attr("disabled", true); }
    });

    $('#CassaId').bind("change keyup input",function() {
        let submit_el = $("input[type='submit']");
        let cassa_el = $("#CassaTitle");
        let staff_id = $('#StaffId').val();
        let staff_name = $('#StaffName').val();
        let cassa_title = $('#CassaTitle').val();
        let cassa_id = $(this).val();

        let till = tills.find(o => o.id === cassa_id);
        (till?cassa_el.val(till['title']):cassa_el.val(''))
        if(staff_id && cassa_id) { submit_el.removeAttr("disabled");  } else { submit_el.attr("disabled", true); }
    });



    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: "api/tills/add",
            type: 'POST',
            data:{
                staff_id: $("#StaffId").val(),
                till_id: $("#CassaId").val()
            },
            success: function (response) {
                location.reload();
            },
            error: function () {
                location.reload();
            }
        });
    });

    $("span[data-mode='delete']").click(function(e) {
        e.preventDefault();
        $.ajax({
            url: "api/tills/delete",
            type: 'POST',
            data:{
                staff_id: $(this).closest("tr").find("td[data-key='StaffId']").text(),
                till_id: $(this).closest("tr").find("td[data-key='CassaId']").text()
            },
            success: function (response) {
                location.reload();
            },
            error: function () {
                location.reload();
            }
        });
    });

});