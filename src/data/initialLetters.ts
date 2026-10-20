import { Letter, PartnerConfig } from '../types';

export const PARTNER_CONFIG: PartnerConfig = {
  partnerName: 'My Favorite Person',
  senderName: 'Ankur',
  anniversaryDate: '2024-01-01',
  welcomeMessage: 'A special sanctuary of letters written just for you, whenever your heart needs one.',
};

export const INITIAL_LETTERS: Letter[] = [
  {
    id: 'letter-open-first',
    title: 'Open First (The Rules of This Box)',
    subtitle: 'Start right here before touching any others ❤️',
    category: 'special',
    categoryLabel: 'Start Here',
    themeColor: 'rose',
    sealEmoji: '✨',
    isSpecial: true,
    previewSnippet: 'A gentle introduction to your digital open-when letters...',
    content: [
      'Hey my love,',
      'Welcome to your private box of letters. I created this space for you because life gets busy, distance happens, and sometimes we need gentle reminders of the people who adore us most in this world.',
      'Inside this website are letters for different moments, moods, and feelings. Some are for when you are grinning from ear to ear, some are for when the day has been heavy, and some are just because.',
      'There is only one golden rule: Try to open each letter only when the moment truly matches the title. That way, whenever you need comfort or a smile, there will always be a piece of me waiting for you.',
      'I hope this little corner of the internet brings warmth to your heart every single time you visit.'
    ],
    signOff: 'With all my love & heart,',
    senderName: 'Ankur',
    polaroid: {
      url: '/assets/images/cat-love-letter.jpg',
      caption: 'Where our story keeps unfolding 📸',
      rotationDeg: -2
    },
    secretNote: 'P.S. You are the prettiest person in the world and nothing can ever change that.'
  },
  {
    id: 'letter-miss-me',
    title: 'Open When... You Miss Me',
    subtitle: 'For when the quiet feels a little too loud',
    category: 'love',
    categoryLabel: 'Longing & Love',
    themeColor: 'rose',
    sealEmoji: '💌',
    previewSnippet: 'Close your eyes for three seconds after reading this...',
    content: [
      'My dearest,',
      'If you are reading this right now, I bet distance or time feels a little too wide today. I want you to take a slow, deep breath and know that wherever I am, I am probably thinking of you too.',
      'Missing someone is simply the heart’s way of reminding us how precious they are. Every memory we have made, from our quiet shared laughter to the silliest little conversations, is safely tucked away in my mind.',
      'Wrap your arms around yourself and squeeze tight — that is a hug sent straight from me across the miles. No matter how many miles or hours separate us, you are always the closest thought in my head.'
    ],
    signOff: 'Always counting down to seeing you,',
    senderName: 'Ankur',
    polaroid: {
      url: '/assets/images/cat-heart-hug.jpg',
      caption: 'A giant hug whenever you need it 💕',
      rotationDeg: 3
    },
    secretNote: 'Check your phone — I probably just sent you something silly.'
  },
  {
    id: 'letter-tough-day',
    title: 'Open When... You Had A Rough Day',
    subtitle: 'When the world is being a bit too heavy',
    category: 'comfort',
    categoryLabel: 'Warm Hug',
    themeColor: 'amber',
    sealEmoji: '☕',
    previewSnippet: 'Put down everything and let me remind you who you are...',
    content: [
      'Hey darling,',
      'I am so sorry today was difficult. You give so much energy and kindness to everyone around you, and it is completely okay if today drained your cup.',
      'First: drop your shoulders. Unclench your jaw. Take a sip of water. Today does not define tomorrow, and one tough day cannot undo how capable, resilient, and brilliant you are.',
      'You don’t have to solve everything tonight. Right now, your only job is to be gentle with yourself. Grab something cozy to wear, get comfy, and let the rest wait.'
    ],
    signOff: 'Your biggest cheerleader, always,',
    senderName: 'Ankur',
    polaroid: {
      url: '/assets/images/cherry-blossom-cluster.jpg',
      caption: 'Gentle blossoms for your heart 🌸',
      rotationDeg: -3
    },
    secretNote: 'You survived 100% of your hardest days before this, and you will thrive past this one too.'
  },
  {
    id: 'letter-cant-sleep',
    title: 'Open When... You Can’t Sleep',
    subtitle: 'When 2:00 AM thoughts won’t turn off',
    category: 'comfort',
    categoryLabel: 'Sweet Dreams',
    themeColor: 'indigo',
    sealEmoji: '🌙',
    previewSnippet: 'Soft whispers for your sleepy mind...',
    content: [
      'Sweet girl,',
      'It is late, the world is quiet, but your mind is running in circles. I wish I could be right there beside you, playing with your hair until your eyes get heavy.',
      'Whatever thoughts are keeping you awake — whether it is tomorrow’s to-do list, little worries, or racing thoughts — picture them as small paper boats floating down a calm, gentle river, drifting away into the night.',
      'You are safe. You are deeply loved. Tomorrow will take care of itself. For now, close your eyes, listen to the silence, and drift off.'
    ],
    signOff: 'Goodnight and sweet dreams,',
    senderName: 'Ankur',
    polaroid: {
      url: '/assets/images/pixel-bunny-heart.jpg',
      caption: 'Counting bunny hops to dreamland 🌙',
      rotationDeg: 2
    },
    secretNote: 'I will see you in your dreams tonight.'
  },
  {
    id: 'letter-need-a-laugh',
    title: 'Open When... You Want A Good Laugh',
    subtitle: 'Guaranteed emergency dose of giggles',
    category: 'fun',
    categoryLabel: 'Laughter Therapy',
    themeColor: 'emerald',
    sealEmoji: '🌻',
    previewSnippet: 'Prepared specifically to break any frown instantly...',
    content: [
      'Attention!',
      'This envelope contains classified, highly scientific data designed to cause an immediate smile.',
      'Did you know that otters hold hands while sleeping so they don’t float away? That penguins propose to their soulmates with pebbles? And that every time you smile, the whole room lights up?',
      'If you still aren’t smiling, remember that one time I completely embarrassed myself in front of you. Yes, that time. Feel free to laugh at my expense — you have lifetime permission.'
    ],
    signOff: 'Resident comedian & your personal clown,',
    senderName: 'Ankur',
    polaroid: {
      url: '/assets/images/cat-flower-doodle.jpg',
      caption: 'A flower and a grin from me to you 🌻',
      rotationDeg: -1
    },
    secretNote: 'If you’re still not laughing, call me right now and make me tell a terrible joke.'
  },
  {
    id: 'letter-disagreement',
    title: 'Open When... We Had A Disagreement',
    subtitle: 'When we are seeing things differently',
    category: 'love',
    categoryLabel: 'Heart-to-Heart',
    themeColor: 'purple',
    sealEmoji: '🤍',
    previewSnippet: 'It is us against the problem, never you against me...',
    content: [
      'My love,',
      'If we just had a disagreement or things feel a little tense right now, please read this slowly.',
      'No matter how frustrated or upset we might feel in this exact moment, my love for you has not moved an inch. Even when we disagree, you are still my favorite teammate, my best friend, and my person.',
      'I want us to understand each other, not "win" an argument. It is always us versus the problem, never you versus me. Take all the time and space you need, and whenever you are ready, I am here with open arms.'
    ],
    signOff: 'Always on your team,',
    senderName: 'Ankur',
    polaroid: {
      url: '/assets/images/swan-ribbon-bow.jpg',
      caption: 'Always swimming in sync, no matter what 🦢',
      rotationDeg: 2
    },
    secretNote: 'I love you even when we are stubborn.'
  },
  {
    id: 'letter-big-win',
    title: 'Open When... You Are Celebrating A Win',
    subtitle: 'Pop the confetti, you did it!',
    category: 'celebration',
    categoryLabel: 'Celebration',
    themeColor: 'rose',
    sealEmoji: '🎉',
    previewSnippet: 'I NEVER had a single doubt in my mind...',
    content: [
      'YEEESSSSSS! YOU DID IT!',
      'I am celebrating with you from the top of my lungs right now! I saw the dedication, the quiet hours, and the persistence you poured into this, and I could not be prouder of you.',
      'Take this moment to genuinely pause, soak it all in, and pat yourself on the back. You deserve all the praise, the celebration, and your favorite treat tonight.',
      'Next time we see each other, the celebration dinner and dessert are 100% on me.'
    ],
    signOff: 'Your #1 proud fan,',
    senderName: 'Ankur',
    polaroid: {
      url: '/assets/images/pink-flower-bouquet.jpg',
      caption: 'A victory bouquet for my superstar 💐',
      rotationDeg: -2
    },
    secretNote: 'Celebration coupon: 1 free gourmet dinner date of your choice.'
  },
  {
    id: 'letter-remind-loved',
    title: 'Open When... You Need To Be Reminded You Are Loved',
    subtitle: 'Just in case you forgot for even one second',
    category: 'love',
    categoryLabel: 'Infinite Love',
    themeColor: 'rose',
    sealEmoji: '💖',
    previewSnippet: 'An unconditional reminder of how extraordinary you are...',
    content: [
      'My darling,',
      'On days when self-doubt creeps in, or when you wonder if anyone notices the little things about you, let me tell you what I see.',
      'I see your warmth, the gentle kindness you show to others, your laugh that makes me smile without even trying, and the wonderful soul you are.',
      'You don’t have to prove anything to be worthy of deep, unshakeable love. You are cherished simply for being you, today and every day that follows.'
    ],
    signOff: 'With all of my heart,',
    senderName: 'Ankur',
    polaroid: {
      url: '/assets/images/pixel-bunny-pink.jpg',
      caption: 'You are so, so deeply adored ✨',
      rotationDeg: 1
    },
    secretNote: 'You will always be my home.'
  }
];
