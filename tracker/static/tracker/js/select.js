/**
 * Created by aleksandrzukov on 17.02.17.
 */


function initMap() {
            var lat = 51.731310;
            var lng = 36.192407;
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: lat, lng: lng},
                zoom: 13
            });
                }
                
function SetMarker(lat, lng, name, orders) {
  var marker = new google.maps.Marker({
    position: {lat: lat, lng: lng},
    map: map,
    //animation: google.maps.Animation.DROP
  });
  var contentString = '<div id="contentMap">'+
      '<span style="font-size: x-small" >'+name+'</span>'+
      '</div>'+
      '<span style="font-size: x-small" >'+orders+'</span>';
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

    infowindow.open(map, marker);
}
function SetMarker2(lat, lng, orders) {
    var marker = new google.maps.Marker({
        position: {lat: lat, lng: lng},
        map: map,
        //animation: google.maps.Animation.DROP
    });
    var contentString = '<span style="font-size: x-small" >' + orders + '</span>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    infowindow.open(map, marker);
}

    function seeet(lat, lng, name, id) {
        var R = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        var r = new R();
        var p = [];
        ser = document.getElementById('username');
        r.open('GET', 'http://13.65.148.113/api/Orders/Active/' + id, true);
        r.onload = function () {
            var ResZak = JSON.parse(r.responseText);
            var t = ResZak.length;
            for (var y = 0; y < t; y++) {
                var qw = ResZak[y].number;
                p.push("   " + qw);
            }
            console.log(lat + "  " + lng);
            if (ser.textContent == 'Admin') {
                SetMarker(lat, lng, name, p);
            } else {
                SetMarker2(lat, lng, p);
            }
            //alert(p);
        };
        r.onerror = function () {
            alert('Ошибка ' + r.status);
        };
        r.send();

    }

    function loadDoc() {

        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        var X = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        var xhr = new XHR();
        var x = new X();


        xhr.open('GET', 'http://13.65.148.113/api/Geopositions', true);
        x.open('GET', 'http://13.65.148.113/api/Drivers', true);
        x.onload = function () {
            try {

                var ResGeo = JSON.parse(xhr.responseText);
                var ResD = JSON.parse(x.responseText);
                var d = ResD.length;
                var m = ResGeo.length;


                for (var i = 0; i < m; i++) {
                    var id = ResGeo[i].driver;
                    //var id = 7274;
                    var lat = Number(ResGeo[i].lattitude);
                    var lng = Number(ResGeo[i].longitude);
                    console.log(lat + "  " + lng);

                    for (var j = 0; j < d; j++) {
                        if (id == ResD[j].login) {
                            var name = ResD[j].name;
                            // alert(name +"  "+ lng +"  "+ lat)
                            setTimeout(seeet(lat, lng, name, id), 500);

                        }
                    }
                }

            }
            catch (err) {
                location.reload()
            }
        };

        x.onerror = function () {
            alert('Ошибка ' + x.status);
        };
        x.send();
        xhr.send();

    }