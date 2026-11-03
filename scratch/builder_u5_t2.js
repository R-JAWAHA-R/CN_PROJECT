// Topic 2: HTTP (Hypertext Transfer Protocol)
module.exports = {
  "http-intro": {
    "id": "http-intro",
    "title": "Introduction to HTTP",
    "unit": "Unit 5 – Application Layer",
    "unitId": "unit5",
    "level": "Level 1 — Core Web Protocol",
    "category": "application",
    "difficulty": "Core",
    "readingTime": "20 min read",
    "standard": "RFC 1945 / RFC 2616 / RFC 7230 / RFC 9110 / Forouzan Ch. 27",
    "oneLiner": "Application-level request-response protocol providing the foundation for distributed, collaborative hypermedia data communication on the Web.",
    "quickAnswer": "The Hypertext Transfer Protocol (HTTP) is an application-layer standard that defines how web clients (browsers) request documents and how web servers deliver them. It operates in a request-response cycle on TCP port 80 (HTTP) or TCP port 443 (HTTPS), functioning as a stateless, text-based, extensible protocol.",
    "whyItMatters": "HTTP is the universal lingua franca of the Internet. Every webpage access, RESTful API call, mobile application backend sync, and cloud microservice communication is conducted over HTTP/HTTPS.",
    "infobox": {
      "layer": "Application Layer (OSI Layer 7 / TCP-IP Layer 4)",
      "standard": "IETF RFC 9110 (HTTP Semantics), RFC 9112 (HTTP/1.1)",
      "type": "Client-Server Request-Response Protocol",
      "prerequisites": ["tcp", "dns"],
      "relatedConcepts": ["www", "http-architecture", "http-request-response", "http-working"],
      "compareWith": ["www"],
      "primaryUses": [
        "Web page fetching (HTML, CSS, JavaScript, WebAssembly)",
        "RESTful API communication for web and mobile apps",
        "Multimedia asset streaming via HTTP chunking and range requests",
        "Microservices inter-process communication in cloud data centers"
      ],
      "standardRfc": "RFC 9110 (HTTP Semantics), RFC 7230"
    },
    "learningObjectives": [
      "Define HTTP and outline its historical timeline from HTTP/0.9 to HTTP/3",
      "Explain the fundamental design characteristics of HTTP: Statelessness, Client-Server, Media Independence, Extensibility",
      "Explain why HTTP was originally built on TCP rather than UDP",
      "Distinguish between Application Program (Browser) and Application Protocol (HTTP specification)",
      "Analyze the role of Uniform Resource Identifiers (URIs) in HTTP resource retrieval"
    ],
    "prerequisitesList": [
      {
        "concept": "Client-Server Paradigm",
        "meaning": "Understanding client request and server response roles over network connections"
      },
      {
        "concept": "TCP Port Numbers",
        "meaning": "Knowing well-known Port 80 for HTTP and Port 443 for HTTPS"
      }
    ],
    "imageUrl": "assets/images/unit5/topic2/http-protocol-architecture.svg",
    "imageCaption": "Figure 5.4: HTTP Protocol Position in Network Protocol Suite and Multi-Version Evolution",
    "sections": {
      "overview": `
        <p class="mb-3">
          <strong>Hypertext Transfer Protocol (HTTP)</strong> is the protocol used mainly to access data on the World Wide Web. The protocol transfers data in the form of plain text, hypertext, audio, video, and binary blobs. However, it is called the <em>hypertext</em> transfer protocol because its efficiency allows its use in a hypertext environment where there are rapid jumps from one document to another (Forouzan Section 27.3).
        </p>
        <p class="mb-3">
          HTTP functions as a <strong>request-response protocol</strong> in the client-server computing model. A web browser may be the <em>client</em>, and an application running on a computer hosting a website may be the <em>server</em>. The client submits an HTTP request message to the server; the server, which provides resources such as HTML files and other content, returns a response message to the client.
        </p>
      `,
      "howItWorks": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. Fundamental Architectural Principles</h3>
        <ul class="list-disc pl-5 space-y-1.5 text-xs mb-4">
          <li><strong>Stateless Protocol:</strong> An HTTP server does not maintain information about client requests across transactions. If a client sends two requests for the same page within milliseconds, the server treats each request as completely independent. Statefulness is achieved using external mechanisms like <strong>HTTP Cookies</strong> and session tokens.</li>
          <li><strong>Connection-Oriented Transport:</strong> Although HTTP itself is stateless, it relies on a connection-oriented transport protocol (TCP) to guarantee reliable, ordered byte delivery. (HTTP/3 evolves this by running over QUIC/UDP, but retains reliable stream semantics).</li>
          <li><strong>Media Independent:</strong> Any type of data can be sent by HTTP as long as both client and server specify how to handle the data format using standard <strong>MIME types</strong> in the <code>Content-Type</code> header.</li>
          <li><strong>Extensible:</strong> New headers, methods, and capabilities can be introduced without breaking existing servers or clients.</li>
        </ul>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. Major Version Chronology</h3>
        <div class="space-y-2 text-xs mb-4">
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border-l-4 border-slate-400">
            <strong>HTTP/0.9 (1991):</strong> The "One-line" protocol. Simple <code>GET /path</code> command. No headers, no status codes, only raw HTML output. Closed connection immediately.
          </div>
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border-l-4 border-blue-400">
            <strong>HTTP/1.0 (1996, RFC 1945):</strong> Added HTTP headers, status codes, POST/HEAD methods, Content-Type MIME handling. Non-persistent: opened a new TCP connection for every single inline web resource.
          </div>
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border-l-4 border-emerald-400">
            <strong>HTTP/1.1 (1999, RFC 2616 / 7230):</strong> The modern workhorse. Introduced default persistent connections (<code>Connection: keep-alive</code>), pipelining, chunked transfer encoding, virtual hosting (mandatory <code>Host:</code> header), and advanced caching controls.
          </div>
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border-l-4 border-amber-400">
            <strong>HTTP/2 (2015, RFC 7540):</strong> Replaced ASCII text streams with a binary framing layer. Enabled multiplexing multiple concurrent streams over a single TCP socket, HPACK header compression, and server push.
          </div>
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border-l-4 border-purple-400">
            <strong>HTTP/3 (2022, RFC 9114):</strong> Shifted underlying transport from TCP to <strong>QUIC (over UDP)</strong>. Eliminates TCP Head-of-Line packet loss blocking, integrates TLS 1.3 natively, and supports 0-RTT connection migration between Wi-Fi and 5G.
          </div>
        </div>
      `,
      "technicalDetails": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. HTTP vs Underlying Transport Protocols</h3>
        <table class="wiki-table w-full text-xs mb-4">
          <thead>
            <tr class="bg-amber-50 dark:bg-gray-800">
              <th>Dimension</th>
              <th>HTTP/1.1</th>
              <th>HTTP/2</th>
              <th>HTTP/3</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="font-bold">Transport Layer</td><td>TCP (Port 80 / 443)</td><td>TCP (Port 443)</td><td>QUIC over UDP (Port 443)</td></tr>
            <tr><td class="font-bold">Message Format</td><td>Plain Text ASCII</td><td>Binary Framing</td><td>Binary QPACK / QUIC Frames</td></tr>
            <tr><td class="font-bold">Multiplexing</td><td>No (Pipelining FIFO only)</td><td>Yes (Interleaved streams)</td><td>Yes (Independent QUIC streams)</td></tr>
            <tr><td class="font-bold">Head-of-Line Blocking</td><td>Yes (At application level)</td><td>Eliminated at app level (retains TCP HoL)</td><td>Completely eliminated at all levels</td></tr>
            <tr><td class="font-bold">Header Compression</td><td>None (Cleartext overhead)</td><td>HPACK (Static/Dynamic tables)</td><td>QPACK (Out-of-order decompression)</td></tr>
            <tr><td class="font-bold">Handshake Overhead</td><td>TCP 1-RTT + TLS 1-2 RTT</td><td>TCP 1-RTT + TLS 1.3 1-RTT</td><td>0-RTT / 1-RTT combined QUIC+TLS</td></tr>
          </tbody>
        </table>
      `,
      "workedExamples": {
        "level1": `
          <strong>Examining Raw HTTP Transaction over Telnet:</strong><br/>
          You can test raw HTTP manually using standard telnet or netcat:<br/>
          <pre class="bg-slate-900 text-green-400 p-2 rounded text-[11px] font-mono mt-1">$ telnet example.com 80
Trying 93.184.216.34...
Connected to example.com.
GET / HTTP/1.1
Host: example.com

HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 1256
...</pre>
        `,
        "level2": `
          <strong>Why HTTP Statelessness Simplifies Scaling:</strong><br/>
          Because the server retains no conversational memory between requests:<br/>
          • Any request from the client can be routed to ANY web node in a 1,000-server cluster!<br/>
          • If server #12 crashes, the client's next request goes to server #13 without session data loss, provided authentication tokens (JWTs) or shared Redis caches are used.<br/>
          • Dramatically simplifies horizontal auto-scaling in cloud environments.
        `,
        "level3": `
          <strong>Comparing Non-Persistent vs Persistent Latency:</strong><br/>
          Assume RTT = 50ms between client and server. A page contains an HTML file and 4 images.<br/>
          • <strong>HTTP/1.0 (Non-Persistent):</strong> 5 objects × 2 RTT (Handshake + Request) = 10 RTT = 500ms.<br/>
          • <strong>HTTP/1.1 (Persistent):</strong> 1 Handshake (1 RTT) + 1 HTML (1 RTT) + 4 pipelined images (1 RTT) = 3 RTT = 150ms.<br/>
          <em>Result:</em> Persistent HTTP is over 3.3× faster on network latency alone!
        `
      },
      "advantagesLimitations": `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Key Strengths</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Statelessness enables effortless server load balancing and fault tolerance.</li>
              <li>Human-readable ASCII headers simplify protocol debugging and testing.</li>
              <li>Universal firewall traversal: Port 80 and 443 are open across almost all networks.</li>
              <li>Extensible header architecture allows transparent caching and compression.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Protocol Bottlenecks</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Header repetition overhead: Plaintext headers re-sent on every request.</li>
              <li>Head-of-Line blocking in HTTP/1.1 restricts parallel throughput.</li>
              <li>Unencrypted HTTP allows eavesdropping and session hijacking (resolved by HTTPS).</li>
            </ul>
          </div>
        </div>
      `,
      "whereUsed": [
        "Web Browsers: Chrome, Firefox, Safari, Edge fetching web pages",
        "Mobile App Backends: JSON REST APIs and GraphQL over HTTPS",
        "Microservices Architecture: Inter-service communication via gRPC / REST",
        "IoT Devices: Communicating sensor telemetry to cloud REST gateways",
        "Enterprise Portals: Intranet web portals and administrative dashboards"
      ],
      "commonMistakes": `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing HTTP with HTML:</strong> HTML is the markup language used to structure documents; HTTP is the transmission protocol used to transport those documents across the network.</li>
          <li><strong>Thinking HTTP is encrypted by default:</strong> Base HTTP is completely unencrypted cleartext. Encryption requires layering over TLS to become HTTPS (Port 443).</li>
          <li><strong>Believing HTTP/1.1 creates a new TCP connection for every image:</strong> HTTP/1.1 uses persistent connections by default, reusing the same socket for multiple requests.</li>
        </ul>
      `,
      "quiz": [
        {
          "question": "What does it mean when HTTP is characterized as a 'stateless' protocol?",
          "options": [
            "The protocol does not support encryption",
            "The server retains no session state about client requests from one transaction to the next",
            "The client and server cannot run in different geographical states",
            "Data cannot be stored in databases"
          ],
          "answer": 1,
          "explanation": "HTTP is stateless because the server maintains no memory of past requests. Each request-response transaction is handled completely independently."
        },
        {
          "question": "Which major innovation was introduced in HTTP/2 to overcome the Head-of-Line blocking problem of HTTP/1.1?",
          "options": [
            "Binary framing and stream multiplexing over a single TCP socket",
            "Replacing TCP with UDP",
            "Removing all status codes",
            "Forbidding the use of images on webpages"
          ],
          "answer": 0,
          "explanation": "HTTP/2 introduces a binary framing layer that splits messages into independent, tagged frames, multiplexing multiple concurrent request-response streams over one TCP connection."
        },
        {
          "question": "On which underlying transport layer protocol does modern HTTP/3 operate?",
          "options": ["TCP", "QUIC over UDP", "SCTP", "ICMP"],
          "answer": 1,
          "explanation": "HTTP/3 replaces TCP with QUIC (Quick UDP Internet Connections), running directly over UDP on Port 443 to eliminate TCP-level head-of-line blocking."
        }
      ],
      "references": [
        { "cite": "RFC 9110: HTTP Semantics (IETF Standard)", "url": "https://datatracker.ietf.org/doc/html/rfc9110" },
        { "cite": "RFC 7230: Hypertext Transfer Protocol (HTTP/1.1): Message Syntax and Routing", "url": "https://datatracker.ietf.org/doc/html/rfc7230" },
        { "cite": "B.A. Forouzan, Data Communications and Networking, Chapter 27: WWW and HTTP", "url": "" }
      ]
    },
    "prevTopicId": "www",
    "nextTopicId": "http-architecture"
  },

  "http-architecture": {
    "id": "http-architecture",
    "title": "HTTP Architecture",
    "unit": "Unit 5 – Application Layer",
    "unitId": "unit5",
    "level": "Level 2 — Architectural Protocol Design",
    "category": "application",
    "difficulty": "Core",
    "readingTime": "25 min read",
    "standard": "RFC 9110 / RFC 8446 (TLS 1.3) / Forouzan Chapter 27.1 / Kurose Ch. 2.2",
    "oneLiner": "Architectural layering of HTTP over transport sockets, TLS cryptographic encapsulation, and proxy intermediaries.",
    "quickAnswer": "HTTP Architecture describes the structural organization of web communications across the TCP/IP stack. It encompasses the end-to-end client-server model, intermediate proxies, gateway load balancers, virtual hosting mechanisms via the mandatory Host header, and cryptographic encapsulation within TLS (HTTPS) on port 443.",
    "whyItMatters": "Understanding HTTP architecture enables engineers to design highly scalable, secure, and resilient web distributed systems capable of handling millions of concurrent users while defending against eavesdropping and tampering.",
    "infobox": {
      "layer": "Application Layer (OSI Layer 7)",
      "standard": "RFC 9110 / RFC 8446",
      "type": "Layered Distributed Architecture",
      "prerequisites": ["http-intro", "tcp"],
      "relatedConcepts": ["http-request-response", "http-working", "web-proxies"],
      "compareWith": ["http-working"],
      "primaryUses": [
        "End-to-end client-proxy-server routing",
        "HTTPS cryptographic channel encapsulation (TLS 1.3)",
        "Name-based Virtual Hosting via Host header",
        "Layered intermediary caching and content acceleration"
      ],
      "standardRfc": "RFC 9110, RFC 8446 (TLS 1.3)"
    },
    "learningObjectives": [
      "Describe the position of HTTP in the TCP/IP and OSI reference models",
      "Explain how HTTPS layers HTTP over TLS to provide confidentiality, integrity, and server authentication",
      "Analyze the role of the mandatory Host: header in Name-Based Virtual Hosting",
      "Identify the functions of HTTP intermediaries: Proxies, Gateways (Reverse Proxies), and Tunnels",
      "Examine HTTP socket binding and connection multiplexing across client operating systems"
    ],
    "prerequisitesList": [
      {
        "concept": "OSI Reference Model",
        "meaning": "Understanding layer encapsulation from Application down to Physical"
      },
      {
        "concept": "TLS/SSL Basics",
        "meaning": "Familiarity with public key cryptography and session key encryption"
      }
    ],
    "imageUrl": "assets/images/unit5/topic2/http-protocol-architecture.svg",
    "imageCaption": "Figure 5.5: HTTP Architectural Layering, TLS 1.3 Secure Channel, and Intermediary Chain",
    "sections": {
      "overview": `
        <p class="mb-3">
          The architecture of HTTP is inherently <strong>layered and modular</strong>. Although a user interacts directly with a browser communicating with a website, the actual communication chain often spans multiple architectural intermediaries:
        </p>
        <div class="p-3 bg-slate-900 text-sky-300 rounded-lg text-xs font-mono mb-3 text-center">
          User Agent (Browser) ⇄ Forward Proxy ⇄ Internet Router ⇄ Reverse Proxy / CDN ⇄ Origin Web Server
        </div>
        <p class="mb-3">
          Each intermediary performs specific architectural tasks: forward proxies enforce corporate security and caching; reverse proxies terminate SSL connections and balance server load; the origin server executes business logic and accesses backend databases.
        </p>
      `,
      "howItWorks": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. Secure HTTP (HTTPS) Architecture</h3>
        <p class="mb-3 text-xs leading-relaxed">
          Standard HTTP transmits all requests and responses in cleartext ASCII. Any adversary on the same local network or ISP tap can inspect sensitive passwords, session cookies, and credit card numbers.
        </p>
        <p class="mb-3 text-xs leading-relaxed">
          <strong>HTTPS (HTTP Secure, RFC 2818)</strong> resolves this by inserting a cryptographic sublayer—<strong>Transport Layer Security (TLS)</strong>—between the Application Layer and the Transport Layer:
        </p>
        <div class="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-800 text-xs mb-4">
          <div class="font-bold text-purple-900 dark:text-purple-300 mb-1">The 3 Pillars of HTTPS:</div>
          <ol class="list-decimal pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Confidentiality:</strong> Symmetric session encryption (AES-256-GCM / ChaCha20-Poly1305) ensures eavesdroppers see only scrambled ciphertext.</li>
            <li><strong>Integrity:</strong> Cryptographic message authentication codes (AEAD) prevent in-transit tampering or injection of malicious scripts.</li>
            <li><strong>Authentication:</strong> The server presents an X.509 digital certificate signed by a trusted Certificate Authority (CA), verifying to the client that it is communicating with the legitimate domain.</li>
          </ol>
        </div>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. Name-Based Virtual Hosting</h3>
        <p class="mb-3 text-xs leading-relaxed">
          In IPv4, public IP addresses are scarce and expensive. Web hosting providers host hundreds of completely independent websites on a single physical server possessing a single IP address:
        </p>
        <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono space-y-1 mb-4">
          <div>IP Address: <code>203.0.113.50</code> hosts:</div>
          <div>• <code>siteA.com</code> (Apache DocumentRoot /var/www/siteA)</div>
          <div>• <code>siteB.org</code> (Apache DocumentRoot /var/www/siteB)</div>
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-400 mb-3">
          To distinguish which site the client wants, HTTP/1.1 made the <code>Host:</code> request header <strong>mandatory</strong>. When the web server receives <code>Host: siteA.com</code>, it dispatches the request to siteA's virtual host configuration block.
        </p>
      `,
      "technicalDetails": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. Architectural Role of Intermediaries</h3>
        <table class="wiki-table w-full text-xs mb-4">
          <thead>
            <tr class="bg-amber-50 dark:bg-gray-800">
              <th>Intermediary Type</th>
              <th>Architectural Position</th>
              <th>Key Operational Functions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-bold">Proxy (Forward Proxy)</td>
              <td>Client side (Enterprise gateway)</td>
              <td>URL filtering, internal IP hiding, outbound policy compliance, shared cache</td>
            </tr>
            <tr>
              <td class="font-bold">Gateway (Reverse Proxy)</td>
              <td>Server side (Fronting server farm)</td>
              <td>SSL/TLS termination, Layer 7 load balancing, WAF attack filtering, Gzip compression</td>
            </tr>
            <tr>
              <td class="font-bold">Tunnel (e.g. CONNECT)</td>
              <td>Blind relay between client &amp; server</td>
              <td>Passes encrypted HTTPS packets through corporate firewalls without decryption</td>
            </tr>
          </tbody>
        </table>
      `,
      "workedExamples": {
        "level1": `
          <strong>SNI (Server Name Indication) in HTTPS Virtual Hosting:</strong><br/>
          In HTTPS, the TLS handshake happens <em>before</em> the HTTP request headers are sent. If 100 domains share one IP, how does the server know which SSL certificate to send during the handshake?<br/>
          • <strong>Solution:</strong> RFC 6066 defines Server Name Indication (SNI).<br/>
          • The client browser includes the hostname (e.g. <code>siteA.com</code>) inside the initial <code>ClientHello</code> TLS packet.<br/>
          • The server inspects the SNI extension and presents siteA's specific certificate!
        `,
        "level2": `
          <strong>Virtual Hosting Request Inspection:</strong><br/>
          Client sends:<br/>
          <pre class="bg-slate-900 text-green-400 p-2 rounded text-[10.5px] font-mono mt-1">GET /index.html HTTP/1.1
Host: pondiuni.edu.in
User-Agent: Mozilla/5.0 ...</pre>
          If the client omits the <code>Host:</code> header in HTTP/1.1, the RFC mandates that the server MUST respond with <code>400 Bad Request</code>!
        `,
        "level3": `
          <strong>TLS 1.3 1-RTT Handshake Architecture:</strong><br/>
          Compared to TLS 1.2 which required 2 full round-trips (2 RTT) to establish encryption keys, TLS 1.3 collapses key exchange into 1 RTT:<br/>
          1. Client sends <code>ClientHello</code> containing cipher suites + Diffie-Hellman key share.<br/>
          2. Server responds with <code>ServerHello</code> + its key share + Certificate + Finished.<br/>
          3. Sockets are encrypted immediately; client sends HTTP GET on next packet!
        `
      },
      "advantagesLimitations": `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Architectural Strengths</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Virtual hosting massively conserves public IPv4 address space.</li>
              <li>HTTPS/TLS 1.3 provides provably secure authenticated channels.</li>
              <li>Modular intermediary support allows CDNs and caching proxies to accelerate delivery.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Architectural Challenges</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>TLS encryption prevents intermediate proxy caching unless SSL termination is performed.</li>
              <li>Certificate expiration causes severe, immediate site outages across all browsers.</li>
            </ul>
          </div>
        </div>
      `,
      "whereUsed": [
        "Cloud Hosting: AWS CloudFront, Cloudflare, Akamai reverse proxy edge networks",
        "E-Commerce &amp; Banking: 100% mandatory HTTPS for financial security compliance",
        "Shared Web Hosting: CPanel / WHM hosting thousands of websites on one IP",
        "API Gateways: Kong, Envoy, AWS API Gateway routing REST endpoints",
        "Corporate Proxies: Zscaler and Blue Coat enterprise web filtering"
      ],
      "commonMistakes": `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing Forward Proxy with Reverse Proxy:</strong> A forward proxy represents the client to the Internet. A reverse proxy represents the server to incoming visitors.</li>
          <li><strong>Forgetting Host header in HTTP/1.1:</strong> In HTTP/1.1, the <code>Host:</code> header is strictly mandatory. Omitting it causes an immediate <code>400 Bad Request</code> error.</li>
        </ul>
      `,
      "quiz": [
        {
          "question": "What is the primary function of the mandatory 'Host:' header introduced in HTTP/1.1?",
          "options": [
            "To authenticate the user with a username and password",
            "To enable Name-Based Virtual Hosting, allowing multiple domains to share a single IP address",
            "To specify the user's operating system version",
            "To set the socket timeout duration"
          ],
          "answer": 1,
          "explanation": "The Host header indicates the target domain name requested by the client, allowing a single web server on one IP address to route traffic to the appropriate virtual host."
        },
        {
          "question": "What extension in the TLS handshake allows a secure server to present the correct SSL certificate when multiple HTTPS sites share one IP address?",
          "options": ["ALPN", "Server Name Indication (SNI)", "OCSP Stapling", "DNSSEC"],
          "answer": 1,
          "explanation": "Server Name Indication (SNI) is a TLS extension where the client indicates the requested hostname during the initial ClientHello, allowing the server to select and return the matching certificate."
        },
        {
          "question": "Which HTTP status code must an RFC-compliant HTTP/1.1 web server return if a client request completely lacks the Host header?",
          "options": ["200 OK", "404 Not Found", "400 Bad Request", "500 Internal Error"],
          "answer": 2,
          "explanation": "RFC 7230 explicitly mandates that if an HTTP/1.1 request message lacks a Host header, the server MUST respond with a 400 (Bad Request) status code."
        }
      ],
      "references": [
        { "cite": "RFC 9110: HTTP Semantics, Section 7: Routing and Proxies", "url": "https://datatracker.ietf.org/doc/html/rfc9110" },
        { "cite": "RFC 8446: The Transport Layer Security (TLS) Protocol Version 1.3", "url": "https://datatracker.ietf.org/doc/html/rfc8446" },
        { "cite": "B.A. Forouzan, Data Communications and Networking, Chapter 27: WWW and HTTP", "url": "" }
      ]
    },
    "prevTopicId": "http-intro",
    "nextTopicId": "http-request-response"
  },

  "http-request-response": {
    "id": "http-request-response",
    "title": "HTTP Request and Response",
    "unit": "Unit 5 – Application Layer",
    "unitId": "unit5",
    "level": "Level 2 — Protocol Syntax & Semantics",
    "category": "application",
    "difficulty": "Core",
    "readingTime": "30 min read",
    "standard": "RFC 7230 / RFC 7231 / RFC 9110 / Forouzan Chapter 27.3",
    "oneLiner": "Detailed syntactic specification of HTTP Request-Lines, Status-Lines, ASCII header categories, and entity payloads.",
    "quickAnswer": "Every HTTP transaction consists of an ASCII Request Message issued by the client and an ASCII Response Message returned by the server. A Request message contains a Request Line (Method + URI + Protocol Version), Header lines, an empty line (\\r\\n), and an optional Entity Body. A Response message contains a Status Line (Protocol Version + Status Code + Reason Phrase), Header lines, an empty line, and an Entity Body.",
    "whyItMatters": "Mastery of HTTP request and response structures is required to write web applications, configure web servers, debug network failures using Wireshark, design REST APIs, and diagnose client errors.",
    "infobox": {
      "layer": "Application Layer (OSI Layer 7)",
      "standard": "RFC 9110 (HTTP Semantics), RFC 7231",
      "type": "ASCII Message Syntax & Semantics",
      "prerequisites": ["http-intro", "http-architecture"],
      "relatedConcepts": ["http-working", "web-proxies"],
      "compareWith": ["http-working"],
      "primaryUses": [
        "CRUD resource manipulation (Create, Read, Update, Delete) via HTTP methods",
        "Execution result signaling via 3-digit status codes (200, 301, 404, 500)",
        "Content negotiation (Accept, Content-Type, Accept-Encoding)",
        "Authentication credential delivery (Authorization: Bearer <token>)"
      ],
      "standardRfc": "RFC 9110, RFC 7230, RFC 7231"
    },
    "learningObjectives": [
      "Deconstruct the 4 structural components of an HTTP Request Message",
      "Analyze the primary HTTP methods (GET, POST, PUT, DELETE, HEAD, OPTIONS, PATCH) and their idempotency",
      "Deconstruct the 4 structural components of an HTTP Response Message",
      "Categorize and explain the 5 status code families (1xx, 2xx, 3xx, 4xx, 5xx) and their most frequent codes",
      "Classify HTTP headers into General, Request, Response, and Entity categories",
      "Explain the syntactic role of Carriage Return and Line Feed (\\r\\n) delimiters"
    ],
    "prerequisitesList": [
      {
        "concept": "ASCII Character Encoding",
        "meaning": "Understanding 7-bit ASCII text and control characters (CR=0x0D, LF=0x0A)"
      },
      {
        "concept": "HTTP URL Structure",
        "meaning": "Understanding resource paths and query string formatting"
      }
    ],
    "imageUrl": "assets/images/unit5/topic2/http-request-response-cycle.svg",
    "imageCaption": "Figure 5.6: Side-by-Side Architectural Format of HTTP Request and Response Messages (RFC 7230)",
    "sections": {
      "overview": `
        <p class="mb-3">
          As defined in Forouzan Section 27.3, both HTTP request and response messages are composed of lines of 7-bit ASCII text. Each line is terminated by a <strong>Carriage Return and Line Feed (CRLF, denoted as <code>\\r\\n</code>)</strong> sequence.
        </p>
        <p class="mb-3">
          The message format is strictly divided into two logical sections separated by a mandatory <strong>blank line (an isolated CRLF)</strong>: the message metadata (headers) and the message payload (entity body).
        </p>
      `,
      "howItWorks": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. The HTTP Request Message Anatomy</h3>
        <p class="mb-3 text-xs leading-relaxed">
          An HTTP request message has 4 sequential parts:
        </p>
        <ol class="list-decimal pl-5 space-y-2 text-xs mb-4">
          <li><strong>Request Line:</strong> Contains three space-delimited fields followed by CRLF:
            <code class="block mt-1 p-1 bg-slate-100 dark:bg-slate-800 rounded font-mono text-[11px]">&lt;Method&gt; &lt;Request-URI&gt; &lt;HTTP-Version&gt;\\r\\n</code>
            Example: <code>GET /api/v1/students?dept=cse HTTP/1.1\\r\\n</code>
          </li>
          <li><strong>Header Lines:</strong> A sequence of key-value pairs formatted as <code>Header-Name: Value\\r\\n</code> providing client metadata, accepted formats, host addresses, and authentication credentials.</li>
          <li><strong>Blank Line:</strong> A single CRLF (<code>\\r\\n</code>) on a line by itself. Crucial for signaling to the server parser that the header section has ended and the entity body begins.</li>
          <li><strong>Entity Body:</strong> The optional data payload transmitted to the server (e.g. JSON objects, form data, uploaded files). Used in POST, PUT, and PATCH; empty in standard GET requests.</li>
        </ol>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. HTTP Methods and Idempotency</h3>
        <table class="wiki-table w-full text-xs mb-4">
          <thead>
            <tr class="bg-amber-50 dark:bg-gray-800">
              <th>Method</th>
              <th>RFC Semantics</th>
              <th>Safe?</th>
              <th>Idempotent?</th>
              <th>Has Body?</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="font-bold font-mono">GET</td><td>Retrieve resource identified by URI</td><td>Yes</td><td>Yes</td><td>No</td></tr>
            <tr><td class="font-bold font-mono">POST</td><td>Submit entity to process/append (create resource)</td><td>No</td><td>No</td><td>Yes</td></tr>
            <tr><td class="font-bold font-mono">PUT</td><td>Replace or create resource at exact target URI</td><td>No</td><td>Yes</td><td>Yes</td></tr>
            <tr><td class="font-bold font-mono">DELETE</td><td>Delete resource identified by URI</td><td>No</td><td>Yes</td><td>Optional</td></tr>
            <tr><td class="font-bold font-mono">HEAD</td><td>Identical to GET, but returns headers only (no body)</td><td>Yes</td><td>Yes</td><td>No</td></tr>
            <tr><td class="font-bold font-mono">OPTIONS</td><td>Describe communication options / CORS preflight</td><td>Yes</td><td>Yes</td><td>No</td></tr>
            <tr><td class="font-bold font-mono">PATCH</td><td>Apply partial modifications to a resource</td><td>No</td><td>No</td><td>Yes</td></tr>
          </tbody>
        </table>
        <div class="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded text-xs text-blue-900 dark:text-blue-300 mb-4">
          <strong>Idempotency Defined:</strong> An HTTP method is <em>idempotent</em> if making multiple identical requests has the same intended side-effect on the server as making a single request. <code>PUT</code> and <code>DELETE</code> are idempotent; <code>POST</code> is NOT idempotent (repeating POST orders an item multiple times!).
        </div>
      `,
      "technicalDetails": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. The HTTP Response Message Anatomy</h3>
        <p class="mb-3 text-xs leading-relaxed">
          An HTTP response message has 4 sequential parts:
        </p>
        <ol class="list-decimal pl-5 space-y-2 text-xs mb-4">
          <li><strong>Status Line:</strong> Contains three space-delimited fields followed by CRLF:
            <code class="block mt-1 p-1 bg-slate-100 dark:bg-slate-800 rounded font-mono text-[11px]">&lt;HTTP-Version&gt; &lt;Status-Code&gt; &lt;Reason-Phrase&gt;\\r\\n</code>
            Example: <code>HTTP/1.1 200 OK\\r\\n</code>
          </li>
          <li><strong>Header Lines:</strong> Server metadata including <code>Content-Type</code>, <code>Content-Length</code>, <code>Date</code>, <code>Server</code>, and caching instructions.</li>
          <li><strong>Blank Line:</strong> Mandatory isolated CRLF (<code>\\r\\n</code>).</li>
          <li><strong>Entity Body:</strong> The delivered web resource (HTML text, JSON payload, image binary stream).</li>
        </ol>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">4. Comprehensive HTTP Status Code Reference</h3>
        <div class="space-y-3 text-xs mb-4">
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border-l-4 border-blue-400">
            <strong class="text-blue-700 dark:text-blue-300">1xx (Informational):</strong> Request received, continuing process.
            <div class="mt-1 font-mono text-[10.5px]">• 100 Continue: Server received headers; client may proceed to transmit body.<br/>• 101 Switching Protocols: Protocol upgrade (e.g. HTTP to WebSocket).</div>
          </div>
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border-l-4 border-emerald-400">
            <strong class="text-emerald-700 dark:text-emerald-300">2xx (Success):</strong> Action successfully received, understood, and accepted.
            <div class="mt-1 font-mono text-[10.5px]">• 200 OK: Standard successful GET/POST.<br/>• 201 Created: Resource successfully created (common response to POST/PUT).<br/>• 204 No Content: Successful request with intentionally empty entity body.</div>
          </div>
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border-l-4 border-amber-400">
            <strong class="text-amber-700 dark:text-amber-300">3xx (Redirection):</strong> Further action needed to complete request.
            <div class="mt-1 font-mono text-[10.5px]">• 301 Moved Permanently: Resource URL permanently changed; SEO juice transferred.<br/>• 302 Found: Temporary redirection.<br/>• 304 Not Modified: Cache validation hit! Client uses local cached copy (0 body bytes).</div>
          </div>
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border-l-4 border-rose-400">
            <strong class="text-rose-700 dark:text-rose-300">4xx (Client Error):</strong> Request contains bad syntax or cannot be fulfilled.
            <div class="mt-1 font-mono text-[10.5px]">• 400 Bad Request: Malformed syntax or missing mandatory Host header.<br/>• 401 Unauthorized: Authentication required (missing/invalid credentials).<br/>• 403 Forbidden: Server understands identity but refuses authorization.<br/>• 404 Not Found: Requested URI does not exist on server.<br/>• 405 Method Not Allowed: URI exists but does not support method (e.g. POST on read-only file).<br/>• 429 Too Many Requests: Rate limiting triggered.</div>
          </div>
          <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border-l-4 border-red-600">
            <strong class="text-red-700 dark:text-red-400">5xx (Server Error):</strong> Server failed to fulfill an apparently valid request.
            <div class="mt-1 font-mono text-[10.5px]">• 500 Internal Server Error: Unhandled backend application exception or crash.<br/>• 502 Bad Gateway: Reverse proxy received invalid response from upstream app server.<br/>• 503 Service Unavailable: Server overloaded or undergoing maintenance.<br/>• 504 Gateway Timeout: Upstream application server failed to reply in time.</div>
          </div>
        </div>
      `,
      "workedExamples": {
        "level1": `
          <strong>Deconstructing a Live HTTP Request:</strong><br/>
          <pre class="bg-slate-900 text-sky-300 p-2.5 rounded text-[11px] font-mono">POST /api/v1/auth/login HTTP/1.1
Host: api.pondiuni.edu.in
User-Agent: Mozilla/5.0
Content-Type: application/json
Content-Length: 42
Connection: keep-alive

{"username": "student", "pin": "1234"}</pre>
          • <strong>Request Line:</strong> Method = <code>POST</code>, Path = <code>/api/v1/auth/login</code>, Version = <code>HTTP/1.1</code>.<br/>
          • <strong>Headers:</strong> Host, User-Agent, Content-Type, Content-Length (42 bytes).<br/>
          • <strong>Blank Line:</strong> <code>\\r\\n</code> separating headers from JSON body.<br/>
          • <strong>Body:</strong> The 42-byte JSON credential payload.
        `,
        "level2": `
          <strong>Conditional GET with 304 Not Modified:</strong><br/>
          When browser has cached <code>logo.png</code> with ETag <code>"xyz987"</code>:<br/>
          1. Client sends:<br/>
          <pre class="bg-slate-900 text-sky-300 p-2 rounded text-[10px] font-mono">GET /logo.png HTTP/1.1
Host: pondiuni.edu.in
If-None-Match: "xyz987"</pre>
          2. Server checks file hash on disk. Hash is unchanged!<br/>
          3. Server responds:<br/>
          <pre class="bg-slate-900 text-green-400 p-2 rounded text-[10px] font-mono">HTTP/1.1 304 Not Modified
Date: Tue, 03 Nov 2026 15:30:00 GMT
ETag: "xyz987"</pre>
          4. Zero bytes of image data transmitted! Saves bandwidth and loads instantaneously.
        `,
        "level3": `
          <strong>Chunked Transfer Encoding (Dynamic Responses):</strong><br/>
          When a web server streams a live dynamic database query, it cannot know the total <code>Content-Length</code> in advance. It uses <code>Transfer-Encoding: chunked</code>:<br/>
          • Server sends data in hex-sized chunks followed by data: <code>1A\\r\\n[26 bytes of data]\\r\\n</code>.<br/>
          • The stream terminates when a chunk of size zero is sent: <code>0\\r\\n\\r\\n</code>.
        `
      },
      "advantagesLimitations": `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Architectural Advantages</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Human-readable standardized text syntax simplifies diagnostics.</li>
              <li>Clear separation of metadata (headers) from data (body).</li>
              <li>Standardized status codes provide deterministic error-handling logic for software clients.</li>
              <li>Content-Type headers support any digital media type seamlessly.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Protocol Inefficiencies</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>ASCII text headers introduce heavy uncompressed byte overhead.</li>
              <li>Parsing ASCII line-by-line requires more CPU cycles than binary protocols.</li>
            </ul>
          </div>
        </div>
      `,
      "whereUsed": [
        "Web APIs: REST, JSON-RPC, SOAP, GraphQL APIs",
        "Web Browsing: Everyday communication between browsers and HTTP servers",
        "Monitoring Tools: cURL, Postman, Wireshark, Fiddler network analysis",
        "Webhook Subscriptions: Real-time event notifications between SaaS platforms",
        "CI/CD Pipelines: Automated build triggers and deployment webhooks"
      ],
      "commonMistakes": `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing 401 Unauthorized with 403 Forbidden:</strong> 401 means the client is unauthenticated (log in first). 403 means the client is authenticated, but lacks administrative permission to view the resource.</li>
          <li><strong>Confusing 502 Bad Gateway with 504 Gateway Timeout:</strong> 502 means the reverse proxy received an invalid or crash response from the upstream server. 504 means the upstream server failed to respond before the timeout threshold.</li>
          <li><strong>Believing GET cannot have query parameters:</strong> GET parameters are transmitted directly inside the URL query string (<code>?key=val</code>). POST parameters can be in the URL or the entity body.</li>
        </ul>
      `,
      "quiz": [
        {
          "question": "Which HTTP status code is returned when a client attempts a conditional GET request and the resource has NOT changed since the cached timestamp?",
          "options": ["200 OK", "301 Moved Permanently", "304 Not Modified", "204 No Content"],
          "answer": 2,
          "explanation": "HTTP status code 304 Not Modified indicates that the resource has not been altered, directing the client to render its locally cached copy without re-transmitting the entity body."
        },
        {
          "question": "Which of the following HTTP methods is considered non-idempotent?",
          "options": ["GET", "PUT", "POST", "DELETE"],
          "answer": 2,
          "explanation": "POST is non-idempotent because repeating identical POST requests typically results in multiple independent resource creations or state modifications on the server."
        },
        {
          "question": "What ASCII delimiter sequence is required between HTTP header lines and the beginning of the entity body?",
          "options": ["NULL (0x00)", "A blank line consisting of Carriage Return + Line Feed (\\r\\n)", "EOF", "Two spaces"],
          "answer": 1,
          "explanation": "RFC 7230 specifies that the header section must be terminated by an isolated CRLF (\\r\\n) on a line by itself, creating a blank line before the entity body."
        }
      ],
      "references": [
        { "cite": "RFC 9110: HTTP Semantics, Section 9: HTTP Methods & Status Codes", "url": "https://datatracker.ietf.org/doc/html/rfc9110" },
        { "cite": "RFC 7231: Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content", "url": "https://datatracker.ietf.org/doc/html/rfc7231" },
        { "cite": "B.A. Forouzan, Data Communications and Networking, Chapter 27.3: HTTP Transaction", "url": "" }
      ]
    },
    "prevTopicId": "http-architecture",
    "nextTopicId": "http-working"
  },

  "http-working": {
    "id": "http-working",
    "title": "Working of HTTP",
    "unit": "Unit 5 – Application Layer",
    "unitId": "unit5",
    "level": "Level 2 — Operational Mechanics & Performance",
    "category": "application",
    "difficulty": "Core",
    "readingTime": "25 min read",
    "standard": "RFC 2616 / RFC 7230 / Forouzan Section 27.3 / Kurose & Ross Ch. 2.2",
    "oneLiner": "Operational execution of HTTP over TCP sockets: Persistent vs Non-Persistent connections, pipelining, and web caching.",
    "quickAnswer": "The working of HTTP involves establishing transport connections, issuing requests, and managing persistent sockets. In Non-Persistent HTTP (HTTP/1.0), each inline web asset requires a dedicated TCP connection (imposing a 2-RTT penalty per object). In Persistent HTTP (HTTP/1.1), multiple requests are multiplexed over a single long-lived TCP socket, accelerated further by pipelining and conditional cache validation.",
    "whyItMatters": "Web performance optimization directly dictates user retention and bounce rates. Understanding socket lifecycles, RTT latency calculations, Head-of-Line blocking, and cache validation headers is critical for building lightning-fast web infrastructure.",
    "infobox": {
      "layer": "Application Layer (OSI Layer 7)",
      "standard": "RFC 7230, RFC 7234 (Caching)",
      "type": "Connection Management & Caching Mechanics",
      "prerequisites": ["http-request-response", "tcp"],
      "relatedConcepts": ["content-delivery", "server-farms", "web-proxies"],
      "compareWith": ["http-request-response"],
      "primaryUses": [
        "Connection persistence and socket reuse (Connection: keep-alive)",
        "Latency minimization via HTTP pipelining",
        "Bandwidth conservation via Web Cache validation (ETag, Last-Modified)",
        "Elimination of TCP slow-start re-initialization penalties"
      ],
      "standardRfc": "RFC 7230 (Message Syntax), RFC 7234 (Caching)"
    },
    "learningObjectives": [
      "Compare Non-Persistent HTTP (HTTP/1.0) and Persistent HTTP (HTTP/1.1) using RTT mathematical formulas",
      "Explain the concept and limitations of HTTP Pipelining and Head-of-Line (HoL) blocking",
      "Calculate total page delivery delay for pages with $N$ embedded objects",
      "Analyze the operational flow of Web Caches (Proxy Caching & Browser Caching)",
      "Evaluate cache freshness mechanisms: Cache-Control, max-age, ETag, and Conditional GET"
    ],
    "prerequisitesList": [
      {
        "concept": "Round Trip Time (RTT)",
        "meaning": "Time required for a small packet to travel from client to server and back"
      },
      {
        "concept": "TCP 3-Way Handshake",
        "meaning": "SYN, SYN-ACK, ACK exchange required before data transfer"
      }
    ],
    "imageUrl": "assets/images/unit5/topic2/http-working-persistent.svg",
    "imageCaption": "Figure 5.7: RTT Timing Diagrams: Non-Persistent HTTP/1.0 vs. Persistent HTTP/1.1 with Pipelining",
    "sections": {
      "overview": `
        <p class="mb-3">
          When a user opens a modern webpage, the initial HTML document typically contains references to 50 to 150 embedded objects (CSS stylesheets, JavaScript bundles, PNG/WebP images, web fonts, and advertising scripts).
        </p>
        <p class="mb-3">
          The <strong>working of HTTP</strong> governs how the client retrieves all these referenced objects across the network. The choice of connection management strategy drastically impacts page load speed, server memory consumption, and network congestion.
        </p>
      `,
      "howItWorks": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. Non-Persistent vs. Persistent Connections (Forouzan Section 27.3)</h3>
        
        <h4 class="text-xs font-bold text-amber-700 dark:text-amber-400 mt-2 mb-1">A. Non-Persistent Connections (HTTP/1.0)</h4>
        <p class="text-xs mb-2">
          In a non-persistent connection, one TCP connection is made for each request/response. The following steps occur for every single embedded asset:
        </p>
        <ol class="list-decimal pl-5 space-y-1 text-xs mb-3">
          <li>Client opens a TCP connection to the server ($1 \times \text{RTT}$ for SYN and SYN-ACK).</li>
          <li>Client transmits the HTTP request; server transmits the response ($1 \times \text{RTT} + \text{transmission time}$).</li>
          <li>Server immediately closes the TCP connection.</li>
        </ol>
        <div class="p-2.5 bg-rose-50 dark:bg-rose-950/30 rounded border border-rose-200 dark:border-rose-800 text-xs mb-4">
          <strong>Mathematical Latency for Page with $N$ Embedded Objects:</strong><br/>
          $\text{Total Time} = 2 \times \text{RTT} + \sum_{i=1}^N (2 \times \text{RTT} + \text{Trans}_i) = (2N + 2) \times \text{RTT} + \text{Data Transmission}$<br/>
          <em>Disadvantage:</em> Server must maintain TCP buffers and control blocks (PCB) in <code>TIME_WAIT</code> state for thousands of short-lived connections, severely limiting concurrent server capacity.
        </div>

        <h4 class="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-2 mb-1">B. Persistent Connections (HTTP/1.1 Default)</h4>
        <p class="text-xs mb-2">
          HTTP/1.1 specifies a persistent connection by default. The server leaves the TCP connection open after sending a response. Subsequent requests and responses between the same client and server can be sent over the same connection.
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs mb-3">
          <li><strong>Persistent without Pipelining:</strong> The client issues a new request only after the previous response has been received ($1 \times \text{RTT}$ per referenced object).</li>
          <li><strong>Persistent with Pipelining:</strong> The client sends requests for all referenced objects back-to-back as soon as it parses their URLs, without waiting for intermediate responses!</li>
        </ul>
        <div class="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded border border-emerald-200 dark:border-emerald-800 text-xs mb-4">
          <strong>Mathematical Latency with Persistent Pipelining:</strong><br/>
          $\text{Total Time} = 1 \times \text{RTT (Handshake)} + 1 \times \text{RTT (HTML)} + 1 \times \text{RTT (All Pipelined Objects)} + \text{Transmission Time} \approx 3 \times \text{RTT}$
        </div>
      `,
      "technicalDetails": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. Web Caching Mechanics (Proxy &amp; Browser Caching)</h3>
        <p class="mb-3 text-xs leading-relaxed">
          A <strong>web cache (proxy server)</strong> is a network entity that stores copies of recent HTTP responses on local disk or RAM (Forouzan Section 27.3). When configured:
        </p>
        <ol class="list-decimal pl-5 space-y-1.5 text-xs mb-4">
          <li>Browser sends all HTTP requests to the Web Cache first.</li>
          <li><strong>Cache Hit:</strong> If the requested object is present and fresh, the cache returns it directly. Latency is &lt; 5ms; zero traffic reaches the origin server!</li>
          <li><strong>Cache Miss:</strong> If absent or stale, the cache opens a connection to the origin server, retrieves the object, stores a copy, and returns it to the client.</li>
        </ol>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. Freshness vs Validation Headers</h3>
        <table class="wiki-table w-full text-xs mb-4">
          <thead>
            <tr class="bg-amber-50 dark:bg-gray-800">
              <th>Header Type</th>
              <th>Header Name &amp; Syntax</th>
              <th>Operational Function</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-bold">Freshness Directive</td>
              <td class="font-mono">Cache-Control: max-age=86400, public</td>
              <td>Specifies maximum seconds object remains fresh without contacting origin</td>
            </tr>
            <tr>
              <td class="font-bold">Privacy Directive</td>
              <td class="font-mono">Cache-Control: no-store / private</td>
              <td>Forbids intermediate proxies from storing sensitive personal data</td>
            </tr>
            <tr>
              <td class="font-bold">Time Validator</td>
              <td class="font-mono">Last-Modified: Tue, 03 Nov 2026 GMT</td>
              <td>Origin marks file timestamp; client revalidates using If-Modified-Since</td>
            </tr>
            <tr>
              <td class="font-bold">Entity Tag Validator</td>
              <td class="font-mono">ETag: "686897696a7c876b7e"</td>
              <td>Cryptographic hash of file content; client revalidates via If-None-Match</td>
            </tr>
          </tbody>
        </table>
      `,
      "workedExamples": {
        "level1": `
          <strong>Numerical Comparison of HTTP Delivery Times:</strong><br/>
          Given: RTT = 40ms, Page has 1 HTML base file and 9 embedded images. Ignore transmission time.<br/>
          • <strong>Non-Persistent HTTP/1.0:</strong><br/>
            - Base file: 1 RTT (handshake) + 1 RTT (GET) = 80ms.<br/>
            - 9 images: 9 × (1 RTT handshake + 1 RTT GET) = 9 × 80ms = 720ms.<br/>
            - Total Delay = 80ms + 720ms = <strong class="text-rose-600">800ms</strong>.<br/>
          • <strong>Persistent HTTP/1.1 with Pipelining:</strong><br/>
            - Base file: 1 RTT (handshake) + 1 RTT (GET) = 80ms.<br/>
            - 9 images sent in parallel pipeline over same socket = 1 RTT = 40ms.<br/>
            - Total Delay = 80ms + 40ms = <strong class="text-emerald-600">120ms</strong> (6.6× faster!).
        `,
        "level2": `
          <strong>Head-of-Line (HoL) Blocking Explained:</strong><br/>
          In HTTP/1.1 pipelining, the RFC mandates that responses MUST be returned in the exact order requested:<br/>
          • Request 1 = Heavy dynamic script (takes 3,000ms to calculate).<br/>
          • Request 2 = Small 1KB icon (ready in 1ms).<br/>
          Even though the icon was ready in 1 millisecond, it cannot be sent until the 3,000ms script finishes transmitting! HTTP/2 solves this with binary multiplexed frames.
        `,
        "level3": `
          <strong>Connection Keep-Alive Timeout:</strong><br/>
          Servers configure <code>Keep-Alive: timeout=5, max=1000</code>:<br/>
          • <code>timeout=5</code>: If no new request arrives within 5 seconds of inactivity, the server closes the socket to free OS resources.<br/>
          • <code>max=1000</code>: Maximum 1,000 requests allowed on a single persistent socket before cycling.
        `
      },
      "advantagesLimitations": `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Persistent HTTP Advantages</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Cuts page load time from $(2N+2) \times \text{RTT}$ to $\approx 3 \times \text{RTT}$.</li>
              <li>Eliminates repeated TCP slow-start congestion window resets.</li>
              <li>Drastically cuts server CPU and memory usage from opening/closing thousands of sockets.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Limitations</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Pipelining suffered widespread deployment failure due to buggy intermediate proxies.</li>
              <li>Idle persistent sockets tie up server file descriptors if timeout is set too long.</li>
            </ul>
          </div>
        </div>
      `,
      "whereUsed": [
        "Web Caches: Squid, Varnish Cache, Nginx reverse proxy caching",
        "Browser Optimization: Chrome and Firefox connection pools (up to 6 parallel sockets per domain)",
        "CDNs: Maintaining long-lived persistent TCP tunnels between Edge PoPs and Origin",
        "E-Commerce: High-speed checkout flows preserving cart sessions"
      ],
      "commonMistakes": `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing RTT with transmission delay:</strong> RTT is propagation time across the wire. Transmission delay is file size divided by link bandwidth ($L/R$).</li>
          <li><strong>Assuming HTTP/1.1 pipelining is widely enabled:</strong> Most modern browsers disabled pipelining by default due to Head-of-Line blocking and buggy proxy crashes; they jumped directly to HTTP/2 multiplexing.</li>
        </ul>
      `,
      "quiz": [
        {
          "question": "What is the theoretical minimum connection setup and page retrieval latency for an HTML file with 5 embedded images using Non-Persistent HTTP without parallel connections?",
          "options": ["2 RTT", "6 RTT", "12 RTT", "1 RTT"],
          "answer": 2,
          "explanation": "Non-persistent HTTP requires 2 RTT per object (1 RTT for TCP handshake + 1 RTT for HTTP transaction). For 6 total objects (1 HTML + 5 images), latency = 6 × 2 RTT = 12 RTT."
        },
        {
          "question": "What happens when an HTTP response contains 'Cache-Control: no-store'?",
          "options": [
            "The client and intermediate proxies must not cache any part of the request or response",
            "The response can be cached for up to 1 year",
            "The server will delete the file from its disk",
            "The response must be encrypted"
          ],
          "answer": 0,
          "explanation": "'no-store' instructs browsers and intermediate proxies that the response is sensitive and MUST NOT be stored in any cache or volatile memory."
        },
        {
          "question": "What is the primary cause of Head-of-Line (HoL) blocking in HTTP/1.1 pipelining?",
          "options": [
            "UDP packet loss",
            "The requirement that responses must be delivered in the exact sequential order that requests were sent",
            "Exhaustion of IP addresses",
            "DNS lookup failures"
          ],
          "answer": 1,
          "explanation": "HTTP/1.1 pipelining requires FIFO response ordering. If a slow dynamic request precedes fast static requests, the entire pipeline is blocked behind the slow response."
        }
      ],
      "references": [
        { "cite": "RFC 7230: HTTP/1.1 Message Syntax and Routing, Section 6: Connection Management", "url": "https://datatracker.ietf.org/doc/html/rfc7230" },
        { "cite": "RFC 7234: Hypertext Transfer Protocol (HTTP/1.1): Caching", "url": "https://datatracker.ietf.org/doc/html/rfc7234" },
        { "cite": "B.A. Forouzan, Data Communications and Networking, Chapter 27.3: Persistent vs. Nonpersistent", "url": "" }
      ]
    },
    "prevTopicId": "http-request-response",
    "nextTopicId": "content-delivery"
  }
};

