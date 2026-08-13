# Bend Home Resources — Site Architecture

## Core principle

Build a small number of strong topical hubs with tightly related supporting pages. Keep one primary URL per search intent and use internal links to connect the buyer journey instead of creating near-duplicate keyword variations.

## Current launch architecture

```text
/
├── buying/
│   ├── first-time-home-buyers/
│   ├── home-buying-process/
│   ├── getting-pre-approved/
│   ├── making-an-offer/
│   ├── seller-disclosures/
│   ├── home-inspections/
│   ├── closing-costs/
│   └── final-walkthrough/
│
├── professionals/
│   ├── realtors/
│   ├── home-inspectors/
│   ├── general-contractors/
│   ├── mortgage-lenders/
│   ├── roofers/
│   └── plumbers/
│
├── costs/
│   ├── roof-replacement/
│   ├── gutters/
│   └── water-damage-repair/
│
├── neighborhoods/
│   ├── northwest-crossing/
│   ├── river-west/
│   └── summit-west/
│
├── homeownership/
│   ├── maintenance-calendar/
│   ├── winterization/
│   ├── wildfire-defensible-space/
│   └── drainage/
│
├── tools/
│   ├── home-buying-checklist/
│   ├── home-inspection-checklist/
│   └── contractor-bid-comparison/
│
├── about/
├── editorial-standards/
├── disclaimer/
└── privacy/
```

## 6–12 month target

### Buying
Add roughly 12–20 more pages around appraisal, title, escrow, insurance, sewer scopes, mold/moisture, HOA review, older homes, new construction, down payments, earnest money and specialized due diligence.

### Professionals
Expand toward 20–25 useful professional categories: electricians, HVAC, sewer-scope providers, mold specialists, structural engineers, gutter installers, siding contractors, painters, flooring, landscapers, handymen, movers, insurance agents and title/escrow companies.

### Costs
Build 15–25 project pages, but only add specific Bend pricing when there is a defensible data source or original quote dataset. Priority projects: HVAC, exterior paint, siding, deck replacement, electrical panel, plumbing, sewer line, flooring, fencing, landscaping, kitchen and bathroom work.

### Neighborhoods
Build 12–20 buyer-focused pages. Each should stay about buying/owning a home, not become a tourism guide. Research the exact neighborhood district, property records, housing patterns, HOA context where applicable, maintenance considerations, traffic/access and wildfire/insurance questions.

### Homeownership
Expand seasonal maintenance, irrigation, sprinkler blowout, roof maintenance, HVAC, decks, exterior paint, snow/ice, landscaping, insurance and home records.

### Tools & original data
Prioritize assets that are hard to copy:

- Bend home repair-cost database
- Local quote tracker
- Contractor-bid comparison worksheet
- Homeownership cost calculator
- Closing-cost planning tool
- Inspection finding prioritizer
- Monthly/seasonal maintenance checklist
- Annual Bend homeowner survey or original data report

## Internal linking model

Example cluster:

`/buying/home-inspections/`
→ `/professionals/home-inspectors/`
→ `/costs/water-damage-repair/`
→ `/professionals/general-contractors/`
→ `/tools/contractor-bid-comparison/`
→ `/homeownership/drainage/`

The goal is to answer the next natural question rather than force a visitor back to search.

## URL rules

- Keep URLs short and descriptive.
- Do not repeat `bend-oregon` in every slug; the page title, copy, site brand and context establish locality.
- Keep established URLs stable once indexed.
- Avoid multiple pages for synonymous intents such as `/roofers/`, `/roofing-companies/` and `/roofing-contractors/` unless research shows genuinely different user needs.
- Use redirects when consolidating or changing an established URL.
