# Qri API 0.5.1

Qri API used to communicate with a Qri node.

## API Methods

| Name | Path | Summary |
|:-----|:-----|:--------|
| [getPeername][] | [`GET /{peername}`][getPeername] | Get the profile of a peer using the `peername` |
| [getDataset][] | [`GET /{peername}/{datasetName}`][getDataset] | Get dataset info from a peer’s dataset using the `peername` and `dataset_name` |
| [status][] | [`GET /status`][status] | A basic ok response for load balancers & co. Returns the version of qri this node is running, pulled from the qri/lib package |
| [getMyProfile][] | [`GET /me`][getMyProfile] | Get this Qri node’s profile |
| [saveMyProfile][] | [`POST /me`][saveMyProfile] | Save changes to this peer’s profile |
| [getProfile][] | [`GET /profile`][getProfile] | Get this Qri node’s profile |
| [saveProfile][] | [`POST /profile`][saveProfile] | Save changes to this peer’s profile |
| [getPeersList][] | [`GET /peers`][getPeersList] | Get the list of this node’s peers |
| [getPeersDatasetInfo][] | [`GET /peers/{datasetRef}`][getPeersDatasetInfo] | Get the head of a specific dataset |
| [getDatasetList][] | [`GET /list`][getDatasetList] | Get the list of this peer’s datasets |
| [getPeersDatasetList][] | [`GET /list/{peername}`][getPeersDatasetList] | Get the list a specific peer’s datasets |
| [saveDatasetFromRoot][] | [`POST /save`][saveDatasetFromRoot] | Save and update to a dataset head |
| [saveDataset][] | [`POST /save/{datasetRef}`][saveDataset] | Save and update to a dataset head |
| [removeDatasetPost][] | [`POST /remove/{datasetRef}`][removeDatasetPost] | Remove a dataset |
| [removeDatasetDelete][] | [`DELETE /remove/{datasetRef}`][removeDatasetDelete] | Remove a dataset |
| [getMyDataset][] | [`GET /me/{datasetRef}`][getMyDataset] | Get the head of your own dataset |
| [addDatasetPut][] | [`PUT /add/{datasetRef}`][addDatasetPut] | Add a peer’s dataset to your node |
| [addDatasetPost][] | [`POST /add/{datasetRef}`][addDatasetPost] | Add a peer’s dataset to your node |
| [getBody][] | [`GET /body/{datasetRef}`][getBody] | Get a dataset’s body. By default (with no parameters), the body will be returned as paginated json. |
| [datasetHistory][] | [`GET /history/{datasetRef}`][datasetHistory] | Get the version history of a dataset |
| [publishDatasetPut][] | [`PUT /registry/{datasetRef}`][publishDatasetPut] | Publish this dataset to the registry |
| [publishDatasetPost][] | [`POST /registry/{datasetRef}`][publishDatasetPost] | Publish this dataset to the registry |
| [unpublishDataset][] | [`DELETE /registry/{datasetRef}`][unpublishDataset] | Publish this dataset to the registry |
| [renderDataset][] | [`GET /render/{datasetRef}`][renderDataset] | Get a visualized version of your dataset in html. Visualiztions taken from a golang/html template |
| [ConnectToPeer][] | [`GET /connect/{address}`][ConnectToPeer] | Create an explicit connection to another peer |
| [ipfs][] | [`GET /ipfs/{hash}/{filename}`][ipfs] | Get file straight from ipfs |
| [ipns][] | [`GET /ipns/{hash}`][ipns] | Resolve ipns hash |
| [getProfilePhoto][] | [`GET /profile/photo`][getProfilePhoto] | Get your profile photo or a peer’s profile photo |
| [setProfilePhotoPut][] | [`PUT /profile/photo`][setProfilePhotoPut] | Set your profile photo |
| [setProfilePhotoPost][] | [`POST /profile/photo`][setProfilePhotoPost] | Set your profile photo |
| [getProfilePoster][] | [`GET /profile/poster`][getProfilePoster] | Get your profile poster or a peer’s profile poster |
| [setProfilePosterPut][] | [`PUT /profile/poster`][setProfilePosterPut] | Set your profile poster |
| [setProfilePosterPost][] | [`POST /profile/poster`][setProfilePosterPost] | Set your profile poster |
| [diffDatasets][] | [`POST /diff`][diffDatasets] | Get the diff between two datasets |
| [zipDataset][] | [`GET /export/{datasetRef}`][zipDataset] | Export a dataset header and body as a zip |
| [renameDataset][] | [`PUT /rename`][renameDataset] | Rename a dataset |
| [newDatasetPut][] | [`PUT /new`][newDatasetPut] | Create a new dataset |
| [newDatasetPost][] | [`POST /new`][newDatasetPost] | Create a new dataset |
| [getConnections][] | [`GET /connections`][getConnections] | Get list of connections available to this Qri node |
| [search][] | [`GET /search`][search] | Search the Qri registry for datasets |

[getPeername]: xrp-api-getPeername.html
[getDataset]: xrp-api-getDataset.html
[status]: xrp-api-status.html
[getMyProfile]: xrp-api-getMyProfile.html
[saveMyProfile]: xrp-api-saveMyProfile.html
[getProfile]: xrp-api-getProfile.html
[saveProfile]: xrp-api-saveProfile.html
[getPeersList]: xrp-api-getPeersList.html
[getPeersDatasetInfo]: xrp-api-getPeersDatasetInfo.html
[getDatasetList]: xrp-api-getDatasetList.html
[getPeersDatasetList]: xrp-api-getPeersDatasetList.html
[saveDatasetFromRoot]: xrp-api-saveDatasetFromRoot.html
[saveDataset]: xrp-api-saveDataset.html
[removeDatasetPost]: xrp-api-removeDatasetPost.html
[removeDatasetDelete]: xrp-api-removeDatasetDelete.html
[getMyDataset]: xrp-api-getMyDataset.html
[addDatasetPut]: xrp-api-addDatasetPut.html
[addDatasetPost]: xrp-api-addDatasetPost.html
[getBody]: xrp-api-getBody.html
[datasetHistory]: xrp-api-datasetHistory.html
[publishDatasetPut]: xrp-api-publishDatasetPut.html
[publishDatasetPost]: xrp-api-publishDatasetPost.html
[unpublishDataset]: xrp-api-unpublishDataset.html
[renderDataset]: xrp-api-renderDataset.html
[ConnectToPeer]: xrp-api-ConnectToPeer.html
[ipfs]: xrp-api-ipfs.html
[ipns]: xrp-api-ipns.html
[getProfilePhoto]: xrp-api-getProfilePhoto.html
[setProfilePhotoPut]: xrp-api-setProfilePhotoPut.html
[setProfilePhotoPost]: xrp-api-setProfilePhotoPost.html
[getProfilePoster]: xrp-api-getProfilePoster.html
[setProfilePosterPut]: xrp-api-setProfilePosterPut.html
[setProfilePosterPost]: xrp-api-setProfilePosterPost.html
[diffDatasets]: xrp-api-diffDatasets.html
[zipDataset]: xrp-api-zipDataset.html
[renameDataset]: xrp-api-renameDataset.html
[newDatasetPut]: xrp-api-newDatasetPut.html
[newDatasetPost]: xrp-api-newDatasetPost.html
[getConnections]: xrp-api-getConnections.html
[search]: xrp-api-search.html
