---
metaTitle: "Frequently Asked Questions"
metaDescription: "Frequently Asked Questions about Qri"
---

### Is qri a blockchain?

Nope.

### What’s a dataset?

A dataset is a CSV or JSON file + supporting info, arranged in a standard way.

We call the supporting info _components_, and break components down by their purpose (like, for example a "meta" component). The data component is called the _body_.

That’s the short of it. Here’s the long of it: [Qri Dataset Components Overview](https://qri.io/docs/dataset-components/overview).

### What does version control mean?

If you’re used to versioning using filenames, you’ve probably encountered a situation where two files with the same name do not contain the same information.  Version control is a system for tracking changes that computers can understand. When computers track changes it's much easier for people to collaborate. Users in different locations can be confident about whether or not they are both looking at the same version.

Like git (if you’re familiar with it), Qri keeps snapshots of datasets (and each component) at chosen points in time, allowing you to see how a dataset has evolved. We’re hoping to do for datasets what Github did for open-source software. Qri (like git with code) tracks all aspects of a dataset’s changes — every byte, every component.

### What’s the main value users can get out of using qri?

Trust. Trust in both a dataset’s provenance (source and authenticity — where it came from) and evolution (version control — what, if anything, has been done to it).

With trust and auditability, users can build on each others’ work (and prevent duplicative work), ask new and better questions, and unearth new insights from the mountains of data we generate and work on together.

### Where does my data live?

Data on qri lives on your hard drive in an IPFS repository, and is made available on the distributed web. Learn more about [how Qri leverages IPFS here](https://qri.io/docs/reference/ipfs_to_qri#qri-stores-datasets-in-ipfs).

### Do you consider the Dat project an alternative to IPFS?

We reviewed both Dat and IPFS white papers at the same time, and keyed in on one major feature of Dat which made it incompatible with the scope and goals we had for Qri out of the gate.

Dat, like git, uses a repository model. So, if a user were to create a dataset containing a certain csv file, and another user had the exact same csv file (because, say, they were both downloaded from the same URL around the same time), the files would not ‘collide’ — meaning both physical files would not deduplicate, and storage costs (and all other complications) would scale as more datasets are added to the network by other users.

In an ideal data commons, identical datasets would collide and deduplicate to a single file on one’s hard drive. That doesn’t happen with Dat, BitTorrent or several others. The only technology that has that key property is IPFS, because of the ‘single swarm’ style of content propagation.

We’re really impressed with the Dat community and the aims of the project as a whole, and eventually we’d like to be able to support exporting to Dat from qri.

### Which data formats does Qri support? How does qri support / get along with some of the more obscure dataset formats?

Qri supports CSV, JSON, XSLX and CBOR formats. Much of our tooling and GUIs are optimized for tabular data (CSVs), but the other formats can be used with Qri CLI.

### Who can see my data?

Currently all datasets on qri are public. By publishing a dataset, you make it discoverable on Qri.cloud. Unpublished datasets are still discoverable by other qri users, but it’s more akin to having an unlisted phone number.

We’re working on support for both encrypted data and private networks. You can track the progress of encryption and private networks in the [roadmap](https://github.com/qri-io/qri/issues/1093). Please thumbs-up or comment on features you want us to work on.

### What is the distributed web? And why is qri built on it?

The distributed web, or more accurately ’a’ distributed web is simply a linked network of ‘nodes’ or computers. It’s simply an internet that allows computers to talk to one another directly without going through a centralized server (often owned / managed by a single individual or organization). In qri’s case, our network is built on IPFS – the Interplanetary File System.

We built qri on IPFS for two important reasons. The first is content addressing — the ability to identify content by WHAT it is, rather than WHERE it is (traditionally, its URL). If you visit a dataset stored on a URL today and again in 2 weeks, how can you identify what has changed? IPFS makes knowing what’s changed possible, and makes an incredible foundation for a data commons.

Secondly, decentralized storage means that the amount/size of datasets qri can support is limited only by the hard drive space offered to the network by peers. Centralized storage (offered by a company or org) is always limited by the amount they can afford to provide. Qri isn’t limited by this.

### Can I upload / connect data directly to and from [my favorite app]?

We plan to support apps and software popular among data folks like… Jupyter Notebook, R, and many others. Be sure to stay in the loop on updates and let us know which apps are most important to you.

If you’re into writing libraries, qri comes with a command line client, JSON API, and RPC API intended for these exact purposes.

### Are you open source?

We’re so open source. Join the party over at [our github](https://github.com/qri-io).

### Is there a maximum file size above for datasets on Qri?

Qri can support as much data as your hard drive(s) can hold., and works best with human-scale data (as opposed to most machine-generated, or “Big Data”). Essentially, this means datasets that fit on a laptop. We keep a [dataset of benchmarks](https://qri.cloud/qri_eng/qri_cli_user_benchmarks) for exact figures.

### If I want to point to a specific version of a dataset (or send one to a colleague), do I need the hash or is there a shorthand way to refer them?

Not yet, [we’re working on it](https://github.com/qri-io/rfcs/issues/57).

### How do syncing changes and collaboration work? How does Qri resolve conflicts as two users make changes to the same dataset?

Currently qri uses a single author collaboration model, where datasets are controlled by one user at a time. Editing another user’s dataset automatically creates a fork. We’re actively researching how collaboration will work in the long run, and want a clear answer on how to handle merge conflicts on a multiple/many/million+ rows before moving forward.

### Linking code and data. How does it work?

Qri supports scripting using a python-like language called Starlark. A script file is saved and versioned as part of the dataset (this component is known as transform). Users can trigger the execution of the transform, or automate it to run at specific intervals.

You can learn more about transforms [here](https://qri.io/docs/dataset-components/transform).

### We use a Virtual Private Network (VPN). Is that a problem? Can we push datasets to it so others internally can discover them?

Running a private Qri network is doable! Please get in touch, [hello@qri.io](mailto:hello@qri.io), for more info on setting up private networks.

### What’s Qri’s approach to backing up datasets?

Qri peers can create backups of datasets by pushing datasets to remotes (other computers running qri), `qri.cloud` is the default remote you can push to, and is public. Currently, this is the foundation of one approach to

Qri.cloud stores [versions](https://qri.io/docs/working-with-datasets/versioning) (up to 300 MB).

### How much does it cost?

It’s free. The core Qri application and CLI tools are free forever, all you need to bring is your own hard drive. As a p2p network, our costs don’t scale up with users or the datasets on the network.

### How do you make money?

Core Qri is free and always will be. We plan to sell access to and support for ‘pro’ features for individual users and teams of all sizes.

We also work directly with users, teams, and enterprises on white-labeling Qri into their tech/data stack. This requires some hand-holding from our team and ongoing support, and, well, we charge for that. If you want a private version of qri for your company, school, startup, teen pop band, hedge fund, whatever. Give us a call.

### What’s next for Qri?

As an open project, we do our best to share what we’re up to on our [blog](https://medium.com/qri-io), newsletter, [twitter](https://twitter.com/qri_io), and through [our github]( https://github.com/qri-io). We also address questions/issues raised by our community of users on [Discord](https://discordapp.com/invite/thkJHKj). If what you’ve learned so far excites you, we encourage you to follow us and even consider contributing.
