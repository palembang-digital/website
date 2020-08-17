variable "app_name" {
  default = "palembang-digital"
}

variable "region" {
  default = "us"
}

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
  app  = "${heroku_app.palembang_digital_app.name}"
  plan = "heroku-postgresql:hobby-dev"
}
