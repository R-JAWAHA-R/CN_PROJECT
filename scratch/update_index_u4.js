const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

const startMarker = 'id: "unit4",';
const endMarker = 'id: "unit5",';

const startIndex = content.indexOf(startMarker);
if (startIndex === -1) {
    console.error("Could not find startMarker!");
    process.exit(1);
}

// Find previous '{'
const braceStart = content.lastIndexOf('{', startIndex);

// Find 'id: "unit5",'
const nextUnitIndex = content.indexOf(endMarker, startIndex);
if (nextUnitIndex === -1) {
    console.error("Could not find endMarker!");
    process.exit(1);
}
// Find the '{' before unit5
const braceEnd = content.lastIndexOf('{', nextUnitIndex);

console.log("Replacing section from", braceStart, "to", braceEnd);
console.log("Section to replace preview:\n", content.substring(braceStart, braceEnd));

const newUnit4Block = `{
                id: "unit4",
                module: "Unit 4: Transport Layer",
                badge: "5 Topics • 21 Subtopics",
                chapters: [
                    {
                        id: "topic-u4-1",
                        number: 1,
                        title: "TOPIC 1 – TRANSPORT LAYER SERVICES AND BERKELEY SOCKETS",
                        shortTitle: "Topic 1 – Services & Berkeley Sockets",
                        type: "folder",
                        items: [
                            { id: "u4-transport-services", title: "Transport Layer Services", type: "document" },
                            { id: "u4-berkeley-sockets", title: "Berkeley Sockets", type: "document" },
                            { id: "u4-socket-programming-example", title: "Socket Programming Example", type: "document" }
                        ],
                        subtopicIds: ["u4-transport-services", "u4-berkeley-sockets", "u4-socket-programming-example"]
                    },
                    {
                        id: "topic-u4-2",
                        number: 2,
                        title: "TOPIC 2 – ELEMENTS OF TRANSPORT PROTOCOLS",
                        shortTitle: "Topic 2 – Elements of Transport Protocols",
                        type: "folder",
                        items: [
                            { id: "u4-transport-addressing", title: "Addressing", type: "document" },
                            { id: "u4-connection-establishment", title: "Connection Establishment", type: "document" },
                            { id: "u4-connection-release", title: "Connection Release", type: "document" },
                            { id: "u4-flow-control-buffering", title: "Flow Control and Buffering", type: "document" }
                        ],
                        subtopicIds: ["u4-transport-addressing", "u4-connection-establishment", "u4-connection-release", "u4-flow-control-buffering"]
                    },
                    {
                        id: "topic-u4-3",
                        number: 3,
                        title: "TOPIC 3 – UDP (USER DATAGRAM PROTOCOL)",
                        shortTitle: "Topic 3 – UDP",
                        type: "folder",
                        items: [
                            { id: "u4-intro-udp", title: "Introduction to UDP", type: "document" },
                            { id: "u4-udp-services-characteristics", title: "UDP Services and Characteristics", type: "document" },
                            { id: "u4-udp-segment-format", title: "UDP Segment Format", type: "document" },
                            { id: "u4-udp-vs-tcp", title: "UDP vs TCP", type: "document" }
                        ],
                        subtopicIds: ["u4-intro-udp", "u4-udp-services-characteristics", "u4-udp-segment-format", "u4-udp-vs-tcp"]
                    },
                    {
                        id: "topic-u4-4",
                        number: 4,
                        title: "TOPIC 4 – TCP (TRANSMISSION CONTROL PROTOCOL)",
                        shortTitle: "Topic 4 – TCP",
                        type: "folder",
                        items: [
                            { id: "u4-intro-tcp", title: "Introduction to TCP", type: "document" },
                            { id: "u4-tcp-segment-header", title: "TCP Segment Header", type: "document" },
                            { id: "u4-tcp-connection-establishment", title: "TCP Connection Establishment (Three-Way Handshake)", type: "document" },
                            { id: "u4-tcp-connection-release", title: "TCP Connection Release", type: "document" },
                            { id: "u4-tcp-sliding-window", title: "Sliding Window", type: "document" },
                            { id: "u4-tcp-timer-management", title: "Timer Management", type: "document" }
                        ],
                        subtopicIds: ["u4-intro-tcp", "u4-tcp-segment-header", "u4-tcp-connection-establishment", "u4-tcp-connection-release", "u4-tcp-sliding-window", "u4-tcp-timer-management"]
                    },
                    {
                        id: "topic-u4-5",
                        number: 5,
                        title: "TOPIC 5 – CONGESTION CONTROL",
                        shortTitle: "Topic 5 – Congestion Control",
                        type: "folder",
                        items: [
                            { id: "u4-intro-congestion-control", title: "Introduction to Congestion Control", type: "document" },
                            { id: "u4-congestion-control-mechanisms", title: "Congestion Control Mechanisms", type: "document" },
                            { id: "u4-tcp-congestion-control", title: "TCP Congestion Control", type: "document" },
                            { id: "u4-congestion-network-performance", title: "Congestion Control and Network Performance", type: "document" }
                        ],
                        subtopicIds: ["u4-intro-congestion-control", "u4-congestion-control-mechanisms", "u4-tcp-congestion-control", "u4-congestion-network-performance"]
                    }
                ],
                topicIds: [
                    "u4-transport-services", "u4-berkeley-sockets", "u4-socket-programming-example",
                    "u4-transport-addressing", "u4-connection-establishment", "u4-connection-release", "u4-flow-control-buffering",
                    "u4-intro-udp", "u4-udp-services-characteristics", "u4-udp-segment-format", "u4-udp-vs-tcp",
                    "u4-intro-tcp", "u4-tcp-segment-header", "u4-tcp-connection-establishment", "u4-tcp-connection-release", "u4-tcp-sliding-window", "u4-tcp-timer-management",
                    "u4-intro-congestion-control", "u4-congestion-control-mechanisms", "u4-tcp-congestion-control", "u4-congestion-network-performance",
                    "transport-layer", "tcp", "udp", "udp-header", "tcp-three-way-handshake", "tcp-header", "sequence-number", "acknowledgement", "tcp-flow-control"
                ]
            },
            `;

content = content.substring(0, braceStart) + newUnit4Block + content.substring(braceEnd);
fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully updated syllabusModules in index.html!");

