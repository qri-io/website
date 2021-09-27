---
metaTitle: "math"
metaDescription: "math defines a Starlark module of mathematical functions. All functions accept both int and float values as arguments."
weight: 2
---

math defines a Starlark module of mathematical functions. All functions accept both int and float values as arguments.

## Functions



### acos

```
acos(x)
```

Return the arc cosine of x, in radians.


### acosh

```
acosh(x)
```

Return the inverse hyperbolic cosine of x.


### asin

```
asin(x)
```

Return the arc sine of x, in radians.


### asinh

```
asinh(x)
```

Return the inverse hyperbolic sine of x.


### atan

```
atan(x)
```

Return the arc tangent of x, in radians.


### atan2

```
atan2(y, x)
```

Return atan(y / x), in radians. The result is between -pi and pi. The vector in the plane from the origin to point (x, y) makes this angle with the positive X axis. The point of atan2() is that the signs of both inputs are known to it, so it can compute the correct quadrant for the angle. For example, atan(1) and atan2(1, 1) are both pi/4, but atan2(-1, -1) is -3*pi/4.


### atanh

```
atanh(x)
```

Return the inverse hyperbolic tangent of x.


### ceil

```
ceil(x)
```

Return the ceiling of x, the smallest integer greater than or equal to x.


### copysign

```
copysign(x,y)
```

Returns a value with the magnitude of x and the sign of y.


### cos

```
cos(x)
```

Return the cosine of x radians.


### cosh

```
cosh(x)
```

Return the hyperbolic cosine of x.


### degrees

```
degrees(x)
```

Convert angle x from radians to degrees.


### exp

```
exp(x)
```

Returns e raised to the power x, where e = 2.718281… is the base of natural logarithms.


### fabs

```
fabs(x)
```

Return the absolute value of x.


### floor

```
floor(x)
```

Return the floor of x, the largest integer less than or equal to x.


### gamma

```
gamma(x)
```

Returns the Gamma function of x.


### hypot

```
hypot(x, y)
```

Return the Euclidean norm, sqrt(x*x + y*y). This is the length of the vector from the origin to point (x, y).


### log

```
log(x, base)
```

Returns the logarithm of x in the given base, or natural logarithm by default.


### mod

```
mod(x, y)
```

Returns the floating-point remainder of x/y. The magnitude of the result is less than y and its sign agrees with that of x.


### pow

```
pow(x, y)
```

Returns x**y, the base-x exponential of y.


### radians

```
radians(x)
```

Convert angle x from degrees to radians.


### remainder

```
remainder(x, y)
```

Returns the IEEE 754 floating-point remainder of x/y.


### round

```
round(x)
```

Returns the nearest integer, rounding half away from zero.


### sin

```
sin(x)
```

Return the sine of x radians.


### sinh

```
sinh(x)
```

Return the hyperbolic sine of x.


### sqrt

```
sqrt(x)
```

Return the square root of x.


### tan

```
tan(x)
```

Return the tangent of x radians.


### tanh

```
tanh(x)
```

Return the hyperbolic tangent of x.


