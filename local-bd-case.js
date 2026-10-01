(() => {
  const nodes = [...document.querySelectorAll('[data-copy]')];
  const zh = Object.fromEntries(nodes.map(node => [node.dataset.copy, node.textContent]));
  const en = {
    skip: 'Skip to case content', back: '← Back to selected work',
    eyebrow: 'LOCAL MERCHANT DEVELOPMENT',
    title: 'Proactively finding clients. Building real partnerships.',
    meta: 'Nov 2024–Jan 2025 | Entrepreneurial Practice · Merchant Development & Sales',
    lead: 'I worked with classmates who had obtained service agency qualifications on a livestream promotion service for local merchants in Zhengzhou. I independently searched for prospects, established contact through phone calls, WeChat and store visits, and advanced service demonstrations, partnership discussions and contract signing, while also supporting after-sales follow-up. The Xinjiang specialty store at Bairong Trade City below illustrates the process from prospecting to a signed partnership and a revised market assessment.',
    workflow: 'How I developed merchant relationships',
    step1: 'Find merchants',
    step1body: 'Used maps and Douyin to find stores, understand their product categories and promotional activity, and collect publicly available contact details.',
    tag11: 'Map searches', tag12: 'Nearby leads on Douyin',
    step2: 'Establish contact',
    step2body: 'Introduced myself and started with store-visit promotions familiar to the owners. Explained the simple equipment requirements and lower cost, connected on WeChat, and arranged a free on-site demonstration.',
    tag21: 'Merchant needs / Phone outreach', tag22: 'WeChat follow-up',
    step3: 'Demonstrate and discuss',
    step3body: 'Demonstrated the service using products in the store, shared case materials supplied by the service provider, and explained pricing, formal contracts and after-sales support to move discussions forward.',
    tag31: 'Free demonstrations', tag32: 'Partnership discussions',
    step4: 'Follow up after signing',
    step4body: 'Coordinated usage issues through service groups after signing. Arranged visits when remote support was insufficient, stayed in touch, and sought referrals.',
    tag41: 'Remote support', tag42: 'On-site assistance',
    review: 'Bairong Trade City · Xinjiang Specialty Store',
    reviewSubtitle: 'One signed partnership. One revised market assumption.',
    initial: 'Initial view',
    initialBody: 'The concentration of stores made in-person visits convenient, so we chose this area as a priority for finding merchants who needed online promotion.',
    reality: 'What happened',
    realityBody: 'Outreach revealed that many wholesalers relied on regular customers and had limited interest in promotion. In this Bairong case, three merchants accepted on-site demonstrations. Among them, the Xinjiang specialty store owner had a clear interest in promotion and ultimately signed after a live demonstration and an explanation of the service.',
    learning: 'What I learned',
    learningBody: 'A concentration of merchants does not mean a concentration of demand. Screening should focus on customer sources, willingness to promote, and fit with the service.',
    reviewNote: 'After reviewing the sales cycle, customer fit and observed platform limitations, the team later stopped further expansion.',
    records: 'Project records (Images posted by the original real accounts)',
    record2Caption: 'Merchant service group communications',
    record3Caption: 'Promotional posts on WeChat Moments',
    record4Caption: 'Livestream dashboard screenshot from project materials',
    record5Caption: 'Project records on WeChat Moments',
    providerCaption: 'Provider case materials used in discussions',
    providerNote: 'Supplied by the service provider to introduce its background.',
    lessons: 'Six key factors in building partnerships',
    lesson1: 'Start with topics owners know',
    lesson1body: 'Most owners had heard of store-visit promotions, influencer marketing and outsourced account management. We used these familiar topics to start conversations and explain the livestream service’s advantages in cost, equipment and ease of use.',
    lesson2: 'Simple equipment, lower initial investment',
    lesson2body: 'Merchants could use their existing phone with a stand, reducing additional equipment investment and the staffing needed to appear on camera continuously. Using actual quotes, we explained the cost advantage compared with other promotional options they were considering.',
    lesson3: 'A free visit before deciding',
    lesson3body: 'During initial outreach, we offered a free on-site demonstration and a short trial. There was no visit charge even if no partnership followed, so owners could understand the operation and use of the service before deciding.',
    lesson4: 'Show how it works in their store',
    lesson4body: 'We demonstrated the livestream software and prepared presentation content using the store’s products, setting and communication needs, helping owners see how they would use the service and answering operational questions on site.',
    lesson5: 'Build trust with case materials and contracts',
    lesson5body: 'We shared merchant and brand case materials supplied by the service provider to introduce its background. We also explained formal contracts, what was included in the purchase and subsequent support, so owners understood the arrangements.',
    lesson6: 'Keep support and follow-up available',
    lesson6body: 'After signing, we created merchant service groups with sales, copywriting, technical and operations staff providing support together. Issues were addressed remotely first, with visits arranged when needed, easing concerns about ongoing use.',
    results: 'Practical results',
    result1value: '5 merchants', result1: 'My total signed merchants',
    result1body: 'Advanced partnerships through independent prospecting, demonstrations, discussions and sustained follow-up.',
    result2value: 'About 3 months', result2: 'Project duration',
    result2body: 'Used time outside classes for prospecting, partnership discussions and after-sales coordination.',
    result3value: '3 demos → 1 signed', result3: 'Bairong Trade City case',
    result3body: 'Used real discussions to refine my assessment of target merchants.',
    resultsNote: 'The one merchant signed in the Bairong case is included in my total of five.',
    pricing: 'Package quotes: ¥1,980 / ¥2,580 / ¥3,080',
    service: 'Service scope: livestream software use, presentation content configuration and after-sales support.',
    outlook: 'This practice gave me experience in finding prospects independently, communicating directly with business owners, explaining services on site and following up consistently. It also taught me to adjust prospect screening based on actual feedback, providing a foundation for further learning in overseas customer development.'
  };
  function setCaseLanguage(language) {
    const lang = language === 'en' ? 'en' : 'zh';
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
    nodes.forEach(node => { node.textContent = (lang === 'en' ? en : zh)[node.dataset.copy]; });
    document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
    document.title = lang === 'en' ? 'Local Merchant Development — JING HANBO' : '本地生活商户开发 — JING HANBO';
    document.querySelector('meta[name="description"]').content = lang === 'en' ? 'Jing Hanbo’s local merchant development practice in Zhengzhou: prospect screening, outreach, on-site demonstrations, partnership development and follow-up.' : '荆涵博的郑州本地生活商户开发实践：客户筛选、主动触达、到店演示、合作推进与售后跟进。';
    try { localStorage.setItem('portfolio-language', lang); } catch { /* Language buttons also work without storage. */ }
  }
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setCaseLanguage(button.dataset.lang)));
  let initial = 'zh';
  try { initial = localStorage.getItem('portfolio-language') || 'zh'; } catch {}
  setCaseLanguage(initial);
})();
