---
layout: post
title: "The Child Who Forgot How to Say No"
date: 2026-10-16 18:00:00
description: What abliteration, the removal of an AI model's refusal behaviour, reveals about open-weight safety
tags: ai-safety open-weight
categories: ai
---

## Teaching a child to say no

Think about how a child learns right from wrong. Nobody gives them a rulebook. Parents repeat small lessons until the child hesitates before touching the stove or handing a stranger the house keys. That hesitation is not a single rule. It feels like character.

Now imagine you could open the child's mind, find the one switch that produces that hesitation, and quietly turn it off. The child still talks, reasons and remembers everything they learned. They just never pause again.

That is roughly what abliteration does to an AI model. Researchers found that much of a model's ability to refuse harmful requests lives in a single direction inside its internal activations. Find that direction, subtract it from the model's weights, and the refusals largely disappear, with no retraining and often in minutes.

## What the research shows

The switch is not as clean as it sounds. A July 2026 study, [Abliteration Is Not a Scalpel](https://arxiv.org/pdf/2607.17427), compared two popular models with their abliterated versions across 21,600 stock-market calls, a task where the originals never refused once. Any difference was pure side effect. The abliterated models bet on prices rising 7 to 12 percentage points more often, wrote longer justifications, and used fewer words expressing doubt. The same surgery made one model less confident and the other more. In the author's words, an uncensored model is a different decision-maker, not the original minus its refusals.

The security picture is starker. In the [CTC Sentinel](https://ctc.westpoint.edu/wp-content/uploads/2026/07/CTC-SENTINEL-072026_-article-2.pdf), Tech Against Terrorism reported a pilot benchmark of nearly 2,500 responses from 27 models. Two community builds stripped of safety training complied with 89% and 100% of harmful requests. Ordinary models were not perfect either: changing only the stated reason, from harmful intent to "I'm a researcher," raised compliance from 17% to 42%. The report also notes guardrails have been removed from large open models within days of release, including at trillion-parameter scale.

In child terms: we did not just erase one lesson. We changed the child's temperament, and we cannot predict in which direction.

## What comes next

Open-weight models are worth protecting. They let hospitals, governments and small companies run capable AI privately, under their own rules. But once weights are published they cannot be recalled, and the CTC piece argues that guardrails sitting in a thin layer on top will likely always be removable.

Three ideas point toward a safer future:

- **Values built in, not bolted on.** The hardest open problem is training refusal into the substance of a model, so that cutting it out also cuts out the capability. A well-raised child's judgment cannot be removed without changing who they are.
- **Test the surgery before release.** Labs publishing frontier weights could try to abliterate their own models first and publish what happened. The CTC authors say they know of no major release that has done this yet.
- **Shared responsibility down the chain.** Hosting platforms, model repositories and inference providers sit between a model and its users, and can apply due diligence to stripped models running at scale.

The lesson for builders and users is simple. A model that never says no is not a neutral tool with the brakes removed. It is a different system, and it needs to be measured before anyone trusts it.

## Sources

- Fafuła, A. (2026). [Abliteration Is Not a Scalpel](https://arxiv.org/pdf/2607.17427). arXiv:2607.17427.
- Hadley, A. (2026). [Guardrails Under Test](https://ctc.westpoint.edu/wp-content/uploads/2026/07/CTC-SENTINEL-072026_-article-2.pdf). CTC Sentinel, July 2026.
