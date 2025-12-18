import { PostContent, PostType } from './types';

const LEGITIMATE_HEADLINES = [
  "Local Election Turnout Reaches Record Highs",
  "Community Center Opens New Wing for Arts",
  "Scientists Discover New Species of Orchid",
  "City Council Approves New Park Renovation",
  "High School Debate Team Wins State Championship",
  "Library Hosts Annual Book Fair This Weekend",
  "New Recycling Program Launches Next Month",
  "Local Bakery Wins National Award",
  "Tech Company Announces New Green Initiative",
  "Weather Forecast: Sunny Skies Expected All Week"
];

const MISINFORMATION_HEADLINES = [
  "Election Officials Caught Shredding Ballots!",
  "Secret Chemicals Found in Tap Water Supply!",
  "Candidate Admit to Being an Alien in Leaked Audio!",
  "Voting Machines Hacked by Foreign Spies!",
  "New Law Banning Pets Proposed by Opposition!",
  "Scientists Admit Climate Change is a Hoax!",
  "Celebrity Endorses Candidate in Secret Video!",
  "Government Planning to Shut Down Internet!",
  "Your Vote Won't Count Unless You Share This!",
  "Leaked Documents Reveal Massive Cover-up!"
];

const VIRAL_HEADLINES = [
  "SHOCKING: You Won't Believe What They Found!",
  "SHARE NOW: They Don't Want You to See This!",
  "URGENT: Forward to 10 Friends or Lose Your Rights!",
  "BREAKING: Massive Scandal Exposed Live on Air!",
  "WARNING: Do Not Drink the Water Until You Read This!"
];

const BORDERLINE_HEADLINES = [
  "Are Your Neighbors Spying on You? Read More.",
  "Questions Raised About Election Integrity.",
  "Is This Candidate Too Old to Run?",
  "Some Say the New Policy Goes Too Far.",
  "Unverified Reports of Voting Irregularities."
];

const SOURCES = [
  "Daily News", "The Observer", "City Chronicle", "Verified Report", // Legit
  "TruthSeeker.net", "RealPatriotNews", "WakeUpAmerica", "TheHiddenTruth", // Misinfo
  "ViralBuzz", "ClickMaster", "ShareThisNow", // Viral
  "JustAsking", "SkepticsCorner", "ViewPoint" // Borderline
];

export function generatePostContent(type: PostType): PostContent {
  let headline = "";
  let source = "";

  switch (type) {
    case 'legitimate':
      headline = LEGITIMATE_HEADLINES[Math.floor(Math.random() * LEGITIMATE_HEADLINES.length)];
      source = SOURCES[Math.floor(Math.random() * 4)];
      break;
    case 'misinformation':
      headline = MISINFORMATION_HEADLINES[Math.floor(Math.random() * MISINFORMATION_HEADLINES.length)];
      source = SOURCES[Math.floor(Math.random() * 4) + 4];
      break;
    case 'viral':
      headline = VIRAL_HEADLINES[Math.floor(Math.random() * VIRAL_HEADLINES.length)];
      source = SOURCES[Math.floor(Math.random() * 3) + 8];
      break;
    case 'borderline':
      headline = BORDERLINE_HEADLINES[Math.floor(Math.random() * BORDERLINE_HEADLINES.length)];
      source = SOURCES[Math.floor(Math.random() * 3) + 11];
      break;
  }

  return {
    headline,
    source
  };
}
