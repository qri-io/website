---
title: "CLI commands"
description: "qri command line reference"
date: 2018-01-30T00:00:00-04:00
section: reference
draft: false
---

# Qri CLI command line reference 


Qri ("query") is a global dataset version control system 
on the distributed web.


|Command | Description |
|--------|-------------|
|[qri access](#qri_access_token)  | Create an access token   |
|[qri apply](#qri_apply)  | Apply a transform to a dataset   |
|[qri checkout](#qri_checkout)  | Create a directory linked to a dataset   |
|[qri completion](#qri_completion)  | Generate shell auto-completion scripts   |
|[qri config](#qri_config)  | Get and set local configuration information   |
|[qri connect](#qri_connect)  | Connect to the distributed web by spinning up a Qri node   |
|[qri diff](#qri_diff)  | Compare differences between two datasets   |
|[qri get](#qri_get)  | Get elements of qri datasets   |
|[qri init](#qri_init)  | Initialize a dataset directory   |
|[qri list](#qri_list)  | Show a list of datasets   |
|[qri log](#qri_log)  | Show log of dataset history   |
|[qri peers](#qri_peers)  | Commands for working with peers   |
|[qri preview](#qri_preview)  | Fetch a dataset preview   |
|[qri pull](#qri_pull)  | Fetch and store datasets from other peers   |
|[qri push](#qri_push)  | Send a dataset to a remote   |
|[qri registry](#qri_registry)  | Commands for working with a qri registry   |
|[qri remove](#qri_remove)  | Remove a dataset from your local repository   |
|[qri rename](#qri_rename)  | Change the name of a dataset   |
|[qri render](#qri_render)  | Execute a template against a dataset   |
|[qri restore](#qri_restore)  | Restore a checked out dataset's files to a previous state   |
|[qri save](#qri_save)  | Save changes to a dataset   |
|[qri search](#qri_search)  | Search qri   |
|[qri setup](#qri_setup)  | Initialize qri and IPFS repositories, provision a new qri ID   |
|[qri sql](#qri_sql)  | Experimental: Run an SQL query on local dataset(s)   |
|[qri status](#qri_status)  | Show what components of a dataset have been changed   |
|[qri use](#qri_use)  | Select datasets for use with the qri get command   |
|[qri validate](#qri_validate)  | Show schema validation errors   |
|[qri version](#qri_version)  | Print the version number   |
|[qri workdir](#qri_workdir)  | File system integration tools   |

________

<a id='qri_access_token'></a>
## qri access token

create an access token

### Synopsis

token creates a JSON Web Token (JWT) that authenticates the given user.
Constructing an access token requires a private key that backs the given user.

In the course of normal operation you shouldn't need this command, It's mainly
here for crafting API requests in external progrmas

```
qri access token [flags]
```

### Examples

```
  # create an access token to authenticate yourself else where:
  $ qri access token --for me

```

### Options

```
      --for string   user to create access token for
  -h, --help         help for token
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_access'></a>
## qri access

manage user permissions

### Options

```
  -h, --help   help for access
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_apply'></a>
## qri apply

apply a transform to a dataset

### Synopsis

Apply runs a transform script. The result of the transform is displayed after
the command completes.

The apply command itself does not commit results to the repository. Use
the --apply flag on the save command to commit results from transforms.

```
qri apply [flags]
```

### Examples

```
 # Apply a transform and display the output:
 $ qri apply --file transform.star

 # Apply a transform using an existing dataset version:
 $ qri apply --file transform.star me/my_dataset
```

### Options

```
      --file string       path of transform script file
  -h, --help              help for apply
      --secrets strings   transform secrets as comma separated key,value,key,value,... sequence
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_checkout'></a>
## qri checkout

create a linked directory and write dataset files to that directory

```
qri checkout DATASET [flags]
```

### Examples

```
  # Place a copy of me/annual_pop in the ./annual_pop directory:
  $ qri checkout me/annual_pop
```

### Options

```
  -h, --help   help for checkout
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_completion'></a>
## qri completion

generate shell auto-completion scripts

### Synopsis

Completion generates auto-completion scripts for Bash or Zsh
which you can then source in your terminal or save to your profile to have it
run on each terminal session.

```
qri completion [bash|zsh] [flags]
```

### Examples

```
  # load auto-completion for a single session
  $ source <(qri completion [bash|zsh])

  #configure your bash/zsh shell to load completions by adding to your bashrc/zshrc:
  # ~/.bashrc or ~/.zshrc

  $ source <(qri completion [bash|zsh])

  # alternatively you can pipe the output to a local script and
  # reference that as the source for faster loading.

```

### Options

```
  -h, --help   help for completion
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_config_get'></a>
## qri config get

get configuration settings

### Synopsis

'qri config get' outputs your current configuration file with private keys 
removed by default, making it easier to share your qri configuration settings.

You can get particular parts of the config by using dot notation to
traverse the config object. For details on each config field checkout: 
https://github.com/qri-io/qri/blob/master/config/readme.md

The --with-private-keys option will show private keys.
PLEASE PLEASE PLEASE NEVER SHARE YOUR PRIVATE KEYS WITH ANYONE. EVER.
Anyone with your private keys can impersonate you on qri.

```
qri config get [FIELD] [flags]
```

### Examples

```
  # Get the entire config:
  $ qri config get

  # Get the config profile:
  $ qri config get profile

  # Get the profile description:
  $ qri config get profile.description
```

### Options

```
  -c, --concise             print output without indentation, only applies to json format
  -f, --format string       data format to export. either json or yaml (default "yaml")
  -h, --help                help for get
  -o, --output string       path to export to
      --with-private-keys   include private keys in export
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_config_set'></a>
## qri config set

set configuration options

### Synopsis

'qri config set' allows you to set configuration options. You can set 
particular parts of the config by using dot notation to traverse the 
config object. 

While the 'qri config get' command allows you to view the whole config,
or only parts of it, the 'qri config set' command is more specific.

If the config object were a tree and each field a branch, you can only
set the leaves of the branches. In other words, the you cannot set a 
field that is itself an object or array. For details on each config 
field checkout: https://github.com/qri-io/qri/blob/master/config/readme.md

```
qri config set FIELD VALUE [FIELD VALUE ...] [flags]
```

### Examples

```
  # Set a profile description:
  $ qri config set profile.description "This is my new description that I
  am very proud of and want displayed in my profile"

  # Disable rpc communication:
  $ qri config set rpc.enabled false
```

### Options

```
  -h, --help   help for set
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_config'></a>
## qri config

get and set local configuration information

### Synopsis

'qri config' encapsulates all settings that control the behaviour of qri.
This includes all kinds of stuff: your profile details; enabling & disabling 
different services; what kind of output qri logs to; 
which ports on qri serves on; etc.

Configuration is stored as a .yaml file kept at $QRI_PATH, or provided at CLI 
runtime via command a line argument.

For details on each config field checkout: 
https://github.com/qri-io/qri/blob/master/config/readme.md

### Examples

```
  # Get your profile information:
  $ qri config get profile

  # Set your API port to 4444:
  $ qri config set api.port 4444

  # Disable RPC connections:
  $ qri config set rpc.enabled false
```

### Options

```
  -h, --help   help for config
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_connect'></a>
## qri connect

connect to the distributed web by spinning up a Qri node

### Synopsis

While it’s not totally accurate, connect is like starting a server. Running 
connect will start a process and stay there until you exit the process 
(ctrl+c from the terminal, or killing the process using tools like activity 
monitor on the mac, or the aptly-named “kill” command). Connect does three main 
things:
- Connect to the qri distributed network
- Connect to IPFS
- Start a local API server

When you run connect you are connecting to the distributed web, interacting with
peers & swapping data.

```
qri connect [flags]
```

### Options

```
  -h, --help              help for connect
      --registry string   specify registry to setup with. only works when --setup is true
      --setup             run setup if necessary, reading options from environment variables
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_diff'></a>
## qri diff

compare differences between two data sources

### Synopsis

'qri diff' is a new & experimental feature, please report bugs here:
https://github.com/qri-io/deepdiff

Diff compares two data sources & generates a description of the difference
between them. The output of diff describes the steps required to make the 
element on the left (the first argument) equal the element on the right (the
second argument). The steps themselves are the "diff".

Unlike the classic unix diff utility (which operates on text),
qri diff works on structured data. qri diffs are measured in elements
(think cells in a spreadsheet), each change is either an insert (added 
elements), delete (removed elements), or update (changed values).

Each change has a path that locates it within the document

```
qri diff ([COMPONENT] [DATASET [DATASET]])|(PATH PATH) [flags]
```

### Examples

```
  # Diff between a latest version & the next one back:
  $ qri diff me/annual_pop

  # Diff current "qri use" selection:
  $ qri diff

  # Diff dataset body against its last version:
  $ qri diff body me/annual_pop

  # Diff two dataset meta components:
  $ qri diff meta me/population_2016 me/population_2017

  # Diff two local json files:
  $ qri diff a.json b.json

  # Diff a json & csv file:
  $ qri diff some_table.csv b.json
```

### Options

```
  -f, --format string   output format. one of [json,pretty] (default "pretty")
  -h, --help            help for diff
      --summary         just output the summary
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_get'></a>
## qri get

get components of qri datasets

### Synopsis

Get the qri dataset (except for the body). You can also get components of 
the dataset: meta, structure, viz, transform, and commit. To narrow down
further to specific fields in each section, use dot notation. The get 
command prints to the console in yaml format, by default.

Check out https://qri.io/docs/reference/dataset/ to learn about each section of the 
dataset and its fields.

```
qri get [COMPONENT] [DATASET] [flags]
```

### Examples

```
  # Print the entire dataset to the console:
  $ qri get me/annual_pop

  # Print the meta to the console:
  $ qri get meta me/annual_pop

  # Print the dataset body size to the console:
  $ qri get structure.length me/annual_pop
```

### Options

```
  -a, --all              for body, whether to get all entries (default true)
  -f, --format string    set output format [json, yaml, csv, zip]. If format is set to 'zip' it will save the entire dataset as a zip archive.
  -h, --help             help for get
      --offline          prevent network access
  -o, --outfile string   file to write output to
      --page int         for body, page at which to get entries (default -1)
      --page-size int    for body, limit how many entries to get per page (default -1)
      --pretty           whether to print output with indentation, only for json format
      --remote string    name to get any remote data from
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_init'></a>
## qri init

initialize a dataset directory

### Synopsis

'initialize' creates a new dataset, links it to the current directory,
and creates starter files for the dataset's components. You can also specify an
already existing body file using the 'body' flag.

```
qri init [PATH] [flags]
```

### Examples

```
  # initialize a new dataset, linking it to the current directory:

  $ mkdir earthquakes && cd earthquakes
  $ qri init
  Name of new dataset [earthquakes]: 
  Format of dataset, csv or json [csv]: csv
  initialized working directory for new dataset user/earthquakes
	
	# initialize a new dataset, specifying a file to use as the body of the dataset:
	
  $ qri init --body /Users/datasets/earthquakes.csv --name earthquakes
  initialized working directory for new dataset user/earthquakes

```

### Options

```
      --body string     path to the body file
      --format string   format of dataset body
  -h, --help            help for init
      --name string     name of the dataset
      --use-dscache     experimental: build and use dscache if none exists
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_list'></a>
## qri list

show a list of datasets

### Synopsis

List shows lists of datasets, including names and current hashes. 

The default list is the latest version of all datasets you have on your local 
qri repository. The first argument can be used to find datasets with a certain 
substring in their name.

When used in conjunction with `qri connect`, list can list a peer's dataset. You
must have `qri connect` running in a separate terminal window.

```
qri list [FILTER] [flags]
```

### Examples

```
  # Show all of your datasets:
  $ qri list

  # Show datasets with the substring "new" in their name:
  $ qri list new

  # To view the list of a peer's datasets...
  # In one terminal window:
  $ qri connect
  # In a separate terminal window, show all of b5's datasets:
  $ qri list --peer b5
```

### Options

```
  -f, --format string   set output format [json|simple]
  -h, --help            help for list
  -n, --num-versions    show number of versions
      --page int        page number results, default 1 (default 1)
      --page-size int   page size of results, default 25 (default 25)
  -p, --public          list only publically visible
  -r, --raw             to show raw references
      --user string     user whose datasets to list
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_log'></a>
## qri log

show log of dataset commits

### Synopsis

`qri log` lists dataset commits over time. Each entry in the log is a 
snapshot of a dataset taken at the moment it was saved that keeps exact details 
about how that dataset looked at at that point in time. 

We call these snapshots versions. Each version has an author (the peer that 
created the version) and a message explaining what changed. Log prints these 
details in order of occurrence, starting with the most recent known version, 
working backwards in time.

The log command can get the list of versions for a local dataset or a dataset
on the network at a remote.


```
qri log [DATASET] [flags]
```

### Examples

```
  # Show log for the local dataset b5/precip:
  $ qri log b5/precip

  # Show log for a dataset on the Qri Cloud registry called ramfox/league_stats
  $ qri log ramfox/league_stats
	
  # Show log for a dataset chriswhong/nyc_parking_tickets on a remote named "nycdatacollection"
  $ qri log chriswhong/nyc_parking_tickets --source nycdatacollection
```

### Options

```
  -h, --help              help for log
  -l, --local             only fetch local logs, disables network actions
      --page int          page number of results, default 1 (default 1)
      --page-size int     page size of results, default 25 (default 25)
  -p, --pull              fetch the latest logs from the network
      --source registry   name of source to fetch from, disables local actions. registry will search the default qri registry
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_peers_connect'></a>
## qri peers connect

connect to a peer

### Synopsis

Connect to a peer using a peername, peer ID, or multiaddress. Qri will use this name, id, or address
to find a peer to which it has not automatically connected. 

You must have a Qri node running (`qri connect`) in a separate terminal. You will only be able 
to connect to a peer that also has spun up its own Qri node.

A multiaddress, or multiaddr, is the most specific way to refer to a peer's location, and is therefore
the most sure-fire way to connect to a peer.

```
qri peers connect (NAME|ADDRESS) [flags]
```

### Examples

```
  # Spin up a Qri node:
  $ qri connect

  # In a separate terminal, connect to a specific peer:
  $ qri peers connect /ip4/192.168.0.194/tcp/4001/ipfs/QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn
```

### Options

```
  -h, --help   help for connect
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_peers_disconnect'></a>
## qri peers disconnect

explicitly close a connection to a peer

### Synopsis

Explicitly close a connection to a peer using a peername, peer id, or multiaddress. 

You can close all connections to the Qri network by ending your Qri node session. 

Use the disconnect command when you want to stay connected to the network, but want to 
close your connection to a specific peer. This could be because that connection is hung,
the connection is pulling too many resources, or because you simply no longer need an
explicit connection.  This is not the same as blocking a peer or connection.

Once you close a connection to a peer, you or that peer can immediately open another 
connection.

You must have `qri connect` running in another terminal.

```
qri peers disconnect (NAME|ADDRESS) [flags]
```

### Examples

```
  # Disconnect from a peer using a multiaddr:
  $ qri peers disconnect /ip4/192.168.0.194/tcp/4001/ipfs/QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn
```

### Options

```
  -h, --help   help for disconnect
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_peers_info'></a>
## qri peers info

get info on a Qri peer

### Synopsis

The peers info command returns a peer's profile information. The default
format is yaml.

Using the `--verbose` flag, you can also view a peer's network information.

You must have `qri connect` running in another terminal.

```
qri peers info PEER [flags]
```

### Examples

```
  # Show info on a peer named "b5":
  $ qri peers info b5

  # Show info in json:
  $ qri peers info b5 --format json
```

### Options

```
      --format string   output format. formats: yaml, json (default "yaml")
  -h, --help            help for info
  -v, --verbose         show verbose profile info
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_peers_list'></a>
## qri peers list

list known qri peers

### Synopsis

Lists the peers to which your Qri node is connected. 

You must have `qri connect` running in another terminal.

To find peers that are not online, but to which your node has previously been 
connected, use the `--cached` flag.

```
qri peers list [flags]
```

### Examples

```
  # Spin up a Qri node:
  $ qri connect

  # Then in a separate terminal, to list qri peers:
  $ qri peers list

  # To ensure you get a cached version of the list:
  $ qri peers list --cached
```

### Options

```
  -c, --cached           show peers that aren't online, but previously seen
      --format string    output format. formats: simple
  -h, --help             help for list
  -n, --network string   specify network to show peers from (qri|ipfs) (defaults to qri)
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_peers'></a>
## qri peers

commands for working with peers

### Synopsis

The `peers` commands interact with other peers on the Qri network. In
order for these commands to work, you must be running a Qri node, which is
responsible for peer-to-peer communication. To spin up a Qri node, run
`qri connect` in a separate terminal. This connects you to the network
until you choose to close the connection by ending the session or closing 
the terminal.

### Options

```
  -h, --help   help for peers
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_preview'></a>
## qri preview

fetch a dataset preview

### Synopsis

Preview fetches a summary of a dataset but doesn't store it. Useful
for investigating a dataset before saving it locally.


```
qri preview [DATASET] [flags]
```

### Examples

```
  # Preview a dataset:
  $ qri preview user/dataset
```

### Options

```
      --format string   output format [pretty|json] (default "pretty")
  -h, --help            help for preview
      --source string   name of source to fetch preview from
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_pull'></a>
## qri pull

fetch & store datasets from other peers

### Synopsis

Pull downloads datasets and stores them locally, fetching the dataset log and
dataset version(s). By default pull fetches the latest version of a dataset.


```
qri pull DATASET [DATASET...] [flags]
```

### Examples

```
  # download a dataset log and latest version
  $ qri pull b5/world_bank_population

  # pull a specific version from a remote by hash
  $ qri pull ramfox b5/world_bank_population@/ipfs/QmFoo...
```

### Options

```
  -h, --help            help for pull
      --link string     path to directory to link dataset to
      --logs-only       only fetch logs, skipping HEAD data
      --source string   location to pull from
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_push'></a>
## qri push

send a dataset to a remote

### Synopsis

Push sends datasets to a remote qri node. A push updates the dataset log on the
remote and sends one version of dataset data to the remote. To push multiple
dataset versions, run push multiple times, specifying the version hash to push.

If no remote is specified, qri pushes to the registry.

```
qri push DATASET [DATASET...] [flags]
```

### Examples

```
  # push a dataset to the registry
  $ qri push me/dataset

  # push a specific version of a dataset to the registry:
  $ qri push me/dataset@/ipfs/QmHashOfVersion
```

### Options

```
  -h, --help            help for push
      --logs            send only dataset history
      --remote string   name of remote to push to
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_registry_prove'></a>
## qri registry prove

authorize your local keypair for an existing registry profile

### Synopsis

If you have an existing account on a registry, and local keypair
that is not yet connected to a registry profile, `prove` can connect
them.

The prove command connects the local repo to the registry by sending a signed
request to the registry containing login credentials, proving access to both
the unregistred keypair and your registry account. Your repo username will be
matched to the on-registry username.

A repo can only be associated with one registry profile.

```
qri registry prove [flags]
```

### Options

```
      --email string      your email address
  -h, --help              help for prove
      --username string   your existing registry username
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_registry_signup'></a>
## qri registry signup

create a registry profile & connect your local keypair

### Synopsis

Signup creates a profile for you on the configured registry.
(qri is configred to use qri.cloud as a registry by default.)

Registry signup reserves a unique username, and connects your local keypair,
allowing your local copy of qri to make authenticated requests on your behalf.

You'll need to sign up before you can use `qri push` to push datasets
to a registry.

```
qri registry signup [flags]
```

### Options

```
      --email string      your email address
  -h, --help              help for signup
      --username string   desired username
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_registry_status'></a>
## qri registry status

get the status of a reference on the registry

### Synopsis

Use status to see what version of a dataset the registry has on-record, if any.

```
qri registry status DATASET [flags]
```

### Examples

```
  # Get status of a dataset reference:
  $ qri registry status me/dataset_name
```

### Options

```
  -h, --help   help for status
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_registry'></a>
## qri registry

commands for working with a qri registry (qri.cloud)

### Synopsis

Registries are federated public records of datasets and peers.
These records form a public facing central lookup for your datasets, so others
can find them through search tools and via web links.

Qri is designed to work without a registry should you want to opt out of
centralized listing entirely, but know that peers who *do* participate in
registries may choose to deprioritize connections with you. Opting out of a
registry is considered an advanced, experimental state at this point.

You can opt out of registries entirely by running:
$ qri config set registry.location ""

### Options

```
  -h, --help   help for registry
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_remove'></a>
## qri remove

remove a dataset from your local repository

### Synopsis

Remove deletes datasets from qri.

For read-only datasets you've pulled from others, Remove gets rid of a dataset 
from your qri node. After running remove, qri will no longer list that dataset 
as being available locally, and may free up the storage space.

For datasets you can edit, remove deletes commits from a dataset history.
Use delete to "correct the record" by erasing commits. Running remove on 
writable datasets requires a '--revisions' flag, specifying the number of 
commits to delete. Remove always starts from the latest (HEAD) commit, working 
backwards toward the first commit.

Remove can also be used to ask remotes to delete datasets with the '--remote'
flag. Passing the remote flag will run the operation as a network request,
reporting the results of attempting to remove on the destination remote.
The remote flag can only be used to completely remove a dataset from a remote.
To edit history on a remote, run delete locally and use 'qri push' to send the
updated history to the remote. Any command run with the remote flag has no
effect on local data.

```
qri remove [DATASET] [flags]
```

### Examples

```
  # delete a dataset cloned from another user
  $ qri remove user/world_bank_population

  # delete the latest commit from annual_pop
  $ qri remove me/annual_pop --revisions 1

  # delete the latest two versions from history
  $ qri remove me/annual_pop --revisions 2

  # destroy a dataset named 'annual_pop'
  $ qri remove --all me/annual_pop

  # ask the registry to delete a dataset
  $ qri remove --remote registry me/annual_pop
```

### Options

```
  -a, --all                synonym for --revisions=all
  -f, --force              remove files even if a working directory is dirty
  -h, --help               help for remove
      --keep-files         don't modify files in working directory
      --remote string      remote address to remove from
  -r, --revisions string   revisions to delete
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_rename'></a>
## qri rename

change the name of a dataset

### Synopsis

Rename changes the name of a dataset.

Note that if someone has added your dataset to their qri node, and then
you rename your local dataset, your peer's version of your dataset will
not have the updated name. While this won't break anything, it will
confuse anyone who has added your dataset before the change. Try to keep
renames to a minimum.

```
qri rename [flags]
```

### Examples

```
  # Rename a dataset named annual_pop to annual_population:
  $ qri rename me/annual_pop me/annual_population
```

### Options

```
  -h, --help   help for rename
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_render'></a>
## qri render

render a dataset readme or a dataset template

### Synopsis

Render a dataset either by converting its readme from markdown to
html, or by filling in a template using the go/html template style.

Use the `--output` flag to save the rendered html to a file.

Use the `--viz` flag to render the viz. Default is to use readme.

Use the `--template` flag to use a custom template. If no template is
provided, Qri will render the dataset with a default template.

```
qri render [flags]
```

### Examples

```
  # Render the readme of a dataset called me/schools:
  $ qri render -o=schools.html me/schools

  # Render a dataset with a custom template:
  $ qri render --viz --template=template.html me/schools
```

### Options

```
  -h, --help              help for render
  -o, --output string     path to write output file
  -t, --template string   path to template file
  -v, --viz               whether to use the viz component
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_restore'></a>
## qri restore

restore a checked out dataset's files to a previous state

### Synopsis

Restore resets some or all the files in a checked out dataset to a previous
state (it does not alter the dataset's history or commits). It will operate on
the current directory unless a DATASET name is specified, in which case it will
alter the directory that dataset is checked out to.

Specify a specific VERSION (e.g. `/ipfs/QmU...`) to restore to that
version. (Use `qri log` to find a version's name.)

Specify a COMPONENT to only restore a particular component (e.g. `structure`).
Note this is the *component* name, not the file name (e.g. `structure`,
not `structure.json`)

```
qri restore [DATASET] [VERSION] [COMPONENT] [flags]
```

### Examples

```
  # Discard all the changes in the current directory:
  $ qri restore
  
  # Reset the files in a directory to an earlier version (note you need to run
  # `qri save` afterward to actually save a commit reverting the
  # dataset to this version):
  $ qri restore /ipfs/QmU1grTDSM375BvdNirYLgLTgNkUHPss3FnGxkHHVXwQmk
  
  # Discard just the changes to structure.json:
  $ qri restore structure
  
  # Reset the structure.json file to a specific version:
  $ qri restore /ipfs/QmU1grTDSM375BvdNirYLgLTgNkUHPss3FnGxkHHVXwQmk structure
```

### Options

```
  -h, --help   help for restore
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_save'></a>
## qri save

save changes to a dataset

### Synopsis

Save is how you change a dataset, updating one or more dataset components. Every
time you run save, an entry is added to your dataset’s log (which you can see by
running `qri log <dataset_reference>`).

Dataset changes can be automated with a transform component adn the --apply flag
For more on transforms see https://qri.io/docs/transforms/overview
If the dataset you're changing has a transform, running `qri save --apply`
will re-execute it to produce a new version

Every time you save, you can provide a message about what you changed and why. 
If you don’t provide a message Qri will automatically generate one for you.
The `--message`" and `--title` flags allow you to add a 
commit message and title to the save.

When you make an update and save a dataset that you originally added from a 
different peer, the dataset gets renamed from `peers_name/dataset_name` to
`my_name/dataset_name`.

```
qri save [DATASET] [flags]
```

### Examples

```
  # Save updated data to dataset annual_pop:
  $ qri save --body /path/to/data.csv me/annual_pop

  # Save updated dataset (no data) to annual_pop:
  $ qri save --file /path/to/dataset.yaml me/annual_pop
  
  # Re-execute the latest transform from history:
  $ qri save --apply me/tf_dataset
```

### Options

```
      --apply               apply a transformation and save the result
      --body string         path to file or url of data to add as dataset contents
      --drop string         comma-separated list of components to remove
      --dry-run qri apply   deprecated: use qri apply instead
  -f, --file strings        dataset or component file (yaml or json)
      --force               force a new commit, even if no changes are detected
  -h, --help                help for save
  -k, --keep-format         convert incoming data to stored data format
  -m, --message string      commit message for save
  -n, --new                 save a new dataset only, using an available name
      --no-apply            don't apply any transforms that are added
      --no-render           don't store a rendered version of the the visualization
      --secrets strings     transform secrets as comma separated key,value,key,value,... sequence
  -t, --title string        title of commit message for save
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_search'></a>
## qri search

search the registry for datasets

### Synopsis

Search datasets & peers that match your query. Search pings the qri registry. 

Any dataset that has been pushed to the registry is available for search.

```
qri search QUERY [flags]
```

### Examples

```
  # Search for datasets featuring "annual population":
  $ qri search "annual population"
```

### Options

```
  -f, --format string   set output format [json|simple]
  -h, --help            help for search
      --page int        page number of results, default 1 (default 1)
      --page-size int   page size of results, default 25 (default 25)
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_setup'></a>
## qri setup

initialize qri and IPFS repositories, provision a new qri ID

### Synopsis

Setup is the first command you run to get a fresh install of Qri. If you’ve 
never run qri before, you’ll need to run setup before you can do anything. 

Setup does a few things:
- create a qri repository to keep all of your data
- provisions a new qri ID
- create an IPFS repository if one doesn’t exist

This command is automatically run if you invoke any Qri command without first 
running setup. If setup has already been run, by default Qri won’t let you 
overwrite this info.

Use the `--remove` to remove your Qri repo. This deletes your entire repo, 
including all your datasets, and de-registers your username from the registry.

```
qri setup [flags]
```

### Examples

```
  # Run setup with a username of your choosing:
  $ qri setup --username=your_great_username
```

### Options

```
  -a, --anonymous            use an auto-generated username
      --config-data string   json-encoded configuration data, specify a filepath with '@' prefix
      --gimme-doggo          create and display a doggo name only
  -h, --help                 help for setup
      --init-ipfs            initialize an IPFS repo if one isn't present (default true)
      --ipfs-config string   json-encoded configuration data, specify a filepath with '@' prefix
      --overwrite            overwrite repo if one exists
      --registry string      override default registry URL, set to 'none' to remove registry
      --remove               permanently remove qri, overrides all setup options
      --username string      choose your desired username
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_sql'></a>
## qri sql

experimental: run a SQL query on local dataset(s)

### Synopsis

sql runs Structured Query Language (SQL) commands, using local datasets 
as tables.

This feature is experimental, and uses an incomplete SQL implementation

The qri sql command differs from classic relational databases like MySQL or
PostgreSQL in a few ways:
  * sql queries datasets as if they were tables, Any valid dataset reference
    can be used as a table name
  * to query a dataset, it must be in your local qri repo
  * Tables must always be aliased. eg: select a.col from user/dataset as a
  * For a dataset to be queryable it's schema must be properly configured to
    describe a tabular structure, with valid column names & types
  * Referencing columns that do not exist will return null values instead of
    throwing an error

```
qri sql QUERY [flags]
```

### Examples

```
  # first, fetch the dataset b5/world_bank_population:
  $ qri add b5/world_bank_population
  $ qri sql "SELECT 
    wbp.country_name, wbp.year_2018
    FROM b5/world_bank_population as wbp"

  # join b5/world_bank_population with b5/country_codes
  $ qri add b5/country_codes
  $ qri sql "
    SELECT 
    cc.official_name_en, wbp.year_2010, wbp.year_2011 
    FROM b5/world_bank_population as wbp
    LEFT JOIN b5/country_codes as cc 
    ON cc.iso_3166_1_alpha_3 = wbp.country_code"
```

### Options

```
  -f, --format string   set output format [table] (default "table")
  -h, --help            help for sql
      --offline         prevent network access
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_status'></a>
## qri status

show what components of a dataset have been changed

### Synopsis

List what components and files of the working directory's dataset have been
added, removed, or changed.

If you specify a DATASET, this will list what components were changed in a
particular commit (or the latest commit if none is specified). You can specify
a commit alongside a dataset like:

    me/dataset_name@/ipfs/Qmu...

```
qri status [DATASET] [flags]
```

### Examples

```
  # List what components in the working directory have changed:
  $ qri status
  
  # List what changed in version /ipfs/Qmuabcd of me/my_dataset:
  $ qri status me/my_dataset@/ipfs/Qmuabcd
  
  # List what changed in the latest commit of the working directory:
  $ qri status $(cat .qri-ref)
```

### Options

```
  -h, --help         help for status
      --show-mtime   whether to show mtime for each component
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_use'></a>
## qri use

select datasets for use with the qri get command

### Synopsis

Run the `use` command to have Qri remember references to a specific datasets. 
These datasets will be referenced for future commands, if no dataset reference 
is explicitly given for those commands or they are not run from the checkout
directory of a dataset.

To show the current reference, use the `--list` option instead of
providing a DATASET name. To forget the current reference, use the `--clear`
option.

We created this command to ease the typing/copy and pasting burden while using
Qri to explore a dataset.

```
qri use [DATASET] [flags]
```

### Examples

```
  # Use dataset me/dataset_name, then get meta.title:
  $ qri use me/dataset_name
  $ qri get meta.title

  # Clear current selection:
  $ qri use --clear

  # Show current selected dataset references:
  $ qri use --list

  # Add multiple references to the remembered list:
  $ qri use me/population_2017 me/population_2018
```

### Options

```
  -c, --clear   clear the current selection
  -h, --help    help for use
  -l, --list    list selected references
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_validate'></a>
## qri validate

show schema validation errors

### Synopsis

Validate checks data for errors using a schema and then printing a list of
issues. By default validate checks a dataset's body against it’s own schema.
Validate is a flexible command that works with data and schemas either
inside or outside of qri by providing the --body and --schema or --structure
flags.

Providing either --schema or --structure and --body is an “external
validation" that uses nothing stored in qri. When only one of these flags,
are provided, the other comes from a dataset reference. For example, to
check how a file “data.csv” validates against a dataset "foo”, we would run:

  $ qri validate --body data.csv me/foo

In this case, qri will will print any validation as if data.csv was foo’s data.

To see how changes to a schema will validate against a dataset in qri, we
would run:

  $ qri validate --schema schema.json me/foo

In this case, qri will print validation errors as if schema.json was the
schema for dataset "me/foo"

Using validate this way is a great way to see how changes to data or schema
will affect a dataset before saving changes to a dataset.

You can get the current schema of a dataset by running the `qri get structure.schema`
command.

Note: --body and --schema or --structure flags will override the dataset
if these flags are provided.

```
qri validate [DATASET] [flags]
```

### Examples

```
  # Show errors in an existing dataset:
  $ qri validate b5/comics

  # Validate a new body against an existing schema:
  $ qri validate --body new_data.csv me/annual_pop

  # Validate data against a new schema:
  $ qri validate --body data.csv --schema schema.json
```

### Options

```
  -b, --body string        body file to validate
      --format string      output format. One of: [table|json|csv] (default "table")
  -h, --help               help for validate
      --schema string      json schema file to use for validation
      --structure string   json structure file to use for validation
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_version'></a>
## qri version

print the version number

### Synopsis

Qri uses semantic versioning.

For updates & further information check https://github.com/qri-io/qri/releases

```
qri version [flags]
```

### Options

```
      --format string   output format. One of (pretty|json) (default "pretty")
  -h, --help            help for version
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_workdir_link'></a>
## qri workdir link

link a dataset to a directory on disk

```
qri workdir link DATASET PATH [flags]
```

### Examples

```
  # Link a dataset to the current working directory:
  $ qri workdir link peername/dataset .
```

### Options

```
  -h, --help   help for link
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_workdir_unlink'></a>
## qri workdir unlink

unlink a dataset from a directory on disk

```
qri workdir unlink DATASET [flags]
```

### Options

```
  -h, --help   help for unlink
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

<a id='qri_workdir'></a>
## qri workdir

file system integration tools

### Options

```
  -h, --help   help for workdir
```

### Options inherited from parent commands

```
      --log-all       log all activity
      --migrate       automatically run migrations if necessary
      --no-color      disable colorized output
      --no-prompt     disable all interactive prompts
      --repo string   filepath to load qri data from (default "/Users/ramfox/.qri")
```



________

