---
layout: about
title: about
permalink: /
subtitle:

profile:
  align: right
  image: prof_pic.jpg
  image_circular: false # crops the image to make it circular
  more_info: >
    <p>MEF, TSC, Phnom Penh</p>
    <p>email: ckchhea[at]gmail[dot]com</p>

selected_papers: true # includes a list of papers marked as "selected={true}"
social: false # includes social icons at the bottom of the page

announcements:
  enabled: false # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

Dr. Kimchheang Chhea is an AI Researcher at Techo Startup Center (TSC). He earned his Ph.D. in the AI, IoT, and Big Data from Chung-Ang University, and B. Eng. in Electrical and Electronics from Institute of Technology of Cambodia.
His research focuses on the intersection of wireless communications, network optimization, and artificial intelligence, with particular emphasis on physical layer security, UAV and satellite communications, AI-driven wireless systems, and large language models (LLMs). His work explores intelligent and scalable solutions for next-generation networks/systems by integrating advanced optimization techniques with emerging AI technologies.

Prior to his current role, he worked as an Engineer at FLYNIX in South Korea, and served as a Laboratory Manager and Teaching Assistant in the School of Electrical and Electronics Engineering at Chung-Ang University.

## Explore my research

<div class="research-topics">
  <canvas class="research-particles" aria-hidden="true"></canvas>
  <details name="research-topic">
    <summary>Wireless communications</summary>
    <p>Physical layer security and wireless links for UAV and satellite networks.</p>
  </details>
  <details name="research-topic">
    <summary>Network optimization</summary>
    <p>Optimization techniques for designing intelligent, scalable next-generation networks.</p>
  </details>
  <details name="research-topic">
    <summary>Artificial intelligence</summary>
    <p>AI-driven wireless systems and research on large language models.</p>
  </details>
</div>

<style>
  .research-topics {
    --topic-accent: var(--global-theme-color, currentColor);
    position: relative;
    isolation: isolate;
    overflow: hidden;
    display: grid;
    gap: 0.5rem;
    margin-block: 1rem 2rem;
    padding: 1rem;
    border: 1px solid var(--global-divider-color, currentColor);
    border-radius: 1rem;
  }
  .research-particles {
    position: absolute;
    inset: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    color: var(--topic-accent);
    opacity: 0.5;
    pointer-events: none;
  }
  .research-topics details {
    border: 1px solid var(--global-divider-color, currentColor);
    border-radius: 0.75rem;
  }
  .research-topics summary {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    min-height: 44px;
    padding: 0.65rem 1rem;
    border-radius: inherit;
    cursor: pointer;
    list-style: none;
  }
  .research-topics summary::-webkit-details-marker {
    display: none;
  }
  .research-topics summary::before {
    content: "";
    flex: 0 0 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    background: var(--topic-accent);
  }
  .research-topics summary:hover::before,
  .research-topics summary:focus-visible::before,
  .research-topics details[open] summary::before {
    transform: scale(1.45);
    box-shadow: 0 0 0 2px var(--global-bg-color, Canvas), 0 0 0 3px var(--topic-accent);
  }
  .research-topics summary:focus-visible {
    outline: 2px solid var(--topic-accent);
    outline-offset: 2px;
  }
  .research-topics p {
    margin: 0 1rem 0.85rem 2.4rem;
  }
  @media (prefers-reduced-motion: no-preference) {
    .research-topics summary::before {
      transition: transform 160ms ease, box-shadow 160ms ease;
    }
  }
</style>

<script type="module" src="{{ '/assets/js/research-particles.js' | relative_url }}"></script>
