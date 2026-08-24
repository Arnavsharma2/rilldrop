// Package serverurl normalizes a Rilldrop signaling-server origin and derives the
// matching web-app origin.
//
// Both the CLI and the desktop app print a share link after a send, and a link
// is only useful if it points at a web app rather than at the signaling API.
// Keeping that derivation in one place stops the two surfaces from drifting
// apart and printing different links for the same server.
package serverurl

import "strings"

const (
	// devServer and devWeb are the local development pair that docker-compose
	// and the e2e suite bring up.
	devServer = "http://localhost:3001"
	devWeb    = "http://localhost:3000"
)

// Normalize trims surrounding whitespace and every trailing slash.
//
// Callers append paths directly to the result (serverURL + "/api/code"), so one
// stray slash yields "//api/code", which servers route as a different path and
// answer with 404. Some of those 404s are silent: ice.Fetch swallows them and
// falls back to public STUN, so a relayed transfer dies with no message.
//
// TrimRight rather than TrimSuffix on purpose: it removes a run of slashes, not
// just the last one.
func Normalize(s string) string {
	return strings.TrimRight(strings.TrimSpace(s), "/")
}

// Web returns the web-app origin for share links, given a signaling origin.
//
// The local dev stack splits the API and web app across two origins, so it is
// special-cased. Anything else is assumed to
// be a self-hosted instance served from a single origin, which is the layout the
// reverse-proxy guide recommends. Split self-hosted deployments override this.
//
// Callers pass an already-resolved server, so an empty input returns empty
// rather than guessing a default.
func Web(server string) string {
	s := Normalize(server)
	switch s {
	case devServer:
		return devWeb
	default:
		return s
	}
}
