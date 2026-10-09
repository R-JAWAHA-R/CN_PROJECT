// Unit V: Application Layer & Network Security - Curriculum & Topic Hub
// Provides curriculum overview and topic catalog linking directly to dedicated topic pages

const Unit5Module = {
  render: function(container) {
    container.innerHTML = `
      <!-- Unit Banner -->
      <div class="welcome-banner" style="background: linear-gradient(100deg, #fef3c7 0%, #fee2e2 50%, #fed7aa 100%);">
        <div class="welcome-text">
          <div style="font-size: 0.85rem; font-weight: 800; color: #b45309; text-transform: uppercase; margin-bottom: 0.35rem;">
            Semester V • Computer Networks • Kurose Ch 2, NIST & RFC 8017
          </div>
          <h2>Unit V: Application Layer, Security, Firewalls & RSA</h2>
          <p>Complete curriculum package covering DNS hierarchy, HTTP vs HTTPS with TLS, email protocols (SMTP/POP3/IMAP), NIST firewall and IDPS guidelines, and RFC 8017 RSA cryptography.</p>
        </div>
        <div class="welcome-scene">
          <div class="better-note" style="color: #b45309;">
            Security & Web<br>Mastery ♡
          </div>
        </div>
      </div>

      <!-- Unit Overview Card -->
      <div class="study-card" style="margin-bottom: 2rem;">
        <div class="study-card-header">
          <div>
            <span class="topic-number-badge" style="background: #fef3c7; color: #b45309;">Curriculum Guide</span>
            <h3 class="study-card-title">Unit V Learning Objectives</h3>
          </div>
          <span class="badge" style="background: #fef3c7; color: #b45309; font-weight: 700; padding: 6px 12px; border-radius: 9999px;">17 Dedicated Articles</span>
        </div>
        <div class="concept-explanation">
          <p>
            The Application Layer resides at the highest level of the network stack, providing user-facing network services and distributed applications. Simultaneously, robust cryptographic protocols and defense-in-depth security mechanisms protect data confidentiality, integrity, and availability.
          </p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #b45309;">1. Web & Name Resolution</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">DNS distributed hierarchical resolution (Root, TLD, Auth, Recursive), DNS resource records (A, AAAA, CNAME, MX), and HTTP/1.1 vs HTTP/2 vs HTTPS.</p>
            </div>
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #b45309;">2. Electronic Mail Architecture</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">Mail user agents, mail transfer agents, SMTP push protocol, and retrieval mechanisms: POP3 (download-and-delete) vs IMAP (server-synced folders).</p>
            </div>
            <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem;">
              <strong style="color: #b45309;">3. Perimeter Defense & Public Key Cryptography</strong>
              <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.3rem;">NIST SP 800-41 firewalls, NIST SP 800-94 IDS vs IPS, asymmetric keypairs, and RFC 8017 RSA key generation, modular math, OAEP and PSS padding.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Topic Navigator Pills (Clicking moves to dedicated page) -->
      <div class="topic-navigator-bar">
        <div class="nav-bar-title">
          <span>⚡ Direct Topic Navigator (Click to open full article page):</span>
          <span style="color: #b45309; font-size: 0.78rem;">17 Topics</span>
        </div>
        <div class="topic-pills-wrap">
          <button class="topic-nav-btn" onclick="App.loadTopic('application-layer')">1. Application Layer</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('dns')">2. Domain Name System</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('dns-records')">3. DNS Records</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('http')">4. HTTP Protocol</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('https')">5. HTTPS & TLS</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('email-system')">6. E-Mail Architecture</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('smtp')">7. SMTP Protocol</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('pop3')">8. POP3 Protocol</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('imap')">9. IMAP Protocol</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('firewall')">10. Firewall Architecture</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('ids')">11. Intrusion Detection (IDS)</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('ips')">12. Intrusion Prevention (IPS)</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('public-key-cryptography')">13. Public-Key Cryptography</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('rsa')">14. RSA Cryptosystem</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('rsa-encryption')">15. RSA Encryption Math</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('rsa-digital-signature')">16. RSA Digital Signatures</button>
          <button class="topic-nav-btn" onclick="App.loadTopic('rsa-padding')">17. RSA OAEP & PSS Padding</button>
        </div>
      </div>

      <!-- TOPIC CATALOG (Dedicated Pages) -->
      <div class="section-heading-row">
        <div>
          <h3 class="section-title">Unit V Topic Catalog</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.2rem;">Select any topic card to open its dedicated Wikipedia-style article with deep explanations, interactive simulations, and practice questions.</p>
        </div>
        <span class="badge" style="background: #fef3c7; color: #b45309; font-weight: 700; padding: 6px 12px; border-radius: 9999px;">17 Articles</span>
      </div>

      <div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; margin-top: 1rem;">

        <!-- 1. Application Layer -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('application-layer')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #fef3c7; color: #b45309;">Topic 1 • Foundation</span>
            <span class="badge-difficulty foundation">Foundation</span>
          </div>
          <h4 class="catalog-card-title">Application Layer</h4>
          <p class="catalog-card-desc">Layer 7 services, network socket APIs, client-server vs P2P architectures, and application requirements.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: Transport Layer</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('application-layer')">Read Full Article →</button>
        </div>

        <!-- 2. DNS -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('dns')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #fef3c7; color: #b45309;">Topic 2 • Major Topic</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Domain Name System (DNS)</h4>
          <p class="catalog-card-desc">Hierarchical distributed database, Root, TLD, Authoritative, Recursive queries, and Interactive Resolution Lab.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 7 min read</span>
            <span>Prereqs: UDP, IP</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('dns')">Read Full Article →</button>
        </div>

        <!-- 3. DNS Records -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('dns-records')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #fef3c7; color: #b45309;">Topic 3 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">DNS Resource Records</h4>
          <p class="catalog-card-desc">Resource Record tuples (Name, Value, Type, TTL): A, AAAA, CNAME, MX, NS, PTR, and zone delegations.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: DNS</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('dns-records')">Read Full Article →</button>
        </div>

        <!-- 4. HTTP -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('http')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #fef3c7; color: #b45309;">Topic 4 • Major Topic</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Hypertext Transfer Protocol (HTTP)</h4>
          <p class="catalog-card-desc">Stateless request-response paradigm, methods, status codes, cookies, caching, HTTP/1.1 vs HTTP/2 multiplexing.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 7 min read</span>
            <span>Prereqs: TCP</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('http')">Read Full Article →</button>
        </div>

        <!-- 5. HTTPS -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('https')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #fef3c7; color: #b45309;">Topic 5 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">HTTPS & TLS (RFC 8446)</h4>
          <p class="catalog-card-desc">HTTP encapsulated over TLS, X.509 certificate validation, asymmetric key exchange, and 1-RTT TLS 1.3 handshake.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>Prereqs: HTTP, Public-Key</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('https')">Read Full Article →</button>
        </div>

        <!-- 6. E-Mail Architecture -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('email-system')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #fef3c7; color: #b45309;">Topic 6 • Standard</span>
            <span class="badge-difficulty foundation">Foundation</span>
          </div>
          <h4 class="catalog-card-title">E-Mail System Architecture</h4>
          <p class="catalog-card-desc">User Agents (MUA), Mail Transfer Agents (MTA), mail queues, mailboxes, and end-to-end delivery stages.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: Application Layer</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('email-system')">Read Full Article →</button>
        </div>

        <!-- 7. SMTP -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('smtp')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #fef3c7; color: #b45309;">Topic 7 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Simple Mail Transfer Protocol (SMTP)</h4>
          <p class="catalog-card-desc">Push protocol (RFC 5321), TCP port 25/587, ASCII commands (HELO, MAIL FROM, RCPT TO, DATA), and server relaying.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: E-Mail System</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('smtp')">Read Full Article →</button>
        </div>

        <!-- 8. POP3 -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('pop3')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #fef3c7; color: #b45309;">Topic 8 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Post Office Protocol (POP3)</h4>
          <p class="catalog-card-desc">Mail retrieval (RFC 1939), TCP port 110/995, download-and-delete model, single device workflow, and limitation analysis.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 4 min read</span>
            <span>Prereqs: E-Mail System</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('pop3')">Read Full Article →</button>
        </div>

        <!-- 9. IMAP -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('imap')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #fef3c7; color: #b45309;">Topic 9 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Internet Message Access Protocol (IMAP)</h4>
          <p class="catalog-card-desc">Stateful server-side mailbox storage (RFC 3501), multi-device synchronization, hierarchical folders, and flag tracking.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: POP3</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('imap')">Read Full Article →</button>
        </div>

        <!-- 10. Firewall -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('firewall')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #fef3c7; color: #b45309;">Topic 10 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Firewalls (NIST SP 800-41)</h4>
          <p class="catalog-card-desc">Packet filtering (stateless vs stateful inspection), application proxies, next-generation firewalls, and DMZ design.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>Prereqs: IP, TCP, UDP</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('firewall')">Read Full Article →</button>
        </div>

        <!-- 11. IDS -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('ids')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #fef3c7; color: #b45309;">Topic 11 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Intrusion Detection Systems (IDS)</h4>
          <p class="catalog-card-desc">Passive monitoring (NIST SP 800-94), NIDS vs HIDS, signature matching, anomaly heuristics, and alerts.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: Firewall</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('ids')">Read Full Article →</button>
        </div>

        <!-- 12. IPS -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('ips')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #fef3c7; color: #b45309;">Topic 12 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">Intrusion Prevention Systems (IPS)</h4>
          <p class="catalog-card-desc">In-line proactive security, packet dropping, TCP reset injection, rate limiting, and real-time threat mitigation.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: IDS</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('ips')">Read Full Article →</button>
        </div>

        <!-- 13. Public-Key Cryptography -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('public-key-cryptography')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #fef3c7; color: #b45309;">Topic 13 • Foundation</span>
            <span class="badge-difficulty foundation">Foundation</span>
          </div>
          <h4 class="catalog-card-title">Public-Key Cryptography</h4>
          <p class="catalog-card-desc">Asymmetric trapdoor one-way functions, key distribution problem resolution, confidentiality vs authenticity.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: Security Basics</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('public-key-cryptography')">Read Full Article →</button>
        </div>

        <!-- 14. RSA Cryptosystem -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('rsa')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #fef3c7; color: #b45309;">Topic 14 • Major Topic</span>
            <span class="badge-difficulty advanced">Advanced</span>
          </div>
          <h4 class="catalog-card-title">RSA Cryptosystem (RFC 8017)</h4>
          <p class="catalog-card-desc">Rivest-Shamir-Adleman algorithm, integer factorization hardness, key generation, Euler totient, and Interactive RSA Lab.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 8 min read</span>
            <span>Prereqs: Public-Key Crypto</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('rsa')">Read Full Article →</button>
        </div>

        <!-- 15. RSA Encryption -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('rsa-encryption')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #fef3c7; color: #b45309;">Topic 15 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">RSA Encryption & Decryption Math</h4>
          <p class="catalog-card-desc">Modular exponentiation C = M^e mod n, M = C^d mod n, proof via Euler's Totient Theorem, and square-and-multiply algorithm.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>Prereqs: RSA</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('rsa-encryption')">Read Full Article →</button>
        </div>

        <!-- 16. RSA Digital Signatures -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('rsa-digital-signature')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #fef3c7; color: #b45309;">Topic 16 • Standard</span>
            <span class="badge-difficulty core">Core</span>
          </div>
          <h4 class="catalog-card-title">RSA Digital Signatures</h4>
          <p class="catalog-card-desc">Non-repudiation, signature generation S = H(M)^d mod n, signature verification V = S^e mod n, and integrity protection.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 5 min read</span>
            <span>Prereqs: RSA Encryption</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('rsa-digital-signature')">Read Full Article →</button>
        </div>

        <!-- 17. RSA Padding -->
        <div class="study-card topic-catalog-card" onclick="App.loadTopic('rsa-padding')">
          <div class="catalog-card-top">
            <span class="topic-number-badge" style="background: #fef3c7; color: #b45309;">Topic 17 • Standard</span>
            <span class="badge-difficulty advanced">Advanced</span>
          </div>
          <h4 class="catalog-card-title">RSA Padding: OAEP & PSS</h4>
          <p class="catalog-card-desc">Vulnerabilities of textbook RSA (malleability, chosen ciphertext), RSAES-OAEP for encryption, and RSASSA-PSS for signatures.</p>
          <div class="catalog-card-meta">
            <span>⏱️ 6 min read</span>
            <span>Prereqs: RSA</span>
          </div>
          <button class="read-article-btn" onclick="event.stopPropagation(); App.loadTopic('rsa-padding')">Read Full Article →</button>
        </div>

      </div>
    `;
  },

  // Math utility helpers preserved for backwards compatibility and testing
  isPrime: function(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  },

  gcd: function(a, b) {
    return b === 0 ? a : Unit5Module.gcd(b, a % b);
  },

  modInverse: function(e, phi) {
    let m0 = phi, t, q;
    let x0 = 0, x1 = 1;
    if (phi === 1) return 0;
    while (e > 1) {
      q = Math.floor(e / phi);
      t = phi;
      phi = e % phi;
      e = t;
      t = x0;
      x0 = x1 - q * x0;
      x1 = t;
    }
    if (x1 < 0) x1 += m0;
    return x1;
  },

  modPow: function(base, exp, mod) {
    let res = 1;
    base = base % mod;
    while (exp > 0) {
      if (exp % 2 === 1) res = (res * base) % mod;
      exp = Math.floor(exp / 2);
      base = (base * base) % mod;
    }
    return res;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Unit5Module;
}
