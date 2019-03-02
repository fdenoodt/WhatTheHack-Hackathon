$.ajax({
    type: 'POST',
    url: "../ceap/php/CEAP_Inscripts.php",
    dataType: 'json',
    cache: false,
    data: {},
    success: displayinscripts
});
