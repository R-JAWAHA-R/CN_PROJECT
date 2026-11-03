// Topic 1: DNS, E-Mail and WWW
module.exports = {
  "dns": {
    "id": "dns",
    "title": "DNS (Domain Name System)",
    "unit": "Unit 5 – Application Layer",
    "unitId": "unit5",
    "level": "Level 1 — Fundamental Infrastructure",
    "category": "application",
    "difficulty": "Core",
    "readingTime": "25 min read",
    "standard": "RFC 1034 / RFC 1035 / Forouzan Chapter 25 / Kurose & Ross Ch. 2.4",
    "oneLiner": "Hierarchical, distributed naming system that translates human-friendly hostnames into machine-routable IP addresses.",
    "quickAnswer": "The Domain Name System (DNS) is an application-layer service operating primarily over UDP port 53. It maintains a globally distributed hierarchical database that maps symbolic hostnames (such as <code>www.pondiuni.edu.in</code>) to numerical IPv4/IPv6 addresses, routes mail via MX records, and provides aliases via CNAME records.",
    "whyItMatters": "Humans remember descriptive names, whereas routers and network stacks route packets using fixed-length numerical IP addresses. Without DNS, every user would have to memorize 32-bit IPv4 or 128-bit IPv6 numbers for every website and service, making the modern global Internet unusable.",
    "infobox": {
      "layer": "Application Layer (OSI Layer 7 / TCP-IP Layer 4)",
      "standard": "IETF RFC 1034 & 1035",
      "type": "Distributed Directory Database & Client-Server Protocol",
      "prerequisites": ["ip-addressing", "udp", "tcp"],
      "relatedConcepts": ["email-architecture", "www", "http-intro"],
      "compareWith": ["ip-addressing"],
      "primaryUses": [
        "Hostname-to-IP Address Resolution (A / AAAA records)",
        "Reverse IP-to-Hostname Resolution (PTR records in .in-addr.arpa)",
        "Mail Exchange Routing (MX records with preference rankings)",
        "Canonical Name Aliasing (CNAME records)",
        "Domain verification and email anti-spoofing (TXT: SPF, DKIM, DMARC)"
      ],
      "standardRfc": "RFC 1034 (Concepts & Facilities), RFC 1035 (Implementation & Specification)"
    },
    "learningObjectives": [
      "Explain why a distributed hierarchical database is necessary instead of a centralized host file",
      "Differentiate between Flat Name Space and Hierarchical Domain Name Space",
      "Describe the four tiers of the DNS hierarchy: Root, TLD, Authoritative, and Local Resolvers",
      "Trace the 8-step iterative resolution process versus recursive resolution",
      "Identify the structure and purpose of common DNS Resource Records (A, AAAA, CNAME, MX, NS, PTR, SOA, TXT)",
      "Explain the transport protocol choices: UDP Port 53 for standard queries vs TCP Port 53 for zone transfers and EDNS0"
    ],
    "prerequisitesList": [
      {
        "concept": "IP Addressing",
        "meaning": "Understanding 32-bit IPv4 and 128-bit IPv6 addresses used by the Network Layer"
      },
      {
        "concept": "Transport Layer Ports",
        "meaning": "Familiarity with UDP and TCP transport protocols and port multiplexing (Port 53)"
      }
    ],
    "imageUrl": "assets/images/unit5/topic1/dns-architecture-resolution.svg",
    "imageCaption": "Figure 5.1: DNS Hierarchical Namespace Tree and Step-by-Step Recursive vs. Iterative Resolution Flow",
    "sections": {
      "overview": `
        <p class="mb-3">
          In the early ARPANET, name-to-address mapping was performed using a single flat file called <code>hosts.txt</code>, centrally maintained by the Stanford Research Institute (SRI-NIC) and periodically downloaded by all connected computers. As the Internet scaled to millions of hosts, a centralized file became impossible to maintain due to name collisions, massive network bandwidth saturation, and single-point-of-failure vulnerability.
        </p>
        <p class="mb-3">
          To solve this fundamental scalability problem, Paul Mockapetris designed the <strong>Domain Name System (DNS)</strong> in 1983 (RFC 1034 and RFC 1035). DNS replaces the flat file with a <strong>globally distributed, hierarchical database</strong> implemented across thousands of autonomous name servers worldwide.
        </p>
        <div class="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-xs mb-3">
          <strong>Key Architectural Principle:</strong> No single server holds all domain name records. Instead, the namespace is partitioned into discrete administrative units called <strong>zones</strong>, each managed by independent authoritative name servers.
        </div>
      `,
      "howItWorks": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. The Domain Name Space Tree Structure</h3>
        <p class="mb-3 text-xs leading-relaxed">
          The domain namespace is structured as an inverted hierarchical tree with the <strong>Root (.)</strong> at the top. Each node in the tree has a label of up to 63 alphanumeric characters:
        </p>
        <ul class="list-disc pl-5 space-y-1.5 text-xs mb-4">
          <li><strong>Root Level (.):</strong> The null label at the apex of the hierarchy, represented by an empty string or dot. Controlled by ICANN and operated across 13 root server IP clusters (named <code>a.root-servers.net</code> through <code>m.root-servers.net</code>), replicated via Anycast to over 1,500 physical locations globally.</li>
          <li><strong>Top-Level Domains (TLD):</strong> Directly beneath the root. Classified into:
            <ul class="list-circle pl-5 mt-1 space-y-1">
              <li><em>Generic TLDs (gTLD):</em> <code>.com</code> (commercial), <code>.edu</code> (educational), <code>.org</code> (non-profit), <code>.gov</code> (US government), <code>.net</code> (network infrastructure).</li>
              <li><em>Country-Code TLDs (ccTLD):</em> Two-letter geographic codes such as <code>.in</code> (India), <code>.uk</code> (United Kingdom), <code>.jp</code> (Japan).</li>
              <li><em>Infrastructure Domain:</em> <code>.arpa</code> used for internal network operations and reverse lookups.</li>
            </ul>
          </li>
          <li><strong>Second-Level Domains (SLD):</strong> Registered by individuals, universities, and commercial entities directly under a TLD (e.g., <code>pondiuni.edu.in</code>, <code>google.com</code>).</li>
          <li><strong>Subdomains &amp; Hostnames:</strong> Specific hosts configured by domain administrators (e.g., <code>mail.google.com</code>, <code>www.pondiuni.edu.in</code>).</li>
        </ul>

        <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs space-y-1.5 mb-4 font-mono">
          <div>• Fully Qualified Domain Name (FQDN): Ends with a trailing dot: <code>www.pondiuni.edu.in.</code> (unambiguous path to root).</div>
          <div>• Partially Qualified Domain Name (PQDN): Relative name without the trailing dot: <code>www</code> (must be appended with local search suffix).</div>
        </div>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. Recursive vs. Iterative Name Resolution</h3>
        <p class="mb-3 text-xs leading-relaxed">
          When an application (such as a web browser) needs to resolve a domain, the operating system's <strong>stub resolver</strong> issues a DNS query. Resolution proceeds using two primary paradigms:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
          <div class="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
            <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-1">A. Recursive Resolution</h4>
            <p class="text-slate-700 dark:text-slate-300">
              The querier shifts the entire burden of resolution onto the queried server. The client says: <em>"Find me the final IP address, or return an error."</em> The local recursive DNS server (provided by the ISP or public providers like <code>8.8.8.8</code> or <code>1.1.1.1</code>) performs all necessary downstream queries on behalf of the client.
            </p>
          </div>
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-900">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-1">B. Iterative Resolution</h4>
            <p class="text-slate-700 dark:text-slate-300">
              The queried server replies with the best answer it currently knows, or a <strong>referral</strong> to another name server lower down the hierarchy: <em>"I do not know the exact IP, but query this next server at IP address X."</em> The querier itself executes successive queries to Root → TLD → Authoritative.
            </p>
          </div>
        </div>
      `,
      "technicalDetails": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. DNS Resource Records (RR) Format</h3>
        <p class="mb-3 text-xs leading-relaxed">
          The distributed database stores entries in standard 5-tuple Resource Records:
          <code class="p-1 bg-slate-100 dark:bg-slate-800 rounded font-mono">&lt;Name, TTL, Class, Type, Value&gt;</code>
        </p>
        <table class="wiki-table w-full text-xs mb-4">
          <thead>
            <tr class="bg-amber-50 dark:bg-gray-800">
              <th>Record Type</th>
              <th>Meaning</th>
              <th>Example Format</th>
              <th>Operational Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-bold font-mono">A</td>
              <td>Address (IPv4)</td>
              <td class="font-mono">pondiuni.edu.in. IN A 203.0.113.10</td>
              <td>Maps host domain name to 32-bit IPv4 address</td>
            </tr>
            <tr>
              <td class="font-bold font-mono">AAAA</td>
              <td>IPv6 Address</td>
              <td class="font-mono">example.com. IN AAAA 2001:db8::1</td>
              <td>Maps host domain name to 128-bit IPv6 address</td>
            </tr>
            <tr>
              <td class="font-bold font-mono">CNAME</td>
              <td>Canonical Name</td>
              <td class="font-mono">www.pondiuni.edu.in. IN CNAME pondiuni.edu.in.</td>
              <td>Creates alias pointing to true canonical hostname</td>
            </tr>
            <tr>
              <td class="font-bold font-mono">MX</td>
              <td>Mail Exchange</td>
              <td class="font-mono">pondiuni.edu.in. IN MX 10 mail.pondiuni.edu.in.</td>
              <td>Directs inbound email; lowest preference number is highest priority</td>
            </tr>
            <tr>
              <td class="font-bold font-mono">NS</td>
              <td>Name Server</td>
              <td class="font-mono">pondiuni.edu.in. IN NS ns1.pondiuni.edu.in.</td>
              <td>Specifies authoritative DNS server delegating the zone</td>
            </tr>
            <tr>
              <td class="font-bold font-mono">PTR</td>
              <td>Pointer</td>
              <td class="font-mono">10.113.0.203.in-addr.arpa. IN PTR mail.pondiuni.edu.in.</td>
              <td>Performs reverse resolution (IP address → Hostname)</td>
            </tr>
            <tr>
              <td class="font-bold font-mono">SOA</td>
              <td>Start of Authority</td>
              <td class="font-mono">zone.com. IN SOA ns1 hostmaster (serial, refresh, retry...)</td>
              <td>Defines zone parameters, primary master server, and replication timers</td>
            </tr>
            <tr>
              <td class="font-bold font-mono">TXT</td>
              <td>Text Strings</td>
              <td class="font-mono">"v=spf1 include:_spf.google.com ~all"</td>
              <td>Used for SPF, DKIM, and cryptographic domain ownership verification</td>
            </tr>
          </tbody>
        </table>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">4. Transport Protocols: Why UDP and TCP Port 53?</h3>
        <p class="mb-3 text-xs leading-relaxed">
          DNS is one of the few protocols that extensively uses <strong>both UDP and TCP</strong> on well-known Port 53:
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs mb-3">
          <li><strong>UDP Port 53:</strong> Used for almost all client queries and responses. DNS messages are traditionally small (&lt; 512 bytes). UDP avoids the 3-way handshake overhead, enabling instant single-RTT resolution. If a response is dropped, the resolver retransmits after a timeout.</li>
          <li><strong>TCP Port 53:</strong> Used in two critical situations:
            <ol class="list-decimal pl-5 mt-1 space-y-0.5">
              <li><em>Zone Transfers (AXFR / IXFR):</em> Primary and secondary DNS servers synchronizing whole zone databases require 100% reliable, sequenced byte-stream delivery.</li>
              <li><em>Truncated Responses (TC bit set):</em> When DNS responses exceed 512 bytes (common with DNSSEC cryptographic signatures or extensive TXT records), the server sets the <code>TC=1</code> (Truncation) flag in the UDP header. The client immediately falls back to TCP Port 53 to retrieve the complete data.</li>
            </ol>
          </li>
        </ul>
      `,
      "workedExamples": {
        "level1": `
          <strong>Step-by-Step Iterative DNS Trace:</strong><br/>
          A student opens <code>www.pondiuni.edu.in</code> on their laptop:<br/>
          • <strong>Step 1:</strong> Browser checks local OS DNS cache. If empty, it sends a recursive query to Local DNS Server (e.g. 192.168.1.1).<br/>
          • <strong>Step 2:</strong> Local DNS queries a Root Server (<code>.</code>). Root responds with referral to <code>.in</code> ccTLD servers.<br/>
          • <strong>Step 3:</strong> Local DNS queries <code>.in</code> TLD server. TLD responds with referral to <code>.edu.in</code> name servers.<br/>
          • <strong>Step 4:</strong> Local DNS queries <code>.edu.in</code> server, receiving referral to Pondicherry University's authoritative server (<code>ns1.pondiuni.edu.in</code>).<br/>
          • <strong>Step 5:</strong> Local DNS queries <code>ns1.pondiuni.edu.in</code> for <code>www.pondiuni.edu.in</code>.<br/>
          • <strong>Step 6:</strong> Authoritative server returns the <strong>A Record</strong>: <code>203.0.113.10</code> with TTL = 3600s.<br/>
          • <strong>Step 7:</strong> Local DNS caches the answer and returns <code>203.0.113.10</code> to the laptop.<br/>
          • <strong>Step 8:</strong> Browser initiates TCP 3-way handshake on Port 443 with <code>203.0.113.10</code>!
        `,
        "level2": `
          <strong>DNS Caching and TTL Calculation:</strong><br/>
          Suppose a domain administrator updates an A record from <code>203.0.113.10</code> to <code>198.51.100.25</code> with a TTL (Time-To-Live) of 86,400 seconds (24 hours).<br/>
          • Client A queried the domain at 10:00 AM (cached until 10:00 AM next day).<br/>
          • Client B queries at 4:00 PM for the first time.<br/>
          • The admin updates the record at 12:00 PM (noon).<br/>
          • Client A will continue receiving the stale old IP until its local TTL expires at 10:00 AM next day.<br/>
          • Client B will immediately receive the new IP because its resolver queried after the update.<br/>
          <em>Best Practice:</em> Before server migrations, lower TTL to 300 seconds (5 minutes) days in advance to accelerate propagation!
        `,
        "level3": `
          <strong>Reverse DNS Lookup via in-addr.arpa:</strong><br/>
          To find the domain name associated with IPv4 address <code>203.0.113.10</code>:<br/>
          1. Reverse the octets: <code>10.113.0.203</code>.<br/>
          2. Append the special infrastructure domain: <code>10.113.0.203.in-addr.arpa</code>.<br/>
          3. Query for a <strong>PTR record</strong>.<br/>
          4. The authoritative reverse DNS server returns: <code>mail.pondiuni.edu.in</code>.<br/>
          <em>Security Use:</em> Mail servers check PTR records to verify that sending mail servers are not spammers on dynamic residential IP blocks.
        `
      },
      "advantagesLimitations": `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Advantages of Hierarchical DNS</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Infinite scalability: Administrative delegation partitions data and load globally.</li>
              <li>Human-friendly abstraction: Users remember intuitive domain names.</li>
              <li>High resilience &amp; redundancy: Multiple root and authoritative replicas prevent single points of failure.</li>
              <li>Aggressive caching: Reduces global query volume and cuts latency from 150ms to 1ms for cached lookups.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Vulnerabilities &amp; Limitations</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>DNS Cache Poisoning / Spoofing: Attacker injects fake IP records into resolvers (Kaminsky attack).</li>
              <li>Cleartext queries: Standard DNS is unencrypted, exposing browsing habits to ISPs (mitigated by DoH and DoT).</li>
              <li>Amplification DDoS attacks: Attackers spoof victim IP in UDP queries to open resolvers with large TXT/ANY responses.</li>
            </ul>
          </div>
        </div>
      `,
      "whereUsed": [
        "Web Browsing: Translating URLs into IP addresses for HTTP/HTTPS connections",
        "E-Mail Delivery: Looking up recipient mail servers via MX records",
        "Content Delivery Networks (CDNs): Route optimization via Geo-DNS and EDNS Client Subnet",
        "Anti-Spam Verification: SPF, DKIM, and DMARC authentication records in TXT records",
        "Active Directory &amp; Enterprise LANs: Locating domain controllers and internal LDAP services"
      ],
      "commonMistakes": `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing Authoritative with Recursive servers:</strong> An authoritative server possesses the official zone file records. A recursive resolver has no zone files of its own; it traverses other servers to fetch answers for client devices.</li>
          <li><strong>Assuming DNS operates exclusively on UDP:</strong> DNS uses TCP Port 53 for zone transfers between primary/secondary servers and when response payloads exceed 512 bytes.</li>
          <li><strong>Believing CNAME can point directly to an IP:</strong> A CNAME record can only point to another domain name (canonical name), never to a numerical IP address (which requires an A record).</li>
        </ul>
      `,
      "quiz": [
        {
          "question": "What type of DNS record maps an IP address back to its corresponding domain name in reverse lookup?",
          "options": ["A record", "CNAME record", "PTR record", "MX record"],
          "answer": 2,
          "explanation": "A Pointer (PTR) record stored under the .in-addr.arpa (IPv4) or .ip6.arpa (IPv6) domain maps an IP address back to a hostname."
        },
        {
          "question": "Under what specific condition will standard DNS switch from UDP Port 53 to TCP Port 53?",
          "options": [
            "Whenever the client requests an HTTPS URL",
            "When the response message exceeds 512 bytes or during zone transfers (AXFR)",
            "Only when communicating with the Root Name Servers",
            "When resolving .org domains"
          ],
          "answer": 1,
          "explanation": "Standard DNS queries use UDP Port 53. If a response exceeds 512 bytes (or EDNS0 buffer), the TC (Truncation) flag is set, forcing the client to re-query over TCP Port 53. TCP is also required for zone transfers."
        },
        {
          "question": "In iterative DNS resolution, how does an intermediate name server reply if it does not have the final authoritative answer?",
          "options": [
            "It drops the query silently",
            "It queries the destination server itself and relays the answer back",
            "It returns a referral with the IP addresses of name servers lower in the tree",
            "It generates a random IP address"
          ],
          "answer": 2,
          "explanation": "In iterative resolution, a name server that does not hold the requested record returns a referral (NS record + glue A record) pointing the querier to the next authoritative server down the tree."
        },
        {
          "question": "For a company with two MX records: 'mail1.company.com (preference 10)' and 'mail2.company.com (preference 20)', which server receives mail first?",
          "options": [
            "mail2.company.com because it has the higher preference number",
            "mail1.company.com because lower preference numbers have higher priority",
            "Both servers receive mail simultaneously via round robin",
            "Whichever server responds first over UDP"
          ],
          "answer": 1,
          "explanation": "In DNS MX records, preference numbers define priority where the lowest integer has the highest priority. Senders attempt delivery to preference 10 first; preference 20 serves as backup."
        }
      ],
      "references": [
        { "cite": "RFC 1034: Domain Names - Concepts and Facilities (IETF)", "url": "https://datatracker.ietf.org/doc/html/rfc1034" },
        { "cite": "RFC 1035: Domain Names - Implementation and Specification (IETF)", "url": "https://datatracker.ietf.org/doc/html/rfc1035" },
        { "cite": "B.A. Forouzan, Data Communications and Networking, 4th Ed., McGraw-Hill, Chapter 25: Domain Name System", "url": "" }
      ]
    },
    "prevTopicId": null,
    "nextTopicId": "email-architecture"
  },

  "email-architecture": {
    "id": "email-architecture",
    "title": "E-Mail Architecture",
    "unit": "Unit 5 – Application Layer",
    "unitId": "unit5",
    "level": "Level 2 — Core Application Protocol",
    "category": "application",
    "difficulty": "Core",
    "readingTime": "25 min read",
    "standard": "RFC 5321 (SMTP) / RFC 1939 (POP3) / RFC 3501 (IMAP4) / Forouzan Ch. 26",
    "oneLiner": "Multi-stage message handling system utilizing User Agents, SMTP push relays, and POP3/IMAP4 mailbox retrieval protocols.",
    "quickAnswer": "The Electronic Mail system operates as an asynchronous store-and-forward architecture consisting of three core agents: User Agents (UA) for composing and reading mail, Message Transfer Agents (MTA) executing SMTP over TCP Port 25/587 to push messages across servers, and Message Access Agents (MAA) executing POP3 (Port 110/995) or IMAP4 (Port 143/993) to pull messages from server mailboxes to recipient devices.",
    "whyItMatters": "Unlike real-time protocols like HTTP where client and server must both be online simultaneously, email is inherently asynchronous. Senders and receivers are rarely online at the same time; mail spooling and relaying across mail servers ensure 100% reliable global message delivery across disparate operating systems and time zones.",
    "infobox": {
      "layer": "Application Layer (OSI Layer 7)",
      "standard": "RFC 5321 (SMTP), RFC 2045 (MIME), RFC 1939 (POP3), RFC 3501 (IMAP4)",
      "type": "Asynchronous Store-and-Forward Client-Server Architecture",
      "prerequisites": ["dns", "tcp"],
      "relatedConcepts": ["dns", "www", "http-architecture"],
      "compareWith": ["http-intro"],
      "primaryUses": [
        "Store-and-forward message transmission across wide-area networks",
        "MIME multipart attachment encoding (Base64 / Quoted-Printable)",
        "Server-to-server mail forwarding and relaying via DNS MX records",
        "Multi-device mailbox folder synchronization using IMAP4"
      ],
      "standardRfc": "RFC 5321 (SMTP), RFC 1939 (POP3), RFC 3501 (IMAP4)"
    },
    "learningObjectives": [
      "Trace Forouzan's 4 historical scenarios leading to modern email architecture",
      "Differentiate the roles of User Agent (UA), Message Transfer Agent (MTA), and Message Access Agent (MAA)",
      "Analyze the 3 phases of an SMTP session (Connection, Envelope/Data transfer, Termination) and response codes",
      "Distinguish between a Push protocol (SMTP) and a Pull protocol (POP3 / IMAP4)",
      "Compare POP3 (download-and-delete) with IMAP4 (server-synchronized hierarchical folders)",
      "Explain the function and encoding mechanisms of MIME (Multipurpose Internet Mail Extensions)"
    ],
    "prerequisitesList": [
      {
        "concept": "TCP Reliable Delivery",
        "meaning": "Understanding reliable stream delivery and 3-way handshaking on Ports 25, 587, 110, 143"
      },
      {
        "concept": "DNS MX Records",
        "meaning": "Knowing how sending mail servers resolve recipient domain names to mail server IPs"
      }
    ],
    "imageUrl": "assets/images/unit5/topic1/email-architecture-flow.svg",
    "imageCaption": "Figure 5.2: Complete E-Mail Architecture (Scenario 4) – UA, SMTP Push, MTA Relay, and POP3/IMAP4 Pull",
    "sections": {
      "overview": `
        <p class="mb-3">
          In early computer networks, electronic mail was implemented as a simple file-sharing utility on centralized timesharing mainframes (Forouzan Scenario 1). As networks evolved into interconnected personal computers and workstations that are intermittently disconnected or powered off, email required an asynchronous <strong>Store-and-Forward</strong> model.
        </p>
        <p class="mb-3">
          In the modern Internet (Forouzan Scenario 4), sending and receiving computers do not communicate directly. Instead, email delivery relies on two intermediate mail servers:
        </p>
        <div class="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-xs font-mono mb-3">
          Sender UA (Alice) ──[SMTP Push: 587]──▶ Sending Mail Server (MTA)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[SMTP Relay: 25] (Public Internet)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼<br/>
          Receiver UA (Bob) ◀──[POP3/IMAP Pull]── Receiving Mail Server (MTA/Mailbox)
        </div>
      `,
      "howItWorks": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. The Three Architectural Agents</h3>
        <ul class="list-disc pl-5 space-y-1.5 text-xs mb-4">
          <li><strong>User Agent (UA / MUA):</strong> The client software package providing the user interface (e.g., Mozilla Thunderbird, Microsoft Outlook, Apple Mail, Webmail). It prepares messages, formats headers, encapsulates attachments via MIME, and connects to mail servers.</li>
          <li><strong>Message Transfer Agent (MTA):</strong> The server-side mail transfer engine (e.g., Postfix, Sendmail, Exim). Runs a background daemon listening on TCP Port 25/587. Maintains an outgoing <strong>Spool Queue</strong>. If the remote receiver server is temporarily unreachable, the MTA retries periodically (e.g., every 30 minutes for 5 days) before generating a bounce notification (NDR).</li>
          <li><strong>Message Access Agent (MAA):</strong> Dedicated retrieval protocol daemon (e.g., Dovecot, Courier) allowing recipient UAs to authenticate and pull messages stored inside the user's server mailbox.</li>
        </ul>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. SMTP: Simple Mail Transfer Protocol (RFC 5321)</h3>
        <p class="mb-3 text-xs leading-relaxed">
          SMTP is a strictly client-driven <strong>Push protocol</strong>. The client pushes messages to the server. An SMTP session consists of 3 sequential phases:
        </p>
        <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs space-y-1 font-mono mb-4">
          <div class="text-emerald-600 font-bold">// Phase 1: Connection Establishment</div>
          <div>S: 220 mail.receiver.com ESMTP Postfix Ready</div>
          <div>C: EHLO mail.sender.com</div>
          <div>S: 250-mail.receiver.com Hello ... / 250 STARTTLS / 250 8BITMIME</div>
          <div class="text-emerald-600 font-bold mt-1">// Phase 2: Mail Envelope &amp; Message Body Transfer</div>
          <div>C: MAIL FROM:&lt;alice@sender.com&gt;</div>
          <div>S: 250 2.1.0 Ok</div>
          <div>C: RCPT TO:&lt;bob@receiver.com&gt;</div>
          <div>S: 250 2.1.5 Ok</div>
          <div>C: DATA</div>
          <div>S: 354 End data with &lt;CR&gt;&lt;LF&gt;.&lt;CR&gt;&lt;LF&gt;</div>
          <div>C: From: Alice &lt;alice@sender.com&gt;</div>
          <div>C: To: Bob &lt;bob@receiver.com&gt;</div>
          <div>C: Subject: Unit 5 Exam Schedule</div>
          <div>C: </div>
          <div>C: Hello Bob, Unit 5 exam covers DNS, Email, HTTP, P2P, and RSA.</div>
          <div>C: .</div>
          <div>S: 250 2.0.0 Ok: queued as 4Xq8Z129</div>
          <div class="text-emerald-600 font-bold mt-1">// Phase 3: Connection Termination</div>
          <div>C: QUIT</div>
          <div>S: 221 2.0.0 Bye</div>
        </div>
      `,
      "technicalDetails": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. Mail Access Protocols: POP3 vs. IMAP4 vs. Webmail</h3>
        <p class="mb-3 text-xs leading-relaxed">
          Because SMTP is purely a push protocol, a recipient PC cannot use SMTP to pull mail from its server. Retrieval requires an MAA protocol:
        </p>
        <table class="wiki-table w-full text-xs mb-4">
          <thead>
            <tr class="bg-amber-50 dark:bg-gray-800">
              <th>Criterion</th>
              <th>POP3 (Post Office Protocol v3)</th>
              <th>IMAP4 (Internet Message Access Protocol)</th>
              <th>Webmail (HTTP/HTTPS)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-bold">Standard RFC</td>
              <td>RFC 1939</td>
              <td>RFC 3501</td>
              <td>W3C / IETF HTTP/TLS</td>
            </tr>
            <tr>
              <td class="font-bold">Default Ports</td>
              <td>Port 110 (Cleartext) / 995 (POP3S)</td>
              <td>Port 143 (Cleartext) / 993 (IMAPS)</td>
              <td>Port 80 (HTTP) / 443 (HTTPS)</td>
            </tr>
            <tr>
              <td class="font-bold">Operating Model</td>
              <td>Download-and-Delete (or keep copy)</td>
              <td>Two-way Server Synchronization</td>
              <td>Browser rendering of web UI</td>
            </tr>
            <tr>
              <td class="font-bold">Multi-Device Support</td>
              <td>Poor (creates inconsistent local mailboxes)</td>
              <td>Excellent (all devices share identical folders)</td>
              <td>Excellent (zero client install)</td>
            </tr>
            <tr>
              <td class="font-bold">Folder Hierarchy</td>
              <td>Local only; no server folder support</td>
              <td>Nested folders managed on server</td>
              <td>Server managed</td>
            </tr>
            <tr>
              <td class="font-bold">Bandwidth Efficiency</td>
              <td>Downloads entire email including attachments</td>
              <td>Can download headers only; streams attachments on demand</td>
              <td>Server renders on demand</td>
            </tr>
          </tbody>
        </table>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">4. MIME: Multipurpose Internet Mail Extensions (RFC 2045)</h3>
        <p class="mb-3 text-xs leading-relaxed">
          Original SMTP was restricted to 7-bit NVT (Network Virtual Terminal) ASCII text. Transmission of 8-bit binary executables, PDF documents, high-resolution images, and non-Latin alphabets (Unicode/UTF-8) caused corruption. MIME wraps non-ASCII data inside standard ASCII headers:
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs mb-3">
          <li><strong>Content-Type:</strong> Defines media type and subtype (e.g. <code>text/html</code>, <code>image/png</code>, <code>application/pdf</code>, <code>multipart/mixed</code>).</li>
          <li><strong>Content-Transfer-Encoding:</strong> Specifies encoding algorithm:
            <ul class="list-circle pl-5 mt-1 space-y-0.5">
              <li><em>Base64:</em> Takes 3 raw bytes (24 bits) and splits them into four 6-bit groups (values 0–63), mapped to 64 safe ASCII characters (<code>A-Z</code>, <code>a-z</code>, <code>0-9</code>, <code>+</code>, <code>/</code>). Adds 33% overhead.</li>
              <li><em>Quoted-Printable:</em> Used when data is mostly ASCII text with occasional special characters. Replaces special bytes with an equals sign followed by two hex digits (e.g. <code>=E9</code> for é).</li>
            </ul>
          </li>
        </ul>
      `,
      "workedExamples": {
        "level1": `
          <strong>Base64 Encoding Walkthrough:</strong><br/>
          Encode the 3-letter word <code class="font-bold">"Cat"</code> into Base64:<br/>
          • Step 1: Look up ASCII values: 'C' = 67 (01000011), 'a' = 97 (01100001), 't' = 116 (01110100).<br/>
          • Step 2: Concatenate 24 bits: <code>01000011 01100001 01110100</code>.<br/>
          • Step 3: Regroup into 4 six-bit chunks:<br/>
            - Chunk 1: <code>010000</code> = Decimal 16 → Character <strong class="text-amber-600">Q</strong><br/>
            - Chunk 2: <code>110110</code> = Decimal 54 → Character <strong class="text-amber-600">2</strong><br/>
            - Chunk 3: <code>000101</code> = Decimal 5  → Character <strong class="text-amber-600">F</strong><br/>
            - Chunk 4: <code>110100</code> = Decimal 52 → Character <strong class="text-amber-600">0</strong><br/>
          • Resulting Base64 String: <code class="font-bold">"Q2F0"</code>.
        `,
        "level2": `
          <strong>Tracing SMTP Multi-Hop Routing via DNS:</strong><br/>
          When sending an email to <code>student@pondiuni.edu.in</code>:<br/>
          1. Sending MTA extracts domain: <code>pondiuni.edu.in</code>.<br/>
          2. Queries DNS for MX record: <code>pondiuni.edu.in IN MX 10 mail.pondiuni.edu.in</code>.<br/>
          3. Queries DNS for A record of <code>mail.pondiuni.edu.in</code> → returns <code>203.0.113.25</code>.<br/>
          4. Sending MTA establishes TCP connection to <code>203.0.113.25:25</code>.<br/>
          5. Conducts SMTP handshake, transfers message envelope, and queues it in receiver's spool!
        `,
        "level3": `
          <strong>Analyzing Email Security Headers:</strong><br/>
          Modern MTAs combat phishing and address spoofing using 3 DNS TXT technologies:<br/>
          • <strong>SPF (Sender Policy Framework):</strong> Recipient server checks if the sending MTA's IP is authorized in the sender's DNS TXT record.<br/>
          • <strong>DKIM (DomainKeys Identified Mail):</strong> Sending MTA attaches a cryptographic RSA digital signature header (<code>DKIM-Signature</code>). Recipient validates using the sender domain's public key from DNS.<br/>
          • <strong>DMARC:</strong> Specifies policy (reject, quarantine) if SPF or DKIM validation fails.
        `
      },
      "advantagesLimitations": `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Advantages of Modern E-Mail</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Asynchronous decoupling: Communicating parties do not need to be online simultaneously.</li>
              <li>MIME versatility: Transports any multimedia format worldwide.</li>
              <li>Universal interoperability: Heterogeneous mail servers running different OS communicate seamlessly.</li>
              <li>High delivery reliability: Automatic queuing and exponential backoff retry algorithms.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Architectural Limitations</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Original SMTP lacked sender authentication, leading to global spam and phishing vulnerabilities.</li>
              <li>Base64 encoding expands binary attachments by 33% in transmission size.</li>
              <li>POP3 protocol causes desynchronization when accessed across multiple mobile and laptop devices.</li>
            </ul>
          </div>
        </div>
      `,
      "whereUsed": [
        "Corporate Communications: Enterprise mail servers (Microsoft Exchange, Postfix)",
        "Consumer Webmail: Google Workspace / Gmail, Yahoo Mail, Outlook.com",
        "Automated Transaction Alerts: E-commerce receipts, one-time passwords (OTP), banking notifications",
        "System Log Alerts: Linux crontab and server monitoring daemon notifications",
        "Mailing Lists &amp; Newsletters: Mass mailing software (Mailchimp, SendGrid)"
      ],
      "commonMistakes": `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing the role of SMTP and POP3/IMAP:</strong> SMTP is strictly used to <em>push</em> mail (from client to server and server to server). POP3 and IMAP are strictly used to <em>pull</em> mail from the mailbox server to the client.</li>
          <li><strong>Believing email is an end-to-end real-time protocol:</strong> Email is hop-by-hop store-and-forward. Messages reside in server spool queues between hops.</li>
          <li><strong>Confusing SMTP Envelope with Message Headers:</strong> The SMTP envelope (<code>MAIL FROM</code>, <code>RCPT TO</code>) dictates actual delivery routing. The visual headers (<code>From:</code>, <code>To:</code> inside DATA) are displayed to the user and can be easily spoofed if not protected by SPF/DKIM.</li>
        </ul>
      `,
      "quiz": [
        {
          "question": "Why is POP3 generally unsuitable for users who read email across multiple devices (phone, laptop, desktop)?",
          "options": [
            "POP3 cannot transport MIME attachments",
            "POP3 by default downloads and deletes emails from the server, causing devices to have inconsistent mailboxes",
            "POP3 runs over UDP which causes packet loss on Wi-Fi",
            "POP3 requires root administrative privileges on client machines"
          ],
          "answer": 1,
          "explanation": "POP3 was designed for single-computer offline access. It downloads mail locally and removes it from the server, making messages inaccessible to other devices. IMAP4 solves this by synchronizing folders on the server."
        },
        {
          "question": "Which port and protocol are standardized for mail submission from an email client (MUA) to a sending mail server with authentication?",
          "options": ["TCP Port 25", "TCP Port 587 (Submission)", "UDP Port 110", "TCP Port 80"],
          "answer": 1,
          "explanation": "RFC 6409 standardizes TCP Port 587 for client-to-server mail submission (with mandatory authentication and STARTTLS encryption), reserving Port 25 primarily for server-to-server relaying."
        },
        {
          "question": "How much data expansion does Base64 encoding introduce when attaching binary files to an email?",
          "options": ["Zero expansion", "Approximately 33.3% expansion", "100% expansion", "50% reduction"],
          "answer": 1,
          "explanation": "Base64 takes every 3 bytes (24 bits) of binary data and represents them using 4 ASCII characters (4 bytes). The ratio is 4/3, representing a 33.33% expansion in size."
        },
        {
          "question": "In an SMTP transaction, what character sequence signals to the server that the message body input (DATA) is complete?",
          "options": ["QUIT\\r\\n", "A single dot on a line by itself: <CR><LF>.<CR><LF>", "END_MESSAGE", "Ctrl+C"],
          "answer": 1,
          "explanation": "RFC 5321 specifies that the DATA phase terminates when the client sends a single period (dot) on a line by itself, preceded and followed by CRLF (\\r\\n.\\r\\n)."
        }
      ],
      "references": [
        { "cite": "RFC 5321: Simple Mail Transfer Protocol (IETF)", "url": "https://datatracker.ietf.org/doc/html/rfc5321" },
        { "cite": "RFC 1939: Post Office Protocol - Version 3 (IETF)", "url": "https://datatracker.ietf.org/doc/html/rfc1939" },
        { "cite": "RFC 3501: Internet Message Access Protocol - Version 4rev1 (IETF)", "url": "https://datatracker.ietf.org/doc/html/rfc3501" },
        { "cite": "B.A. Forouzan, Data Communications and Networking, Chapter 26: Electronic Mail", "url": "" }
      ]
    },
    "prevTopicId": "dns",
    "nextTopicId": "www"
  },

  "www": {
    "id": "www",
    "title": "WWW (World Wide Web)",
    "unit": "Unit 5 – Application Layer",
    "unitId": "unit5",
    "level": "Level 1 — Fundamental Web Technology",
    "category": "application",
    "difficulty": "Core",
    "readingTime": "20 min read",
    "standard": "W3C Architecture of the World Wide Web / RFC 3986 (URI) / Forouzan Ch. 27",
    "oneLiner": "Global hypermedia information space where documents and web resources are identified by URLs and interconnected by hyperlinks.",
    "quickAnswer": "The World Wide Web (WWW) is a distributed client-server application architecture running on top of the Internet. Web resources are uniquely identified by Uniform Resource Locators (URLs), formatted using Hypertext Markup Language (HTML), styled with CSS, rendered interactive via JavaScript active documents, and transported across network sockets primarily using HTTP/HTTPS.",
    "whyItMatters": "The World Wide Web transformed the Internet from a specialized research and command-line text exchange into a universal graphical medium. It forms the foundation for modern global commerce, social networking, media streaming, SaaS cloud applications, and information discovery.",
    "infobox": {
      "layer": "Application Layer (OSI Layer 7)",
      "standard": "W3C HTML5 / RFC 3986 (URI) / IETF RFC 7230",
      "type": "Distributed Hypermedia Information System",
      "prerequisites": ["dns", "ip-addressing"],
      "relatedConcepts": ["http-intro", "http-architecture", "content-delivery"],
      "compareWith": ["http-intro"],
      "primaryUses": [
        "Global hyperlinked document publishing and navigation",
        "Web application client interface delivery (HTML/CSS/JS)",
        "Resource identification via standardized RFC 3986 URLs",
        "Session state tracking via HTTP Cookies and Web Storage"
      ],
      "standardRfc": "RFC 3986 (Uniform Resource Identifier), W3C Architecture of the WWW"
    },
    "learningObjectives": [
      "Distinguish between the physical Internet infrastructure and the logical World Wide Web service",
      "Break down the 5 components of a Uniform Resource Locator (URL) according to RFC 3986",
      "Examine the architectural components of a modern Web Browser (Controller, Parser, Rendering Engine, Sockets)",
      "Classify web documents into Static, Dynamic, and Active documents with real-world examples",
      "Explain the purpose, attributes (Secure, HttpOnly, SameSite), and operation of HTTP Cookies for state management"
    ],
    "prerequisitesList": [
      {
        "concept": "Client-Server Architecture",
        "meaning": "Understanding client request and server response transactions over network sockets"
      },
      {
        "concept": "DNS Resolution",
        "meaning": "Knowing how browser resolves domain names in URLs to server IP addresses"
      }
    ],
    "imageUrl": "assets/images/unit5/topic1/www-architecture.svg",
    "imageCaption": "Figure 5.3: World Wide Web Architecture – Browser Engine, URL Anatomy, Static/Dynamic/Active Documents",
    "sections": {
      "overview": `
        <p class="mb-3">
          It is crucial to distinguish between the <strong>Internet</strong> and the <strong>World Wide Web (WWW)</strong>. The Internet is the underlying physical and network routing infrastructure consisting of cables, routers, switches, IP addresses, and transport protocols. The World Wide Web is a distributed software service operating at the <strong>Application Layer</strong> of the Internet, invented in 1989 by Tim Berners-Lee at CERN.
        </p>
        <p class="mb-3">
          The Web relies on three foundational pillars:
        </p>
        <ol class="list-decimal pl-5 space-y-1 text-xs mb-3">
          <li><strong>Universal Addressing:</strong> Uniform Resource Locators (URLs) to name and locate every resource worldwide.</li>
          <li><strong>Standard Representation:</strong> Hypertext Markup Language (HTML) to structure hyperlinked documents.</li>
          <li><strong>Transport Protocol:</strong> Hypertext Transfer Protocol (HTTP) to fetch resources across client and server.</li>
        </ol>
      `,
      "howItWorks": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. Uniform Resource Locator (URL) Anatomy (RFC 3986)</h3>
        <p class="mb-3 text-xs leading-relaxed">
          A URL provides the unique global address used to retrieve any document on the web:
        </p>
        <div class="p-3 bg-slate-900 text-sky-300 rounded-lg text-xs font-mono mb-4 overflow-x-auto">
          https://www.pondiuni.edu.in:443/academics/syllabus.html?dept=cse&amp;unit=5#overview
        </div>
        <table class="wiki-table w-full text-xs mb-4">
          <thead>
            <tr class="bg-amber-50 dark:bg-gray-800">
              <th>Component</th>
              <th>Value in Example</th>
              <th>Technical Function</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="font-bold">Scheme / Protocol</td><td class="font-mono">https://</td><td>Specifies the application protocol (HTTP, HTTPS, FTP, WebSocket)</td></tr>
            <tr><td class="font-bold">Host / Domain</td><td class="font-mono">www.pondiuni.edu.in</td><td>Identifies target server (resolved to IP via DNS)</td></tr>
            <tr><td class="font-bold">Port Number</td><td class="font-mono">:443</td><td>TCP port (defaults to 80 for HTTP, 443 for HTTPS if omitted)</td></tr>
            <tr><td class="font-bold">Path</td><td class="font-mono">/academics/syllabus.html</td><td>Hierarchical file path or virtual routing endpoint on the server</td></tr>
            <tr><td class="font-bold">Query String</td><td class="font-mono">?dept=cse&amp;unit=5</td><td>Key-value parameters passed to server-side scripts</td></tr>
            <tr><td class="font-bold">Fragment Anchor</td><td class="font-mono">#overview</td><td>Client-side bookmark; browser scrolls to HTML element id="overview"</td></tr>
          </tbody>
        </table>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. Web Browser Internal Architecture</h3>
        <p class="mb-3 text-xs leading-relaxed">
          A modern browser is a complex operating-system-level application consisting of:
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs mb-4">
          <li><strong>User Interface (UI):</strong> Address bar, back/forward buttons, bookmarks menu.</li>
          <li><strong>Browser Controller Engine:</strong> Coordinates actions between UI and rendering engine.</li>
          <li><strong>Rendering Engine (Blink / Gecko / WebKit):</strong> Parses HTML into the Document Object Model (DOM) tree, parses CSS into CSSOM, calculates layout reflow, and paints pixels.</li>
          <li><strong>JavaScript Execution Engine (V8 / SpiderMonkey):</strong> Just-in-Time (JIT) compiler executing interactive script code.</li>
          <li><strong>Networking Module:</strong> Implements HTTP/1.1, HTTP/2, HTTP/3, TLS handshakes, DNS resolution, and connection pooling.</li>
          <li><strong>Data Storage:</strong> Cookie jar, LocalStorage, SessionStorage, IndexedDB, and disk cache.</li>
        </ul>
      `,
      "technicalDetails": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. Three Categories of Web Documents (Forouzan Section 27.2)</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-4">
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 class="font-bold text-blue-600 dark:text-blue-400 mb-1">A. Static Documents</h4>
            <p class="text-slate-600 dark:text-slate-400 mb-2">Pre-composed content created and stored on disk. Delivered byte-for-byte identically to every requester.</p>
            <div class="font-mono text-[10px] bg-slate-100 dark:bg-slate-900 p-1.5 rounded text-slate-700 dark:text-slate-300">
              Files: .html, .css, .png, .svg<br/>
              Pros: Instant caching, high speed<br/>
              Cons: Cannot personalize
            </div>
          </div>
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 class="font-bold text-emerald-600 dark:text-emerald-400 mb-1">B. Dynamic Documents</h4>
            <p class="text-slate-600 dark:text-slate-400 mb-2">Generated on-the-fly by server-side scripts (CGI, PHP, Python WSGI, Node.js) upon receipt of request.</p>
            <div class="font-mono text-[10px] bg-slate-100 dark:bg-slate-900 p-1.5 rounded text-slate-700 dark:text-slate-300">
              Scripts: index.php, /api/user<br/>
              Pros: Personalized database data<br/>
              Cons: Server CPU load, no static cache
            </div>
          </div>
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 class="font-bold text-purple-600 dark:text-purple-400 mb-1">C. Active Documents</h4>
            <p class="text-slate-600 dark:text-slate-400 mb-2">Executable program code transmitted from server to client and run inside the browser sandbox.</p>
            <div class="font-mono text-[10px] bg-slate-100 dark:bg-slate-900 p-1.5 rounded text-slate-700 dark:text-slate-300">
              Code: JavaScript, WebAssembly<br/>
              Pros: Rich UI, instant animations<br/>
              Cons: Security sandbox required
            </div>
          </div>
        </div>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">4. State Management with Cookies (RFC 6265)</h3>
        <p class="mb-3 text-xs leading-relaxed">
          Because HTTP is a stateless protocol, servers use cookies to correlate requests into a continuous session:
        </p>
        <ol class="list-decimal pl-5 space-y-1 text-xs mb-3">
          <li>Client submits login credentials via HTTP POST.</li>
          <li>Server authenticates user and returns response with header:
            <code class="block mt-1 p-1 bg-slate-100 dark:bg-slate-800 rounded font-mono text-[10.5px]">Set-Cookie: auth_id=987654321; Domain=pondiuni.edu.in; Path=/; Secure; HttpOnly; SameSite=Strict</code>
          </li>
          <li>Browser stores the cookie in its local cookie jar.</li>
          <li>For every subsequent request to <code>pondiuni.edu.in</code>, the browser automatically attaches:
            <code class="block mt-1 p-1 bg-slate-100 dark:bg-slate-800 rounded font-mono text-[10.5px]">Cookie: auth_id=987654321</code>
          </li>
        </ol>
      `,
      "workedExamples": {
        "level1": `
          <strong>Examining Cookie Security Attributes:</strong><br/>
          • <strong>Secure:</strong> Instructs browser to transmit the cookie ONLY over encrypted HTTPS connections (prevents plaintext sniffing on open Wi-Fi).<br/>
          • <strong>HttpOnly:</strong> Forbids client-side JavaScript from accessing the cookie via <code>document.cookie</code> (immunizes session against Cross-Site Scripting / XSS token theft).<br/>
          • <strong>SameSite=Strict:</strong> Forbids browser from sending the cookie in cross-site requests (protects against Cross-Site Request Forgery / CSRF attacks).
        `,
        "level2": `
          <strong>Tracing Complete Webpage Load:</strong><br/>
          User enters <code>http://example.com/index.html</code> containing 2 images:<br/>
          1. DNS resolution of <code>example.com</code> $\\to$ 93.184.216.34.<br/>
          2. TCP 3-way handshake to 93.184.216.34 on port 80.<br/>
          3. Browser transmits <code>GET /index.html HTTP/1.1</code>.<br/>
          4. Server responds with <code>200 OK</code> + HTML text.<br/>
          5. Browser parser discovers <code>&lt;img src="logo.png"&gt;</code> and <code>&lt;img src="photo.jpg"&gt;</code>.<br/>
          6. Browser issues two additional GET requests over the persistent socket.<br/>
          7. Rendering engine composites layout and displays the rendered page.
        `,
        "level3": `
          <strong>URL Encoding (Percent-Encoding, RFC 3986):</strong><br/>
          Certain characters are reserved or unsafe in URLs. Spaces must be encoded as <code>%20</code> or <code>+</code>. An ampersand inside a query parameter must be encoded as <code>%26</code> so it is not mistaken for a parameter separator:<br/>
          <code>https://example.com/search?query=Computer%20Networks%26Security</code>
        `
      },
      "advantagesLimitations": `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Advantages of WWW Architecture</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Universal accessibility: Any standard browser can access resources anywhere on earth.</li>
              <li>Separation of concerns: Presentation (HTML/CSS), Logic (JS), and Transport (HTTP) are cleanly decoupled.</li>
              <li>Hyperlinking model: Unbounded associative discovery of interconnected knowledge.</li>
              <li>Platform independence: Runs identically across desktop, mobile, tablet, and smart TVs.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Architectural Limitations</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Statelessness requires cookies and complex token management for user state.</li>
              <li>Security vulnerabilities: XSS, CSRF, and clickjacking exploit browser trust boundaries.</li>
              <li>Heavy client resource usage: Complex modern JavaScript active documents cause heavy memory consumption.</li>
            </ul>
          </div>
        </div>
      `,
      "whereUsed": [
        "E-Commerce: Amazon, Flipkart, online payment checkouts",
        "Social Networks: Twitter, LinkedIn, Instagram web interfaces",
        "Cloud Applications (SaaS): Google Docs, Figma, Microsoft 365 in browser",
        "Information Discovery: Wikipedia, academic repositories, digital libraries",
        "REST APIs: Client-server data exchange for mobile applications"
      ],
      "commonMistakes": `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing the Internet with the World Wide Web:</strong> The Internet is the global network of connected computers and routers. The Web is merely one of many services running on top of the Internet (along with email, FTP, BitTorrent, VoIP).</li>
          <li><strong>Believing URL fragment identifiers (#section) are sent to the web server:</strong> Fragment anchors are strictly client-side; browsers strip out everything after <code>#</code> before transmitting the HTTP request line.</li>
          <li><strong>Treating active documents as server-side execution:</strong> Active documents (JavaScript/WASM) execute exclusively on the client machine inside the browser sandbox, whereas dynamic documents execute on the server.</li>
        </ul>
      `,
      "quiz": [
        {
          "question": "Which component of a URL is used exclusively by the client browser and is NEVER transmitted to the web server in an HTTP request?",
          "options": ["The Query String (?key=value)", "The Fragment Identifier (#anchor)", "The Port Number (:80)", "The Path (/index.html)"],
          "answer": 1,
          "explanation": "RFC 3986 specifies that the fragment identifier (everything after '#') is used purely by client-side browser engines to jump to a specific element anchor on the page; it is never included in the HTTP request line sent over the wire."
        },
        {
          "question": "What is the primary difference between a Dynamic Web Document and an Active Web Document?",
          "options": [
            "Dynamic documents are encrypted; active documents are unencrypted",
            "Dynamic documents are created by programs running on the server; active documents are programs executed by the client browser",
            "Dynamic documents use UDP; active documents use TCP",
            "Active documents are stored as text; dynamic documents are stored as images"
          ],
          "answer": 1,
          "explanation": "As defined in Forouzan Section 27.2, dynamic documents are generated on-the-fly by server-side processes (PHP, Python, CGI), whereas active documents consist of executable scripts (JavaScript, WASM) downloaded to and executed by the client's browser engine."
        },
        {
          "question": "Which HTTP Cookie security attribute prevents malicious JavaScript from accessing session tokens via 'document.cookie' during a Cross-Site Scripting (XSS) attack?",
          "options": ["Secure", "HttpOnly", "SameSite=Lax", "Path=/"],
          "answer": 1,
          "explanation": "The 'HttpOnly' flag instructs the browser that the cookie should not be accessible through client-side scripts, protecting sensitive session tokens from being stolen during XSS exploits."
        }
      ],
      "references": [
        { "cite": "RFC 3986: Uniform Resource Identifier (URI): Generic Syntax (IETF)", "url": "https://datatracker.ietf.org/doc/html/rfc3986" },
        { "cite": "RFC 6265: HTTP State Management Mechanism (Cookies)", "url": "https://datatracker.ietf.org/doc/html/rfc6265" },
        { "cite": "B.A. Forouzan, Data Communications and Networking, Chapter 27: WWW and HTTP", "url": "" }
      ]
    },
    "prevTopicId": "email-architecture",
    "nextTopicId": "http-intro"
  }
};

