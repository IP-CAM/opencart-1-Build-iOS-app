$(document).ready(function() {
    $("submit").click(function(event) {
        event.preventDefault();
        var credentials = { type: 'EMAIL', username: $('username').val(), password: $('password').val() };
        $.ajax({
            type: "PUT",
            url: "api/auth",
            cache: false,
            data: JSON.stringify(credentials),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                //validate the response here, set variables... whatever needed
                    //and if credentials are valid, forward to the next page
                $.mobile.changePage($('main.html'));
                    //or show an error message
            },
            error: function() { // server couldn't be reached or other error }
        });
    });
});