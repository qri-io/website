---
metaTitle: "readme: openAPI doc examples"
metaDescription: ""
weight: 1
---

The dynamic examples are under pages that was the quickest way to get them to work. Will figure out how to move to `/docs` once one is chosen.

There are several more available, but they are Vue based. I don’t see a reason to drag another framework in if one of these is good.

## [ascanius](https://github.com/mDuo13/ascanius)

Not this one. Really. For various reasons.

Python, generates static docs.

[Data types](/docs/api/xrp-api-data-types), [methods](/docs/api/xrp-api-methods).

Not as pretty as the dynamic generators, not maintained.

Broken, [doesn’t show responses](/docs/api/xrp-api-ipfs).

With Brendan’s new plans for a public API server, would be nice to have interactive examples.

## [rapidoc](https://github.com/mrin9/RapiDoc)

[Here](/rapidoc).

Single file, no deps.

Dynamic examples in the page won’t work with LOCALHOST `qri connect` because CORS, but curl copy paste does.

The dynamic [examples](https://mrin9.github.io/RapiDoc/examples/example1#get-/pet/findByStatus) (the ‘TRY’ button) are a super cool way to play with a public openAPI.

Maybe(?) ‘TRY’ could work with local `qri connect`. Probably a terrible idea. But it would work with a public server given proper CORS.

You can play with options, the blue buttons at the top, [here](https://mrin9.github.io/RapiDoc/examples/example100.html). Copypaste `https://raw.githubusercontent.com/qri-io/qri/master/api/open_api_3.yaml` into the top box to see qri’s API.

## [redoc](https://github.com/Redocly/redoc)

[Here](/redoc).

React. Available as a React component.

Throws an opaque error ‘Cannot convert undefined or null to object’. 

I fixed bunch of errors (by deleting stuff without regard for spec correctness) to make a `.yaml` that doesn’t error out. So it should work when [#1482](https://github.com/qri-io/qri/issues/1482) is fixed.

Does not have interactive ‘TRY’ button.

Does have plugins to generate copyable code samples for different languages. You can see C# and PHP [here](https://redocly.github.io/redoc/#operation/addPet).

## [redoc static](https://github.com/Redocly/redoc/blob/master/cli/README.md)

Super fast. No spinny progress.

...but. It creates html. Super hairy html with lots of inline js. I have no idea how to convert it to a `.js` that will render in gatsby.
