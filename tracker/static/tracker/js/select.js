/**
 * Created by aleksandrzukov on 17.02.17.
 */
var map;

function initMap() {
            var lat = 51.738516;
            var lng = 36.145149;
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: lat, lng: lng},
                zoom: 7
            });
                }
                
                
function SetMarker(lat, lng) {
   var myLatLng = {lat: lat, lng: lng};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    animation: google.maps.Animation.DROP
  });

}

function GetPos() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://13.65.148.113/api/Geopositions', true);
    xhr.setRequestHeader("Access-Control-Allow-Origin","*");
    xhr.onload = function() {
        var dat = JSON.parse(xhr.responseText);
        alert( dat );
        alert( xhr.statusText );

    };
    xhr.onerror = function() {
        alert( 'Ошибка ' + xhr.status );
    };
    xhr.send();
}

function SetUser() {
    var e = document.getElementById("myselect");
    var strUser = e.options[e.selectedIndex].text;
                $("#Name").remove();
                $("#Stat").remove();


    var x = new XMLHttpRequest();
    var x1 = new XMLHttpRequest();
    x1.open("GET", '/users/?format=json', true);
    x.open('GET', '/geolabels/?format=json', true);

    x1.onreadystatechange = function () {
        if (x1.readyState === XMLHttpRequest.DONE && x1.status === 200) {
            var data = JSON.parse(x1.responseText);
            var j = data.length;
            for (var i = 0; i < j; i++) {
                if (strUser === data[i].username) {
                    var Name = data[i].username;
                    $("#userparam").append('<td id="Name">' + Name + '</td>');
                    if (data[i].is_staff === true) {
                        $("#userparam").append('<td id="Stat">Administartor</td>');
                    } else if (data[i].is_staff === false) {
                        $("#userparam").append('<td id="Stat">Driver</td>');
                    }

                }

            }
            var loc = JSON.parse(x.responseText);
            var m = loc.length;
            for (var q = 0; q < m; q++) {
                for (var n = 0; n < j; n++) {
                    if ((loc[q].student === data[n].url) && (strUser === data[n].username)) {
                        SetMarker(loc[q].latitude, loc[q].longitude);

                    }
                }
            }
        }
    };

        x.send();
        x1.send();

}
function Get() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", '/users/?format=json', true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 ) {
            var data = JSON.parse(xhr.responseText);
            var j = data.length;
            var newitemnum = 3;
            for (var i = 0; i < j; i++) {
                var newitemdesc = data[i].username;
                $("#myselect").append('<option value="'+newitemnum+'" selected="">'+newitemdesc+'</option>');
             }
            $("#myselect").val('');
            $("#myselect").selectpicker("refresh");

        }
    };

    xhr.send();

}

function AddUser() {

    var userName = "Ali";
    var Email = "123@yandex.ru";
    var Staff = false;

    var xhr = new XMLHttpRequest();

    xhr.open("POST", '/users/?username='+userName+'&email='+Email+'&is_staff='+ Staff, true);
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 ) {
            alert("Добавлено");
            Get();
        }
    };

    xhr.send();

}