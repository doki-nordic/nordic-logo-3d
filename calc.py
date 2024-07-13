from sympy import *
from sympy.matrices import Matrix, dense
from types import SimpleNamespace
from sympy.solvers import solve

def point_from_plane(pt, N, D):
    pp = solve([
            N.dot(xyz) + D,
            Eq(z0 * x / z, pt[0]),
            Eq(z0 * y / z, pt[1]),
        ],
        [x, y, z]
    )
    return Matrix([pp[x], pp[y], pp[z]])


def plane_from_points(A, B, C):
    N = (A - B).cross(A - C)
    D = -N.dot(A)
    return (simplify(N), simplify(D))

def opposite(p):
    return Matrix([-p[0], -p[1], p[2]])

def assert_zero(x):
    if (isinstance(x, Matrix)):
        x = x.transpose() * Matrix([1, 1, 1])
        x = x[0]
    s = 0
    for i in [(1,2), (1, 1.1), (10, 16), (0.1, 1)]:
        s += simplify(abs(x)).subs({'z0': i[0], 'z1': i[1]}).evalf()
    if s >= 1e-12:
        print(s)
        assert s < 1e-12

sqrt3 = sqrt(3)

points = SimpleNamespace(
	A=Matrix([-sqrt3 / 4, 1 / 4]),
	B=Matrix([sqrt3 / 4, -1 / 4]),
	C=Matrix([sqrt3 / 8, - 1 / 4 - 1 / 8]),
	D=Matrix([-sqrt3 / 8, -1 / 8]),
	E=Matrix([-sqrt3 / 8, -1 / 4 - 1 / 8]),
	F=Matrix([-sqrt3 / 4, -1 / 4]),
	G=Matrix([0, -1 / 4]),
	O=Matrix([0, 0]),
)
points.H = -points.F
points.I = -points.E
points.J = -points.D
points.K = -points.C
points.L = -points.G


z0, z1 = symbols('z0 z1')
x, y, z = symbols('x y z')
xyz = Matrix(['x', 'y', 'z'])
A = Matrix([-sqrt3 / 4, 1/4, z0])
B = Matrix([sqrt3 / 4, -1/4, z0])
F = Matrix([-sqrt3 / 4 * z1 / z0, -1 / 4 * z1 /z0, z1])


def aaa():
    Px, Py = symbols('P.x P.y')
    Nx, Ny, Nz = symbols('N.x N.y N.z')
    D = symbols('D')
    P = Matrix([Px, Py])
    N = Matrix([Nx, Ny, Nz])
    R = simplify(point_from_plane(P, N, D))
    print(f'x: {R[0]},')
    print(f'y: {R[1]},')
    print(f'z: {R[2]},')

def aaa1():
    Ax, Ay, Az = symbols('A.x A.y A.z')
    Bx, By, Bz = symbols('B.x B.y B.z')
    Cx, Cy, Cz = symbols('C.x C.y C.z')
    A = Matrix([Ax, Ay, Az])
    B = Matrix([Bx, By, Bz])
    C = Matrix([Cx, Cy, Cz])
    N, D = plane_from_points(A, B, C)
    print(f'x: {N[0]},')
    print(f'y: {N[1]},')
    print(f'z: {N[2]},')
    print(f'D = {D};')

#aaa(); exit()

Na, Da = plane_from_points(A, B, F)

C = point_from_plane(points.C, Na, Da)
D = point_from_plane(points.D, Na, Da)
E = point_from_plane(points.E, Na, Da)
H = opposite(F)
I = opposite(E)
J = opposite(D)
K = opposite(C)

Nb, Db = plane_from_points(B, A, H)
Ne = -Nb
De = -Ne.dot(F)

G = point_from_plane(points.G, Ne, De)
L = opposite(G)
Ng, Dg = plane_from_points(K, G, J)
O = point_from_plane(points.O, Ng, Dg)

Nh, Dh = plane_from_points(C, L, D)
Ni, Di = plane_from_points(A, K, F)

def point_from_planes(N1, D1, N2, D2, N3, D3):
    x1, y1, z1 = N1
    x2, y2, z2 = N2
    x3, y3, z3 = N3
    x = (-D1*y2*z3 + D1*y3*z2 + D2*y1*z3 - D2*y3*z1 - D3*y1*z2 + D3*y2*z1)/(x1*y2*z3 - x1*y3*z2 - x2*y1*z3 + x2*y3*z1 + x3*y1*z2 - x3*y2*z1)
    y = (D1*x2*z3 - D1*x3*z2 - D2*x1*z3 + D2*x3*z1 + D3*x1*z2 - D3*x2*z1)/(x1*y2*z3 - x1*y3*z2 - x2*y1*z3 + x2*y3*z1 + x3*y1*z2 - x3*y2*z1)
    z = (-D1*x2*y3 + D1*x3*y2 + D2*x1*y3 - D2*x3*y1 - D3*x1*y2 + D3*x2*y1)/(x1*y2*z3 - x1*y3*z2 - x2*y1*z3 + x2*y3*z1 + x3*y1*z2 - x3*y2*z1)
    return Matrix([simplify(x), simplify(y), simplify(z)])

M = point_from_planes(Ne, De, Ni, Di, Ng, Dg)
N = opposite(M)

def print_point(p, l):
    print(l + 'x =', simplify(p[0]))
    print(l + 'y =', simplify(p[1]))
    print(l + 'z =', simplify(p[2]))

def print_num(p, l):
    print(l + '=', simplify(p))

print_point(A, 'A')
print_point(B, 'B')
print_point(C, 'C')
print_point(D, 'D')
print_point(E, 'E')
print_point(F, 'F')
print_point(G, 'G')
print_point(H, 'H')
print_point(I, 'I')
print_point(J, 'J')
print_point(K, 'K')
print_point(L, 'L')
print_point(Ne, 'Ne')
print_num(De, 'De')
print_point(Ni, 'Ni')
print_num(Di, 'Di')
print_point(Ng, 'Ng')
print_num(Dg, 'Dg')

assert_zero(O - point_from_plane(points.O, Nh, Dh))

assert_zero(Ne.dot(M) + De)
assert_zero(Ni.dot(M) + Di)
assert_zero(Ng.dot(M) + Dg)

assert_zero(Ne.dot(G) + De)
assert_zero(Ne.dot(E) + De)
assert_zero(Ne.dot(F) + De)



#print(F)
#print(dense.matrix_multiply_elementwise(F, Matrix([-1,-1,0])))
#print(E)

# solve(
#     Na.dot(Matrix(['x', 'y', 'z'])) + Da,
#     points.E[0] - z0 * x / z,
#     points.E[1] - z0 * y / z,
#     'x', 'y', 'z',
#     )

# 	let unknowns = args.filter(x => !x.match(/=/));
# 	let equations = args.filter(x => x.match(/=/));
# 	let text = `solve ${equations.join(', ')} for ${unknowns.join(', ')}`;
# 	console.log(text);
# }


