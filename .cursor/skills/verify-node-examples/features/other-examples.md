# Other protocol and database examples
## Sub-features
http2_server TLS, server_sent_events Express, websocket_server, tcp_udp_socket, postgres and HAProxy Docker sample.
## How to get to it (user POV)
Each subdirectory has its own source/package requirements. They are not routes of the verified HTTP sample.
## Driving it with drive.py
Not executed by this seed. Establish prerequisites, ports and side effects separately before adding real journeys. TLS sample expects private.pem/cert.pem and binds443. PostgreSQL requires a disposable DB, not the user's data. Docker requires a separate runtime.
## Gotchas
SSE source currently uses res.send then immediately recurses while evaluating setTimeout's argument, so streaming behavior is not accepted. WebSocket sample shares a global connection and recurring timer; no multi-client or disconnect proof. TCP source creates a server without listen; UDP binds8081. These source findings are not fixed or counted as passing. No provider/auth secrets are needed or read by the safe drive.
