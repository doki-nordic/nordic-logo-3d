from sympy import *
from sympy.matrices import Matrix, dense
from types import SimpleNamespace
from sympy.solvers import solve

a, b = symbols('a b')

print(linsolve([
    a * 148 + b - 227,
    a * 129 + b - 223,
], [a, b]))


print(linsolve([
    a * 96 + b - 216,
    a * 129 + b - 223,
], [a, b]))

