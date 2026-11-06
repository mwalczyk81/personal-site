import type { WritingPost } from '../types'

// Case study copy. Keep to facts that are true; do not add numbers or details that were not supplied.
const writing: WritingPost[] = [
  {
    slug: 'shared-library-memory-leak',
    title: 'Finding a memory leak in a shared library',
    summary:
      'Accounts service pods kept getting OOMKilled. Two weeks of theories got me nowhere. One heap dump found the leak in a shared OData library.',
    sections: [
      {
        heading: 'The situation',
        paragraphs: [
          "The accounts service is a C#/.NET service on AKS. It serves a Cosmos DB-backed API. Around April 15, 2026, its pods started getting OOMKilled. Exit code 137.",
          'Under normal traffic, a pod restarted about every 24 hours. Under burst traffic from migration syncs, it restarted within hours.',
        ],
      },
      {
        heading: 'What I saw',
        paragraphs: [
          'My first theory was allocation pressure under high concurrency. I had reasons for it. We had raised the ThreadPool minimum threads to fix thread starvation. That let more requests run at once, and it shifted the problem from CPU to memory.',
          'So I went after allocations. I looked at large Cosmos page deserialization on the Large Object Heap, uncached queries, and Newtonsoft allocations. I made changes in our own code. I suppressed Cosmos write response deserialization. I removed a double list copy in the GET endpoints. I also set a GC heap hard limit to avoid SIGSEGV.',
          'None of that explained what I was actually seeing. Memory climbed steadily with pod uptime and never dropped.',
          'I also lost time to a log misread. I thought a filter clause was being stripped from requests, which looked like a missing-scope problem. It was a false alarm. ASP.NET logs a normalized URL on the request-finished event and the full URL on request-starting. I had compared the two. The lesson is to always analyze URLs from the request-starting event.',
          "A teammate had earlier cached one of two EDM model builds in our service code. That cut the leak rate by about half, but it did not eliminate it. Under lower traffic, pods survived longer, so it looked fixed. It wasn't.",
        ],
      },
      {
        heading: 'How I found it',
        paragraphs: [
          'On April 28, I captured a gcdump from a pod at about 1046 Mi. Then I aggregated it by type.',
          'The managed heap was 476 MB, with about 10 million objects. There were 17,792 EdmModel instances. That is one per GET request over the life of the pod. And 371 MB of the heap, 78%, was OData and EDM type metadata.',
          'That pointed at the cause. The ASP.NET OData runtime keeps a static ConcurrentDictionary keyed by IEdmModel object reference. An internal shared OData library was building a new model on every request. Every new model was a new key, so the dictionary grew without bound, at roughly 20 KB per model. Nothing was ever evicted, so nothing was ever freed.',
          'The leak was not in our service code. It was in a library we share.',
        ],
      },
      {
        heading: 'What changed',
        paragraphs: [
          'The fix was a static ConcurrentDictionary<Type, IEdmModel> in the shared library. Each CLR type now builds its model once and reuses it. That is safe because the model is deterministic per type and carries no request-specific state.',
          'I committed the fix on April 28 and it deployed on April 29.',
          'EdmModel instances went from 17,792 to 4. At about 14 hours of uptime, memory had been over 1000 Mi and climbing. It now sits stable between 530 and 547 Mi. Restarts went from 1 to 3 per pod per day to zero.',
        ],
      },
      {
        heading: "What I'd do differently",
        paragraphs: [
          'I would take the heap dump on day one. I spent about two weeks reasoning from logs and tuning our own code instead.',
          'Aggregating a dump by type shows you what is accumulating right away. Looking at individual objects or request patterns does not. One dump gave me the answer that two weeks of theories did not.',
        ],
      },
    ],
  },
  {
    slug: 'automapper-to-mapperly',
    title: 'Replacing AutoMapper with Mapperly to close a high-severity CVE',
    summary:
      'A scan flagged AutoMapper and a fixed version needed a commercial license. So I replaced it, and the tests said nothing broke.',
    sections: [
      {
        heading: 'The situation',
        paragraphs: [
          'A Sonatype scan flagged a high-severity vulnerability in AutoMapper in the accounts service.',
          'Our policy is that high findings must be resolved within 30 days. So the clock was running.',
          'The obvious fix was to upgrade. That was not an option. A fixed version of AutoMapper required a commercial license. A plain upgrade was off the table, so I replaced the library instead.',
        ],
      },
      {
        heading: 'What I saw',
        paragraphs: [
          'The AutoMapper configuration was about 500 lines. That is a lot of mapping to move over.',
          'I had a safety net. The service had 595 unit tests and 176 contract tests. If the migration broke something, they were the thing that would tell me.',
        ],
      },
      {
        heading: 'How I approached it',
        paragraphs: [
          'I chose Mapperly. It uses compile-time source generation instead of runtime mapping. That should improve performance and memory use. I did not measure either one, so that is the reason I picked it, not a result I can show you.',
          'I did not try to migrate everything at once. I migrated one service first as a trial and wrote down what I found along the way.',
          'Then I turned those findings into a skill. It guides AI-assisted migration of the rest. The trial taught me what the migration actually involves, and the skill carried that forward so I did not have to rediscover it each time.',
          'The tests stayed as the safety net the whole way through.',
        ],
      },
      {
        heading: 'What changed',
        paragraphs: [
          'AutoMapper is gone and the vulnerability is closed. All 595 unit tests and 176 contract tests passed, with zero regressions.',
          'Our CI/CD pipeline scans every build. So the clean scan came from the first build after the migration. The whole thing shipped within 3 days.',
          'I did not measure build time or runtime performance, so I have nothing to report on either.',
        ],
      },
      {
        heading: "What I'd do differently",
        paragraphs: [
          'First, I would move off libraries sooner when they have no upgrade path or look unmaintained. I did this on a deadline because a CVE forced it. I would rather do it on my own schedule, before anyone is counting days.',
          'Second, I would look for edge cases at the start. AutoMapper did some things by default that were not obvious. Mapperly does not do them. Those differences showed up as surprises during the migration. Hunting for them up front would have been cheaper.',
        ],
      },
    ],
  },
]

export default writing
