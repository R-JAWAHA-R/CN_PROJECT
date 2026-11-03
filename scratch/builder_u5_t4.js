// Topic 4: Peer-to-Peer Networks and Network Protection
module.exports = {
  "p2p-networks": {
    "id": "p2p-networks",
    "title": "Peer-to-Peer Networks",
    "unit": "Unit 5 – Application Layer",
    "unitId": "unit5",
    "level": "Level 2 — Distributed Systems Paradigm",
    "category": "application",
    "difficulty": "Core",
    "readingTime": "25 min read",
    "standard": "BitTorrent Specification (BEP 0003) / Kurose & Ross Chapter 2.5",
    "oneLiner": "Decentralized network architecture where equipotent participant nodes share computing resources and bandwidth directly without centralized servers.",
    "quickAnswer": "A Peer-to-Peer (P2P) network is a distributed computing paradigm where arbitrary pairs of end systems (peers) communicate directly with one another. Unlike the client-server model, peers act as both clients and servers (servents), contributing their own upload bandwidth and storage to the system. This creates a self-scaling architecture where total system capacity increases organically as more users join.",
    "whyItMatters": "P2P networks enable massive file distribution (such as Linux OS ISOs, game patches, and blockchain transactions) without requiring millions of dollars in centralized server infrastructure. Its self-scaling upload bandwidth makes it virtually immune to the server bottlenecks that cripple client-server models.",
    "infobox": {
      "layer": "Application Layer (OSI Layer 7)",
      "standard": "BitTorrent BEP 0003, Kademlia DHT, RFC 5694",
      "type": "Decentralized Distributed Architecture",
      "prerequisites": ["http-intro", "tcp"],
      "relatedConcepts": ["content-delivery", "server-farms", "firewalls"],
      "compareWith": ["server-farms"],
      "primaryUses": [
        "Massive software and media distribution (BitTorrent)",
        "Decentralized cryptocurrency ledgers (Bitcoin, Ethereum)",
        "Distributed Hash Table lookups (Kademlia, IPFS)",
        "Voice-over-IP signaling and routing (Skype early architecture)"
      ],
      "standardRfc": "BEP 0003, RFC 5694"
    },
    "learningObjectives": [
      "Compare the mathematical file distribution times of Client-Server vs. P2P architectures",
      "Trace the 3 architectural generations of P2P: Centralized (Napster), Decentralized Unstructured (Gnutella), and Distributed Hash Tables (Chord/Kademlia)",
      "Analyze the core mechanics of BitTorrent: Torrent files, Swarms, Trackers, Seeds, and Leeches",
      "Explain the Rarest-First chunk selection strategy used to maintain chunk diversity",
      "Describe the Tit-for-Tat (Choking) incentive algorithm and Optimistic Unchoking"
    ],
    "prerequisitesList": [
      {
        "concept": "Client-Server Paradigm",
        "meaning": "Understanding server upload capacity constraints and client download dependencies"
      },
      {
        "concept": "Hash Functions (SHA-1)",
        "meaning": "Familiarity with cryptographic digests used for chunk integrity verification"
      }
    ],
    "imageUrl": "assets/images/unit5/topic4/p2p-networks.svg",
    "imageCaption": "Figure 5.11: Centralized Client-Server Bottleneck vs. Self-Scaling P2P BitTorrent Swarm Architecture",
    "sections": {
      "overview": `
        <p class="mb-3">
          In the traditional <strong>Client-Server architecture</strong>, the server is an always-on host with a fixed IP address that must fulfill every client request. As the number of requesting clients $N$ grows into thousands or millions, the server's upload link becomes a severe performance bottleneck, and server infrastructure costs explode linearly.
        </p>
        <p class="mb-3">
          <strong>Peer-to-Peer (P2P) architecture</strong> inverts this relationship. Rather than relying on dedicated data center servers, P2P exploits direct communication between desktop and laptop computers connected across the Internet edge. Because each peer uploads data to other peers while downloading, <strong>the system's total upload capacity scales automatically with user demand</strong>.
        </p>
      `,
      "howItWorks": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. Mathematical Distribution Time Comparison</h3>
        <p class="mb-3 text-xs leading-relaxed">
          Suppose a file of size $F$ bits must be distributed to $N$ peers. The server has upload rate $u_s$. Each peer $i$ has download rate $d_i$ and upload rate $u_i$.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-1">A. Client-Server Distribution Time ($D_{CS}$)</h4>
            <div class="p-2 bg-white dark:bg-slate-900 rounded font-mono my-1 text-[11px]">
              D_CS &ge; max { (N * F) / u_s ,  F / d_min }
            </div>
            <p class="text-slate-600 dark:text-slate-400 mt-1">
              Because the server must transmit $N$ copies of file $F$, as $N \to \infty$, the distribution time <strong>increases linearly without bound ($O(N)$)</strong>!
            </p>
          </div>
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-1">B. Peer-to-Peer Distribution Time ($D_{P2P}$)</h4>
            <div class="p-2 bg-white dark:bg-slate-900 rounded font-mono my-1 text-[11px]">
              D_P2P &ge; max { F / u_s ,  F / d_min ,  (N * F) / (u_s + &Sigma; u_i) }
            </div>
            <p class="text-slate-600 dark:text-slate-400 mt-1">
              Because every client brings its own upload speed $u_i$, as $N \to \infty$, distribution time <strong>approaches a constant asymptote ($O(1)$)</strong>!
            </p>
          </div>
        </div>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. P2P Architectural Evolution</h3>
        <ul class="list-disc pl-5 space-y-1.5 text-xs mb-4">
          <li><strong>1st Generation — Centralized Directory (Napster, 1999):</strong> Centralized servers maintained the index of file names and peer IP addresses. File transfer was direct P2P, but index search was centralized (vulnerable to single-point failure and legal injunctions).</li>
          <li><strong>2nd Generation — Query Flooding (Gnutella, 2000):</strong> Pure decentralized unstructured network. Searches propagated via breadth-first search flooding with a TTL (Time-To-Live). Suffered massive network broadcast congestion.</li>
          <li><strong>3rd Generation — Structured P2P &amp; DHTs (Chord / Kademlia / BitTorrent):</strong> Nodes and files are mapped into a virtual key space using consistent hashing (SHA-1 160-bit integer ring). Lookups resolve efficiently in $O(\log N)$ hops with finger tables.</li>
        </ul>
      `,
      "technicalDetails": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. BitTorrent Protocol Mechanics (BEP 0003)</h3>
        <p class="mb-3 text-xs leading-relaxed">
          BitTorrent, designed by Bram Cohen in 2001, is the most successful file distribution protocol in networking history:
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs mb-4">
          <li><strong>Torrent File (.torrent):</strong> Metadata file containing tracker URLs and a SHA-1 hash dictionary of every <strong>chunk</strong> (typically 256KB to 1MB each).</li>
          <li><strong>Swarm:</strong> The collective pool of all peers sharing a particular torrent.
            <ul class="list-circle pl-5 mt-1 space-y-0.5">
              <li><em>Seeds:</em> Peers possessing 100% of the file chunks who only upload.</li>
              <li><em>Leeches:</em> Peers currently downloading chunks while uploading whatever pieces they already hold.</li>
            </ul>
          </li>
          <li><strong>Rarest-First Chunk Selection:</strong> When choosing which chunk to download next, a peer queries its neighbors to find which chunk is the rarest across the swarm. This replicates scarce chunks rapidly, preventing chunk extinction if the original seeder leaves!</li>
          <li><strong>Tit-for-Tat Incentive Algorithm:</strong> Prevents "free-riding" (users downloading without uploading):
            <ol class="list-decimal pl-5 mt-1 space-y-0.5">
              <li>Every 10 seconds, Alice measures download rates from all peers and <strong>unchokes</strong> (uploads to) the top 4 fastest uploaders.</li>
              <li>Every 30 seconds, Alice performs <strong>Optimistic Unchoking</strong>: she randomly unchokes one arbitrary peer. This allows new joining peers to receive chunks and helps Alice discover faster partners.</li>
            </ol>
          </li>
        </ul>
      `,
      "workedExamples": {
        "level1": `
          <strong>Numerical Distribution Time Calculation:</strong><br/>
          Given: File size $F = 15\\text{ GB} = 15,000\\text{ MB}$. Server upload $u_s = 30\\text{ MB/s}$. Number of clients $N = 1000$. Each client has download $d = 5\\text{ MB/s}$ and upload $u = 1\\text{ MB/s}$.<br/>
          • <strong>Client-Server:</strong><br/>
            $D_{CS} = (N \\times F) / u_s = (1000 \\times 15,000) / 30 = 500,000\\text{ seconds} \\approx \\mathbf{138.8\\text{ hours}}$ (almost 6 days!).<br/>
          • <strong>Peer-to-Peer:</strong><br/>
            $D_{P2P} = (N \\times F) / (u_s + N \\cdot u) = 15,000,000 / (30 + 1000 \\times 1) = 15,000,000 / 1030 \\approx \\mathbf{14,563\\text{ seconds}} \\approx \\mathbf{4.04\\text{ hours}}$!<br/>
          <em>Result:</em> P2P is over <strong class="text-emerald-600">34× faster</strong>!
        `,
        "level2": `
          <strong>Trackerless Torrents with Kademlia DHT:</strong><br/>
          Modern BitTorrent uses Distributed Hash Tables (Mainline DHT):<br/>
          • Eliminates centralized tracker servers entirely.<br/>
          • Each peer acts as a DHT node maintaining a routing table organized into $k$-buckets based on XOR metric distance ($d(x, y) = x \\oplus y$).<br/>
          • Info-hash of the torrent acts as the key to locate peers in the swarm.
        `,
        "level3": `
          <strong>NAT Traversal in P2P (STUN &amp; TURN):</strong><br/>
          Most home peers sit behind private NAT routers (e.g. 192.168.1.10) and cannot receive direct inbound TCP connections.<br/>
          • P2P clients use <strong>STUN (Session Traversal Utilities for NAT, RFC 5389)</strong> and UDP Hole Punching to discover their external public IP:port mapping.<br/>
          • Enables direct peer-to-peer UDP packet traversal through consumer firewalls.
        `
      },
      "advantagesLimitations": `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">P2P Strengths</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Self-scaling upload capacity: Cost of distribution does not grow with user base.</li>
              <li>Fault tolerance: No single point of failure; robust against peer churn.</li>
              <li>High aggregate download speeds for popular files.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Vulnerabilities &amp; Challenges</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>High churn: Consumer peers disconnect unpredictably.</li>
              <li>Free-riding: Selfish users who download but cap upload bandwidth.</li>
              <li>ISP bandwidth throttling: ISPs frequently throttle residential BitTorrent protocol signatures.</li>
            </ul>
          </div>
        </div>
      `,
      "whereUsed": [
        "Open-Source Software: Ubuntu, Fedora, Debian distributing multi-gigabyte OS ISO images",
        "Gaming Industry: Blizzard (Battle.net), Epic Games distributing multi-gigabyte game patches",
        "Cryptocurrency Blockchains: Bitcoin Core and Ethereum P2P node block propagation",
        "Decentralized Storage: InterPlanetary File System (IPFS) and Web3 content pinning",
        "Academic Data: CERN LHC distributing petabytes of particle collision datasets"
      ],
      "commonMistakes": `
        <ul class="space-y-2 text-xs">
          <li><strong>Believing P2P is inherently illegal:</strong> P2P is a neutral network architecture. Legitimate organizations (Linux distributors, game studios, government agencies) use P2P to distribute large open datasets and save millions in bandwidth.</li>
          <li><strong>Confusing a Tracker with a File Server:</strong> The BitTorrent tracker never stores or uploads the actual file data. It only holds a small text list of active IP addresses and ports participating in the swarm.</li>
        </ul>
      `,
      "quiz": [
        {
          "question": "What is the primary reason why P2P file distribution time approaches a constant bound as the number of clients N approaches infinity?",
          "options": [
            "P2P networks disable encryption",
            "Every joining peer brings additional upload bandwidth to the system, offsetting the increased demand",
            "P2P routers use fiber optics only",
            "All peers must have supercomputer hardware"
          ],
          "answer": 1,
          "explanation": "In P2P, each peer is both a consumer and a contributor. Because total upload capacity increases in direct proportion to N, total distribution time scales organically as O(1)."
        },
        {
          "question": "In the BitTorrent protocol, why do peers download chunks using the 'Rarest-First' strategy?",
          "options": [
            "To encrypt the data faster",
            "To prevent scarce chunks from disappearing from the swarm if seeders leave, and to ensure even chunk distribution",
            "To reduce hard drive wear",
            "To bypass corporate firewalls"
          ],
          "answer": 1,
          "explanation": "Rarest-first ensures that pieces held by the fewest peers are replicated across the swarm immediately, maintaining chunk diversity and preventing download stalls if the original seeder disconnects."
        },
        {
          "question": "How often does a BitTorrent client perform 'Optimistic Unchoking' to discover potentially faster peer connections?",
          "options": ["Every 1 millisecond", "Every 30 seconds", "Once a day", "Only when restarting"],
          "answer": 1,
          "explanation": "Standard BitTorrent specification mandates that every 30 seconds, a client randomly unchokes one arbitrary peer (optimistic unchoking) to find better upload partners and bootstrap newly joined peers."
        }
      ],
      "references": [
        { "cite": "BitTorrent Protocol Specification (BEP 0003)", "url": "https://www.bittorrent.org/beps/bep_0003.html" },
        { "cite": "Maymounkov, P., & Mazieres, D. (2002). Kademlia: A Peer-to-Peer Information System Based on the XOR Metric", "url": "https://doi.org/10.1007/3-540-45748-8_5" },
        { "cite": "J.F. Kurose & K.W. Ross, Computer Networking, Chapter 2.5: Peer-to-Peer Applications", "url": "" }
      ]
    },
    "prevTopicId": "web-proxies",
    "nextTopicId": "firewalls"
  },

  "firewalls": {
    "id": "firewalls",
    "title": "Firewalls",
    "unit": "Unit 5 – Application Layer",
    "unitId": "unit5",
    "level": "Level 2 — Perimeter Security Architecture",
    "category": "security",
    "difficulty": "Core",
    "readingTime": "30 min read",
    "standard": "NIST SP 800-41 / Forouzan Chapter 32.4 / Stallings Cryptography & Network Security Ch. 20",
    "oneLiner": "Network security device that monitors and filters incoming and outgoing traffic based on an organization's security policy.",
    "quickAnswer": "A Firewall is a security system that acts as an electronic barrier between a trusted internal network (LAN) and an untrusted external network (Internet). Classified by NIST SP 800-41 into Packet-Filtering Firewalls (inspecting L3/L4 IP/Port headers), Stateful Inspection Firewalls (tracking TCP connection lifecycles in state tables), and Application-Level Gateways (Proxy Firewalls inspecting Layer 7 payloads). It establishes a Demilitarized Zone (DMZ) to isolate public servers from corporate databases.",
    "whyItMatters": "Firewalls represent the primary line of perimeter defense against unauthorized access, port scans, malware propagation, and external cyberattacks. Without firewalls, every internal host on a network would be directly exposed to automated Internet exploit scripts.",
    "infobox": {
      "layer": "Operates across Network (L3), Transport (L4), and Application (L7)",
      "standard": "NIST Special Publication 800-41 Rev. 1, IETF RFC 2979",
      "type": "Network Perimeter Security & Access Control",
      "prerequisites": ["ip-addressing", "tcp"],
      "relatedConcepts": ["ids", "web-proxies", "server-farms"],
      "compareWith": ["ids"],
      "primaryUses": [
        "Inbound and outbound network access control (ACLs)",
        "Stateful TCP handshake tracking and spoofed packet dropping",
        "Perimeter network segmentation via Demilitarized Zones (DMZ)",
        "Application layer threat inspection and protocol anomaly blocking"
      ],
      "standardRfc": "NIST SP 800-41, RFC 2979"
    },
    "learningObjectives": [
      "Define a firewall and contrast Default-Deny (whitelisting) with Default-Allow (blacklisting) security postures",
      "Compare the 3 major firewall types: Packet-Filter (Stateless), Stateful Inspection, and Application-Level Proxy",
      "Analyze the structure and rule processing order of a firewall Access Control List (ACL)",
      "Examine state table mechanics: Tracking SYN, SYN-ACK, ESTABLISHED, and FIN/RST states",
      "Design a secure Demilitarized Zone (DMZ) architecture isolating public web/mail servers from internal LAN databases"
    ],
    "prerequisitesList": [
      {
        "concept": "IP and TCP Headers",
        "meaning": "Understanding IP addresses, port numbers, and TCP control flags (SYN, ACK, RST, FIN)"
      },
      {
        "concept": "Network Topologies",
        "meaning": "Familiarity with LAN, WAN, and router subnet interfaces"
      }
    ],
    "imageUrl": "assets/images/unit5/topic4/firewalls.svg",
    "imageCaption": "Figure 5.12: Dual-Homed Firewall Architecture, Demilitarized Zone (DMZ), and Stateful Packet Inspection",
    "sections": {
      "overview": `
        <p class="mb-3">
          As defined in McGraw-Hill Forouzan Section 32.4, a <strong>Firewall</strong> is a device (usually a router or a dedicated computer) installed between the internal network of an organization and the rest of the Internet. It is designed to forward some packets and filter (drop) others according to a predetermined security policy.
        </p>
        <p class="mb-3">
          A firewall controls access to the organization's network by acting as a packet filter or an application proxy. A firewall can filter at the network layer, transport layer, or application layer.
        </p>
      `,
      "howItWorks": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. The Three Major Types of Firewalls (Forouzan Section 32.4)</h3>
        
        <h4 class="text-xs font-bold text-blue-700 dark:text-blue-400 mt-2 mb-1">A. Packet-Filter Firewall (Stateless / L3 &amp; L4)</h4>
        <p class="text-xs mb-2">
          Filters packets based on information available in the network layer and transport layer headers:
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs mb-3">
          <li>Source and Destination IP addresses</li>
          <li>Transport protocol (TCP, UDP, ICMP)</li>
          <li>Source and Destination port numbers (e.g. Port 80, Port 22)</li>
          <li>TCP flags (SYN, ACK, RST, FIN) and ICMP message type</li>
        </ul>
        <div class="p-2.5 bg-slate-100 dark:bg-slate-800 rounded font-mono text-[10.5px] mb-4">
          // Sample Stateless ACL Table:<br/>
          Rule 1: ALLOW INBOUND  SRC: *  DST: 203.0.113.10  PORT: 80,443  TCP  // Public Web<br/>
          Rule 2: ALLOW OUTBOUND SRC: 192.168.1.0/24  DST: *  PORT: *     TCP  // LAN outbound<br/>
          Rule 3: DROP  INBOUND  SRC: *  DST: *              PORT: *     ALL  // Default Deny
        </div>

        <h4 class="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-2 mb-1">B. Stateful Inspection Firewall</h4>
        <p class="text-xs mb-2">
          Stateless packet filters cannot distinguish between a TCP packet that starts a new connection and one that belongs to an existing legitimate session. Stateful inspection maintains an active in-memory <strong>State Table</strong>:
        </p>
        <ol class="list-decimal pl-5 space-y-1 text-xs mb-3">
          <li>When an internal client (192.168.1.50) sends a TCP SYN packet to an external web server, the firewall records the tuple <code>&lt;SrcIP, DstIP, SrcPort, DstPort, State=SYN_SENT&gt;</code> in its state table.</li>
          <li>When the server's SYN-ACK arrives, the firewall matches it against the table and allows it through, updating state to <code>ESTABLISHED</code>.</li>
          <li>Any inbound packet with SYN or ACK that does not match an existing state table entry is immediately dropped!</li>
        </ol>

        <h4 class="text-xs font-bold text-purple-700 dark:text-purple-400 mt-2 mb-1">C. Application-Level Gateway (Proxy Firewall / L7)</h4>
        <p class="text-xs mb-2">
          Filters messages based on information inside the application layer payload itself (HTTP URLs, SQL queries, SMTP commands):
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs mb-4">
          <li>Terminates the client's TCP socket; inspects the entire payload for malware or SQL injection.</li>
          <li>Creates a separate outbound socket to the destination server if valid.</li>
          <li>Deep Packet Inspection (DPI) provides maximum security at the cost of higher CPU overhead.</li>
        </ul>
      `,
      "technicalDetails": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. Demilitarized Zone (DMZ) Network Topology</h3>
        <p class="mb-3 text-xs leading-relaxed">
          In enterprise network security, placing public web servers directly on the corporate LAN is fatal: if the web server is compromised via an unpatched vulnerability, the attacker instantly gains root access to internal employee machines and databases.
        </p>
        <p class="mb-3 text-xs leading-relaxed">
          The <strong>Demilitarized Zone (DMZ)</strong> creates a semi-trusted buffer subnet between the public Internet and the internal corporate LAN:
        </p>
        <div class="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-800 text-xs mb-4">
          <div class="font-bold text-amber-900 dark:text-amber-300 mb-1">DMZ Firewall Security Rules:</div>
          <ul class="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Rule 1 (Internet → DMZ):</strong> External Internet traffic is permitted ONLY to DMZ servers on specific ports (Port 80/443 for Web, Port 25 for Mail, Port 53 for DNS).</li>
            <li><strong>Rule 2 (Internet → Internal LAN):</strong> STRICTLY BLOCKED. External Internet can NEVER access the private LAN directly.</li>
            <li><strong>Rule 3 (DMZ → Internal LAN):</strong> STRICTLY BLOCKED. DMZ servers CANNOT initiate connections to internal database servers. (The internal database or app server pulls or communicates over strictly authenticated isolated channels).</li>
            <li><em>Defense-in-Depth Result:</em> Even if an attacker completely takes over the DMZ web server, they are trapped in the DMZ and cannot pivot into the core corporate LAN!</li>
          </ul>
        </div>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. Default-Deny vs. Default-Allow Security Posture</h3>
        <table class="wiki-table w-full text-xs mb-4">
          <thead>
            <tr class="bg-amber-50 dark:bg-gray-800">
              <th>Security Posture</th>
              <th>Operational Rule</th>
              <th>Security Rating</th>
              <th>Administrative Overhead</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-bold">Default-Deny (Whitelisting)</td>
              <td>Blocks all traffic unless explicitly permitted by an ACL rule</td>
              <td>Highest (Recommended by NIST)</td>
              <td>Requires careful documentation of all legitimate business ports</td>
            </tr>
            <tr>
              <td class="font-bold">Default-Allow (Blacklisting)</td>
              <td>Permits all traffic unless explicitly blocked by a signature rule</td>
              <td>Extremely Low (Insecure)</td>
              <td>Vulnerable to any unknown port or novel attack vector</td>
            </tr>
          </tbody>
        </table>
      `,
      "workedExamples": {
        "level1": `
          <strong>Constructing a Stateful Linux Iptables Rule:</strong><br/>
          To configure stateful filtering on Linux:<br/>
          <pre class="bg-slate-900 text-green-400 p-2 rounded text-[10.5px] font-mono mt-1"># Allow return traffic for already established connections
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# Allow new inbound web traffic to Port 80 and 443
iptables -A INPUT -p tcp --dport 80 -m conntrack --ctstate NEW -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -m conntrack --ctstate NEW -j ACCEPT

# Default Policy: Drop everything else
iptables -P INPUT DROP</pre>
        `,
        "level2": `
          <strong>Preventing IP Spoofing at Border Firewalls:</strong><br/>
          An attacker on the external Internet transmits malicious packets with forged internal source IP <code>192.168.1.50</code> (RFC 1918 private address):<br/>
          • <strong>Egress / Ingress Filter Rule:</strong> The external firewall drops any packet arriving on its public WAN interface whose source IP belongs to internal private IP ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, or 127.0.0.0/8).<br/>
          • Immediately neutralizes IP spoofing attacks!
        `,
        "level3": `
          <strong>Dual-Homed vs Screened Subnet DMZ:</strong><br/>
          • <em>Three-Homed Firewall:</em> A single physical firewall appliance with 3 network interface cards (NICs): Interface 1 (WAN), Interface 2 (DMZ), Interface 3 (LAN). Low cost, but represents single failure point.<br/>
          • <em>Screened Subnet (Dual Firewalls):</em> Uses TWO separate firewalls from DIFFERENT vendors (e.g. Cisco externally, Palo Alto internally). If an attacker finds a zero-day vulnerability in Cisco, they are still blocked by Palo Alto!
        `
      },
      "advantagesLimitations": `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Firewall Strengths</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Enforces centralized security policy at network perimeter.</li>
              <li>Stateful inspection stops unsolicited connection probes.</li>
              <li>DMZ network segmentation traps breaches before reaching core databases.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">What Firewalls CANNOT Do</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Cannot stop insider threats or malicious employees within the LAN.</li>
              <li>Cannot protect against attacks that bypass the firewall (e.g. infected USB drives or 4G/5G tethering).</li>
              <li>Cannot detect application vulnerabilities (SQLi, XSS) over open Port 443 unless combined with a WAF or NGFW.</li>
            </ul>
          </div>
        </div>
      `,
      "whereUsed": [
        "Enterprise Perimeters: Cisco ASA, Palo Alto Networks, Fortinet FortiGate appliances",
        "Operating System Firewalls: Windows Defender Firewall, Linux iptables/nftables, macOS pf",
        "Cloud Virtual Private Clouds: AWS Security Groups, Network ACLs, Azure Network Security Groups",
        "Home Routers: Built-in NAT and SPI (Stateful Packet Inspection) firewalls",
        "Web Application Firewalls (WAF): ModSecurity, AWS WAF, Cloudflare WAF"
      ],
      "commonMistakes": `
        <ul class="space-y-2 text-xs">
          <li><strong>Believing a firewall provides 100% security:</strong> A firewall only protects the perimeter. If port 443 is open for web traffic, attackers can still launch SQL injection or exploit server software over port 443.</li>
          <li><strong>Confusing Stateless with Stateful firewalls:</strong> Stateless packet filters examine packets in total isolation. Stateful firewalls maintain connection tables tracking whether an incoming packet is a legitimate reply to an internal request.</li>
        </ul>
      `,
      "quiz": [
        {
          "question": "What is the primary operational rule of a 'Default-Deny' firewall security policy?",
          "options": [
            "All network traffic is denied unless it is explicitly permitted by an access control rule",
            "All traffic is allowed unless specifically blocked",
            "Only traffic during business hours is permitted",
            "Passwords must be changed daily"
          ],
          "answer": 0,
          "explanation": "Default-Deny (whitelisting) drops all incoming and outgoing packets by default; only traffic matching explicit allow rules is permitted through the firewall."
        },
        {
          "question": "Why are public-facing web and mail servers placed inside a Demilitarized Zone (DMZ) rather than directly inside the internal corporate LAN?",
          "options": [
            "DMZ servers run faster because they do not use electricity",
            "To isolate public-facing servers so that if a web server is compromised, the attacker cannot directly access sensitive internal LAN systems and databases",
            "DMZ servers do not require IP addresses",
            "To avoid paying domain registration fees"
          ],
          "answer": 1,
          "explanation": "The DMZ provides a segregated perimeter buffer zone. Even if an attacker gains control of a public-facing web server, strict firewall rules prevent them from reaching internal corporate databases and user PCs."
        },
        {
          "question": "Which type of firewall maintains an in-memory table tracking active TCP sequence numbers, flags, and connection states to permit legitimate return traffic?",
          "options": ["Stateless Packet Filter", "Stateful Inspection Firewall", "Hub", "Unmanaged Switch"],
          "answer": 1,
          "explanation": "A Stateful Inspection Firewall maintains a state table tracking the lifecycle of established connections, automatically allowing return traffic that belongs to an internal client's active session."
        }
      ],
      "references": [
        { "cite": "NIST Special Publication 800-41 Rev. 1: Guidelines on Firewalls and Firewall Policy", "url": "https://csrc.nist.gov/publications/detail/sp/800-41/rev-1/final" },
        { "cite": "B.A. Forouzan, Data Communications and Networking, Chapter 32.4: Firewalls", "url": "" },
        { "cite": "W. Stallings, Cryptography and Network Security, Chapter 20: Firewalls", "url": "" }
      ]
    },
    "prevTopicId": "p2p-networks",
    "nextTopicId": "ids"
  },

  "ids": {
    "id": "ids",
    "title": "Intrusion Detection System (IDS)",
    "unit": "Unit 5 – Application Layer",
    "unitId": "unit5",
    "level": "Level 2 — Threat Detection & Incident Response",
    "category": "security",
    "difficulty": "Core",
    "readingTime": "25 min read",
    "standard": "NIST SP 800-94 / Forouzan Chapter 32.4 / RFC 4765",
    "oneLiner": "Passive and active monitoring system that analyzes network and host events to identify cyberattacks, policy violations, and unauthorized intrusions.",
    "quickAnswer": "An Intrusion Detection System (IDS) is a security software or appliance that monitors network traffic and host activities for suspicious events or policy violations, alerting administrators via a Security Information and Event Management (SIEM) console. Classified by deployment into Network-based (NIDS) and Host-based (HIDS), and by detection method into Signature-based (matching known attack patterns) and Anomaly-based (detecting deviations from normal baseline behavior). An Intrusion Prevention System (IPS) extends this by sitting inline to actively drop malicious packets in real time.",
    "whyItMatters": "Firewalls act like physical security gates: they verify credentials (IP/Port), but cannot tell if an authorized visitor is carrying a concealed weapon. An IDS/IPS acts like a security scanner or metal detector: it inspects packet payloads to detect malware, exploits, and lateral movements that pass cleanly through firewall rules.",
    "infobox": {
      "layer": "Operates across Network (L3) through Application (L7)",
      "standard": "NIST SP 800-94 (Guide to IDPS), RFC 4765 (IDMEF)",
      "type": "Threat Detection & Active Prevention Architecture",
      "prerequisites": ["firewalls", "tcp", "http-request-response"],
      "relatedConcepts": ["firewalls", "intro-cryptography"],
      "compareWith": ["firewalls"],
      "primaryUses": [
        "Network-wide exploit detection (Snort, Zeek, Suricata)",
        "Host integrity and log monitoring (OSSEC, Wazuh)",
        "Real-time automated exploit blocking (Inline IPS / NGFW)",
        "Security Information and Event Management (SIEM) alert aggregation"
      ],
      "standardRfc": "NIST SP 800-94, RFC 4765"
    },
    "learningObjectives": [
      "Distinguish between an Intrusion Detection System (IDS) and an Intrusion Prevention System (IPS)",
      "Compare Network-based IDS (NIDS) with Host-based IDS (HIDS)",
      "Evaluate Signature-Based (Knowledge-Based) vs. Anomaly-Based (Behavior-Based) detection methods",
      "Explain the trade-offs of False Positives vs. False Negatives in security operations centers (SOC)",
      "Trace the deployment topology: Out-of-band monitoring via SPAN/TAP ports vs Inline bump-in-the-wire deployment"
    ],
    "prerequisitesList": [
      {
        "concept": "Firewall Access Control",
        "meaning": "Understanding why legitimate allowed ports (80/443) can still carry application-level attacks"
      },
      {
        "concept": "Switch Port Mirroring (SPAN)",
        "meaning": "Knowing how network switches copy packets to monitoring ports"
      }
    ],
    "imageUrl": "assets/images/unit5/topic4/ids-ips-architecture.svg",
    "imageCaption": "Figure 5.13: IDS Out-of-Band Mirroring vs. IPS Inline Packet Scrubbing and Detection Engine Topologies",
    "sections": {
      "overview": `
        <p class="mb-3">
          While firewalls examine packet headers to enforce access control policies, they are largely blind to attacks encapsulated inside legitimate protocols. For example, if a firewall allows inbound traffic to a web server on Port 443, an attacker can transmit an HTTP request containing an SQL injection payload (<code>' OR '1'='1</code>) or a remote code execution exploit (Log4j). The firewall permits the packet because it targets Port 443.
        </p>
        <p class="mb-3">
          An <strong>Intrusion Detection System (IDS)</strong> or <strong>Intrusion Prevention System (IPS)</strong> provides deep behavioral and content inspection, analyzing payload patterns, protocol anomalies, and suspicious network traffic flows to identify and neutralize attacks in real time (NIST SP 800-94).
        </p>
      `,
      "howItWorks": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. IDS vs. IPS: Architectural Comparison</h3>
        <table class="wiki-table w-full text-xs mb-4">
          <thead>
            <tr class="bg-amber-50 dark:bg-gray-800">
              <th>Dimension</th>
              <th>Intrusion Detection System (IDS)</th>
              <th>Intrusion Prevention System (IPS)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="font-bold">Network Placement</td><td>Out-of-band (Passive tap / SPAN mirror port)</td><td>Inline (Directly in network traffic path)</td></tr>
            <tr><td class="font-bold">Primary Action</td><td>Passive logging, alert generation, SIEM notification</td><td>Active real-time packet dropping &amp; TCP RST injection</td></tr>
            <tr><td class="font-bold">Latency Impact</td><td>Zero latency (analyzes copies of packets)</td><td>Introduces slight packet processing latency (&lt; 1ms)</td></tr>
            <tr><td class="font-bold">Failure Behavior</td><td>Fail-Open (if IDS crashes, network stays 100% UP)</td><td>Requires bypass card (if IPS crashes, traffic may drop)</td></tr>
            <tr><td class="font-bold">False Positive Risk</td><td>Annoying alert fatigue for security analysts</td><td>Severe: drops legitimate customer or business traffic!</td></tr>
          </tbody>
        </table>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. Deployment Scope: NIDS vs. HIDS</h3>
        <ul class="list-disc pl-5 space-y-1.5 text-xs mb-4">
          <li><strong>Network-Based IDS (NIDS):</strong> Deployed at choke points (e.g. connected to a core switch SPAN port or fiber optic TAP). Inspects packets moving across the entire broadcast domain. Captures port scans, network-wide worms, and ARP spoofing. Cannot inspect encrypted TLS traffic or local console logins. Examples: Snort, Zeek (Bro), Suricata.</li>
          <li><strong>Host-Based IDS (HIDS):</strong> Software agent installed directly on individual critical servers. Monitors local operating system audit logs, user login attempts, process spawns, system calls, and File Integrity Monitoring (FIM). Capable of inspecting decrypted data and detecting insider privilege escalation. Examples: OSSEC, Wazuh, Tripwire.</li>
        </ul>
      `,
      "technicalDetails": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. Detection Methodologies (NIST SP 800-94)</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
          <div class="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
            <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-1">A. Signature-Based (Knowledge-Based)</h4>
            <p class="text-slate-700 dark:text-slate-300">
              Compares observed network activity against a database of known threat signatures (byte strings, CVE exploits, regex patterns).
              <br/>• <em>Strengths:</em> Extremely high accuracy for known threats; very low false-positive rate.
              <br/>• <em>Weaknesses:</em> Completely blind to zero-day vulnerabilities and polymorphic shellcode; requires constant signature updates.
            </p>
          </div>
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-900">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-1">B. Anomaly-Based (Behavior-Based)</h4>
            <p class="text-slate-700 dark:text-slate-300">
              Builds a statistical baseline model of normal network behavior (typical bandwidth, protocol distribution, active hours). Flags statistically significant deviations.
              <br/>• <em>Strengths:</em> Capable of discovering novel zero-day exploits, unknown ransomware, and insider data exfiltration.
              <br/>• <em>Weaknesses:</em> Higher false-positive rate; legitimate flash crowds or unannounced software updates trigger alarms.
            </p>
          </div>
        </div>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">4. Error Metrics in Intrusion Detection</h3>
        <table class="wiki-table w-full text-xs mb-4">
          <thead>
            <tr class="bg-amber-50 dark:bg-gray-800">
              <th>Event Reality</th>
              <th>System Flags as Attack</th>
              <th>System Flags as Normal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-bold">Actual Attack Occurs</td>
              <td class="bg-emerald-50 dark:bg-emerald-950/40 font-bold text-emerald-800 dark:text-emerald-300">True Positive (Correct Detection)</td>
              <td class="bg-rose-100 dark:bg-rose-950/60 font-bold text-rose-800 dark:text-rose-300">False Negative (Missed Attack - DANGEROUS!)</td>
            </tr>
            <tr>
              <td class="font-bold">Normal Legitimate Traffic</td>
              <td class="bg-amber-50 dark:bg-amber-950/40 font-bold text-amber-800 dark:text-amber-300">False Positive (False Alarm / Noise)</td>
              <td class="bg-emerald-50 dark:bg-emerald-950/40 font-bold text-emerald-800 dark:text-emerald-300">True Negative (Normal Operation)</td>
            </tr>
          </tbody>
        </table>
      `,
      "workedExamples": {
        "level1": `
          <strong>Deconstructing a Snort Signature Rule:</strong><br/>
          <pre class="bg-slate-900 text-sky-300 p-2 rounded text-[10px] font-mono">alert tcp $EXTERNAL_NET any -> $HTTP_SERVERS 80 (
  msg:"WEB-ATTACK SQL Injection attempt";
  flow:to_server,established;
  content:"UNION"; nocase;
  content:"SELECT"; nocase;
  sid:1000001; rev:1;
)</pre>
          • <code>alert tcp ... 80</code>: Monitors inbound TCP traffic to web servers on Port 80.<br/>
          • <code>flow:to_server,established</code>: Only inspects active established TCP sessions.<br/>
          • <code>content:"UNION"; nocase;</code>: Matches SQL keyword "UNION" regardless of case.<br/>
          • If matched, Snort logs an alert with rule ID <code>sid:1000001</code> to the SIEM!
        `,
        "level2": `
          <strong>Port Mirroring (SPAN) Configuration on a Switch:</strong><br/>
          To feed traffic to a NIDS sensor without disrupting production network flows:<br/>
          <pre class="bg-slate-900 text-green-400 p-2 rounded text-[10px] font-mono mt-1">Switch(config)# monitor session 1 source interface GigabitEthernet 0/1 - 10 both
Switch(config)# monitor session 1 destination interface GigabitEthernet 0/24</pre>
          All traffic passing through Ports 1–10 is mirrored to Port 24 where the NIDS NIC sniffs passively.
        `,
        "level3": `
          <strong>TCP Reset (RST) Injection by an Inline IPS:</strong><br/>
          When an IPS detects an active exploit during an established TCP session:<br/>
          1. Drops the offending packet inline.<br/>
          2. Generates and injects a spoofed <strong>TCP RST</strong> packet to the server (closing the socket).<br/>
          3. Injects a spoofed TCP RST packet to the attacker, terminating the attack instantly!
        `
      },
      "advantagesLimitations": `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Advantages</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Deep packet inspection detects application exploits passing through open firewall ports.</li>
              <li>Network-wide auditing and compliance visibility.</li>
              <li>Anomaly engines can detect novel zero-day malware before signatures exist.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Operational Limitations</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Alert fatigue: High volume of false positives overwhelms security teams.</li>
              <li>Encrypted TLS blind spot: Modern HTTPS traffic cannot be inspected without SSL decryption proxies.</li>
              <li>Inline IPS failures can block legitimate network services.</li>
            </ul>
          </div>
        </div>
      `,
      "whereUsed": [
        "Enterprise Security Operations Centers (SOC): Monitoring enterprise networks with Zeek &amp; Suricata",
        "Next-Generation Firewalls: Integrated IPS blades inside Fortinet, Check Point, and Palo Alto appliances",
        "Cloud Security: AWS Network Firewall, Azure IDPS, Google Cloud IDS",
        "PCI-DSS Compliance: Mandatory requirement for financial and payment processing networks",
        "Endpoint Protection Platforms (EDR): CrowdStrike, SentinelOne running HIDS agents"
      ],
      "commonMistakes": `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing an IDS with a Firewall:</strong> A firewall enforces binary access control rules (allow/deny IP:Port). An IDS inspects packet payloads to find concealed attacks within allowed traffic.</li>
          <li><strong>Assuming an IDS can stop attacks:</strong> A standard IDS is passive; it only logs and alerts. Actively dropping or terminating packets requires an inline <em>Intrusion Prevention System (IPS)</em>.</li>
        </ul>
      `,
      "quiz": [
        {
          "question": "What is the primary operational distinction between an Intrusion Detection System (IDS) and an Intrusion Prevention System (IPS)?",
          "options": [
            "IDS is unencrypted; IPS is encrypted",
            "IDS monitors passively and alerts; IPS sits inline and actively blocks or drops malicious packets in real time",
            "IDS runs on Linux; IPS runs on Windows",
            "IDS requires hardware; IPS is only a concept"
          ],
          "answer": 1,
          "explanation": "An IDS is an out-of-band monitoring device that logs and alerts on threats, while an IPS is deployed inline directly in the traffic stream to proactively drop offending packets."
        },
        {
          "question": "Which detection method builds a statistical model of normal network traffic and flags significant baseline deviations as potential attacks?",
          "options": ["Signature-based detection", "Anomaly-based detection", "Packet filtering", "Port scanning"],
          "answer": 1,
          "explanation": "Anomaly-based (behavior-based) detection establishes a profile of normal network behavior and triggers alerts when observed traffic significantly deviates from that baseline."
        },
        {
          "question": "What is the most dangerous error condition in intrusion detection, representing an undetected compromise?",
          "options": ["True Positive", "False Positive", "False Negative", "True Negative"],
          "answer": 2,
          "explanation": "A False Negative occurs when an actual cyberattack takes place but the IDS fails to detect it, allowing the compromise to succeed completely unnoticed."
        }
      ],
      "references": [
        { "cite": "NIST SP 800-94: Guide to Intrusion Detection and Prevention Systems (IDPS)", "url": "https://csrc.nist.gov/publications/detail/sp/800-94/final" },
        { "cite": "RFC 4765: The Intrusion Detection Message Exchange Format (IDMEF)", "url": "https://datatracker.ietf.org/doc/html/rfc4765" },
        { "cite": "B.A. Forouzan, Data Communications and Networking, Chapter 32.4", "url": "" }
      ]
    },
    "prevTopicId": "firewalls",
    "nextTopicId": "intro-cryptography"
  }
};

