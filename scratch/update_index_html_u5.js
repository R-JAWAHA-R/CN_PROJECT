const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

const targetStr = `            {
                id: "unit5",
                module: "Unit 5: Application Layer",
                badge: "17 Topics",
                topicIds: [
                    "application-layer", "dns", "dns-records", "http",
                    "https", "email-system", "smtp", "pop3", "imap",
                    "firewall", "ids", "ips", "public-key-cryptography",
                    "rsa", "rsa-encryption", "rsa-digital-signature", "rsa-padding"
                ]
            }`;

const replacementStr = `            {
                id: "unit5",
                module: "Unit 5 – Application Layer",
                badge: "5 Topics • 19 Subtopics",
                chapters: [
                    {
                        id: "topic-u5-1",
                        number: 1,
                        title: "TOPIC 1 – DNS, E-MAIL AND WWW",
                        shortTitle: "Topic 1 – DNS, E-Mail & WWW",
                        type: "folder",
                        items: [
                            { id: "dns", title: "DNS (Domain Name System)", type: "document" },
                            { id: "email-architecture", title: "E-Mail Architecture", type: "document" },
                            { id: "www", title: "WWW (World Wide Web)", type: "document" }
                        ],
                        subtopicIds: ["dns", "email-architecture", "www"]
                    },
                    {
                        id: "topic-u5-2",
                        number: 2,
                        title: "TOPIC 2 – HTTP (HYPERTEXT TRANSFER PROTOCOL)",
                        shortTitle: "Topic 2 – HTTP",
                        type: "folder",
                        items: [
                            { id: "http-intro", title: "Introduction to HTTP", type: "document" },
                            { id: "http-architecture", title: "HTTP Architecture", type: "document" },
                            { id: "http-request-response", title: "HTTP Request and Response", type: "document" },
                            { id: "http-working", title: "Working of HTTP", type: "document" }
                        ],
                        subtopicIds: ["http-intro", "http-architecture", "http-request-response", "http-working"]
                    },
                    {
                        id: "topic-u5-3",
                        number: 3,
                        title: "TOPIC 3 – CONTENT DELIVERY AND WEB ARCHITECTURE",
                        shortTitle: "Topic 3 – Content Delivery & Web Architecture",
                        type: "folder",
                        items: [
                            { id: "content-delivery", title: "Content Delivery", type: "document" },
                            { id: "server-farms", title: "Server Farms", type: "document" },
                            { id: "web-proxies", title: "Web Proxies", type: "document" }
                        ],
                        subtopicIds: ["content-delivery", "server-farms", "web-proxies"]
                    },
                    {
                        id: "topic-u5-4",
                        number: 4,
                        title: "TOPIC 4 – PEER-TO-PEER NETWORKS AND NETWORK PROTECTION",
                        shortTitle: "Topic 4 – P2P & Network Protection",
                        type: "folder",
                        items: [
                            { id: "p2p-networks", title: "Peer-to-Peer Networks", type: "document" },
                            { id: "firewalls", title: "Firewalls", type: "document" },
                            { id: "ids", title: "Intrusion Detection System (IDS)", type: "document" }
                        ],
                        subtopicIds: ["p2p-networks", "firewalls", "ids"]
                    },
                    {
                        id: "topic-u5-5",
                        number: 5,
                        title: "TOPIC 5 – NETWORK SECURITY AND CRYPTOGRAPHY",
                        shortTitle: "Topic 5 – Network Security & Cryptography",
                        type: "folder",
                        items: [
                            { id: "intro-cryptography", title: "Introduction to Cryptography", type: "document" },
                            { id: "substitution-ciphers", title: "Substitution Ciphers", type: "document" },
                            { id: "transposition-ciphers", title: "Transposition Ciphers", type: "document" },
                            { id: "symmetric-algorithms", title: "Symmetric Algorithms", type: "document" },
                            { id: "public-key-algorithms", title: "Public Key Algorithms", type: "document" },
                            { id: "rsa-algorithm", title: "RSA Algorithm", type: "document" }
                        ],
                        subtopicIds: ["intro-cryptography", "substitution-ciphers", "transposition-ciphers", "symmetric-algorithms", "public-key-algorithms", "rsa-algorithm"]
                    }
                ],
                topicIds: [
                    "dns", "email-architecture", "www",
                    "http-intro", "http-architecture", "http-request-response", "http-working",
                    "content-delivery", "server-farms", "web-proxies",
                    "p2p-networks", "firewalls", "ids",
                    "intro-cryptography", "substitution-ciphers", "transposition-ciphers", "symmetric-algorithms", "public-key-algorithms", "rsa-algorithm"
                ]
            }`;

// Handle both CRLF and LF
const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedTarget = targetStr.replace(/\r\n/g, '\n');

if (!normalizedContent.includes(normalizedTarget)) {
  console.error('Target not found in index.html!');
  process.exit(1);
}

// Preserve original line endings if CRLF was used
const usesCRLF = content.includes('\r\n');
const updatedNormalized = normalizedContent.replace(normalizedTarget, replacementStr.replace(/\r\n/g, '\n'));
const finalContent = usesCRLF ? updatedNormalized.replace(/\n/g, '\r\n') : updatedNormalized;

fs.writeFileSync(indexPath, finalContent, 'utf8');
console.log('Successfully updated index.html with Unit 5 chapters and topics!');

