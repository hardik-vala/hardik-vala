---
layout: post
title: A look at the data behind my cofounder search 👀
draft: true
---

## Intro

As a follow-up to my last piece, a [retrospective](https://hardikvala.com/2024/10/22/still-lost-one-year-after-my-startup-failed.html) on the most recent chapter of my founder journey, I'm looking back at my failed attempts in recruiting a cofounder. Not for lack of intentionality or trying. I've done a lot of co-founder "dating" over the last year, applying rigor in strategy and tactics. So much so, I have a an embarrasingly detailed CRM for tracking purposes, rich with interactions. The effort I put into the search fluctuated over the year, and spiked during months where I committed to doing it intensely. Despite the investment so far, I haven't found the right match yet. To improve my odds, I've done some quick-and-dirty data mining over my CRM to tease out usable insights to inform my search process.

## Methods

I'm not going to enumerate my recruiting strategy in detail (once I've landed on an approach that works, I'll release it as a guide), but here are some key elements you need to grasp in order to contextualize the lessons.

### Ideal Cofounder Profile

These are the essential traits I'm looking for in a cofounder -- Traits I use to filter prospects:

* Already a full-time founder or ready to make the leap within the next 3 months (not conditioned on a raise).
* Prefers in-person collaborating and is located in San Francisco, or can move to San Francisco within the next 3 months.
* Interested in exploring domains where I have pre-existing knowledge, or can attain it quickly (~3 months).
* We’re both pre-idea, looking for early co-founders.

While not a hard prerequisite, I have a borderline requirement for someone technical. There's a series of other preferences as well but they're not germane to this analysis. 

### Funnel

After I source my candidates, I run each cofounder prospect through my dating funnel consisting of the following stages:

1. Screening (~30 min. meeting): This is my quick way of judging whether there's mutual vibes and we fit each other's cofounder profile. If I don't detect any red flags, I proceed to the next stage.
2. Deep-Dive (2-3 meetings): This gives us a chance to go deep on background, founder motivations, domains of interest, working style, etc. It's also an opportunity to complete one of the many [co-founder questionnaires](https://hardikvala.com/2024/08/23/hardiks-responses-to-the-yc-cofounder-questionnaire.html) out there and review each other's responses. If don't uncover any obvious incompatibilities, I move to the next stage.
3. Trial (1 week - 1 month): This is meant to be a simulation of a cofoundership. We choose to work together on some self-contained project with a clearly-defined target (eg. get feedback on a prototype from X users). You get so much more data on the person and their work style this way, and either party can terminate the simulation at any point. I've also used this time to do a reference check on the other person.

If we survive these stages, then the next step is to commit and establish a more formal collaboration.

### CRM Stats

In total, my CRM has a whopping 215 entries. That's 215 unique propsects that I interacted with. This includes a combination of candidates that reached out to me (21%), plus candidates I reached to (79%). 

I filled my CRM with leads from 5 different sources:
* The [YC co-founder matching platform](https://www.startupschool.org/cofounder-matching): The equivalent of a dating app, but for co-founders.
* LinkedIn: Cold connecting and messaging founders who list 'Stealth Startup' (or something similar) as their current company.
* Personal network: This includes people I know directly and people in my extended network.
* AI Tinkerers: A community of AI builders.
* Xooglers: Community of ex-Googlers.

<div style="text-align: center">
  <img src="/assets/images/cofounder_lead_sources_chart.png" alt="Pie chart of co-founder lead sources">
</div>

## Insights

### 1) How many prospects?

In modern Western society, the first question you ask yourself when dating intentionally (I'm talking romantically), *how many dates should I expect to go on before meeting the "one"?* The co-founder dating world has a similar parallel. You want to know how many prospects you should expect to review before finding someone who's an excellent match. Although my co-founder search is ongoing and I expect this number to vary greatly across founders -- depending on factors like your ICP and personal values -- I'll share some guiding data points.

We can back into an approximate answer by looking at the funnel conversion rates.

<div style="text-align: center">
  <img src="/assets/images/cofounder_funnel_conversions_chart.png" alt="Co-founder funnel chart of conversions">
</div>

The chart shows rates calculated against the total quantity of candidates (eg. I had screening calls with 43.26% of the 215 candidates I considered). So roughly 2% of leads made it to the trial phase, or about 1 in 100. This is consistent with the numbers a fellow founder observed during his cofounder search, where it took him roughly 100 candidates to home in on a cofounder.

All this implies, you can expect to run through ~100 candidates to find one that's worthy of a co-founder trial.

Before moving on, a key observation: The bottom-of-funnel conversions differ widely across the different lead sources.

<div style="text-align: center">
  <img src="/assets/images/cofounder_funnel_conversions_by_source_chart.png" alt="Co-founder bottom-of-funnel chart of conversions, broken apart by source">
</div>

You can see that on one end, LinkedIn percipitated a total of 0 trial candidates, and on the other end, my personal network yielded a high percentage of trial candidates. That said, varied recruiting channels adds a great deal of nuance to this question.

### 2) Where should I look for a cofounder?

Referencing the last chart, its obvious that where you hunt matters. Channels like LinkedIn, which give you access to a large cascade of potential recruits, also exposes you to a lot of noisy candidates. I don't just mean mediocre. I also mean low-intent. If you don't know the person beforehand, there's nothing on their LinkedIn profile that signals whether they're looking for a co-founder (unless they explicitly advertise it). I was DM'ing anybody who mentioned they were a founder of a stealth startup (or something akin to that) and discovered that most weren't looking for a cofounder. Contrast that with YC's co-founder platform: Even though you have access to a comparatively smaller pool (but still numbering in the 1000's), each match is almost guaranteed to be actively looking for a partner. In hindsight, my lack of success on LinkedIn was predicted by the tactic I deployed, but I'm glad it was empirically verified. Nevertheless, the key insight is you want to fish where you're chances of making quality catches is high, but you also want to fish where the catch...err...wants to be caught (to stretch the metaphor).

Another a priori belief confirmed by the data: My personal network offered the best denisty of quality, high-confidence candidates. This is not suruprising. Although, I might've been bias. I could see myself being less scrutinizing and too trusting of these candidates because they came with social proof.

### 3) Why doesn't it work out?

When an engagement with a potential recruit ends, I did my best to record the reason.

<div style="text-align: center">
  <img src="/assets/images/cofounder_termination_reasons_chart.png" alt="Pie chart of co-founder termination reasons.">
</div>

Disclaimer: Take the results here with more than your usual grain of salt. The rationale I would log for each candidate consisted of only a single reason, when multiple reasons may have applied. And when I was the one being rejected, I can't guarantee the honesty behind the reasons the other person reported. 

Now, whether it was me initiating the breakup, or the other party, the proportions in the pie chart don't change by much. The top reasons were consistent:

1. Interest Mismatch: Misalignment in the industries or markets we wanted to explore.
2. No Chemistry: This is my "other" category. When it simply didn't click on a personal level -- because of conflicting communication styles, different energy levels, or just a general lack of rapport -- I would use this as the justification.
3. Inexperienced: Aside from technical or business aptitude, being a founder is its own skill. A skill you acquire from experience. I dismissed candidates that seemingly lacked these founder skills, while also being too rigid in their disposition towards startups to pick them up quickly.
4. Too Baked: These were people who were super high when I met them--No, I'm kidding. These were candidates that already committed too deeply to a specific idea or direction, and made significant progress.

Apart from the last justification, these categories are...pretty squishy. They're based on subjective judgements. It's made me question whether I've been inflexible with my interests, or too harsh in disqualifying people because they seemed to lack experience or because we didn't have immediate chemistry...

I also wanted to overlay these reasons across the stages of my funnel. 

<div style="text-align: center">
  <img src="/assets/images/cofounder_termination_reasons_by_stage_chart.png" alt="Stacked bar chart of co-founder termination reasons, broken down by stage.">
</div>

You'll have to stare at this plot for a while before you can parse it, but here's the key takeaway: There were candidates dropping out of my pipeline at later, and costlier, stages, ie. Deep-Dive and Trial. I could've weeded them out earlier. For instance, if someone's employed and committed to that path, or if someone is hedging their exploration of entrepreneurship by seeking out job opportunities, my qualification process should've been able to discover that earlier.

### 4) No means not now, not never

One of the more surprising, and encouraging, insights from my prolongued search was finding highly-compatible candidates that simply couldn't join me because the timing wasn't right. Whether they're facing an immigration barrier or simply needed more time to do some soul searching, I've built a bench of people (14) who maybe ready to make the founder leap once their situation changes. For these candidates, I intend to keep the door open and maintain light contact.

## What's Next

Looking ahead, I'm planning to update my cofounder search strategy in several ways:

* Double-down on markets with "high-intent" leads.
* Revisit my methods for vetting active candidates, loosening my constraints on eg. mutual interest and entrepreneurial experience, and more aggressively sniffing out deal-breakers.
* Nurture relationships with the promising candidates who weren't ready to commit due to timing.
* Visit other watering holes where I can connect with potential candidates, like emerging co-founder platforms, targeted networking events, and hackathons. 
* Reducing trial times. The fear of a large sunk cost is something I can feel inhibits me in advancing some candidates. I believe I can neutralize some of that concern by structuring shorter dry-runs. 

## Conclusion

The search continues. I remain more optimistic than ever.

If you're looking for a cofounder and you think you align with my ICP, DM me on [LinkedIn](https://linkedin.com/in/thehardikv/).
