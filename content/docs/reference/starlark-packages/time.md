---
metaTitle: "time"
metaDescription: "time is a Starlark module of time-related functions and constants."
weight: 2
---

time is a Starlark module of time-related functions and constants.

## Functions



### from_timestamp

```
from_timestamp(sec, nsec) Time
```

Converts the given Unix time corresponding to the number of seconds
and (optionally) nanoseconds since January 1, 1970 UTC into an object
of type Time.


### is_valid_timezone

```
is_valid_timezone(loc) boolean
```

Reports whether loc is a valid time zone name.


### now

```
now() time
```

Returns the current local time


### parse_duration

```
parse_duration(d) Duration
```

Parses the given duration string. A duration string is a possibly signed
sequence of decimal numbers, each with optional fraction and a unit
suffix, such as "300ms", "-1.5h" or "2h45m". Valid time units are "ns",
"us" (or "µs"), "ms", "s", "m", "h".


### parseTime

```
parseTime(x, format, location) Time
```

Parses the given time string using a specific time format and location.
The expected arguments are a time string (mandatory), a time format
(optional, set to RFC3339 by default, e.g. "2021-03-22T23:20:50.52Z")
and a name of location (optional, set to UTC by default). For more
details, refer to https://pkg.go.dev/time#Parse and
https://pkg.go.dev/time#ParseInLocation.


### time

```
time(year?, month?, day?, hour?, minute?, second?, nanosecond?, location?) Time
```

Returns the Time corresponding to yyyy-mm-dd hh:mm:ss + nsec nanoseconds
in the appropriate zone for that time in the given location. All
parameters are optional.



## Types

### Duration



**Fields**

| name | type | description |
|------|------|-------------|
| hours | float |  |
| minutes | float |  |
| seconds | float |  |
| milliseconds | int |  |
| microseconds | int |  |
| nanoseconds | int |  |
### Time

Time represents an instant in time with nanosecond precision. Each Time
has associated with it a Location, consulted when computing the
presentation form of the time, such as in the Format, Hour, and Year
methods.

**Fields**

| name | type | description |
|------|------|-------------|
| year | int |  |
| month | int |  |
| day | int |  |
| hour | int |  |
| minute | int |  |
| second | int |  |
| nanosecond | int |  |
| unix | int |  |
| unix_nano | int |  |


**Methods**

#### in_location

```
in_location(locstr) Time
```

get time representing the same instant but in a different location


#### format

```
format() string
```

textual representation of time formatted according to the provided
layout string: 01/02 03:04:05PM '06 -0700 (January 2, 15:04:05, 2006,
in time zone seven hours west of GMT)
##### examples:
**ISO timestamp**

construct an ISO tiemstamp using the template string

```
load("time.star", "time")
# create a time object: January 1st 2021 at midnight
timestamp = time.time(year=2021)
# use layout string to construct an RFC3339 timestamp string,
# which is what JSON serializers often use
formatted = timestamp.format("2006-01-02T15:04:05Z07:00")
print(timestamp)
# Output: 2020-11-30 00:00:00 +0000 UTC
```




**Operators**

| operator | description |
|----------|-------------|
| time + duration = time |  |
| time - duration = time |  |
| time - time = duration |  |



