// Topic 3: Content Delivery and Web Architecture
module.exports = {
  "content-delivery": {
    "id": "content-delivery",
    "title": "Content Delivery",
    "unit": "Unit 5 – Application Layer",
    "unitId": "unit5",
    "level": "Level 2 — Distributed Web Architecture",
    "category": "application",
    "difficulty": "Core",
    "readingTime": "25 min read",
    "standard": "IETF RFC 3040 / RFC 3568 / Kurose & Ross Chapter 2.6",
    "oneLiner": "Geographically distributed network of proxy servers deployed at the network edge to accelerate web asset and video streaming delivery.",
    "quickAnswer": "A Content Delivery Network (CDN) is a geographically distributed network of proxy caching servers (Points of Presence - PoPs) deployed at the edge of the Internet close to end users. By intercepting client requests via Anycast BGP or Geo-DNS, CDNs serve static and streaming media from nearby edge nodes, reducing latency from 200ms+ down to 10-20ms, preventing origin server saturation, and mitigating DDoS attacks.",
    "whyItMatters": "The speed-of-light propagation delay in optical fiber means physical distance creates unavoidable network latency. Without CDNs, a user in India accessing an origin server in California suffers a minimum 150-250ms round-trip delay on every packet; CDNs eliminate this distance penalty by caching content within the user's local city or ISP.",
    "infobox": {
      "layer": "Application Layer (OSI Layer 7)",
      "standard": "IETF RFC 3040 (Internet Web Replication), RFC 3568",
      "type": "Distributed Edge Infrastructure & Anycast Routing",
      "prerequisites": ["dns", "http-working"],
      "relatedConcepts": ["server-farms", "web-proxies", "http-architecture"],
      "compareWith": ["server-farms"],
      "primaryUses": [
        "Static web asset caching (HTML, CSS, JS, WebP, AVIF)",
        "On-demand and live video streaming (HLS, DASH chunks)",
        "DDoS attack mitigation and origin IP cloaking",
        "Edge compute functions (Cloudflare Workers, Fastly Compute)"
      ],
      "standardRfc": "RFC 3040, RFC 3568"
    },
    "learningObjectives": [
      "Explain the fundamental latency bottlenecks of centralized origin servers (Speed-of-light RTT, Transit hops)",
      "Diagram the architecture of a CDN: Origin Server, Points of Presence (PoPs), and Edge Caches",
      "Contrast DNS-based request redirection (Geo-DNS) with Anycast BGP routing",
      "Analyze Cache Hit Ratio (CHR) and Origin Offload mathematical formulas",
      "Describe CDN caching strategies: Pull (Origin Fetch on demand) vs Push (Pre-population)"
    ],
    "prerequisitesList": [
      {
        "concept": "DNS Resolution & Caching",
        "meaning": "Understanding how DNS maps domain names to IP addresses"
      },
      {
        "concept": "HTTP Caching Headers",
        "meaning": "Familiarity with Cache-Control, max-age, and ETag revalidation"
      }
    ],
    "imageUrl": "assets/images/unit5/topic3/content-delivery-networks.svg",
    "imageCaption": "Figure 5.8: Global CDN Edge PoP Architecture, Anycast DNS Redirection, and Origin Offload",
    "sections": {
      "overview": `
        <p class="mb-3">
          As the Internet evolved into a global platform for high-definition streaming, e-commerce, and software distribution, the traditional centralized client-server model reached physical limits. A single origin data center located in North America cannot deliver sub-second response times to users in Asia, Australia, and Africa due to the <strong>speed-of-light propagation delay</strong> across intercontinental submarine fiber optic cables.
        </p>
        <p class="mb-3">
          <strong>Content Delivery Networks (CDNs)</strong> overcome this physical barrier by distributing hundreds of thousands of caching servers across thousands of <strong>Points of Presence (PoPs)</strong> located inside local Internet Service Providers (ISPs) and Internet Exchange Points (IXPs) worldwide.
        </p>
      `,
      "howItWorks": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. The CDN Edge Request Cycle</h3>
        <p class="mb-3 text-xs leading-relaxed">
          When a user requests a CDN-accelerated asset (e.g. <code>https://cdn.example.com/video.mp4</code>):
        </p>
        <ol class="list-decimal pl-5 space-y-1.5 text-xs mb-4">
          <li><strong>Request Redirection:</strong> The client's DNS query is intercepted by the CDN's smart nameserver. Using either <strong>Geo-DNS</strong> (mapping client IP to the geographically nearest server) or <strong>Anycast BGP</strong>, the CDN returns the IP address of the closest edge PoP (e.g., a PoP 5 km away instead of an origin 10,000 km away).</li>
          <li><strong>Cache Inspection (Edge):</strong> The client establishes a TCP/TLS connection to the nearby edge node (handshake takes &lt; 10ms). The edge proxy inspects its local SSD/RAM cache.</li>
          <li><strong>Cache Hit (90–95% of traffic):</strong> The edge server immediately streams the asset to the client. The origin server is never contacted!</li>
          <li><strong>Cache Miss:</strong> If the asset is absent or expired, the edge server fetches the object from the origin server over an optimized persistent backbone link, caches a copy locally, and streams it to the user.</li>
        </ol>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. Anycast BGP vs Geo-DNS Routing</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
          <div class="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
            <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-1">A. Anycast BGP Routing</h4>
            <p class="text-slate-700 dark:text-slate-300">
              Hundreds of edge servers across different continents announce the <em>exact same IP address</em> via Border Gateway Protocol (BGP). Core Internet routers automatically steer packets to the topologically closest edge node along the shortest AS path. Provides instant automatic failover if a PoP goes offline. (Used by Cloudflare).
            </p>
          </div>
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-900">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-1">B. Geo-DNS Redirection</h4>
            <p class="text-slate-700 dark:text-slate-300">
              The CDN authoritative nameserver inspects the client's resolver IP (or EDNS0 Client Subnet) and resolves the domain to a specific unicast IP belonging to the nearest geographical data center. (Used by Akamai and AWS CloudFront).
            </p>
          </div>
        </div>
      `,
      "technicalDetails": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. Quantitative CDN Performance Metrics</h3>
        <ul class="list-disc pl-5 space-y-1.5 text-xs mb-4">
          <li><strong>Cache Hit Ratio (CHR):</strong>
            <div class="p-2 bg-slate-100 dark:bg-slate-800 rounded font-mono my-1 text-[11px]">
              CHR = (Total Cache Hits / Total Requests) * 100%
            </div>
            High-traffic websites target CHR &gt; 92%. A 95% CHR means the origin server only handles 5% of incoming traffic.
          </li>
          <li><strong>Origin Bandwidth Offload:</strong>
            <div class="p-2 bg-slate-100 dark:bg-slate-800 rounded font-mono my-1 text-[11px]">
              Offload % = ((Total Bandwidth Served - Origin Bandwidth) / Total Bandwidth) * 100%
            </div>
          </li>
          <li><strong>Time to First Byte (TTFB):</strong> Time from user hitting Enter to receiving the first byte of response. Dropping TTFB from 350ms to 25ms drastically improves Google Core Web Vitals and user conversion.</li>
        </ul>
      `,
      "workedExamples": {
        "level1": `
          <strong>Fiber Propagation Latency Calculation:</strong><br/>
          Calculate the theoretical round-trip physical latency between Mumbai and San Francisco ($D = 13,000\\text{ km}$):<br/>
          • Speed of light in vacuum $c = 300,000\\text{ km/s}$.<br/>
          • Speed of light in optical fiber core ($n \\approx 1.5$): $v = c / 1.5 = 200,000\\text{ km/s}$.<br/>
          • One-way propagation time: $13,000 / 200,000 = 0.065\\text{ s} = 65\\text{ms}$.<br/>
          • Physical minimum RTT: $2 \\times 65\\text{ms} = 130\\text{ms}$.<br/>
          • Adding router queuing, switching, and trans-oceanic cable routing brings real RTT to $\\approx 220\\text{ms}$.<br/>
          • A CDN node in Mumbai reduces distance to 20 km $\\to$ RTT drops to <strong class="text-emerald-600">&lt; 5ms</strong>!
        `,
        "level2": `
          <strong>Origin Cost Reduction Calculation:</strong><br/>
          A video platform serves 100 Terabytes (TB) of video daily. Cloud provider egress pricing is $0.08 per GB.<br/>
          • Without CDN: $100,000\\text{ GB} \\times \\$0.08 = \\$8,000\\text{ per day}$ ($240,000/month).<br/>
          • With 95% CDN Cache Hit Ratio: Origin only egresses 5 TB ($5,000\\text{ GB} \\times \\$0.08 = \\$400$).<br/>
          • CDN bandwidth costs $0.02 per GB ($100,000 \\times 0.02 = \\$2,000$).<br/>
          • Net Daily Cost = $400 + $2,000 = $2,400. <strong class="text-emerald-600">Saves $5,600 every single day (70% savings)!</strong>
        `,
        "level3": `
          <strong>Cache Invalidation with Surrogate Keys (Cache Tags):</strong><br/>
          When an e-commerce price changes, purging entire caches is wasteful. Modern CDNs support Cache-Tags:<br/>
          • Origin attaches header: <code>Surrogate-Key: product-123 category-electronics</code>.<br/>
          • When product 123 updates, origin sends API purge request: <code>POST /purge { "tag": "product-123" }</code>.<br/>
          • CDN purges only that specific product across all 500 edge nodes globally within 150 milliseconds!
        `
      },
      "advantagesLimitations": `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Advantages</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Drastic latency reduction worldwide by eliminating distance delay.</li>
              <li>Absorbs massive traffic spikes and flash crowds effortlessly.</li>
              <li>Built-in volumetric DDoS defense (CDNs absorb multi-terabit attacks at the edge).</li>
              <li>Reduces origin infrastructure hardware and hosting bandwidth costs.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Trade-offs</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Stale content risk if cache purge mechanisms are improperly configured.</li>
              <li>Vendor lock-in with proprietary CDN features.</li>
              <li>Dynamic, personalized API requests cannot be statically cached (requires dynamic route acceleration).</li>
            </ul>
          </div>
        </div>
      `,
      "whereUsed": [
        "Streaming Media: Netflix (Open Connect), YouTube, Disney+ video chunk delivery",
        "Operating System Updates: Microsoft Windows Update, Apple iOS firmware rollouts",
        "E-Commerce: Shopify, Amazon, Flipkart product images and checkout assets",
        "Social Networks: Instagram and TikTok photo/video delivery",
        "Open-Source CDNs: cdnjs, unpkg, BootstrapCDN hosting JavaScript libraries"
      ],
      "commonMistakes": `
        <ul class="space-y-2 text-xs">
          <li><strong>Assuming CDNs only store static images:</strong> Modern CDNs perform dynamic content acceleration (TCP route optimization, TLS session termination, edge compute functions, and API caching).</li>
          <li><strong>Thinking Anycast BGP requires different IP addresses per continent:</strong> Anycast announces the EXACT same IP address from hundreds of data centers globally. BGP routing handles locality.</li>
        </ul>
      `,
      "quiz": [
        {
          "question": "How does Anycast BGP route a client to the nearest CDN Point of Presence (PoP)?",
          "options": [
            "It queries a centralized satellite every second",
            "Multiple physical edge servers announce the same identical IP address; Internet BGP routers automatically deliver packets along the shortest autonomous system path",
            "It forces the client to download software",
            "It converts HTTP into email"
          ],
          "answer": 1,
          "explanation": "Anycast assigns the same IP address to multiple geographically distributed servers. BGP routing automatically routes client packets to the topologically closest server."
        },
        {
          "question": "If a website receives 10,000 requests and the CDN edge caches successfully fulfill 9,200 of them without contacting the origin server, what is the Cache Hit Ratio (CHR)?",
          "options": ["8%", "92%", "50%", "100%"],
          "answer": 1,
          "explanation": "Cache Hit Ratio = (Cache Hits / Total Requests) × 100% = (9,200 / 10,000) × 100% = 92%."
        },
        {
          "question": "What is the primary physical constraint that makes a Content Delivery Network necessary for global web services?",
          "options": [
            "Operating system incompatibilities",
            "Speed-of-light propagation latency across long-distance fiber optic cables",
            "Shortage of HTML tags",
            "Browser version conflicts"
          ],
          "answer": 1,
          "explanation": "Light travels in optical fiber at approximately 200,000 km/s. Over intercontinental distances (10,000+ km), this introduces unavoidable physical latency (100–250ms RTT) that can only be eliminated by bringing data closer to the user via edge caches."
        }
      ],
      "references": [
        { "cite": "RFC 3040: Internet Web Replication and Caching Taxonomy (IETF)", "url": "https://datatracker.ietf.org/doc/html/rfc3040" },
        { "cite": "RFC 3568: Known Content Network (CN) Request-Routing Techniques", "url": "https://datatracker.ietf.org/doc/html/rfc3568" },
        { "cite": "J.F. Kurose & K.W. Ross, Computer Networking, Chapter 2.6: Video Streaming and Content Distribution Networks", "url": "" }
      ]
    },
    "prevTopicId": "http-working",
    "nextTopicId": "server-farms"
  },

  "server-farms": {
    "id": "server-farms",
    "title": "Server Farms",
    "unit": "Unit 5 – Application Layer",
    "unitId": "unit5",
    "level": "Level 2 — Data Center Architecture",
    "category": "application",
    "difficulty": "Core",
    "readingTime": "25 min read",
    "standard": "Data Center Architecture Standards / RFC 7230 / Kurose & Ross Ch. 2.2",
    "oneLiner": "Cluster of interconnected compute servers operating collectively with load balancers to provide high-availability web services.",
    "quickAnswer": "A Server Farm (Web Farm) is a centralized cluster of physical or virtual servers housed in a data center, operating cooperatively behind redundant Load Balancers to serve millions of concurrent web transactions. Server farms use multi-tier architecture (Web Tier, Application Tier, Database Tier) with active health checks to ensure fault tolerance, zero downtime, and linear horizontal scalability.",
    "whyItMatters": "No single physical computer—no matter how powerful—can handle the millions of requests per second generated by global web services like Google, Amazon, or university portals. Server farms replace fragile vertical scaling with resilient, cost-effective horizontal scaling.",
    "infobox": {
      "layer": "Application Layer & Data Center Infrastructure",
      "standard": "Tier 1-4 Data Center Architecture, IEEE 802.3",
      "type": "Clustered Multi-Tier Compute Architecture",
      "prerequisites": ["http-architecture", "tcp"],
      "relatedConcepts": ["content-delivery", "web-proxies", "http-request-response"],
      "compareWith": ["content-delivery"],
      "primaryUses": [
        "Horizontal auto-scaling under fluctuating user traffic loads",
        "High availability and fault tolerance (zero single points of failure)",
        "Layer 4 (TCP) and Layer 7 (HTTP) traffic distribution",
        "Stateless web worker separation from stateful database tiers"
      ],
      "standardRfc": "RFC 7230, IETF RFC 3040"
    },
    "learningObjectives": [
      "Distinguish between Vertical Scaling (Scale-Up) and Horizontal Scaling (Scale-Out)",
      "Analyze the multi-tier server farm topology: Perimeter/LB Tier, Web Tier, App Tier, and DB Tier",
      "Compare Layer 4 (Transport) with Layer 7 (Application) Load Balancing",
      "Evaluate load balancing dispatch algorithms: Round Robin, Least Connections, and IP Hash",
      "Explain the mechanics of periodic health checking and automatic node failover"
    ],
    "prerequisitesList": [
      {
        "concept": "Transport Layer Ports",
        "meaning": "Understanding TCP port routing and socket connection management"
      },
      {
        "concept": "HTTP Statelessness",
        "meaning": "Knowing why stateless web nodes can handle requests interchangeably"
      }
    ],
    "imageUrl": "assets/images/unit5/topic3/server-farms.svg",
    "imageCaption": "Figure 5.9: Multi-Tier Server Farm Architecture, Load Balancing Tiers, and Database Clustering",
    "sections": {
      "overview": `
        <p class="mb-3">
          When a web service expands, it encounters two fundamental scaling paradigms:
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs mb-3">
          <li><strong>Vertical Scaling (Scale-Up):</strong> Adding more CPUs, RAM, and NVMe disks to a single physical server. Exponentially expensive, hardware ceilings exist, and represents a single point of failure (if motherboard dies, site goes down).</li>
          <li><strong>Horizontal Scaling (Scale-Out):</strong> Adding dozens or hundreds of standard, inexpensive commodity servers arranged in a <strong>Server Farm</strong> behind an intelligent traffic distributor (Load Balancer). Cost-effective, linearly scalable, and provides continuous availability.</li>
        </ul>
      `,
      "howItWorks": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. The Multi-Tier Server Farm Topology</h3>
        <p class="mb-3 text-xs leading-relaxed">
          Modern enterprise server farms separate concerns into distinct physical/virtual tiers:
        </p>
        <ol class="list-decimal pl-5 space-y-1.5 text-xs mb-4">
          <li><strong>Perimeter &amp; Load Balancing Tier:</strong> Inbound traffic from BGP routers passes through DDoS scrubbers and hit redundant hardware/software Load Balancers (HAProxy, F5 BIG-IP, Nginx, AWS ALB). This tier terminates external TLS and balances requests.</li>
          <li><strong>Web Server Tier (Stateless):</strong> Replicated worker nodes running Apache/Nginx. Because they store no session data locally on disk, any node can handle any request. Nodes are auto-scaled dynamically based on CPU/traffic metrics.</li>
          <li><strong>Application / Microservice Tier:</strong> Executes business logic, authentication, credit card processing, and background jobs (Java Spring, Django, Node.js).</li>
          <li><strong>Database &amp; Storage Tier (Stateful):</strong> Clustered relational databases (PostgreSQL/MySQL) with Master-Replica replication, distributed NoSQL (Cassandra/MongoDB), and distributed memory caches (Redis/Memcached).</li>
        </ol>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. Layer 4 vs. Layer 7 Load Balancing</h3>
        <table class="wiki-table w-full text-xs mb-4">
          <thead>
            <tr class="bg-amber-50 dark:bg-gray-800">
              <th>Dimension</th>
              <th>Layer 4 Load Balancer (L4)</th>
              <th>Layer 7 Load Balancer (L7)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="font-bold">Operating Layer</td><td>Transport Layer (TCP / UDP)</td><td>Application Layer (HTTP / HTTPS)</td></tr>
            <tr><td class="font-bold">Routing Criteria</td><td>Source IP, Dest IP, TCP Port</td><td>URL Path, Cookies, HTTP Headers, Method</td></tr>
            <tr><td class="font-bold">Packet Inspection</td><td>Shallow (Headers only)</td><td>Deep (Terminates and inspects full HTTP payload)</td></tr>
            <tr><td class="font-bold">Throughput</td><td>Extremely high (Millions of packets/sec)</td><td>Moderate (Requires CPU for SSL and payload parsing)</td></tr>
            <tr><td class="font-bold">Content-Based Routing</td><td>Cannot route /api vs /static</td><td>Routes /images to image cluster, /api to API cluster</td></tr>
            <tr><td class="font-bold">Examples</td><td>Linux LVS, AWS NLB, HAProxy TCP</td><td>Nginx, Envoy, AWS ALB, Traefik</td></tr>
          </tbody>
        </table>
      `,
      "technicalDetails": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. Load Balancing Scheduling Algorithms</h3>
        <ul class="list-disc pl-5 space-y-1.5 text-xs mb-4">
          <li><strong>Round Robin:</strong> Requests distributed sequentially across servers ($1 \to 2 \to 3 \to 1$). Best when all servers have identical hardware and requests require uniform processing.</li>
          <li><strong>Weighted Round Robin:</strong> Assigns integer capacity weights (e.g. Server A = weight 3, Server B = weight 1; Server A receives 3 requests for every 1 sent to B).</li>
          <li><strong>Least Connections:</strong> Dispatches new incoming request to the server with the lowest number of active TCP connections. Ideal for long-lived transactions or video streams.</li>
          <li><strong>IP Hash (Source Hash):</strong> Computes a hash of the client's IP address: <code>Server_Index = Hash(Client_IP) % N</code>. Guarantees that a client consistently routes to the same backend server (session affinity / sticky sessions).</li>
        </ul>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">4. Health Checks and Automatic Failover</h3>
        <p class="mb-3 text-xs leading-relaxed">
          The load balancer sends periodic synthetic probes to every backend server (e.g. every 5 seconds):
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs mb-3">
          <li><em>Layer 3 Check:</em> ICMP Echo Ping (verifies host is powered on).</li>
          <li><em>Layer 4 Check:</em> TCP SYN on port 80/443 (verifies web server daemon is listening).</li>
          <li><em>Layer 7 Check:</em> <code>GET /health</code> HTTP request. Expects <code>200 OK</code> within 1,000ms. If a node returns <code>500</code> or times out 3 consecutive times, it is marked unhealthy and removed from the active pool within seconds.</li>
        </ul>
      `,
      "workedExamples": {
        "level1": `
          <strong>Sizing a Web Server Farm:</strong><br/>
          A university admission portal expects 20,000 requests per second at peak. Each server node can handle 2,500 req/sec before CPU reaches 70%.<br/>
          • Required nodes = $20,000 / 2,500 = 8\\text{ nodes}$.<br/>
          • For $N+1$ or $N+2$ redundancy (allowing 2 nodes to fail without service degradation):<br/>
          • Total nodes provisioned = $8 + 2 = \\mathbf{10\\text{ servers}}$.
        `,
        "level2": `
          <strong>Weighted Least Connections Calculation:</strong><br/>
          Server A (Weight = 2, Active Connections = 40) $\\to$ Ratio = $40 / 2 = 20$.<br/>
          Server B (Weight = 1, Active Connections = 25) $\\to$ Ratio = $25 / 1 = 25$.<br/>
          • The load balancer sends the next request to <strong>Server A</strong> because its normalized load ratio (20) is lower than Server B (25), despite Server A having more raw connections!
        `,
        "level3": `
          <strong>Stateless Session Architecture with Redis:</strong><br/>
          In early web farms, "sticky sessions" forced a user to stay on Server #1 for their shopping cart. If Server #1 crashed, cart was lost.<br/>
          • <strong>Modern Farm Solution:</strong> All web nodes are stateless.<br/>
          • Session state is stored in an in-memory, replicated Redis cluster.<br/>
          • Any server can read the cart from Redis using the session token!
        `
      },
      "advantagesLimitations": `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Advantages</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>High availability: Automatic failover delivers 99.999% uptime.</li>
              <li>Horizontal elasticity: Add or remove nodes dynamically based on load.</li>
              <li>Maintenance without downtime: Rolling updates take one server down at a time.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Complexity &amp; Challenges</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Database tier scaling bottleneck (requires read replicas and sharding).</li>
              <li>Load balancer itself must be deployed as high-availability active-passive pair to avoid becoming a single point of failure.</li>
            </ul>
          </div>
        </div>
      `,
      "whereUsed": [
        "Cloud Computing: AWS Elastic Load Balancing (ELB), Google Cloud Load Balancing",
        "Large E-Commerce: Amazon, Flipkart, Walmart data center infrastructure",
        "Search Engines: Google, Bing clusters handling billions of daily queries",
        "Enterprise Applications: SAP, Salesforce multi-tier private clouds",
        "Streaming Backends: Netflix API and metadata clusters"
      ],
      "commonMistakes": `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing Layer 4 with Layer 7 load balancing:</strong> Layer 4 balances purely by IP/port without decrypting or inspecting HTTP requests. Layer 7 parses the full HTTP headers and URLs.</li>
          <li><strong>Assuming adding web servers automatically scales databases:</strong> Adding 50 web servers increases connection load on the database. Scaling stateful databases requires read replicas, connection pooling, and caching.</li>
        </ul>
      `,
      "quiz": [
        {
          "question": "Which load balancing algorithm dispatches an incoming request to the server with the fewest active TCP socket connections?",
          "options": ["Round Robin", "Least Connections", "IP Hash", "Random"],
          "answer": 1,
          "explanation": "The Least Connections algorithm dynamically tracks active socket sessions on each backend server and routes new traffic to the node currently handling the fewest connections."
        },
        {
          "question": "What is the primary architectural difference between Vertical Scaling and Horizontal Scaling?",
          "options": [
            "Vertical scaling adds more compute resources to a single computer; horizontal scaling adds more computer nodes to a cluster",
            "Vertical scaling uses Linux; horizontal scaling uses Windows",
            "Vertical scaling runs over UDP; horizontal scaling runs over TCP",
            "Horizontal scaling is only used for databases"
          ],
          "answer": 0,
          "explanation": "Vertical scaling (scale-up) expands CPU/RAM capacity on a single machine, while horizontal scaling (scale-out) connects multiple independent machines in parallel behind a load balancer."
        },
        {
          "question": "Why is Layer 7 load balancing more computationally intensive than Layer 4 load balancing?",
          "options": [
            "It requires terminating the TCP connection and parsing the complete ASCII/binary HTTP headers and URI paths",
            "It uses slower ethernet cables",
            "It can only run in the morning",
            "It requires satellite links"
          ],
          "answer": 0,
          "explanation": "Layer 7 load balancing must terminate the TCP connection, perform TLS decryption, and parse the full HTTP request (headers, cookies, and path) before deciding where to route the packet."
        }
      ],
      "references": [
        { "cite": "RFC 7230: HTTP/1.1 Routing and Gateways", "url": "https://datatracker.ietf.org/doc/html/rfc7230" },
        { "cite": "J.F. Kurose & K.W. Ross, Computer Networking: A Top-Down Approach, Chapter 2: Web Server Clusters", "url": "" }
      ]
    },
    "prevTopicId": "content-delivery",
    "nextTopicId": "web-proxies"
  },

  "web-proxies": {
    "id": "web-proxies",
    "title": "Web Proxies",
    "unit": "Unit 5 – Application Layer",
    "unitId": "unit5",
    "level": "Level 2 — Intermediate Security & Caching",
    "category": "application",
    "difficulty": "Core",
    "readingTime": "25 min read",
    "standard": "RFC 7230 / RFC 7234 / Forouzan Chapter 27.3 / Kurose Ch. 2.2",
    "oneLiner": "Intermediary computer systems that act as both server and client to intercept, cache, filter, and relay web requests.",
    "quickAnswer": "A Web Proxy is an intermediary server acting between clients and web servers. In a Forward Proxy configuration, it represents internal network clients to the Internet for caching, anonymity, and URL access control. In a Reverse Proxy configuration, it sits in front of web servers to handle SSL termination, load balancing, caching, and Web Application Firewall (WAF) defense.",
    "whyItMatters": "Web proxies provide the security boundaries, caching hubs, and operational control points for almost all modern enterprise networks and cloud platforms. Understanding their role is vital for network administration, cybersecurity, and web development.",
    "infobox": {
      "layer": "Application Layer (OSI Layer 7)",
      "standard": "RFC 7230 (Intermediaries), RFC 7234 (Caching)",
      "type": "Network Intermediary (Proxy / Gateway / Cache)",
      "prerequisites": ["http-intro", "http-request-response"],
      "relatedConcepts": ["content-delivery", "server-farms", "firewalls"],
      "compareWith": ["firewalls"],
      "primaryUses": [
        "Corporate URL filtering and policy compliance (Forward Proxy)",
        "Reverse proxy SSL/TLS termination and backend cloaking (Nginx)",
        "Shared institutional caching (Squid / Varnish)",
        "Anonymization and IP hiding (Tor, SOCKS5, HTTP proxies)"
      ],
      "standardRfc": "RFC 7230, RFC 7234"
    },
    "learningObjectives": [
      "Define the dual nature of a proxy server (acts as server to client, client to server)",
      "Contrast Forward Proxies, Reverse Proxies, and Transparent Proxies",
      "Trace the request-response packet flow through a caching proxy during cache hits and cache misses",
      "Explain the HTTP CONNECT tunneling method for establishing secure HTTPS tunnels through forward proxies",
      "Analyze the Via and X-Forwarded-For headers used by proxies to preserve client origin metadata"
    ],
    "prerequisitesList": [
      {
        "concept": "Client-Server Roles",
        "meaning": "Understanding who originates requests and who returns responses"
      },
      {
        "concept": "HTTP Status Codes",
        "meaning": "Knowing 200 OK, 304 Not Modified, and 407 Proxy Authentication Required"
      }
    ],
    "imageUrl": "assets/images/unit5/topic3/web-proxies.svg",
    "imageCaption": "Figure 5.10: Architectural Topologies: Forward Proxy (Client-Side) vs. Reverse Proxy (Server-Side)",
    "sections": {
      "overview": `
        <p class="mb-3">
          As defined in McGraw-Hill Forouzan Section 27.3, a <strong>Proxy Server</strong> is a computer that keeps copies of responses to recent requests. The HTTP client sends a request to the proxy server; the proxy checks its cache. If the response is stored, it returns it; if not, it fetches the page from the original server on behalf of the client.
        </p>
        <p class="mb-3">
          Beyond caching, modern web proxies serve as critical <strong>security and architectural gateways</strong> positioned at both edges of the Internet.
        </p>
      `,
      "howItWorks": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">1. The Three Primary Types of Web Proxies</h3>
        <div class="space-y-3 text-xs mb-4">
          <div class="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
            <strong class="text-blue-800 dark:text-blue-300 font-bold">1. Forward Proxy (Client-Facing):</strong>
            <p class="text-slate-700 dark:text-slate-300 mt-1">
              Positioned inside an enterprise or campus LAN. Clients explicitly configure their browsers to send all outbound web requests to the proxy (e.g. <code>proxy.pondiuni.edu.in:8080</code>).
              <br/><em>Functions:</em> Enforces acceptable use policies (blocks adult/gambling/social media sites), logs employee web traffic, hides internal private IP addresses, and caches frequent downloads to conserve expensive WAN bandwidth.
            </p>
          </div>
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-900">
            <strong class="text-emerald-800 dark:text-emerald-300 font-bold">2. Reverse Proxy (Server-Facing / Gateway):</strong>
            <p class="text-slate-700 dark:text-slate-300 mt-1">
              Positioned in front of a website's internal server farm. End users believe they are communicating directly with the origin website.
              <br/><em>Functions:</em> SSL/TLS termination (decrypts HTTPS and forwards fast unencrypted HTTP inside the private rack), distributes traffic across backend app nodes, caches dynamic page fragments, and shields internal server IPs from direct Internet exposure.
            </p>
          </div>
          <div class="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-900">
            <strong class="text-purple-800 dark:text-purple-300 font-bold">3. Transparent Proxy (Inline Interceptor):</strong>
            <p class="text-slate-700 dark:text-slate-300 mt-1">
              Intercepts web traffic at the network router/switch level without requiring any client configuration. Uses Linux <code>iptables</code> or WCCP (Web Cache Communication Protocol) to redirect Port 80 packets into the proxy daemon. Often deployed by ISPs to compress mobile images.
            </p>
          </div>
        </div>

        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">2. HTTPS Tunneling via HTTP CONNECT Method</h3>
        <p class="mb-3 text-xs leading-relaxed">
          Because HTTPS encrypts the URL path and payload using TLS, a forward proxy cannot inspect or alter encrypted bytes without breaking the cryptographic trust. To traverse a forward proxy, browsers use the <code>CONNECT</code> method (RFC 2817):
        </p>
        <div class="p-3 bg-slate-900 text-sky-300 rounded-lg text-xs font-mono space-y-1 mb-4">
          <div>C ──▶ Proxy: CONNECT www.bank.com:443 HTTP/1.1\\r\\nHost: www.bank.com:443\\r\\n\\r\\n</div>
          <div>Proxy ──▶ C: HTTP/1.1 200 Connection Established\\r\\n\\r\\n</div>
          <div class="text-emerald-400">// The proxy now acts as a blind TCP byte pipe, passing raw encrypted TLS packets without inspection!</div>
        </div>
      `,
      "technicalDetails": `
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">3. Proxy Headers: Via and X-Forwarded-For</h3>
        <p class="mb-3 text-xs leading-relaxed">
          When an HTTP request passes through proxies, the origin server's TCP socket sees the IP address of the <em>last proxy</em>, rather than the original client. Proxies attach tracing headers:
        </p>
        <ul class="list-disc pl-5 space-y-1.5 text-xs mb-4">
          <li><strong>X-Forwarded-For (XFF):</strong> Appends the client IP:
            <code class="p-1 bg-slate-100 dark:bg-slate-800 rounded font-mono">X-Forwarded-For: 203.0.113.195, 198.51.100.10</code>
            (First IP is the true original client; subsequent IPs are intermediate proxies).
          </li>
          <li><strong>X-Forwarded-Proto:</strong> Informs the backend server whether the original client connected via <code>http</code> or <code>https</code>.</li>
          <li><strong>Via:</strong> Tracks the proxy protocol versions and names to prevent infinite proxy routing loops:
            <code class="p-1 bg-slate-100 dark:bg-slate-800 rounded font-mono">Via: 1.1 proxy1.corp.com, 2.0 cdn.cloudflare.com</code>
          </li>
        </ul>
      `,
      "workedExamples": {
        "level1": `
          <strong>Forward Proxy Authentication (Status Code 407):</strong><br/>
          In corporate networks requiring user login before granting Internet access:<br/>
          1. Client issues: <code>GET http://google.com/ HTTP/1.1</code>.<br/>
          2. Proxy intercepts and responds: <code>HTTP/1.1 407 Proxy Authentication Required</code> + <code>Proxy-Authenticate: Basic realm="Corporate"</code>.<br/>
          3. Browser prompts user for credentials and retransmits: <code>Proxy-Authorization: Basic dXNlcjpwYXNz</code>.<br/>
          4. Proxy validates against Active Directory / LDAP and permits outbound connection.
        `,
        "level2": `
          <strong>Reverse Proxy SSL Termination Architecture:</strong><br/>
          A web cluster uses Nginx as a reverse proxy fronting 10 Python Flask microservices:<br/>
          • Heavy RSA/ECC cryptographic handshakes are executed once by Nginx on port 443.<br/>
          • Nginx forwards requests to Flask backends on localhost (e.g. <code>http://127.0.0.1:8000</code>).<br/>
          • Saves Flask application CPU from managing TLS certificates and crypto math.
        `,
        "level3": `
          <strong>Cache Poisoning Defense in Proxies:</strong><br/>
          Attackers attempt HTTP Request Smuggling to trick reverse proxies into caching malicious payloads under legitimate URLs. Modern proxies defend against this by strictly rejecting requests with ambiguous or conflicting <code>Transfer-Encoding</code> and <code>Content-Length</code> headers (RFC 7230).
        `
      },
      "advantagesLimitations": `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Advantages</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Centralized security auditing, logging, and policy compliance.</li>
              <li>Bandwidth conservation via shared institutional caching.</li>
              <li>Anonymity and IP shielding for both clients and backend servers.</li>
              <li>SSL offloading optimizes backend server hardware performance.</li>
            </ul>
          </div>
          <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
            <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">Drawbacks</h4>
            <ul class="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
              <li>Potential single point of failure if proxy crashes without failover.</li>
              <li>Adds slight processing latency on cache misses.</li>
              <li>Privacy concerns: Corporate forward proxies can monitor all unencrypted employee browsing.</li>
            </ul>
          </div>
        </div>
      `,
      "whereUsed": [
        "Enterprise Gateways: Blue Coat, Cisco Web Security, Squid caching proxies",
        "Web Servers: Nginx and Apache <code>mod_proxy</code> fronting Node/Django apps",
        "API Gateways: Kong, Zuul, Traefik routing cloud microservices",
        "Anonymity Networks: Tor exit relays, SOCKS5 proxies, and residential VPNs",
        "Mobile Carrier Proxies: Compressing web images to save cellular cellular bandwidth"
      ],
      "commonMistakes": `
        <ul class="space-y-2 text-xs">
          <li><strong>Confusing Web Proxies with Packet-Filtering Firewalls:</strong> Firewalls inspect Layer 3/4 packet headers (IP/Port). Proxies operate at Layer 7, terminating the TCP connection and understanding application-level protocols.</li>
          <li><strong>Assuming Forward Proxies can decrypt HTTPS traffic by default:</strong> Without installing a custom trusted root CA certificate on the client device (SSL Inspection / MITM proxy), forward proxies cannot decrypt HTTPS traffic; they merely tunnel it via the <code>CONNECT</code> method.</li>
        </ul>
      `,
      "quiz": [
        {
          "question": "Which HTTP method is specifically used by web browsers to establish a transparent TCP tunnel through a forward proxy for secure HTTPS traffic?",
          "options": ["GET", "POST", "CONNECT", "TUNNEL"],
          "answer": 2,
          "explanation": "RFC 2817 defines the CONNECT method, which requests that the forward proxy establish a blind, two-way TCP byte tunnel to the destination server on Port 443 without inspecting the encrypted TLS traffic."
        },
        {
          "question": "What is the primary function of the 'X-Forwarded-For' HTTP request header attached by reverse proxies?",
          "options": [
            "To encrypt the password payload",
            "To preserve and convey the original client's true IP address to the backend application server",
            "To measure the speed of the hard drive",
            "To compress the HTML output"
          ],
          "answer": 1,
          "explanation": "Because backend servers only see the proxy's IP address at the socket level, reverse proxies attach the 'X-Forwarded-For' header containing the client's original IP address for logging and security analysis."
        },
        {
          "question": "Which HTTP status code is returned by a forward proxy when a client attempts to browse the web without providing valid proxy credentials?",
          "options": ["401 Unauthorized", "403 Forbidden", "407 Proxy Authentication Required", "502 Bad Gateway"],
          "answer": 2,
          "explanation": "Status code 407 Proxy Authentication Required indicates that the client must first authenticate itself with the proxy server before the request can be forwarded to the Internet."
        }
      ],
      "references": [
        { "cite": "RFC 7230: HTTP/1.1 Message Syntax and Routing, Section 5.7: Intermediaries", "url": "https://datatracker.ietf.org/doc/html/rfc7230" },
        { "cite": "RFC 7234: Hypertext Transfer Protocol (HTTP/1.1): Caching", "url": "https://datatracker.ietf.org/doc/html/rfc7234" },
        { "cite": "B.A. Forouzan, Data Communications and Networking, Chapter 27.3: Proxy Server", "url": "" }
      ]
    },
    "prevTopicId": "server-farms",
    "nextTopicId": "p2p-networks"
  }
};

