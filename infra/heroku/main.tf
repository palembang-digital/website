resource "heroku_app" "palembang_digital_app" {
  name   = var.app_name
  region = var.region

  buildpacks = [
    "heroku/go"
  ]
}

output "palembang_digital_app_url" {
  value = "https://${heroku_app.palembang_digital_app.name}.herokuapp.com"
}

resource "heroku_addon" "palembang_digital_db" {
  app  = heroku_app.palembang_digital_app.name
  plan = "heroku-postgresql:hobby-dev"
}

resource "heroku_app" "palembang_digital_staging_app" {
  name   = var.app_name_staging
  region = var.region

  buildpacks = [
    "heroku/go"
  ]
}

output "palembang_digital_staging_app_url" {
  value = "https://${heroku_app.palembang_digital_staging_app.name}.herokuapp.com"
}

resource "heroku_domain" "palembang_digital_staging_domain" {
  app      = heroku_app.palembang_digital_staging_app.name
  hostname = "staging.palembangdigital.org"
}

output "palembang_digital_staging_cname" {
  value = heroku_domain.palembang_digital_staging_domain.cname
}

resource "heroku_addon" "palembang_digital_staging_db" {
  app  = heroku_app.palembang_digital_staging_app.name
  plan = "heroku-postgresql:hobby-dev"
}
