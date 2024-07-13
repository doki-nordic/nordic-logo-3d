from sympy import *
from sympy.matrices import Matrix, dense
from types import SimpleNamespace
from sympy.solvers import solve
from random import randint

L1x, L1y, L1z = symbols('L1x L1y L1z')
L2x, L2y, L2z = symbols('L2x L2y L2z')
C1, C2, C3, C4 = symbols('C1 C2 C3 C4')
P1x, P1y, P1z = symbols('P1.x P1.y P1.z')
P2x, P2y, P2z = symbols('P2.x P2.y P2.z')
P3x, P3y, P3z = symbols('P3.x P3.y P3.z')
P4x, P4y, P4z = symbols('P4.x P4.y P4.z')

L1 = Matrix([L1x, L1y, L1z])
L2 = Matrix([L2x, L2y, L2z])
Pa = [-0.34543997399988563, -0.5983195859330738, -0.7229694996691309]
Pd = [-0.7055274054030921, 0.48585912416365196, -0.5159185901788284]
Pc = [0.7055274054030921, -0.485859124163652, -0.5159185901788284]
Pb = [0.34543997399988563, 0.5983195859330738, -0.7229694996691309]
Ca = 148
Cd = 129
Cc = 96
Cb = 42

E = [
	L1.dot(Pa) - Ca,
	L1.dot(Pc) - Cc,
    #L1.dot(Pd) - Cd,
]

pp = linsolve(
    E,
	[L1x, L1y]
)

L1s = Matrix([list(pp)[0][0], list(pp)[0][1], L1z])
print(L1s)
print(L1s.dot(Pa))
print(L1s.dot(Pd))
print(L1s.dot(Pc))
print(L1s.dot(Pb))

E = [
	L1.dot(Pb) - Cb,
	L1.dot(Pd) - Cd,
]

pp = linsolve(
    E,
	[L1x, L1y]
)

L1s = Matrix([list(pp)[0][0], list(pp)[0][1], L1z])
print(L1s)
print(L1s.dot(Pa))
print(L1s.dot(Pd))
print(L1s.dot(Pc))
print(L1s.dot(Pb))
