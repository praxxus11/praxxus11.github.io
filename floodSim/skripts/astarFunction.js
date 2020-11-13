function priority_queue(LEQfunc, toString) {
    // priority queue emulator
    this.arr = [];
    // comparison function:
    // must return true if a <= b, false otherwise
    this.LEQfunc = LEQfunc;
    this.toString = toString;
    this.size = function() {
        return this.arr.length;
    }
    this.push = function(obj) {
        let low = 0;
        let high = this.size();
        // finds the index of the element
        // in array strictly greater than obj
        while (low<high) {
            let mid = Math.floor((low+high)/2);
            if (this.LEQfunc(this.arr[mid], obj)) 
                low=mid+1;
            else 
                high=mid;
        }
        this.arr.splice(low,0,obj);
    }
    this.pop = function() {
        return this.arr.shift();
    }
    this.get = function(i) {
        return this.arr[i];
    } 
    this.print = function() {
        let hi = "";
        for (let i=0; i<this.size(); i++) {
            hi += toString(this.arr[i]) + "\n";
        }
        console.log(hi);
    }
}

function costs(gCost, hCost, i, j) {
    this.gCost = gCost;
    this.hCost = hCost;
    this.i = i;
    this.j = j;
    this.inQueue = false;
    this.fCost = function() {
        return this.gCost+this.hCost;
    }
    this.update = function (g, h) {
        this.gCost = g;
        this.hCost = h;
    }
}

function LEQcosts(a, b) {
    if (a.fCost()==b.fCost()) {
        return a.hCost<=b.hCost;
    }
    return a.fCost()<=b.fCost();
}

async function aStar(ii, jj, targeti, targetj) {
    function insert(obj) {
        pq.push(new costs(obj.gCost, obj.hCost, obj.i, obj.j));
        allPixel[obj.i][obj.j].color = [0, 100, 0];
        allPixel[obj.i][obj.j].pressed = true;
        costMat[obj.i][obj.j].inQueue = true;
        allPixel[obj.i][obj.j].draw();
    }
    function woorks(i, j) {
        if (i<0 || i>=allPixel.length || j<0 || j>=allPixel[0].length) return false; 
        if (allPixel[i][j].type==3) return false;
        return true;
    }
    if (gridStyle=='hex') {
        filling = false;
        alert("A* not supported for hex");
        changingPix = setInterval(dynamic, 1);
        return;
    }
    let timer = 0;
    let pq = new priority_queue(LEQcosts, function(a) {return (a.gCost + " " + a.hCost);});
    let costMat = [];

    for (let i=0; i<allPixel.length; i++) {
        let temp = [];
        for (let j=0; j<allPixel[0].length; j++) {
            temp.push(new costs(-1,-1,i,j));
        }
        costMat.push(temp);
    }
    
    pq.push(new costs(0, Math.abs(ii-targeti)+Math.abs(jj-targetj), ii, jj));
    costMat[ii][jj].update(0, -1+Math.abs(ii-targeti)+Math.abs(jj-targetj));
    costMat[ii][jj].inQueue = true;

    while (pq.size()>0) {
        let curr = pq.pop();
        if (allPixel[curr.i][curr.j].type==3) { 
            // this is possible if two entries are in the pq
            // that correspond to the same square. Heppens when 
            // a closer distance is found to that sqaure. 
            continue;
        }

        let i = curr.i;
        let j = curr.j;

        allPixel[i][j].color = [100, 255, 100];
        allPixel[i][j].type = 3;
        allPixel[i][j].pressed = true;
        allPixel[i][j].draw();
        costMat[i][j].inQueue = false;
        if (curr.i==targeti && curr.j==targetj) {
            aStarPath(costMat,targeti,targetj);
            return;
        }
        if (woorks(i,j-1)) {
            if (costMat[i][j-1].inQueue) {
                if (costMat[i][j-1].gCost>costMat[i][j].gCost+1) {
                    costMat[i][j-1].gCost=costMat[i][j].gCost+1;
                    insert(costMat[i][j-1]);
                }
            }
            else {
                costMat[i][j-1].update(costMat[i][j].gCost+1, (-1+Math.abs(i-targeti)+Math.abs(j-1-targetj)));
                insert(costMat[i][j-1]);
            }
        }
        if (woorks(i-1,j)) {
            if (costMat[i-1][j].inQueue) {
                if (costMat[i-1][j].gCost>costMat[i][j].gCost+1) {
                    costMat[i-1][j].gCost=costMat[i][j].gCost+1;
                    insert(costMat[i-1][j]);
                }
            }
            else {
                costMat[i-1][j].update(costMat[i][j].gCost+1, (-1+Math.abs(i-1-targeti)+Math.abs(j-targetj)));
                insert(costMat[i-1][j]);
            }
        }
        if (woorks(i,j+1)) {
            if (costMat[i][j+1].inQueue) {
                if (costMat[i][j+1].gCost>costMat[i][j].gCost+1) {
                    costMat[i][j+1].gCost=costMat[i][j].gCost+1;
                    insert(costMat[i][j+1]);
                }
            }
            else {
                costMat[i][j+1].update(costMat[i][j].gCost+1, (-1+Math.abs(i-targeti)+Math.abs(j+1-targetj)));
                insert(costMat[i][j+1]);
            }
        }
        if (woorks(i+1,j)) {
            if (costMat[i+1][j].inQueue) {
                if (costMat[i+1][j].gCost>costMat[i][j].gCost+1) {
                    costMat[i+1][j].gCost=costMat[i][j].gCost+1;
                    insert(costMat[i+1][j]);
                }
            }
            else {
                costMat[i+1][j].update(costMat[i][j].gCost+1, (-1+Math.abs(i+1-targeti)+Math.abs(j-targetj)));
                insert(costMat[i+1][j]);
            }
        }
        if (timer%step==0) await sleep(pause);
        timer++;
    }
    setTimeout(function() {alert("NOT POSSIBLE");}, 100);
    filling = false;
}

async function aStarPath(costMat, targeti, targetj) {
    function withinBounds(i, j) {
        if (i<0||i>=allPixel.length||j<0||j>=allPixel[0].length) return false;
        if (costMat[i][j].inQueue || costMat[i][j].gCost==-1) return false;
        return true;
    }
    function fillCol(i, j) {
        allPixel[i][j].color = [120, 90, 255];
        allPixel[i][j].draw();
    }
    let timer = 0;
    let i = targeti, j = targetj;
    fillCol(i, j);
    while (costMat[i][j].gCost!=0) {
        let minDist = 1e7;
        if (withinBounds(i-1, j)) minDist = Math.min(minDist, costMat[i-1][j].gCost);
        if (withinBounds(i+1, j)) minDist = Math.min(minDist, costMat[i+1][j].gCost);
        if (withinBounds(i, j-1)) minDist = Math.min(minDist, costMat[i][j-1].gCost);
        if (withinBounds(i, j+1)) minDist = Math.min(minDist, costMat[i][j+1].gCost);

        if (withinBounds(i-1, j) && costMat[i-1][j].gCost==minDist) {fillCol(i-1, j); i--;}
        else if (withinBounds(i+1, j) && costMat[i+1][j].gCost==minDist) {fillCol(i+1, j); i++;}
        else if (withinBounds(i, j-1) && costMat[i][j-1].gCost==minDist) {fillCol(i, j-1); j--;}
        else if (withinBounds(i, j+1) && costMat[i][j+1].gCost==minDist) {fillCol(i, j+1); j++;}

        if (timer%(step*5)==0) await sleep(pause);
        timer++;
    }
    filling=false;
}