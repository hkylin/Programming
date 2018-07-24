---
title: Test
layout: Template\default.jade
---
 
# This is a test (h1)
 
## This is H2
 
## Code
 
```powershell
Write-Host 'Hello World!'
 
Get-Service | Where-Object {$_.Name -eq 'Test'}
```
 
## Table
 
| Name  | Age | Number | Email          | Comments |
|-------|-----|--------|----------------|----------|
| Peter | 45  | 892394 | test@mail.com  | Good guy |
| Eva   | 36  | 347832 | test2@mail.com | Good gal |

``` python 
# [ ] review and run example
mixed_types = [1, "cat"]
# append number
mixed_types.append(3)
print("mixed_types list: ", mixed_types)

# append string
mixed_types.append("turtle")
print("mixed_types list: ", mixed_types)
```
``` powershell
# [ ] review and run example
[System.Collections.ArrayList]$mixed_types = (1, "cat")
# append number
$mixed_types.add(3)
"mixed_types list: $mixed_types"
# append string
$mixed_types.add("turtle")
"mixed_types list: $mixed_types"
```

# test file 12