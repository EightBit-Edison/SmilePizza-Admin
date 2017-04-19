/**
 * Created by aleksandrzukov on 17.02.17.
 */
/*
function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}
*/
var longti = 36.192407;
var lati = 51.731310;
//alert(latitude + longtitude);



function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: lati, lng: longti},
                zoom: 13
            });
                }


/*
setInterval(function () {
    document.cookie = "zoom="+map.zoom;
}, 1500);

setInterval(function () {
    document.cookie = "center="+map.center;
}, 500);

var cen = get_cookie ( "center" );
var zoom = get_cookie ( "zoom" );
if (zoom == "undefined" || zoom == "NaN"){
    zoom = "13";
}
try{
    var n = cen.search(/,/i);
    lati = Number(cen.slice(1,n));
    longti = Number(cen.slice(n+1, cen.length-1));

}catch(err){
   longti = 36.192407;
   lati = 51.731310;
}
*/
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
                //map.setZoom(10);
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
                            setTimeout(seeet(lat, lng, name, id), 2000);

                        }
                    }
                }
                //setTimeout(MoveMap(lati, longti), 5000);

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

/*
function MoveMap (lati,longti) {
        return function(e) {
          self.map.panTo(new google.maps.LatLng(lati,longti));
          setTimeout(map.setZoom(17), 3000);
        }
    }
*/