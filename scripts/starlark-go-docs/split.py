# this slices up spec.md (from starlark-go) into multiple markdown files for use in qri docs
# we may never use it again, but it was useful when first setting up these docs pages

import re

with open('./spec.md', 'r') as f:
    raw = f.read()
    sections = re.findall('(?:^|\n)##\s[^\n]*\n+.*?(?=\n##?\s|$)', raw, re.DOTALL)
    print(len(sections))

    for section in sections:
        # get the title
        section = section.strip()
        title = re.match('^##\s(.+)', section).group(1) # get the h2 heading
        slug = title.lower().replace(' ', '-') # make snakecase

        print(title)
        lines = section.split('\n')

        # create frontmatter
        frontmatter = """---
metaTitle: "{}"
---""".format(title)

        # remove first line
        section = '\n'.join(lines[1:])

        # prepend frontmatter
        section = frontmatter + section

        writefile = open('../../content/docs/reference/starlark-language/{}.md'.format(slug), "w")
        writefile.write(section)
        writefile.close()
