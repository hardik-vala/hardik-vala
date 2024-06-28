---
layout: post
title: Can any company become a unicorn? 🦄
draft: true
---

I find myself constantly mulling over this question. It's impossible to prove or disprove but it does have subtle implications on how you steer a business. And for those who are wandering space-time for a high-conviction startup idea, it does affect how selective you are. Since this problem can't be subject to scientific methods, the best I can do is understand it within a reasonably good mental framework--with the aid of some fuzzy logic--and see if that is, at least, directionally consistent with the truth.

## Framework

### Idea maze

The "idea maze" is a good starting point to build a conceptual framework. It's an analogy used to describe the complex, multi-year journey a business takes from initial idea to success. The journey is anything but straightforward, and just like a path through a maze, there are a series of twists and turns, some driven by proactive decisions and some by environmental forces. Most of the time, we only see the major turning points in the path taken by one company. We don’t see the paths not taken by that company, and certainly don’t think much about all the dead companies that hit deadends and couldn't survive long enough to make it to the other side of the maze. Here's a sample maze that depicts the journeys many different companies took--some towards death and others to glory--in the Internet music/movie industry:

![Idea maze example.](/assets/images/idea_maze_example.png)

([source](https://spark-public.s3.amazonaws.com/startup/lecture_slides/lecture5-market-wireframing-design.pdf))

A common misconception is that entrepreneurs enter the maze in search of an original and viable idea, and leave the maze once it's found (you might've heard remarks like, "I'm still stuck in the idea maze" from aspiring founders). But idea discovery is just the tip of the iceberg. The maze encompasses the entire lifecycle (I would argue), from seedling to mighty oak (or early death in most cases). You're always faced with decision forks, and there's always a chance you can take a wrong turn, whether at the larval stages, during a growth spurt, or following full maturity (eg. Kodak failing to pounce on the rise of digital cameras).

### Idea state machine

Instead of representing the complex decision tree defining the life of a company as a maze, let's consider a state machine, with states and transitions. I prefer casting to a state machine for a couple of reasons:
1. Where a maze is just a planar graph (ie. can be drawn on a 2D plane without criss-crossing edges), generalizing beyond a plane lets us model the extraordinary, but closer-to-reality, level of connectivity between decision points and the many alternatives.
2. A state machine is a formal model, amenable to many computer science concepts (some of which I will make reference to), unlike mazes, which don't have a technical equivalent.
But when it's convenient, I'll refer back to the maze, because it's easier to visualize in your head. 

So what do the states signify? A "state" represents the business as a snapshot in time, just prior to a decision point. More discretely, you can think of "state" as the company's balance sheet, including an accounting of the assets, liabilities, cap table, etc. Lets use $$S$$ to denote the space of all possible states. And a decision point marks a point where the company is at a crossroads, deciding whether to open source their IP or remain closed source, or open a new brick-and-mortar store in a new region, or partner with an enterprise for distribution, etc. By enacting a decision, the business transitions between states, not all of which are possible. So the transition function maps a state to a probability distribution over states, or $$S \rightarrow \mathcal{P}(S)$$ (we're allowing non-deterministic transitions, because hey, the world of entrepreneurship is flush with randomness). The ability for a company to make a transition depends on an assortment of factors, which we'll detail next.

### Agent

As the business traverses from state-to-state, let's model it as an agent. Much like an agent in a reinforcement learning scenario: It's a decision-maker in an environment (the state space) where it chooses between actions (possible transitions), each producing a reward or penalty, in order to maximize cumulative rewards. The specifics of reinforcement learning aren't important here, except that each transition yields a reward in the form of positive profit or incurs a penalty in the form of monetary loss.

So if there's no guarantee an agent can make a leap from one state to another, what impacts the likelihood? Lets define the likelihood as follows,

$$p(s', r | s, \alpha, \delta, \sigma)$$

Where,

* $$s'$$ is the destination state.
* $$r$$ is the expected reward (or loss).
* $$s$$ is the current state.
* $$\alpha$$ is the business' effectiveness of execution. 
* $$\delta$$ is the ability to raise fresh capital.
* $$\sigma$$ is the current income. If the business is in the black, then it's the company's profits, and if the business is in the red, then it's the burn rate.

There's alot packed into $$\alpha$$. It includes measures of the team's creativity and resourcefulness, organizational culture, mastery over the [OODA](https://en.wikipedia.org/wiki/OODA_loop) loop, etc. This metric fluctuates over time and can decrease as well, especially as the organization grows. Over time, a company can build-up cultural "diseconomies of scale" that arise from tensions between investments into existing products and revenue streams vs. developing new ones.

#### Decision-making

When considering which state should come next, an agent doesn't only consider the likelihood of succeeding in the transition to the next state, but gives some non-zero coefficient to the potential rewards aggregated over all future possible paths, as defined by this equation:

$$Q(s', s) = p(s', r | s, \alpha, \delta, \sigma)(r + \gamma \sum_{s''}Q(s'', s'))$$

Where,

* $$\gamma$$ is some discount factor on the weight of future rewards.
* $$s''$$ represents a state two hops away from $$s$$ in the state network.

(If you're familiar with reinforcement learning, this bears a close resemblance to the Q-value function.)
