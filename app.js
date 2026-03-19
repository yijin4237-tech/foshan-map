var map;
var markers = [];
var infoWindows = [];

var locations = {
    company: [
        {
            name: '广东文科绿色科技股份有限公司',
            address: '佛山市顺德区佛山新城天虹路46号信保广场1号楼29层02至04单元',
            lng: 113.140827,
            lat: 22.962154,
            description: '专注于绿色科技研发与应用的创新型企业，致力于环保技术与可持续发展解决方案。',
            type: 'company'
        }
    ],
    villages: [
        {
            name: '黎冲村',
            address: '佛山市禅城区汾江南路与澜石一路交叉口西北80米',
            lng: 113.106841,
            lat: 22.986025,
            description: '位于禅城区的历史古村，保存着丰富的岭南文化遗存，村内古建筑群保存完好。',
            type: 'village'
        },
        {
            name: '逢简村',
            address: '佛山市顺德区杏坛镇',
            lng: 113.154675,
            lat: 22.812652,
            description: '被誉为"顺德周庄"的水乡古村，有着悠久的历史和独特的水乡风情，是国家AAA级旅游景区。',
            type: 'village'
        },
        {
            name: '仙岗村',
            address: '佛山市南海区丹灶镇',
            lng: 112.886,
            lat: 23.040668,
            description: '拥有千年历史的古村落，以"仙岗八景"闻名，村内保留大量明清古建筑。',
            type: 'village'
        },
        {
            name: '碧江村',
            address: '佛山市顺德区北滘镇',
            lng: 113.26305,
            lat: 22.94226,
            description: '著名的侨乡古村，保存有完整的古建筑群，金楼等建筑极具艺术价值。',
            type: 'village'
        },
        {
            name: '烟桥村',
            address: '佛山市南海区九江镇',
            lng: 112.959574,
            lat: 22.872088,
            description: '有着六百多年历史的古村，以"烟桥"古桥闻名，是广东省历史文化名村。',
            type: 'village'
        },
        {
            name: '黄连村',
            address: '佛山市顺德区关地华光路与关地大马路交叉口西80米',
            lng: 113.148894,
            lat: 22.888664,
            description: '顺德著名古村，以黄连古埠和传统手工业闻名，保留着浓厚的岭南水乡特色。',
            type: 'village'
        },
        {
            name: '上村',
            address: '佛山市顺德区均安镇',
            lng: 113.131224,
            lat: 22.722399,
            description: '位于均安镇的传统村落，自然环境优美，保留着原生态的乡村风貌。',
            type: 'village'
        },
        {
            name: '松塘村',
            address: '佛山市南海区桂香坊与舟华坊交叉口东南20米',
            lng: 112.913646,
            lat: 22.98569,
            description: '中国历史文化名村，以"松塘八景"著称，是著名的科举文化名村。',
            type: 'village'
        },
        {
            name: '苏村',
            address: '佛山市高明区荷富路742号',
            lng: 112.866838,
            lat: 22.932238,
            description: '高明区的传统村落，历史悠久，村内保存有多处历史文物建筑。',
            type: 'village'
        },
        {
            name: '江根村',
            address: '佛山市三水区江根村小组党群服务中心东侧230米',
            lng: 112.823975,
            lat: 23.14787,
            description: '位于三水区的古村落，地处北江之畔，风景秀丽，人文底蕴深厚。',
            type: 'village'
        }
    ]
};

function initMap() {
    map = new AMap.Map('map', {
        zoom: 11,
        center: [113.12, 23.02],
        mapStyle: 'amap://styles/normal',
        viewMode: '2D'
    });
    
    map.on('complete', function() {
        addMarkers();
        renderSidebar();
    });
}

function createMarkerIcon(type) {
    if (type === 'company') {
        return new AMap.Marker({
            offset: new AMap.Pixel(-15, -35),
            content: '<div class="custom-marker company-marker">' +
                '<svg width="30" height="40" viewBox="0 0 30 40">' +
                '<path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 25 15 25s15-14.5 15-25C30 6.7 23.3 0 15 0z" fill="#dc3545"/>' +
                '<circle cx="15" cy="14" r="7" fill="#fff"/>' +
                '<path d="M15 8v12M9 14h12" stroke="#dc3545" stroke-width="2"/>' +
                '</svg></div>'
        });
    } else {
        return new AMap.Marker({
            offset: new AMap.Pixel(-15, -35),
            content: '<div class="custom-marker village-marker">' +
                '<svg width="30" height="40" viewBox="0 0 30 40">' +
                '<path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 25 15 25s15-14.5 15-25C30 6.7 23.3 0 15 0z" fill="#2e8b57"/>' +
                '<circle cx="15" cy="14" r="7" fill="#fff"/>' +
                '<path d="M10 12l5-4 5 4M10 16l5-4 5 4" stroke="#2e8b57" stroke-width="1.5" fill="none"/>' +
                '</svg></div>'
        });
    }
}

function addMarkers() {
    var allLocations = locations.company.concat(locations.villages);
    
    allLocations.forEach(function(location, index) {
        var markerContent = document.createElement('div');
        markerContent.className = 'custom-marker';
        
        var iconSvg, labelClass;
        
        if (location.type === 'company') {
            iconSvg = '<svg width="32" height="42" viewBox="0 0 32 42">' +
                '<defs>' +
                '<filter id="shadow1" x="-20%" y="-20%" width="140%" height="140%">' +
                '<feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>' +
                '</filter>' +
                '</defs>' +
                '<g filter="url(#shadow1)">' +
                '<path d="M16 0C7.2 0 0 7.2 0 16c0 11.2 16 26 16 26s16-14.8 16-26C32 7.2 24.8 0 16 0z" fill="#dc3545"/>' +
                '<circle cx="16" cy="15" r="8" fill="#fff"/>' +
                '<path d="M16 9v12M10 15h12" stroke="#dc3545" stroke-width="2.5" stroke-linecap="round"/>' +
                '</g>' +
                '</svg>';
            markerContent.innerHTML = iconSvg;
        } else {
            iconSvg = '<svg width="32" height="42" viewBox="0 0 32 42">' +
                '<defs>' +
                '<filter id="shadow2" x="-20%" y="-20%" width="140%" height="140%">' +
                '<feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>' +
                '</filter>' +
                '</defs>' +
                '<g filter="url(#shadow2)">' +
                '<path d="M16 0C7.2 0 0 7.2 0 16c0 11.2 16 26 16 26s16-14.8 16-26C32 7.2 24.8 0 16 0z" fill="#2e8b57"/>' +
                '<circle cx="16" cy="15" r="8" fill="#fff"/>' +
                '<path d="M11 13l5-3 5 3M11 17l5-3 5 3" stroke="#2e8b57" stroke-width="1.5" fill="none" stroke-linecap="round"/>' +
                '</g>' +
                '</svg>';
            labelClass = 'marker-label village-label';
            markerContent.innerHTML = iconSvg + '<div class="' + labelClass + '">' + location.name + '</div>';
        }
        
        var marker = new AMap.Marker({
            position: [location.lng, location.lat],
            content: markerContent,
            offset: new AMap.Pixel(-16, -42),
            title: location.name
        });
        
        marker.setMap(map);
        markers.push({
            marker: marker,
            location: location
        });
        
        marker.on('click', function() {
            showInfoWindow(marker, location);
        });
    });
}

function showInfoWindow(marker, location) {
    infoWindows.forEach(function(iw) {
        iw.close();
    });
    
    var titleClass = location.type === 'company' ? 'company' : 'village';
    
    var content = '<div class="info-window-content">' +
        '<div class="info-title ' + titleClass + '">' + location.name + '</div>' +
        '<div class="info-address">' + location.address + '</div>' +
        '<div class="info-desc">' + location.description + '</div>' +
        '</div>';
    
    var infoWindow = new AMap.InfoWindow({
        content: content,
        offset: new AMap.Pixel(0, -45),
        size: new AMap.Size(300, 0),
        closeWhenClickMap: true
    });
    
    infoWindow.open(map, marker.getPosition());
    infoWindows.push(infoWindow);
}

function renderSidebar() {
    var companyList = document.getElementById('company-list');
    var villageList = document.getElementById('village-list');
    
    locations.company.forEach(function(location) {
        var li = createListItem(location, 'company-item');
        companyList.appendChild(li);
    });
    
    locations.villages.forEach(function(location) {
        var li = createListItem(location, 'village-item');
        villageList.appendChild(li);
    });
}

function createListItem(location, itemClass) {
    var li = document.createElement('li');
    li.className = 'location-item ' + itemClass;
    
    li.innerHTML = 
        '<div class="location-name">' + location.name + '</div>' +
        '<div class="location-address">' + location.address + '</div>';
    
    li.addEventListener('click', function() {
        panToLocation(location);
    });
    
    return li;
}

function panToLocation(location) {
    map.setZoomAndCenter(14, [location.lng, location.lat], false, 500);
    
    setTimeout(function() {
        markers.forEach(function(item) {
            if (item.location.name === location.name) {
                showInfoWindow(item.marker, location);
            }
        });
    }, 600);
}

function initCollapse() {
    var collapsibleTitles = document.querySelectorAll('.section-title.collapsible');
    
    collapsibleTitles.forEach(function(title) {
        title.addEventListener('click', function() {
            var list = this.nextElementSibling;
            var isCollapsed = list.classList.contains('collapsed');
            
            if (isCollapsed) {
                list.classList.remove('collapsed');
                this.classList.remove('collapsed');
            } else {
                list.classList.add('collapsed');
                this.classList.add('collapsed');
            }
        });
    });
}

function initSidebarToggle() {
    var sidebar = document.getElementById('sidebar');
    var toggleBtn = document.getElementById('sidebar-toggle');
    
    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        toggleBtn.classList.toggle('collapsed');
    });
}

window.onload = function() {
    initMap();
    initCollapse();
    initSidebarToggle();
};
