from sympy import *
from sympy.matrices import Matrix, dense
from types import SimpleNamespace
from sympy.solvers import solve

N1 = Matrix(['x1', 'y1', 'z1'])
N2 = Matrix(['x2', 'y2', 'z2'])
N3 = Matrix(['x3', 'y3', 'z3'])

x, y, z = symbols('x y z')
xyz = Matrix(['x', 'y', 'z'])
D1, D2, D3 = symbols('D1 D2 D3')

pp = linsolve([
        N1.dot(xyz) + D1,
        N2.dot(xyz) + D2,
        N3.dot(xyz) + D3,
    ],
    [x, y, z]
)
pp = list(pp)[0]
print('x', simplify(pp[0]))
print('y', simplify(pp[1]))
print('z', simplify(pp[2]))
