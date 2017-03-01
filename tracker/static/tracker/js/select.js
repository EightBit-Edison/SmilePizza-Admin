/**
 * Created by aleksandrzukov on 17.02.17.
 */


function initMap() {
            var lat = 51.738516;
            var lng = 36.145149;
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: lat, lng: lng},
                zoom: 4
            });
                }
                
function SetMarker(lat, lng, name, orders) {
  var marker = new google.maps.Marker({
    position: {lat: lat, lng: lng},
    map: map,
    animation: google.maps.Animation.DROP
  });
  var contentString = '<div id="contentMap">'+
      '<h3 id="firstHeading" class="firstHeading">'+name+'</h3>'+
      '</div>'+
      '<p style="font-size: 14px">'+orders+'</p>';
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  google.maps.event.addListener(marker,'click', function() {
    infowindow.open(map, marker);

  });

}
function seeet(lat, lng, name, id) {
        var R = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        var r = new R();
        var p = [];
    r.open('GET', 'http://13.65.148.113/api/Orders/Closed/'+id, true);
    r.onload = function () {
        var ResZak = JSON.parse(r.responseText);
        var t = ResZak.length;
        for (var y = 0; y < t; y++) {
            var qw = ResZak[y].number;
            p.push("   " + qw);
        }
        console.log(lat + "  " + lng);
        SetMarker(lat, lng, name, p);
        //alert(p);
    };
    r.onerror = function() {
        alert( 'Ошибка ' + r.status );
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
    x.onload = function() {
      var ResGeo = JSON.parse(xhr.responseText);
      var ResD = JSON.parse(x.responseText);
        var d = ResD.length;
        var m = ResGeo.length;


        for (var i = 0; i < m; i++) {
            //var id = ResGeo[i].driver;
            var id = 7274;
            var lat = Number(ResGeo[i].lattitude);
            var lng = Number(ResGeo[i].longitude);
            console.log(lat + "  " + lng);

            for (var j = 0; j < d; j++){
                        if (id == ResD[j].login){
                           var name = ResD[j].name;
                           // alert(name +"  "+ lng +"  "+ lat);
                            setTimeout(seeet(lat, lng, name, id), 500);
                        }
            }
        }

     };
    x.onerror = function() {
      alert( 'Ошибка ' + x.status );
    };
    x.send();
    xhr.send();

}
