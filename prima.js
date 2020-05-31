const INF = Infinity;

let minKey = (min_e, visited) => {
	let minIndex, min = INF;
	for (let v = 0; v < V; v++) {
		if (visited[v] == false && min_e[v] < min) {
			min = min_e[v];
			minIndex = v;
		}
	}
	return minIndex;
}

let printEdges = (sel_e, graph, v) => {
	let minWeight = 0;
	console.log('Edges: ');
	for (let i = 1; i < V; i++) {
		console.log(`${sel_e[i] + 1} - ${i + 1}`);
		minWeight += graph[i][sel_e[i]];
		bindVertexes(v[sel_e[i]].x, v[sel_e[i]].y, v[i].x, v[i].y, 'green');
	}
	console.log("Minimal weight = " + minWeight);
  stroke(0);
	strokeWeight(1);
	textSize(18);
	text(`Minimal weight: ${minWeight}`, 20, height - 30);
}

let prima = (graph, v) => {
	let sel_e = [], min_e = [], visited = [];
	for (let i = 0; i < V; i++) {
		min_e[i] = INF;
		visited[i] = false;
	}
	min_e[0] = 0;
	sel_e[0] = -1;
	for (let k = 0; k < V - 1; k++) {
		let u = minKey(min_e, visited);
		visited[u] = true;
		for (let v = 0; v < V; v++) {
			if (graph[u][v] && visited[v] == false && graph[u][v] < min_e[v]) {
				sel_e[v] = u;
				min_e[v] = graph[u][v];
			}
		}
	}
	printEdges(sel_e, graph, v);
}

let drawVertex = (x, y, i) => {
	let d = 50;
	stroke(0);
	strokeWeight(1);
  ellipse(x, y, d, d);
	textSize(18);
	text(`${i}`, x - 5, y + 5);
}

let bindVertexes = (x1, y1, x2, y2, color) => {
	strokeWeight(3);
	stroke(color);
	line(x1, y1, x2, y2);
}

let drawWeight = (x1, y1, x2, y2, w) => {
	sx = (x2 + x1) / 2;
	sy = (y2 + y1) / 2;
	strokeWeight(1);
	stroke(0);
	textSize(14);
	text(`${w}`, sx + 10, sy - 15);
}

let drawEdges = (graph, v) => {
    let vertexes = [];

    for(let i = 0; i < graph.length; i++) {
    	for(let j = 0; j < graph.length; j++) {
    		if(i == j) {
    			let v = [];
    			let w = [];
    			for(let k = j; k < graph.length; k++) {
    				if(graph[i][k] !== 0) {
    					v.push(k + 1);
    					w.push(graph[i][k]);
    				}
    			}
    			vertexes.push({ v: i + 1, n: v, w: w });
    		}
    	}
    }

    vertexes.forEach(i => {
    	i.n.forEach((ni, index) => {
    		bindVertexes(v[i.v - 1].x, v[i.v - 1].y, v[ni - 1].x, v[ni - 1].y, 'red');
    	  drawWeight(v[i.v - 1].x, v[i.v - 1].y, v[ni - 1].x, v[ni - 1].y, i.w[index]);
    	});
    });

}

let drawAllVertexes = (v) => {
	let N = v.length;
	for(let i = 0; i < N; i++) {
    drawVertex(v[i].x, v[i].y, i + 1);
  }
}

const v = [
	{ x: 70, y: 120 },
	{ x: 230, y: 50 },
	{ x: 350, y: 130 },
	{ x: 310, y: 300 },
	{ x: 120, y: 270 }
];

const graph = [
	[0, 10, 0, 11, 4],
	[10, 0, 9, 5, 0],
	[0, 9, 0, 8, 0],
	[11, 5, 8, 0, 7],
	[4, 0, 0, 7, 0]
];

const V = v.length;

setup = () => {
	createCanvas(400, 400);
  background('rgb(200, 200, 200)');
}

draw = () => {
	drawAllVertexes(v);
	drawEdges(graph, v);
	prima(graph, v);
	drawAllVertexes(v);
	noLoop();
}
