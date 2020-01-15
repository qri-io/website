---
title: "IPFS -> Qri"
metaTitle: ""
metaDescription: ""
weight: 1
---

## I know IPFS, what's the deal with Qri?

Ooh look at you, smarty-pants. You clicked the [IPFS](https://ipfs.io) link.  Assuming you understand the gist of IPFS, this may help connect the dots to how IPFS interacts with Qri.

If you're new to IPFS, no worries. _You don't need to understand IPFS to work with Qri_. But if you're curious about what all this IPFS talk is about, definitely start with the [IPFS docs introduction](https://docs.ipfs.io/introduction/).

### Qri is built on top of go-ipfs
Qri imports [go-ipfs](https://github.com/ipfs/go-ipfs) as a dependency. When we say "IPFS" in Qri land, we specifically mean the latest stable version of go-ipfs. We try to keep Qri's behaviour in relation to IPFS as close to standard go-ipfs as possible. Qri is sensitive to the `IPFS_PATH` environment variable (which defaults to `$HOME/.ipfs`). Qri respects all configuration in `$IPFS_PATH/config`, so if for example you enable the new `quic` protocol by changing your ipfs config file, Qri will operate over quic as well.

If an IPFS repo doesn't exist when you run  `qri setup`, qri creates one for you, using the default IPFS configuration.

There are lots of places where qri & IPFS overlap. generally we see Qri as being an enthusiastic member of the libp2p ecosystem, building atop libp2p & multformats for any custom p2p behaviour. IPFS skills should make it easier to use Qri, and vice versa.

#### `qri connect` == (`ipfs daemon` + the Qri protocol)
Qri's version of `ipfs daemon` is `qri connect`. When you run qri connect, you are creating a standard IPFS node & long-running daemon process that Qri build on top of. As of qri v0.6.2, Qri makes the IPFS HTTP API available by default. If you haven't change your IPFS config, it will be at `http://localhost:5001`. In addition to p2p communication, `qri connect` makes JSON & RPC api's available for doing qri-specific stuff.

Thanks to recent changes in go-ipfs, `ipfs` cli commands operate over HTTP when a daemon is running, which means you can run `qri connect` and your `ipfs` CLI will still work by adding the `--api` flag. eg: `ipfs --api /ip4/127.0.0.1/tcp/5001/ [command]`.

The big difference between `ipfs daemon` & `qri connect` is of course, the "Qri" part. All Qri peer-to-peer communication is implemented as a custom libp2p protocol (the "qri protocol") for peer-to-peer communication, at startup is added to the IPFS node itself.

`qri peers list` will report connected libp2p peers that support the qri protocol. `qri peers list --network ipfs` will print all connected IPFS peers, as well as their connection manager priorities.

### Qri stores datasets in IPFS

running `qri save --file a.csv me/dataset` will add & pin a new hash to your local IPFS repo at `IPFS_PATH` (which defaults to `$HOME/.ipfs`). As of now this is a standard UnixFSv1 DAG. Qri stores _everything_ related to a dataset & all versions inside of IPFS, except the naming system. `me/dataset` is simply a _reference to the head of a dataset history_. This name reference is mutable & ephemeral, currently stored outside of IPFS.

### Qri ProfileID & IPFS PeerID are different things
One important point of departure is your qri "ProfileID" & IPFS "PeerID" are both base58-encoded hash-of-publicKey. But they are intentionally _different_ keys. We do this so you can move your qri profile to different IPFS nodes. It's not a good idea to use the same keypair for your IPFS PeerID & qri ProfileID, even though the specs are interchangeable.

As usual, _never, ever, ever_ disclose either keypair.

### Qri isn't _just_ IPFS
While the _default_ (and only seriously functional) implementation of Qri is on IPFS, many aspects of Qri currently work without touching IPFS at all. Examples include diffing; validation; dataset rendering; and skipping storage entirely with the  `--dry-run` flag on save. We intended to broaden this picture over time, supporting other content-addressed storage & dissemination formats, ideally including conversion & integration between them. At the moment, Qri is focused on getting production-grade software to work atop IPFS.

** **

## IPFS-ish command cheat sheet:

All of these commands assume you're running `qri connect`. All standard `ipfs` CLI commands should work while `qri connect` is running by adding the `--api` flag. eg: `ipfs --api /ip4/127.0.0.1/tcp/5001/ [command]`

| command | description |
| ------- | ----------- |
| `qri peers list` | List libp2p peers that support the qri protocol |
| `qri peers list --network ipfs` | show IPFS network peers |
| `qri peers connect [multiaddr]` | pass qri peers connect a multiaddr to get the same behaviour as `ipfs swarm peers connect`|
| `qri config set store.options.pubsub true` | enable IPFS pubsub when running qri connect |
| `qri config set store.options.api false` | disable IPFS API (this will disable the ipfs CLI when qri connect is running) |
