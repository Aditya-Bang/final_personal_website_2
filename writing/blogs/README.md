# Example blogs

```json
{
  "slug": "building-a-readable-blog-system",
  "title": "Building a Readable Blog System",
  "description": "A short walkthrough of how this website can support structured posts, images, code examples, and a clickable outline.",
  "date": "2026-04-26",
  "readTime": "5 min read",
  "tags": [
    "Next.js",
    "Writing",
    "Design"
  ],
  "heroImage": {
    "src": "/blogs/building-a-readable-blog-system/images/readable-blog-system.svg",
    "alt": "Abstract dark interface with article blocks",
    "caption": "A dark article layout with a persistent outline helps long-form writing stay easy to scan."
  },
  "content": [
    {
      "type": "paragraph",
      "parts": [
        {
          "text": "A blog on a portfolio site should feel like part of the same product, not a separate destination. This section uses structured content so each post can include prose, links, images, headings, subheadings, and reusable code snippets."
        }
      ]
    },
    {
      "type": "heading",
      "id": "content-model",
      "text": "Content Model"
    },
    {
      "type": "paragraph",
      "parts": [
        {
          "text": "The post content is stored as ordered blocks. That keeps rendering predictable while still allowing rich text links such as "
        },
        {
          "text": "the Next.js documentation",
          "href": "https://nextjs.org/docs"
        },
        {
          "text": " to appear directly inside paragraphs."
        }
      ]
    },
    {
      "type": "subheading",
      "id": "why-json",
      "text": "Why Structured JSON?"
    },
    {
      "type": "paragraph",
      "parts": [
        {
          "text": "This project already keeps portfolio writing in JSON files, so blogs follow the same pattern. It is easy to edit, easy to review, and does not require adding a markdown pipeline."
        }
      ]
    },
    {
      "type": "paragraph",
      "parts": [
        {
          "text": "Math can now be embedded inline too, such as $x_i = a_i + b_i$, without changing the surrounding paragraph structure."
        }
      ]
    },
    {
      "type": "equation",
      "id": "equation-block-example",
      "math": "x_i = a_i + b_i",
      "caption": "The same expression rendered as a centered equation block."
    },
    {
      "type": "code",
      "id": "blog-block-example",
      "language": "json",
      "caption": "A compact example of a renderable blog block.",
      "code": "{\n  \"type\": \"subheading\",\n  \"id\": \"why-json\",\n  \"text\": \"Why Structured JSON?\"\n}"
    },
    {
      "type": "heading",
      "id": "reader-experience",
      "text": "Reader Experience"
    },
    {
      "type": "paragraph",
      "parts": [
        {
          "text": "Long posts become easier to navigate when the side menu mirrors the article structure. Each heading and subheading gets a stable anchor, so readers can jump to exactly the section they want."
        }
      ]
    },
    {
      "type": "image",
      "src": "/blogs/building-a-readable-blog-system/images/article-outline.svg",
      "alt": "Stylized article outline beside content",
      "caption": "The side outline acts like a tree of the post's major sections and nested sub-sections."
    },
    {
      "type": "subheading",
      "id": "copyable-code",
      "text": "Copyable Code Blocks"
    },
    {
      "type": "paragraph",
      "parts": [
        {
          "text": "Code blocks include a copy button so implementation notes can be used immediately. The button state changes after copying to make the interaction feel responsive."
        }
      ]
    },
    {
      "type": "code",
      "id": "copy-example",
      "language": "javascript",
      "caption": "The small interaction behind a copy button.",
      "code": "async function copySnippet(snippet) {\n  await navigator.clipboard.writeText(snippet);\n  return \"Copied\";\n}"
    },
    {
      "type": "code",
      "id": "python-highlight-example",
      "language": "python",
      "caption": "Python highlighting for a small frequency counter.",
      "code": "from collections import Counter\n\n\ndef most_common_word(words):\n    counts = Counter(word.lower() for word in words)\n    word, frequency = counts.most_common(1)[0]\n    return f\"{word}: {frequency}\"\n\n\nprint(most_common_word([\"Blog\", \"code\", \"blog\"]))"
    },
    {
      "type": "code",
      "id": "cpp-highlight-example",
      "language": "cpp",
      "caption": "C++ highlighting for the same counting idea.",
      "code": "#include <algorithm>\n#include <iostream>\n#include <string>\n#include <unordered_map>\n#include <vector>\n\nstd::string mostCommonWord(const std::vector<std::string>& words) {\n    std::unordered_map<std::string, int> counts;\n\n    for (const auto& word : words) {\n        counts[word]++;\n    }\n\n    auto best = std::max_element(\n        counts.begin(),\n        counts.end(),\n        [](const auto& left, const auto& right) {\n            return left.second < right.second;\n        }\n    );\n\n    return best->first + \": \" + std::to_string(best->second);\n}\n\nint main() {\n    std::cout << mostCommonWord({\"blog\", \"code\", \"blog\"}) << '\\n';\n}"
    },
    {
      "type": "heading",
      "id": "next-steps",
      "text": "Next Steps"
    },
    {
      "type": "paragraph",
      "parts": [
        {
          "text": "New posts can be added by creating another object in the blogs data file. Each post automatically appears on the blog index and gets its own detail page."
        }
      ]
    }
  ]
}
```

```json
{
  "slug": "notes-on-dark-portfolio-design",
  "title": "Notes on Dark Portfolio Design",
  "description": "Design notes for keeping a dark portfolio page readable, responsive, and useful.",
  "date": "2026-04-26",
  "readTime": "4 min read",
  "tags": [
    "UI",
    "Accessibility",
    "Portfolio"
  ],
  "heroImage": {
    "src": "/blogs/notes-on-dark-portfolio-design/images/article-outline.svg",
    "alt": "Abstract outline of a dark themed page",
    "caption": "Dark interfaces work best when spacing, contrast, and navigation are treated as content."
  },
  "content": [
    {
      "type": "paragraph",
      "parts": [
        {
          "text": "A dark background can make a portfolio feel focused, but only if the content has enough contrast and breathing room. The goal is to make the writing comfortable before adding visual detail."
        }
      ]
    },
    {
      "type": "heading",
      "id": "contrast",
      "text": "Contrast"
    },
    {
      "type": "paragraph",
      "parts": [
        {
          "text": "Body copy should stay in a readable gray, while links and interactive controls use a brighter blue or violet. For reference, the "
        },
        {
          "text": "Web Content Accessibility Guidelines",
          "href": "https://www.w3.org/WAI/standards-guidelines/wcag/"
        },
        {
          "text": " are a useful baseline when choosing colors."
        }
      ]
    },
    {
      "type": "subheading",
      "id": "link-treatment",
      "text": "Link Treatment"
    },
    {
      "type": "paragraph",
      "parts": [
        {
          "text": "Links should look distinct without competing with headings. A subtle underline and bright color are enough for dense writing."
        }
      ]
    },
    {
      "type": "heading",
      "id": "layout",
      "text": "Layout"
    },
    {
      "type": "paragraph",
      "parts": [
        {
          "text": "The article area uses a wide content column and a sticky side outline on larger screens. On small screens, the outline stacks above the article so navigation remains available."
        }
      ]
    },
    {
      "type": "code",
      "id": "tailwind-layout",
      "language": "jsx",
      "caption": "A simplified version of the responsive article shell.",
      "code": "<div className=\"grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]\">\n  <aside>Outline</aside>\n  <article>Post content</article>\n</div>"
    },
    {
      "type": "subheading",
      "id": "image-captions",
      "text": "Image Captions"
    },
    {
      "type": "image",
      "src": "/blogs/notes-on-dark-portfolio-design/images/readable-blog-system.svg",
      "alt": "Dark article card with image placeholder",
      "caption": "Captions give images context and keep visual examples tied to the surrounding text."
    },
    {
      "type": "paragraph",
      "parts": [
        {
          "text": "Captions are especially useful in technical posts because they explain why an image is present, not just what the image shows."
        }
      ]
    }
  ]
}
```
