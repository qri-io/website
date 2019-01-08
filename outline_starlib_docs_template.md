---
title: "Starlark: standard library"
description: "list of all the functions and modules in starlark standard library"
date: 2018-12-20T00:00:00-04:00
---

# Starlark Standard Library

All qri transforms have access to "starlib", a community-driven project to bring a standard library to the starlark programming dialect. We here at Qri need a standard library, and we thought it might benefit others to structure this library in a reusable way. We are a little biased towards our needs, and will be shaping the library primarily toward's Qri's use case.

**Comments, Suggestions & Pull Requests welcome: [https://github.com/qri-io/starlib](https://github.com/qri-io/starlib)**

### Contents

| package name | description |
|--------------|-------------|
{{ range . -}}
| [{{ .Name }}](#{{.Name}}) | {{ .Description }} |
{{ end }}

{{ define "mdFn" }}
#### `{{ .Signature }}`
{{- if ne .Description "" }}
{{ .Description }}
{{- end -}}
{{- if gt (len .Params) 0 }}

**parameters:**

| name | type | description |
|------|------|-------------|
{{ range .Params -}}
| `{{ .Name }}` | `{{ .Type }}` | {{ .Description }} |
{{ end -}}
<br />
{{- end -}}
{{- end -}}


{{- range . -}}
** **
# <a id="{{.Name}}" href="#{{.Name}}">{{ .Name }}</a>
{{ if ne .Description "" }}{{ .Description }}{{ end }}
{{- if gt (len .Functions) 0 }}
## Functions
{{ range .Functions -}}
{{ template "mdFn" . }}
{{ end -}}
{{- end }}
{{ if gt (len .Types) 0 }}
## Types
{{ range .Types -}}
### `{{ .Name }}`
{{ if ne .Description "" }}{{ .Description }}{{ end -}}
{{ if gt (len .Fields) 0 }}
**Fields**

| name | type | description |
|------|------|-------------|
{{ range .Fields -}}
| {{ .Name }} | {{ .Type }} | {{ .Description }} |
{{ end -}}
{{ end -}}
{{ if gt (len .Methods) 0 }}
**Methods**
{{- range .Methods -}}
{{ template "mdFn" . }}
{{ end -}}
{{- if gt (len .Operators) 0 }}
**Operators**

| operator | description |
|----------|-------------|
{{ range .Operators -}}
	| {{ .Opr }} | {{ .Description }} |
{{ end }}
{{ end }}
{{ end }}
{{- end -}}
{{- end -}}
{{ end }}