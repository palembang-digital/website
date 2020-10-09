resource "cloudflare_record" "prod" {
  zone_id = ${{ secrets.PALEMBANGDIGITALORG_ZONE_ID }}
  name   = "palembangdigital.org"
  value = var.prod
  type = "CNAME"
  proxied = true
}

resource "cloudflare_record" "www" {
  zone_id = ${{ secrets.PALEMBANGDIGITALORG_ZONE_ID  }}
  name   = "www"
  value = var.prod
  type = "CNAME"
  proxied = true
}

resource "cloudflare_record" "staging" {
  zone_id = ${{ secrets.PALEMBANGDIGITALORG_ZONE_ID }}
  name   = "staging"
  value = var.staging
  type = "CNAME"
  proxied = true
}

