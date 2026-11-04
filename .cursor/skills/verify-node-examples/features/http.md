# HTTP response and launch
## Sub-features
Port selection, invalid port handling, plain-text completed HTTP requests.
## How to get to it (user POV)
Run node http_server/server.js PORT, read its ready log, request its loopback URL. Zero requests an OS-assigned port; no argument uses8080, which may be occupied.
## Driving it with drive.py
doctor then drive. Assert invalid ports exit1 and three real requests complete with status200 and the greeting body. Helpers never drive a pre-existing8080 service.
## Gotchas
Old source used bitwise OR with8080 rather than a default and never ended the response. Both faults are fixed and exercised. Like the original, this sample binds the default host; use an isolated environment and never expose a verification port publicly. The helper requests loopback only. It returns the same greeting on every path.
