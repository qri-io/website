# API Data Types


## Dataset

Dataset is a document for describing & storing structured data. Dataset documents are designed to satisfy the FAIR principle of being Findable, Accessible, Interoperable, and Reproducible, in relation to other dataset documents, and related-but-separate technologies such as data catalogs, HTTP APIs, and data package formats Datasets are designed to be stored and distributed on content-addressed (identify-by-hash) systems The dataset document definition is built from a research-first principle, valuing direct interoperability with existing standards over novel definitions or specifications

- **Type:** Object


This object can contain the following fields:

| Field | Type | Required? | Description |
|-------|------|-----------|-------------|
| `commit` | Object | Optional |  |
| `bodyPath` | String | Optional | BodyPath is the path to the hash of raw data as it resolves on the network. Datasets have at most one body |
| `name` | String | Optional |  |
| `path` | String | Optional | Path to an asset, in the format of '/network/hash' |
| `peername` | String | Optional | The peername associated with a particular qri node |
| `profileID` | String | Optional | The base58 encoded ID unique to this peer |
| `meta` | Object | Optional | Dataset metadata. |
| `previousPath` | String | Optional | PreviousPath connects datasets to form a historical merkle-DAG of snapshots of this document, creating a version history |
| `qri` | String | Optional | Internal notation to ensure the Qri dataset is being handled according to the correct version. |
| `structure` | Object | Optional | Defines the characteristics of a dataset document necessary for a machine to interpret the dataset body. |
| `transform` | Object | Optional | Transform is a record of executing a transformation on data. Transforms can theoretically be anything for an SQL query, a jupyter notebook, the state of an ETL pipeline, etc, so long as the input is zero or more datasets, and the output is a single dataset. Ideally, transforms should contain all the machine-necessary bits to deterministically execute the algorithm referenced in ScriptPath |
| `viz` | Object | Optional | Viz stores configuration data related to representing a dataset as a visualization |




## Profile



- **Type:** Object


This object can contain the following fields:

| Field | Type | Required? | Description |
|-------|------|-----------|-------------|
| `id` | String | Optional | The base58 encoded ID unique to this peer |
| `privKey` | String | Optional |  |
| `peername` | String | Optional | The peername associated with a particular qri node |
| `created` | String | Optional | Date and time created. |
| `updated` | String | Optional | Date and time updated. |
| `type` | String | Optional |  |
| `email` | String | Optional |  |
| `name` | String | Optional |  |
| `description` | String | Optional |  |
| `homeurl` | String | Optional |  |
| `color` | String | Optional |  |
| `thumb` | String | Optional | Path to an asset, in the format of '/network/hash' |
| `photo` | String | Optional | Path to an asset, in the format of '/network/hash' |
| `poster` | String | Optional | Path to an asset, in the format of '/network/hash' |
| `twitter` | String | Optional |  |
| `Online` | Boolean | Optional |  |
| `peerIDs` | Array | Optional | Array of ***TODO*** {'$ref': '#/components/schemas/Path'} |




## Commit



- **Type:** Object


This object can contain the following fields:

| Field | Type | Required? | Description |
|-------|------|-----------|-------------|
| `author` | Object | Optional | User is a placeholder for talking about people, groups, organizations |
| `message` | String | Optional |  |
| `path` | String | Optional | Path to an asset, in the format of '/network/hash' |
| `qri` | String | Optional | Internal notation to ensure the Qri dataset is being handled according to the correct version. |
| `signature` | String | Optional |  |
| `timestamp` | String | Optional |  |
| `title` | String | Optional |  |




## Meta

Dataset metadata.

- **Type:** Object


This object can contain the following fields:

| Field | Type | Required? | Description |
|-------|------|-----------|-------------|
| `qri` | String | Optional | Internal notation to ensure the Qri dataset is being handled according to the correct version. |
| `accessPath` | String | Optional |  |
| `accrualPeriodicity` | String | Optional | Frequency at which his dataset should be updated. |
| `citations` | Array | Optional | List of citations for this dataset. |
| `contributors` | Array | Optional | List of contributors on this dataset. |
| `description` | String | Optional | Human-readable description of the dataset. |
| `downloadPath` | String | Optional |  |
| `homePath` | String | Optional |  |
| `identifier` | String | Optional |  |
| `keywords` | Array | Optional | Keywords or tags that should be associated with the dataset. |
| `language` | Array | Optional | Language or languages the dataset is available in. |
| `license` | Object | Optional | License under which the dataset is authorized to be used. |
| `readmePath` | String | Optional |  |
| `title` | String | Optional | Human-readable title of the dataset. |
| `theme` | Array | Optional | List of categories to which this dataset should belong. |
| `version` | String | Optional | The semantic version of this dataset. |




## Structure

Defines the characteristics of a dataset document necessary for a machine to interpret the dataset body.

- **Type:** Object


This object can contain the following fields:

| Field | Type | Required? | Description |
|-------|------|-----------|-------------|
| `checksum` | String | Optional | The base58 encoded ID unique to this peer |
| `compression` | Integer | Optional | Compression specifies any compression on the source data, if empty assume no compression |
| `encoding` | String | Optional | Encoding specifics character encoding, assume utf-8 if not specified |
| `errCount` | Integer | Optional | ErrCount is the number of errors returned by validating data against this schema. required |
| `entries` | Integer | Optional | Entries is number of top-level entries in the dataset. With tabular data this is the same as the number of `rows` |
| `format` | Integer | Optional | Format specifies the format of the raw data MIME type |
| `formatConfig` | Object | Optional | FormatConfig removes as much ambiguity as possible about how to interpret the specified format. |
| `length` | Integer | Optional | Length is the length of the data object in bytes. Must always match & be present. |
| `path` | String | Optional | Path to an asset, in the format of '/network/hash' |
| `qri` | String | Optional | Internal notation to ensure the Qri dataset is being handled according to the correct version. |
| `schema` | Object | Optional | Schema contains the schema definition for the underlying data, schemas are defined using the IETF json-schema specification. for more info on json-schema see https://json-schema.org |




## Viz

Viz stores configuration data related to representing a dataset as a visualization

- **Type:** Object


This object can contain the following fields:

| Field | Type | Required? | Description |
|-------|------|-----------|-------------|
| `qri` | String | Optional | Internal notation to ensure the Qri dataset is being handled according to the correct version. |
| `format` | String | Optional |  |
| `scriptPath` | String | Optional | the path to the script that created this visualization |




## Transform

Transform is a record of executing a transformation on data. Transforms can theoretically be anything for an SQL query, a jupyter notebook, the state of an ETL pipeline, etc, so long as the input is zero or more datasets, and the output is a single dataset. Ideally, transforms should contain all the machine-necessary bits to deterministically execute the algorithm referenced in ScriptPath

- **Type:** Object


This object can contain the following fields:

| Field | Type | Required? | Description |
|-------|------|-----------|-------------|
| `qri` | String | Optional | Internal notation to ensure the Qri dataset is being handled according to the correct version. |
| `path` | String | Optional | Path to an asset, in the format of '/network/hash' |
| `scriptPath` | String | Optional |  |
| `syntax` | String | Optional |  |
| `syntaxVersion` | String | Optional |  |
| `structure` | Object | Optional | Defines the characteristics of a dataset document necessary for a machine to interpret the dataset body. |
| `config` | Object | Optional |  |
| `secrets` | Object | Optional |  |
| `resources` | Object | Optional |  |




## ID

The base58 encoded ID unique to this peer

- **Type:** String

- **Pattern:** `^[a-zA-Z0-9]{46}`



## Peername

The peername associated with a particular qri node

- **Type:** String




## Created

Date and time created.

- **Type:** String




## Updated

Date and time updated.

- **Type:** String




## Path

Path to an asset, in the format of '/network/hash'

- **Type:** String

- **Pattern:** `^\/[a-zA-Z]+\/[a-zA-Z0-9]{46}$`



## Error



- **Type:** Object


This object can contain the following fields:

| Field | Type | Required? | Description |
|-------|------|-----------|-------------|
| `meta` | Object | Required |  |




## URI



- **Type:** String




## Email



- **Type:** String




## Datetime



- **Type:** String




## Qri

Internal notation to ensure the Qri dataset is being handled according to the correct version.

- **Type:** String




## User

User is a placeholder for talking about people, groups, organizations

- **Type:** Object


This object can contain the following fields:

| Field | Type | Required? | Description |
|-------|------|-----------|-------------|
| `ID` | String | Optional | The base58 encoded ID unique to this peer |
| `Fullname` | String | Optional | First and last name, or full name of the organizations |
| `Email` | String | Optional |  |




## Schema

Schema contains the schema definition for the underlying data, schemas are defined using the IETF json-schema specification. for more info on json-schema see https://json-schema.org

- **Type:** Object


This object can contain the following fields:

| Field | Type | Required? | Description |
|-------|------|-----------|-------------|
| `type` | String | Optional | dataset body’s top level structure, either object or array |




## MetaResponse



- **Type:** Object


This object can contain the following fields:

| Field | Type | Required? | Description |
|-------|------|-----------|-------------|
| `code` | Integer | Optional |  |




## Pagination



- **Type:** Object


This object can contain the following fields:

| Field | Type | Required? | Description |
|-------|------|-----------|-------------|
| `nextUrl` | String | Optional |  |




## Multiaddr

Path to an asset, in the form of a multiaddress

- **Type:** String

- **Pattern:** `^(\/[0-9A-Za-z:.]+\/[0-9A-Za-z:.]+)+\/([^\/]\S)+$`



## SearchItem

Single search result

- **Type:** Object


This object can contain the following fields:

| Field | Type | Required? | Description |
|-------|------|-----------|-------------|
| `type` | String | Optional |  |
| `id` | String | Optional |  |
| `value` |  | Optional |  |



