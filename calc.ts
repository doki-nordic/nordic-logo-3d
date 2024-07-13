
const xmlns = "http://www.w3.org/2000/svg";

interface Vec2D {
    x: number;
    y: number;
}

interface Vec3D extends Vec2D {
    z: number;
}

function vecNeg2d(v: Vec2D): Vec2D {
    return {
        x: -v.x,
        y: -v.y,
    };
}

function vecNeg3d(v: Vec3D): Vec3D {
    return {
        x: -v.x,
        y: -v.y,
        z: -v.z,
    };
}

function vecDot(a: Vec3D, b: Vec3D) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}

function invPerspective(p: Vec2D, z: number, z0: number): Vec3D {
    return {
        x: p.x * z / z0,
        y: p.y * z / z0,
        z,
    };
}

function oppositeSide(p: Vec3D): Vec3D {
    return {
        x: -p.x,
        y: -p.y,
        z: p.z,
    };
}

function planeFromPoints(A: Vec3D, B: Vec3D, C: Vec3D) {
    let N: Vec3D = {
        x: (A.y - B.y) * (A.z - C.z) - (A.y - C.y) * (A.z - B.z),
        y: -(A.x - B.x) * (A.z - C.z) + (A.x - C.x) * (A.z - B.z),
        z: (A.x - B.x) * (A.y - C.y) - (A.x - C.x) * (A.y - B.y),
    };
    let D = -A.x * B.y * C.z + A.x * B.z * C.y + A.y * B.x * C.z - A.y * B.z * C.x - A.z * B.x * C.y + A.z * B.y * C.x;
    return { N, D };
}

function pointFromPlaneAnd2D(P: Vec2D, N: Vec3D, D: number, z0: number): Vec3D {
    return {
        x: -D * P.x / (N.x * P.x + N.y * P.y + N.z * z0),
        y: -D * P.y / (N.x * P.x + N.y * P.y + N.z * z0),
        z: -D * z0 / (N.x * P.x + N.y * P.y + N.z * z0),
    };
}

function pointFromPlanes(N1: Vec3D, D1: number, N2: Vec3D, D2: number, N3: Vec3D, D3: number): Vec3D {
    return {
        x: (-D1 * N2.y * N3.z + D1 * N3.y * N2.z + D2 * N1.y * N3.z - D2 * N3.y * N1.z - D3 * N1.y * N2.z + D3 * N2.y * N1.z)
            / (N1.x * N2.y * N3.z - N1.x * N3.y * N2.z - N2.x * N1.y * N3.z + N2.x * N3.y * N1.z + N3.x * N1.y * N2.z - N3.x * N2.y * N1.z),
        y: (D1 * N2.x * N3.z - D1 * N3.x * N2.z - D2 * N1.x * N3.z + D2 * N3.x * N1.z + D3 * N1.x * N2.z - D3 * N2.x * N1.z)
            / (N1.x * N2.y * N3.z - N1.x * N3.y * N2.z - N2.x * N1.y * N3.z + N2.x * N3.y * N1.z + N3.x * N1.y * N2.z - N3.x * N2.y * N1.z),
        z: (-D1 * N2.x * N3.y + D1 * N3.x * N2.y + D2 * N1.x * N3.y - D2 * N3.x * N1.y - D3 * N1.x * N2.y + D3 * N2.x * N1.y)
            / (N1.x * N2.y * N3.z - N1.x * N3.y * N2.z - N2.x * N1.y * N3.z + N2.x * N3.y * N1.z + N3.x * N1.y * N2.z - N3.x * N2.y * N1.z),
    };
}

function vecDiff(a: Vec3D, b: Vec3D) {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
        z: a.z - b.z,
    };
}

function pointFromPlaneAndLine(P1: Vec3D, P2: Vec3D, P3: Vec3D, A: Vec3D, B: Vec3D) {
    let { N, D } = planeFromPoints(P1, P2, P3);
    let V = vecDiff(A, B);
    return {
        x: (A.x * N.y * V.y + A.x * N.z * V.z - A.y * N.y * V.x - A.z * N.z * V.x - D * V.x) / (N.x * V.x + N.y * V.y + N.z * V.z),
        y: (-A.x * N.x * V.y + A.y * N.x * V.x + A.y * N.z * V.z - A.z * N.z * V.y - D * V.y) / (N.x * V.x + N.y * V.y + N.z * V.z),
        z: (-A.x * N.x * V.z - A.y * N.y * V.z + A.z * N.x * V.x + A.z * N.y * V.y - D * V.z) / (N.x * V.x + N.y * V.y + N.z * V.z),
    }
}

function normalize(V: Vec3D) {
    let d = 1 / Math.sqrt(V.x * V.x + V.y * V.y + V.z * V.z);
    return {
        x: V.x * d,
        y: V.y * d,
        z: V.z * d,
    }
}


const sqrt3 = Math.sqrt(3);

const points2d: { [key: string]: Vec2D } = {
    A: { x: -sqrt3 / 4, y: 1 / 4 },
    B: { x: sqrt3 / 4, y: -1 / 4 },
    C: { x: sqrt3 / 8, y: - 1 / 4 - 1 / 8 },
    D: { x: -sqrt3 / 8, y: -1 / 8 },
    E: { x: -sqrt3 / 8, y: -1 / 4 - 1 / 8 },
    F: { x: -sqrt3 / 4, y: -1 / 4 },
    G: { x: 0, y: -1 / 4 },
    O: { x: 0, y: 0 },
    // N, M not visible in 2D
};

points2d.H = vecNeg2d(points2d.F);
points2d.I = vecNeg2d(points2d.E);
points2d.J = vecNeg2d(points2d.D);
points2d.K = vecNeg2d(points2d.C);
points2d.L = vecNeg2d(points2d.G);


interface Geometry {
    vertices: Vec3D[];
    vertexNames: string[];
    faces: Face[];
    lights: Vec3D[];
}

interface Face {
    indexes: number[];
    normal: Vec3D;
    color: string;
    intensityDiff?: number;
    order: 'first' | 'above' | 'below' | 'base';
    name: string;
}


function calcGeometry(z0: number, z1: number) {

    let A: Vec3D = { ...points2d.A, z: z0 };
    let B: Vec3D = { ...points2d.B, z: z0 };
    let F = invPerspective(points2d.F, z1, z0);

    let { N: Na, D: Da } = planeFromPoints(A, B, F);

    let C = pointFromPlaneAnd2D(points2d.C, Na, Da, z0);
    let D = pointFromPlaneAnd2D(points2d.D, Na, Da, z0);
    let E = pointFromPlaneAnd2D(points2d.E, Na, Da, z0);

    let H = oppositeSide(F);
    let I = oppositeSide(E);
    let J = oppositeSide(D);
    let K = oppositeSide(C);

    let { N: Nb, D: Db } = planeFromPoints(B, A, H);
    let Ne = vecNeg3d(Nb);
    let De = -vecDot(Ne, F);

    let G = pointFromPlaneAnd2D(points2d.G, Ne, De, z0)
    let L = oppositeSide(G);
    let { N: Ng, D: Dg } = planeFromPoints(K, G, J);
    let O = pointFromPlaneAnd2D(points2d.O, Ng, Dg, z0);

    let { N: Nh, D: Dh } = planeFromPoints(C, L, D);
    let { N: Ni, D: Di } = planeFromPoints(A, F, K);
    let M = pointFromPlanes(Ne, De, Ni, Di, Ng, Dg);
    let N = oppositeSide(M);
    let { N: Nj, D: Dj } = planeFromPoints(B, H, C);
    let { N: Nc, D: Dc } = planeFromPoints(D, G, E);
    let { N: Nd, D: Dd } = planeFromPoints(J, L, I);
    let { N: Nf, D: Df } = planeFromPoints(I, L, H);

    let Q = pointFromPlaneAndLine(O, K, J, C, N);

    //              0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15
    let vertices = [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, Q];
    let vertexNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'Q'];
    let faces: Face[] = [
        /* g */ { name: 'g', color: '#94d1e3', indexes: [10, 12, 6, 14, 9], normal: normalize(Ng), order: 'base' },

        /* h1 */ { name: 'h1', color: '#00a9ce', indexes: [13, 11, 14, 15], normal: normalize(Nh), order: 'above' },
        /* h2 */ { name: 'h2', color: '#00a9ce', indexes: [3, 14, 15, 2], normal: normalize(Nh), order: 'below' },

        /* c1 */ { name: 'c1', color: '#60bdd8', indexes: [3, 6, 4], normal: normalize(planeFromPoints(D, G, E).N), order: 'below' },
        /* c2 */ { name: 'c2', color: '#60bdd8', indexes: [3, 14, 6], normal: normalize(planeFromPoints(D, O, G).N), order: 'below' },
        /* d1 */ { name: 'd2', color: '#81cadf', indexes: [8, 9, 11], normal: normalize(planeFromPoints(I, J, L).N), order: 'above' },
        /* d2 */ { name: 'd2', color: '#81cadf', indexes: [9, 14, 11], normal: normalize(planeFromPoints(J, O, L).N), order: 'above' },

        /* e */ { name: 'e', color: '#81cadf', indexes: [5, 4, 6, 12], normal: normalize(Ne), order: 'first', intensityDiff: 20 },
        /* f */ { name: 'f', color: '#60bdd8', indexes: [7, 8, 11, 13], normal: normalize(Nf), order: 'first', intensityDiff: 20 },
        /* i */ { name: 'i', color: '#60bdd8', indexes: [5, 12, 10, 0], normal: normalize(Ni), order: 'first' },
        /* j */ { name: 'j', color: '#81cadf', indexes: [7, 13, 2, 1], normal: normalize(Nj), order: 'first' },

        /* a */ { name: 'a', color: '#94d1e3', indexes: [0, 1, 2, 3, 4, 5], normal: normalize(Na), order: 'first' },
        /* b */ { name: 'b', color: '#00a9ce', indexes: [8, 9, 10, 0, 1, 7], normal: normalize(Nb), order: 'first' },
    ];
    let L2 = vecDiff(A, B);
    let L2dot = vecDot(L2, normalize(planeFromPoints(I, J, L).N))
    let L1z = -90;
    let L2z = 0;
    let lights: Vec3D[] = [{
        x: -0.0721687836487024 * L1z - 24.5242428089142,
        y: -1.16666666666667 * L1z - 233.200365627558,
        z: L1z,
    }/*, {
        x: L2.x / L2dot * 129,
        y: L2.y / L2dot * 129,
        z: L2.z / L2dot * 129,
    }*/, {
        x: 0.0721687836487024 * L2z - 96.2379876950642,
        y: 1.16666666666667 * L2z + 125.759627022474,
        z: L2z
    }];
    console.log(lights);
    let geometry: Geometry = {
        vertices,
        vertexNames,
        faces,
        lights,
    };

    console.log(`Pa = [${normalize(Na).x}, ${normalize(Na).y}, ${normalize(Na).z}]`);
    console.log(`Pd = [${normalize(planeFromPoints(I, J, L).N).x}, ${normalize(planeFromPoints(I, J, L).N).y}, ${normalize(planeFromPoints(I, J, L).N).z}]`);
    console.log(`Pc = [${normalize(planeFromPoints(D, G, E).N).x}, ${normalize(planeFromPoints(D, G, E).N).y}, ${normalize(planeFromPoints(D, G, E).N).z}]`);
    console.log(`Pb = [${normalize(Nb).x}, ${normalize(Nb).y}, ${normalize(Nb).z}]`);

    return geometry;
}


let svg: SVGSVGElement = null as any;
let rotateX: number = 0;
let rotateY: number = 0;

function clean() {
    if (!svg) {
        svg = document.getElementById('logo') as unknown as SVGSVGElement;
        svg.style.userSelect = 'none';
        svg.onpointerdown = event => svg.setPointerCapture(event.pointerId)
        svg.onpointermove = event => {
            if (!svg.hasPointerCapture(event.pointerId)) return;
            rotateX += event.movementY / 200;
            rotateY += event.movementX / 200;
        }
    }
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
}

function rotatePoint(p: Vec3D, Oz: number, rotX: number, rotY: number) {
    return {
        x: Oz * Math.sin(rotY) + p.x * Math.cos(rotY) - p.z * Math.sin(rotY),
        y: -Oz * Math.sin(rotX) * Math.cos(rotY) + p.x * Math.sin(rotX) * Math.sin(rotY) + p.y * Math.cos(rotX) + p.z * Math.sin(rotX) * Math.cos(rotY),
        z: -Oz * Math.cos(rotX) * Math.cos(rotY) + Oz + p.x * Math.sin(rotY) * Math.cos(rotX) - p.y * Math.sin(rotX) + p.z * Math.cos(rotX) * Math.cos(rotY),
    };
}

function rotateVector(p: Vec3D, rotX: number, rotY: number) {
    return {
        x: p.x * Math.cos(rotY) - p.z * Math.sin(rotY),
        y: p.x * Math.sin(rotX) * Math.sin(rotY) + p.y * Math.cos(rotX) + p.z * Math.sin(rotX) * Math.cos(rotY),
        z: p.x * Math.sin(rotY) * Math.cos(rotX) - p.y * Math.sin(rotX) + p.z * Math.cos(rotX) * Math.cos(rotY),
    };
}

interface ColorTableEntry { i: number, r: number, g: number, b: number };

function intensityToColorInner(intensity: number, lower: ColorTableEntry, higher: ColorTableEntry): string {
    let div = higher.i - lower.i;
    let hp = (intensity - lower.i) / div;
    let lp = (higher.i - intensity) / div;
    let r = Math.round(Math.min(255, Math.max(0, lp * lower.r + hp * higher.r)));
    let g = Math.round(Math.min(255, Math.max(0, lp * lower.g + hp * higher.g)));
    let b = Math.round(Math.min(255, Math.max(0, lp * lower.b + hp * higher.b)));
    let c = r * 0x10000 + g * 0x100 + b;
    return '#' + c.toString(16).padStart(6, '0');
}

function intensityToColor(intensity: number): string {
    const colorTable = [
        { i: 42, r: 0, g: 169, b: 206 },
        { i: 96, r: 96, g: 189, b: 216 },
        { i: 129, r: 129, g: 202, b: 223 },
        { i: 148, r: 148, g: 209, b: 227 },
    ];
    if (intensity <= 96) {
        return intensityToColorInner(intensity, colorTable[0], colorTable[1]);
    } else if (intensity <= 129) {
        return intensityToColorInner(intensity, colorTable[1], colorTable[2]);
    } else {
        return intensityToColorInner(intensity, colorTable[2], colorTable[3]);
    }
}

function drawGeom(geometry: Geometry, z0: number, rotX: number, rotY: number) {
    //console.log(geometry);
    let vertices = geometry.vertices;
    let rotDepth = (3 * vertices.at(-2)!.z + 1 * vertices[0].z) / 4;
    let rs = 123143;
    let paths: [string, Face, Vec3D, number, number][] = [];
    let i = 0;
    let usedPoints = new Set<number>([15]);
    let baseDot = 1;
    for (let face of geometry.faces) {
        i++;
        let indexes = face.indexes;
        let N = face.normal;
        //let N = normalize(planeFromPoints(vertices[face.indexes[0]], vertices[face.indexes[1]], vertices[face.indexes[2]]).N);
        let str = 'M ';
        let avg = { x: 0, y: 0, z: 0 };
        for (let i of indexes) {
            let { x, y, z } = rotatePoint(vertices[i], rotDepth, rotX, rotY);
            let xx = z0 * x / z;
            let yy = z0 * y / z;
            str += ` ${400 + 400 * xx} ${400 - 400 * yy}`;
            avg.x += x / indexes.length;
            avg.y += y / indexes.length;
            avg.z += z / indexes.length;
        }

        let xx = z0 * avg.x / avg.z;
        let yy = z0 * avg.y / avg.z;
        let Nrot = rotateVector(N, rotX, rotY);
        let dot = vecDot(Nrot, normalize(avg));
        //if (face.name.startsWith('c')) console.log(N, N1, face.name, dot);
        if (dot > -0.0000001) continue;
        let nx = avg.x + Nrot.x / 5;
        let ny = avg.y + Nrot.y / 5;
        let nz = avg.z + Nrot.z / 5;
        let nxx = z0 * nx / nz;
        let nyy = z0 * ny / nz;
        str += ' Z';

        let intensity = 0;
        for (let light of geometry.lights) {
            let dot = vecDot(light, Nrot);
            intensity += Math.max(0, dot);
        }

        switch (face.order) {
            case 'first':
                paths.push([str, face, avg, -10000, intensity]);
                break;
            case 'base':
                paths.push([str, face, avg, 0, intensity]);
                baseDot = Math.sign(dot);
                break;
            case 'above':
                paths.push([str, face, avg, baseDot, intensity]);
                break;
            case 'below':
                paths.push([str, face, avg, -baseDot, intensity]);
                break;
        }

        face.indexes.forEach(i => usedPoints.add(i));

        /*var path = document.createElementNS(xmlns, "path");
        rs = (rs * 0x92178632 + 0x98498234) & 0xFFFFFFFF;
        let col = (rs & 0x7F7F7F) | 0x400000;
        path.setAttributeNS(null, 'style', `fill:${face.color};stroke:#00000077; stroke-width: 0.5px;stroke-linecap:round`);
        path.setAttributeNS(null, 'd', str);
        svg.appendChild(path);*/

        /*str = `M ${400 + 400 * xx} ${400 - 400 * yy} ${400 + 400 * nxx} ${400 - 400 * nyy}`;
        path = document.createElementNS(xmlns, "path");
        path.setAttributeNS(null, 'style', `fill:none;stroke:#00FFFF;stroke: width 0.1em;;stroke-linecap:round`);
        path.setAttributeNS(null, 'd', str);
        svg.appendChild(path);*/
        //console.log(path);
    }

    paths.sort((a, b) => b[3] - a[3]);

    for (let [str, face, avg, z, intensity] of paths) {
        let path = document.createElementNS(xmlns, "path");
        let color = face.color;
        //color = '#' + (Math.round(intensity) * 0x010101).toString(16).padStart(6, '0');
        if (dynamicColoring) {
            color = intensityToColor(intensity + (face.intensityDiff ?? 0));
        }
        path.setAttributeNS(null, 'style', `fill:${color};stroke:${color}; stroke-width: 1px;stroke-linecap:round; stroke-linejoin: round`);
        path.setAttributeNS(null, 'd', str);
        svg.appendChild(path);
    }

    if (0) {
        for (let i of usedPoints) {
            let point = vertices[i];
            let name = geometry.vertexNames[i];
            let { x, y, z } = rotatePoint(point, rotDepth, rotX, rotY);
            let xx = 400 + 400 * z0 * x / z - 5;
            let yy = 400 - 400 * z0 * y / z + 5;
            let text = document.createElementNS(xmlns, "text");
            text.setAttributeNS(null, 'x', xx.toString());
            text.setAttributeNS(null, 'y', yy.toString());
            text.innerHTML = name;
            svg.appendChild(text);
        }

        for (let [str, face, avg, z, intensity] of paths) {
            let text = document.createElementNS(xmlns, "text");
            let { x, y, z } = avg;
            let xx = 400 + 400 * z0 * x / z - 5;
            let yy = 400 - 400 * z0 * y / z + 5;
            text.setAttributeNS(null, 'x', xx.toString());
            text.setAttributeNS(null, 'y', yy.toString());
            text.innerHTML = `${face.name} (${Math.round(intensity)})`;
            svg.appendChild(text);
        }
    }

    /*let str = 'M ';
    for (let p of pt) {
        let [x, y] = points[p];
        str += ` ${50 + 50 * x} ${50 + 50 * -y}`;
    }
    str += ' Z';
    var path = document.createElementNS(xmlns, "path");
    path.setAttributeNS(null, 'style', "fill:none;fill-opacity:0.588121;stroke:#ff00c6;stroke: width 0.1em;;stroke-linecap:round");
    path.setAttributeNS(null, 'd', str);
    svg.appendChild(path);
    console.log(path);*/
}

//let rotationY = 0;
//let rotationX = 0;
let z0 = 3;
let z1 = 3.48;
let geom = calcGeometry(z0, z1);
let dynamicColoring = true;

let oldX = -1;
let oldY = -1;
let autoAnimate = true;

function update() {
    dynamicColoring = [...document.querySelectorAll('[id^=lighting-]')].find(x => (x as any).checked)?.getAttribute('value') === '1';
    let perspective = parseFloat([...document.querySelectorAll('[id^=perspective-]')].find(x => (x as any).checked)?.getAttribute('value') ?? '3');
    let depth = parseFloat([...document.querySelectorAll('[id^=depth-]')].find(x => (x as any).checked)?.getAttribute('value') ?? '0.48');
    z0 = perspective;
    z1 = perspective + depth;
    geom = calcGeometry(z0, z1);
    oldX = -1;
    animate();
}

function animate() {
    if (oldX === rotateX && oldY === rotateY) return;
    oldX = rotateX;
    oldY = rotateY;
    clean();
    drawGeom(geom, z0, rotateX, rotateY);
    if (autoAnimate) {
        rotateY += Math.PI / 100;
        if (rotateY > 2 * Math.PI) {
            rotateY = 2 * Math.PI
            autoAnimate = false;
        }
        rotateX = Math.sin(2 * rotateY) / 3;
    }
    /*if (rotationY > Math.PI) {
        rotationY -= 2 * Math.PI;
    }
    if (Math.abs(rotationY) < Math.PI / 50) {
        rotationY += Math.PI / 10000 + Math.abs(rotationY) / 100;
    } else {
        rotationY += Math.PI / 145;
    }
    rotationX += Math.PI / 300;*/
}

function home3d() {
    rotateX = 0;
    rotateY = 0;
    animate();
}

window.onload = function () {
    setInterval(() => animate(), 20);
}
