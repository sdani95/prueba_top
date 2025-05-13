export type TopTenItem = {
    name: string;
    hint?: string;
  };
  
  export type TopTenCategory = {
    id: string;
    title: string;
    description: string;
    items: TopTenItem[];
  };
  
  // Collection of predefined Top 10 lists
  export const CATEGORIES: TopTenCategory[] = [
    {
      id: "movies-2023",
      title: "Highest Grossing Movies of 2023",
      description: "Can you name the top 10 highest-grossing films released in 2023?",
      items: [
        { name: "Barbie", hint: "Plastic fantastic" },
        { name: "The Super Mario Bros. Movie", hint: "Plumbers and princesses" },
        { name: "Oppenheimer", hint: "Atomic scientist biopic" },
        { name: "Spider-Man: Across the Spider-Verse", hint: "Animated multiverse adventure" },
        { name: "Guardians of the Galaxy Vol. 3", hint: "Marvel space misfits" },
        { name: "Fast X", hint: "10th in a racing franchise" },
        { name: "The Little Mermaid", hint: "Disney live-action remake" },
        { name: "Mission: Impossible – Dead Reckoning Part One", hint: "Tom Cruise action sequel" },
        { name: "Ant-Man and the Wasp: Quantumania", hint: "Tiny Marvel heroes" },
        { name: "John Wick: Chapter 4", hint: "Legendary hitman" },
      ]
    },
    {
      id: "countries-population",
      title: "Most Populous Countries",
      description: "Can you name the 10 most populous countries in the world?",
      items: [
        { name: "China", hint: "East Asian country with the Great Wall" },
        { name: "India", hint: "South Asian country with the Taj Mahal" },
        { name: "United States", hint: "North American country with the Statue of Liberty" },
        { name: "Indonesia", hint: "Southeast Asian archipelago" },
        { name: "Pakistan", hint: "South Asian country bordering India" },
        { name: "Nigeria", hint: "Most populous African country" },
        { name: "Brazil", hint: "Largest South American country" },
        { name: "Bangladesh", hint: "South Asian country east of India" },
        { name: "Russia", hint: "Largest country by area" },
        { name: "Mexico", hint: "North American country south of the US" },
      ]
    },
    {
      id: "apps-downloads",
      title: "Most Downloaded Mobile Apps",
      description: "Can you name the 10 most downloaded mobile apps worldwide?",
      items: [
        { name: "TikTok", hint: "Short-form video platform" },
        { name: "Instagram", hint: "Photo and video sharing" },
        { name: "Facebook", hint: "Social network with blue logo" },
        { name: "WhatsApp", hint: "Messaging app owned by Meta" },
        { name: "Telegram", hint: "Cloud-based messaging app" },
        { name: "Snapchat", hint: "Disappearing messages and stories" },
        { name: "Spotify", hint: "Music streaming service" },
        { name: "Netflix", hint: "Video streaming platform" },
        { name: "Zoom", hint: "Video conferencing app" },
        { name: "YouTube", hint: "Video sharing platform" },
      ]
    }
  ];
  
  // Function to get a category by date (one category per day)
  export const getCategoryForDate = (date: Date = new Date()): TopTenCategory => {
    // Format date as YYYY-MM-DD to ensure consistent results for the same day
    const dateString = date.toISOString().split("T")[0];
    
    // Use the date string to determine which category to show
    // This ensures the same category is shown for all users on the same day
    const dateHash = dateString.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const categoryIndex = dateHash % CATEGORIES.length;
    
    return CATEGORIES[categoryIndex];
  };