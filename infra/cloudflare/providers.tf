provider "cloudflare" {
  version = "~> 2.11"
  email = ${{ secrets.CLOUDFLARE_EMAIL }}
  api_key = ${{ secrets.CLOUDFLARE_API_KEY }}
}
