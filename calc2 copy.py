from sympy import *
from sympy.matrices import Matrix, dense
from types import SimpleNamespace
from sympy.solvers import solve

Oz, rotY, rotX = symbols('Oz rotY rotX')

tr1 = Matrix([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, -Oz],
    [0, 0, 0, 1],
])

matY = Matrix([
    [cos(rotY), 0, -sin(rotY), 0],
    [0,        1,         0, 0],
    [sin(rotY), 0,  cos(rotY), 0],
    [0,        0,         0, 1],
])

matX = Matrix([
    [1,          0,         0, 0],
    [0,  cos(rotX), sin(rotX), 0],
    [0, -sin(rotX), cos(rotX), 0],
    [0,          0,         0, 1],
])

M = tr1.inv() * matX * matY * tr1

print(M)

print((M * Matrix([0, 0, 5, 1])).subs({Oz: 5, rotX: 234, rotY: 11.23}))
print((M * Matrix([0, 0, 6, 1])).subs({Oz: 5, rotX: pi/2, rotY: 0}))
print((M * Matrix([0, 0, 6, 1])).subs({Oz: 5, rotX: 0, rotY: pi/2}))
print((M * Matrix([0, 0, 6, 1])).subs({Oz: 5, rotX: pi/2, rotY: pi/2}))
print((M * Matrix([0, 0, 6, 1])).subs({Oz: 5, rotX: 0, rotY: -pi/4}))

x, y, z = symbols('p.x p.y p.z')

print(simplify(M * Matrix([x, y, z, 1])))
print(simplify(M * Matrix([x, y, z, 0])))
