// Topic 5: Network Security and Cryptography
module.exports = {
  "intro-cryptography": {
    "id": "intro-cryptography",
    "title": "Introduction to Cryptography",
    "unit": "Unit 5 – Application Layer",
    "unitId": "unit5",
    "level": "Level 1 — Cryptographic Foundations",
    "category": "security",
    "difficulty": "Core",
    "readingTime": "25 min read",
    "standard": "NIST SP 800-175B / Forouzan Chapter 30.1",
    "oneLiner": "The science and mathematical practice of securing information, communications, and transactions against adversarial manipulation across insecure communication channels.",
    "quickAnswer": "Cryptography is the science of transforming readable plaintext into unintelligible ciphertext using mathematical algorithms and secret keys. It underpins modern cybersecurity by enforcing four fundamental security services: Confidentiality (preventing unauthorized reading), Data Integrity (detecting unauthorized modifications), Authentication (verifying identity and origin), and Non-repudiation (preventing denial of prior commitments).",
    "whyItMatters": "Every modern online interaction—from HTTPS browsing, banking, e-commerce, VPN tunnels, and encrypted messaging to digital blockchain ledgers—relies entirely on cryptography to guarantee privacy and trust over intrinsically untrusted, public communication networks.",
    "infobox": {
      "layer": "Application Layer & Presentation Layer (OSI Layer 6/7)",
      "standard": "NIST SP 800-175B, ISO/IEC 27002, RFC 4949",
      "type": "Mathematical & Network Security Framework",
      "prerequisites": [
        "dns",
        "http-intro"
      ],
      "relatedConcepts": [
        "substitution-ciphers",
        "transposition-ciphers",
        "symmetric-algorithms",
        "public-key-algorithms",
        "rsa-algorithm"
      ],
      "compareWith": [
        "firewalls",
        "ids"
      ],
      "primaryUses": [
        "End-to-end data encryption across public networks (TLS/SSL)",
        "Cryptographic identity verification and mutual authentication",
        "Digital signatures for legal contracts and code signing",
        "Tamper-evident message integrity validation (HMAC, SHA-256)"
      ],
      "standardRfc": "RFC 4949 (Internet Security Glossary)"
    },
    "learningObjectives": [
      "Define plaintext, ciphertext, cipher, key space, cryptanalysis, and cryptology",
      "Explain the 4 fundamental security services: Confidentiality, Integrity, Authentication, and Non-repudiation",
      "Differentiate between Passive Attacks (eavesdropping, traffic analysis) and Active Attacks (masquerading, replay, tampering)",
      "State Kerckhoffs's Principle and explain why security through obscurity is fundamentally flawed",
      "Classify cryptanalysis attack models based on the adversary's available knowledge (Ciphertext-only, Known-plaintext, Chosen-plaintext, Chosen-ciphertext)"
    ],
    "prerequisitesList": [
      {
        "concept": "Network Communication Stack",
        "meaning": "Understanding how data packets traverse intermediate routers, switches, and ISPs without native physical protection"
      },
      {
        "concept": "Modular Arithmetic Fundamentals",
        "meaning": "Basic concept of remainder arithmetic modulo n (clock arithmetic) used in cryptographic rings"
      }
    ],
    "imageUrl": "assets/images/unit5/topic5/cryptography-fundamentals.svg",
    "imageCaption": "Figure 5.14: Fundamental Model of Cryptographic System with Security Services and Adversarial Attack Vectors",
    "sections": {
      "overview": "\n        <p class=\"mb-3\">\n          Throughout human history, military, diplomatic, and commercial operations have depended on the ability to transmit sensitive messages securely across untrusted environments. In computer networking, data routinely traverses dozen of untrusted intermediate routers, Internet Service Providers (ISPs), and open wireless frequencies. Without protection, any adversary with physical or logical access can tap the link, read communications, tamper with content, or impersonate legitimate communicators.\n        </p>\n        <p class=\"mb-3\">\n          <strong>Cryptography</strong> (derived from the Greek <em>kryptos</em> meaning \"hidden\" and <em>graphein</em> meaning \"to write\") is the discipline encompassing the mathematical principles, algorithms, and protocols designed to secure information against unauthorized access, modification, and forgery.\n        </p>\n      ",
      "howItWorks": "\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">1. The Fundamental Cryptographic Model</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-3\">\n          Every cryptographic communication model consists of five core components:\n        </p>\n        <div class=\"grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-4\">\n          <div class=\"p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700\">\n            <span class=\"font-bold text-blue-600 dark:text-blue-400\">Plaintext ($P$ or $M$):</span> The original, intelligible message or raw data stream before transformation.\n          </div>\n          <div class=\"p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700\">\n            <span class=\"font-bold text-blue-600 dark:text-blue-400\">Ciphertext ($C$):</span> The unintelligible, scrambled bit stream or text produced by an encryption algorithm.\n          </div>\n          <div class=\"p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700\">\n            <span class=\"font-bold text-blue-600 dark:text-blue-400\">Encryption Algorithm ($E_K$):</span> The mathematical function that transforms plaintext into ciphertext using an encryption key: $C = E_K(P)$.\n          </div>\n          <div class=\"p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700\">\n            <span class=\"font-bold text-blue-600 dark:text-blue-400\">Decryption Algorithm ($D_K$):</span> The inverse mathematical function that recovers the original plaintext from ciphertext using a decryption key: $P = D_K(C) = D_K(E_K(P))$.\n          </div>\n        </div>\n\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">2. The Four Pillars of Information Security</h3>\n        <div class=\"overflow-x-auto mb-4\">\n          <table class=\"w-full text-xs text-left border border-slate-200 dark:border-slate-700\">\n            <thead class=\"bg-slate-100 dark:bg-slate-800 font-bold\">\n              <tr>\n                <th class=\"p-2 border\">Security Goal</th>\n                <th class=\"p-2 border\">Definition & Objective</th>\n                <th class=\"p-2 border\">Cryptographic Mechanism</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td class=\"p-2 border font-semibold text-sky-700 dark:text-sky-300\">Confidentiality</td>\n                <td class=\"p-2 border\">Ensures that information is accessible only to authorized entities and kept concealed from unauthorized eavesdroppers.</td>\n                <td class=\"p-2 border font-mono\">Symmetric (AES) & Asymmetric (RSA) Encryption</td>\n              </tr>\n              <tr>\n                <td class=\"p-2 border font-semibold text-emerald-700 dark:text-emerald-300\">Data Integrity</td>\n                <td class=\"p-2 border\">Assures that transmitted data cannot be altered, substituted, or corrupted in transit without immediate detection.</td>\n                <td class=\"p-2 border font-mono\">Cryptographic Hash Functions (SHA-256) & HMAC</td>\n              </tr>\n              <tr>\n                <td class=\"p-2 border font-semibold text-amber-700 dark:text-amber-300\">Authentication</td>\n                <td class=\"p-2 border\">Confirms the true identity of communicating peers (Entity Authentication) and verifies the source of the message (Data Origin Authentication).</td>\n                <td class=\"p-2 border font-mono\">Digital Signatures, Certificates (X.509), Kerberos</td>\n              </tr>\n              <tr>\n                <td class=\"p-2 border font-semibold text-purple-700 dark:text-purple-300\">Non-Repudiation</td>\n                <td class=\"p-2 border\">Prevents the sender from falsely denying having sent a message or initiated a financial transaction.</td>\n                <td class=\"p-2 border font-mono\">Asymmetric Digital Signatures with PKI timestamping</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">3. Classification of Adversarial Network Attacks</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          Adversarial threats against network communications fall into two major categories:\n        </p>\n        <ul class=\"text-xs list-disc pl-5 space-y-1 mb-4 text-slate-700 dark:text-slate-300\">\n          <li><strong>Passive Attacks:</strong> The attacker monitors or snoops on the transmission channel without modifying packet contents. Examples include <em>Eavesdropping</em> (intercepting plain VoIP or HTTP credentials) and <em>Traffic Analysis</em> (analyzing packet lengths, transmission frequency, and routing topology to infer confidential business relationships). Passive attacks are difficult to detect; therefore, the defense focus is <strong>prevention through strong encryption</strong>.</li>\n          <li><strong>Active Attacks:</strong> The attacker actively injects, alters, delays, replays, or terminates communications. Major forms include:\n            <ul class=\"list-circle pl-4 mt-1 space-y-0.5\">\n              <li><em>Masquerading (Spoofing):</em> An entity pretends to be a different entity (e.g., DNS spoofing, IP address spoofing).</li>\n              <li><em>Replay Attack:</em> Capturing legitimate authentication tokens or transaction requests and re-transmitting them later to duplicate an action.</li>\n              <li><em>Message Modification:</em> Modifying data packets in transit (e.g., altering a bank transfer recipient IBAN).</li>\n              <li><em>Denial of Service (DoS):</em> Overwhelming server bandwidth or exhausting CPU resources to deny service to legitimate clients.</li>\n            </ul>\n          </li>\n        </ul>\n\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">4. Kerckhoffs's Principle (1883)</h3>\n        <div class=\"p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 rounded-lg text-xs mb-3\">\n          <p class=\"font-bold text-amber-900 dark:text-amber-200 mb-1\">Kerckhoffs's Principle:</p>\n          <p class=\"italic text-slate-800 dark:text-slate-200\">\n            \"A cryptographic system should be secure even if everything about the system, except the key, is public knowledge.\"\n          </p>\n        </div>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          Claude Shannon famously rephrased this as <em>\"the enemy knows the system.\"</em> In professional engineering:\n        </p>\n        <ul class=\"text-xs list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300\">\n          <li><strong>Security through Obscurity:</strong> Relying on keeping secret algorithms or protocols concealed. This always fails; reverse engineering, disassembly, or code leaks expose the flaw, rendering all keys and deployments instantly compromised.</li>\n          <li><strong>Open Cryptographic Standards:</strong> Openly publishing algorithms (like AES and RSA) allows global mathematicians and cryptanalysts to rigorously stress-test and probe them for years. Security rests solely on the mathematical entropy and confidentiality of the <strong>Key</strong>.</li>\n        </ul>\n      ",
      "technicalDetails": "\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">Cryptanalysis Attack Models</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          Cryptanalysis is the science of breaking ciphers and recovering plaintexts or keys without prior knowledge of the secret key. The four classical cryptanalytic attack models, ordered from least to greatest attacker capability:\n        </p>\n        <div class=\"space-y-2 text-xs\">\n          <div class=\"p-2 bg-slate-50 dark:bg-slate-800 rounded border\">\n            <span class=\"font-bold text-indigo-600 dark:text-indigo-400\">1. Ciphertext-Only Attack (COA):</span>\n            The adversary has access only to a set of intercepted ciphertexts $C_1, C_2, \\dots$. The attacker must deduce the plaintext or secret key purely through statistical properties, language entropy, or brute-force key search.\n          </div>\n          <div class=\"p-2 bg-slate-50 dark:bg-slate-800 rounded border\">\n            <span class=\"font-bold text-indigo-600 dark:text-indigo-400\">2. Known-Plaintext Attack (KPA):</span>\n            The adversary possesses matching pairs of plaintext and ciphertext: $(P_1, C_1), (P_2, C_2), \\dots$ (for example, standard protocol headers like <code>GET / HTTP/1.1</code> or email greeting banners). The objective is to discover the secret key $K$ used to encrypt subsequent messages.\n          </div>\n          <div class=\"p-2 bg-slate-50 dark:bg-slate-800 rounded border\">\n            <span class=\"font-bold text-indigo-600 dark:text-indigo-400\">3. Chosen-Plaintext Attack (CPA):</span>\n            The adversary can select arbitrary plaintexts of their choosing and obtain the corresponding ciphertexts $C_i = E_K(P_i)$. The adversary uses this oracle capability to probe specific bit differentials, linear approximations, or structural weaknesses in the cipher.\n          </div>\n          <div class=\"p-2 bg-slate-50 dark:bg-slate-800 rounded border\">\n            <span class=\"font-bold text-indigo-600 dark:text-indigo-400\">4. Chosen-Ciphertext Attack (CCA):</span>\n            The adversary can submit arbitrary ciphertexts to a decryption oracle and observe the decrypted plaintexts $P_i = D_K(C_i)$. Modern ciphers and public-key systems must achieve security against adaptive chosen-ciphertext attacks (IND-CCA2).\n          </div>\n        </div>\n      ",
      "workedExamples": {
        "level1": "\n          <strong>Exhaustive Key Search (Brute-Force Attack) Calculation:</strong><br/>\n          If a cipher uses a key length of $k$ bits, the total key space contains $2^k$ possible keys.<br/>\n          • For a 56-bit DES key: $2^{56} \\approx 7.2 \\times 10^{16}$ keys.<br/>\n          &nbsp;&nbsp;At a supercomputer testing rate of $10^{12}$ (1 trillion) keys per second:<br/>\n          &nbsp;&nbsp;$\\text{Time} = \\frac{7.2 \\times 10^{16}}{10^{12}} = 72,000 \\text{ seconds} \\approx 20 \\text{ hours}$ to break DES!<br/>\n          • For a 128-bit AES key: $2^{128} \\approx 3.4 \\times 10^{38}$ keys.<br/>\n          &nbsp;&nbsp;At $10^{18}$ tests/sec (exascale supercluster), cracking 128-bit AES requires $1.07 \\times 10^{13}$ years—billions of times older than the age of the universe!\n        ",
        "level2": "\n          <strong>Defeating Replay Attacks using Nonces and Timestamps:</strong><br/>\n          In a banking transfer protocol where Alice authorizes \"$1,000 to Bob\":<br/>\n          • Flawed Design: Alice signs <code>{action: \"transfer\", amount: 1000, to: \"Bob\"}</code>. Eve intercepts the ciphertext and re-submits it 50 times, draining Alice's account.<br/>\n          • Secure Design: Alice incorporates a strictly incrementing counter or pseudo-random <strong>Nonce</strong> (Number used Once) and a Unix epoch timestamp:<br/>\n          &nbsp;&nbsp;<code>{action: \"transfer\", amount: 1000, to: \"Bob\", nonce: 849201, timestamp: 1772659200}</code>.<br/>\n          The bank server tracks consumed nonces within a 5-minute sliding window, immediately dropping any duplicate replay submission!\n        ",
        "level3": "\n          <strong>Information-Theoretic Security vs. Computational Security:</strong><br/>\n          • <em>Computational Security:</em> The cipher cannot be broken within feasible physical constraints (energy, time, money) using known algorithms and current or anticipated computing hardware (e.g., AES-256).<br/>\n          • <em>Information-Theoretic (Unconditional) Security:</em> The ciphertext provides zero information about the plaintext, even against an adversary with infinite computing power and infinite time (proven by Claude Shannon for the One-Time Pad).\n        "
      },
      "advantagesLimitations": "\n        <div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 text-xs\">\n          <div class=\"p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800\">\n            <h4 class=\"font-bold text-emerald-800 dark:text-emerald-300 mb-2\">Cryptographic Strengths</h4>\n            <ul class=\"space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300\">\n              <li>Provides provable mathematical guarantees of confidentiality and integrity across untrusted links.</li>\n              <li>Enables trust relationships between parties who have never met in person.</li>\n              <li>Standardized open algorithms allow public scrutiny, bug discovery, and continuous hardening.</li>\n            </ul>\n          </div>\n          <div class=\"p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800\">\n            <h4 class=\"font-bold text-rose-800 dark:text-rose-300 mb-2\">Real-World Pitfalls & Attack Surfaces</h4>\n            <ul class=\"space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300\">\n              <li>Key management vulnerability: A 256-bit key stored on an unencrypted laptop disk negates all mathematical strength.</li>\n              <li>Side-Channel Attacks: Power consumption, cache-timing, and acoustic emissions can leak secret keys from hardware.</li>\n              <li>Implementation bugs (e.g., OpenSSL Heartbleed) bypass cryptographic algorithms completely.</li>\n            </ul>\n          </div>\n        </div>\n      ",
      "whereUsed": [
        "Web Security: Transport Layer Security (TLS 1.3) securing HTTPS banking and browsing",
        "Virtual Private Networks: IPsec and WireGuard tunneling corporate network traffic",
        "Messaging Privacy: Signal Protocol used in WhatsApp and Signal for end-to-end encryption",
        "Cryptocurrency: Elliptic Curve Cryptography (ECDSA) and SHA-256 hashing in Bitcoin transactions",
        "Hardware Storage: BitLocker, FileVault, and Self-Encrypting Solid State Drives (SED)"
      ],
      "commonMistakes": "\n        <ul class=\"space-y-2 text-xs\">\n          <li><strong>Inventing your own cryptographic algorithm:</strong> Known as \"Don't Roll Your Own Crypto.\" Amateur algorithms invariably contain subtle mathematical flaws that automated solvers break in minutes. Always use audited, NIST-approved standards.</li>\n          <li><strong>Confusing Encoding, Hashing, and Encryption:</strong> Base64 is an <em>encoding</em> (reversible without any key); SHA-256 is a <em>one-way cryptographic hash</em> (irreversible); AES is <em>encryption</em> (reversible only with the correct secret key).</li>\n        </ul>\n      ",
      "quiz": [
        {
          "question": "Which security service guarantees that a message was not altered or tampered with in transit between sender and receiver?",
          "options": [
            "Confidentiality",
            "Data Integrity",
            "Non-repudiation",
            "Traffic Padding"
          ],
          "answer": 1,
          "explanation": "Data Integrity guarantees that data cannot be altered, forged, or deleted in transit without detection, typically achieved using cryptographic hash functions and HMACs."
        },
        {
          "question": "What does Kerckhoffs's Principle state regarding cryptographic security?",
          "options": [
            "The algorithm must be kept strictly secret from the public",
            "A cryptosystem must remain secure even if everything about the system except the key is public knowledge",
            "Symmetric ciphers are always faster than public-key ciphers",
            "Plaintexts must be at least twice as long as the key"
          ],
          "answer": 1,
          "explanation": "Kerckhoffs's Principle states that a cryptosystem should be secure even if everything about the design, mathematics, and implementation is public, relying solely on keeping the secret key confidential."
        },
        {
          "question": "In which cryptanalysis model does the attacker possess matching pairs of plaintext and ciphertext generated with the target key?",
          "options": [
            "Ciphertext-Only Attack",
            "Known-Plaintext Attack",
            "Rubber-Hose Attack",
            "Side-Channel Attack"
          ],
          "answer": 1,
          "explanation": "In a Known-Plaintext Attack (KPA), the cryptanalyst has access to several plaintexts and their corresponding encrypted ciphertexts, which they use to deduce the secret key."
        }
      ],
      "references": [
        {
          "cite": "B.A. Forouzan, Data Communications and Networking (4th Ed.), Chapter 30.1: Security Services & Cryptography Basics",
          "url": ""
        },
        {
          "cite": "NIST SP 800-175B: Guideline for Using Cryptographic Standards in the Federal Government",
          "url": "https://csrc.nist.gov/publications/detail/sp/800-175b/rev-1/final"
        },
        {
          "cite": "RFC 4949: Internet Security Glossary, Version 2",
          "url": "https://datatracker.ietf.org/doc/html/rfc4949"
        }
      ]
    },
    "prevTopicId": "ids",
    "nextTopicId": "substitution-ciphers"
  },
  "substitution-ciphers": {
    "id": "substitution-ciphers",
    "title": "Substitution Ciphers",
    "unit": "Unit 5 – Application Layer",
    "unitId": "unit5",
    "level": "Level 2 — Classical Cryptography",
    "category": "security",
    "difficulty": "Intermediate",
    "readingTime": "30 min read",
    "standard": "Classical Cryptography / Forouzan Chapter 30.2",
    "oneLiner": "Classical cryptographic techniques where each plaintext letter, bit, or character is replaced with another symbol according to fixed mathematical rules or secret alphabets.",
    "quickAnswer": "A substitution cipher is a classical encryption method in which units of plaintext (letters, pairs of letters, or character groups) are systematically substituted with ciphertext characters according to a designated mapping or key. Substitution ciphers are categorized into Monoalphabetic Ciphers (where each character maps to a fixed ciphertext symbol throughout, such as the Caesar Shift) and Polyalphabetic Ciphers (where the character mapping changes dynamically across the message, such as the Vigenère Cipher and Playfair Cipher).",
    "whyItMatters": "Studying substitution ciphers reveals the foundational mathematical principles of character confusion, modular arithmetic rings, and cryptanalytic frequency analysis that directly inform the design of modern non-linear S-Boxes in DES and AES.",
    "infobox": {
      "layer": "Application Layer & Presentation Layer (OSI Layer 6/7)",
      "standard": "Historical Classical Cryptography / Forouzan Section 30.2",
      "type": "Classical Symmetric Substitution Cryptosystem",
      "prerequisites": [
        "intro-cryptography"
      ],
      "relatedConcepts": [
        "transposition-ciphers",
        "symmetric-algorithms",
        "rsa-algorithm"
      ],
      "compareWith": [
        "transposition-ciphers"
      ],
      "primaryUses": [
        "Historical diplomatic and military field secrecy",
        "Non-linear S-Box confusion layers inside modern block ciphers (AES SubBytes)",
        "Educational demonstration of frequency analysis and Shannon's Confusion property",
        "Puzzle generation and cryptograms"
      ],
      "standardRfc": "Historical Cryptographic Literature"
    },
    "learningObjectives": [
      "Distinguish between Monoalphabetic and Polyalphabetic substitution ciphers",
      "Perform encryption and decryption using the Caesar / Shift Cipher mathematical formulas modulo 26",
      "Work through Forouzan Example 30.3 with shift key k = 15",
      "Demonstrate how letter frequency analysis, digrams, and trigrams break monoalphabetic substitution ciphers",
      "Construct and evaluate polyalphabetic ciphers including the Vigenère Cipher tableau and Playfair 5x5 matrix rules",
      "Explain Claude Shannon's proof of perfect secrecy for the One-Time Pad (Vernam Cipher)"
    ],
    "prerequisitesList": [
      {
        "concept": "Introduction to Cryptography",
        "meaning": "Plaintext, ciphertext, encryption key, and cryptanalysis models"
      },
      {
        "concept": "Arithmetic Modulo 26",
        "meaning": "Algebraic ring $\\mathbb{Z}_{26}$ mapping the 26 English letters $A=0, B=1, \\dots, Z=25$"
      }
    ],
    "imageUrl": "assets/images/unit5/topic5/substitution-ciphers.svg",
    "imageCaption": "Figure 5.15: Monoalphabetic vs. Polyalphabetic Substitution Architectures and Frequency Analysis Attack Vectors",
    "sections": {
      "overview": "\n        <p class=\"mb-3\">\n          In a <strong>Substitution Cipher</strong>, the position of characters in the message remains unchanged, but the identities of the characters are substituted. If the alphabet consists of 26 symbols, letters are represented as integers in the range $0$ through $25$:\n        </p>\n        <div class=\"p-2 bg-slate-900 text-sky-300 font-mono text-center text-xs rounded mb-3 overflow-x-auto\">\n          A=0, B=1, C=2, D=3, E=4, F=5, G=6, H=7, I=8, J=9, K=10, L=11, M=12,<br/>\n          N=13, O=14, P=15, Q=16, R=17, S=18, T=19, U=20, V=21, W=22, X=23, Y=24, Z=25\n        </div>\n        <p class=\"mb-3\">\n          Depending on how keys are applied across the message stream, substitution ciphers are divided into two fundamental families: <strong>Monoalphabetic Ciphers</strong> and <strong>Polyalphabetic Ciphers</strong>.\n        </p>\n      ",
      "howItWorks": "\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">1. Monoalphabetic Substitution: The Shift (Caesar) Cipher</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          In a monoalphabetic cipher, a given character in the plaintext is always mapped to the exact same character in the ciphertext throughout the entire message. The simplest example is the <strong>Shift Cipher</strong> (historically used by Julius Caesar with shift $k=3$):\n        </p>\n        <div class=\"p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-mono text-xs mb-3\">\n          <p class=\"font-bold text-blue-600 dark:text-blue-400 mb-1\">Mathematical Formulation:</p>\n          Encryption: &nbsp;$C = (P + k) \\bmod 26$<br/>\n          Decryption: &nbsp;$P = (C - k) \\bmod 26$ &nbsp; (or $(C - k + 26) \\bmod 26$ to keep remainder positive)\n        </div>\n\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">2. Cryptanalysis via Frequency Analysis</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          Because monoalphabetic ciphers preserve a 1-to-1 mapping, <strong>the statistical letter distribution of the underlying language is completely preserved in the ciphertext</strong>:\n        </p>\n        <ul class=\"text-xs list-disc pl-5 space-y-1 mb-3 text-slate-700 dark:text-slate-300\">\n          <li><strong>Single Letter Frequencies in English:</strong> Letter <code>E</code> is by far the most frequent ($\\approx 12.7\\%$), followed by <code>T</code> ($\\approx 9.1\\%$), <code>A</code> ($\\approx 8.2\\%$), <code>O</code> ($\\approx 7.5\\%$), <code>I</code> ($\\approx 7.0\\%$), and <code>N</code> ($\\approx 6.7\\%$). Rare letters include <code>J, K, Q, X, Z</code> (all under $0.5\\%$).</li>\n          <li><strong>Digram and Trigram Frequencies:</strong> Common two-letter pairs include <code>TH, HE, IN, ER, AN, RE</code>. The most common trigram is <code>THE</code>, followed by <code>AND, ING, ENT</code>.</li>\n        </ul>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-3\">\n          An attacker merely computes the frequency histogram of the ciphertext letters. The peak character is hypothesized to be 'E', the second peak 'T', and the cipher is cracked almost instantly.\n        </p>\n\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">3. Polyalphabetic Substitution: The Vigenère Cipher</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          To flatten the statistical frequency peaks, <strong>Polyalphabetic Ciphers</strong> use different monoalphabetic substitutions as the encryption proceeds through the text. In the <strong>Vigenère Cipher</strong>, a secret keyword of length $m$ is repeated periodically across the plaintext:\n        </p>\n        <div class=\"p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-mono text-xs mb-3\">\n          Encryption: &nbsp;$C_i = (P_i + K_{i \\bmod m}) \\bmod 26$<br/>\n          Decryption: &nbsp;$P_i = (C_i - K_{i \\bmod m} + 26) \\bmod 26$\n        </div>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          In this way, the letter 'E' in the plaintext might be encrypted to 'Q' at position 1, 'H' at position 5, and 'X' at position 9, thoroughly obscuring single-letter frequencies!\n        </p>\n\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">4. The Playfair Cipher</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          Invented by Charles Wheatstone (1854) and promoted by Lord Playfair, this system encrypts <em>digrams</em> (pairs of letters) using a $5 \\times 5$ matrix filled with a keyword followed by remaining alphabet letters (with I and J combined):\n        </p>\n        <ul class=\"text-xs list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300\">\n          <li><strong>Same Row Rule:</strong> If two plaintext letters fall in the same row, replace each with the letter immediately to its right (wrapping around).</li>\n          <li><strong>Same Column Rule:</strong> If two letters fall in the same column, replace each with the letter immediately below it (wrapping around).</li>\n          <li><strong>Rectangle Rule:</strong> If letters are in different rows and columns, each letter is replaced by the letter in its own row and the other letter's column.</li>\n        </ul>\n      ",
      "technicalDetails": "\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">The Vernam Cipher and The One-Time Pad (OTP)</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          Invented by Gilbert Vernam (1917) and patented for telegraphy, the <strong>One-Time Pad</strong> represents the theoretical pinnacle of substitution cryptography:\n        </p>\n        <div class=\"p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded text-xs mb-3\">\n          <p class=\"font-bold text-indigo-900 dark:text-indigo-200 mb-1\">Shannon's Theorem of Perfect Secrecy (1949):</p>\n          <p class=\"text-slate-700 dark:text-slate-300\">\n            A cipher achieves <strong>perfect information-theoretic secrecy</strong> (i.e., $P(M=m \\mid C=c) = P(M=m)$) if and only if:\n          </p>\n          <ol class=\"list-decimal pl-5 mt-1 space-y-0.5 text-slate-700 dark:text-slate-300\">\n            <li>The secret key $K$ is generated using a truly random physical entropy source.</li>\n            <li>The key length is equal to or greater than the plaintext length ($|K| \\ge |M|$).</li>\n            <li>Each key is used exactly <strong>once</strong> and destroyed immediately after use (never reused).</li>\n          </ol>\n        </div>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300\">\n          Bitwise Vernam operation: $C_i = P_i \\oplus K_i$ and $P_i = C_i \\oplus K_i$. Because every possible plaintext of length $N$ has an equal probability of generating the observed ciphertext, intercepted ciphertext reveals zero statistical information to an adversary regardless of computational power.\n        </p>\n      ",
      "workedExamples": {
        "level1": "\n          <strong>Forouzan Example 30.3 — Caesar Shift with Key $k = 15$:</strong><br/>\n          Plaintext message: <code>\"HELLO\"</code><br/>\n          1. Convert letters to numerical indices in $\\mathbb{Z}_{26}$:<br/>\n          &nbsp;&nbsp;H = 7, E = 4, L = 11, L = 11, O = 14.<br/>\n          2. Apply encryption formula $C = (P + 15) \\bmod 26$:<br/>\n          &nbsp;&nbsp;• H (7): &nbsp;&nbsp;$(7 + 15) \\bmod 26 = 22 \\implies$ <strong>'W'</strong><br/>\n          &nbsp;&nbsp;• E (4): &nbsp;&nbsp;$(4 + 15) \\bmod 26 = 19 \\implies$ <strong>'T'</strong><br/>\n          &nbsp;&nbsp;• L (11): $(11 + 15) \\bmod 26 = 26 \\bmod 26 = 0 \\implies$ <strong>'A'</strong><br/>\n          &nbsp;&nbsp;• L (11): $(11 + 15) \\bmod 26 = 0 \\implies$ <strong>'A'</strong><br/>\n          &nbsp;&nbsp;• O (14): $(14 + 15) \\bmod 26 = 29 \\bmod 26 = 3 \\implies$ <strong>'D'</strong><br/>\n          <strong>Ciphertext Output:</strong> <code>\"WTAAD\"</code>.<br/><br/>\n          <em>Decryption Verification:</em><br/>\n          &nbsp;&nbsp;• W (22): $(22 - 15) \\bmod 26 = 7 \\implies$ 'H'<br/>\n          &nbsp;&nbsp;• T (19): $(19 - 15) \\bmod 26 = 4 \\implies$ 'E'<br/>\n          &nbsp;&nbsp;• A (0): &nbsp;&nbsp;$(0 - 15 + 26) \\bmod 26 = 11 \\implies$ 'L'<br/>\n          Plaintext successfully recovered!\n        ",
        "level2": "\n          <strong>Vigenère Cipher Encryption Step-by-Step:</strong><br/>\n          • Plaintext: <code>\"ATTACKATDAWN\"</code><br/>\n          • Secret Keyword: <code>\"LEMON\"</code> (Key length $m = 5$)<br/>\n          Align periodic key over plaintext:<br/>\n          <pre class=\"bg-slate-900 text-sky-300 p-2 rounded text-[10px] font-mono\">\nPlaintext:  A  T  T  A  C  K  A  T  D  A  W  N\nKey:        L  E  M  O  N  L  E  M  O  N  L  E\nP values:   0 19 19  0  2 10  0 19  3  0 22 13\nK values:  11  4 12 14 13 11  4 12 14 13 11  4\nSum mod 26:11 23  5 14 15 21  4  5 17 13  7 17\nCiphertext: L  X  F  O  P  V  E  F  R  N  H  R</pre>\n          Notice how the first 'A' encrypted to 'L', while the second 'A' encrypted to 'E'!\n        ",
        "level3": "\n          <strong>Breaking Vigenère: Kasiski Examination:</strong><br/>\n          Major Friedrich Kasiski (1863) observed that if a repeated phrase in the plaintext happens to be encrypted by the key at identical modular offsets, identical ciphertext character sequences appear.<br/>\n          If identical 3-letter ciphertext triplets appear at distance offsets of 24, 36, and 60:<br/>\n          $\\gcd(24, 36, 60) = 12$.<br/>\n          The key length $m$ must be a factor of 12 (most likely 4, 6, or 12). Once key length $m$ is found, the ciphertext is split into $m$ independent monoalphabetic streams, each broken with standard frequency analysis!\n        "
      },
      "advantagesLimitations": "\n        <div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 text-xs\">\n          <div class=\"p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800\">\n            <h4 class=\"font-bold text-emerald-800 dark:text-emerald-300 mb-2\">Advantages</h4>\n            <ul class=\"space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300\">\n              <li>Conceptually straightforward and easily calculated by hand or simple hardware.</li>\n              <li>Polyalphabetic substitution effectively disperses single-letter frequency spikes.</li>\n              <li>One-Time Pad provides proven mathematical perfection against any adversary.</li>\n            </ul>\n          </div>\n          <div class=\"p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800\">\n            <h4 class=\"font-bold text-rose-800 dark:text-rose-300 mb-2\">Vulnerabilities & Limitations</h4>\n            <ul class=\"space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300\">\n              <li>Monoalphabetic ciphers are trivial to break using frequency analysis and $N$-gram tables.</li>\n              <li>Vigenère ciphers succumb to Kasiski examination and Index of Coincidence analysis.</li>\n              <li>One-Time Pad requires secure distribution of keys as large as the data itself, creating an intractable logistical bottleneck.</li>\n            </ul>\n          </div>\n        </div>\n      ",
      "whereUsed": [
        "Modern Block Ciphers: Non-linear Substitution Boxes (S-Boxes) in AES (SubBytes) and DES",
        "Historical Military Communications: Enigma Machine (electromechanical polyalphabetic rotor cipher)",
        "Hotline Communications: Washington-Moscow diplomatic hotline used One-Time Pad tape streams",
        "Classic Security Training: Teaching cryptanalysis fundamentals in university computer science curricula"
      ],
      "commonMistakes": "\n        <ul class=\"space-y-2 text-xs\">\n          <li><strong>Assuming a large key space guarantees monoalphabetic security:</strong> A random monoalphabetic cipher has $26! \\approx 4 \\times 10^{26}$ keys (equivalent to 88 bits), but it can still be cracked within seconds using simple letter frequency analysis because statistical structure is not destroyed.</li>\n          <li><strong>Reusing a One-Time Pad key:</strong> If key $K$ is used twice ($C_1 = P_1 \\oplus K, C_2 = P_2 \\oplus K$), then $C_1 \\oplus C_2 = P_1 \\oplus P_2$. The key cancels out completely, allowing cryptanalysts to reconstruct both plaintexts easily (e.g., the Soviet VENONA project decryption).</li>\n        </ul>\n      ",
      "quiz": [
        {
          "question": "Given a Caesar cipher with key k = 15, encrypt the plaintext character 'L' (numerical index 11).",
          "options": [
            "A (index 0)",
            "Z (index 25)",
            "P (index 15)",
            "W (index 22)"
          ],
          "answer": 0,
          "explanation": "(11 + 15) mod 26 = 26 mod 26 = 0, which corresponds to the letter 'A'."
        },
        {
          "question": "What cryptanalytic vulnerability allows monoalphabetic ciphers to be broken rapidly even when the key space is 26!?",
          "options": [
            "Brute-force testing of all 26! keys",
            "Letter and digram frequency analysis",
            "Quantum Shor's Algorithm",
            "Buffer overflow vulnerability"
          ],
          "answer": 1,
          "explanation": "Because monoalphabetic ciphers preserve a fixed 1-to-1 mapping, the frequency of characters matches the statistical distribution of the natural language (e.g., 'E' is the most frequent)."
        },
        {
          "question": "Under Claude Shannon's theorem, which condition is NOT strictly required for a One-Time Pad to achieve perfect secrecy?",
          "options": [
            "The key must be truly random",
            "The key must be at least as long as the plaintext",
            "The key must be processed using the RSA public exponent",
            "The key must never be reused"
          ],
          "answer": 2,
          "explanation": "The One-Time Pad is a purely symmetric bitwise/character XOR cipher; it has no mathematical relationship to or requirement for RSA public exponents."
        }
      ],
      "references": [
        {
          "cite": "B.A. Forouzan, Data Communications and Networking (4th Ed.), Chapter 30.2: Traditional Symmetric-Key Ciphers",
          "url": ""
        },
        {
          "cite": "C.E. Shannon, 'Communication Theory of Secrecy Systems', Bell System Technical Journal, 1949",
          "url": "https://www.cs.princeton.edu/courses/archive/fall07/cos433/shannon.pdf"
        }
      ]
    },
    "prevTopicId": "intro-cryptography",
    "nextTopicId": "transposition-ciphers"
  },
  "transposition-ciphers": {
    "id": "transposition-ciphers",
    "title": "Transposition Ciphers",
    "unit": "Unit 5 – Application Layer",
    "unitId": "unit5",
    "level": "Level 2 — Classical Cryptography",
    "category": "security",
    "difficulty": "Intermediate",
    "readingTime": "25 min read",
    "standard": "Classical Permutation Cryptosystems / Forouzan Chapter 30.2",
    "oneLiner": "Cryptographic techniques that conceal message content by rearranging (permuting) the positions of the plaintext characters without altering the symbols themselves.",
    "quickAnswer": "A transposition (or permutation) cipher is a method of encryption where the characters of the plaintext are shifted or reordered into a new sequence according to a mathematical permutation rule or secret keyword matrix. Unlike substitution ciphers where characters are replaced by different symbols, transposition ciphers keep the original characters intact—meaning the exact letter frequency counts remain identical, but their relative positions (order) are thoroughly scrambled.",
    "whyItMatters": "Transposition introduces Claude Shannon's cryptographic property of **Diffusion** (spreading plaintext statistics across the entire ciphertext). When combined with substitution (**Confusion**) in alternating rounds, it forms the basis of modern product ciphers like DES and AES.",
    "infobox": {
      "layer": "Application Layer & Presentation Layer (OSI Layer 6/7)",
      "standard": "Historical Classical Permutation / Forouzan Section 30.2",
      "type": "Classical Symmetric Permutation Cryptosystem",
      "prerequisites": [
        "intro-cryptography",
        "substitution-ciphers"
      ],
      "relatedConcepts": [
        "symmetric-algorithms",
        "rsa-algorithm"
      ],
      "compareWith": [
        "substitution-ciphers"
      ],
      "primaryUses": [
        "Position permutation layers inside modern block ciphers (AES ShiftRows, DES P-Boxes)",
        "Spreading statistical dependencies across wide data blocks (Diffusion)",
        "Historical military route scrambling"
      ],
      "standardRfc": "Historical Cryptographic Literature"
    },
    "learningObjectives": [
      "Distinguish between character Substitution (Confusion) and character Transposition (Diffusion)",
      "Construct and solve Rail Fence (Zig-Zag) ciphers for varying rail depths",
      "Execute Keyed Columnar Transposition step-by-step using alphabetical key ranking matrices",
      "Explain the cryptanalysis of transposition ciphers using Digram Bigram Affinity scoring and vowel distribution",
      "Demonstrate why Two-Stage (Double) Columnar Transposition is dramatically more resilient than single transposition",
      "Explain how modern ciphers incorporate transposition via bitwise P-Boxes and byte matrix rotations"
    ],
    "prerequisitesList": [
      {
        "concept": "Substitution Ciphers",
        "meaning": "Understanding how character replacement differs from position permutation"
      },
      {
        "concept": "Matrix Operations",
        "meaning": "Row-wise writing and column-wise reading of rectangular data arrays"
      }
    ],
    "imageUrl": "assets/images/unit5/topic5/transposition-ciphers.svg",
    "imageCaption": "Figure 5.16: Rail Fence and Keyed Columnar Transposition Permutation Architectures",
    "sections": {
      "overview": "\n        <p class=\"mb-3\">\n          While substitution ciphers replace symbols with other symbols, <strong>Transposition Ciphers</strong> do not alter the characters at all; instead, they permute the physical order in which characters appear.\n        </p>\n        <p class=\"mb-3\">\n          Because the set of symbols in the ciphertext is identical to that in the plaintext, <strong>a single-letter frequency analysis immediately reveals whether a transposition cipher was used</strong>: if the letter 'E' appears $12.7\\%$ of the time and 'T' appears $9\\%$, the cipher is definitely a transposition cipher, not a substitution cipher! The cryptanalyst's task is solely to determine the inverse permutation that restores the characters to their original grammatical sequence.\n        </p>\n      ",
      "howItWorks": "\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">1. The Rail Fence (Zig-Zag) Cipher</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          In the Rail Fence cipher, the plaintext is written downwards and diagonally across a designated number of successive \"rails\" (depth $d$) in a zig-zag wave pattern. Once the grid is populated, the ciphertext is generated by reading off each horizontal row sequentially from top to bottom.\n        </p>\n\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">2. Keyed Columnar Transposition</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          The most famous classical transposition method writes the plaintext in successive horizontal rows of a fixed width $W$ defined by a secret keyword.\n        </p>\n        <ol class=\"text-xs list-decimal pl-5 space-y-1 mb-3 text-slate-700 dark:text-slate-300\">\n          <li><strong>Assign Column Orders:</strong> Rank the characters of the keyword alphabetically from $1$ to $W$. (Ties are resolved from left to right).</li>\n          <li><strong>Populate Grid:</strong> Write the plaintext horizontally row by row under the keyword columns. If needed, pad the final row with dummy characters (e.g., 'X').</li>\n          <li><strong>Read Out Vertically:</strong> Transcribe the columns vertically, ordered by the numerical ranks of the column keys ($1, 2, 3, \\dots, W$).</li>\n        </ol>\n\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">3. Double (Two-Stage) Transposition</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          A single columnar transposition can often be solved by a skilled cryptanalyst using digram affinities (e.g., matching common pairs like <code>TH</code> or <code>QU</code> across adjacent column slices). To defeat this, cryptographers employ <strong>Double Transposition</strong>: taking the output of the first columnar transposition and passing it through a second rectangular grid using a different keyword and column width. Double transposition was considered so secure that it was utilized by German and Allied field agents throughout World War II.\n        </p>\n      ",
      "technicalDetails": "\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">Mathematical Permutation Functions</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          Formally, a transposition cipher over a message of length $N$ is a bijection permutation $\\pi$ over the index set $\\{1, 2, \\dots, N\\}$:\n        </p>\n        <div class=\"p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-mono text-xs mb-3\">\n          Encryption: &nbsp;$C[i] = P[\\pi(i)]$, &nbsp;for all $1 \\le i \\le N$<br/>\n          Decryption: &nbsp;$P[i] = C[\\pi^{-1}(i)]$\n        </div>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          In modern cryptographic hardware, transposition is implemented at the bit level via <strong>Permutation Boxes (P-Boxes)</strong>:\n        </p>\n        <ul class=\"text-xs list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300\">\n          <li><strong>Straight P-Box:</strong> Transposes $n$ input bits to $n$ output bits (pure permutation).</li>\n          <li><strong>Expansion P-Box:</strong> Expands $n$ bits into $m$ bits ($m > n$) by duplicating specific bits to increase diffusion across S-Boxes (e.g., DES 32-bit to 48-bit expansion).</li>\n          <li><strong>Compression P-Box:</strong> Drops specific bits to reduce block width ($m < n$).</li>\n        </ul>\n      ",
      "workedExamples": {
        "level1": "\n          <strong>Rail Fence Cipher Worked Walkthrough (Depth = 3):</strong><br/>\n          Plaintext: <code>\"DEFEND THE EAST WALL\"</code> (stripping spaces $\\implies$ 17 characters)<br/>\n          Write characters in a 3-rail zig-zag wave:<br/>\n          <pre class=\"bg-slate-900 text-sky-300 p-2 rounded text-[10px] font-mono\">\nRail 1: D . . . N . . . E . . . T . . . L\nRail 2: . E . E . D . H . E . S . W . L .\nRail 3: . . F . . . T . . . A . . . A . .</pre>\n          Read off each row sequentially:<br/>\n          • Row 1: <code>D N E T L</code><br/>\n          • Row 2: <code>E E D H E S W L</code><br/>\n          • Row 3: <code>F T A A</code><br/>\n          <strong>Ciphertext Output:</strong> <code>\"DNETL EEDHESWL FTAA\"</code>.\n        ",
        "level2": "\n          <strong>Keyed Columnar Transposition Numerical Example:</strong><br/>\n          Plaintext: <code>\"ATTACK POSTPONED UNTIL TWO AM\"</code> (24 characters, padded with 'X' to 28)<br/>\n          Keyword: <code>\"SECRET\"</code> (6 letters)<br/>\n          Alphabetical ranking of letters in <code>\"SECRET\"</code>:<br/>\n          • Letters in order: C(1), E(2), E(3), R(4), S(5), T(6).<br/>\n          &nbsp;&nbsp;Key ranks: <code>[5, 2, 1, 4, 3, 6]</code>.<br/>\n          Populate the $5 \\times 6$ matrix:<br/>\n          <pre class=\"bg-slate-900 text-emerald-300 p-2 rounded text-[10px] font-mono\">\nRank:   5   2   1   4   3   6\nKey:    S   E   C   R   E   T\nRow 1:  A   T   T   A   C   K\nRow 2:  P   O   S   T   P   O\nRow 3:  N   E   D   U   N   T\nRow 4:  I   L   T   W   O   A\nRow 5:  M   X   X   X   X   X</pre>\n          Read out columns in order of rank (1 through 6):<br/>\n          • Col 1 (C): <code>TSDTX</code><br/>\n          • Col 2 (E): <code>TOELX</code><br/>\n          • Col 3 (E): <code>CPNOX</code><br/>\n          • Col 4 (R): <code>ATUWX</code><br/>\n          • Col 5 (S): <code>APNIM</code><br/>\n          • Col 6 (T): <code>KOTAX</code><br/>\n          <strong>Final Ciphertext:</strong> <code>\"TSDTX TOELX CPNOX ATUWX APNIM KOTAX\"</code>.\n        ",
        "level3": "\n          <strong>Decryption of Keyed Columnar Transposition:</strong><br/>\n          Given ciphertext length $N = 30$ and key width $W = 6$, calculate rows $= 30 / 6 = 5$.<br/>\n          The cryptanalyst divides the ciphertext into 6 blocks of 5 characters each. Matching column 1 to rank 1, column 2 to rank 2, and reconstructing the matrix row-by-row recovers the original plaintext immediately!\n        "
      },
      "advantagesLimitations": "\n        <div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 text-xs\">\n          <div class=\"p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800\">\n            <h4 class=\"font-bold text-emerald-800 dark:text-emerald-300 mb-2\">Advantages</h4>\n            <ul class=\"space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300\">\n              <li>Provides excellent **Diffusion** by scattering adjacent letters across distant positions in the ciphertext block.</li>\n              <li>Negates standard monoalphabetic single-letter frequency analysis attacks.</li>\n              <li>Double columnar transposition offers significant cryptographic complexity.</li>\n            </ul>\n          </div>\n          <div class=\"p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800\">\n            <h4 class=\"font-bold text-rose-800 dark:text-rose-300 mb-2\">Vulnerabilities & Limitations</h4>\n            <ul class=\"space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300\">\n              <li>Identical character frequency: A simple count of 'E' or vowels instantly reveals transposition is in effect.</li>\n              <li>Vulnerable to anagramming, digram affinity pairing, and known-plaintext attacks.</li>\n              <li>Pure transposition ciphers provide zero **Confusion** (substitutive masking).</li>\n            </ul>\n          </div>\n        </div>\n      ",
      "whereUsed": [
        "Advanced Encryption Standard (AES): The <code>ShiftRows</code> transformation cyclically permutes state array bytes",
        "Data Encryption Standard (DES): Initial Permutation (IP), Final Permutation (FP), and internal Expansion P-Boxes",
        "Historical Field Ciphers: World War II SOE agents using double transposition with book keywords"
      ],
      "commonMistakes": "\n        <ul class=\"space-y-2 text-xs\">\n          <li><strong>Thinking transposition changes letter frequencies:</strong> In a transposition cipher, every letter of the plaintext is preserved; only their indices move. The total counts of 'A', 'E', 'Z', etc., are identical in both plaintext and ciphertext.</li>\n          <li><strong>Ignoring padding:</strong> Forgetting to pad final rows when decrypting columnar grids leads to misalignment of vertical columns, producing completely corrupted plaintexts.</li>\n        </ul>\n      ",
      "quiz": [
        {
          "question": "Which cryptographic property, defined by Claude Shannon, is primarily achieved by transposition ciphers?",
          "options": [
            "Confusion",
            "Diffusion",
            "Collision Resistance",
            "Forward Secrecy"
          ],
          "answer": 1,
          "explanation": "Diffusion spreads the statistical characteristics of individual plaintext symbols across the entire ciphertext, which is precisely what transposition and permutation ciphers accomplish."
        },
        {
          "question": "What distinct property distinguishes a pure transposition cipher from a substitution cipher during cryptanalysis?",
          "options": [
            "The ciphertext is three times longer than the plaintext",
            "The single-character frequency distribution of the ciphertext is identical to that of the plaintext",
            "It requires a private key generated via prime factorization",
            "It cannot be decrypted by computers"
          ],
          "answer": 1,
          "explanation": "Because transposition only reorders characters without altering them, character frequencies in the ciphertext match natural plaintext frequencies exactly."
        },
        {
          "question": "In AES, which transformation executes a byte-level transposition across the 4x4 State matrix?",
          "options": [
            "SubBytes",
            "ShiftRows",
            "MixColumns",
            "AddRoundKey"
          ],
          "answer": 1,
          "explanation": "ShiftRows performs cyclical left byte shifts on each row of the AES state array, acting as the transposition layer."
        }
      ],
      "references": [
        {
          "cite": "B.A. Forouzan, Data Communications and Networking (4th Ed.), Chapter 30.2: Traditional Transposition Ciphers",
          "url": ""
        },
        {
          "cite": "C.E. Shannon, 'Communication Theory of Secrecy Systems', Bell System Technical Journal, 1949",
          "url": "https://www.cs.princeton.edu/courses/archive/fall07/cos433/shannon.pdf"
        }
      ]
    },
    "prevTopicId": "substitution-ciphers",
    "nextTopicId": "symmetric-algorithms"
  },
  "symmetric-algorithms": {
    "id": "symmetric-algorithms",
    "title": "Symmetric Algorithms",
    "unit": "Unit 5 – Application Layer",
    "unitId": "unit5",
    "level": "Level 3 — Modern Secret Key Cryptosystems",
    "category": "security",
    "difficulty": "Advanced",
    "readingTime": "35 min read",
    "standard": "FIPS PUB 46-3 (DES), FIPS PUB 197 (AES), NIST SP 800-38A / Forouzan Chapter 30.3",
    "oneLiner": "Modern cryptosystems where a single secret key is shared between communicating parties to execute high-throughput encryption and decryption.",
    "quickAnswer": "Symmetric-key algorithms (also called secret-key or shared-key ciphers) use the exact same secret key for both encryption and decryption: $P = D_K(E_K(P))$. Modern symmetric ciphers are divided into Stream Ciphers (which encrypt continuous data bit-by-bit or byte-by-byte using keystream generators) and Block Ciphers (which process fixed-size blocks of bits, typically 64 or 128 bits, through repeated rounds of substitution and permutation). The two primary architectural blueprints are Feistel Networks (e.g., DES, 3DES) and Substitution-Permutation Networks (e.g., AES).",
    "whyItMatters": "Symmetric ciphers are exceptionally fast—up to 1,000 times faster than asymmetric algorithms. They perform the heavy lifting of modern data protection, encrypting bulk data payloads in TLS 1.3, Wi-Fi WPA3, disk encryption, and VPN tunnels.",
    "infobox": {
      "layer": "Application Layer & Presentation Layer (OSI Layer 6/7)",
      "standard": "FIPS PUB 197 (AES), NIST SP 800-38A (Cipher Modes), RFC 8439 (ChaCha20)",
      "type": "Modern Shared-Key Symmetric Cryptosystem",
      "prerequisites": [
        "intro-cryptography",
        "substitution-ciphers",
        "transposition-ciphers"
      ],
      "relatedConcepts": [
        "public-key-algorithms",
        "rsa-algorithm"
      ],
      "compareWith": [
        "public-key-algorithms"
      ],
      "primaryUses": [
        "Bulk session payload encryption in TLS 1.3 and HTTPS",
        "Full disk encryption (BitLocker, LUKS, FileVault) using AES-XTS",
        "Wireless link encryption in 802.11ax Wi-Fi (WPA3-SAE / AES-GCMP)",
        "Database cell and table encryption"
      ],
      "standardRfc": "FIPS PUB 197, NIST SP 800-38A"
    },
    "learningObjectives": [
      "Differentiate between Block Ciphers and Stream Ciphers",
      "Trace the internal mechanics of a Feistel Network and explain why decryption works without inverting the round function F",
      "Analyze the Data Encryption Standard (DES): 64-bit block size, 56-bit effective key, 16 rounds, S-Boxes, and key generation schedule",
      "Explain the vulnerability of DES to brute-force attacks and how Triple DES (3DES) in EDE mode mitigates it",
      "Detail the Advanced Encryption Standard (AES Rijndael): 128-bit block, State array, 10/12/14 rounds, and the 4 transformations (SubBytes, ShiftRows, MixColumns, AddRoundKey)",
      "Compare the 5 classical Block Cipher Modes of Operation: ECB, CBC, CFB, OFB, and CTR"
    ],
    "prerequisitesList": [
      {
        "concept": "Confusion and Diffusion",
        "meaning": "Substitution creating non-linear confusion and transposition creating broad statistical diffusion"
      },
      {
        "concept": "Galois Field GF(2^8) Basics",
        "meaning": "Byte-level polynomial field arithmetic used in AES MixColumns transformations"
      }
    ],
    "imageUrl": "assets/images/unit5/topic5/symmetric-algorithms.svg",
    "imageCaption": "Figure 5.17: Feistel Network Architecture (DES) vs. Substitution-Permutation Network (AES) and Cipher Modes",
    "sections": {
      "overview": "\n        <p class=\"mb-3\">\n          <strong>Symmetric-key cryptography</strong> is the workhorse of digital security. Because a single key $K$ is used for both encipherment and decipherment, the fundamental requirement is that the key must be established and exchanged between sender and receiver over a secure channel before encrypted communications commence.\n        </p>\n        <p class=\"mb-3\">\n          Modern symmetric algorithms are classified into two broad operational paradigms:\n        </p>\n        <ul class=\"text-xs list-disc pl-5 space-y-1 mb-3 text-slate-700 dark:text-slate-300\">\n          <li><strong>Stream Ciphers:</strong> Encrypt continuous data streams symbol-by-symbol (or bit-by-bit). A pseudorandom keystream generator expands a short key into an infinite keystream $K_i$ that is XORed with plaintext: $C_i = P_i \\oplus K_i$. Examples include RC4 (legacy) and ChaCha20 (modern).</li>\n          <li><strong>Block Ciphers:</strong> Encrypt fixed-size groupings of bits (called blocks), typically 64 bits (DES) or 128 bits (AES). If the plaintext is not an exact multiple of the block size, padding (such as PKCS#7) is appended.</li>\n        </ul>\n      ",
      "howItWorks": "\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">1. The Feistel Cipher Network</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          Designed by Horst Feistel at IBM, this architecture provides a universal blueprint for block ciphers. A block of length $2w$ is split into left and right halves: $(L_0, R_0)$. For each round $i = 1, \\dots, n$:\n        </p>\n        <div class=\"p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-mono text-xs mb-3\">\n          $L_i = R_{i-1}$<br/>\n          $R_i = L_{i-1} \\oplus F(R_{i-1}, K_i)$\n        </div>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          <strong>Key Engineering Beauty:</strong> The round function $F$ does <em>not</em> need to be invertible! Decryption uses the exact same circuit hardware in reverse order, applying subkeys from $K_n$ down to $K_1$:\n        </p>\n        <div class=\"p-2 bg-slate-100 dark:bg-slate-900 font-mono text-xs rounded mb-3\">\n          $R_{i-1} = L_i$<br/>\n          $L_{i-1} = R_i \\oplus F(L_i, K_i) = [L_{i-1} \\oplus F(R_{i-1}, K_i)] \\oplus F(R_{i-1}, K_i) = L_{i-1}$ &nbsp; (since $X \\oplus X = 0$)\n        </div>\n\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">2. Data Encryption Standard (DES)</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          Adopted by NIST in 1977 based on IBM's Lucifer cipher:\n        </p>\n        <ul class=\"text-xs list-disc pl-5 space-y-1 mb-3 text-slate-700 dark:text-slate-300\">\n          <li><strong>Block Size:</strong> 64 bits.</li>\n          <li><strong>Key Length:</strong> 64 bits total, but 8 bits are parity bits, giving an <strong>effective key length of only 56 bits</strong>.</li>\n          <li><strong>Structure:</strong> 16 rounds of a Feistel network with Initial Permutation (IP) and Final Permutation (FP).</li>\n          <li><strong>Round Function $F$:</strong> The 32-bit right half is expanded to 48 bits by Expansion P-Box, XORed with the 48-bit round subkey, fed into <strong>8 non-linear S-Boxes</strong> (each mapping 6 input bits to 4 output bits), and permuted by a 32-bit straight P-Box.</li>\n          <li><strong>Vulnerability:</strong> The 56-bit key space ($2^{56} \\approx 7.2 \\times 10^{16}$) is far too small. In 1998, the EFF \"Deep Crack\" custom machine cracked a DES key in 56 hours. DES is completely obsolete today.</li>\n        </ul>\n\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">3. Triple DES (3DES)</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          To salvage existing banking hardware without redesigning chips, 3DES applies DES three times in <strong>Encrypt-Decrypt-Encrypt (EDE)</strong> sequence with three keys ($K_1, K_2, K_3$):\n        </p>\n        <div class=\"p-2 bg-slate-50 dark:bg-slate-800 rounded font-mono text-xs mb-3\">\n          Encryption: &nbsp;$C = E_{K3}(D_{K2}(E_{K1}(P)))$<br/>\n          Decryption: &nbsp;$P = D_{K1}(E_{K2}(D_{K3}(C)))$\n        </div>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-3\">\n          <em>Backward Compatibility:</em> Setting $K_1 = K_2 = K_3$ reduces 3DES to standard single DES because the second step $D_{K1}$ cancels the first step $E_{K1}$. 3DES provides 112 bits of effective security (due to meet-in-the-middle attacks), but is slow in software.\n        </p>\n\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">4. Advanced Encryption Standard (AES - Rijndael)</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          Selected by NIST in 2001 after an open 5-year competition, designed by Vincent Rijmen and Joan Daemen. AES is an iterative <strong>Substitution-Permutation Network (SPN)</strong>:\n        </p>\n        <div class=\"overflow-x-auto mb-3\">\n          <table class=\"w-full text-xs text-left border\">\n            <thead class=\"bg-slate-100 dark:bg-slate-800 font-bold\">\n              <tr>\n                <th class=\"p-1.5 border\">AES Variant</th>\n                <th class=\"p-1.5 border\">Key Size (bits)</th>\n                <th class=\"p-1.5 border\">Block Size (bits)</th>\n                <th class=\"p-1.5 border\">Number of Rounds</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr><td class=\"p-1.5 border font-semibold\">AES-128</td><td class=\"p-1.5 border\">128 bits (16 bytes)</td><td class=\"p-1.5 border\">128 bits (16 bytes)</td><td class=\"p-1.5 border\">10 rounds</td></tr>\n              <tr><td class=\"p-1.5 border font-semibold\">AES-192</td><td class=\"p-1.5 border\">192 bits (24 bytes)</td><td class=\"p-1.5 border\">128 bits (16 bytes)</td><td class=\"p-1.5 border\">12 rounds</td></tr>\n              <tr><td class=\"p-1.5 border font-semibold\">AES-256</td><td class=\"p-1.5 border\">256 bits (32 bytes)</td><td class=\"p-1.5 border\">128 bits (16 bytes)</td><td class=\"p-1.5 border\">14 rounds</td></tr>\n            </tbody>\n          </table>\n        </div>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          AES operates on a $4 \\times 4$ byte matrix called the <strong>State</strong>. Each round executes 4 distinct algebraic transformations:\n        </p>\n        <ol class=\"text-xs list-decimal pl-5 space-y-1 text-slate-700 dark:text-slate-300\">\n          <li><strong>SubBytes (Non-linear Confusion):</strong> Each byte in the State is replaced independently using an 8-bit S-Box constructed from multiplicative inverses in $GF(2^8)$ followed by an affine transformation.</li>\n          <li><strong>ShiftRows (Transposition/Diffusion):</strong> Row 0 is shifted 0 bytes left; Row 1 shifted 1 byte left; Row 2 shifted 2 bytes left; Row 3 shifted 3 bytes left.</li>\n          <li><strong>MixColumns (Linear Diffusion):</strong> Columns are treated as 4-term polynomials over $GF(2^8)$ and multiplied modulo $(x^4 + 1)$ by a fixed matrix. (Omitted in the final round).</li>\n          <li><strong>AddRoundKey:</strong> The State is bitwise XORed with a 128-bit round subkey derived from the key schedule.</li>\n        </ol>\n      ",
      "technicalDetails": "\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">Block Cipher Modes of Operation (NIST SP 800-38A)</h3>\n        <div class=\"space-y-2 text-xs\">\n          <div class=\"p-2 bg-slate-50 dark:bg-slate-800 rounded border\">\n            <span class=\"font-bold text-rose-600 dark:text-rose-400\">1. Electronic Codebook (ECB):</span>\n            Each block of plaintext is encrypted independently with key $K$: $C_i = E_K(P_i)$.<br/>\n            <em>Fatal Flaw:</em> Identical plaintext blocks produce identical ciphertext blocks! An eavesdropper can discern the outline of an image (e.g., the famous ECB Linux Penguin demo) and manipulate blocks without knowing the key. <strong>Never use ECB for structured data.</strong>\n          </div>\n          <div class=\"p-2 bg-slate-50 dark:bg-slate-800 rounded border\">\n            <span class=\"font-bold text-emerald-600 dark:text-emerald-400\">2. Cipher Block Chaining (CBC):</span>\n            Each plaintext block is XORed with the previous ciphertext block before encryption. An unpredictable <strong>Initialization Vector (IV)</strong> is used for block 1:<br/>\n            $C_1 = E_K(P_1 \\oplus IV)$, &nbsp;&nbsp;$C_i = E_K(P_i \\oplus C_{i-1})$.<br/>\n            Decryption: $P_i = D_K(C_i) \\oplus C_{i-1}$. Decryption is parallelizable, but encryption is sequential.\n          </div>\n          <div class=\"p-2 bg-slate-50 dark:bg-slate-800 rounded border\">\n            <span class=\"font-bold text-indigo-600 dark:text-indigo-400\">3. Counter Mode (CTR):</span>\n            Turns a block cipher into a stream cipher. A counter incremented for each block is concatenated with an IV/Nonce and encrypted; the output is XORed with plaintext:<br/>\n            $C_i = P_i \\oplus E_K(\\text{Nonce} \\parallel i)$.<br/>\n            <em>Benefits:</em> Fully parallelizable for both encryption and decryption, supports random access read/write, and requires zero padding!\n          </div>\n          <div class=\"p-2 bg-slate-50 dark:bg-slate-800 rounded border\">\n            <span class=\"font-bold text-sky-600 dark:text-sky-400\">4. Galois/Counter Mode (GCM):</span>\n            Combines CTR mode with Galois field universal hashing to provide <strong>Authenticated Encryption with Associated Data (AEAD)</strong>—guaranteeing both confidentiality and message integrity simultaneously. Standard in TLS 1.3 and WPA3.\n          </div>\n        </div>\n      ",
      "workedExamples": {
        "level1": "\n          <strong>CBC Mode Encryption and Decryption Math:</strong><br/>\n          Given 2 blocks of plaintext $P_1$ and $P_2$, with 128-bit key $K$ and random $IV$:<br/>\n          <strong>Encryption Phase:</strong><br/>\n          1. $X_1 = P_1 \\oplus IV$<br/>\n          2. $C_1 = \\text{AES}_K(X_1)$<br/>\n          3. $X_2 = P_2 \\oplus C_1$<br/>\n          4. $C_2 = \\text{AES}_K(X_2)$<br/>\n          Ciphertext transmitted: $[IV, C_1, C_2]$.<br/><br/>\n          <strong>Decryption Phase:</strong><br/>\n          1. $X_2 = \\text{AES}_K^{-1}(C_2)$<br/>\n          2. $P_2 = X_2 \\oplus C_1 = [\\text{AES}_K^{-1}(\\text{AES}_K(P_2 \\oplus C_1))] \\oplus C_1 = (P_2 \\oplus C_1) \\oplus C_1 = P_2$.<br/>\n          Because $C_1 \\oplus C_1 = 0$, $P_2$ is perfectly recovered!\n        ",
        "level2": "\n          <strong>Why Meet-in-the-Middle Reduces 2DES to 57 Bits:</strong><br/>\n          Suppose Double DES is used: $C = E_{K2}(E_{K1}(P))$. Key space seems to be $2^{56} \\times 2^{56} = 2^{112}$.<br/>\n          Diffie and Hellman showed that with a known $(P, C)$ pair:<br/>\n          • Attacker computes $M_1 = E_{K1}(P)$ for all $2^{56}$ possible $K1$ keys and stores values in a sorted hash table.<br/>\n          • Attacker computes $M_2 = D_{K2}(C)$ for all $2^{56}$ possible $K2$ keys and looks for matches in the hash table.<br/>\n          A match $E_{K1}(P) = D_{K2}(C)$ identifies potential candidate keys!<br/>\n          Total operations: $2^{56} + 2^{56} = 2^{57}$, requiring only 57-bit effort. This is why <strong>3DES</strong> with 3 keys is required instead of 2DES.\n        ",
        "level3": "\n          <strong>Hardware Acceleration: Intel AES-NI & ARMv8 Crypto Extensions:</strong><br/>\n          Modern processors contain dedicated hardware execution instructions:\n          <code>AESENC</code> (performs SubBytes $\\to$ ShiftRows $\\to$ MixColumns $\\to$ AddRoundKey in 1 single clock cycle) and <code>AESDEC</code>.<br/>\n          This enables symmetric hardware throughput exceeding 10 Gigabits per second per core, rendering software AES overhead negligible in modern networking.\n        "
      },
      "advantagesLimitations": "\n        <div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 text-xs\">\n          <div class=\"p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800\">\n            <h4 class=\"font-bold text-emerald-800 dark:text-emerald-300 mb-2\">Advantages</h4>\n            <ul class=\"space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300\">\n              <li>Tremendous computational throughput (orders of magnitude faster than RSA/ECC).</li>\n              <li>Minimal memory and CPU instruction overhead, optimized for hardware silicon.</li>\n              <li>AES-256 is quantum-resistant against Grover's algorithm (effective 128-bit quantum security).</li>\n            </ul>\n          </div>\n          <div class=\"p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800\">\n            <h4 class=\"font-bold text-rose-800 dark:text-rose-300 mb-2\">The Key Distribution Problem</h4>\n            <ul class=\"space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300\">\n              <li>$O(N^2)$ Key Explosion: In a network of $N$ users, every pair requires a unique key, demanding $\\frac{N(N-1)}{2}$ secret keys! (For 10,000 users $\\implies 49,995,000$ keys!).</li>\n              <li>Key Exchange Dilemma: How do two parties across the globe exchange the secret key without an adversary intercepting it?</li>\n              <li>Cannot provide non-repudiation because both parties share the exact same key.</li>\n            </ul>\n          </div>\n        </div>\n      ",
      "whereUsed": [
        "TLS 1.3 Cipher Suites: <code>TLS_AES_128_GCM_SHA256</code> and <code>TLS_CHACHA20_POLY1305_SHA256</code>",
        "Wi-Fi Security: CCMP protocol in WPA2/WPA3 using AES in Counter with CBC-MAC Mode",
        "Storage: BitLocker, dm-crypt, and NVMe self-encrypting hard drives",
        "Secure Shell (SSHv2): Session payload tunneling"
      ],
      "commonMistakes": "\n        <ul class=\"space-y-2 text-xs\">\n          <li><strong>Using ECB Mode for general data:</strong> Encrypting images or documents with ECB reveals patterns, boundaries, and repeated structures. Always use authenticated modes like GCM or CTR/CBC with random IVs.</li>\n          <li><strong>Reusing IVs in CTR or GCM Mode:</strong> If the same IV/Nonce is used twice with the same key in CTR/GCM, $C_1 \\oplus C_2 = P_1 \\oplus P_2$, catastrophic failure occurs and plaintext can be reconstructed.</li>\n        </ul>\n      ",
      "quiz": [
        {
          "question": "How many rounds of transformation does the standard AES-128 algorithm execute?",
          "options": [
            "10 rounds",
            "12 rounds",
            "14 rounds",
            "16 rounds"
          ],
          "answer": 0,
          "explanation": "AES-128 executes 10 rounds, AES-192 executes 12 rounds, and AES-256 executes 14 rounds."
        },
        {
          "question": "Why does the internal round function F of a Feistel cipher NOT need to be mathematically invertible?",
          "options": [
            "Because XOR is a self-inverting operation: (A XOR B) XOR B = A",
            "Because it only processes prime numbers",
            "Because keys are always public",
            "Because it operates in ECB mode"
          ],
          "answer": 0,
          "explanation": "In a Feistel network, during decryption the function F is computed with the same inputs and XORed back into the modified half. Because (X XOR Y) XOR Y = X, the original block is restored without requiring F^-1."
        },
        {
          "question": "Which block cipher mode of operation is susceptible to the famous 'Penguin pattern leakage' vulnerability due to lack of chaining between blocks?",
          "options": [
            "Electronic Codebook (ECB)",
            "Cipher Block Chaining (CBC)",
            "Counter Mode (CTR)",
            "Galois/Counter Mode (GCM)"
          ],
          "answer": 0,
          "explanation": "ECB encrypts each block independently; identical plaintext blocks map to identical ciphertext blocks, preserving visual and structural patterns."
        }
      ],
      "references": [
        {
          "cite": "B.A. Forouzan, Data Communications and Networking (4th Ed.), Chapter 30.3: Modern Symmetric-Key Ciphers",
          "url": ""
        },
        {
          "cite": "NIST FIPS PUB 197: Advanced Encryption Standard (AES)",
          "url": "https://csrc.nist.gov/publications/detail/fips/197/final"
        },
        {
          "cite": "NIST SP 800-38A: Recommendation for Block Cipher Modes of Operation",
          "url": "https://csrc.nist.gov/publications/detail/sp/800-38a/final"
        }
      ]
    },
    "prevTopicId": "transposition-ciphers",
    "nextTopicId": "public-key-algorithms"
  },
  "public-key-algorithms": {
    "id": "public-key-algorithms",
    "title": "Public Key Algorithms",
    "unit": "Unit 5 – Application Layer",
    "unitId": "unit5",
    "level": "Level 3 — Asymmetric Cryptography & Key Exchange",
    "category": "security",
    "difficulty": "Advanced",
    "readingTime": "35 min read",
    "standard": "RFC 2631 (Diffie-Hellman), RFC 5280 (PKI X.509) / Forouzan Chapter 30.4",
    "oneLiner": "Cryptographic paradigms using mathematically linked asymmetric key pairs (public and private keys) to resolve the key distribution problem and enable digital signatures.",
    "quickAnswer": "Public-key (asymmetric) cryptography is a paradigm where every communicating party possesses an asymmetric key pair: a Public Key (distributed openly to the world) and a Private Key (kept strictly secret by the owner). Encryption performed with the public key can only be decrypted by the corresponding private key. Asymmetric cryptography eliminates the classic $O(N^2)$ symmetric key distribution problem, enables key exchange over open networks (Diffie-Hellman), and provides digital signatures for non-repudiation.",
    "whyItMatters": "Public-key cryptography solves the single greatest limitation of symmetric systems: how two strangers can communicate securely over an untrusted network without sharing a prior secret. It forms the backbone of TLS handshakes, digital certificates, and software distribution.",
    "infobox": {
      "layer": "Application Layer & Presentation Layer (OSI Layer 6/7)",
      "standard": "RFC 2631 (Diffie-Hellman), RFC 5280 (X.509 PKI), NIST SP 800-56A",
      "type": "Asymmetric Cryptosystem & Key Agreement Protocol",
      "prerequisites": [
        "intro-cryptography",
        "symmetric-algorithms"
      ],
      "relatedConcepts": [
        "rsa-algorithm"
      ],
      "compareWith": [
        "symmetric-algorithms"
      ],
      "primaryUses": [
        "Ephemeral key agreement across unencrypted public Internet channels (Diffie-Hellman)",
        "Identity verification via X.509 Certificate Authorities in HTTPS",
        "Digital signatures for authenticating legal contracts, emails, and operating system updates",
        "SSH public-key remote authentication"
      ],
      "standardRfc": "RFC 2631, RFC 5280"
    },
    "learningObjectives": [
      "Explain the fundamental concept of Asymmetric Key Pairs and Trapdoor One-Way Functions",
      "Analyze how public-key cryptography reduces the $O(N^2)$ key scaling problem down to $2N$ keys",
      "Execute the Diffie-Hellman Key Exchange protocol step-by-step with modular arithmetic calculations",
      "Trace the Discrete Logarithm Problem (DLP) that underpins Diffie-Hellman security",
      "Demonstrate the Man-in-the-Middle (MitM) attack against unauthenticated Diffie-Hellman",
      "Describe the structure and role of Digital Signatures, Public Key Infrastructure (PKI), and X.509 Certificates"
    ],
    "prerequisitesList": [
      {
        "concept": "Symmetric Algorithm Scaling Constraints",
        "meaning": "Understanding why distributing symmetric keys securely across millions of web clients is impossible"
      },
      {
        "concept": "Primitive Roots Modulo Prime P",
        "meaning": "A primitive root g of prime p generates all elements from 1 to p-1 when raised to powers modulo p"
      }
    ],
    "imageUrl": "assets/images/unit5/topic5/public-key-cryptography.svg",
    "imageCaption": "Figure 5.18: Asymmetric Cryptosystem Architecture, Diffie-Hellman Key Exchange, and PKI Trust Hierarchy",
    "sections": {
      "overview": "\n        <p class=\"mb-3\">\n          For over 3,000 years, all cryptography was symmetric. In 1976, Whitfield Diffie and Martin Hellman published their groundbreaking paper <em>\"New Directions in Cryptography\"</em>, revolutionizing information security by introducing <strong>Asymmetric (Public Key) Cryptography</strong>.\n        </p>\n        <p class=\"mb-3\">\n          In an asymmetric cryptosystem, each participant generates an interrelated key pair:\n        </p>\n        <div class=\"grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-3\">\n          <div class=\"p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 rounded\">\n            <span class=\"font-bold text-emerald-800 dark:text-emerald-300\">Public Key ($K_{pub}$):</span> Published openly in directories, certificates, or DNS records. Anyone can use it to encrypt messages intended for the recipient or verify the recipient's signature.\n          </div>\n          <div class=\"p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-700 rounded\">\n            <span class=\"font-bold text-rose-800 dark:text-rose-300\">Private Key ($K_{priv}$):</span> Kept strictly confidential and known only to its owner. It is used to decrypt messages encrypted with the matching public key or generate digital signatures.\n          </div>\n        </div>\n      ",
      "howItWorks": "\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">1. Mathematical Foundations: Trapdoor One-Way Functions</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          Public-key cryptosystems rely on <strong>Trapdoor One-Way Functions</strong>:\n        </p>\n        <ul class=\"text-xs list-disc pl-5 space-y-1 mb-3 text-slate-700 dark:text-slate-300\">\n          <li><strong>Easy Forward:</strong> Given input $x$, computing $y = f(x)$ is computationally fast (polynomial time $O(n^k)$).</li>\n          <li><strong>Hard Inverse:</strong> Given $y$, computing $x = f^{-1}(y)$ is computationally intractable (subexponential or exponential time).</li>\n          <li><strong>Trapdoor Secret:</strong> If a specific piece of secret auxiliary data $k$ (the private key) is known, computing the inverse $x = f^{-1}(y, k)$ becomes trivial!</li>\n        </ul>\n\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">2. Diffie-Hellman Key Exchange (DH)</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          Diffie-Hellman allows two parties (Alice and Bob) who have never met to establish a shared symmetric secret key over an insecure, publicly monitored channel without transmitting the secret itself:\n        </p>\n        <ol class=\"text-xs list-decimal pl-5 space-y-1.5 mb-3 text-slate-700 dark:text-slate-300\">\n          <li><strong>Global Public Parameters:</strong> Alice and Bob agree on a large prime number $p$ and a primitive root $g$ modulo $p$. (These are public knowledge).</li>\n          <li><strong>Alice's Private & Public Keys:</strong> Alice selects private secret integer $a$ ($1 < a < p$) and computes public value $A = g^a \\bmod p$. Alice sends $A$ to Bob over the network.</li>\n          <li><strong>Bob's Private & Public Keys:</strong> Bob selects private secret integer $b$ ($1 < b < p$) and computes public value $B = g^b \\bmod p$. Bob sends $B$ to Alice over the network.</li>\n          <li><strong>Alice Computes Shared Secret:</strong> Alice receives $B$ and computes: $K_A = B^a \\bmod p = (g^b)^a \\bmod p = g^{ab} \\bmod p$.</li>\n          <li><strong>Bob Computes Shared Secret:</strong> Bob receives $A$ and computes: $K_B = A^b \\bmod p = (g^a)^b \\bmod p = g^{ab} \\bmod p$.</li>\n        </ol>\n        <div class=\"p-2 bg-emerald-100 dark:bg-emerald-950 font-mono text-xs rounded text-center text-emerald-800 dark:text-emerald-200 mb-3\">\n          $K_A = K_B = g^{ab} \\bmod p = K$ &nbsp; (Shared Secret Established!)\n        </div>\n\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">3. The Discrete Logarithm Problem (DLP)</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          An eavesdropper (Eve) observes $p, g, A = g^a \\bmod p$, and $B = g^b \\bmod p$. To derive the secret key $K = g^{ab} \\bmod p$, Eve must find Alice's private key $a = \\log_g(A) \\bmod p$.\n        </p>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-3\">\n          In ordinary arithmetic, logarithms are trivial. But in the modular ring $\\mathbb{Z}_p^*$ with a prime $p$ of 2048 or 4096 bits, computing the <strong>Discrete Logarithm</strong> is computationally infeasible using all supercomputers on Earth!\n        </p>\n\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">4. Digital Signatures and Public Key Infrastructure (PKI)</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          Public-key cryptography also enables <strong>Digital Signatures</strong>:\n        </p>\n        <div class=\"p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-mono text-xs mb-3\">\n          Signing: &nbsp;&nbsp;$S = \\text{Sign}_{K_{priv}}(H(M))$ &nbsp;&nbsp; (Sender signs hash of message with Private Key)<br/>\n          Verifying: $\\text{Verify}_{K_{pub}}(M, S) \\to \\text{TRUE / FALSE}$ &nbsp;&nbsp; (Anyone verifies using Public Key)\n        </div>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          <strong>The Man-in-the-Middle (MitM) Dilemma:</strong> If Alice accepts Bob's public key blindly, attacker Eve can intercept the message and substitute Eve's own public key! To prevent this, the world uses <strong>Public Key Infrastructure (PKI)</strong>:\n        </p>\n        <ul class=\"text-xs list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300\">\n          <li><strong>Certificate Authorities (CAs):</strong> Trusted third parties (e.g., DigiCert, Let's Encrypt) verify an organization's domain ownership.</li>\n          <li><strong>X.509 Digital Certificates:</strong> Bind a server's identity (domain name) to its public key, digitally signed by the CA's private key.</li>\n          <li><strong>Root Stores:</strong> Web browsers and operating systems ship with built-in trusted CA root certificates.</li>\n        </ul>\n      ",
      "technicalDetails": "\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">Key Scaling: Symmetric vs. Asymmetric</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          In an enterprise or Internet community of $N$ communicating entities:\n        </p>\n        <div class=\"overflow-x-auto mb-3\">\n          <table class=\"w-full text-xs text-left border\">\n            <thead class=\"bg-slate-100 dark:bg-slate-800 font-bold\">\n              <tr>\n                <th class=\"p-1.5 border\">Metric</th>\n                <th class=\"p-1.5 border\">Symmetric Cryptosystem</th>\n                <th class=\"p-1.5 border\">Asymmetric Cryptosystem</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr><td class=\"p-1.5 border font-semibold\">Total Keys Required</td><td class=\"p-1.5 border font-mono\">N(N - 1) / 2 = O(N^2)</td><td class=\"p-1.5 border font-mono\">2N = O(N)</td></tr>\n              <tr><td class=\"p-1.5 border font-semibold\">Keys Stored Per User</td><td class=\"p-1.5 border font-mono\">N - 1 keys</td><td class=\"p-1.5 border font-mono\">1 Private Key + N Public Keys</td></tr>\n              <tr><td class=\"p-1.5 border font-semibold\">For N = 1,000,000 Users</td><td class=\"p-1.5 border font-bold text-rose-600\">499,999,500,000 keys</td><td class=\"p-1.5 border font-bold text-emerald-600\">2,000,000 keys</td></tr>\n              <tr><td class=\"p-1.5 border font-semibold\">Non-Repudiation</td><td class=\"p-1.5 border text-rose-600\">No (both share key)</td><td class=\"p-1.5 border text-emerald-600\">Yes (only owner has private key)</td></tr>\n              <tr><td class=\"p-1.5 border font-semibold\">Processing Speed</td><td class=\"p-1.5 border text-emerald-600\">Ultra-fast (Gigabits/sec)</td><td class=\"p-1.5 border text-amber-600\">100x to 1000x slower</td></tr>\n            </tbody>\n          </table>\n        </div>\n      ",
      "workedExamples": {
        "level1": "\n          <strong>Diffie-Hellman Numerical Worked Problem:</strong><br/>\n          Public parameters: Prime $p = 23$, primitive root $g = 5$.<br/>\n          1. Alice chooses private key $a = 6$. Alice computes public value $A$:<br/>\n          &nbsp;&nbsp;$A = g^a \\bmod p = 5^6 \\bmod 23 = 15,625 \\bmod 23 = 8$.<br/>\n          &nbsp;&nbsp;Alice sends $A = 8$ to Bob.<br/>\n          2. Bob chooses private key $b = 15$. Bob computes public value $B$:<br/>\n          &nbsp;&nbsp;$B = g^b \\bmod p = 5^{15} \\bmod 23 = 19$.<br/>\n          &nbsp;&nbsp;Bob sends $B = 19$ to Alice.<br/>\n          3. Alice computes shared key from Bob's public $B$ and her secret $a$:<br/>\n          &nbsp;&nbsp;$K = B^a \\bmod p = 19^6 \\bmod 23 = 47,045,881 \\bmod 23 = 2$.<br/>\n          4. Bob computes shared key from Alice's public $A$ and his secret $b$:<br/>\n          &nbsp;&nbsp;$K = A^b \\bmod p = 8^{15} \\bmod 23 = 35,184,372,088,832 \\bmod 23 = 2$.<br/>\n          Both Alice and Bob independently calculate identical shared symmetric key <strong>$K = 2$</strong>!\n        ",
        "level2": "\n          <strong>Man-in-the-Middle (MitM) Attack on Unauthenticated Diffie-Hellman:</strong><br/>\n          If Alice and Bob do not authenticate their public keys via certificates, Mallory intercepts:<br/>\n          1. Alice sends $A = 8$. Mallory intercepts it and sends Mallory's own public value $M = 12$ to Bob.<br/>\n          2. Bob sends $B = 19$. Mallory intercepts it and sends $M = 12$ to Alice.<br/>\n          3. Alice and Mallory establish key $K_1$; Bob and Mallory establish key $K_2$.<br/>\n          Mallory decrypts Alice's messages with $K_1$, reads/modifies them, and re-encrypts with $K_2$ for Bob! Neither party realizes they are talking to Mallory. This demonstrates why <strong>DH must be paired with digital signature authentication (ECDHE-RSA / ECDHE-ECDSA)</strong>.\n        ",
        "level3": "\n          <strong>Hybrid Cryptography (The Modern Best-of-Both-Worlds Solution):</strong><br/>\n          Because asymmetric algorithms are computationally intensive and cannot efficiently encrypt large video or file streams:<br/>\n          1. The TLS client generates a random 256-bit symmetric key (session key).<br/>\n          2. The client encrypts the session key using the server's asymmetric public key and sends it.<br/>\n          3. The server decrypts the session key using its private key.<br/>\n          4. Both parties switch to AES-256-GCM symmetric encryption for high-throughput bulk transfer!\n        "
      },
      "advantagesLimitations": "\n        <div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 text-xs\">\n          <div class=\"p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800\">\n            <h4 class=\"font-bold text-emerald-800 dark:text-emerald-300 mb-2\">Advantages</h4>\n            <ul class=\"space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300\">\n              <li>Completely solves the symmetric key distribution problem over insecure public networks.</li>\n              <li>Linear $O(N)$ key scaling instead of quadratic $O(N^2)$ key explosion.</li>\n              <li>Enables digital signatures and non-repudiation for transactions and identity.</li>\n            </ul>\n          </div>\n          <div class=\"p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800\">\n            <h4 class=\"font-bold text-rose-800 dark:text-rose-300 mb-2\">Operational Limitations</h4>\n            <ul class=\"space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300\">\n              <li>Computational latency: Exponentiation of multi-thousand-bit numbers is 100x to 1,000x slower than AES.</li>\n              <li>Larger key sizes required: A 2048-bit RSA key provides equivalent security to a 112-bit symmetric key.</li>\n              <li>Vulnerable to quantum computing algorithms (Shor's Algorithm breaks DH, RSA, and ECC in polynomial time).</li>\n            </ul>\n          </div>\n        </div>\n      ",
      "whereUsed": [
        "Web Security: TLS handshake key exchange (ECDHE) securing HTTPS",
        "Identity & Trust: X.509 PKI certificates signed by Let's Encrypt and DigiCert",
        "Code Signing: Microsoft Authenticode and Apple Developer app code signing",
        "Email Secrecy: S/MIME and PGP/GPG encrypted email exchange",
        "Cryptocurrency: Bitcoin & Ethereum digital signature transaction authorization (ECDSA / secp256k1)"
      ],
      "commonMistakes": "\n        <ul class=\"space-y-2 text-xs\">\n          <li><strong>Using asymmetric encryption for bulk data:</strong> Attempting to encrypt a 1 GB video file with RSA or ECC directly will cause severe CPU starvation. Asymmetric encryption should only be used to exchange symmetric keys or sign message hashes.</li>\n          <li><strong>Confusing Authentication with Secrecy:</strong> Encrypting with a recipient's public key provides <em>confidentiality</em> (only recipient can read it). Encrypting a hash with your private key provides <em>authentication/integrity</em> (digital signature).</li>\n        </ul>\n      ",
      "quiz": [
        {
          "question": "How many total keys must be generated and managed in an asymmetric cryptosystem serving N = 500 users?",
          "options": [
            "1,000 keys (2N)",
            "124,750 keys (N(N-1)/2)",
            "500 keys (N)",
            "250,000 keys (N^2)"
          ],
          "answer": 0,
          "explanation": "In an asymmetric system, each user requires exactly 1 public key and 1 private key. For 500 users, 2 * 500 = 1,000 keys are required."
        },
        {
          "question": "What mathematical problem provides the one-way trapdoor hardness for the Diffie-Hellman key exchange?",
          "options": [
            "Integer Factorization of large composites",
            "The Discrete Logarithm Problem in prime modulo groups",
            "The Traveling Salesperson Problem",
            "Elliptic curve matrix inversion"
          ],
          "answer": 1,
          "explanation": "Diffie-Hellman relies on the difficulty of the Discrete Logarithm Problem: given g, p, and g^a mod p, it is computationally intractable to compute a."
        },
        {
          "question": "What technology prevents Man-in-the-Middle attackers from substituting their own public key during a Diffie-Hellman key exchange?",
          "options": [
            "X.509 Digital Certificates signed by trusted Certificate Authorities",
            "DES S-Boxes",
            "Rail Fence permutation",
            "Proxy caching"
          ],
          "answer": 0,
          "explanation": "X.509 Digital Certificates bind an entity's identity to their public key via a trusted Certificate Authority's digital signature, preventing unauthorized public key substitution."
        }
      ],
      "references": [
        {
          "cite": "B.A. Forouzan, Data Communications and Networking (4th Ed.), Chapter 30.4: Asymmetric-Key Cryptography",
          "url": ""
        },
        {
          "cite": "W. Diffie and M. Hellman, 'New Directions in Cryptography', IEEE Transactions on Information Theory, 1976",
          "url": "https://ee.stanford.edu/~hellman/publications/24.pdf"
        },
        {
          "cite": "RFC 5280: Internet X.509 Public Key Infrastructure Certificate and CRL Profile",
          "url": "https://datatracker.ietf.org/doc/html/rfc5280"
        }
      ]
    },
    "prevTopicId": "symmetric-algorithms",
    "nextTopicId": "rsa-algorithm"
  },
  "rsa-algorithm": {
    "id": "rsa-algorithm",
    "title": "RSA Algorithm",
    "unit": "Unit 5 – Application Layer",
    "unitId": "unit5",
    "level": "Level 3 — Public Key Cryptography Standard",
    "category": "security",
    "difficulty": "Advanced",
    "readingTime": "40 min read",
    "standard": "RFC 8017 (PKCS #1 v2.2) / Forouzan Chapter 30.4",
    "oneLiner": "The world's most widely deployed public-key algorithm, based on the mathematical difficulty of factoring the product of two large prime numbers.",
    "quickAnswer": "The RSA algorithm (named after its inventors Ron Rivest, Adi Shamir, and Leonard Adleman in 1977) is an asymmetric public-key cryptosystem used worldwide for secure data encryption and digital signatures. It derives its security from the integer factorization problem: while multiplying two large prime numbers $p$ and $q$ to produce modulus $n = p \\cdot q$ is computationally trivial, factoring a 2048-bit composite $n$ back into its constituent primes $p$ and $q$ is practically impossible with classical computers.",
    "whyItMatters": "RSA provides the mathematical trust foundation for global electronic commerce, software code-signing, banking credentials, and web security. Understanding RSA key generation, modular exponentiation, and padding is essential for every networking and security engineer.",
    "infobox": {
      "layer": "Application Layer & Presentation Layer (OSI Layer 6/7)",
      "standard": "RFC 8017 (PKCS #1 v2.2), NIST SP 800-56B, ANSI X9.31",
      "type": "Asymmetric Integer Factorization Cryptosystem",
      "prerequisites": [
        "intro-cryptography",
        "public-key-algorithms"
      ],
      "relatedConcepts": [
        "symmetric-algorithms"
      ],
      "compareWith": [
        "symmetric-algorithms",
        "public-key-algorithms"
      ],
      "primaryUses": [
        "Web server authentication and session key exchange in TLS / HTTPS",
        "Digital signatures for operating system updates, drivers, and code signing",
        "Email privacy standards (S/MIME, PGP)",
        "Secure Shell (SSH) host key identification and user login"
      ],
      "standardRfc": "RFC 8017 (PKCS #1)"
    },
    "learningObjectives": [
      "Explain the mathematical principles of Euler's Totient function $\\phi(n)$ and Euler's Theorem",
      "Execute the 5 steps of RSA Key Generation to produce Public Key $(e, n)$ and Private Key $(d, n)$",
      "Apply the RSA encryption formula $C = M^e \\bmod n$ and decryption formula $M = C^d \\bmod n$",
      "Prove the mathematical correctness of RSA using modular arithmetic and Euler's Totient Theorem",
      "Work through Forouzan numerical examples: Example 30.7 ($p=7, q=11$) and Example 30.8 ($p=397, q=401$)",
      "Explain why textbook RSA is insecure and how Optimal Asymmetric Encryption Padding (OAEP) prevents chosen-ciphertext attacks",
      "Evaluate contemporary RSA key lengths (2048-bit, 4096-bit) and performance trade-offs"
    ],
    "prerequisitesList": [
      {
        "concept": "Euler's Totient Function",
        "meaning": "For prime $p$, $\\phi(p) = p-1$. For composite $n = p \\cdot q$, $\\phi(n) = (p-1)(q-1)$"
      },
      {
        "concept": "Modular Multiplicative Inverse",
        "meaning": "Finding integer $d$ such that $e \\cdot d \\equiv 1 \\pmod{\\phi(n)}$ using the Extended Euclidean Algorithm"
      }
    ],
    "imageUrl": "assets/images/unit5/topic5/rsa-algorithm.svg",
    "imageCaption": "Figure 5.19: Complete RSA Cryptosystem: Key Generation, Encryption, Decryption, and OAEP Padding Architecture",
    "sections": {
      "overview": "\n        <p class=\"mb-3\">\n          Invented at MIT in 1977 by <strong>Ron Rivest, Adi Shamir, and Leonard Adleman</strong>, RSA was the first viable public-key cryptosystem capable of both encryption and digital signatures.\n        </p>\n        <p class=\"mb-3\">\n          RSA is a <strong>block cipher</strong> where plaintexts and ciphertexts are integers between $0$ and $n-1$ for some modulus $n$. Its security rests entirely on the <strong>Integer Factorization Problem</strong>: given two primes $p$ and $q$, computing $n = p \\cdot q$ takes microseconds. However, given only $n$, finding $p$ and $q$ when each is over 1,024 bits long requires astronomical computational time with the best known algorithms (such as the General Number Field Sieve).\n        </p>\n      ",
      "howItWorks": "\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">1. RSA Key Generation Procedure</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          To generate an RSA key pair, execute the following five algorithmic steps:\n        </p>\n        <div class=\"space-y-2 text-xs mb-3\">\n          <div class=\"p-2.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700\">\n            <span class=\"font-bold text-blue-600 dark:text-blue-400\">Step 1: Select Two Large Primes:</span><br/>\n            Choose two very large, distinct prime numbers $p$ and $q$ at random. (In modern production, each is at least 1024 bits long).\n          </div>\n          <div class=\"p-2.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700\">\n            <span class=\"font-bold text-blue-600 dark:text-blue-400\">Step 2: Calculate Modulus $n$:</span><br/>\n            Compute modulus $n = p \\cdot q$. The bit length of $n$ ($k = \\lfloor\\log_2 n\\rfloor + 1$) is the official RSA key length (e.g., 2048 bits).\n          </div>\n          <div class=\"p-2.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700\">\n            <span class=\"font-bold text-blue-600 dark:text-blue-400\">Step 3: Calculate Euler's Totient $\\phi(n)$:</span><br/>\n            Since $p$ and $q$ are prime, the count of integers coprime to $n$ is:\n            $$\\phi(n) = (p - 1)(q - 1)$$\n          </div>\n          <div class=\"p-2.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700\">\n            <span class=\"font-bold text-blue-600 dark:text-blue-400\">Step 4: Select Public Exponent $e$:</span><br/>\n            Choose an integer $e$ such that $1 < e < \\phi(n)$ and $\\gcd(e, \\phi(n)) = 1$ ($e$ and $\\phi(n)$ must be coprime). Common choices in practice are 3, 17, or most commonly $65537$ ($2^{16} + 1$).\n          </div>\n          <div class=\"p-2.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700\">\n            <span class=\"font-bold text-blue-600 dark:text-blue-400\">Step 5: Calculate Private Exponent $d$:</span><br/>\n            Compute $d$, the modular multiplicative inverse of $e$ modulo $\\phi(n)$, using the <strong>Extended Euclidean Algorithm</strong>:\n            $$d \\cdot e \\equiv 1 \\pmod{\\phi(n)} \\implies d \\equiv e^{-1} \\pmod{\\phi(n)}$$\n          </div>\n        </div>\n\n        <div class=\"grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-3\">\n          <div class=\"p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 rounded text-center\">\n            <span class=\"font-bold text-emerald-800 dark:text-emerald-300\">Public Key:</span> &nbsp;$\\mathbf{PU = \\{e, n\\}}$<br/>\n            <span class=\"text-[11px] text-slate-600 dark:text-slate-400\">(Distributed openly to all clients)</span>\n          </div>\n          <div class=\"p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-700 rounded text-center\">\n            <span class=\"font-bold text-rose-800 dark:text-rose-300\">Private Key:</span> &nbsp;$\\mathbf{PR = \\{d, n\\}}$<br/>\n            <span class=\"text-[11px] text-slate-600 dark:text-slate-400\">(Kept strictly secret; $p, q, \\phi(n)$ destroyed)</span>\n          </div>\n        </div>\n\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">2. Encryption and Decryption Operations</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          Plaintext message $M$ must be partitioned into blocks such that $0 \\le M < n$:\n        </p>\n        <div class=\"p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-mono text-xs mb-3\">\n          Encryption: &nbsp;$C = M^e \\bmod n$<br/>\n          Decryption: &nbsp;$M = C^d \\bmod n$\n        </div>\n\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">3. Proof of Correctness (Why RSA Works)</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          We must prove that decrypting the ciphertext recovers the exact plaintext: $(M^e)^d \\equiv M \\pmod n$.\n        </p>\n        <div class=\"p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded text-xs mb-3\">\n          <p class=\"text-slate-700 dark:text-slate-300 mb-1\">\n            Since $e \\cdot d \\equiv 1 \\pmod{\\phi(n)}$, there exists an integer $k$ such that:\n            $$e \\cdot d = k \\cdot \\phi(n) + 1$$\n          </p>\n          <p class=\"text-slate-700 dark:text-slate-300 mb-1\">\n            Substituting this into the decryption formula:\n            $$C^d \\equiv (M^e)^d \\equiv M^{ed} \\equiv M^{k \\cdot \\phi(n) + 1} \\equiv (M^{\\phi(n)})^k \\cdot M^1 \\pmod n$$\n          </p>\n          <p class=\"text-slate-700 dark:text-slate-300\">\n            By <strong>Euler's Theorem</strong>, for any integer $M$ coprime to $n$:\n            $$M^{\\phi(n)} \\equiv 1 \\pmod n$$\n            Therefore:\n            $$C^d \\equiv (1)^k \\cdot M \\equiv 1 \\cdot M \\equiv M \\pmod n$$\n            Plaintext $M$ is recovered exactly! (By the Chinese Remainder Theorem, this holds true for all $M < n$, even if $\\gcd(M, n) \\ne 1$).\n          </p>\n        </div>\n      ",
      "technicalDetails": "\n        <h3 class=\"text-sm font-bold text-gray-900 dark:text-white mb-2\">Attacks on \"Textbook\" RSA & The Necessity of OAEP</h3>\n        <p class=\"text-xs text-slate-700 dark:text-slate-300 mb-2\">\n          Plain \"textbook\" RSA ($C = M^e \\bmod n$) is deterministic and highly vulnerable in production:\n        </p>\n        <ul class=\"text-xs list-disc pl-5 space-y-1 mb-3 text-slate-700 dark:text-slate-300\">\n          <li><strong>Deterministic Cipher Vulnerability:</strong> Encrypting the same plaintext $M$ with public key $(e, n)$ always produces the identical ciphertext $C$. An attacker can encrypt a dictionary of guesses and compare ciphertexts.</li>\n          <li><strong>Multiplicative Homomorphism:</strong> $E(M_1) \\cdot E(M_2) = (M_1^e \\bmod n)(M_2^e \\bmod n) = (M_1 M_2)^e \\bmod n = E(M_1 \\cdot M_2)$. An attacker can manipulate ciphertext blocks algebraically to forge valid plaintexts without discovering $d$.</li>\n          <li><strong>Small Public Exponent Attack:</strong> If $e = 3$ and plaintext $M < n^{1/3}$, then $M^3 < n$ and modular wrap-around does not occur! The attacker simply computes the ordinary integer cube root $M = \\sqrt[3]{C}$.</li>\n        </ul>\n        <div class=\"p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 rounded text-xs mb-3\">\n          <p class=\"font-bold text-amber-900 dark:text-amber-200 mb-1\">Solution: Optimal Asymmetric Encryption Padding (OAEP - RFC 8017)</p>\n          <p class=\"text-slate-700 dark:text-slate-300\">\n            Modern RSA standards (PKCS #1 v2.2) mandate <strong>RSA-OAEP</strong>. Before encryption, plaintext $M$ is padded with random salt bits and processed through a two-round Feistel-like masking network using cryptographic hash functions (such as SHA-256). This transforms RSA into a randomized, non-malleable, IND-CCA2 secure cryptosystem!\n          </p>\n        </div>\n      ",
      "workedExamples": {
        "level1": "\n          <strong>Forouzan Example 30.7 — Complete Numerical RSA Walkthrough:</strong><br/>\n          Let prime numbers be $p = 7$ and $q = 11$.<br/>\n          1. Calculate modulus $n$:<br/>\n          &nbsp;&nbsp;$n = p \\cdot q = 7 \\times 11 = 77$.<br/>\n          2. Calculate Euler's totient $\\phi(n)$:<br/>\n          &nbsp;&nbsp;$\\phi(n) = (p - 1)(q - 1) = (7 - 1)(11 - 1) = 6 \\times 10 = 60$.<br/>\n          3. Choose public exponent $e$ coprime to 60:<br/>\n          &nbsp;&nbsp;Factors of 60 are $2, 3, 5$. We choose $e = 13$ (since $\\gcd(13, 60) = 1$).<br/>\n          4. Compute private exponent $d$ such that $e \\cdot d \\equiv 1 \\pmod{60}$:<br/>\n          &nbsp;&nbsp;$13d = 60k + 1 \\implies$ for $k = 8$: $13d = 481 \\implies d = 481 / 13 = 37$.<br/>\n          &nbsp;&nbsp;Public Key: $\\mathbf{PU = \\{13, 77\\}}$, &nbsp;Private Key: $\\mathbf{PR = \\{37, 77\\}}$.<br/><br/>\n          <strong>Encryption of Plaintext $M = 5$:</strong><br/>\n          $C = M^e \\bmod n = 5^{13} \\bmod 77$.<br/>\n          Compute using modular exponentiation (repeated squaring):<br/>\n          • $5^2 = 25$<br/>\n          • $5^4 = 25^2 = 625 = 8 \\times 77 + 9 \\equiv 9 \\pmod{77}$<br/>\n          • $5^8 = 9^2 = 81 = 1 \\times 77 + 4 \\equiv 4 \\pmod{77}$<br/>\n          • $5^{13} = 5^8 \\times 5^4 \\times 5^1 \\equiv 4 \\times 9 \\times 5 = 180 \\equiv 26 \\pmod{77}$.<br/>\n          <strong>Ciphertext Output: $C = 26$.</strong><br/><br/>\n          <strong>Decryption of Ciphertext $C = 26$:</strong><br/>\n          $M = C^d \\bmod n = 26^{37} \\bmod 77$.<br/>\n          • $26^1 \\equiv 26 \\pmod{77}$<br/>\n          • $26^2 = 676 \\equiv 60 \\equiv -17 \\pmod{77}$<br/>\n          • Evaluating $26^{37} \\bmod 77$ yields exactly <strong>$M = 5$</strong>.<br/>\n          Plaintext message is successfully recovered!\n        ",
        "level2": "\n          <strong>Forouzan Example 30.8 — Larger Numerical Walkthrough:</strong><br/>\n          • Primes: $p = 397, q = 401$.<br/>\n          • Modulus: $n = 397 \\times 401 = 159,197$.<br/>\n          • Totient: $\\phi(n) = (397 - 1)(401 - 1) = 396 \\times 400 = 158,400$.<br/>\n          • Public Exponent: Choose $e = 343$ (coprime to 158,400).<br/>\n          • Private Exponent: Extended Euclidean algorithm yields $d = 12,007$, because $(343 \\times 12,007) \\bmod 158,400 = 4,118,401 \\bmod 158,400 = 1$.<br/>\n          • Public Key: $\\{343, 159197\\}$, Private Key: $\\{12007, 159197\\}$.\n        ",
        "level3": "\n          <strong>Fast Modular Exponentiation Algorithm (Square-and-Multiply):</strong><br/>\n          Computing $C = M^e \\bmod n$ without expanding astronomical numbers:<br/>\n          Convert exponent $e$ into binary representation: $e = (b_k b_{k-1} \\dots b_0)_2$.<br/>\n          Initialize $result = 1$. For each bit from most-significant to least-significant:<br/>\n          1. $result = (result \\times result) \\bmod n$ &nbsp;&nbsp;(Square)<br/>\n          2. If bit $b_i == 1$: $result = (result \\times M) \\bmod n$ &nbsp;&nbsp;(Multiply)<br/>\n          Time complexity reduces from $O(e)$ multiplications to only $O(\\log_2 e)$ modular multiplications!\n        "
      },
      "advantagesLimitations": "\n        <div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 text-xs\">\n          <div class=\"p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800\">\n            <h4 class=\"font-bold text-emerald-800 dark:text-emerald-300 mb-2\">Advantages</h4>\n            <ul class=\"space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300\">\n              <li>Universal standard supported natively across all operating systems, smartcards, and web browsers.</li>\n              <li>Dual functionality: Supports both high-security public key encryption and digital signatures.</li>\n              <li>Rigorous mathematical scrutiny over 45+ years without structural collapse.</li>\n            </ul>\n          </div>\n          <div class=\"p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800\">\n            <h4 class=\"font-bold text-rose-800 dark:text-rose-300 mb-2\">Operational Limitations</h4>\n            <ul class=\"space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300\">\n              <li>Slow mathematical execution compared to Elliptic Curve Cryptography (ECC) and AES.</li>\n              <li>Large key sizes: NIST deprecates 1024-bit RSA; 2048-bit is current minimum, 4096-bit recommended for long-term security.</li>\n              <li>Quantum vulnerability: Peter Shor's algorithm (1994) factors large composites in polynomial time $O((\\log n)^3)$, meaning sufficiently scaled quantum computers will break RSA completely.</li>\n            </ul>\n          </div>\n        </div>\n      ",
      "whereUsed": [
        "Web Security: RSA-based TLS certificates powering HTTPS encryption worldwide",
        "Email Security: S/MIME and PGP digital signatures and key wrapping",
        "Operating System Code Signing: Microsoft Windows Authenticode signing executable binaries and drivers",
        "Secure Shell: OpenSSH user authentication via <code>~/.ssh/id_rsa</code> and <code>authorized_keys</code>",
        "Banking & Smartcards: EMV chip-and-PIN credit card payment authentication"
      ],
      "commonMistakes": "\n        <ul class=\"space-y-2 text-xs\">\n          <li><strong>Encrypting plaintexts larger than modulus n:</strong> RSA can only encrypt numbers strictly smaller than $n$ ($M < n$). For longer messages, split the data into blocks or use RSA to encrypt a 256-bit AES symmetric key (Hybrid Encryption).</li>\n          <li><strong>Using weak primes (p and q too close):</strong> If $|p - q|$ is small, Fermat's factorization method discovers $p$ and $q$ in seconds. Primes must be chosen randomly with strong separation.</li>\n          <li><strong>Deploying textbook RSA without OAEP padding:</strong> Unpadded RSA is deterministic and allows chosen-ciphertext attacks to decrypt arbitrary messages without the private key.</li>\n        </ul>\n      ",
      "quiz": [
        {
          "question": "In RSA key generation, given primes p = 7 and q = 11, what is the value of Euler's totient function phi(n)?",
          "options": [
            "77",
            "60",
            "18",
            "70"
          ],
          "answer": 1,
          "explanation": "phi(n) = (p - 1)(q - 1) = (7 - 1)(11 - 1) = 6 * 10 = 60."
        },
        {
          "question": "What is the primary mathematical reason why RSA encryption and decryption are computationally secure against eavesdroppers?",
          "options": [
            "Multiplying primes is fast, but factoring large composites back into constituent primes is computationally intractable",
            "Transposition matrix inversion requires exponential memory",
            "DES S-Boxes hide the keys",
            "Public keys expire after 5 minutes"
          ],
          "answer": 0,
          "explanation": "RSA's one-way trapdoor function relies on the integer factorization problem: computing n = p * q is trivial, but finding p and q from a 2048-bit n is practically impossible with classical computers."
        },
        {
          "question": "Why is Optimal Asymmetric Encryption Padding (OAEP) mandated in modern RSA implementations (RFC 8017)?",
          "options": [
            "To speed up integer multiplication",
            "To introduce randomness and non-malleability, preventing chosen-ciphertext and small-exponent attacks",
            "To reduce the key length to 56 bits",
            "To replace modular exponentiation with bitwise XOR"
          ],
          "answer": 1,
          "explanation": "OAEP randomizes plaintexts and applies cryptographic hash masking, ensuring that identical plaintexts yield different ciphertexts and thwarting chosen-ciphertext attacks."
        }
      ],
      "references": [
        {
          "cite": "B.A. Forouzan, Data Communications and Networking (4th Ed.), Chapter 30.4: RSA Cryptosystem (Examples 30.7 & 30.8)",
          "url": ""
        },
        {
          "cite": "RFC 8017: PKCS #1: RSA Cryptography Specifications Version 2.2",
          "url": "https://datatracker.ietf.org/doc/html/rfc8017"
        },
        {
          "cite": "R.L. Rivest, A. Shamir, and L. Adleman, 'A Method for Obtaining Digital Signatures and Public-Key Cryptosystems', Communications of the ACM, 1978",
          "url": "https://people.csail.mit.edu/rivest/Rsapaper.pdf"
        }
      ]
    },
    "prevTopicId": "public-key-algorithms",
    "nextTopicId": null
  }
};
