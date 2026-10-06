/* ────────────────────────────────────────────────────────────
   JOURNEYS — the client's 10 signature tours (supplied 04 Oct 2026).
   When the admin panel exists, replace this array with an API fetch.
   Shared between SignatureJourneys.tsx (full listing) and Tours.tsx
   (homepage preview) — kept out of any 'use client' file so plain
   server components can import it too.
   - images:      reused from /public; images[0] is the card cover
   - highlights:  short list shown on the cards
   - destinations / themes: searchable via the listing's search box
   ──────────────────────────────────────────────────────────── */
export type Journey = {
    slug: string
    no: number
    title: string
    type: string
    cat: string
    duration: string
    themes: string[]
    route: string
    desc: string
    images: string[]
    highlights: string[]
    destinations: string[]
}

export const JOURNEYS: Journey[] = [
    /* ───────── 01 ───────── */
    {
        slug: 'heritage-hill-country-coastal-escape', no: 1,
        title: 'Heritage, Hill Country & Coastal Escape', type: 'Heritage & Coast', cat: 'Heritage',
        duration: '7 Days / 6 Nights',
        themes: ['Heritage', 'Wildlife', 'Tea Country', 'Coast'],
        route: 'Habarana · Sigiriya · Kandy · Nuwara Eliya · Ella · Galle',
        desc: 'A classic first journey — the Cultural Triangle and Minneriya’s elephants, Kandy, the tea country and Ella, finishing on the coast at Galle and Negombo.',
        images: ['/tours/grand-ceylon-2.jpg', '/tours/sacred-triangle-2.jpg', '/tours/wild-ceylon-2.jpg', '/tours/sacred-triangle-4.jpg', '/Destinations/Ella1.jpg', '/tours/grand-ceylon-6.jpg'],
        highlights: ['Sigiriya Rock Fortress & ancient Polonnaruwa', 'Minneriya elephant safari', 'Tea country, Ella & Nine Arches Bridge', 'Galle Fort and the Negombo fish market'],
        destinations: ['Colombo Airport', 'Habarana', 'Sigiriya', 'Polonnaruwa', 'Minneriya', 'Dambulla', 'Kandy', 'Nuwara Eliya', 'Ella', 'Galle', 'Negombo', 'Airport'],
    },

    /* ───────── 02 ───────── */
    {
        slug: 'golden-sands-wildlife-southern-coast-escape', no: 2,
        title: 'Golden Sands, Wildlife & Southern Coast Escape', type: 'Beach & Wildlife', cat: 'Beach',
        duration: '7 Days / 6 Nights',
        themes: ['Beaches', 'Whales', 'Mangroves', 'Colombo'],
        route: 'Bentota · Galle · Weligama · Mirissa · Colombo',
        desc: 'A sun-and-sea week down the west and south coasts — Bentota’s beaches and mangroves, Galle Fort, whale watching from Mirissa and a Colombo city finale.',
        images: ['/mirissa-beach.jpg', '/tours/leopards-coastlines-4.jpg', '/gallery/culture-2.jpg', '/events/whales-south-1.jpg', '/Destinations/Mirissa1.jpg', '/tours/gc1.jpg'],
        highlights: ['Madu River mangrove boat safari', 'Galle Fort & Weligama’s stilt fishermen', 'Whale watching from Mirissa', 'Coconut Tree Hill sunset'],
        destinations: ['Airport', 'Bentota', 'Madu River', 'Ambalangoda', 'Lunuganga', 'Galle', 'Weligama', 'Mirissa', 'Colombo', 'Airport'],
    },

    /* ───────── 03 ───────── */
    {
        slug: 'romantic-sri-lanka-honeymoon-escape', no: 3,
        title: 'Romantic Sri Lanka Honeymoon Escape', type: 'Honeymoon', cat: 'Romance',
        duration: '12 Days / 11 Nights',
        themes: ['Heritage', 'Tea Country', 'Romance', 'Wildlife', 'Beach', 'Snorkelling'],
        route: 'Negombo · Sigiriya · Trincomalee · Nuwara Eliya · Ella · Mirissa',
        desc: 'Culture and adventure first, cool mountain romance in Nuwara Eliya, a scenic night in Ella, then three full nights on the beach in Mirissa.',
        images: ['/tours/honeymoon/honeymoon-hero.jpg', '/tours/honeymoon-grand-2.jpg', '/tours/honeymoon-grand-1.jpg', '/tours/honeymoon/hm.jpg', '/Destinations/Mirissa3.jpg'],
        highlights: ['Pigeon Island snorkelling & diving', 'Scenic hill-country train to Ella', 'Yala safari & three nights in Mirissa', 'Private candlelit beach dinners'],
        destinations: ['Airport', 'Negombo', 'Sigiriya', 'Polonnaruwa', 'Trincomalee', 'Kandy', 'Nuwara Eliya (2 nights)', 'Ella (1 night)', 'Yala', 'Mirissa (3 nights)', 'Galle', 'Airport'],
    },

    /* ───────── 04 ───────── */
    {
        slug: 'wildlife-photography-expedition', no: 4,
        title: 'Sri Lanka Wildlife & Photography Expedition', type: 'Photography Safari', cat: 'Wildlife',
        duration: '10 Days / 9 Nights',
        themes: ['Leopards', 'Elephants', 'Birds', 'Wetlands', 'Wildlife Photography'],
        route: 'Wilpattu · Minneriya · Gal Oya · Yala · Bundala',
        desc: 'A photographer’s expedition — leopards at Wilpattu and Yala, Minneriya’s elephants, boat-based wildlife at Gal Oya and wetland birds at Bundala.',
        images: ['/tours/wildlife/wildlife-hero.jpg', '/tours/leopards-coastlines-1.jpg', '/tours/wild-ceylon-2.jpg', '/tours/wild-ceylon-1.jpg', '/Destinations/Yala3.jpg', '/blog/whales.jpg'],
        highlights: ['Leopard photography in Wilpattu & Yala', 'Gal Oya wildlife boat safari', 'Wetland birds at Bundala', 'Evening photograph review sessions'],
        destinations: ['Airport', 'Negombo', 'Wilpattu (2 nights)', 'Habarana / Minneriya', 'Gal Oya (2 nights)', 'Yala (2 nights)', 'Bundala', 'Mirissa', 'Airport'],
    },

    /* ───────── 05 ───────── */
    {
        slug: 'adventure-sri-lanka', no: 5,
        title: 'Adventure Sri Lanka', type: 'Adventure', cat: 'Adventure',
        duration: '10 Days / 9 Nights',
        themes: ['Rafting', 'Canyoning', 'Ziplining', 'Trekking', 'Cycling', 'Camping', 'Wildlife'],
        route: 'Kitulgala · Ella · Udawalawe · Sinharaja · Colombo',
        desc: 'Rivers, mountains, rainforest and wilderness camping — rafting in Kitulgala, the Flying Ravana zipline, an Udawalawe safari and a Sinharaja rainforest trek.',
        images: ['/tours/adventure/adventure-hero.jpg', '/tours/adventure/ads.jpg', '/tours/hill-country-3.jpg', '/Destinations/Ella2.jpg', '/gallery/wildlife-2.jpg', '/Yala.jpg'],
        highlights: ['White-water rafting & canyoning in Kitulgala', 'Flying Ravana zipline above Ella', 'Wilderness camping near Udawalawe', 'Full-day Sinharaja rainforest trek'],
        destinations: ['Airport', 'Kitulgala (2 nights)', 'Ella (2 nights)', 'Udawalawe (2 nights)', 'Sinharaja (2 nights)', 'Colombo (1 night)', 'Airport'],
    },

    /* ───────── 06 ───────── */
    {
        slug: 'luxury-sri-lanka', no: 6,
        title: 'Luxury Sri Lanka', type: 'Luxury', cat: 'Luxury',
        duration: '11 Days / 10 Nights',
        themes: ['Heritage', 'Boutique Luxury', 'Tea Country', 'Wellness', 'Wildlife', 'Coast'],
        route: 'Negombo · Sigiriya · Kandy · Tea Country · Galle · Colombo',
        desc: 'Slow-paced and experience-led — The Walawwa, Water Garden Sigiriya, The Kandy House, Ceylon Tea Trails and Galle Fort Hotel, with a private chauffeur throughout.',
        images: ['/Destinations/Sigiriya3.jpg', '/tours/grand-ceylon-3.jpg', '/tours/grand-ceylon-4.jpg', '/tours/hill-country-2.jpg', '/tours/intro-galle.jpg'],
        highlights: ['Ceylon Tea Trails bungalow with personal butler', 'The Walawwa, Water Garden Sigiriya & The Kandy House', 'Two nights inside Galle Fort', 'Private chauffeur & guides throughout'],
        destinations: ['Airport', 'Negombo', 'Sigiriya', 'Dambulla', 'Kandy', 'Tea Country (2 nights)', 'Galle (2 nights)', 'Bentota', 'Colombo', 'Airport'],
    },

    /* ───────── 07 ───────── */
    {
        slug: 'ayurveda-yoga-wellness-retreat', no: 7,
        title: 'Sri Lanka Ayurveda, Yoga & Wellness Retreat', type: 'Wellness Retreat', cat: 'Wellness',
        duration: '7 Days / 6 Nights',
        themes: ['Yoga', 'Meditation', 'Ayurveda', 'Vegetarian Wellness', 'Tea Country', 'Beach Relaxation'],
        route: 'Kandy · Nuwara Eliya · Bentota',
        desc: 'Three nights in Kandy and three in Bentota — daily yoga and meditation, a personalised Ayurveda programme and 100% vegetarian cuisine, with sightseeing kept gentle.',
        images: ['/tours/hill-country-1.jpg', '/tours/intro-tea.jpg', '/tours/hill-country-4.jpg', '/gallery/beach-2.jpg', '/gallery/people-1.jpg'],
        highlights: ['Daily yoga, pranayama & meditation', 'Personalised Ayurveda programme in Bentota', 'Nuwara Eliya tea-country wellness day', '100% vegetarian wellness cuisine'],
        destinations: ['Airport', 'Kandy (3 nights)', 'Nuwara Eliya day excursion', 'Bentota (3 nights)', 'Airport'],
    },

    /* ───────── 08 ───────── */
    {
        slug: 'grand-sri-lanka-discovery-tour', no: 8,
        title: 'Grand Sri Lanka Discovery Tour', type: 'Grand Tour', cat: 'Grand Tour',
        duration: '18 Days / 17 Nights',
        themes: ['Culture', 'Beach', 'Mountains', 'Wildlife', 'History', 'Adventure', 'Local Experiences'],
        route: 'Nuwara Eliya · Ella · Batticaloa · Trincomalee · Jaffna · Kandy',
        desc: 'The complete island — tea country and Ella, the wild east around Gal Oya, Batticaloa and Trincomalee, the Tamil north in Jaffna, then Anuradhapura and Kandy.',
        images: ['/Destinations/Ella4.jpg', '/tours/gc4.jpg', '/gallery/beach-1.jpg', '/events/shivaratri-1.jpg', '/tours/leopards-coastlines-2.jpg', '/Destinations/SriDaladaMaligawa1.jpg'],
        highlights: ['Jaffna & the Tamil north', 'Trincomalee, Pigeon Island & Koneswaram', 'Gal Oya boat safari', 'Anuradhapura, Dambulla & Kandy'],
        destinations: ['Airport', 'Negombo', 'Nuwara Eliya', 'Ella', 'Tangalle', 'Ampara', 'Batticaloa', 'Trincomalee', 'Jaffna', 'Anuradhapura', 'Kandy', 'Colombo', 'Airport'],
    },

    /* ───────── 09 ───────── */
    {
        slug: 'short-vacation-sri-lanka', no: 9,
        title: 'Short Vacation Sri Lanka', type: 'Short Break', cat: 'Short Break',
        duration: '3 Days / 2 Nights',
        themes: ['Beach', 'Culture', 'Heritage', 'Village Life', 'Wildlife'],
        route: 'Negombo · Sigiriya · Minneriya · Dambulla',
        desc: '3 days, 1 island, 4 experiences — Negombo’s fishing culture, Sigiriya and village life, then Minneriya’s elephants or the Dambulla cave temples.',
        images: ['/tours/intro-sigiriya.jpg', '/Destinations/Sigiriya2.jpg', '/tours/grand-ceylon-5.jpg', '/tours/sacred-triangle-3.jpg', '/blog/curry.jpg'],
        highlights: ['Sigiriya Rock Fortress climb', 'Village bullock-cart & catamaran ride', 'Minneriya safari or Dambulla Cave Temple', 'Spice garden on the way home'],
        destinations: ['Airport', 'Negombo', 'Sigiriya / Habarana', 'Minneriya / Dambulla', 'Airport'],
    },

    /* ───────── 10 ───────── */
    {
        slug: 'ride-the-nature-of-sri-lanka', no: 10,
        title: 'Ride the Nature of Sri Lanka', type: 'Motorcycle Tour', cat: 'Adventure',
        duration: '10 Days / 9 Nights',
        themes: ['Motorbike', 'Mountains', 'Tea Country', 'Waterfalls', 'Forests', 'Wildlife', 'Beaches', 'Local Life'],
        route: 'Kitulgala · Hatton · Nuwara Eliya · Ella · Udawalawe · South Coast',
        desc: 'A guided group motorcycle expedition — rainforest, waterfall and tea-country roads, the Pekoe Trail and Ella, an Udawalawe safari and a coastal finish.',
        images: ['/Destinations/Ella3.jpg', '/Destinations/Ella5.jpg', '/Destinations/Ella2.jpg', '/gallery/wildlife-2.jpg', '/Destinations/Mirissa2.jpg'],
        highlights: ['Guided group ride through tea country', 'Udaweriya hike & a Pekoe Trail walk', 'Ella zipline, Ella Rock or Little Adam’s Peak', 'Udawalawe safari & a south-coast ride'],
        destinations: ['Airport', 'Kitulgala', 'Lakshapana / Hatton', 'Udaweriya', 'Nuwara Eliya', 'Pekoe Trail', 'Ella', 'Udawalawe', 'South Coast', 'Colombo / Airport'],
    },
]

