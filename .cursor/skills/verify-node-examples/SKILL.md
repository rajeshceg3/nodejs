---
name: verify-node-examples
description: Verify the actual isolated HTTP sample in nodejs and record boundaries before changes to its networking examples.
---
# Verify Node examples
## Surface and isolation
Repository contains separate HTTP, TLSHTTP2, SSE, WebSocket, PostgreSQL and TCP/UDP examples, not a single root app. This seed drives the dependency-free HTTP sample only. Never run root npm test as behavioral proof: it is an explicit placeholder failure.
## Launch
Node18+ and Python3. Run `python3 .cursor/skills/verify-node-examples/helpers/drive.py doctor --out .verification-evidence/doctor` from repo root. Then drive starts `node http_server/server.js 0` on its own OS-assigned port, using the ready log's actual address. No dependency installation is needed for this sample.
## Doctor
Checks node version, syntax and expected source identity without opening a port. Run again after a surprising failure before retrying.
## Drive
`python3 .cursor/skills/verify-node-examples/helpers/drive.py drive --out .verification-evidence/run`
Tests three invalid ports fail clearly. Launches the real sample, checks three HTTP requests complete with status200, text/plain and exact greeting. Uses its own ephemeral port, never an assumed shared8080 instance.
## Evidence
doctor.json/drive.json retain action arguments, response bodies/status, selected port, failures and process cleanup. Timeout or mismatch exits nonzero. No mocks or internal application setters used.
## Cleanup
Terminates and reaps only the exact child it started, even after request failure. No evidence deleted, no database touched. No concurrent drive against shared instances.
## Helpers
Executable helpers/drive.py provides doctor and drive. Feature maps in features/README.md distinguish tested HTTP from remaining examples. Maintain map and real journeys when source changes.
