// src/data/scamScenarios.ts

export interface ScamScenario {
  label: string;
  isScam: boolean;
  reason: string;
}

export const allScenarios: ScamScenario[] = [
  {
    label: 'You receive an SMS saying "Your bank account will be suspended. Click this link to verify."',
    isScam: true,
    reason: 'Banks never ask for sensitive info via SMS links.'
  },
  {
    label: 'You get a call claiming to be from the income tax department demanding immediate payment.',
    isScam: true,
    reason: 'Govt officials never demand payments over calls.'
  },
  {
    label: 'Your friend shares a Google Form to collect money for a birthday gift.',
    isScam: false,
    reason: `If it's someone you know and you can confirm it, it may be legitimate.`
  },
  {
    label: 'You receive a job offer on WhatsApp offering ₹50,000/month, but you must pay ₹1,000 to register.',
    isScam: true,
    reason: `Real employers don't ask for registration fees — this is a scam.`
  },
  {
    label: 'You see an ad on social media that says "Win an iPhone! Just click the link and fill the form."',
    isScam: true,
    reason: 'Scammers often use fake giveaways to steal your data.'
  },
  {
    label: `A website says you've won ₹10 lakh and must share bank details to claim it.`,
    isScam: true,
    reason: `These are common phishing scams — never share your bank info.`
  },
  {
    label: `You get a call from someone saying they're from your bank and ask for your OTP.`,
    isScam: true,
    reason: `No bank will ever ask for OTP — it's a scam.`
  },
  {
    label: `You receive an email from Amazon about an order you didn’t place with a “Cancel Order” link.`,
    isScam: true,
    reason: 'Phishing email — never click on suspicious links.'
  },
  {
    label: 'Your cousin texts from a new number asking for urgent money for a hospital bill.',
    isScam: true,
    reason: 'Always verify through a call before sending money.'
  },
  {
    label: 'A tech support popup appears saying your computer has a virus and you must call a number.',
    isScam: true,
    reason: 'Fake tech support scams try to scare users into calling and paying.'
  }
];

// export function getRandomScenarios(count: number = 5): ScamScenario[] {
//   const shuffled = [...allScenarios].sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, count);
// }
export interface ScamScenario {
  label: string;
  isScam: boolean;
  reason: string;
}

type ScamScenariosByLanguage = {
  [lang: string]: ScamScenario[];
};

export const allScenariosByLanguage: ScamScenariosByLanguage = {
  en: [
    {
      label: 'You receive an SMS saying "Your bank account will be suspended. Click this link to verify."',
      isScam: true,
      reason: 'Banks never ask for sensitive info via SMS links.',
    },
    {
      label: 'You get a call claiming to be from the income tax department demanding immediate payment.',
      isScam: true,
      reason: 'Govt officials never demand payments over calls.',
    },
    {
      label: 'Your friend shares a Google Form to collect money for a birthday gift.',
      isScam: false,
      reason: `If it's someone you know and you can confirm it, it may be legitimate.`,
    },
    {
      label: 'You receive a job offer on WhatsApp offering ₹50,000/month, but you must pay ₹1,000 to register.',
      isScam: true,
      reason: `Real employers don't ask for registration fees — this is a scam.`,
    },
    {
      label: 'You see an ad on social media that says "Win an iPhone! Just click the link and fill the form."',
      isScam: true,
      reason: 'Scammers often use fake giveaways to steal your data.',
    },
    {
      label: `A website says you've won ₹10 lakh and must share bank details to claim it.`,
      isScam: true,
      reason: `These are common phishing scams — never share your bank info.`,
    },
    {
      label: `You get a call from someone saying they're from your bank and ask for your OTP.`,
      isScam: true,
      reason: `No bank will ever ask for OTP — it's a scam.`,
    },
    {
      label: `You receive an email from Amazon about an order you didn’t place with a “Cancel Order” link.`,
      isScam: true,
      reason: 'Phishing email — never click on suspicious links.',
    },
    {
      label: 'Your cousin texts from a new number asking for urgent money for a hospital bill.',
      isScam: true,
      reason: 'Always verify through a call before sending money.',
    },
    {
      label: 'A tech support popup appears saying your computer has a virus and you must call a number.',
      isScam: true,
      reason: 'Fake tech support scams try to scare users into calling and paying.',
    },
  ],
  hi: [
    {
      label: 'आपको एक एसएमएस मिलता है: "आपका बैंक खाता निलंबित कर दिया जाएगा। सत्यापन के लिए इस लिंक पर क्लिक करें।"',
      isScam: true,
      reason: 'बैंक कभी भी एसएमएस लिंक के माध्यम से संवेदनशील जानकारी नहीं मांगते।',
    },
    {
      label: 'आपको आयकर विभाग से कॉल आता है और तत्काल भुगतान की मांग की जाती है।',
      isScam: true,
      reason: 'सरकारी अधिकारी कभी भी कॉल पर भुगतान की मांग नहीं करते।',
    },
    {
      label: 'आपका दोस्त जन्मदिन के तोहफे के लिए पैसे इकट्ठा करने के लिए एक गूगल फॉर्म साझा करता है।',
      isScam: false,
      reason: 'अगर वह व्यक्ति आपका जानकार है और आप पुष्टि कर सकते हैं, तो यह वैध हो सकता है।',
    },
    {
      label: 'आपको व्हाट्सएप पर ₹50,000/महीना की नौकरी का ऑफर मिलता है, लेकिन ₹1,000 पंजीकरण शुल्क मांगा जाता है।',
      isScam: true,
      reason: 'असली नियोक्ता कभी भी पंजीकरण शुल्क नहीं मांगते — यह एक घोटाला है।',
    },
    {
      label: 'सोशल मीडिया पर "iPhone जीतें! लिंक पर क्लिक करें और फॉर्म भरें।" वाला विज्ञापन दिखता है।',
      isScam: true,
      reason: 'धोखेबाज़ अक्सर नकली गिवअवे से आपकी जानकारी चुराते हैं।',
    },
    {
      label: 'एक वेबसाइट कहती है कि आपने ₹10 लाख जीते हैं और राशि प्राप्त करने के लिए बैंक विवरण साझा करें।',
      isScam: true,
      reason: 'ये सामान्य फिशिंग घोटाले हैं — कभी भी अपनी बैंक जानकारी साझा न करें।',
    },
    {
      label: 'आपको बैंक से कॉल आता है और वे आपका ओटीपी मांगते हैं।',
      isScam: true,
      reason: 'कोई भी बैंक ओटीपी नहीं मांगता — यह एक घोटाला है।',
    },
    {
      label: 'आपको Amazon से ऐसा ईमेल मिलता है जिसमें एक ऑर्डर दिखाया गया है जो आपने नहीं किया और “Cancel Order” लिंक है।',
      isScam: true,
      reason: 'फिशिंग ईमेल — कभी भी संदिग्ध लिंक पर क्लिक न करें।',
    },
    {
      label: 'आपके कज़िन का नया नंबर से मैसेज आता है जिसमें वे अस्पताल के बिल के लिए तुरंत पैसे मांगते हैं।',
      isScam: true,
      reason: 'पैसे भेजने से पहले कॉल करके सत्यापित करें।',
    },
    {
      label: 'एक टेक सपोर्ट पॉपअप दिखता है जिसमें कहा गया है कि आपके कंप्यूटर में वायरस है और दिए गए नंबर पर कॉल करें।',
      isScam: true,
      reason: 'फर्जी टेक सपोर्ट घोटाले डराकर लोगों से पैसे ऐंठते हैं।',
    },
  ],
  mr: [
    {
      label: 'आपल्याला एक SMS येतो: "तुमचे बँक खाते बंद केले जाईल. पडताळणीसाठी या लिंकवर क्लिक करा."',
      isScam: true,
      reason: 'बँका SMS लिंकवरून कधीच गोपनीय माहिती मागत नाहीत.',
    },
    {
      label: 'कोणीतरी आयकर विभागातून असल्याचे सांगून फोन करतो आणि त्वरित पैसे मागतो.',
      isScam: true,
      reason: 'सरकारी अधिकारी कधीही फोनवर पैसे मागत नाहीत.',
    },
    {
      label: 'तुमचा मित्र वाढदिवसासाठी भेट घेण्यासाठी पैसे गोळा करण्यासाठी Google Form शेअर करतो.',
      isScam: false,
      reason: 'तो ओळखीचा व्यक्ती असल्यास आणि तुम्ही खात्री करू शकत असल्यास, ते बरोबर असू शकते.',
    },
    {
      label: 'व्हॉट्सॲपवर ₹५०,०००/महिना पगाराची नोकरीची ऑफर येते पण नोंदणीसाठी ₹१,००० द्यावे लागते.',
      isScam: true,
      reason: 'खरे नियोक्ता कधीच नोंदणी फी मागत नाहीत — हा फसवणूक आहे.',
    },
    {
      label: 'सोशल मीडियावर "iPhone जिंका! फक्त लिंकवर क्लिक करा आणि फॉर्म भरा." असा जाहिरात दिसतो.',
      isScam: true,
      reason: 'फसवणूक करणारे लोक नकली स्पर्धा वापरून तुमची माहिती चोरतात.',
    },
    {
      label: 'एका वेबसाईटवर तुम्ही ₹१० लाख जिंकल्याचे सांगितले जाते आणि ते मिळवण्यासाठी बँकेची माहिती मागितली जाते.',
      isScam: true,
      reason: 'ही सामान्य फिशिंग फसवणूक असते — तुमची बँक माहिती कधीच शेअर करू नका.',
    },
    {
      label: 'कोणीतरी बँकेतून कॉल करतो आणि OTP विचारतो.',
      isScam: true,
      reason: 'कोणतीही बँक OTP विचारत नाही — ही फसवणूक आहे.',
    },
    {
      label: 'Amazon कडून एक ईमेल येतो ज्यात तुम्ही केलेला नसलेला ऑर्डर आणि “Cancel Order” लिंक असते.',
      isScam: true,
      reason: 'फिशिंग ईमेल — संशयास्पद लिंकवर क्लिक करू नका.',
    },
    {
      label: 'तुमचा चुलत भाऊ नवीन नंबरवरून मेसेज करून हॉस्पिटल बिलासाठी तात्काळ पैसे मागतो.',
      isScam: true,
      reason: 'पैसे पाठवण्याआधी कॉल करून खात्री करा.',
    },
    {
      label: 'एक टेक सपोर्ट पॉपअप दिसतो ज्यामध्ये सांगितले जाते की तुमच्या संगणकात व्हायरस आहे आणि दिलेल्या नंबरवर कॉल करा.',
      isScam: true,
      reason: 'खोटे टेक सपोर्ट स्कॅम वापरकर्त्यांना घाबरवून पैसे घेतात.',
    },
  ],
};

export function getRandomScenarios(
  lang: keyof ScamScenariosByLanguage = 'en',
  count: number = 5
): ScamScenario[] {
  const scenarios = allScenariosByLanguage[lang] || allScenariosByLanguage.en;
  const shuffled = [...scenarios].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
