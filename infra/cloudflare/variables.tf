variable "zone-id" {
  default = ${{ secrets.PALEMBANGDIGITALORG_ZONE_ID }} 
}

variable "www" {
  default = "palembang-digital.herokuapp.com"
}

variable "staging" {
  default = "palembang-digital-staging.herokuapp.com"
}

variable "prod" {
  default = "palembang-digital.herokuapp.com"
}

