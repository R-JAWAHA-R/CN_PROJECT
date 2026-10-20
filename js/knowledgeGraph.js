// Interactive Knowledge Graph & Visual Concept Map (Pages 38-39, 55 of Blueprint)

const KnowledgeGraphModule = {
  activeFilter: "All",
  hoveredNode: null,

  graphNodes: [
    { id: "packet", label: "Packet", layer: "Core", x: 120, y: 70, color: "#0284c7" },
    { id: "protocol", label: "Protocol", layer: "Core", x: 260, y: 70, color: "#0284c7" },
    { id: "encapsulation", label: "Encapsulation", layer: "Core", x: 410, y: 70, color: "#0284c7" },
    
    // Link Layer (Unit II)
    { id: "framing", label: "Framing", layer: "Link", x: 100, y: 180, color: "#059669" },
    { id: "crc", label: "CRC Check", layer: "Link", x: 230, y: 180, color: "#059669" },
    { id: "hamming-code", label: "Hamming Code", layer: "Link", x: 360, y: 180, color: "#059669" },
    { id: "ethernet", label: "Ethernet 802.3", layer: "Link", x: 500, y: 180, color: "#059669" },
    { id: "switch", label: "Switch & VLAN", layer: "Link", x: 630, y: 180, color: "#059669" },
    { id: "go-back-n", label: "Go-Back-N", layer: "Link", x: 180, y: 250, color: "#059669" },
    { id: "selective-repeat", label: "Selective Repeat", layer: "Link", x: 330, y: 250, color: "#059669" },

    // Network Layer (Unit III)
    { id: "network-layer", label: "Network Layer", layer: "Network", x: 120, y: 350, color: "#166534" },
    { id: "forwarding", label: "Forwarding Table", layer: "Network", x: 270, y: 350, color: "#166534" },
    { id: "routing", label: "Routing Plane", layer: "Network", x: 420, y: 350, color: "#166534" },
    { id: "dijkstra", label: "Dijkstra SPF", layer: "Network", x: 560, y: 350, color: "#166534" },
    { id: "distance-vector", label: "Distance Vector", layer: "Network", x: 700, y: 350, color: "#166534" },
    { id: "ipv4", label: "IPv4 Header", layer: "Network", x: 170, y: 430, color: "#166534" },
    { id: "ipv6", label: "IPv6 RFC 8200", layer: "Network", x: 310, y: 430, color: "#166534" },
    { id: "ospf", label: "OSPF Link-State", layer: "Network", x: 460, y: 430, color: "#166534" },
    { id: "bgp", label: "BGP Inter-Domain", layer: "Network", x: 610, y: 430, color: "#166534" },
    { id: "nat", label: "NAT Translation", layer: "Network", x: 100, y: 500, color: "#166534" },

    // Transport Layer (Unit IV)
    { id: "transport-layer", label: "Transport Layer", layer: "Transport", x: 160, y: 580, color: "#7c3aed" },
    { id: "tcp", label: "TCP RFC 9293", layer: "Transport", x: 310, y: 580, color: "#7c3aed" },
    { id: "udp", label: "UDP Datagram", layer: "Transport", x: 470, y: 580, color: "#7c3aed" },
    { id: "tcp-three-way-handshake", label: "3-Way Handshake", layer: "Transport", x: 220, y: 660, color: "#7c3aed" },
    { id: "tcp-flow-control", label: "Flow Control (rwnd)", layer: "Transport", x: 390, y: 660, color: "#7c3aed" },
    { id: "tcp-congestion-control", label: "Congestion (AIMD)", layer: "Transport", x: 560, y: 660, color: "#7c3aed" },

    // Application & Security (Unit V)
    { id: "dns", label: "DNS Resolution", layer: "Application", x: 620, y: 580, color: "#d97706" },
    { id: "http", label: "HTTP / HTTP/2", layer: "Application", x: 140, y: 750, color: "#d97706" },
    { id: "https", label: "HTTPS (over TLS)", layer: "Security", x: 290, y: 750, color: "#b45309" },
    { id: "tls", label: "TLS 1.3 Handshake", layer: "Security", x: 440, y: 750, color: "#b45309" },
    { id: "email-system", label: "Email (SMTP/IMAP)", layer: "Application", x: 600, y: 750, color: "#d97706" },
    { id: "firewall", label: "Firewalls (NIST)", layer: "Security", x: 150, y: 840, color: "#be123c" },
    { id: "ids", label: "IDS & IPS", layer: "Security", x: 310, y: 840, color: "#be123c" },
    { id: "rsa", label: "RSA Cryptography", layer: "Security", x: 480, y: 840, color: "#b45309" }
  ],

  graphEdges: [
    ["packet", "encapsulation"], ["protocol", "encapsulation"],
    ["encapsulation", "framing"], ["framing", "crc"], ["framing", "hamming-code"],
    ["framing", "ethernet"], ["ethernet", "switch"], ["framing", "go-back-n"], ["go-back-n", "selective-repeat"],
    ["packet", "network-layer"], ["network-layer", "forwarding"], ["network-layer", "routing"],
    ["routing", "dijkstra"], ["routing", "distance-vector"], ["dijkstra", "ospf"], ["distance-vector", "bgp"],
    ["forwarding", "ipv4"], ["forwarding", "ipv6"], ["ipv4", "nat"],
    ["network-layer", "transport-layer"], ["transport-layer", "tcp"], ["transport-layer", "udp"],
    ["tcp", "tcp-three-way-handshake"], ["tcp", "tcp-flow-control"], ["tcp", "tcp-congestion-control"],
    ["udp", "dns"], ["tcp", "http"], ["http", "https"], ["https", "tls"], ["tls", "rsa"],
    ["tcp", "email-system"], ["network-layer", "firewall"], ["firewall", "ids"], ["ids", "rsa"]
  ],

  renderGraphHub: function(container) {
    container.innerHTML = `
      <div class="welcome-banner" style="background: linear-gradient(100deg, #ede7f6 0%, #e0f2fe 50%, #f0fdf4 100%);">
        <div class="welcome-text">
          <div style="font-size: 0.85rem; font-weight: 800; color: #7c3aed; text-transform: uppercase; margin-bottom: 0.35rem;">
            Interactive Architecture • Blueprint Section 12 & 25
          </div>
          <h2>Computer Networks Knowledge Graph</h2>
          <p>Explore all interconnected concepts from Link Layer up to RSA Cryptography. Click any node to pop up quick definitions, prerequisites, and tutorials.</p>
        </div>
      </div>

      <!-- Graph Canvas Card -->
      <div class="study-card" style="margin-top: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
          <div style="font-size: 1rem; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 0.5rem;">
            <span>🕸️ Semantic Knowledge Graph</span>
            <span class="brand-badge" style="background: #ede7f6; color: #7c3aed;">34 Nodes</span>
          </div>

          <!-- Layer Filters -->
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;" id="graph-filter-container">
            <button class="graph-filter-btn ${KnowledgeGraphModule.activeFilter === 'All' ? 'active' : ''}" onclick="KnowledgeGraphModule.setFilter('All')">All Layers</button>
            <button class="graph-filter-btn ${KnowledgeGraphModule.activeFilter === 'Link' ? 'active' : ''}" onclick="KnowledgeGraphModule.setFilter('Link')">Link Layer (Unit II)</button>
            <button class="graph-filter-btn ${KnowledgeGraphModule.activeFilter === 'Network' ? 'active' : ''}" onclick="KnowledgeGraphModule.setFilter('Network')">Network (Unit III)</button>
            <button class="graph-filter-btn ${KnowledgeGraphModule.activeFilter === 'Transport' ? 'active' : ''}" onclick="KnowledgeGraphModule.setFilter('Transport')">Transport (Unit IV)</button>
            <button class="graph-filter-btn ${KnowledgeGraphModule.activeFilter === 'Application' ? 'active' : ''}" onclick="KnowledgeGraphModule.setFilter('Application')">App & Sec (Unit V)</button>
          </div>
        </div>

        <div style="width: 100%; height: 600px; background: #fafafa; border: 1px solid var(--border-light); border-radius: 14px; position: relative; overflow: hidden; box-shadow: inset 0 2px 8px rgba(0,0,0,0.02);">
          <canvas id="knowledge-graph-canvas" style="width: 100%; height: 100%; display: block;"></canvas>
          <div id="graph-node-tooltip" style="position: absolute; display: none; background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(8px); color: #ffffff; padding: 0.5rem 0.85rem; border-radius: 8px; font-size: 0.8rem; pointer-events: none; z-index: 10; box-shadow: 0 10px 25px rgba(0,0,0,0.2);"></div>
        </div>

        <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; color: #64748b; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            💡 <strong>Pro Tip:</strong> Hover over any node to highlight connections. Click to open its "Explain This" popover!
          </div>
          <div style="display: flex; gap: 0.75rem; font-weight: 700;">
            <span style="color: #059669;">● Link</span>
            <span style="color: #166534;">● Network</span>
            <span style="color: #7c3aed;">● Transport</span>
            <span style="color: #d97706;">● App</span>
            <span style="color: #be123c;">● Security</span>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      KnowledgeGraphModule.initGraphCanvas();
    }, 60);
  },

  setFilter: function(filter) {
    KnowledgeGraphModule.activeFilter = filter;
    document.querySelectorAll('#graph-filter-container .graph-filter-btn').forEach(btn => {
      if (btn.innerText.includes(filter) || (filter === 'All' && btn.innerText.includes('All'))) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    KnowledgeGraphModule.drawGraphCanvas();
  },

  initGraphCanvas: function() {
    const canvas = document.getElementById('knowledge-graph-canvas');
    if (!canvas) return;

    window.addEventListener('resize', KnowledgeGraphModule.drawGraphCanvas);

    canvas.onmousemove = function(e) {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const tooltip = document.getElementById('graph-node-tooltip');

      const w = rect.width;
      const h = rect.height;
      const scaleX = w / 780;
      const scaleY = h / 920;

      let found = null;
      KnowledgeGraphModule.graphNodes.forEach(node => {
        if (KnowledgeGraphModule.activeFilter !== "All" && node.layer !== KnowledgeGraphModule.activeFilter && node.layer !== "Core") {
          return;
        }
        const nx = node.x * scaleX;
        const ny = node.y * scaleY;
        const dist = Math.hypot(clickX - nx, clickY - ny);
        if (dist <= 20) {
          found = node;
        }
      });

      if (found) {
        canvas.style.cursor = 'pointer';
        KnowledgeGraphModule.hoveredNode = found.id;
        if (tooltip) {
          const c = (typeof CONCEPT_REGISTRY !== 'undefined' && CONCEPT_REGISTRY[found.id]) ? CONCEPT_REGISTRY[found.id] : null;
          tooltip.style.display = 'block';
          tooltip.style.left = (clickX + 15) + 'px';
          tooltip.style.top = (clickY - 10) + 'px';
          tooltip.innerHTML = `<strong>${found.label}</strong><br><span style="color: #94a3b8; font-size: 0.72rem;">${c ? c.oneLiner : found.layer}</span>`;
        }
      } else {
        canvas.style.cursor = 'default';
        KnowledgeGraphModule.hoveredNode = null;
        if (tooltip) tooltip.style.display = 'none';
      }
      KnowledgeGraphModule.drawGraphCanvas();
    };

    canvas.onmouseleave = function() {
      const tooltip = document.getElementById('graph-node-tooltip');
      if (tooltip) tooltip.style.display = 'none';
      KnowledgeGraphModule.hoveredNode = null;
      KnowledgeGraphModule.drawGraphCanvas();
    };

    canvas.onclick = function(e) {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const w = rect.width;
      const h = rect.height;
      const scaleX = w / 780;
      const scaleY = h / 920;

      KnowledgeGraphModule.graphNodes.forEach(node => {
        if (KnowledgeGraphModule.activeFilter !== "All" && node.layer !== KnowledgeGraphModule.activeFilter && node.layer !== "Core") {
          return;
        }
        const nx = node.x * scaleX;
        const ny = node.y * scaleY;
        const dist = Math.hypot(clickX - nx, clickY - ny);
        if (dist <= 22) {
          App.openExplainModal(node.id);
        }
      });
    };

    KnowledgeGraphModule.drawGraphCanvas();
  },

  drawGraphCanvas: function() {
    const canvas = document.getElementById('knowledge-graph-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    // High DPI Retina Support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);

    const scaleX = w / 780;
    const scaleY = h / 920;

    // Draw Edges
    KnowledgeGraphModule.graphEdges.forEach(edge => {
      const n1 = KnowledgeGraphModule.graphNodes.find(n => n.id === edge[0]);
      const n2 = KnowledgeGraphModule.graphNodes.find(n => n.id === edge[1]);
      if (n1 && n2) {
        const isHovered = KnowledgeGraphModule.hoveredNode === n1.id || KnowledgeGraphModule.hoveredNode === n2.id;
        const isFilteredOut = KnowledgeGraphModule.activeFilter !== "All" &&
          (n1.layer !== KnowledgeGraphModule.activeFilter && n1.layer !== "Core") &&
          (n2.layer !== KnowledgeGraphModule.activeFilter && n2.layer !== "Core");

        ctx.beginPath();
        ctx.moveTo(n1.x * scaleX, n1.y * scaleY);
        ctx.lineTo(n2.x * scaleX, n2.y * scaleY);

        if (isFilteredOut) {
          ctx.strokeStyle = '#f1f5f9';
          ctx.lineWidth = 1;
        } else if (isHovered) {
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 3;
        } else {
          ctx.strokeStyle = '#e2e8f0';
          ctx.lineWidth = 1.8;
        }
        ctx.stroke();
      }
    });

    // Draw Nodes
    KnowledgeGraphModule.graphNodes.forEach(node => {
      const isFilteredOut = KnowledgeGraphModule.activeFilter !== "All" && node.layer !== KnowledgeGraphModule.activeFilter && node.layer !== "Core";
      const isHovered = KnowledgeGraphModule.hoveredNode === node.id;

      const nx = node.x * scaleX;
      const ny = node.y * scaleY;
      const radius = isHovered ? 18 : 14;

      ctx.save();
      if (isFilteredOut) {
        ctx.globalAlpha = 0.25;
      }

      // Outer glow for hovered node
      if (isHovered) {
        ctx.beginPath();
        ctx.arc(nx, ny, radius + 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
        ctx.fill();
      }

      // Main circle
      ctx.beginPath();
      ctx.arc(nx, ny, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.lineWidth = isHovered ? 3.5 : 2.5;
      ctx.strokeStyle = node.color;
      ctx.stroke();

      // Inner dot
      ctx.beginPath();
      ctx.arc(nx, ny, 4, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();

      // Label
      ctx.fillStyle = isHovered ? '#0f172a' : '#334155';
      ctx.font = isHovered ? 'bold 11.5px "Plus Jakarta Sans", sans-serif' : '600 10.5px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(node.label, nx, ny + radius + 4);

      ctx.restore();
    });
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = KnowledgeGraphModule;
}
