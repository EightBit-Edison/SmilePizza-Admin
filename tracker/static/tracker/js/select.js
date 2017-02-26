/**
 * Created by aleksandrzukov on 17.02.17.
 */



function initMap() {
            var lat = 51.738516;
            var lng = 36.145149;
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: lat, lng: lng},
                zoom: 3
            });
                }
                
function SetMarker(lat, lng, name) {
   var myLatLng = {lat: lat, lng: lng};

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    animation: google.maps.Animation.DROP
  });


  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h3 id="firstHeading" class="firstHeading">'+name+'</h3>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  google.maps.event.addListener(marker,'click', function() {
    infowindow.open(map, marker);
  });

}




function loadDoc() {
 $.getJSON("http://13.65.148.113/api/Geopositions",
    function(r) {
        var m = r.length;
        for (var i = 0; i < m; i++) {
            var id = r[i].driver;
            var lat = Number(r[i].lattitude);
            var lng = Number(r[i].longitude);
            //alert(name +"  "+ lng +"  "+ lat);
            SetMarker(lat, lng, id);

        }
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
                        //SetMarker(loc[q].latitude, loc[q].longitude);

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
    var x = new XMLHttpRequest();
    xhr.open("GET", '/users/?format=json', true);
    x.open('GET', '/geolabels/?format=json', true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 ) {
            var data = JSON.parse(xhr.responseText);
            var loc = JSON.parse(x.responseText);
            var j = data.length;
            for (var i = 0; i < j; i++) {
                var newitemdesc = data[i].username;
            }
            var m = loc.length;
            for (var j = 0; j < m; j++) {
                //SetMarker(loc[j].latitude, loc[j].longitude);

             }


        }
    };

    x.send();
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