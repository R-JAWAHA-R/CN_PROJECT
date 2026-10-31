const fs = require('fs');
let content = fs.readFileSync('js/topics_u2_extended.js', 'utf8');

const target = `    primaryUses: ["Ethernet links, Wi-Fi associations, Point-to-Point serial links, cellular radio links"]
    },
    sections: {`;

const replacement = `    primaryUses: ["Ethernet links, Wi-Fi associations, Point-to-Point serial links, cellular radio links"]
    },
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",
      caption: "Figure: Data Link Layer Design Issues & Frame Encapsulation across Intermediate Network Nodes."
    },
    sections: {`;

if (content.includes('primaryUses: ["Ethernet links, Wi-Fi associations, Point-to-Point serial links, cellular radio links"]')) {
  content = content.replace(
    /primaryUses: \["Ethernet links, Wi-Fi associations, Point-to-Point serial links, cellular radio links"\]\r?\n\s*\},/,
    `primaryUses: ["Ethernet links, Wi-Fi associations, Point-to-Point serial links, cellular radio links"]
    },
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg",
      caption: "Figure: Data Link Layer Design Issues & Frame Encapsulation across Intermediate Network Nodes."
    },`
  );
  fs.writeFileSync('js/topics_u2_extended.js', content, 'utf8');
  console.log("Updated topics_u2_extended.js successfully");
} else {
  console.log("Target not found");
}

