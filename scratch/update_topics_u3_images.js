const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'topics_u3.js');
let code = fs.readFileSync(filePath, 'utf8');

const u3Mappings = {
  "network-layer": {
    imageUrl: "assets/images/unit3/topic2-internetworking/internetworking-concept.svg",
    imageCaption: "Network Layer Architecture: Host-to-Host Delivery, Data Plane vs Control Plane"
  },
  "forwarding": {
    imageUrl: "assets/images/unit3/topic2-internetworking/router-architecture.svg",
    imageCaption: "Data Plane Forwarding Engine: Input Ports, Switching Fabric, and Output Queues"
  },
  "routing": {
    imageUrl: "assets/images/unit3/topic3-routing-algorithms/routing-algorithm-classification.svg",
    imageCaption: "Classification of Routing Algorithms: Global vs Decentralized, Static vs Dynamic"
  },
  "ospf": {
    imageUrl: "assets/images/unit3/topic4-dv-ls-routing/ospf-areas.svg",
    imageCaption: "Open Shortest Path First (OSPF) Hierarchical Areas and Link-State Advertising"
  },
  "bgp": {
    imageUrl: "assets/images/unit3/topic4-dv-ls-routing/dv-vs-ls-comparison.svg",
    imageCaption: "Inter-Domain Routing: Border Gateway Protocol (BGP-4) Path Vector Mechanism"
  },
  "sdn": {
    imageUrl: "assets/images/unit3/topic2-internetworking/network-interconnection-devices.svg",
    imageCaption: "Software-Defined Networking (SDN): Decoupled Control Plane and Programmable Switches"
  },
  "nat": {
    imageUrl: "assets/images/unit3/topic1-ip-addresses/private-ip-ranges.svg",
    imageCaption: "Network Address Translation (NAT): Mapping Private IP Ranges to Public WAN Addresses"
  }
};

Object.keys(u3Mappings).forEach(id => {
  const { imageUrl, imageCaption } = u3Mappings[id];
  const target = `"${id}": {`;
  if (!code.includes(target)) {
    console.error("Missing topic target in topics_u3.js:", target);
    return;
  }
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
console.log("Successfully updated js/topics_u3.js with imageUrl and imageCaption for the 7 topics!");

