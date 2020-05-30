// 2016-06-25
/*
$('#presentation_search').keyup(function () {
    presentation = '';
    var searchString = this.value;
    $('#presentation_start').prop('disabled', true);
    if (searchString.length > 2)
        $.ajax({
            type: 'GET',
            url: 'php/presentation_search.php',
            data: 'searchString=' + searchString,
            success: function (res) {
                var parcedRes = JSON.parse(res);
                var htmlResults = '';

                for (var i = 0; i < parcedRes.length; i++) {
                    htmlResults += '<input type="button" class="btn btn-success" value="' + parcedRes[i].title + '" onclick="selectPresentation(' + "'" + parcedRes[i].title + "'" + ')">';
                }

                if (parcedRes.length === 11) {
                    htmlResults += '</br>.</br>.</br>.';
                }

                $('#presentations_found').html(htmlResults);
            }
        });
});

function selectPresentation(pres) {
    presentation = pres;
    load();
    $('#presentation_start').attr("onclick", "startPresentation()").prop('disabled', false);
}
*/
