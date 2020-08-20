// Species name, 2n, ploidy, type
let speciesinfo = {"regia": [34, 6, 1],
"arcturi": [20, 4, 1],
"glanduligera": [22, 4, 1],       
"sessilifolia": [20, 4, 1],       
"burmannii": [20, 4, 1],
"binata": [46, 8, 1],
"banksii": [12, 2, 1],
"petiolaris": [12, 2, 1],
"dilatatopetiolaris": [12, 2, 1], 
"falconeri": [12, 2, 1],
"ordensis": [24, 4, 1],
"lanata": [12, 2, 1],
"hamiltonii": [28, 6, 1],
"indica": [28, 6, 1],
"adelae": [28, 6, 1],
"prolifera": [30, 6, 1],
"schizandra": [30, 6, 1],
"allantostigma": [28, 4, 2],
"androsacea": [20, 4, 2],
"barbigera": [10, 2, 2],
"callistos": [24, 4, 2],
"citrina": [18, 4, 2],
"coomallo": [36, 8, 2],
"dichrosepala": [18, 4, 2],
"echinoblastus": [20, 2, 2],
"eneabba": [14, 2, 2],
"helodes": [18, 4, 2],
"hyperostigma": [10, 2, 2],
"lasiantha": [24, 4, 2],
"leioblasta": [10, 2, 2],
"leucoblasta": [14, 2, 2],
"leucostigma": [28, 4, 2],
"mannii": [14, 2, 2],
"meristocaulis": [32, 6, 2],
"micrantha": [10, 2, 2],
"miniata": [32, 6, 2],
"nitidula": [28, 4, 2],
"nivea": [18, 4, 2],
"occidentalis": [28, 4, 2],
"omissa": [28, 4, 2],
"oreopodion": [14, 2, 2],
"paleacea": [10, 2, 2],
"patens": [28, 4, 2],
"pulchella": [18, 4, 2],
"pygmaea": [28, 4, 2],
"roseana": [12, 2, 2],
"scorpioides": [18, 4, 2],
"sewellae": [18, 4, 2],
"silvicola": [12, 2, 2],
"spilos": [18, 4, 2],
"stelliflora": [18, 4, 2],
"verrucata": [12, 2, 2],
"walyunga": [16, 'n/a', 2],
"bulbosa": [24, 4, 3],
"collina": [20, 4, 3],
"erythrorhiza": [20, 4, 3],
"lowriei": [14, 2, 3],
"macrophylla": [24, 4, 3],
"major": [20, 4, 3],
"orbiculata": [26, 4, 3],
"rosulata": [26, 4, 3],
"tubaestylis": [28, 4, 3],
"whittakeri": [28, 4, 3],
"basifolia": [30, 6, 3],
"bulbigena": [14, 2, 3],
"calycina": [30, 6, 3],
"gigantea": [28, 4, 3],
"graniticola": [28, 4, 3],
"heterophylla": [30, 6, 3],
"heugelii": [28, 4, 3],
"menziesii": [26, 4, 3],
"neesii": [28, 4, 3],
"radicans": [14, 2, 3],
"stricticaulis": [20, 4, 3],
"humilis": [20, 4, 3],
"porrecta": [20, 4, 3],
"purpurascens": [20, 4, 3],
"ramellosa": [26, 4, 3],
"rupicola": [20, 4, 3],
"auriculata": [32, 6, 3],
"bicolor": [32, 6, 3],
"peltata": [30, 6, 3],
"macrantha": [30, 6, 3],
"pallida": [30, 6, 4],
"planchonii": [30, 6, 3],
"spatulata": [20, 2, 4],
"tokaiensis": [60, 6, 4],
"neocaledonica": [40, 4, 4],
"brevifolia": [20, 2, 4],
"linearis": [20, 2, 4],
"rotundifolia": [20, 2, 4],
"anglica": [40, 4, 4],
"filiformis": [20, 2, 4],
"tracyi": [20, 2, 4],
"capillaris": [20, 2, 4],
"cayennensis": [20, 2, 4],
"communis": [20, 2, 4],
"viridis": [20, 2, 4],
"intermedia": [20, 2, 4],
"roraimae": [20, 2, 4],
"hirtella": [20, 2, 4],
"ascendens": [40, 4, 4],
"camporupestris": [40, 4, 4],
"chrysolepis": [40, 4, 4],
"graminifolia": [40, 4, 4],
"grantsaui": [40, 4, 4],
"graomogolensis": [40, 4, 4],
"montana": [40, 4, 4],
"tentaculata": [40, 4, 4],
"tomentosa": [40, 4, 4],
"villosa": [40, 4, 4],
"aliciae": [40, 4, 4],
"capensis": [40, 4, 4],
"cuneifolia": [40, 4, 4],
"venusta": [40, 4, 4],
"dielsiana": [40, 4, 4],
"madagascariensis": [40, 4, 4],
"collinsiae": [40, 4, 4],
"burkeana": [20, 2, 4],
"trinervia": [40, 4, 4],
"hilaris": [40, 4, 4],
"cistiflora": [40, 4, 4],
"pauciflora": [40, 4, 4]
}

function checkIfWorks() {
    let speciesOne = $('#left_show').text();
    let speciesTwo = $('#right_show').text();
    if (speciesinfo[speciesOne] == undefined) {
        alert("Drosera" + '"' + speciesOne + '"' + " not found.");
    }
    else if (speciesinfo[speciesTwo] == undefined) {
        alert("Drosera" + '"' + speciesTwo + '"' + " not found.");
    }
    else {
        return true;
    }
}
function arrowAnimation() {
    window.setTimeout(function() {
        $('#arrow1').fadeTo(200, 0.3).fadeTo(100, 1.);
    }, 50);
    window.setTimeout(function() {
        $('#arrow2').fadeTo(200, 0.3).fadeTo(100, 1.);
    }, 125);
    window.setTimeout(function() {
        $('#arrow3').fadeTo(200, 0.3).fadeTo(100, 1.);
    }, 200);
}
function calculatePercent() {
    let speciesOne = $('#left_show').text();
    let speciesTwo = $('#right_show').text();
    let deduction = 0;
    if (speciesinfo[speciesOne][1] % 2 == 1 || speciesinfo[speciesTwo][1] == 1) {
        deduction = 92;
    }
    else {
        let diffPoly = Math.abs(speciesinfo[speciesOne][0] - speciesinfo[speciesTwo][0]);
        let diffChr =  Math.abs(speciesinfo[speciesOne][1] - speciesinfo[speciesTwo][1]);
        let character =  speciesinfo[speciesOne][2] != speciesinfo[speciesTwo][2];
        deduction += 33 * (diffPoly/40.0);
        deduction += 33 * (diffChr/8.0);
        deduction += character * 33;
    }
    $('#results').text((Math.random()*5 + 92 - deduction).toFixed(1) + "%");
}
$(document).ready(function() {
    $("#submit_button").click(function(){
        if (checkIfWorks()) {
            arrowAnimation();
            window.setTimeout(function() {
                calculatePercent();
            }, 500);
        }
    }); 
});