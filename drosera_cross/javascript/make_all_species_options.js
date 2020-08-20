let species = ['adelae', 'aliciae', 'allantostigma', 'androsacea', 
'anglica', 'arcturi', 'ascendens', 'auriculata', 'banksii', 
'barbigera', 'basifolia', 'bicolor', 'binata', 'brevifolia', 
'bulbigena', 'bulbosa', 'burkeana', 'burmannii', 'callistos', 
'calycina', 'camporupestris', 'capensis', 'capillaris', 
'cayennensis', 'chrysolepis', 'cistiflora', 'citrina', 
'collina', 'collinsiae', 'communis', 'coomallo', 'cuneifolia', 
'dichrosepala', 'dielsiana', 'dilatatopetiolaris', 'echinoblastus', 
'eneabba', 'erythrorhiza', 'falconeri', 'filiformis', 'gigantea', 
'glanduligera', 'graminifolia', 'graniticola', 'grantsaui', 
'graomogolensis', 'hamiltonii', 'helodes', 'heterophylla',
'heugelii', 'hilaris', 'hirtella', 'humilis', 'hyperostigma', 
'indica', 'intermedia', 'lanata', 'lasiantha', 'leioblasta', 
'leucoblasta', 'leucostigma', 'linearis', 'lowriei', 'macrantha',
'macrophylla', 'madagascariensis', 'major', 'mannii', 'menziesii', 
'meristocaulis', 'micrantha', 'miniata', 'montana', 'neesii',
'neocaledonica', 'nitidula', 'nivea', 'occidentalis', 'omissa', 
'orbiculata', 'ordensis', 'oreopodion', 'paleacea', 'pallida',
'patens', 'pauciflora', 'peltata', 'petiolaris', 'planchonii', 
'porrecta', 'prolifera', 'pulchella', 'purpurascens', 'pygmaea',
'radicans', 'ramellosa', 'regia', 'roraimae', 'roseana',
'rosulata', 'rotundifolia', 'rupicola', 'schizandra',
'scorpioides', 'sessilifolia', 'sewellae', 'silvicola',
'spatulata', 'spilos', 'stelliflora', 'stricticaulis',
'tentaculata', 'tokaiensis', 'tomentosa', 'tracyi', 
'trinervia', 'tubaestylis', 'venusta', 'verrucata', 
'villosa', 'viridis', 'walyunga', 'whittakeri'];
$(document).ready(function(){
    for (let i = 0; i < species.length; i++) {
        let new_option = document.createElement("option");
        new_option.value = species[i];
        document.getElementById("species_avail").appendChild(new_option);
    }
});