const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../js/topics_u2_syllabus.js');
let code = fs.readFileSync(filePath, 'utf8');

const problemsToAddHtml = `
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Problem 28: MAC Address Learning & Unknown Destination Flooding (Switching)</p>
          <p class="text-xs text-slate-600 dark:text-slate-300 mt-1"><strong>Problem:</strong> A 3-port switch has empty tables. A frame arrives on Port 1 with Source MAC A and Destination MAC B. (1) What does the switch learn? (2) Through which ports is the frame transmitted?</p>
          <div class="text-xs text-slate-700 dark:text-slate-300 mt-2 font-mono bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
            <p>1. The switch inspects Source MAC A and updates table: Table[A] = Port 1 with aging timer = 300s.</p>
            <p>2. The switch queries its forwarding database for Destination MAC B. B is unknown.</p>
            <p class="font-bold text-emerald-600">Answer: Switch learns A &rarr; Port 1, and FLOODS the frame out Port 2 and Port 3 (all active ports except arrival Port 1).</p>
          </div>
        </div>

        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Problem 29: Known Destination Unicast Forwarding (Switching)</p>
          <p class="text-xs text-slate-600 dark:text-slate-300 mt-1"><strong>Problem:</strong> A switch has the forwarding table: [A: Port 1, B: Port 2, C: Port 3]. A frame arrives on Port 1 with Destination MAC B. Describe the switch forwarding decision.</p>
          <div class="text-xs text-slate-700 dark:text-slate-300 mt-2 font-mono bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
            <p>Lookup: Destination MAC B &rarr; Port 2.</p>
            <p>Verification: Destination Port (2) &ne; Arrival Port (1).</p>
            <p class="font-bold text-emerald-600">Answer: Selectively forwards frame exclusively out Port 2. No other ports receive traffic.</p>
          </div>
        </div>

        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Problem 30: Local Segment Filtering on Ingress Port (Switching)</p>
          <p class="text-xs text-slate-600 dark:text-slate-300 mt-1"><strong>Problem:</strong> A switch forwarding table contains: [A: Port 1, B: Port 2, C: Port 2]. A frame arrives on Port 2 with Destination MAC C. Describe the switch action.</p>
          <div class="text-xs text-slate-700 dark:text-slate-300 mt-2 font-mono bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
            <p>Lookup: Destination MAC C &rarr; Port 2.</p>
            <p>Verification: Destination Port (2) == Arrival Port (2).</p>
            <p class="font-bold text-emerald-600">Answer: The switch FILTERS (drops) the frame. Station C already received the transmission directly over the shared local segment.</p>
          </div>
        </div>

        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Problem 31: Dynamic Unknown Destination with Multiple Segment Ports (Switching)</p>
          <p class="text-xs text-slate-600 dark:text-slate-300 mt-1"><strong>Problem:</strong> A frame arrives on Port 3 with Source MAC X and Destination MAC D. The switch table contains: [A: Port 1, B: Port 2, C: Port 2]. Host D is not in the table. Detail the switch operations.</p>
          <div class="text-xs text-slate-700 dark:text-slate-300 mt-2 font-mono bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
            <p>1. Learning: Table[X] = Port 3 (new entry recorded with refresh timer).</p>
            <p>2. Forwarding lookup: Destination D is unmapped.</p>
            <p class="font-bold text-emerald-600">Answer: Floods frame out Port 1 and Port 2. Does NOT reflect back out Port 3.</p>
          </div>
        </div>

        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Problem 32: Choosing the Correct Device for Connecting Different IP Networks (Networking Devices)</p>
          <p class="text-xs text-slate-600 dark:text-slate-300 mt-1"><strong>Problem:</strong> A company wants to connect two different IP subnets: Subnet A (10.0.1.0/24) and Subnet B (10.0.2.0/24). Which networking device should be used and why?</p>
          <div class="text-xs text-slate-700 dark:text-slate-300 mt-2 font-mono bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
            <p>Analysis: Interconnecting distinct logical IP subnets requires Network Layer (Layer 3) routing.</p>
            <p class="font-bold text-emerald-600">Answer: Router. Routers operate at Layer 3, examine destination IP addresses against routing tables, and forward packets across distinct network boundaries while blocking Layer 2 broadcasts.</p>
          </div>
        </div>

        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Problem 33: Extending a Weak Signal Over a Long Cable (Networking Devices)</p>
          <p class="text-xs text-slate-600 dark:text-slate-300 mt-1"><strong>Problem:</strong> A digital signal becomes weak and distorted due to attenuation when travelling over a long 150m copper cable. Which device can regenerate the signal and why?</p>
          <div class="text-xs text-slate-700 dark:text-slate-300 mt-2 font-mono bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
            <p>Analysis: Digital signals attenuate and disperse over extended distances. An amplifier amplifies noise along with signal; a digital regenerator eliminates accumulated noise.</p>
            <p class="font-bold text-emerald-600">Answer: Repeater. Operates at Layer 1 (Physical Layer) to detect incoming bits, reconstruct original clean square-wave digital pulses, and retransmit at full signal strength.</p>
          </div>
        </div>

        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Problem 34: Connecting 30 Computers in a High-Speed LAN (Networking Devices)</p>
          <p class="text-xs text-slate-600 dark:text-slate-300 mt-1"><strong>Problem:</strong> A computer laboratory has 30 computers that need to communicate within the same Local Area Network with dedicated bandwidth and zero collisions. Which device is suitable?</p>
          <div class="text-xs text-slate-700 dark:text-slate-300 mt-2 font-mono bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
            <p>Analysis: Connecting 30 hosts to a hub creates a single shared collision domain where hosts compete for bandwidth and can collide. A switch provides microsegmentation.</p>
            <p class="font-bold text-emerald-600">Answer: Ethernet Switch. An L2 switch provides dedicated collision domains per port and full-duplex operation, allowing all 30 hosts to communicate concurrently without collisions at full wire speed.</p>
          </div>
        </div>

        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Problem 35: Understanding Hub Signal Distribution Behavior (Networking Devices)</p>
          <p class="text-xs text-slate-600 dark:text-slate-300 mt-1"><strong>Problem:</strong> A 5-port hub connects five computers (A, B, C, D, E). If Computer A sends a frame intended for Computer C, how does the hub distribute it, and what happens at the receivers?</p>
          <div class="text-xs text-slate-700 dark:text-slate-300 mt-2 font-mono bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
            <p>Operation: A hub is an unmanaged Layer 1 multiport repeater with no MAC address awareness.</p>
            <p class="font-bold text-emerald-600">Answer: The hub retransmits the bits out all other ports (B, C, D, E). Hosts B, D, and E examine destination MAC, detect a mismatch, and drop the frame; Host C accepts and processes the frame.</p>
          </div>
        </div>

        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p class="font-bold text-slate-800 dark:text-slate-200">Problem 36: Identifying the Purpose of a Default Gateway (Networking Devices)</p>
          <p class="text-xs text-slate-600 dark:text-slate-300 mt-1"><strong>Problem:</strong> A computer has IP address 192.168.1.10/24 and default gateway 192.168.1.1. What is the operational purpose of the default gateway when the computer connects to an external web server?</p>
          <div class="text-xs text-slate-700 dark:text-slate-300 mt-2 font-mono bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
            <p>Routing Logic: Host checks if destination IP is in 192.168.1.0/24. Since the web server is remote, direct delivery is impossible.</p>
            <p class="font-bold text-emerald-600">Answer: The default gateway acts as the local exit point and next-hop router. The host encapsulates the packet in a frame addressed to the gateway's MAC address, and the gateway routes the packet to remote networks.</p>
          </div>
        </div>
`;

// Insert problemsToAddHtml right before the closing tag of Problem 27 in overview
const targetMarker = `<p class="font-bold text-emerald-600">Answer: 32 bits (CRC-32)</p>\\n          </div>\\n        </div>\\n`;
const altMarker = `<p class="font-bold text-emerald-600">Answer: 32 bits (CRC-32)</p>
          </div>
        </div>`;

let found = false;
if (code.includes(altMarker)) {
  code = code.replace(altMarker, altMarker + problemsToAddHtml);
  found = true;
} else {
  // Let's find via substring search
  const idx = code.indexOf('Problem 27: Frame Check Sequence');
  if (idx !== -1) {
    const endDivIdx = code.indexOf('</div>\\n        </div>\\n', idx);
    if (endDivIdx !== -1) {
      const insertAt = endDivIdx + '</div>\\n        </div>\\n'.length;
      // Convert newlines in problemsToAddHtml to \\n
      const escapedHtml = problemsToAddHtml.replace(/\n/g, '\\n').replace(/"/g, '\\"');
      code = code.slice(0, insertAt) + escapedHtml + code.slice(insertAt);
      found = true;
    }
  }
}

if (!found) {
  console.error("Could not find insertion point for Problem 28-36!");
  process.exit(1);
}

fs.writeFileSync(filePath, code, 'utf8');
console.log("Successfully enriched u2-numerical-problems with Problems 28 to 36!");

