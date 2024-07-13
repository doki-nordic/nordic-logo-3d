from sympy import *
from sympy.matrices import Matrix, dense
from types import SimpleNamespace
from sympy.solvers import solve

Vx, Vy, Vz = symbols('V.x V.y V.z')
Ax, Ay, Az = symbols('A.x A.y A.z')
Nx, Ny, Nz = symbols('N.x N.y N.z')

V = Matrix([Vx, Vy, Vz])
A = Matrix([Ax, Ay, Az])
N = Matrix([Nx, Ny, Nz])

x, y, z, t, D = symbols('x y z t D')
xyz = Matrix(['x', 'y', 'z'])

R = A + t * V - xyz

eq = [
        R[0],
        R[1],
        R[2],
        N.dot(xyz) + D,
    ]

pp = linsolve(eq,
    [x, y, z, t]
)
print(eq)
print(pp)
pp = list(pp)[0]
print('x:', simplify(pp[0]))
print('y:', simplify(pp[1]))
print('z:', simplify(pp[2]))
