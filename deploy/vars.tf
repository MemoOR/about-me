variable "project_name" {
  default = "about-me"
}

locals {
  envs = { for tuple in regexall("(.*)=(.*)", file("../app.env")) : tuple[0] => sensitive(tuple[1]) }
}
