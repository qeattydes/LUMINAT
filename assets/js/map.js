if (typeof ymaps !== 'undefined') {
    ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map("map", {
            center: [56.326887, 44.005986],
            zoom: 16,
            controls: ['zoomControl']
        });

        var myPlacemark = new ymaps.Placemark([56.325526, 44.003724], {
            hintContent: 'Luminat',
            balloonContent: 'Большая Покровская улица, 3'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
            iconImageSize: [40, 40],
            iconImageOffset: [-20, -40]
        });

        myMap.geoObjects.add(myPlacemark);
        myMap.options.set({
            suppressMapOpenBlock: true
        });

        myMap.setOptions({
            suppressMapOpenBlock: true,
            yandexMapDisablePoiInteractivity: true
        });

        myMap.options.set('styles', [
            {
                "featureType": "all",
                "elementType": "all",
                "stylers": [
                    { "saturation": -100 },
                    { "lightness": 40 },
                    { "gamma": 0.8 }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    { "color": "#40423D" }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    { "color": "#40423D" }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    { "color": "#40423D" }
                ]
            }
        ]);
    }
}
