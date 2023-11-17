variable "project_name" {
  default = "about-me"
}

locals {
  all_envs    = { for tuple in regexall("(.*)=(.*)", file("../app.env")) : tuple[0] => sensitive(tuple[1]) }
  tf_envs     = { for key, value in local.all_envs : key => value if can(regex("^tf_", key)) }
  envs        = { for key, value in local.all_envs : key => value if !can(regex("^tf_", key)) }
  envs_string = join(" ", [for key, value in local.envs : "${key}=${value}"])
}
