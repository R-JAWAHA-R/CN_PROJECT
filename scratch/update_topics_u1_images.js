const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'topics_u1.js');
let code = fs.readFileSync(filePath, 'utf8');

const imageMappings = {
  "computer-network": {
    imageUrl: "assets/images/unit1/computer-network-architecture.svg",
    imageCaption: "Global Internet Architecture: Hierarchical Tier-1, IXPs, Regional ISPs, and Access Networks"
  },
  "network-edge-core": {
    imageUrl: "assets/images/unit1/network-edge-core-access.svg",
    imageCaption: "Network Edge vs Network Core: Access Networks and Mesh Packet-Switched Router Fabrics"
  },
  "hosts-routers-switches": {
    imageUrl: "assets/images/unit1/network-hardware-devices.svg",
    imageCaption: "Layer-1, Layer-2, and Layer-3 Network Forwarding: Hosts, Switches, and Routers"
  },
  "protocol": {
    imageUrl: "assets/images/unit1/protocol-interfaces-primitives.svg",
    imageCaption: "Protocol Architecture: Service Access Points (SAPs) and the Four OSI Service Primitives"
  },
  "osi-model": {
    imageUrl: "assets/images/unit1/osi-7-layer-architecture.svg",
    imageCaption: "The 7-Layer OSI Reference Model (ISO/IEC 7498-1) and Protocol Data Units (PDUs)"
  },
  "tcp-ip-model": {
    imageUrl: "assets/images/unit1/tcp-ip-hourglass-architecture.svg",
    imageCaption: "The TCP/IP Protocol Architecture and Universal Hourglass Model"
  },
  "protocol-stack": {
    imageUrl: "assets/images/unit1/protocol-stack-encapsulation.svg",
    imageCaption: "Layered Protocol Stack: Vertical Hardware Transmission vs Horizontal Virtual Peer Protocol Exchange"
  },
  "encapsulation": {
    imageUrl: "assets/images/unit1/packet-encapsulation-decapsulation.svg",
    imageCaption: "End-to-End Encapsulation & Decapsulation: Headers, Payloads, and FCS Trailers"
  },
  "network-topologies": {
    imageUrl: "assets/images/unit1/network-topologies-comparison.svg",
    imageCaption: "Comparison of Network Topologies: Star, Full Mesh, Ring, Bus, and Tree Topologies"
  },
  "circuit-vs-packet-switching": {
    imageUrl: "assets/images/unit1/circuit-vs-packet-switching.svg",
    imageCaption: "Circuit Switching (Dedicated Reserved Paths) vs Packet Switching (Statistical Multiplexing & Queues)"
  },
  "transmission-media": {
    imageUrl: "assets/images/unit1/transmission-media-guided-unguided.svg",
    imageCaption: "Physical Transmission Media: Guided (UTP, Coaxial, Optical Fiber) vs Unguided (Radio, Microwave, IR)"
  },
  "network-delay-loss": {
    imageUrl: "assets/images/unit1/network-delays-loss-queue.svg",
    imageCaption: "The Four Principles of Network Delay: Processing, Queuing, Transmission, and Propagation"
  },
  "multiplexing": {
    imageUrl: "assets/images/unit1/multiplexing-fdm-tdm-wdm.svg",
    imageCaption: "Multiplexing Techniques: Frequency Division (FDM), Synchronous TDM, Wavelength Division (WDM), and Statistical TDM"
  },
  "analog-digital-signals": {
    imageUrl: "assets/images/unit1/signals-nyquist-shannon-capacity.svg",
    imageCaption: "Signal Fundamentals: Nyquist Bit Rate for Noiseless Channels vs Shannon Capacity for Noisy Channels"
  }
};

Object.keys(imageMappings).forEach(id => {
  const { imageUrl, imageCaption } = imageMappings[id];
  const target = `"${id}": {`;
  if (!code.includes(target)) {
    console.error("Missing topic target:", target);
    return;
  }
  // Find where infobox begins or where sections begins
  const topicIdx = code.indexOf(target);
  const insertMarker = `id: "${id}",`;
  const insertIdx = code.indexOf(insertMarker, topicIdx);
  if (insertIdx === -1) {
    console.error("Missing insert marker for:", id);
    return;
  }
  const insertPos = insertIdx + insertMarker.length;
  const addition = `\n    imageUrl: "${imageUrl}",\n    imageCaption: "${imageCaption}",`;
  code = code.substring(0, insertPos) + addition + code.substring(insertPos);
});

fs.writeFileSync(filePath, code, 'utf8');
console.log("Successfully updated js/topics_u1.js with imageUrl and imageCaption for all 14 topics!");

