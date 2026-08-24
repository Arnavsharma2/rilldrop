package serverurl

import "testing"

// TestNormalize guards the property every caller depends on: the result can have
// a path appended to it without producing a doubled slash. A doubled slash is
// routed as a different path and 404s, and ice.Fetch turns that 404 into a
// silent fallback to public STUN, so the failure is invisible to the user.
func TestNormalize(t *testing.T) {
	cases := []struct {
		name  string
		input string
		want  string
	}{
		{"already clean", "http://localhost:3001", "http://localhost:3001"},
		{"one trailing slash", "http://localhost:3001/", "http://localhost:3001"},
		// TrimSuffix would leave one of these behind; TrimRight takes the run.
		{"several trailing slashes", "http://localhost:3001///", "http://localhost:3001"},
		{"surrounding whitespace", "  http://localhost:3001  ", "http://localhost:3001"},
		{"whitespace and slash", " http://localhost:3001/ ", "http://localhost:3001"},
		{"empty", "", ""},
		{"only slashes", "///", ""},
		{"path preserved", "https://example.com/rilldrop/", "https://example.com/rilldrop"},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			if got := Normalize(tc.input); got != tc.want {
				t.Fatalf("Normalize(%q) = %q, want %q", tc.input, got, tc.want)
			}
		})
	}
}

// TestWeb covers the two derivation branches. The slash-suffixed cases matter
// most: before normalization moved in here, an exact-match switch missed them
// and a production URL with a trailing slash produced a link pointing at the
// signaling API instead of the web app.
func TestWeb(t *testing.T) {
	cases := []struct {
		name   string
		server string
		want   string
	}{
		{"local dev", "http://localhost:3001", "http://localhost:3000"},
		{"local dev with trailing slash", "http://localhost:3001/", "http://localhost:3000"},
		// One-domain self-hosting: the web app and the API share an origin, so
		// the server address is already the right link base.
		{"self-hosted one domain", "https://rilldrop.example.com", "https://rilldrop.example.com"},
		{"self-hosted with trailing slash", "https://rilldrop.example.com/", "https://rilldrop.example.com"},
		{"empty stays empty", "", ""},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			if got := Web(tc.server); got != tc.want {
				t.Fatalf("Web(%q) = %q, want %q", tc.server, got, tc.want)
			}
		})
	}
}

// TestWebIsNormalized asserts the composed property the share-link builders rely
// on: whatever Web returns can have "/?s=..." appended without a double slash.
func TestWebIsNormalized(t *testing.T) {
	for _, server := range []string{
		"http://localhost:3001/",
		"http://localhost:3001//",
		"https://rilldrop.example.com///",
		"  https://rilldrop.example.com/  ",
	} {
		if got := Web(server); got != Normalize(got) {
			t.Fatalf("Web(%q) = %q, which is not normalized", server, got)
		}
	}
}
