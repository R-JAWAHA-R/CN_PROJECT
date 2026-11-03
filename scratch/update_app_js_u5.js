const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'js', 'app.js');
let content = fs.readFileSync(appPath, 'utf8');

const targetStr = `        <!-- UNIT V DIRECTORY -->
        <div class="study-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 style="color: #b45309; font-size: 1.25rem; font-weight: 800; margin: 0;">
              Unit V: App Layer, Security & RSA
            </h3>
            <span class="badge" style="background: #fef3c7; color: #b45309; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">17 Pages</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.45rem;">
            <button class="topic-nav-btn" onclick="App.loadTopic('application-layer')">1. Application Layer Principles ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('dns')">2. Domain Name System (DNS & Lab) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('dns-records')">3. DNS Resource Records (A, MX, etc.) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('http')">4. HTTP Protocol & Statelessness ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('https')">5. HTTPS & TLS (RFC 8446) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('email-system')">6. Electronic Mail Architecture ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('smtp')">7. SMTP Protocol (Port 25/587) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('pop3')">8. Post Office Protocol (POP3) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('imap')">9. IMAP Protocol & Folder Sync ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('firewall')">10. Firewalls (NIST SP 800-41) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('ids')">11. Intrusion Detection Systems (IDS) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('ips')">12. Intrusion Prevention Systems (IPS) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('public-key-cryptography')">13. Public-Key Cryptography Principles ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('rsa')">14. RSA Cryptosystem & Interactive Lab ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('rsa-encryption')">15. RSA Encryption & Decryption Math ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('rsa-digital-signature')">16. RSA Digital Signatures ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('rsa-padding')">17. RSA OAEP & PSS Padding ➔</button>
          </div>
        </div>`;

const replacementStr = `        <!-- UNIT 5 DIRECTORY -->
        <div class="study-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 style="color: #b45309; font-size: 1.25rem; font-weight: 800; margin: 0;">
              Unit 5 – Application Layer
            </h3>
            <span class="badge" style="background: #fef3c7; color: #b45309; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">5 Topics • 19 Subtopics</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.45rem;">
            <button class="topic-nav-btn" onclick="App.loadTopic('dns')">Topic 1 – DNS, E-Mail and WWW ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('http-intro')">Topic 2 – HTTP (Hypertext Transfer Protocol) ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('content-delivery')">Topic 3 – Content Delivery and Web Architecture ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('p2p-networks')">Topic 4 – Peer-to-Peer Networks and Network Protection ➔</button>
            <button class="topic-nav-btn" onclick="App.loadTopic('intro-cryptography')">Topic 5 – Network Security and Cryptography ➔</button>
          </div>
        </div>`;

const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedTarget = targetStr.replace(/\r\n/g, '\n');

if (!normalizedContent.includes(normalizedTarget)) {
  console.error('Target not found in js/app.js!');
  process.exit(1);
}

const usesCRLF = content.includes('\r\n');
const updatedNormalized = normalizedContent.replace(normalizedTarget, replacementStr.replace(/\r\n/g, '\n'));
const finalContent = usesCRLF ? updatedNormalized.replace(/\n/g, '\r\n') : updatedNormalized;

fs.writeFileSync(appPath, finalContent, 'utf8');
console.log('Successfully updated Unit 5 dashboard in js/app.js');

