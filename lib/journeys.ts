/* ────────────────────────────────────────────────────────────
   JOURNEYS — added manually for now.
   When the admin panel exists, replace this array with an API fetch.
   Shared between SignatureJourneys.tsx (full listing) and Tours.tsx
   (homepage preview) — kept out of any 'use client' file so plain
   server components can import it too.
   - photo: cover image → put in /public/tours/ and swap the placeholder block for a real image later
   ──────────────────────────────────────────────────────────── */
export type Journey = {
    title: string
    type: string
    cat: string
    duration: string
    price: string
    route: string
    photo: string
    images: string[]
    desc: string
    highlights: string[]
}

export const JOURNEYS: Journey[] = [
    {
        title: 'The Grand Ceylon', type: 'Grand Tour', cat: 'Cultural', duration: '14 Days', price: '$6,400',
        route: 'Colombo · Sigiriya · Kandy · Ella · Yala · Galle', photo: 'sigiriya rock at dawn', images: ['/tours/grand-ceylon-1.jpg','/tours/grand-ceylon-2.jpg','/tours/grand-ceylon-3.jpg','/tours/grand-ceylon-4.jpg','/tours/grand-ceylon-5.jpg','/tours/grand-ceylon-6.jpg'],
        desc: 'The whole island in one unhurried arc — ancient cities, tea country by rail, leopards, and a slow southern coast.',
        highlights: ['Private dawn ascent of Sigiriya', 'Observation-car rail through the highlands', 'Leopard tracking in Yala at first light', 'Fort-side dinner in old Galle'],
    },
    {
        title: 'Hill Country & Tea Trails', type: 'Nature', cat: 'Nature', duration: '9 Days', price: '$3,900',
        route: 'Kandy · Nuwara Eliya · Ella · Haputale', photo: 'tea estate, nuwara eliya', images: ['/tours/hill-country-1.jpg','/tours/hill-country-2.jpg','/tours/hill-country-3.jpg','/tours/hill-country-4.jpg'],
        desc: 'Cloud-wrapped highlands, colonial tea bungalows and the island’s most scenic railway, at a walker’s pace.',
        highlights: ['Stay on a working tea estate', 'Walk the Pekoe Trail above Ella', 'Sunrise at Lipton’s Seat'],
    },
    {
        title: 'Leopards & Coastlines', type: 'Wildlife', cat: 'Wildlife', duration: '11 Days', price: '$4,800',
        route: 'Wilpattu · Anuradhapura · Kalpitiya · South Coast', photo: 'leopard, wilpattu', images: ['/tours/leopards-coastlines-1.jpg','/tours/leopards-coastlines-2.jpg','/tours/leopards-coastlines-3.jpg','/tours/leopards-coastlines-4.jpg'],
        desc: 'A wildlife-forward route pairing the quiet north-west parks with dolphin and whale waters and a barefoot coast.',
        highlights: ['Wilpattu leopards without the crowds', 'Dolphin pods off Kalpitiya', 'Blue-whale watching in season'],
    },
    {
        title: 'Sacred Triangle Odyssey', type: 'Cultural', cat: 'Cultural', duration: '10 Days', price: '$4,200',
        route: 'Anuradhapura · Polonnaruwa · Dambulla · Kandy', photo: 'polonnaruwa buddha', images: ['/tours/sacred-triangle-1.jpg','/tours/sacred-triangle-2.jpg','/tours/sacred-triangle-3.jpg','/tours/sacred-triangle-4.jpg'],
        desc: 'The Cultural Triangle in depth — ruined capitals, cave temples and living ritual, guided by a heritage specialist.',
        highlights: ['Private Anuradhapura at dusk', 'Dambulla cave temples', 'Evening puja at the Temple of the Tooth'],
    },
    {
        title: 'Ceylon Honeymoon Grand', type: 'Romance', cat: 'Romance', duration: '12 Days', price: '$5,600',
        route: 'Cultural Triangle · Ella · Yala · Tangalle', photo: 'infinity pool, southern coast', images: ['/tours/honeymoon-grand-1.jpg','/tours/honeymoon-grand-2.jpg','/tours/honeymoon-grand-3.jpg','/tours/honeymoon-grand-4.jpg'],
        desc: 'An intimate, softly-paced route with private dinners, spa afternoons and the island’s most romantic stays.',
        highlights: ['Candle-lit dinner among the ruins', 'Private tea-country picnic', 'Beachfront villa on the deep south'],
    },
    {
        title: 'Wild Ceylon Explorer', type: 'Wildlife', cat: 'Wildlife', duration: '13 Days', price: '$5,900',
        route: 'Wilpattu · Minneriya · Udawalawe · Yala', photo: 'elephant gathering, minneriya', images: ['/tours/wild-ceylon-1.jpg','/tours/wild-ceylon-2.jpg','/tours/wild-ceylon-3.jpg','/tours/wild-ceylon-4.jpg'],
        desc: 'Four parks, one continuous story — from the great elephant gathering to leopards, sloth bears and pelagic giants.',
        highlights: ['The Gathering at Minneriya', 'Elephants of Udawalawe', 'Two dawn drives in Yala Block 1'],
    },
]
